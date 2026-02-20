'use client';
import { useLanguage } from '@/context/LanguageContext';
import { languageJsonStructure } from '@/types/languageTypes';
import { motion } from 'framer-motion';
import { IoHome } from 'react-icons/io5';
import { FaCode, FaFolder, FaGithubAlt, FaLinkedinIn } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function SideBar({ page, setPage }: { page: string; setPage: (page: string) => void }) {
	const { text, language } = useLanguage() || { text: languageJsonStructure };
	const icons = [<IoHome />, <FaCode />, <FaFolder />, <FaPhoneAlt />];

	return (
		<div className="sidebar-container">
			<motion.aside
				layout="size"
				layoutDependency={language}
				transition={{
					layout: {
						type: 'spring',
						stiffness: 300,
						damping: 7,
					}
				}}
				data-lang={language}
				className="sidebar"
			>
				<ul className="pages">
					{text?.sideBarList.map((item, i) => (
						<motion.li layout="size" layoutDependency={language} key={i}>
							{/* cant just use "#${item.toLowerCase()}" because the site has 3 languages and the id's are in english, so i have to do this */}
							<Link
								href={`/#${i === 0 ? '' : i === 1 ? 'skills' : i === 2 ? 'projects' : 'contact'}`}
								onClick={() => setPage(i === 0 ? '' : i === 1 ? 'skills' : i === 2 ? 'projects' : 'contact')}
								className={`sidebar-link 
									${page === '' && i === 0 ? 'active' : ''} 
									${page === 'skills' && i === 1 ? 'active' : ''} 
									${page === 'projects' && i === 2 ? 'active' : ''}
									${page === 'contact' && i === 3 ? 'active' : ''}`}
							>
								<span>{icons[i]}</span>
								<motion.span layoutDependency={language}>{item}</motion.span>
							</Link>
						</motion.li>
					))}
				</ul>

				<motion.ul layout layoutDependency={language} className="socials">
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
