import MagicBento from "../shadcn/MagicBento";

export default function Projects() {
    return (
        <>

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
        </>
    );
}