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

export const languageJsonStructure = {
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
  sideBarList: ['']
}