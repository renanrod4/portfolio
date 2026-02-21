'use client'
import SideBar from '@/components/Sidebar';
import './page.css';
import NavBar from '@/components/NavBar';
import { useLanguage } from '@/context/LanguageContext';
import Home from '@/components/pages/Home';
import { useEffect, useState } from 'react';
import Skills from '@/components/pages/Skills';
import Projects from '@/components/pages/Projects';

export default function Page() {
	const [page, setPage] = useState('');
	const { isTransitioning } = useLanguage() || { isTransitioning: () => false };

	useEffect(() => {
		const hash = window.location.hash.substring(1);
		setPage(hash);

		const handleHashChange = () => {
			const newHash = window.location.hash.substring(1);
			setPage(newHash);
		};

		window.addEventListener('hashchange', handleHashChange);
		return () => window.removeEventListener('hashchange', handleHashChange);
	}, []);

	return (
		<div className={`root ${isTransitioning() ? 'language-transition' : ''}`}>
			<NavBar />
			<main>
				<SideBar page={page} setPage={setPage} />
				{!page && <Home />}
				{page === 'skills' && <Skills />}
				{page === 'projects' && <Projects />}
				{/* 
					{page === 'contact' && <Contact />} 
				  */}
			</main>
		</div>
	);
}