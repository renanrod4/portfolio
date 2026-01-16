'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { translations, Language, LanguageContextType } from '@/types/languageTypes';

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState<Language>('en-us');

	useEffect(() => {
		// Check for saved language preference in localStorage
		const saved = localStorage.getItem('lang') as Language;
		if (saved) setLanguage(saved);
	}, []);

	function changeLanguage(lang: Language) {
		setLanguage(lang);
		localStorage.setItem('lang', lang);
	}

	return (
		<LanguageContext.Provider
			value={{
				language,
				text: translations[language],
				changeLanguage,
			}}
		>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	return useContext(LanguageContext);
}
