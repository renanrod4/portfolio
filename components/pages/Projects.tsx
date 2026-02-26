import { useLanguage } from "@/context/LanguageContext";
import MagicBento from "../shadcn/MagicBento";
import { languageJsonStructure } from "@/types/languageTypes";

export default function Projects() {
    const { text } = useLanguage() || { text: languageJsonStructure };

    return (
        <div className="projects">
            <h1>{text.projects.title as string}</h1>

            <MagicBento
                textAutoHide={true}
                enableStars
                enableSpotlight
                enableBorderGlow={true}
                enableTilt={false}
                enableMagnetism={false}
                clickEffect
                spotlightRadius={400}
                particleCount={12}
                glowColor="139, 61, 236"
                disableAnimations={false}
            />
        </div>
    );
}