import Link from "next/link";
import { FaGithubAlt, FaLinkedinIn, FaLocationDot, FaEnvelope } from "react-icons/fa6";

export default function Contact() {
    return (
        <div className="contact">
            <div className="bento-grid">

                <div className="left-column">

                    <div className="card">
                        <div className="icon">
                            <FaLocationDot />
                        </div>
                        <div className="text">
                            <h3>Location</h3>
                            <p>Vargem Grande Paulista, SP</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="icon">
                            <FaEnvelope size="18" />

                        </div>
                        <div className="text">
                            <h3>Email</h3>
                            <p>renanrdemeneses@gmail.com</p>
                        </div>
                    </div>

                    <div className="card socials">
                        <h3>Connect With Me</h3>
                        <div className="links">
                            <Link href="https://github.com/renanrod4" className="icon github">
                                <FaGithubAlt size="24" />
                            </Link>
                            <Link href="https://www.linkedin.com/in/renanrod4/" className="icon linkedin">
                                <FaLinkedinIn size="24" />

                            </Link>
                            <Link href="mailto:renanrdemeneses@gmail.com" className="icon email">
                                <FaEnvelope size="22" />
                            </Link>
                        </div>
                    </div>

                    <div className="card quick-response-card">
                        <p>
                            <span>Respondo em menos de 3 horas!</span> Se você tem uma pergunta rápida ou quer discutir um projeto, não hesite em me enviar uma mensagem
                        </p>
                    </div>

                </div>

                <div className="card form-card">
                    <h2>Send Me a Message</h2>
                    <p>Preencha o formulário abaixo e eu entrarei em contato o mais breve possível.</p>

                    <form>
                        <div className="inputs">
                            <label>Full Name <span>*</span></label>
                            <input type="text" placeholder="Seu nome completo" required />
                        </div>

                        <div className="form-row">
                            <div className="inputs">
                                <label>Email <span>*</span></label>
                                <input type="email" placeholder="seu@email.com" required />
                            </div>
                            <div className="inputs">
                                <label>Mobile <span>*</span></label>
                                <input type="text" placeholder="(11) 99999-9999" required />
                            </div>
                        </div>

                        <div className="inputs">
                            <label>Message <span>*</span></label>
                            <textarea rows={6} placeholder="Como posso te ajudar?" required></textarea>
                        </div>

                        <button type="submit" className="send-button">
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}