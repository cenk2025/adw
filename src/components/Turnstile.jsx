import React, { useEffect, useRef } from 'react';

// Cloudflare Turnstile: a privacy-friendly "are you human" check, usually passed without any clicks.
// The widget is loaded only once the visitor starts filling in the form (first focus or click
// inside it), so visitors who only read the page never contact Cloudflare and no tokens are
// issued that would never be sent to the server for verification.

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise = null;
// Forms the visitor has already used: a remounted widget (after a send attempt) renders at once.
const activeForms = new WeakSet();

function loadScript() {
    if (window.turnstile) return Promise.resolve();
    if (!scriptPromise) {
        scriptPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = SCRIPT_SRC;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => {
                scriptPromise = null; // allow a retry on the next mount
                reject(new Error('Turnstile script failed to load'));
            };
            document.head.appendChild(script);
        });
    }
    return scriptPromise;
}

export default function Turnstile({ siteKey, language, onToken }) {
    const ref = useRef(null);
    // Keep the latest callback without re-rendering the widget when the parent re-renders.
    const onTokenRef = useRef(onToken);
    useEffect(() => {
        onTokenRef.current = onToken;
    }, [onToken]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let widgetId = null;
        let cancelled = false;
        let started = false;

        // A click fires both pointerdown and focusin: render only once.
        const begin = () => {
            if (started) return;
            started = true;
            if (form) activeForms.add(form);
            loadScript()
                .then(() => {
                    if (cancelled || !window.turnstile) return;
                    widgetId = window.turnstile.render(el, {
                        sitekey: siteKey,
                        language,
                        // Match the site's light/dark choice at the moment the widget appears.
                        theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
                        callback: (token) => onTokenRef.current(token),
                        'expired-callback': () => onTokenRef.current(null),
                        'error-callback': () => onTokenRef.current(null),
                    });
                })
                .catch((error) => console.error(error));
        };

        const form = el.closest('form');
        if (!form || activeForms.has(form)) {
            begin();
        } else {
            form.addEventListener('focusin', begin, { once: true });
            form.addEventListener('pointerdown', begin, { once: true });
        }

        return () => {
            cancelled = true;
            form?.removeEventListener('focusin', begin);
            form?.removeEventListener('pointerdown', begin);
            onTokenRef.current(null);
            if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
        };
    }, [siteKey, language]);

    return <div ref={ref} className="turnstile" />;
}
