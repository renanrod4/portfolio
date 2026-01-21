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
                        <div className="message userMessage">
                            <p>Você está disponível para novos projetos?</p>
                        </div>
						<div className="message aiMessage">
							<p>
								Sim, estou disponível para novos projetos! Fique à vontade para entrar em contato comigo
                                através do meu e-mail ou redes sociais. Estou ansioso para colaborar em novos desafios e
                                construir algo incrível juntos!
							</p>
						</div>
                        <div className="message userMessage">
                            <p>Quais tecnologias você mais utiliza?</p>
                        </div>
                        <div className="message aiMessage">
                            <p>
                                Eu utilizo uma variedade de tecnologias, mas minhas favoritas incluem JavaScript, TypeScript,
                                React, Next.js, Node.js e Python. Também tenho experiência com bancos de dados como
                                PostgreSQL e MongoDB, além de ferramentas de versionamento como Git. Estou sempre aberto a
                                aprender novas tecnologias conforme as necessidades dos projetos.
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
