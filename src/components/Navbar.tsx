import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Phone, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Accueil', href: '#accueil' },
        { name: 'Services', href: '#services' },
        { name: 'Tarifs', href: '#tarifs' },
        { name: 'À propos', href: '#apropos' },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <div className="navbar-logo">
                    <img src={logo} alt="EM-taxi touristique" />
                </div>

                {/* Desktop Navigation Links */}
                <ul className="navbar-links">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a href={link.href}>{link.name}</a>
                        </li>
                    ))}
                </ul>

                {/* Right Side Actions */}
                <div className="navbar-actions">
                    <a href="#contact" className="btn-contact">Contact</a>
                    <button className="btn-call">
                        <Phone size={18} />
                        <span>Appeler</span>
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                <ul className="mobile-menu-links">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="mobile-menu-actions">
                    <a href="#contact" className="btn-contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                    <button className="btn-call">
                        <Phone size={18} />
                        <span>Appeler</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
