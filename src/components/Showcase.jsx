import React from 'react';
import Reveal, { SectionHead } from './Reveal';
import Icon from './Icons';
import { WORK } from '../content';
import './Showcase.css';

export default function Showcase() {
    return (
        <section id="tyot" className="section showcase-section">
            <div className="container">
                <SectionHead eyebrow={WORK.eyebrow} title={WORK.title} subtitle={WORK.subtitle} />

                <div className="work-grid">
                    {WORK.items.map((item, i) => (
                        <Reveal key={item.src} delay={0.05 * (i % 3)} className={`work-tile work-tile--${item.size}`}>
                            <figure>
                                <img src={item.src} alt={`${item.title}: ${item.tag}`} loading="lazy" />
                                <figcaption>
                                    <span className="work-tag">{item.tag}</span>
                                    <span className="work-title">{item.title}</span>
                                </figcaption>
                            </figure>
                        </Reveal>
                    ))}
                    <Reveal delay={0.1} className="work-tile work-tile--cta">
                        <a href="#yhteys" className="work-cta">
                            <span className="work-cta-kicker">Seuraavaksi</span>
                            <span className="work-cta-title">
                                Sinun brändisi <span className="serif">tässä?</span>
                            </span>
                            <span className="work-cta-link">
                                Aloitetaan projekti <Icon name="arrowUpRight" size={18} />
                            </span>
                        </a>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
