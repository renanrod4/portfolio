import { useLanguage } from '@/context/LanguageContext';
import { languageJsonStructure } from '@/types/languageTypes';
import { useState } from 'react';
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
				<Chat text={text} />
			</div>
			<div className="col2"></div>
		</div>
	);
}
type ChatMessage = { role: 'user' | 'ai'; content: string };
function Chat({ text }: { text: typeof languageJsonStructure }) {
	const [inputChat, setInputChat] = useState('');
	const [chatMessages, setChatMessages] = useState<Array<ChatMessage>>([]);
	function handleSubmitChat(e: React.FormEvent) {
		e.preventDefault();
		if (!inputChat.trim()) return;
		const newUserMessage: ChatMessage = { role: 'user', content: inputChat.trim()};
		setChatMessages((prev) => [...prev, newUserMessage]);
		setInputChat('');

		async function fetchAIResponse() {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: newUserMessage.content }),
			});
			const data = await response.json();
			const newAIMessage: ChatMessage = { role: 'ai', content: data.response };
			setChatMessages((prev) => [...prev, newAIMessage]);
		}
		fetchAIResponse();

	}

	return (
		<div className="chat">
			<div className="chatMessageContainer">
				{chatMessages.map((msg, index) => (
					<div key={index} className={`message ${msg.role === 'user' ? 'userMessage' : 'aiMessage'}`}>
						<p>{msg.content}</p>
					</div>
				))}
			</div>
			<div className="chatInputContainer">
				<input type="text" placeholder={text?.home.chatPlaceHolder} value={inputChat} onChange={(e) => setInputChat(e.target.value)} />
				<button onClick={handleSubmitChat} ><FaPaperPlane size={20}/></button>
			</div>
		</div>
	)
}