'use client';
import { useLanguage } from '@/context/LanguageContext';
import { languageJsonStructure } from '@/types/languageTypes';
import { IoHome } from 'react-icons/io5';
import { FaCode } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaFolder } from 'react-icons/fa';
import { FaGithubAlt } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';

export default function SideBar() {
	const { text } = useLanguage() || { text: languageJsonStructure };
	const icons = [<IoHome />, <FaCode />, <FaFolder />, <FaPhoneAlt />];
	return (
		<aside>
			<ul className='pages'>
				{text?.sideBarList.map((item, i) => (
					<li key={i}>
						<span>{icons[i]}</span> {item}
					</li>
				))}
			</ul>
			<ul className="socials">
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
			</ul>
		</aside>
	);
}
