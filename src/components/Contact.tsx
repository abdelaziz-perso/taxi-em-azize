import { useState, useEffect } from 'react';
import { Phone, Mail, MessageSquare, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './Contact.css';

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
        type: null,
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

        // Limit message to 500 characters
        if (name === 'message' && value.length > 500) {
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear status when user starts typing
        if (submitStatus.type) {
            setSubmitStatus({ type: null, message: '' });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate message length
        if (formData.message.length > 500) {
            setSubmitStatus({
                type: 'error',
                message: 'Le message ne peut pas dépasser 500 caractères',
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            // API endpoint - adjust URL based on your environment
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9090/api/send-email.php';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setSubmitStatus({
                    type: 'success',
                    message: data.message || 'Votre message a été envoyé avec succès!',
                });
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    serviceType: '',
                    message: '',
                });
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: data.message || 'Erreur lors de l\'envoi du message. Veuillez réessayer.',
                });
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus({
                type: 'error',
                message: 'Erreur de connexion. Assurez-vous que le serveur PHP est démarré.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    const contactInfo = [
        {
            id: 1,
            icon: Phone,
            title: t('contact.info.phone.title'),
            value: '+212 7 62 72 87 06',
            subtitle: t('contact.info.phone.subtitle'),
            link: 'tel:+212762728706',
        },
        {
            id: 2,
            icon: MessageSquare,
            title: t('contact.info.whatsapp.title'),
            value: '+212 7 62 72 87 06',
            subtitle: t('contact.info.whatsapp.subtitle'),
            link: 'https://wa.me/212762728706',
        },
        {
            id: 3,
            icon: Mail,
            title: t('contact.info.email.title'),
            value: 'contact@emtaxi.fr',
            subtitle: t('contact.info.email.subtitle'),
            link: 'mailto:contact@emtaxi.fr',
        },
    ];

    return (
        <section className="contact" id="contact" aria-label="Contactez-nous pour réserver votre transport premium">
            <div className="contact-container">
                {/* Section Header */}
                <header className="contact-header">
                    <p className="contact-label">{t('contact.label')}</p>
                    <h2 className="contact-title">
                        {t('contact.title')} <span className="highlight">{t('contact.titleHighlight')}</span>
                    </h2>
                    <p className="contact-subtitle">
                        {t('contact.subtitle')}
                    </p>
                </header>

                {/* Contact Content Grid */}
                <div className="contact-content">
                    {/* Left Side - Contact Form */}
                    <div className="contact-form-wrapper">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            {/* Name Field */}
                            <div className="form-group">
                                <label htmlFor="name">{t('contact.form.name')}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.namePlaceholder')}
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div className="form-group">
                                <label htmlFor="email">{t('contact.form.email')}</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.emailPlaceholder')}
                                    required
                                />
                            </div>

                            {/* Phone Field */}
                            <div className="form-group">
                                <label htmlFor="phone">{t('contact.form.phone')}</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.phonePlaceholder')}
                                />
                            </div>

                            {/* Service Type Dropdown */}
                            <div className="form-group">
                                <label htmlFor="serviceType">{t('contact.form.service')} *</label>
                                <select
                                    id="serviceType"
                                    name="serviceType"
                                    value={formData.serviceType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">{t('contact.form.servicePlaceholder')}</option>
                                    <option value="Standard">{t('contact.form.serviceOptions.standard')}</option>
                                    <option value="Affaires">{t('contact.form.serviceOptions.business')}</option>
                                    <option value="Premium">{t('contact.form.serviceOptions.premium')}</option>
                                    <option value="Transfert Aéroport">{t('contact.form.serviceOptions.airport')}</option>
                                    <option value="Professionnel & Entreprise">{t('contact.form.serviceOptions.businessService')}</option>
                                    <option value="Événements & Occasions Spéciales">{t('contact.form.serviceOptions.events')}</option>
                                    <option value="Service à la Demande">{t('contact.form.serviceOptions.onDemand')}</option>
                                    <option value="Autre">{t('contact.form.serviceOptions.other')}</option>
                                </select>
                            </div>

                            {/* Message Field */}
                            <div className="form-group">
                                <label htmlFor="message">{t('contact.form.message')}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.messagePlaceholder')}
                                    rows={5}
                                    required
                                />
                                <span className="character-count">{formData.message.length}/500 {t('contact.form.characters')}</span>
                            </div>

                            {/* Status Message */}
                            {submitStatus.type && (
                                <div className={`form-status ${submitStatus.type}`}>
                                    {submitStatus.message}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="contact-submit-btn"
                                disabled={isSubmitting}
                            >
                                <Send size={20} />
                                <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le Message'}</span>
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
                            <h3 className="contact-email-title">{t('contact.emailCta.title')}</h3>
                            <p className="contact-email-description">
                                {t('contact.emailCta.description')}
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
