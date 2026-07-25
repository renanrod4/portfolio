import { useLanguage } from '@/context/LanguageContext';
import MagicBento from '../shadcn/MagicBento';
import { languageJsonStructure } from '@/types/languageTypes';
import Popup from '../Popup';
import { useEffect, useState } from 'react';

export default function Projects() {
	const { text } = useLanguage() || { text: languageJsonStructure };
	// On scroll all to the bottom of the page, popup will appear with a message to visit my GitHub profile, and will disappear after 10 seconds
	const [openPopup, setOpenPopup] = useState(false);
	const [isAnimatingOut, setIsAnimatingOut] = useState(false);

	function handleClosePopup() {
		setIsAnimatingOut(true);
		setTimeout(() => {
			setOpenPopup(false);
			setIsAnimatingOut(false);
		}, 500);
	}
	function handleOpenPopup() {
		setOpenPopup(true);
		setTimeout(() => {
			handleClosePopup();
		}, 10000);
	}
    useEffect(() => {
        function handleScroll() {
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            if (scrollPosition >= documentHeight) {
                handleOpenPopup();
                window.removeEventListener('scroll', handleScroll);
            }
        }
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    
	return (
		<>
			<div className="projects">
				<h1>{text.projects.title as string}</h1>

				<MagicBento
					textAutoHide={true}
					enableStars
					enableSpotlight
					enableBorderGlow={true}
					enableTilt={false}
					enableMagnetism={false}
					clickEffect
					spotlightRadius={400}
					particleCount={12}
					glowColor="139, 61, 236"
					disableAnimations={false}
				/>
			</div>
			{openPopup && (
				<Popup
					title={text.popups.projects.title}
					message={text.popups.projects.message}
                    buttonAcceptText={text.popups.projects.buttonAcceptText}
                    buttonAcceptAction={() => window.open('https://github.com/renanrod4', '_blank')}
                    buttonDenyText={text.popups.projects.buttonDenyText}
					show={!isAnimatingOut}
					onClose={handleClosePopup}
                    className="projects-popup"
				/>
			)}
		</>
	);
}
