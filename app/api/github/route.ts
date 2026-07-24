import { NextResponse } from 'next/server';

const MY_USER = 'renanrod4';
const ACCEPTED_OWNERS = [MY_USER, '0cto-dev', 'HelioSync-Enterprise'];

// Função para extrair o primeiro parágrafo válido do Markdown
function extractFirstParagraph(markdown: string): string {
	// Remove comentários HTML, imagens (![alt](url)), badges e títulos (# Heading)
	const cleaned = markdown
		.replace(/<!--[\s\S]*?-->/g, '') // Remove comentários HTML
		.replace(/!\[.*?\]\(.*?\)/g, '') // Remove imagens/badges
		.replace(/^#+.*$/gm, '') // Remove títulos (#, ##, ###)
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Transforma links [Texto](url) em apenas Texto

	// Divide por quebras de linha duplas/múltiplas para separar parágrafos
	const paragraphs = cleaned
		.split(/\n\s*\n/)
		.map(p => p.replace(/\s+/g, ' ').trim()) // Normaliza espaços extras
		.filter(p => p.length > 20); // Ignora linhas muito curtas ou vazias

	// Retorna o primeiro parágrafo encontrado (ou vazio)
	return paragraphs[0] || '';
}

export async function GET() {
	const githubToken = process.env.GITHUB_TOKEN;

	if (!githubToken) {
		console.error('ERRO: GITHUB_TOKEN não configurado no .env!');
		return NextResponse.json({ error: 'Token não configurado no servidor' }, { status: 500 });
	}

	const headers = {
		Accept: 'application/vnd.github.v3+json',
		Authorization: `Bearer ${githubToken}`,
		'User-Agent': 'Portfolio-App',
	};

	try {
		// 1. Busca os repositórios estrelados (com per_page=100)
		const res = await fetch(`https://api.github.com/users/${MY_USER}/starred?sort=updated&per_page=100`, {
			headers,
			next: { revalidate: 3600 },
		});

		if (!res.ok) {
			return NextResponse.json({ error: `Erro na API do GitHub: ${res.statusText}` }, { status: res.status });
		}

		const allRepos = await res.json();

		// 2. Aplica o filtro de owners aceitos e repositórios públicos
		const filteredRepos = allRepos.filter(
			(repo: any) =>
				ACCEPTED_OWNERS.includes(repo.owner.login) && (repo.visibility === 'public' || !repo.private),
		);

		// 3. Ordena os repositórios filtrados por atualização mais recente
		filteredRepos.sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

		const repoDetailsPromises = filteredRepos.slice(0, 10).map(async (repo: any) => {
			let readmeExcerpt = '';
			let stack: string[] = [];

			try {
				const [readmeRes, langRes] = await Promise.all([
					fetch(
						`https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch || 'main'}/README.md`,
						{ next: { revalidate: 3600 } },
					),
					fetch(`https://api.github.com/repos/${repo.full_name}/languages`, {
						headers,
						next: { revalidate: 3600 },
					}),
				]);

				if (readmeRes.ok) {
					const rawMarkdown = await readmeRes.text();
					readmeExcerpt = extractFirstParagraph(rawMarkdown);
				}
				if (langRes.ok) {
					const langData = await langRes.json();
					stack = Object.keys(langData);
				}
			} catch {
				// Ignora caso alguma das buscas falhe
			}
			return {
				name: repo.name,
				description: repo.description || 'Sem descrição cadastrada.',
				url: repo.html_url,
				readmeExcerpt,
				stack,
			};
		});

		const formattedRepos = await Promise.all(repoDetailsPromises);
		console.log('Repositórios carregados com sucesso:', formattedRepos);

		return NextResponse.json(formattedRepos);
	} catch (error) {
		console.error('Erro na API interna do GitHub:', error);
		return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
	}
}
