import { useLanguage } from '@/context/LanguageContext';
import { languageJsonStructure } from '@/types/languageTypes';
import Chat from '../Chat';


export default function Home() {
	const { text } = useLanguage() || { text: languageJsonStructure };
	const hour = new Date().getHours();
	const dinamycText =
		hour < 12 ? text?.home.welcome.morning : hour < 18 ? text?.home.welcome.afternoon : text?.home.welcome.evening;

	return (
		<div className="home">
			<div className="col1">
				<h1>
					{dinamycText} <span className='hello' >👋</span>
				</h1>
				{text?.home.description.split('\n').map((line, index) => (
					<p key={index}>{line}</p>
				))}
				<Chat text={text} />
			</div>
			<div className="col2"></div>
		</div>
	);
}
