import type { Metadata } from 'next';
import { Tourney, Inter } from 'next/font/google';
import { LanguageProvider } from '../context/LanguageContext';
import SideBar from '../components/Sidebar';

export const metadata: Metadata = {
	title: "Renanrod's Portfolio",
	description: 'Welcome to my personal portfolio website where I showcase my projects and skills.',
};

const tourney = Tourney({ subsets: ['latin'], weight: ['400'] });
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${tourney.className} ${inter.className}`}>
			<body>
				<LanguageProvider>
          <SideBar/>
          {children}
        </LanguageProvider>
			</body>
		</html>
	);
}
