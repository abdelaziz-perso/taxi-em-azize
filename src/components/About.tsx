import { Car, Users, Award, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import driverImg from '../assets/driver.jpg';
import './About.css';

const About = () => {
    const { t } = useLanguage();
    
    const features = [
        {
            id: 1,
            icon: Car,
            title: t('about.fleet.title'),
            description: t('about.fleet.description'),
        },
        {
            id: 2,
            icon: Users,
            title: t('about.team.title'),
            description: t('about.team.description'),
        },
    ];

    const stats = [
        {
            id: 1,
            icon: Users,
            value: '10 000+',
            label: t('about.stats.clients'),
        },
        {
            id: 2,
            icon: Award,
            value: '4,9/5',
            label: t('about.stats.rating'),
        },
        {
            id: 3,
            icon: Award,
            value: '15+',
            label: t('about.stats.experience'),
        },
        {
            id: 4,
            icon: Shield,
            value: '100%',
            label: t('about.stats.security'),
        },
    ];

    return (
        <section className="about" id="apropos" aria-label="À propos de EM Taxi Touristique">
            <div className="about-container">
                {/* Section Label */}
                <p className="about-label">{t('about.label')}</p>

                {/* Main Content Grid */}
                <div className="about-content">
                    {/* Left Side - Text Content */}
                    <div className="about-text">
                        <h2 className="about-title">
                            {t('about.excellence.title')} <span className="highlight">{t('about.excellence.titleHighlight')}</span>
                        </h2>

                        <div className="about-description">
                            <p>
                                {t('about.excellence.description')}
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
                                <strong>{t('about.excellence.quote')}</strong>
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="about-image">
                        <img 
                            src={driverImg} 
                            alt="Chauffeur professionnel EM Taxi Touristique - Transport premium au Maroc depuis 2009" 
                            loading="lazy"
                        />
                        <div className="about-badge" aria-label={`15+ ${t('about.excellence.badge')}`}>
                            <div className="about-badge-value">15+</div>
                            <div className="about-badge-label">{t('about.excellence.badge')}</div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Section */}
                <div className="about-why-choose">
                    <h3 className="about-why-title">
                        {t('about.whyChoose.title')} <span className="highlight">{t('about.whyChoose.titleHighlight')}</span>?
                    </h3>
                    <div className="about-why-grid">
                        <div className="about-why-card">
                            <div className="about-why-icon">
                                <Shield size={28} />
                            </div>
                            <h4 className="about-why-card-title">{t('about.whyChoose.security.title')}</h4>
                            <p className="about-why-card-description">
                                {t('about.whyChoose.security.description')}
                            </p>
                        </div>
                        <div className="about-why-card">
                            <div className="about-why-icon">
                                <Award size={28} />
                            </div>
                            <h4 className="about-why-card-title">{t('about.whyChoose.quality.title')}</h4>
                            <p className="about-why-card-description">
                                {t('about.whyChoose.quality.description')}
                            </p>
                        </div>
                        <div className="about-why-card">
                            <div className="about-why-icon">
                                <Award size={28} />
                            </div>
                            <h4 className="about-why-card-title">{t('about.whyChoose.reference.title')}</h4>
                            <p className="about-why-card-description">
                                {t('about.whyChoose.reference.description')}
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
