'use client';
import { createContext, useContext, useState, useTransition } from 'react';
import { translations, Language, LanguageContextType } from '@/types/languageTypes';

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ 
    children, 
    initialLanguage 
}: { 
    children: React.ReactNode; 
    initialLanguage: Language 
}) {
    const [language, setLanguage] = useState<Language>(initialLanguage);
    const [isPending, startTransition] = useTransition();

    function changeLanguage(lang: Language) {
        startTransition(() => {
            setLanguage(lang);
        });
    }

    return (
        <LanguageContext.Provider
            value={{
                language,
                text: translations[language],
                changeLanguage,
                isTransitioning: () => isPending,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
}