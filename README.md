# Portfolio

Portfólio interativo e trilíngue desenvolvido para demonstrar arquitetura moderna e padrões avançados de UI/UX. Construído com Next.js 16, React 19 e TypeScript, o projeto combina animações fluidas utilizando Framer Motion e GSAP, além de contar com um assistente virtual nativo alimentado por inteligência artificial para interação direta com os visitantes.

## Stack

- Next.js 16 com App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- GSAP
- shadcn/ui como base de componentes utilitários
- Groq SDK para o chat do portfólio
- Resend para o formulário de contato
- js-cookie para persistência de idioma
- lucide-react, react-icons e @formkit/auto-animate para ícones e animações de interface

## Estrutura do projeto

```text
app/
	layout.tsx       # layout global, metadata e provider de idioma
	layout.css       # estilos globais do site
	page.tsx         # composição principal da home e navegação por hash
	page.css         # estilos da página inicial
	actions.tsx      # server action do formulário de contato
	api/
		chat/route.ts  # API do chat com IA
		github/route.ts# API interna para dados de repositórios

components/
	NavBar.tsx       # navegação principal e seletor de idioma
	Sidebar.tsx      # menu lateral por seção
	Chat.tsx         # interface do chat do portfólio
	CvBtn.tsx        # botão para currículo
	Popup.tsx        # feedback visual de ações
	pages/           # seções da landing page
	shadcn/          # componentes visuais reutilizáveis

context/
	LanguageContext.tsx  # estado global do idioma e transição

public/
	images/          # imagens, ícones, avatars e artes do site
	jsonLangs/       # arquivos de tradução por idioma

types/
	languageTypes.ts  # contrato das traduções e idioma
	types.ts          # tipos compartilhados do projeto
```

## Estratégias usadas

### Layout e renderização

O projeto usa o App Router do Next.js para centralizar o layout global em [app/layout.tsx](app/layout.tsx). O idioma inicial é lido do cookie na renderização do servidor e repassado ao provider global, o que evita flicker desnecessário na primeira carga.

### Internacionalização

A tradução é baseada em JSONs estáticos em [public/jsonLangs](public/jsonLangs). O idioma é compartilhado por [context/LanguageContext.tsx](context/LanguageContext.tsx), e a troca é persistida com `cookie` e `localStorage` no componente de navegação. O site suporta `pt-br`, `en-us` e `de`.

### Navegação da página

A experiência principal é uma landing page com navegação por hash. Em vez de separar tudo em rotas de conteúdo, [app/page.tsx](app/page.tsx) alterna entre as seções Home, Skills, Projects e Contact com base no fragmento da URL.

### APIs internas

O projeto expõe rotas internas para tarefas específicas:

- [app/api/chat/route.ts](app/api/chat/route.ts) recebe mensagens e responde com IA usando Groq, com prompt de persona e fallback de modelo em caso de limite.
- [app/api/github/route.ts](app/api/github/route.ts) busca repositórios selecionados do GitHub, extrai descrição a partir do README e monta os dados exibidos na interface.
- [app/actions.tsx](app/actions.tsx) envia mensagens do formulário de contato via Resend.

### Componentização e animações

As seções são quebradas em componentes pequenos e reutilizáveis em [components](components), com uso de animações para reforçar a identidade visual. O projeto combina Framer Motion, GSAP e componentes com comportamento responsivo para criar transições, destaque visual e microinterações.

### Estilo visual

O visual é controlado por CSS global em [app/layout.css](app/layout.css) e [app/page.css](app/page.css), em conjunto com Tailwind CSS v4. A tipografia usa fontes do Google carregadas via `next/font`, e os assets estão organizados em [public](public) para manter o conteúdo estático fácil de versionar.

## Fluxo de idioma

1. O idioma inicial é lido do cookie no servidor.
2. O provider global disponibiliza as traduções para a aplicação.
3. Ao trocar o idioma, o valor é salvo em cookie e `localStorage`.
4. O `router.refresh()` força a atualização do layout com o novo idioma.

## Variáveis de ambiente

Configure as variáveis abaixo para habilitar todas as integrações:

- `GROQ_API_KEY`
- `GITHUB_TOKEN`
- `RESEND_API_KEY`

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Observações

- As imagens e ícones do site ficam em [public/images](public/images).
- As traduções ficam em [public/jsonLangs](public/jsonLangs).
- O projeto foi pensado para ser responsivo e manter boa leitura em desktop e mobile.
