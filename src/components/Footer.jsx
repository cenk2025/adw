import React, { useState, useEffect } from 'react';
import './Footer.css';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => {
                setSubscribed(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h2 className="footer-logo">VOON</h2>
                        <p className="footer-tagline">Markkinointi, joka ajattelee puolestasi.</p>
                        <div className="footer-socials">
                            <a href="#" aria-label="LinkedIn" className="social-link">LN</a>
                            <a href="#" aria-label="Instagram" className="social-link">IG</a>
                            <a href="#" aria-label="Twitter" className="social-link">X</a>
                        </div>
                    </div>

                    <div className="footer-links-group">
                        <div className="footer-column">
                            <h4>Ratkaisu</h4>
                            <a href="#">Ominaisuudet</a>
                            <a href="#">Tekoäly</a>
                            <a href="#">Automaatio</a>
                            <a href="#">Analytiikka</a>
                        </div>
                        <div className="footer-column">
                            <h4>Yritys</h4>
                            <a href="#">Tietoa meistä</a>
                            <a href="#">Ura</a>
                            <a href="#">Blogi</a>
                            <a href="#">Ota yhteyttä</a>
                        </div>
                        <div className="footer-column">
                            <h4>Tuki</h4>
                            <a href="#">Ohjekeskus</a>
                            <a href="#">API Dokumentaatio</a>
                            <a href="#">Tila/Status</a>
                        </div>
                    </div>

                    <div className="footer-newsletter">
                        <h4>Pysy ajan tasalla</h4>
                        <p>Vastaanota uusimmat päivitykset ja markkinointivinkit.</p>
                        <form onSubmit={handleSubscribe} className="newsletter-form">
                            <input
                                type="email"
                                placeholder="Sähköpostiosoite"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className={subscribed ? 'success' : ''}>
                                {subscribed ? 'Kiitos!' : 'Tilaa'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-legal">
                        <p>&copy; {new Date().getFullYear()} Voon Marketing Manager. Kaikki oikeudet pidätetään.</p>
                    </div>
                    <div className="footer-bottom-links">
                        <a href="#">Tietosuoja</a>
                        <a href="#">Evästekäytännöt</a>
                        <a href="#">Käyttöehdot</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
