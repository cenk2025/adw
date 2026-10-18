import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import Icon from './Icons';
import { useI18n } from '../i18n/context';
import { CONTACT_EMAIL } from '../i18n/shared';
import './Contact.css';

export default function Contact({ presetNeed }) {
    const { t, locale } = useI18n();
    const contact = t.contact;
    const fields = contact.fields;

    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    // The selected need is kept as an index so it survives a language switch.
    const [need, setNeed] = useState(presetNeed ?? 0);
    const [prevPreset, setPrevPreset] = useState(presetNeed);

    // Follow the plan picked in the pricing section.
    if (presetNeed !== prevPreset) {
        setPrevPreset(presetNeed);
        if (presetNeed != null) setNeed(presetNeed);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = { ...Object.fromEntries(new FormData(form).entries()), need: contact.needs[need], locale };
        setStatus('loading');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            form.reset();
            setNeed(0);
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
                        <span className="eyebrow">{contact.eyebrow}</span>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="contact-title">
                            {contact.titleStart} <span className="serif gradient-text">{contact.titleAccent}</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="section-subtitle">{contact.subtitle}</p>
                    </Reveal>

                    <Reveal delay={0.15} className="contact-cards">
                        <a href={`mailto:${CONTACT_EMAIL}`} className="contact-card">
                            <span className="contact-card-icon">
                                <Icon name="mail" size={20} />
                            </span>
                            <span>
                                <small>{contact.cards.email}</small>
                                {CONTACT_EMAIL}
                            </span>
                        </a>
                        <div className="contact-card">
                            <span className="contact-card-icon">
                                <Icon name="pin" size={20} />
                            </span>
                            <span>
                                <small>{contact.cards.location}</small>
                                {contact.cards.locationValue}
                            </span>
                        </div>
                        <a href="https://voon.fi" target="_blank" rel="noopener noreferrer" className="contact-card">
                            <span className="contact-card-icon">
                                <Icon name="globe" size={20} />
                            </span>
                            <span>
                                <small>{contact.cards.site}</small>
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
                                <h3>{contact.success}</h3>
                                <p>{contact.successBody}</p>
                                <button className="btn btn-ghost" onClick={() => setStatus('idle')}>
                                    {contact.newMessage}
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
                                        <span>{fields.company} *</span>
                                        <input name="company" required maxLength={120} autoComplete="organization" placeholder={fields.companyPlaceholder} />
                                    </label>
                                    <label className="field">
                                        <span>{fields.name} *</span>
                                        <input name="name" required maxLength={120} autoComplete="name" placeholder={fields.namePlaceholder} />
                                    </label>
                                </div>
                                <div className="form-row">
                                    <label className="field">
                                        <span>{fields.email} *</span>
                                        <input name="email" type="email" required maxLength={160} autoComplete="email" placeholder={fields.emailPlaceholder} />
                                    </label>
                                    <label className="field">
                                        <span>{fields.phone}</span>
                                        <input name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder={fields.phonePlaceholder} />
                                    </label>
                                </div>

                                <fieldset className="field">
                                    <legend>{fields.need} *</legend>
                                    <div className="need-options">
                                        {contact.needs.map((option, i) => (
                                            <label key={option} className={`need-option ${need === i ? 'selected' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="needChoice"
                                                    value={i}
                                                    checked={need === i}
                                                    onChange={() => setNeed(i)}
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>

                                <label className="field">
                                    <span>{fields.budget}</span>
                                    <select name="budget" defaultValue="">
                                        <option value="">{fields.budgetPlaceholder}</option>
                                        {contact.budgets.map((b) => (
                                            <option key={b} value={b}>
                                                {b}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="field">
                                    <span>{fields.message}</span>
                                    <textarea name="message" rows={4} maxLength={4000} placeholder={fields.messagePlaceholder} />
                                </label>

                                {/* Honeypot: hidden from people, filled in by naive bots. */}
                                <label className="hp" aria-hidden="true">
                                    {fields.website}
                                    <input name="website" tabIndex={-1} autoComplete="off" />
                                </label>

                                <label className="consent">
                                    <input type="checkbox" name="consent" value="yes" required />
                                    <span>{fields.consent}</span>
                                </label>

                                {status === 'error' && (
                                    <div className="form-error" role="alert">
                                        <Icon name="alert" size={18} />
                                        <span>
                                            <strong>{contact.error}</strong> {contact.errorBody}
                                        </span>
                                    </div>
                                )}

                                <button type="submit" className="btn btn-gradient btn-block" disabled={status === 'loading'}>
                                    {status === 'loading' ? (
                                        <>
                                            <span className="spinner" aria-hidden="true" /> {contact.sending}
                                        </>
                                    ) : (
                                        <>
                                            {contact.submit}
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
