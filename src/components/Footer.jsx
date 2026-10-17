import React from 'react';
import Icon from './Icons';
import { CONTACT_EMAIL, FOOTER, NAV_LINKS, SERVICES, WEB } from '../content';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-cta container">
                <h2>
                    Tehdään jotain, <span className="serif gradient-text">mikä pysäyttää.</span>
                </h2>
                <a href="#yhteys" className="btn btn-primary">
                    Varaa maksuton kartoitus
                    <Icon name="arrowRight" size={18} />
                </a>
            </div>

            <div className="footer-content container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <a href="#top" className="footer-logo" aria-label="VOON IQ">
                            <img src="/voon-logo-96.webp" alt="VOON" width="245" height="96" />
                            <span className="logo-iq">IQ</span>
                        </a>
                        <p className="footer-tagline">{FOOTER.tagline}</p>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="footer-email">
                            <Icon name="mail" size={18} />
                            {CONTACT_EMAIL}
                        </a>
                    </div>

                    <div className="footer-links-group">
                        <div className="footer-column">
                            <h4>Palvelut</h4>
                            {SERVICES.map((s) => (
                                <a key={s.title} href="#palvelut">
                                    {s.title}
                                </a>
                            ))}
                        </div>
                        <div className="footer-column">
                            <h4>Sivusto</h4>
                            {NAV_LINKS.map((link) => (
                                <a key={link.href} href={link.href}>
                                    {link.label}
                                </a>
                            ))}
                            <a href="#yhteys">Yhteys</a>
                        </div>
                        <div className="footer-column">
                            <h4>Tuotteemme</h4>
                            {WEB.products.map((p) => (
                                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">
                                    {p.name}
                                </a>
                            ))}
                            <a href="https://voon.fi" target="_blank" rel="noopener noreferrer">
                                voon.fi
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        &copy; {new Date().getFullYear()} {FOOTER.company} · Jyväskylä
                    </p>
                    <button
                        className="footer-cookie"
                        onClick={() => window.dispatchEvent(new Event('voon:cookie-settings'))}
                    >
                        Evästeasetukset
                    </button>
                </div>
            </div>

            <div className="footer-wordmark" aria-hidden="true">
                VOON IQ
            </div>
        </footer>
    );
}
