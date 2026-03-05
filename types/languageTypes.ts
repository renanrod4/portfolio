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
type ProjectKeys = 
  | 'OctoDev' | 'FlexyApi' | 'Silhouettle' 
  | 'Periodic Table Game' | 'Forkify' | 'Interior Consultant' 
  | "RR's Dealership" | 'Car Rental' | 'Github Profile';

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
  projects: {
    title: string;
  } & { 
    [key in ProjectKeys]: ProjectDetails
  };
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
    title: '',
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
    },
    "RR's Dealership": {
      description: '',
      link: '',
      image: ''
    },
    'Car Rental': {
      description: '',
      link: '',
      image: ''
    },
    'Github Profile': {
      description: '',
      link: '',
      image: ''
    }
  }, 
  sideBarList: ['']
}
