import { languageJsonStructure } from "@/types/languageTypes";
import { ChatMessage } from "@/types/types";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa6";

export default function Chat({ text }: { text: typeof languageJsonStructure }) {
	const [inputChat, setInputChat] = useState('');
	const [chatMessages, setChatMessages] = useState<Array<ChatMessage>>([]);
	function handleSubmitChat(e: React.FormEvent) {
		e.preventDefault();
		if (!inputChat.trim()) return;
		const newUserMessage: ChatMessage = { role: 'user', content: inputChat.trim() };
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
						{msg.content.split('\n').map((line, lineIndex) => (
							// using React.Fragment to avoid extra divs
							<React.Fragment key={lineIndex}>
								{line.split(/(https?:\/\/[^\s()]+)/g).map((part, partIndex) => {
									if (/^https?:\/\/[^\s()]+$/.test(part)) {
										return (
											<a key={partIndex} href={part} target="_blank" rel="noopener noreferrer">
												{part}
											</a>
										);
									}
									return part;
								})}
								<br />
							</React.Fragment>
						))}
					</div>
				))}
			</div>
			<div className="chatInputContainer">
				<input type="text" placeholder={text?.home.chatPlaceHolder} value={inputChat} onChange={(e) => setInputChat(e.target.value)} />
				<button onClick={handleSubmitChat} ><FaPaperPlane size={20} /></button>
			</div>
		</div>
	)
}