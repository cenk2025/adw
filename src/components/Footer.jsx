import React from 'react';
import Icon from './Icons';
import { useI18n } from '../i18n/context';
import { CONTACT_EMAIL, NAV_ANCHORS, PRODUCTS } from '../i18n/shared';
import './Footer.css';

export default function Footer() {
    const { t } = useI18n();
    const footer = t.footer;

    return (
        <footer className="footer-container">
            <div className="footer-cta container">
                <h2>
                    {footer.ctaStart} <span className="serif gradient-text">{footer.ctaAccent}</span>
                </h2>
                <a href="#yhteys" className="btn btn-primary">
                    {footer.cta}
                    <Icon name="arrowRight" size={18} />
                </a>
            </div>

            <div className="footer-content container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <a href="#top" className="footer-logo" aria-label="VOON IQ">
                            <img src="/voon-logo-96.webp" alt="VOON IQ" className="theme-logo" width="347" height="96" />
                        </a>
                        <p className="footer-tagline">{footer.tagline}</p>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="footer-email">
                            <Icon name="mail" size={18} />
                            {CONTACT_EMAIL}
                        </a>
                    </div>

                    <div className="footer-links-group">
                        <div className="footer-column">
                            <h4>{footer.columns.services}</h4>
                            {t.services.items.map((s) => (
                                <a key={s.title} href="#palvelut">
                                    {s.title}
                                </a>
                            ))}
                        </div>
                        <div className="footer-column">
                            <h4>{footer.columns.site}</h4>
                            {NAV_ANCHORS.map((href, i) => (
                                <a key={href} href={href}>
                                    {t.nav.links[i]}
                                </a>
                            ))}
                            <a href="#yhteys">{footer.contactLink}</a>
                        </div>
                        <div className="footer-column">
                            <h4>{footer.columns.products}</h4>
                            {PRODUCTS.map((p) => (
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
                        &copy; {new Date().getFullYear()} {footer.company} · {footer.location}
                    </p>
                    <button
                        className="footer-cookie"
                        onClick={() => window.dispatchEvent(new Event('voon:cookie-settings'))}
                    >
                        {footer.cookieSettings}
                    </button>
                </div>
            </div>

            <div className="footer-wordmark" aria-hidden="true">
                VOON IQ
            </div>
        </footer>
    );
}
