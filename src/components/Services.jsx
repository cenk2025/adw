import React from 'react';
import Reveal, { SectionHead } from './Reveal';
import Icon from './Icons';
import { SERVICES } from '../content';
import './Services.css';

// Moves the card's radial highlight to follow the pointer.
const trackPointer = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

export default function Services() {
    return (
        <section id="palvelut" className="section services-section">
            <div className="container">
                <SectionHead
                    eyebrow="Palvelut"
                    title="Kaikki mitä kasvu vaatii. Yhdeltä tiimiltä."
                    subtitle="Tutkimuksesta visuaaleihin ja kampanjoista verkkosivuihin. Valitse yksittäinen palvelu tai anna meidän hoitaa kokonaisuus."
                />

                <div className="services-grid">
                    {SERVICES.map((service, i) => (
                        <Reveal key={service.title} delay={0.05 * (i % 3)} className="service-card-wrap">
                            <article className="service-card" onPointerMove={trackPointer}>
                                <div className="service-top">
                                    <span className="service-icon">
                                        <Icon name={service.icon} size={26} />
                                    </span>
                                    <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.body}</p>
                                <ul>
                                    {service.bullets.map((bullet) => (
                                        <li key={bullet}>
                                            <Icon name="check" size={16} strokeWidth={2.2} />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
