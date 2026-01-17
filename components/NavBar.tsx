'use client'

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types/languageTypes';

export default function NavBar() {
	const langsSize = 25;
  const {changeLanguage} = useLanguage()|| { changeLanguage: (lang: string) => {} };

  function handleclick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const lang = (e.currentTarget.firstChild as HTMLImageElement).classList[1];

    localStorage.setItem('language', lang);
    changeLanguage(lang as Language);
    
  }
	return (
		<nav>
			<ul>
				<li>
					<span id="logo">RR</span> <p>Renanrod</p>
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
