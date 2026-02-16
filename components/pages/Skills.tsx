import { useLanguage } from "@/context/LanguageContext";
import { languageJsonStructure } from "@/types/languageTypes";
import { li } from "framer-motion/client";
import Image from 'next/image';

export default function Skills() {
    const { text } = useLanguage() || { text: languageJsonStructure };

    return (
        <div className="skills">
            <h1>{text.skills.title1}</h1>
            <ul className="skills-categories">
                {text.skills.categories.map((category, index) => (
                    <div className="skills-category" key={index}>
                        <h2>{category.name}</h2>
                        <li>
                            <ul className="skills-items">
                                {category.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <div>
                                            <Image src={`/icons/${item.toLowerCase()}.svg`} alt={`${item} icon`} width={24} height={24} />
                                            <p>{item}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </div>
                ))}
            </ul>

            <h1>{text.skills.title2}</h1>
            <ul className="language-skills">
                <li>{text.skills.languages.portuguese}</li>
                <li>{text.skills.languages.english}</li>
                <li>{text.skills.languages.german}</li>
            </ul>
        </div>
    );
}