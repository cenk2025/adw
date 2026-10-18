import React from 'react';
import Reveal, { SectionHead } from './Reveal';
import Icon from './Icons';
import { useI18n } from '../i18n/context';
import './Services.css';

// Moves the card's radial highlight to follow the pointer.
const trackPointer = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

export default function Services() {
    const { t } = useI18n();
    const services = t.services;

    return (
        <section id="palvelut" className="section services-section">
            <div className="container">
                <SectionHead eyebrow={services.eyebrow} title={services.title} subtitle={services.subtitle} />

                <div className="services-grid">
                    {services.items.map((service, i) => (
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
