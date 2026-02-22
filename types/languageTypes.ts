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
type ProjectDetails = {
  description: string
  link: string
  image: string
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
  projects: Record<string, ProjectDetails>
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
  projects: {
    'OctoDev': {
      description: '',
      link: '',
      image: ''
    },
    'FlexyApi': {
      description: '',
      link: '',
      image: ''
    },
    'Silhouettle': {
      description: '',
      link: '',
      image: ''
    },
    'Periodic Table Game': {
      description: '',
      link: '',
      image: ''
    },
    'Forkify': {
      description: '',
      link: '',
      image: ''
    },
    'Interior Consultant': {
      description: '',
      link: '',
      image: ''
    }
  }, 
  sideBarList: ['']
}
