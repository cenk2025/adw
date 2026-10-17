import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import Icon from './Icons';
import { CONTACT, CONTACT_EMAIL } from '../content';
import './Contact.css';

export default function Contact({ presetNeed }) {
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [need, setNeed] = useState(presetNeed || CONTACT.needs[0]);
    const [prevPreset, setPrevPreset] = useState(presetNeed);

    // Follow the plan picked in the pricing section.
    if (presetNeed !== prevPreset) {
        setPrevPreset(presetNeed);
        if (presetNeed) setNeed(presetNeed);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries());
        setStatus('loading');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            form.reset();
            setNeed(CONTACT.needs[0]);
            setStatus('success');
        } catch (error) {
            console.error('Error sending contact form:', error);
            setStatus('error');
        }
    };

    return (
        <section id="yhteys" className="section contact-section">
            <div className="glow glow--cyan" style={{ width: 520, height: 520, left: '-10%', top: '10%' }} />
            <div className="glow glow--violet" style={{ width: 480, height: 480, right: '-8%', bottom: '0%' }} />

            <div className="container contact-grid">
                <div className="contact-copy">
                    <Reveal>
                        <span className="eyebrow">{CONTACT.eyebrow}</span>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="contact-title">
                            Kerro tavoitteesi. <span className="serif gradient-text">Me teemme siitä suunnitelman.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="section-subtitle">{CONTACT.subtitle}</p>
                    </Reveal>

                    <Reveal delay={0.15} className="contact-cards">
                        <a href={`mailto:${CONTACT_EMAIL}`} className="contact-card">
                            <span className="contact-card-icon">
                                <Icon name="mail" size={20} />
                            </span>
                            <span>
                                <small>Sähköposti</small>
                                {CONTACT_EMAIL}
                            </span>
                        </a>
                        <div className="contact-card">
                            <span className="contact-card-icon">
                                <Icon name="pin" size={20} />
                            </span>
                            <span>
                                <small>Sijainti</small>
                                Jyväskylä, Suomi
                            </span>
                        </div>
                        <a href="https://voon.fi" target="_blank" rel="noopener noreferrer" className="contact-card">
                            <span className="contact-card-icon">
                                <Icon name="globe" size={20} />
                            </span>
                            <span>
                                <small>Pääsivusto</small>
                                voon.fi
                            </span>
                        </a>
                    </Reveal>
                </div>

                <Reveal delay={0.1} className="contact-form-wrap">
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                className="form-result"
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                role="status"
                            >
                                <span className="form-result-icon">
                                    <Icon name="check" size={36} strokeWidth={2.4} />
                                </span>
                                <h3>{CONTACT.success}</h3>
                                <p>{CONTACT.successBody}</p>
                                <button className="btn btn-ghost" onClick={() => setStatus('idle')}>
                                    Lähetä uusi viesti
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                onSubmit={handleSubmit}
                                className="contact-form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="form-row">
                                    <label className="field">
                                        <span>Yritys *</span>
                                        <input name="company" required maxLength={120} autoComplete="organization" placeholder="Yritys Oy" />
                                    </label>
                                    <label className="field">
                                        <span>Nimi *</span>
                                        <input name="name" required maxLength={120} autoComplete="name" placeholder="Etunimi Sukunimi" />
                                    </label>
                                </div>
                                <div className="form-row">
                                    <label className="field">
                                        <span>Sähköposti *</span>
                                        <input name="email" type="email" required maxLength={160} autoComplete="email" placeholder="nimi@yritys.fi" />
                                    </label>
                                    <label className="field">
                                        <span>Puhelin</span>
                                        <input name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="+358 40 123 4567" />
                                    </label>
                                </div>

                                <fieldset className="field">
                                    <legend>Mihin tarvitset apua? *</legend>
                                    <div className="need-options">
                                        {CONTACT.needs.map((option) => (
                                            <label key={option} className={`need-option ${need === option ? 'selected' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="need"
                                                    value={option}
                                                    checked={need === option}
                                                    onChange={() => setNeed(option)}
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>

                                <label className="field">
                                    <span>Arvioitu budjetti</span>
                                    <select name="budget" defaultValue="">
                                        <option value="">Valitse (vapaaehtoinen)</option>
                                        {CONTACT.budgets.map((b) => (
                                            <option key={b} value={b}>
                                                {b}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="field">
                                    <span>Viesti</span>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        maxLength={4000}
                                        placeholder="Kerro lyhyesti yrityksestäsi, tavoitteistasi ja aikataulusta."
                                    />
                                </label>

                                {/* Honeypot: hidden from people, filled in by naive bots. */}
                                <label className="hp" aria-hidden="true">
                                    Verkkosivu
                                    <input name="website" tabIndex={-1} autoComplete="off" />
                                </label>

                                <label className="consent">
                                    <input type="checkbox" name="consent" value="yes" required />
                                    <span>
                                        Hyväksyn, että VOON IQ käyttää tietojani yhteydenottoon vastaamiseen. Tietoja ei
                                        luovuteta kolmansille osapuolille.
                                    </span>
                                </label>

                                {status === 'error' && (
                                    <div className="form-error" role="alert">
                                        <Icon name="alert" size={18} />
                                        <span>
                                            <strong>{CONTACT.error}</strong> {CONTACT.errorBody}
                                        </span>
                                    </div>
                                )}

                                <button type="submit" className="btn btn-gradient btn-block" disabled={status === 'loading'}>
                                    {status === 'loading' ? (
                                        <>
                                            <span className="spinner" aria-hidden="true" /> Lähetetään…
                                        </>
                                    ) : (
                                        <>
                                            Lähetä viesti
                                            <Icon name="arrowRight" size={18} />
                                        </>
                                    )}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </Reveal>
            </div>
        </section>
    );
}
