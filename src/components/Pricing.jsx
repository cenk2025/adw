import React from 'react';
import Reveal, { SectionHead } from './Reveal';
import Icon from './Icons';
import { useI18n } from '../i18n/context';
import './Pricing.css';

export default function Pricing({ onSelectPlan }) {
    const { t } = useI18n();
    const pricing = t.pricing;

    return (
        <section id="hinnat" className="section pricing-section">
            <div className="container">
                <SectionHead eyebrow={pricing.eyebrow} title={pricing.title} subtitle={pricing.subtitle} align="center" />

                <div className="pricing-grid">
                    {pricing.plans.map((plan, i) => (
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
                                    onClick={() => onSelectPlan(plan.needIndex)}
                                >
                                    {pricing.choose} {plan.name}
                                    <Icon name="arrowRight" size={18} />
                                </a>
                            </article>
                        </Reveal>
                    ))}
                </div>

                <Reveal className="enterprise">
                    <div>
                        <h3>{pricing.enterprise.title}</h3>
                        <p>{pricing.enterprise.body}</p>
                    </div>
                    <a href="#yhteys" className="btn btn-primary" onClick={() => onSelectPlan(null)}>
                        {pricing.enterprise.cta}
                        <Icon name="arrowRight" size={18} />
                    </a>
                </Reveal>

                <p className="pricing-note">{pricing.note}</p>
            </div>
        </section>
    );
}
