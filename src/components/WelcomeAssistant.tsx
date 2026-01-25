import { useState, useEffect } from 'react';
import { MessageSquare, X, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import chauffeurAvatar from '../assets/chauffeur_avatar.png';
import './WelcomeAssistant.css';

const WelcomeAssistant = () => {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [step, setStep] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const fullText = t('welcomeAssistant.message');

    useEffect(() => {
        // Show the assistant after a short delay
        const showTimer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        // Hide the assistant after 20 seconds
        const hideTimer = setTimeout(() => {
            setIsHidden(true);
        }, 20000);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    // Reset typing when language changes
    useEffect(() => {
        setStep(0);
        setDisplayedText('');
    }, [fullText]);

    useEffect(() => {
        if (isVisible && step < fullText.length) {
            const typingTimer = setTimeout(() => {
                setDisplayedText((prev) => prev + fullText[step]);
                setStep((prev) => prev + 1);
            }, 30); // Typing speed
            return () => clearTimeout(typingTimer);
        }
    }, [isVisible, step, fullText]);

    const handleClose = () => {
        setIsVisible(false);
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            setIsVisible(false);
        }
    };

    if (isHidden) return null;
    if (!isVisible && step === 0) return null;

    return (
        <div className={`welcome-assistant ${isVisible ? 'assistant-visible' : 'assistant-hidden'} ${isHidden ? 'hidden' : ''}`}>
            <div className="assistant-card">
                <button className="assistant-close" onClick={handleClose}>
                    <X size={16} />
                </button>

                <div className="assistant-header">
                    <div className="assistant-avatar">
                        <img src={chauffeurAvatar} alt="EM Assistant - Assistant virtuel EM Taxi Touristique" />
                        <span className="online-indicator" aria-label="En ligne"></span>
                    </div>
                    <div className="assistant-info">
                        <h3>{t('welcomeAssistant.title')}</h3>
                        <p>{t('welcomeAssistant.online')}</p>
                    </div>
                </div>

                <div className="assistant-body">
                    <div className="message-bubble">
                        <p>{displayedText}<span className="cursor">|</span></p>
                    </div>
                </div>

                <div className="assistant-footer">
                    <button className="assistant-cta" onClick={scrollToContact}>
                        <span>{t('welcomeAssistant.cta')}</span>
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="assistant-toggle" onClick={() => setIsVisible(true)}>
                <MessageSquare size={24} />
            </div>
        </div>
    );
};

export default WelcomeAssistant;
