import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from './Icons';
import { useI18n } from '../i18n/context';
import './CookieConsent.css';

const STORAGE_KEY = 'voon_cookie_consent';

const readConsent = () => {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
};

const writeConsent = (value) => {
    try {
        localStorage.setItem(STORAGE_KEY, value);
    } catch {
        // Storage can be unavailable (private mode); the banner simply shows again next visit.
    }
};

export default function CookieConsent() {
    const { t } = useI18n();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let timer;
        if (!readConsent()) {
            timer = setTimeout(() => setIsVisible(true), 2500);
        }
        // The footer's "Evästeasetukset" link reopens the banner.
        const reopen = () => setIsVisible(true);
        window.addEventListener('voon:cookie-settings', reopen);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('voon:cookie-settings', reopen);
        };
    }, []);

    const choose = (value) => {
        writeConsent(value);
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="cookie-consent-overlay"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="cookie-modal" role="dialog" aria-label={t.cookie.aria}>
                        <div className="cookie-content">
                            <span className="cookie-icon">
                                <Icon name="cookie" size={24} />
                            </span>
                            <div className="cookie-text">
                                <h3>{t.cookie.title}</h3>
                                <p>{t.cookie.body}</p>
                            </div>
                        </div>
                        <div className="cookie-actions">
                            <button onClick={() => choose('declined')} className="btn-decline">
                                {t.cookie.decline}
                            </button>
                            <button onClick={() => choose('accepted')} className="btn-accept">
                                {t.cookie.accept}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
