import { useLanguage } from "@/context/LanguageContext";
import { languageJsonStructure } from "@/types/languageTypes";
import { li } from "framer-motion/client";
import Image from 'next/image';

export default function Skills() {
    const { text } = useLanguage() || { text: languageJsonStructure };

    return (
        <div className="skills">
            <section className="tech-skills">
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
                                                <div className="image">
                                                    <Image src={`/images/skillIcons/${item.toLowerCase().replace('#', "sharp")}.png`} alt={`${item} icon`} width={0} height={0} className="skill-icon" />
                                                </div>
                                                <p>{item}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </div>
                    ))}
                </ul>
            </section>

            <section className="language-skills">
                <h1>{text.skills.title2}</h1>
                <ul>
                    <li>
                        <div className="image">
                            <Image src="/images/langs/pt-br.png" alt="Portuguese flag" width={0} height={0} className="language-icon" />
                        </div>
                        <span>{text.skills.languages.portuguese}</span>
                    </li>
                    <li>
                        <div className="image">
                            <Image src="/images/langs/en-us.png" alt="US flag" width={0} height={0} className="language-icon" />
                        </div>
                        <span>{text.skills.languages.english}</span>
                    </li>
                    <li>
                        <div className="image">
                            <Image src="/images/langs/de.png" alt="German flag" width={0} height={0} className="language-icon" />
                        </div>
                        <span>{text.skills.languages.german}</span>
                    </li>
                </ul>
            </section>
        </div>
    );
}