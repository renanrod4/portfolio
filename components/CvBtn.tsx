import { useLanguage } from "@/context/LanguageContext";
import { languageJsonStructure } from "@/types/languageTypes";

export default function CvBtn() {
    const { text,language } = useLanguage() || { text: languageJsonStructure };
    return (
        <button className="cv-btn" onClick={() => window.open(language === 'pt-br'?'curriculo.pdf':'curriculum.pdf', '_blank')}>
            {text?.home.curriculum}
        </button>
    );
}