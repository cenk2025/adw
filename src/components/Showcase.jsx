import React from 'react';
import Reveal, { SectionHead } from './Reveal';
import Icon from './Icons';
import { useI18n } from '../i18n/context';
import { WORK_IMAGES } from '../i18n/shared';
import './Showcase.css';

export default function Showcase() {
    const { t } = useI18n();
    const work = t.work;

    return (
        <section id="tyot" className="section showcase-section">
            <div className="container">
                <SectionHead eyebrow={work.eyebrow} title={work.title} subtitle={work.subtitle} />

                <div className="work-grid">
                    {WORK_IMAGES.map((image, i) => {
                        const item = work.items[i];
                        return (
                            <Reveal key={image.src} delay={0.05 * (i % 3)} className={`work-tile work-tile--${image.size}`}>
                                <figure>
                                    <img src={image.src} alt={`${item.title}: ${item.tag}`} loading="lazy" />
                                    <figcaption>
                                        <span className="work-tag">{item.tag}</span>
                                        <span className="work-title">{item.title}</span>
                                    </figcaption>
                                </figure>
                            </Reveal>
                        );
                    })}
                    <Reveal delay={0.1} className="work-tile work-tile--cta">
                        <a href="#yhteys" className="work-cta">
                            <span className="work-cta-kicker">{work.ctaKicker}</span>
                            <span className="work-cta-title">
                                {work.ctaTitleStart} <span className="serif">{work.ctaTitleAccent}</span>
                            </span>
                            <span className="work-cta-link">
                                {work.ctaLink} <Icon name="arrowUpRight" size={18} />
                            </span>
                        </a>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
