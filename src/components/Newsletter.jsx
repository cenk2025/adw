import React, { useEffect, useState } from 'react';
import Icon from './Icons';
import { useI18n } from '../i18n/context';
import './Newsletter.css';

// Footer signup. Step 1 of double opt-in: the API emails a confirmation link,
// nobody is added to the list before they click it.
export function NewsletterForm() {
    const { t, locale } = useI18n();
    const n = t.newsletter;
    const [status, setStatus] = useState('idle'); // idle | loading | sent | error

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        setStatus('loading');
        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: data.get('email'),
                    website: data.get('website'),
                    consent: data.get('consent') === 'on',
                    locale,
                }),
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            form.reset();
            setStatus('sent');
        } catch (error) {
            console.error('Newsletter signup failed:', error);
            setStatus('error');
        }
    };

    return (
        <div className="newsletter">
            <h4>{n.title}</h4>
            <p className="newsletter-body">{n.body}</p>
            {status === 'sent' ? (
                <p className="newsletter-msg newsletter-msg--ok" role="status">
                    <Icon name="mail" size={18} />
                    {n.sent}
                </p>
            ) : (
                <form className="newsletter-form" onSubmit={handleSubmit}>
                    <div className="newsletter-row">
                        <input
                            type="email"
                            name="email"
                            required
                            maxLength={160}
                            autoComplete="email"
                            placeholder={n.placeholder}
                            aria-label={n.placeholder}
                        />
                        <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                            {status === 'loading' ? n.sending : n.submit}
                        </button>
                    </div>
                    <label className="newsletter-consent">
                        <input type="checkbox" name="consent" required />
                        <span>{n.consent}</span>
                    </label>
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="newsletter-hp" aria-hidden="true" />
                    {status === 'error' && (
                        <p className="newsletter-msg newsletter-msg--error" role="alert">
                            {n.error}
                        </p>
                    )}
                </form>
            )}
        </div>
    );
}

// Result of the confirmation link (/api/newsletter/confirm redirects back with ?uutiskirje=ok|invalid|error).
export function NewsletterNotice() {
    const { t } = useI18n();
    const [state, setState] = useState(() => {
        if (typeof window === 'undefined') return null;
        const value = new URLSearchParams(window.location.search).get('uutiskirje');
        return ['ok', 'invalid', 'error'].includes(value) ? value : null;
    });

    useEffect(() => {
        if (!state) return;
        const url = new URL(window.location.href);
        url.searchParams.delete('uutiskirje');
        window.history.replaceState(null, '', url.pathname + url.search + url.hash);
        const timer = setTimeout(() => setState(null), 9000);
        return () => clearTimeout(timer);
    }, [state]);

    if (!state) return null;
    const n = t.newsletter.notice;
    return (
        <div className={`newsletter-notice newsletter-notice--${state}`} role="status">
            <Icon name={state === 'ok' ? 'check' : 'alert'} size={20} />
            <span>{n[state]}</span>
            <button type="button" onClick={() => setState(null)} aria-label={n.close}>
                <Icon name="close" size={16} />
            </button>
        </div>
    );
}
