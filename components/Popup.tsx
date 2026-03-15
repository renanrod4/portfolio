import { IoMdCloseCircle } from "react-icons/io";

export default function Popup({ title, message, onClose, show }: { title: string; message: string;show:boolean; onClose: () => void }) {
    return (
        <div className={`popup ${show?"open":"close"}`} onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>
                <p>{message}</p>
                <button onClick={onClose} className="close"><IoMdCloseCircle size="24" /></button>
            </div>
        </div>
    );
}