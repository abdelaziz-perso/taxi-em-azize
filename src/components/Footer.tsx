import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import logo from '../assets/logo.png';
import paypalLogo from '../assets/paypal.png';
import payoneerLogo from '../assets/payonner.png';
import './Footer.css';

const Footer = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: t('navbar.home'), href: '#accueil' },
        { name: t('navbar.services'), href: '#services' },
        { name: t('navbar.pricing'), href: '#tarifs' },
        { name: t('navbar.about'), href: '#apropos' },
        { name: t('navbar.contact'), href: '#contact' },
    ];

    const services = [
        t('services.airport.title'),
        t('services.business.title'),
        t('services.events.title'),
        t('services.onDemand.title'),
        t('services.privateDriver'),
    ];

    const contactInfo = [
        {
            icon: MapPin,
            title: t('footer.address'),
            content: t('footer.addressValue'),
        },
        {
            icon: Phone,
            title: t('footer.phone'),
            content: '+212 7 62 72 87 06',
            link: 'tel:+212762728706',
        },
        {
            icon: Mail,
            title: t('footer.email'),
            content: 'em.taxi.maroc@gmail.com',
            link: 'mailto:em.taxi.maroc@gmail.com',
        },
        {
            icon: Clock,
            title: t('footer.hours'),
            content: t('footer.hoursValue'),
        },
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
    ];

    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Main Footer Content */}
                <div className="footer-main">
                    {/* Company Info */}
                    <div className="footer-column footer-about">
                        <img src={logo} alt="EM Taxi Touristique - Logo - Transport Premium au Maroc" className="footer-logo" />
                        <h3 className="footer-company-name">EM Taxi Touristique</h3>
                        <p className="footer-description">
                            {t('footer.description')}
                        </p>
                        <div className="footer-social">
                            {socialLinks.map((social) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className="footer-social-link"
                                        aria-label={social.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <IconComponent size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h4 className="footer-column-title">{t('footer.quickLinks')}</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href}>{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-column">
                        <h4 className="footer-column-title">{t('footer.ourServices')}</h4>
                        <ul className="footer-links">
                            {services.map((service) => (
                                <li key={service}>
                                    <span>{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-column">
                        <h4 className="footer-column-title">{t('footer.contactUs')}</h4>
                        <div className="footer-contact-list">
                            {contactInfo.map((info) => {
                                const IconComponent = info.icon;
                                const content = info.link ? (
                                    <a href={info.link}>{info.content}</a>
                                ) : (
                                    <span>{info.content}</span>
                                );

                                return (
                                    <div key={info.title} className="footer-contact-item">
                                        <div className="footer-contact-icon">
                                            <IconComponent size={18} />
                                        </div>
                                        <div className="footer-contact-content">
                                            <p className="footer-contact-title">{info.title}</p>
                                            {content}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="footer-payment">
                    <h4 className="footer-payment-title">{t('footer.paymentMethods')}</h4>
                    <div className="footer-payment-methods">
                        <div className="footer-payment-item" title="Visa">
                            <div className="payment-icon payment-visa">
                                <span>VISA</span>
                            </div>
                            <span>Visa</span>
                        </div>
                        <div className="footer-payment-item" title="Mastercard">
                            <div className="payment-icon payment-mastercard">
                                <div className="mc-circle mc-circle-left"></div>
                                <div className="mc-circle mc-circle-right"></div>
                            </div>
                            <span>Mastercard</span>
                        </div>
                        <div className="footer-payment-item" title="PayPal">
                            <div className="payment-icon no-bg">
                                <img src={paypalLogo} alt="PayPal" className="payment-img" />
                            </div>
                            <span>PayPal</span>
                        </div>
                        <div className="footer-payment-item" title="Payoneer">
                            <div className="payment-icon no-bg">
                                <img src={payoneerLogo} alt="Payoneer" className="payment-img" />
                            </div>
                            <span>Payoneer</span>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p className="footer-copyright">
                            © {currentYear} EM Taxi Touristique. {t('footer.copyright')}
                        </p>
                        <div className="footer-legal">
                            <a href="#privacy">{t('footer.privacy')}</a>
                            <span className="footer-separator">•</span>
                            <a href="#terms">{t('footer.terms')}</a>
                            <span className="footer-separator">•</span>
                            <a href="#mentions">{t('footer.legal')}</a>
                        </div>
                    </div>
                    <div className="footer-developers">
                        <p className="footer-developer-text">
                            {t('footer.developedBy')}{' '}
                            <a
                                href="https://www.linkedin.com/in/abdelaziz-elhathout-191290208/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-developer-link"
                            >
                                Abdelaziz
                            </a>
                            {' '}&{' '}
                            <a
                                href="https://www.linkedin.com/in/hamza-dbani/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-developer-link"
                            >
                                Hamza
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
