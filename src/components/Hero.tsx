import { useEffect, useState } from 'react';
import videoSrc from '../assets/video car.mp4';
import './Hero.css';

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Trigger fade-in animation after component mounts
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="hero" id="accueil">
            {/* Background Video */}
            <video
                className="hero-video"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
            >
                <source src={videoSrc} type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo.
            </video>

            {/* Dark Overlay */}
            <div className="hero-overlay"></div>

            {/* Content */}
            <div className={`hero-content ${isLoaded ? 'hero-content-loaded' : ''}`}>
                <div className="hero-text">
                    <p className="hero-subtitle">UN SERVICE SUR MESURE POUR VOS DÉPLACEMENTS</p>
                    <h1 className="hero-title">Mise à disposition de chauffeur</h1>
                </div>

                <div className="hero-cta">
                    <a href="#contact" className="btn-reserve">
                        JE RÉSERVE MON CHAUFFEUR
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
