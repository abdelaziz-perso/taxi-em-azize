import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import videoSrc from '../assets/video car.mp4';
import './Hero.css';

const Hero = () => {
    const { t } = useLanguage();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Trigger fade-in animation after component mounts
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="hero" id="accueil" aria-label="Section principale - EM Taxi Touristique">
            {/* Background Video */}
            <video
                className="hero-video"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Vidéo de présentation EM Taxi Touristique - Transport premium au Maroc"
            >
                <source src={videoSrc} type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo.
            </video>

            {/* Dark Overlay */}
            <div className="hero-overlay" aria-hidden="true"></div>

            {/* Content */}
            <div className={`hero-content ${isLoaded ? 'hero-content-loaded' : ''}`}>
                <header className="hero-text">
                    <p className="hero-subtitle">{t('hero.subtitle')}</p>
                    <h1 className="hero-title">{t('hero.title')}</h1>
                </header>

                <div className="hero-cta">
                    <a href="#contact" className="btn-reserve" aria-label={`${t('hero.cta')} - EM Taxi Touristique`}>
                        {t('hero.cta')}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
