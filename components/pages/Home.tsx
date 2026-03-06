'use client';
import { useLanguage } from '@/context/LanguageContext';
import { languageJsonStructure } from '@/types/languageTypes';
import Chat from '../Chat';
import Image from 'next/image';


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
			<div className="col2">
				<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
					<defs>
						{/* 1. Molde da imagem (levemente menor para criar a margem) */}
						<clipPath id="meuBlob">
							<path
								d="M46.7,-48.4C57.5,-35.8,61.2,-17.9,60.5,-0.7C59.8,16.6,54.8,33.1,43.9,45.4C33.1,57.7,16.6,65.7,4.7,61.1C-7.2,56.4,-14.5,39,-29.9,26.8C-45.3,14.5,-68.9,7.2,-75.9,-7C-82.8,-21.2,-73.2,-42.3,-57.7,-54.9C-42.3,-67.5,-21.2,-71.4,-1.6,-69.8C17.9,-68.2,35.8,-61,46.7,-48.4Z"
								transform="translate(100 100) scale(0.95)" // Reduzi para 90% (0.9) para criar a margem
							/>
						</clipPath>
					</defs>

					{/* 2. A Borda (O path original, apenas com contorno) */}
					<path
						d="M46.7,-48.4C57.5,-35.8,61.2,-17.9,60.5,-0.7C59.8,16.6,54.8,33.1,43.9,45.4C33.1,57.7,16.6,65.7,4.7,61.1C-7.2,56.4,-14.5,39,-29.9,26.8C-45.3,14.5,-68.9,7.2,-75.9,-7C-82.8,-21.2,-73.2,-42.3,-57.7,-54.9C-42.3,-67.5,-21.2,-71.4,-1.6,-69.8C17.9,-68.2,35.8,-61,46.7,-48.4Z"
						transform="translate(100 100)"
						fill="none"
						stroke="#8B3DEC"
						strokeWidth="1"
					/>

					<image
						href="/images/pfp.jpeg"
						width='80%'
						height='80%'
						y='30'
						x='15'
						clipPath="url(#meuBlob)"
						preserveAspectRatio="xMidYMid slice"

					/>
				</svg>
			</div>
		</div>
	);
}
