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
  | 'Helio-sync' | 'Gerenciador de despesas' | 'FrankAI' 
  | "RR's Dealership" | 'Dritec' | 'Uniso-Flow';

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
  contact: {
    location: string
    email: string
    socialsMessage: string
    quickResponse: {
      span: string
      text: string
    }
    message: {
      title: string
      description: string
      labels: {
        name: string
        email: string
        telephone: string
        message: string
      }
      placeholders: {
        name: string
        email: string
        telephone: string
        message: string
      }
      sendButton: string
      sending: string
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
    'Helio-sync': {
      description: '',
      link: '',
      image: ''
    },
    'Gerenciador de despesas': {
      description: '',
      link: '',
      image: ''
    },
    'FrankAI': {
      description: '',
      link: '',
      image: ''
    },
    "RR's Dealership": {
      description: '',
      link: '',
      image: ''
    },
    'Dritec': {
      description: '',
      link: '',
      image: ''
    },
    'Uniso-Flow': {
      description: '',
      link: '',
      image: ''
    }
  },
  contact: {
    location: '',
    email: '',
    socialsMessage: '',
    quickResponse: {
      span: '',
      text: ''
    },
    message: {
      title: '',
      description: '',
      labels: {
        name: '',
        email: '',
        telephone: '',
        message: ''
      },
      placeholders: {
        name: '',
        email: '',
        telephone: '',
        message: ''
      },
      sendButton: '',
      sending: ''
    }
  },
  sideBarList: ['']
}
