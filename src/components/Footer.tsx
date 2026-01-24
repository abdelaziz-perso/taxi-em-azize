import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import rabatImg from '../assets/rabat.jpg';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Accueil', href: '#accueil' },
        { name: 'Services', href: '#services' },
        { name: 'Tarifs', href: '#tarifs' },
        { name: 'À propos', href: '#apropos' },
        { name: 'Contact', href: '#contact' },
    ];

    const services = [
        'Transferts Aéroport',
        'Transport Professionnel',
        'Événements Spéciaux',
        'Service à la Demande',
        'Chauffeur Privé',
    ];

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Adresse',
            content: '45 Avenue Mohammed V, Rabat 10000, Maroc',
        },
        {
            icon: Phone,
            title: 'Téléphone',
            content: '+212 7 62 72 87 06',
            link: 'tel:+212762728706',
        },
        {
            icon: Mail,
            title: 'Email',
            content: 'contact@emtaxi.fr',
            link: 'mailto:contact@emtaxi.fr',
        },
        {
            icon: Clock,
            title: 'Horaires',
            content: '24/7 - Service disponible',
        },
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
    ];

    return (
        <footer className="footer">
            {/* Background Image */}
            <div className="footer-background">
                <img src={rabatImg} alt="Rabat, Maroc" />
                <div className="footer-overlay"></div>
            </div>

            <div className="footer-content">
                {/* Main Footer Content */}
                <div className="footer-main">
                    {/* Company Info */}
                    <div className="footer-column footer-about">
                        <img src={logo} alt="EM Taxi Touristique" className="footer-logo" />
                        <h3 className="footer-company-name">EM Taxi Touristique</h3>
                        <p className="footer-description">
                            Votre partenaire de confiance pour un transport premium et professionnel au Maroc.
                            Excellence, ponctualité et confort depuis 2009.
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
                        <h4 className="footer-column-title">Liens Rapides</h4>
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
                        <h4 className="footer-column-title">Nos Services</h4>
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
                        <h4 className="footer-column-title">Contactez-nous</h4>
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

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p className="footer-copyright">
                            © {currentYear} EM Taxi Touristique. Tous droits réservés.
                        </p>
                        <div className="footer-legal">
                            <a href="#privacy">Politique de confidentialité</a>
                            <span className="footer-separator">•</span>
                            <a href="#terms">Conditions d'utilisation</a>
                            <span className="footer-separator">•</span>
                            <a href="#mentions">Mentions légales</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
