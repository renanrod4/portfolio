import type { Metadata } from 'next';
import { Tourney, Inter, Montserrat, Anonymous_Pro, Average_Sans } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import './layout.css';
import { cookies } from 'next/headers';
import { Language } from '@/types/languageTypes';

const siteUrl = 'https://renanrod.vercel.app';
const siteName = 'Renanrod | Full Stack Developer Portfolio';
const siteDescription = `Full Stack Developer portfolio showcasing projects, technical skills, and contact information. ${new Date().getFullYear() - 2018} years of self-taught experience across web development, automation, and creative technology.`;

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	applicationName: 'Renanrod Portfolio',
	title: {
		default: siteName,
		template: `%s | Renanrod`,
	},
	description: siteDescription,
	keywords: [
		'Renanrod',
		'Renan Rod',
		'portfolio',
		'full stack developer',
		'next.js',
		'react',
		'typescript',
		'web development',
		'frontend',
		'backend',
		'software engineer',
		'engenharia da computacao',
		'trilingual website',
	],
	authors: [{ name: 'Renan Rodrigues de Meneses', url: 'https://renanrod.vercel.app' }],
	creator: 'Renan Rodrigues de Meneses',
	publisher: 'Renan Rodrigues de Meneses',
	category: 'technology',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},
	verification: {
		google: 'aDOPi6ctOVGByWjhEwth9BDdeQOK3jO6KT2mGa09AQc',
	},
	alternates: {
		canonical: '/',
		languages: {
			'en-US': '/',
			'pt-BR': '/',
			de: '/',
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		alternateLocale: ['pt_BR', 'de_DE'],
		url: siteUrl,
		siteName,
		title: siteName,
		description: siteDescription,
		images: [
			{
				url: '/images/pfp.jpeg',
				width: 1200,
				height: 1200,
				alt: 'Renanrod profile photo',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteName,
		description: siteDescription,
		images: ['/images/pfp.jpeg'],
	},
};

export const viewport = {
	width: 'device-width',
	initialScale: 1,
};

const tourney = Tourney({ subsets: ['latin'], weight: ['400'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['600'] });
const anonymous_pro = Anonymous_Pro({ subsets: ['latin'], weight: ['400'] });
const average_sans = Average_Sans({ subsets: ['latin'], weight: ['400'] });

const personSchema = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Renan Rodrigues de Meneses',
	alternateName: 'Renanrod',
	jobTitle: 'Full Stack Developer',
	url: siteUrl,
	image: `${siteUrl}/images/pfp.jpeg`,
	knowsAbout: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'UI/UX Design'],
	sameAs: ['https://github.com/renanrod4', 'https://www.linkedin.com/in/renanrod4/'],
};

const websiteSchema = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: siteName,
	url: siteUrl,
	description: siteDescription,
	publisher: {
		'@type': 'Person',
		name: 'Renan Rodrigues de Meneses',
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = await cookies();
	const cookieLang = cookieStore.get('language')?.value;

	const validLangs = ['en-us', 'pt-br', 'de'];
	const lang = (validLangs.includes(cookieLang as string) ? cookieLang : 'en-us') as Language;

	return (
		<html lang={lang} suppressHydrationWarning>
			<body>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify([personSchema, websiteSchema]),
					}}
				/>
				<LanguageProvider initialLanguage={lang}>{children}</LanguageProvider>
			</body>
		</html>
	);
}
