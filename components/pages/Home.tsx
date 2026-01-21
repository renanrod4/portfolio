import { useLanguage } from '@/context/LanguageContext';
import { languageJsonStructure } from '@/types/languageTypes';
import { FaPaperPlane } from "react-icons/fa";


export default function Home() {
	const { text } = useLanguage() || { text: languageJsonStructure };
	const hour = new Date().getHours();
	const dinamycText =
		hour < 12 ? text?.home.welcome.morning : hour < 18 ? text?.home.welcome.afternoon : text?.home.welcome.evening;

	return (
		<div className="home">
			<div className="col1">
				<h1>
					{dinamycText} <span>👋</span>
				</h1>
				{text?.home.description.split('\n').map((line, index) => (
					<p key={index}>{line}</p>
				))}
				<div className="chat">
					<div className="chatMessageContainer">
						<div className="message">
							<p>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae ut quam veniam soluta
								ipsum earum maiores esse maxime eligendi libero.
							</p>
						</div>
						<div className="message">
							<p>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae ut quam veniam soluta
								ipsum earum maiores esse maxime eligendi libero.
							</p>
						</div>
						<div className="message">
							<p>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae ut quam veniam soluta
								ipsum earum maiores esse maxime eligendi libero.
							</p>
						</div>
						<div className="message">
							<p>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae ut quam veniam soluta
								ipsum earum maiores esse maxime eligendi libero.
							</p>
						</div>
					</div>
					<div className="chatInputContainer">
						<input type="text" placeholder={text?.home.chatPlaceHolder} />
                        <button><FaPaperPlane size={20}/></button>
					</div>
				</div>
			</div>
			<div className="col2"></div>
		</div>
	);
}
