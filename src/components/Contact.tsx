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
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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
        if (status !== 'idle') {
            setStatus('idle');
        }
    };

    const createWhatsAppMessage = (data: typeof formData) => {
        const whatsappNumber = '212615919437';
        const message = `Réservez Votre Transport Premium

*Nom*: ${data.name}
*Email*: ${data.email}
${data.phone ? `*Téléphone*: ${data.phone}\n` : ''}*Service*: ${data.serviceType}
*Message*: ${data.message}`;
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate message length
        if (formData.message.length > 500) {
            setStatus('error'); // Or we could add a specific message if needed, but the UI has a counter
            return;
        }

        setStatus('submitting');

        try {
            // Validate form data before sending
            if (!formData.name || !formData.email || !formData.serviceType || !formData.message) {
                setStatus('error');
                alert('Veuillez remplir tous les champs obligatoires.');
                setTimeout(() => setStatus('idle'), 3000);
                return;
            }

            // Determine API URL based on environment
            // In localhost, try Docker API first, then fallback to /contact.php
            const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const dockerApiUrl = 'http://localhost:9090/api/send-email.php';
            const apiUrl = import.meta.env.VITE_API_URL || (isLocalhost ? dockerApiUrl : '/contact.php');

            console.log('Sending form data to PHP API...', { apiUrl, formData });
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Check if response is ok
            if (!response.ok) {
                const errorText = await response.text();
                console.error('HTTP error:', response.status, errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse JSON response
            let result;
            try {
                const responseText = await response.text();
                console.log('Raw PHP Response:', responseText);
                result = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Failed to parse JSON response:', parseError);
                throw new Error('Réponse invalide du serveur');
            }

            console.log('PHP Response:', result);

            if (result.success) {
                setStatus('success');
                console.log('Email sent successfully! Waiting 2 seconds before opening WhatsApp...');

                // Wait 2 seconds, then open WhatsApp with the same data
                setTimeout(() => {
                    const whatsappUrl = createWhatsAppMessage(formData);
                    console.log('Opening WhatsApp with form data...');
                    
                    const newWindow = window.open(whatsappUrl, '_blank');
                    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                        console.error('Popup blocked!');
                        alert('Le message a été envoyé par email, mais l\'ouverture de WhatsApp a été bloquée par votre navigateur. Veuillez autoriser les pop-ups pour ce site.');
                    }
                }, 2000);

                setFormData({ name: '', email: '', phone: '', serviceType: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                console.error('PHP returned success: false', result.message);
                setStatus('error');
                const errorMsg = result.message || 'Erreur lors de l\'envoi du message. Veuillez réessayer ou nous contacter directement.';
                alert(errorMsg);
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setStatus('error');
            let errorMessage = 'Erreur de connexion. ';
            
            if (error instanceof Error) {
                if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                    if (isLocalhost) {
                        errorMessage += 'Assurez-vous que Docker est démarré et que l\'API PHP est accessible sur http://localhost:9090';
                    } else {
                        errorMessage += 'Veuillez vérifier votre connexion internet.';
                    }
                } else if (error.message.includes('HTTP error')) {
                    errorMessage += 'Le serveur a renvoyé une erreur. Veuillez réessayer plus tard.';
                } else {
                    errorMessage += error.message;
                }
            } else {
                errorMessage += 'Veuillez réessayer ou nous contacter directement.';
            }
            
            alert(errorMessage);
            setTimeout(() => setStatus('idle'), 5000);
        }
    };


    const contactInfo = [
        {
            id: 1,
            icon: Phone,
            title: t('contact.info.phone.title'),
            value: '+212 6 15 91 94 37',
            subtitle: t('contact.info.phone.subtitle'),
            link: 'tel:+212615919437',
        },
        {
            id: 2,
            icon: MessageSquare,
            title: t('contact.info.whatsapp.title'),
            value: '+212 6 15 91 94 37',
            subtitle: t('contact.info.whatsapp.subtitle'),
            link: 'https://wa.me/212615919437',
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
                            {status === 'success' && (
                                <div className="contact-alert alert-success" data-aos="fade-in">
                                    ✅ Votre message a été envoyé avec succès ! Nous vous contacterons bientôt.
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="contact-alert alert-error" data-aos="fade-in">
                                    ❌ Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.
                                </div>
                            )}

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
                                    disabled={status === 'submitting'}
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
                                    disabled={status === 'submitting'}
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
                                    placeholder="+212 6XX XX XX XX"
                                    disabled={status === 'submitting'}
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
                                    disabled={status === 'submitting'}
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
                                    disabled={status === 'submitting'}
                                />
                                <span className="character-count">{formData.message.length}/500 {t('contact.form.characters')}</span>
                            </div>



                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`contact-submit-btn ${status === 'submitting' ? 'loading' : ''}`}
                                disabled={status === 'submitting'}
                            >
                                {status === 'submitting' ? (
                                    <div className="loader"></div>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        <span>Envoyer le Message</span>
                                    </>
                                )}
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
