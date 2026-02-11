'use client'
import SideBar from '@/components/Sidebar';
import './page.css';
import NavBar from '@/components/NavBar';
import { useLanguage } from '@/context/LanguageContext';
import Home from '@/components/pages/Home';
import { languageJsonStructure } from '@/types/languageTypes';

export default function Page() {
	const { isTransitioning } = useLanguage() || { isTransitioning: () => false };
	const { text } = useLanguage() || { text: languageJsonStructure };

	return (
		<div className={`root ${isTransitioning() ? 'language-transition' : ''}`}>
			<NavBar />
			<main>
				<SideBar />
				<Home />
			</main>
		</div>
	);
}
