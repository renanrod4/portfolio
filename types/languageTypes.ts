// Defines types and translations for supported languages

import pt from '@/public/jsonLangs/pt-br.json';
import en from '@/public/jsonLangs/en-us.json';
import de from '@/public/jsonLangs/de.json';

export const translations = {
  'pt-br': pt,
  'en-us': en,
  'de': de
};
export type Language = 'pt-br' | 'en-us' | 'de';

export type LanguageContextType = {
  language: Language;
  text: typeof en | typeof pt | typeof de;
  changeLanguage: (lang: Language) => void;
  isTransitioning: () => boolean;
};  

type Category = {
  name: string
  items: string[]
}

type LanguageStructure = {
  home: {
    welcome: {
      morning: string
      afternoon: string
      evening: string
    }
    description: string
    chatPlaceHolder: string
    curriculum: string
  }
  skills: {
    title1: string
    categories: Category[]
    title2: string
    languages: {
      portuguese: string
      english: string
      german: string
    }
  }
  sideBarList: string[]
}
export const languageJsonStructure: LanguageStructure = {
  home: {
    welcome: {
      morning: '',
      afternoon: '',
      evening: ''
    },
    description: '',
    chatPlaceHolder: '',
    curriculum: ''
  },
  skills: {
    title1: '',
    categories: [
      {
        name: '',
        items: ['']
      }
    ],
    title2: '',
    languages: {
      portuguese: '',
      english: '',
      german: ''
    }
  },
  sideBarList: ['']
}
