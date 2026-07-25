import { IoMdCloseCircle } from 'react-icons/io';

export default function Popup({
	title,
	message,
	onClose,
	show,
	buttonAcceptText,
    buttonAcceptAction,
	buttonDenyText,
    className
}: {
	title: string;
	message: string;
	show: boolean;
	onClose: () => void;
	buttonAcceptText?: string;
    buttonAcceptAction?: () => void;
	buttonDenyText?: string;
    className?: string;
}) {
	return (
		<div className={`popup ${show ? 'open' : 'close'}` + (className ? ` ${className}` : '')} onClick={onClose}>
			<div className="popup-content" onClick={e => e.stopPropagation()}>
				<h2>{title}</h2>
				<p>{message}</p>
				<button onClick={onClose} className="close">
					<IoMdCloseCircle size="24" />
				</button>
                <div className="buttons">
                    {buttonAcceptText && (
                        <button className="send-button accept" onClick={() => {
                            if (buttonAcceptAction) {
                                buttonAcceptAction();
                            }
                            onClose();
                        }}>
                            {buttonAcceptText}
                        </button>
                    )}
                    {buttonDenyText && (
                        <button className="send-button deny" onClick={onClose}>
                            {buttonDenyText}
                        </button>
                    )}
                </div>
			</div>
		</div>
	);
}
