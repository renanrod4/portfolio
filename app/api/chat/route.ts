import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

interface GitHubRepo {
	name?: string;
	description?: string;
	url?: string;
	stack?: string;
}

interface ChatMessage {
	role: 'user' | 'assistant';
	content: string;
}

interface ChatRequestBody {
	message: string;
	history?: ChatMessage[];
	language: 'en' | 'pt' | 'de' | string;
	githubRepos: GitHubRepo[];
}

const groq = new Groq({
	apiKey: process.env.GROQ_API_KEY,
  maxRetries: 0,
  timeout: 15_000,
});

export async function POST(req: Request) {
	const { message, language, githubRepos, history = [] } = (await req.json()) as ChatRequestBody;
	const fullLanguageName =
		language === 'en' ? 'English' : language === 'pt' ? 'Portuguese' : language === 'de' ? 'German' : 'Unknown';
	const reposText: string = githubRepos
		.map((repo: GitHubRepo) => {
			if (!repo.name || !repo.description || !repo.url || !repo.stack) {
				return '';
			}
			return `name: ${repo.name}\ndescription: ${repo.description}\nurl: ${repo.url}\nstack: ${repo.stack}`;
		})
		.join('\n\n');
	const roleSystem = `
    # BEHAVIORAL INSTRUCTIONS
    - **Identity:** You are the personal intelligent assistant of Renan Rodrigues de Meneses's portfolio. You must answer IN THE FIRST PERSON ("I", "my", "me"), embodying Renan himself in a friendly, confident, direct, and professional manner.
    - **Language:** Use the ${fullLanguageName} language to communicate with the user. Unless the user sends a message in another language, in which case, reply in the user's language.
    - **Scope of Action:** Only answer questions regarding Renan's career, skills, projects, and professional background. If the user asks about completely unrelated topics outside of his professional scope, politely reply that this chat is dedicated to answering questions about Renan's professional journey.
    - **Crucial Formatting:** 
      * Do NOT use Markdown formatting (such as **bold**, # headings, or code blocks) under any circumstances.
      * You must use '\n' for line breaks and topic separation to keep the response clean and readable.
      * Use ' - ' to build lists and detail items.
    - **Limitation:** If you do not know the answer to something specific about Renan, say in a friendly way: "I haven't taught that to my assistant yet! But you can check more details on my portfolio or get in touch directly with me."
    - **Behavioral & Interview Questions (CRITICAL):** If the user asks highly subjective questions, behavioral interview questions, questions about past mistakes, or long-term future plans (e.g., "Where do you see yourself in 5 years?"), DO NOT invent or guess the answer. Instead, reply in the first person stating that you specifically configured this AI to focus on your code, architecture, and technical projects. Politely invite the user to schedule a live interview or chat using your contact information to discuss soft skills, culture, and career goals.
	- **Strict Tech Stack Adherence (CRITICAL):** Do NOT hallucinate technologies not listed in your skills or repository details.
	- **Frontend & Modern SEO Practices:** I build interfaces using Next.js App Router (using native Metadata API, Open Graph, and Schema.org JSON-LD), Tailwind CSS, Framer Motion, and GSAP. Do NOT mention outdated libraries like react-helmet or next-seo, as Next.js handles metadata natively.
	- **Next.js Architecture (CRITICAL):** Focus exclusively on App Router features (React Server Components, native Metadata API, dynamic Open Graph images). Do NOT mention legacy Pages Router methods like getStaticProps or getServerSideProps.

    # PERSONAL AND PROFESSIONAL INFO
    - **Name:** Renan Rodrigues de Meneses
    - **Role:** Full-Stack Developer (available for new opportunities and job proposals).
    - **Experience:** working non-professional in the tech industry since 2018 (approximately ${((Date.now() - new Date('2018-01-01').getTime()) / (1000 * 60 * 60 * 24 * 365)).toFixed(0)} years of practical experience, considering the current year).
    - **Education:** Studying Computer Engineering at the University of Sorocaba (UNISO), with expected graduation by 2030.
    - **Languages:** Portuguese (native), English (advanced/fluent), and German (basic).
    - **Hobbies:** Technology, automation, microcontrollers, cars, gaming, and animals
    - **Professional Carrer:** I have never worked in a professional environment, but i have been working on personal and academics projects since 2018, and i have been learning and improving my skills in programming from my own, through online courses.
    - **Main Areas of Expertise:** Web Development with .NET or React/Nextjs and Typescript, Desktop Development with Tauri, Rust and Python 
    - **My Favorite Projects:** My two Favorites projects by far are the OctoDev and The Helio-Sync, both are personal projects that i have been working on for a long time, and i have learned a lot from them, and they are still in development, but they are already functional and useful.
    - **Availability & Work Model:** Looking for Junior developer or Internship (Estágio) positions. I am highly interested in Remote opportunities, but open to Hybrid models around São Paulo city, balancing it with my academic schedule.
    - **Teamwork & Collaboration:** Even without formal corporate experience, I have strong teamwork experience collaborating with other developers and engineering students on complex systems (like Helio Sync, OctoDev and Uniso Flow), managing versions with Git/GitHub, and aligning technical requirements.
    - **Development Workflow:** I focus on clean architecture and modern deployment practices, constantly iterating on my projects, managing databases (like MongoDB and SQLite), and deploying web applications to production environments.

    ${
		reposText && reposText.trim() !== ''
			? `# GITHUB REPOSITORIES
    Here are some of my GitHub repositories that showcase my work and projects:
	the repo \`portfolio\` is the one that contains this portfolio code
    ${reposText}`
			: ''
	}

    # TECH STACK (SKILLS)
    - **Frontend:** React, Next.js, TypeScript, JavaScript, Tailwind CSS, Framer Motion, and Bootstrap. I highly value modern UI/UX design patterns, dynamic interfaces, bento grids, and responsive dark mode layouts.
    - **Backend & APIs:** .NET, Node.js, NextAuth, REST APIs, SQL, MySQL, and PHP.
    - **App & Desktop Development:** Electron.js, Tauri (integrated with Rust), and React Native.
    - **Embedded Systems & Hardware:** Arduino, ESP32 programming (automation logic and sensor integration), and Shell Script.
    - **Other Technologies:** Rust, Python, C#, C++, Git, GitHub, Unity3D, Blender, LaTeX, Linux, and mathematical modeling.

    # CONTACT AND AVAILABILITY
    If the user shows interest in hiring me, collaborating, or reaching out, warmly provide the following options:
    - **Email:** renanrdemeneses@gmail.com
    - **LinkedIn:** https://www.linkedin.com/in/renanrod4
    - **GitHub:** https://github.com/renanrod4
    - **WhatsApp:** +55 11 93340-7053 (direct link: https://wa.me/5511933407053)
  `;
	console.log('Role System:', roleSystem);

	const previousMessages: Groq.Chat.ChatCompletionMessageParam[] = history.map(msg => ({
		role: msg.role,
		content: msg.content,
	}));
  console.log('Previous Messages:', previousMessages);

	const messages: Groq.Chat.ChatCompletionMessageParam[] = [
		{
			role: 'system',
			content: roleSystem,
		},
    ...previousMessages,
		{
			role: 'user',
			content: message,
		},
	];

	try {
		// 1. Tenta rodar o modelo principal (gpt-oss-120b)
		const completion = await groq.chat.completions.create({
			model: 'openai/gpt-oss-120b',
			messages: messages,
		});

		return NextResponse.json({
			response: completion.choices[0].message.content,
			modelUsed: 'openai/gpt-oss-120b',
		});
	} catch (error: any) {
		// 2. Se falhar com erro 429 (Rate Limit), tenta o fallback com outra versão do modelo (gpt-oss-20b)
		if (error?.status === 429) {
			console.warn('Limite do gpt-oss-120b atingido, tentando fallback com gpt-oss-20b...');

			try {
				const fallbackCompletion = await groq.chat.completions.create({
					model: 'openai/gpt-oss-20b',
					messages: messages,
				});

				return NextResponse.json({
					response: fallbackCompletion.choices[0].message.content,
					modelUsed: 'openai/gpt-oss-20b',
				});
			} catch (fallbackError: any) {
				console.error('Erro no modelo de fallback (8B):', fallbackError);
				return NextResponse.json(
					{ error: 'Ambos os modelos falharam ou atingiram o limite.' },
					{ status: 500 },
				);
			}
		}

		// Caso seja um erro diferente de 429 (ex: chave de API inválida, erro de rede, etc)
		console.error('Erro desconhecido na chamada da API:', error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

[
  {
    "name": "frankAI",
    "description": "Assistente de voz inteligente executado localmente em Python, projetado para distribuições Linux modernas (como Linux Mint, Ubuntu e Debian). O projeto combina `evdev`, `sounddevice`, `asyncio`, `Whisper` e `Piper` para oferecer uma experiência de Push-to-Talk estável e de baixa latência, com transcrição local em português, processamento de intenção via Ollama e síntese de fala em voz natural, tudo de forma independente do ambiente de desktop utilizado.",
    "url": "https://github.com/renanrod4/frankAI",
    "stack": "Python, Shell"
  },
  {
    "name": "blame-cli",
    "description": "A local-first Rust CLI that uses LLMs and repository history to generate commit messages that fit your workflow. **It doesn't just write commits; it learns how you write.** By analyzing commit history, filtering noisy diffs, and supporting any OpenAI-compatible provider, Blame creates commit suggestions that feel native to your project while keeping the developer in control.",
    "url": "https://github.com/renanrod4/blame-cli",
    "stack": ""
  },
  {
    "name": "portfolio",
    "description": "Portfólio interativo e trilíngue desenvolvido para demonstrar arquitetura moderna e padrões avançados de UI/UX. Construído com Next.js 16, React 19 e TypeScript, o projeto combina animações fluidas utilizando Framer Motion e GSAP, além de contar com um assistente virtual nativo alimentado por inteligência artificial para interação direta com os visitantes.",
    "url": "https://github.com/renanrod4/portfolio",
    "stack": "TypeScript, CSS, JavaScript"
  },
  {
    "name": "helio-sync",
    "description": "Helio Sync é uma plataforma mecatrônica inteligente projetada para maximizar a eficiência da captação de energia solar através de um sistema de rastreamento (tracker) em tempo real. O projeto integra um dispositivo embarcado de alta precisão, que utiliza algoritmos matemáticos para acompanhar a trajetória do sol em dois eixos, a uma interface digital completa (Dashboard) para monitoramento de telemetria, análise de eficiência energética e controle remoto do hardware.",
    "url": "https://github.com/HelioSync-Enterprise/helio-sync",
    "stack": "TypeScript, Python, CSS, JavaScript"
  },
  {
    "name": "dritec",
    "description": "Dritec é uma landing page institucional e de alta conversão desenvolvida com Next.js 16, React 19 e Tailwind CSS 4 para uma empresa especializada em caça-vazamentos. Focada na captação rápida de leads via WhatsApp e otimização avançada para motores de busca (SEO Local e Schema.org), a aplicação apresenta uma arquitetura front-end componentizada com App Router, garantindo navegação fluida, performance excepcional em dispositivos móveis e uma infraestrutura pronta para testes A/B em campanhas regionais.",
    "url": "https://github.com/renanrod4/dritec",
    "stack": "TypeScript, CSS, JavaScript"
  },
  {
    "name": "flexyApi",
    "description": "Flexy API is a modern, AI-powered mock data generator built with Next.js 15, React 19, and TypeScript, designed to turn simple prompts and schema ideas into realistic, production-ready JSON in seconds. Integrating language models via the OpenAI SDK and Hugging Face, it goes beyond static generators by allowing developers to describe a context and define a structure, receiving meaningful, context-aware mock data through a simple API-first workflow. Whether you need user profiles, product catalogs, or custom datasets for prototypes and tests, Flexy API accelerates development cycles with high flexibility and control.",
    "url": "https://github.com/renanrod4/flexyApi",
    "stack": "TypeScript, CSS, JavaScript"
  },
  {
    "name": "rr-dealership",
    "description": "RR's Dealership is a modern automotive digital showroom built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Leveraging the Next.js App Router and a deeply nested, structured local JSON catalog, the application delivers a highly responsive, hierarchical browsing experience (Brands -> Models -> Generations -> Trims) with complete spec sheets. Designed as a superior alternative to traditional flat-list automotive catalogs, the project combines advanced dynamic routing, strong UI/UX design patterns, and scalable data presentation.",
    "url": "https://github.com/renanrod4/rr-dealership",
    "stack": "TypeScript, CSS, JavaScript"
  },
  {
    "name": "octodev",
    "description": "**OctoDev** é uma plataforma educacional Full Stack desenvolvida com Next.js e React, focada no ensino de programação através de uma abordagem gamificada e acessível. O sistema utiliza MongoDB para gestão de progresso e um motor dinâmico de lições, integrando Inteligência Artificial (Hugging Face/OpenRouter) para suporte e correção automatizada de código em tempo real. A plataforma transforma o aprendizado em uma experiência interativa, com suporte a múltiplas linguagens e destaque para a inclusão da linguagem brasileira Tenda.",
    "url": "https://github.com/0cto-dev/octodev",
    "stack": "TypeScript, CSS, JavaScript, Rust"
  },
  {
    "name": "uniso-flow",
    "description": "O Uniso Flow é uma ferramenta desenvolvida para transformar o gerenciamento manual de turmas em um painel inteligente de controle. O sistema automatiza a previsão de demanda de alunos por disciplina, auxiliando a coordenação a equilibrar a ocupação das salas e evitar gargalos de matrícula.",
    "url": "https://github.com/renanrod4/uniso-flow",
    "stack": "TypeScript, CSS, JavaScript"
  },
  {
    "name": "gerenciador_de_despesas",
    "description": "Sistema completo para controle de despesas e receitas domésticas por pessoa. A aplicação conta com um ecossistema completo composto por uma API RESTful e uma interface interativa.",
    "url": "https://github.com/renanrod4/gerenciador_de_despesas",
    "stack": "TypeScript, CSS, C#, Python, JavaScript, HTML"
  }
]