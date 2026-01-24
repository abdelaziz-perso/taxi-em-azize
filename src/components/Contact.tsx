import { useState, useEffect } from 'react';
import { Phone, Mail, MessageSquare, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        message: '',
    });

    useEffect(() => {
        // Check if there's a pre-selected service type from URL hash
        const hash = window.location.hash;
        if (hash.includes('service=')) {
            const serviceType = hash.split('service=')[1];
            setFormData(prev => ({ ...prev, serviceType: decodeURIComponent(serviceType) }));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const contactInfo = [
        {
            id: 1,
            icon: Phone,
            title: 'Téléphone',
            value: '+212 7 62 72 87 06',
            subtitle: "L'appel pour réserver",
            link: 'tel:+212762728706',
        },
        {
            id: 2,
            icon: MessageSquare,
            title: 'WhatsApp',
            value: '+212 7 62 72 87 06',
            subtitle: "L'appel pour réserver",
            link: 'https://wa.me/212762728706',
        },
        {
            id: 3,
            icon: Mail,
            title: 'Email',
            value: 'contact@emtaxi.fr',
            subtitle: 'Cliquez pour envoyer un email',
            link: 'mailto:contact@emtaxi.fr',
        },
    ];

    return (
        <section className="contact" id="contact">
            <div className="contact-container">
                {/* Section Header */}
                <div className="contact-header">
                    <p className="contact-label">CONTACTEZ-NOUS</p>
                    <h2 className="contact-title">
                        Contact <span className="highlight">EM Taxi Touristique</span>
                    </h2>
                    <p className="contact-subtitle">
                        Nous sommes à votre écoute pour répondre à vos questions et vous offrir un service exceptionnel
                    </p>
                </div>

                {/* Contact Content Grid */}
                <div className="contact-content">
                    {/* Left Side - Contact Form */}
                    <div className="contact-form-wrapper">
                        <form className="contact-form">
                            {/* Name Field */}
                            <div className="form-group">
                                <label htmlFor="name">Votre Nom *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Jean Dupont"
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div className="form-group">
                                <label htmlFor="email">Adresse Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="jeandupont@exemple.com"
                                    required
                                />
                            </div>

                            {/* Phone Field */}
                            <div className="form-group">
                                <label htmlFor="phone">Numéro de Téléphone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+212 6XX XX XX XX"
                                />
                            </div>

                            {/* Service Type Dropdown */}
                            <div className="form-group">
                                <label htmlFor="serviceType">Type de Service *</label>
                                <select
                                    id="serviceType"
                                    name="serviceType"
                                    value={formData.serviceType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez un service</option>
                                    <option value="Standard">Standard - Berline Luxe</option>
                                    <option value="Affaires">Affaires - Berline Executive</option>
                                    <option value="Premium">Premium - Van/SUV de Luxe</option>
                                    <option value="Transfert Aéroport">Transfert Aéroport</option>
                                    <option value="Professionnel & Entreprise">Professionnel & Entreprise</option>
                                    <option value="Événements & Occasions Spéciales">Événements & Occasions Spéciales</option>
                                    <option value="Service à la Demande">Service à la Demande</option>
                                    <option value="Autre">Autre</option>
                                </select>
                            </div>

                            {/* Message Field */}
                            <div className="form-group">
                                <label htmlFor="message">Votre Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Comment pouvons-nous vous aider ?"
                                    rows={5}
                                    required
                                />
                                <span className="character-count">{formData.message.length}/500 caractères</span>
                            </div>

                            {/* Submit Button */}
                            <button type="button" className="contact-submit-btn">
                                <Send size={20} />
                                <span>Envoyer le Message</span>
                            </button>
                        </form>
                    </div>

                    {/* Right Side - Contact Info Cards */}
                    <div className="contact-info-wrapper">
                        {contactInfo.map((info) => {
                            const IconComponent = info.icon;
                            return (
                                <a
                                    key={info.id}
                                    href={info.link}
                                    className="contact-info-card"
                                    target={info.id === 2 ? '_blank' : undefined}
                                    rel={info.id === 2 ? 'noopener noreferrer' : undefined}
                                >
                                    <div className="contact-info-icon">
                                        <IconComponent size={24} />
                                    </div>
                                    <div className="contact-info-content">
                                        <h4 className="contact-info-title">{info.title}</h4>
                                        <p className="contact-info-value">{info.value}</p>
                                        <p className="contact-info-subtitle">{info.subtitle}</p>
                                    </div>
                                </a>
                            );
                        })}

                        {/* Email CTA Box */}
                        <div className="contact-email-cta">
                            <div className="contact-email-icon">
                                <Mail size={32} />
                            </div>
                            <h3 className="contact-email-title">Contactez-nous par Email</h3>
                            <p className="contact-email-description">
                                Envoyez-nous un email et nous vous répondrons dans les plus brefs délais.
                            </p>
                            <a href="mailto:contact@emtaxi.fr" className="contact-email-btn">
                                <Mail size={18} />
                                contact@emtaxi.fr
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
