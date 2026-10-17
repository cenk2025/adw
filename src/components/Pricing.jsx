import React from 'react';
import Reveal, { SectionHead } from './Reveal';
import Icon from './Icons';
import { PRICING } from '../content';
import './Pricing.css';

export default function Pricing({ onSelectPlan }) {
    return (
        <section id="hinnat" className="section pricing-section">
            <div className="container">
                <SectionHead eyebrow={PRICING.eyebrow} title={PRICING.title} subtitle={PRICING.subtitle} align="center" />

                <div className="pricing-grid">
                    {PRICING.plans.map((plan, i) => (
                        <Reveal key={plan.name} delay={0.07 * i} className="plan-wrap">
                            <article className={`plan ${plan.highlight ? 'plan--highlight' : ''}`}>
                                <div className="plan-head">
                                    <h3>{plan.name}</h3>
                                    {plan.badge && <span className="plan-badge">{plan.badge}</span>}
                                </div>
                                <p className="plan-desc">{plan.desc}</p>
                                <div className="plan-price">
                                    <strong>{plan.price}</strong>
                                    <span>{plan.period}</span>
                                </div>
                                <ul>
                                    {plan.features.map((f) => (
                                        <li key={f}>
                                            <Icon name="check" size={16} strokeWidth={2.2} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="#yhteys"
                                    className={`btn btn-block ${plan.highlight ? 'btn-gradient' : 'btn-ghost'}`}
                                    onClick={() => onSelectPlan(plan.need)}
                                >
                                    Valitse {plan.name}
                                    <Icon name="arrowRight" size={18} />
                                </a>
                            </article>
                        </Reveal>
                    ))}
                </div>

                <Reveal className="enterprise">
                    <div>
                        <h3>{PRICING.enterprise.title}</h3>
                        <p>{PRICING.enterprise.body}</p>
                    </div>
                    <a href="#yhteys" className="btn btn-primary" onClick={() => onSelectPlan('')}>
                        {PRICING.enterprise.cta}
                        <Icon name="arrowRight" size={18} />
                    </a>
                </Reveal>

                <p className="pricing-note">{PRICING.note}</p>
            </div>
        </section>
    );
}
