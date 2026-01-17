import type { Metadata } from 'next';
import { Tourney, Inter, Montserrat } from 'next/font/google';
import { LanguageProvider } from '../context/LanguageContext';
import SideBar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import './global.css';
export const metadata: Metadata = {
	title: "Renanrod's Portfolio",
	description: 'Welcome to my personal portfolio website where I showcase my projects and skills.',
};

const tourney = Tourney({ subsets: ['latin'], weight: ['400'] });
const inter = Inter({ subsets: ['latin'], weight: ['400'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['600'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${tourney.className} ${inter.className} ${montserrat.className}`}>
			<body>
				<LanguageProvider>
					<NavBar />
					<SideBar />
					{children}
				</LanguageProvider>
			</body>
		</html>
	);
}
