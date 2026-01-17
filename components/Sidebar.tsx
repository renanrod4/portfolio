'use client'
import { useLanguage } from '@/context/LanguageContext';
import { languageJsonStructure } from '@/types/languageTypes';

export default function SideBar() {
	const { text } = useLanguage()|| { text: languageJsonStructure };
	return (
		<aside>
			<ul>
                {text?.sideBarList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
			</ul>
		</aside>
	);
}
