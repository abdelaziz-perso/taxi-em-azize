import { Car, Users, Award, Shield } from 'lucide-react';
import driverImg from '../assets/driver.jpg';
import './About.css';

const About = () => {
    const features = [
        {
            id: 1,
            icon: Car,
            title: 'Parc Automobile',
            description: 'Véhicules premium entretenus selon les standards les plus élevés. Mercedes Classe S, Vans executive équipés des dernières technologies.',
        },
        {
            id: 2,
            icon: Users,
            title: 'Équipe Expert',
            description: 'Chauffeurs rigoureusement formés, licenciés et contrôlés. Discrétion, ponctualité et excellence du service garanties.',
        },
    ];

    const stats = [
        {
            id: 1,
            icon: Users,
            value: '10 000+',
            label: 'Clients Satisfaits',
        },
        {
            id: 2,
            icon: Award,
            value: '4,9/5',
            label: 'Note Moyenne',
        },
        {
            id: 3,
            icon: Award,
            value: '15+',
            label: "Années d'Expérience",
        },
        {
            id: 4,
            icon: Shield,
            value: '100%',
            label: 'Sécurité Garantie',
        },
    ];

    return (
        <section className="about" id="apropos">
            <div className="about-container">
                {/* Section Label */}
                <p className="about-label">À PROPOS DE EM TAXI TOURISTIQUE</p>

                {/* Main Content Grid */}
                <div className="about-content">
                    {/* Left Side - Text Content */}
                    <div className="about-text">
                        <h2 className="about-title">
                            L'Excellence à <span className="highlight">Chaque Trajet</span>
                        </h2>

                        <div className="about-description">
                            <p>
                                Depuis 2009, <strong>EM TAXI TOURISTIQUE</strong> est le choix privilégié pour les services de transport haut de gamme. Nous allions expertise professionnelle et engagement indéfectible pour l'excellence.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="about-features">
                            {features.map((feature) => {
                                const IconComponent = feature.icon;
                                return (
                                    <div key={feature.id} className="about-feature">
                                        <div className="about-feature-icon">
                                            <IconComponent size={20} />
                                        </div>
                                        <div className="about-feature-content">
                                            <h4 className="about-feature-title">{feature.title}</h4>
                                            <p className="about-feature-description">{feature.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Quote Box */}
                        <div className="about-quote">
                            <p>
                                Que vous voyagiez pour affaires ou pour le plaisir, <strong>nous nous engageons à faire de chaque course une expérience fluide et luxueuse.</strong>
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="about-image">
                        <img src={driverImg} alt="Chauffeur professionnel EM TAXI TOURISTIQUE" />
                        <div className="about-badge">
                            <div className="about-badge-value">15+</div>
                            <div className="about-badge-label">Ans d'Excellence</div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Section */}
                <div className="about-why-choose">
                    <h3 className="about-why-title">
                        Pourquoi Choisir <span className="highlight">EM Taxi Touristique</span>?
                    </h3>
                    <div className="about-why-grid">
                        <div className="about-why-card">
                            <div className="about-why-icon">
                                <Shield size={28} />
                            </div>
                            <h4 className="about-why-card-title">Sécurité Avant Tout</h4>
                            <p className="about-why-card-description">
                                Chauffeurs licenciés, assurés et formés régulièrement. Votre sécurité est notre priorité absolue.
                            </p>
                        </div>
                        <div className="about-why-card">
                            <div className="about-why-icon">
                                <Award size={28} />
                            </div>
                            <h4 className="about-why-card-title">Qualité Premium</h4>
                            <p className="about-why-card-description">
                                Véhicules impeccables, service professionnel et attention aux détails pour une expérience d'exception.
                            </p>
                        </div>
                        <div className="about-why-card">
                            <div className="about-why-icon">
                                <Award size={28} />
                            </div>
                            <h4 className="about-why-card-title">Référence du Secteur</h4>
                            <p className="about-why-card-description">
                                Des milliers de clients satisfaits et des avis 5 étoiles constants témoignent de notre excellence.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="about-stats">
                    {stats.map((stat) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={stat.id} className="about-stat-card">
                                <div className="about-stat-icon">
                                    <IconComponent size={28} />
                                </div>
                                <div className="about-stat-value">{stat.value}</div>
                                <div className="about-stat-label">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default About;
