import type { Metadata } from 'next';
import { Tourney, Inter, Montserrat, Anonymous_Pro, Average_Sans } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import './layout.css';

export const metadata: Metadata = {
	title: "Renanrod's Portfolio",
	description: 'Welcome to my personal portfolio website where I showcase my projects and skills.',
};

const tourney = Tourney({ subsets: ['latin'], weight: ['400'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['600'] });
const anonymous_pro = Anonymous_Pro({ subsets: ['latin'], weight: ['400'] });
const average_sans = Average_Sans({ subsets: ['latin'], weight: ['400'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${tourney.className} ${inter.className} ${montserrat.className} ${anonymous_pro.className} ${average_sans.className}`}
		>
			<body>
				<LanguageProvider>{children}</LanguageProvider>
			</body>
		</html>
	);
}
