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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const whatsappNumber = '212762728706'; // Fixed the number (removed the extra '7')
        const message = `Bonjour EM Taxi, 
Je demande un service :
*Nom*: ${formData.name}
*Service*: ${formData.serviceType}
*Email*: ${formData.email}
*Message*: ${formData.message}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Localhost bypass: Let user test WhatsApp even if PHP is not running
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Localhost detected: Opening WhatsApp and simulating success.');
            setStatus('success');
            window.open(whatsappUrl, '_blank');
            setFormData({ name: '', email: '', phone: '', serviceType: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
            return;
        }

        try {
            console.log('Sending form data to PHP...', formData);
            const response = await fetch('/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('PHP Response:', result);

            if (result.success) {
                setStatus('success');
                console.log('Success! Preparing WhatsApp redirect...');

                // Open WhatsApp in a new tab
                const newWindow = window.open(whatsappUrl, '_blank');
                if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                    console.error('Popup blocked!');
                    alert('Le message a été envoyé par email, mais l\'ouverture de WhatsApp a été bloquée par votre navigateur. Veuillez autoriser les pop-ups pour ce site.');
                }

                setFormData({ name: '', email: '', phone: '', serviceType: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                console.error('PHP returned success: false', result.message);
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
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
                                <label htmlFor="name">Votre Nom *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Jean Dupont"
                                    required
                                    disabled={status === 'submitting'}
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
                                    disabled={status === 'submitting'}
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
                                    disabled={status === 'submitting'}
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
                                    disabled={status === 'submitting'}
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
                                    disabled={status === 'submitting'}
                                />
                                <span className="character-count">{formData.message.length}/500 caractères</span>
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
