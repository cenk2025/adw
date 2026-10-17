import React from 'react';
import Reveal from './Reveal';
import Icon from './Icons';
import { INTRO, VALUES } from '../content';
import './Intro.css';

export default function Intro() {
    return (
        <section className="section intro-section">
            <div className="glow glow--violet" style={{ width: 520, height: 520, top: '10%', right: '-10%' }} />
            <div className="container intro-grid">
                <div>
                    <Reveal>
                        <span className="eyebrow">{INTRO.eyebrow}</span>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="intro-title">
                            Yksi kumppani <span className="serif gradient-text">koko kasvuputkeen.</span>
                        </h2>
                    </Reveal>
                </div>
                <Reveal delay={0.1}>
                    <p className="intro-body">{INTRO.body}</p>
                </Reveal>
            </div>

            <div className="container">
                <div className="facts-grid">
                    {INTRO.facts.map((fact, i) => (
                        <Reveal key={fact.label} delay={0.06 * i} className="fact">
                            <span className="fact-value">{fact.value}</span>
                            <span className="fact-label">{fact.label}</span>
                        </Reveal>
                    ))}
                </div>

                <div className="values-grid">
                    {VALUES.map((value, i) => (
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
