import { Plane, Briefcase, PartyPopper, Clock } from 'lucide-react';
import avionImg from '../assets/avion.jpg';
import car1Img from '../assets/car1.jpg';
import car2Img from '../assets/car2.jpg';
import car3Img from '../assets/car3.jpg';
import './Services.css';

const Services = () => {
    const services = [
        {
            id: 1,
            icon: Plane,
            title: 'Transferts Aéroport',
            description: 'Service de prise en charge et dépose fiable vers tous les aéroports. Suivi de vol pour une parfaite ponctualité et un voyage sans stress.',
            image: avionImg,
        },
        {
            id: 2,
            icon: Briefcase,
            title: 'Professionnel & Entreprise',
            description: 'Transport professionnel pour dirigeants, réunions et événements corporatifs. Ponctuel, discret et toujours fiable.',
            image: car1Img,
        },
        {
            id: 3,
            icon: PartyPopper,
            title: 'Événements & Occasions Spéciales',
            description: 'Rendez vos moments spéciaux inoubliables avec notre service de chauffeur premium pour mariages, célébrations et événements VIP.',
            image: car2Img,
        },
        {
            id: 4,
            icon: Clock,
            title: 'Service à la Demande',
            description: 'Service horaire flexible pour visites touristiques, shopping ou destinations multiples. Votre chauffeur personnel à disposition.',
            image: car3Img,
        },
    ];

    return (
        <section className="services" id="services">
            <div className="services-container">
                {/* Section Header */}
                <div className="services-header">
                    <p className="services-label">NOS SERVICES PREMIUM</p>
                    <h2 className="services-title">
                        Solutions de Transport <span className="highlight">d'Excellence</span>
                    </h2>
                    <p className="services-subtitle">
                        Services de chauffeur sur mesure alliant luxe, confort et professionnalisme pour répondre à tous vos besoins de déplacement
                    </p>
                </div>

                {/* Services Grid */}
                <div className="services-grid">
                    {services.map((service) => {
                        const IconComponent = service.icon;
                        return (
                            <div key={service.id} className="service-card">
                                {/* Background Image */}
                                <div className="service-card-bg">
                                    <img src={service.image} alt={service.title} />
                                    <div className="service-card-overlay"></div>
                                </div>

                                {/* Content */}
                                <div className="service-card-content">
                                    <div className="service-icon">
                                        <IconComponent size={24} />
                                    </div>
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-description">{service.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
