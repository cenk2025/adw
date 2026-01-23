import React from 'react';
import './ContentSections.css';

const Services = () => (
    <section className="section services-section">
        <h2 className="section-title">Palvelut</h2>
        <div className="grid-features">
            <div className="feature-card">
                <h3>AI-kampanjasuunnittelu</h3>
                <p>Automaattinen datan analysointi ja strategian luonti sekunneissa.</p>
            </div>
            <div className="feature-card">
                <h3>Motion & Visual Advertising</h3>
                <p>Pysäyttävät visuaaliset kokemukset, jotka on optimoitu konversioille.</p>
            </div>
            <div className="feature-card">
                <h3>Sosiaalisen median automaatio</h3>
                <p>Sisällöntuotanto, aikataulutus ja yhteisön hallinta tekoälyn voimalla.</p>
            </div>
            <div className="feature-card">
                <h3>Suorituskyvyn optimointi</h3>
                <p>Jatkuva A/B-testaus ja ROI-seuranta ilman arvailua.</p>
            </div>
        </div>
    </section>
);

const WhyUs = () => (
    <section className="section why-section">
        <div className="content-wrapper">
            <h2 className="section-title">Miksi valita Voon?</h2>
            <ul className="value-list">
                <li>
                    <span className="value-number">01</span>
                    <div className="value-text">
                        <h3>Nopeus</h3>
                        <p>Ideasta toteutukseen minuuteissa, ei viikoissa.</p>
                    </div>
                </li>
                <li>
                    <span className="value-number">02</span>
                    <div className="value-text">
                        <h3>Älykkyys</h3>
                        <p>Päätökset perustuvat dataan, eivät "musta tuntuu" -arvauksiin.</p>
                    </div>
                </li>
                <li>
                    <span className="value-number">03</span>
                    <div className="value-text">
                        <h3>Strategia</h3>
                        <p>Emme vain suorita. Me rakennamme kasvua ohjaavaa strategiaa.</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
);

const HowItWorks = () => (
    <section className="section how-section">
        <h2 className="section-title">Kuinka se toimii</h2>
        <div className="steps-container">
            <div className="step">
                <div className="step-marker">1</div>
                <h3>Analyysi</h3>
                <p>Yhdistämme datalähteesi ja analysoimme nykytilanteen.</p>
            </div>
            <div className="step-line border-t md:border-l md:border-t-0"></div>
            <div className="step">
                <div className="step-marker">2</div>
                <h3>Suunnitelma</h3>
                <p>Tekoäly luo räätälöidyn toimintasuunnitelman ja sisällöt.</p>
            </div>
            <div className="step-line border-t md:border-l md:border-t-0"></div>
            <div className="step">
                <div className="step-marker">3</div>
                <h3>Kasvu</h3>
                <p>Käynnistämme kampanjat ja optimoimme tuloksia 24/7.</p>
            </div>
        </div>
    </section>
);

const Contact = () => (
    <section className="section contact-section">
        <div className="contact-box">
            <h2>Valmis tulevaisuuteen?</h2>
            <p>Ota yhteyttä ja käynnistetään demo yrityksellesi.</p>
            <div className="cta-group">
                <button className="btn-primary">Varaa Demo</button>
                <button className="btn-secondary">Ota yhteyttä</button>
            </div>
        </div>
    </section>
);

export default function ContentSections() {
    return (
        <div className="content-root">
            <Services />
            <WhyUs />
            <HowItWorks />
            <Contact />
            <footer className="simple-footer">
                <p>&copy; {new Date().getFullYear()} Voon Marketing Manager. All rights reserved.</p>
            </footer>
        </div>
    );
}
