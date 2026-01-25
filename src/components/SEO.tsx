import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SEO = () => {
    const { language } = useLanguage();

    useEffect(() => {
        // Update document language
        document.documentElement.lang = language === 'en' ? 'en' : 'fr';

        // Update meta tags based on language
        const updateMetaTag = (name: string, content: string, isProperty = false) => {
            const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
            let meta = document.querySelector(selector) as HTMLMetaElement;
            
            if (!meta) {
                meta = document.createElement('meta');
                if (isProperty) {
                    meta.setAttribute('property', name);
                } else {
                    meta.setAttribute('name', name);
                }
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        // SEO content based on language
        const seoContent = {
            fr: {
                title: 'EM Taxi Touristique - Transport Premium & Chauffeur Privé au Maroc | Depuis 2009',
                description: 'EM Taxi Touristique offre des services de transport de luxe au Maroc depuis 2009. Chauffeur privé, transferts aéroport, transport d\'affaires et événements. Mercedes S-Class, BMW. Service 24/7.',
                keywords: 'taxi maroc, chauffeur privé maroc, transport de luxe maroc, transfert aéroport maroc, taxi touristique maroc, mercedes chauffeur maroc, transport premium maroc, EM Taxi Touristique',
            },
            en: {
                title: 'EM Taxi Touristique - Premium Transportation & Private Chauffeur in Morocco | Since 2009',
                description: 'EM Taxi Touristique offers luxury transportation services in Morocco since 2009. Private chauffeur, airport transfers, business transportation and events. Mercedes S-Class, BMW. 24/7 service.',
                keywords: 'taxi morocco, private chauffeur morocco, luxury transport morocco, airport transfer morocco, tourist taxi morocco, mercedes chauffeur morocco, premium transport morocco, EM Taxi Touristique',
            },
            ar: {
                title: 'EM تاكسي توريستيك - النقل الفاخر وسائق خاص في المغرب | منذ 2009',
                description: 'EM تاكسي توريستيك تقدم خدمات النقل الفاخر في المغرب منذ 2009. سائق خاص، نقل المطار، نقل الأعمال والفعاليات. مرسيدس S-Class، BMW. خدمة 24/7.',
                keywords: 'تاكسي المغرب, سائق خاص المغرب, نقل فاخر المغرب, نقل المطار المغرب, تاكسي سياحي المغرب, مرسيدس سائق المغرب, نقل ممتاز المغرب, EM تاكسي توريستيك',
            },
        };

        const content = seoContent[language as keyof typeof seoContent] || seoContent.fr;

        // Update title
        document.title = content.title;

        // Update meta tags
        updateMetaTag('title', content.title);
        updateMetaTag('description', content.description);
        updateMetaTag('keywords', content.keywords);
        updateMetaTag('og:title', content.title, true);
        updateMetaTag('og:description', content.description, true);
        updateMetaTag('twitter:title', content.title, true);
        updateMetaTag('twitter:description', content.description, true);

        // Update Open Graph locale
        const localeMap: Record<string, string> = {
            fr: 'fr_FR',
            en: 'en_US',
        };
        updateMetaTag('og:locale', localeMap[language] || 'fr_FR', true);
    }, [language]);

    // Structured Data (JSON-LD) for LocalBusiness
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://emtaxi.fr/#organization',
        name: 'EM Taxi Touristique',
        alternateName: 'EM Taxi',
        description: language === 'en' 
            ? 'Premium luxury transportation services in Morocco since 2009. Private chauffeur, airport transfers, business transportation.'
            : 'Services de transport de luxe au Maroc depuis 2009. Chauffeur privé, transferts aéroport, transport d\'affaires.',
        url: 'https://emtaxi.fr',
        telephone: '+212615919437',
        email: 'contact@emtaxi.fr',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'MA',
            addressLocality: 'Morocco',
        },
        geo: {
            '@type': 'GeoCoordinates',
            addressCountry: 'MA',
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ],
            opens: '00:00',
            closes: '23:59',
        },
        priceRange: '$$$',
        image: 'https://emtaxi.fr/logo.png',
        sameAs: [],
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '1000',
        },
        areaServed: {
            '@type': 'Country',
            name: 'Morocco',
        },
        serviceType: [
            'Airport Transfer',
            'Private Chauffeur',
            'Business Transportation',
            'Event Transportation',
            'Luxury Transportation',
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Transportation Services',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Standard - Luxury Sedan',
                        description: 'Mercedes E-Class, BMW 5 Series',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Business - Executive Sedan',
                        description: 'Mercedes S-Class, BMW 7 Series',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Premium - Luxury Van/SUV',
                        description: 'Mercedes V-Class, Range Rover',
                    },
                },
            ],
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
        </>
    );
};

export default SEO;
