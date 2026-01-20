'use client'
import SideBar from '@/components/Sidebar';
import './page.css';
import NavBar from '@/components/NavBar';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
	const { isTransitioning } = useLanguage() || { isTransitioning: () => false };

	return (
		<div className={`root ${isTransitioning() ? 'language-transition' : ''}`}>
			<NavBar />
			<main>
				<SideBar />
			</main>
		</div>
	);
}
