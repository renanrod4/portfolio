import { sendEmailAction } from "@/app/actions";
import { useLanguage } from "@/context/LanguageContext";
import { languageJsonStructure } from "@/types/languageTypes";
import Link from "next/link";
import {  useState } from "react";
import { FaGithubAlt, FaLinkedinIn, FaLocationDot, FaEnvelope } from "react-icons/fa6";

export default function Contact() {
    // form use States
    const [name, setName] =useState("");
    const [email, setEmail] =useState("");
    const [telephone, setTelephone] =useState("");
    const [message, setMessage] =useState("");

    const [isSending, setIsSending] = useState(false);

    async function handleSubmit(formData: FormData) { 
    setIsSending(true);
    
    const result = await sendEmailAction({ name, email, telephone, message });

    if (result.success) {
        // pushNotification({
        //     title: "Mensagem enviada!",
        //     message: "Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.",
        //     type: "success",
        // });
        setName("");
        setEmail("");
        setTelephone("");
        setMessage("");
    } else {
        alert("Erro ao enviar mensagem.");
    }
    
    setIsSending(false);
}
    
    const { text } = useLanguage() || { text: languageJsonStructure };

    return (
        <div className="contact">
            <div className="bento-grid">

                <div className="left-column">

                    <div className="card">
                        <div className="icon">
                            <FaLocationDot />
                        </div>
                        <div className="text">
                            <h3>{text.contact.location}</h3>
                            <p>Vargem Grande Paulista, SP - Brazil</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="icon">
                            <FaEnvelope size="18" />

                        </div>
                        <div className="text">
                            <h3>{text.contact.email}</h3>
                            <p>renanrdemeneses@gmail.com</p>
                        </div>
                    </div>

                    <div className="card socials">
                        <h3>{text.contact.socialsMessage}</h3>
                        <div className="links">
                            <Link href="https://github.com/renanrod4" className="icon github">
                                <FaGithubAlt size="24" />
                            </Link>
                            <Link href="https://www.linkedin.com/in/renanrod4/" className="icon linkedin">
                                <FaLinkedinIn size="24" />

                            </Link>
                            <div className="icon email">
                                <Link href="mailto:renanrdemeneses@gmail.com">
                                    <FaEnvelope size="22" />
                                </Link>
                                <span>renanrdemeneses@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    <div className="card quick-response-card">
                        <p>
                            <span>{text.contact.quickResponse.span}</span> {text.contact.quickResponse.text}
                        </p>
                    </div>

                </div>

                <div className="card form-card">
                    <h2>{text.contact.message.title}</h2>
                    <p>{text.contact.message.description}</p>
                    <form action={handleSubmit}>
                        <div className="inputs">
                            <label>{text.contact.message.labels.name}<span>*</span></label>
                            <input name="name" type="text" placeholder={text.contact.message.placeholders.name} required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="form-row">
                            <div className="inputs">
                                <label>{text.contact.message.labels.email} <span>*</span></label>
                                <input name="email" type="email" placeholder={text.contact.message.placeholders.email} required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="inputs">
                                <label>{text.contact.message.labels.telephone} <span>*</span></label>
                                <input name="telephone" type="text" placeholder={text.contact.message.placeholders.telephone} required value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                            </div>
                        </div>

                        <div className="inputs">
                            <label>{text.contact.message.labels.message} <span>*</span></label>
                            <textarea name="message" rows={6} placeholder={text.contact.message.placeholders.message} required value={message} onChange={(e) => setMessage(e.target.value)} >

                            </textarea>
                        </div>

                        <button type="submit" className="send-button" disabled={isSending} >
                            {isSending ? text.contact.message.sending : text.contact.message.sendButton}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}