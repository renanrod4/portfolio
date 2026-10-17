import { useLanguage } from "@/context/LanguageContext";
import { languageJsonStructure } from "@/types/languageTypes";

export default function CvBtn() {
    const { text,language } = useLanguage() || { text: languageJsonStructure };
    let base = "https://renanrod4.github.io/pdfs/";
    return (
        <button className="cv-btn" onClick={() => window.open(language === 'pt-br'?base+'main_pt/main_pt.pdf':base+'main_en/main_en.pdf', '_blank')}>
            {text?.home.curriculum}
        </button>
    );
}