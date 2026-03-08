'use client'

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types/languageTypes';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function NavBar({ setPage }: { setPage: (page: string) => void }) {
	const langsSize = 25;
	const { changeLanguage } = useLanguage() || { changeLanguage: (lang: string) => { } };
	const router = useRouter();

	async function handleclick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
		const lang = (e.currentTarget.firstChild as HTMLImageElement).classList[1];
		localStorage.setItem('language', lang);
		Cookies.set('language', lang, { expires: 365 });
		changeLanguage(lang as Language);
		router.refresh();
	}
	return (
		<nav>
			<ul>
				<li>
					<Link href="/#" onClick={() => setPage('')}>
						<span id="logo">RR</span> <p>Renanrod</p>
					</Link>
				</li>
				<li>
					<ul id="langs">
						<li onClick={handleclick}>
							<Image
								src="/images/langs/pt-br.png"
								height={langsSize}
								width={langsSize}
								alt="português"
								className="lang pt-br"
							/>
						</li>
						<li onClick={handleclick}>
							<Image
								src="/images/langs/en-us.png"
								height={langsSize}
								width={langsSize}
								alt="english"
								className="lang en-us"
							/>
						</li>
						<li onClick={handleclick}>
							<Image
								src="/images/langs/de.png"
								height={langsSize}
								width="25"
								alt="deutish"
								className="lang de"
							/>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	);
}
