import React from 'react';
import Reveal from './Reveal';
import Icon from './Icons';
import { useI18n } from '../i18n/context';
import './Intro.css';

export default function Intro() {
    const { t } = useI18n();
    const intro = t.intro;

    return (
        <section className="section intro-section">
            <div className="glow glow--violet" style={{ width: 520, height: 520, top: '10%', right: '-10%' }} />
            <div className="container intro-grid">
                <div>
                    <Reveal>
                        <span className="eyebrow">{intro.eyebrow}</span>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="intro-title">
                            {intro.titleStart} <span className="serif gradient-text">{intro.titleAccent}</span>
                        </h2>
                    </Reveal>
                </div>
                <Reveal delay={0.1}>
                    <p className="intro-body">{intro.body}</p>
                </Reveal>
            </div>

            <div className="container">
                <div className="facts-grid">
                    {intro.facts.map((fact, i) => (
                        <Reveal key={fact.label} delay={0.06 * i} className="fact">
                            <span className="fact-icon">
                                <Icon name={fact.icon} size={30} strokeWidth={1.5} />
                            </span>
                            <span className="fact-label">{fact.label}</span>
                        </Reveal>
                    ))}
                </div>

                <div className="values-grid">
                    {t.values.map((value, i) => (
                        <Reveal key={value.title} delay={0.06 * i} className="value-card">
                            <span className="value-icon">
                                <Icon name={value.icon} size={22} />
                            </span>
                            <h3>{value.title}</h3>
                            <p>{value.body}</p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
