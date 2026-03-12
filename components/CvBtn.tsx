import { useLanguage } from "@/context/LanguageContext";
import { languageJsonStructure } from "@/types/languageTypes";

export default function CvBtn() {
    const { text } = useLanguage() || { text: languageJsonStructure };
    return (
        <button className="cv-btn" onClick={() => window.open('/curriculo.pdf', '_blank')}>
            {text?.home.curriculum}
        </button>
    );
}