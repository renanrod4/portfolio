
import type { Metadata } from 'next';
import { Tourney, Inter, Montserrat, Anonymous_Pro, Average_Sans } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import './layout.css';
import { cookies } from 'next/headers';
import { Language } from '@/types/languageTypes';

export const metadata: Metadata = {
	title: "Renanrod's Portfolio",
	description: 'Welcome to my personal portfolio website where I showcase my projects and skills.',
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
                <LanguageProvider initialLanguage={lang}>
                    {children}
                </LanguageProvider>
            </body>
        </html>
    );
}