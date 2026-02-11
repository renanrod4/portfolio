'use client';
import { useLanguage } from '@/context/LanguageContext';
import { languageJsonStructure } from '@/types/languageTypes';
import { motion } from 'framer-motion';
import { IoHome } from 'react-icons/io5';
import { FaCode, FaFolder, FaGithubAlt, FaLinkedinIn } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';

export default function SideBar() {
	const { text, language } = useLanguage() || { text: languageJsonStructure };
	const icons = [<IoHome />, <FaCode />, <FaFolder />, <FaPhoneAlt />];

	return (
		<div className="sidebar-container">
			<motion.aside
				layout
				transition={{
					type: 'spring',
					stiffness: 300,
					damping: 7,
				}}
				data-lang={language}
				className="sidebar"
			>
				<ul className="pages">
					{text?.sideBarList.map((item, i) => (
						<li key={i}>
							<span>{icons[i]}</span>

							<motion.span layout="position">{item}</motion.span>
						</li>
					))}
				</ul>

				<motion.ul layout className="socials">
					<li className="github">
						<button>
							<FaGithubAlt size="28" />
						</button>
					</li>
					<li className="linkedin">
						<button>
							<FaLinkedinIn size="28" />
						</button>
					</li>
				</motion.ul>
			</motion.aside>	
			<button className="cv-btn" onClick={() => window.open('/curriculo.pdf', '_blank')}>
				{text?.home.curriculum}
			</button>
		</div>
	);
}
