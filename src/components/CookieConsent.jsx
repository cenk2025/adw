import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if consent is already stored
        const consent = localStorage.getItem('voon_cookie_consent');
        if (!consent) {
            // Show after a small delay
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        setIsVisible(false);
        localStorage.setItem('voon_cookie_consent', 'accepted');
    };

    const handleDecline = () => {
        setIsVisible(false);
        localStorage.setItem('voon_cookie_consent', 'declined');
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent-overlay">
            <div className="cookie-modal">
                <div className="cookie-content">
                    <div className="cookie-icon">🍪</div>
                    <div className="cookie-text">
                        <h3>Käytämme evästeitä</h3>
                        <p>
                            Parantaaksemme käyttökokemustasi ja analysoidaksemme liikennettä, käytämme evästeitä.
                            Jatkamalla sivuston käyttöä hyväksyt evästeiden käytön.
                            <a href="#" className="cookie-link">Lue lisää tietosuojakäytännöstämme</a>.
                        </p>
                    </div>
                </div>
                <div className="cookie-actions">
                    <button onClick={handleDecline} className="btn-decline">
                        Vain välttämättömät
                    </button>
                    <button onClick={handleAccept} className="btn-accept">
                        Hyväksy kaikki
                    </button>
                </div>
            </div>
        </div>
    );
}
