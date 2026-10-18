import React from 'react';
import Reveal from './Reveal';
import Icon from './Icons';
import { useI18n } from '../i18n/context';
import { PRODUCTS, STACK } from '../i18n/shared';
import './WebApps.css';

export default function WebApps() {
    const { t } = useI18n();
    const web = t.web;

    return (
        <section id="web" className="section web-section">
            <div className="glow glow--violet" style={{ width: 560, height: 560, right: '-12%', bottom: '0%' }} />
            <div className="container web-grid">
                <div className="web-copy">
                    <Reveal>
                        <span className="eyebrow">{web.eyebrow}</span>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="section-title">{web.title}</h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="section-subtitle">{web.body}</p>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <ul className="web-capabilities">
                            {web.capabilities.map((c) => (
                                <li key={c}>
                                    <Icon name="check" size={16} strokeWidth={2.2} />
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="web-stack">
                            {STACK.map((s) => (
                                <span key={s} className="chip">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </Reveal>
                </div>

                <div className="web-products">
                    <Reveal className="browser">
                        <div className="browser-bar">
                            <span className="window-dots">
                                <i />
                                <i />
                                <i />
                            </span>
                            <span className="browser-url">
                                <Icon name="globe" size={13} /> {web.browserPath}
                            </span>
                        </div>
                        <div className="browser-body">
                            {PRODUCTS.map((p, i) => (
                                <Reveal key={p.name} delay={0.08 * i}>
                                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="product-card">
                                        <span className="product-mark">{p.name[0]}</span>
                                        <span className="product-text">
                                            <strong>
                                                {p.name}
                                                <span className="product-domain">{p.domain}</span>
                                            </strong>
                                            <span>{web.products[i]}</span>
                                        </span>
                                        <Icon name="arrowUpRight" size={18} className="product-arrow" />
                                    </a>
                                </Reveal>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
