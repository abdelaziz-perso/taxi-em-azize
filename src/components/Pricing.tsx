import { Check } from 'lucide-react';
import './Pricing.css';

const Pricing = () => {
    const pricingPlans = [
        {
            id: 1,
            name: 'Standard',
            description: 'Parfait pour les transferts aéroport et les trajets en ville',
            category: 'BERLINE LUXE',
            vehicle: 'Mercedes Classe E, BMW Série 5',
            features: [
                'Chauffeur professionnel',
                'Suivi de vol',
                'Eau minérale offerte',
                'Chargeurs téléphone',
                "Jusqu'à 3 passagers",
            ],
            buttonText: 'Réserver Maintenant',
            highlighted: false,
        },
        {
            id: 2,
            name: 'Affaires',
            badge: 'LE PLUS POPULAIRE',
            description: 'Idéal pour les dirigeants et voyages professionnels',
            category: 'BERLINE EXECUTIVE',
            vehicle: 'Mercedes Classe S, BMW Série 7',
            features: [
                'Toutes les options Standard',
                'Wi-Fi à bord',
                'Journaux quotidiens',
                'Cloison de confidentialité',
                "Jusqu'à 3 passagers",
                'Réservation prioritaire',
            ],
            buttonText: 'Réserver Maintenant',
            highlighted: true,
        },
        {
            id: 3,
            name: 'Premium',
            description: 'Luxe ultime pour les occasions spéciales',
            category: 'VAN / SUV DE LUXE',
            vehicle: 'Mercedes V-Class, Range Rover',
            features: [
                'Toutes les options Affaires',
                'Service champagne',
                'Système audio premium',
                "Éclairage d'ambiance",
                "Jusqu'à 7 passagers",
                'Service tapis rouge',
            ],
            buttonText: 'Réserver Maintenant',
            highlighted: false,
        },
    ];

    return (
        <section className="pricing" id="tarifs">
            <div className="pricing-container">
                {/* Section Header */}
                <div className="pricing-header">
                    <p className="pricing-label">TARIFICATION TRANSPARENTE</p>
                    <h2 className="pricing-title">Choisissez Votre Expérience</h2>
                    <p className="pricing-subtitle">
                        Tous les prix incluent chauffeur professionnel, carburant et péages. Pas de frais cachés.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="pricing-grid">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`pricing-card ${plan.highlighted ? 'pricing-card-highlighted' : ''}`}
                        >
                            {/* Badge for Popular Plan */}
                            {plan.badge && (
                                <div className="pricing-badge">{plan.badge}</div>
                            )}

                            {/* Card Header */}
                            <div className="pricing-card-header">
                                <h3 className="pricing-plan-name">{plan.name}</h3>
                                <p className="pricing-plan-description">{plan.description}</p>
                            </div>

                            {/* Vehicle Info */}
                            <div className="pricing-vehicle">
                                <p className="pricing-category">{plan.category}</p>
                                <p className="pricing-vehicle-name">{plan.vehicle}</p>
                            </div>

                            {/* Features List */}
                            <ul className="pricing-features">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="pricing-feature">
                                        <Check size={20} className="pricing-check-icon" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <a
                                href={`#contact?service=${encodeURIComponent(plan.name)}`}
                                className={`pricing-button ${plan.highlighted ? 'pricing-button-highlighted' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const contactSection = document.getElementById('contact');
                                    if (contactSection) {
                                        contactSection.scrollIntoView({ behavior: 'smooth' });
                                        // Update URL hash
                                        window.history.pushState(null, '', `#contact?service=${encodeURIComponent(plan.name)}`);
                                        // Trigger service type selection
                                        setTimeout(() => {
                                            const serviceSelect = document.getElementById('serviceType') as HTMLSelectElement;
                                            if (serviceSelect) {
                                                serviceSelect.value = plan.name;
                                            }
                                        }, 500);
                                    }
                                }}
                            >
                                {plan.buttonText}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Custom Quote Section */}
                <div className="pricing-custom">
                    <div className="pricing-custom-content">
                        <h3 className="pricing-custom-title">Besoin d'un Devis Personnalisé ?</h3>
                        <p className="pricing-custom-description">
                            Pour les trajets longue distance, forfaits horaires ou événements spéciaux, contactez-nous pour un devis personnalisé adapté à vos besoins.
                        </p>
                        <a
                            href="#contact"
                            className="pricing-custom-button"
                            onClick={(e) => {
                                e.preventDefault();
                                const contactSection = document.getElementById('contact');
                                if (contactSection) {
                                    contactSection.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m2 7 8.97 5.7a1.94 1.94 0 0 0 2.06 0L22 7" />
                            </svg>
                            Demander un Devis
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
