'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { translations, Language, LanguageContextType } from '@/types/languageTypes';

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState<Language>('en-us');
	const [isLoadingLanguageSwitch, setIsLoadingLanguageSwitch] = useState(false);

	useEffect(() => {
		// Check for saved language preference in localStorage
		const saved = localStorage.getItem('lang') as Language;
		if (saved) setLanguage(saved);
	}, []);

	async function changeLanguage(lang: Language) {
		// Add a classname to body to hide and show content during language switch 
		setIsLoadingLanguageSwitch(true);
		setTimeout(() => {
			setIsLoadingLanguageSwitch(false);
			// Change the current language and save preference
			setLanguage(lang);
			localStorage.setItem('lang', lang);
		}, 300);
	}
	function isTransitioning() {
		return isLoadingLanguageSwitch;
	}
	return (
		<LanguageContext.Provider
			value={{
				language,
				text: translations[language],
				changeLanguage,
				isTransitioning,
			}}
		>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	return useContext(LanguageContext);
}
