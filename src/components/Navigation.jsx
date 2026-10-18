import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from './Icons';
import { useI18n } from '../i18n/context';
import { LOCALES, NAV_ANCHORS } from '../i18n/shared';
import './Navigation.css';

function LanguageSwitcher({ className = '' }) {
    const { locale, setLocale, t } = useI18n();
    return (
        <div className={`lang-switch ${className}`} role="group" aria-label={t.languageLabel}>
            {LOCALES.map((l) => (
                <button
                    key={l}
                    className={l === locale ? 'active' : ''}
                    onClick={() => setLocale(l)}
                    aria-pressed={l === locale}
                    lang={l}
                >
                    {l.toUpperCase()}
                </button>
            ))}
        </div>
    );
}

export default function Navigation() {
    const { t } = useI18n();
    const nav = t.nav;
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <>
            <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`} aria-label={nav.aria}>
                <a href="#top" className="nav-logo" aria-label={nav.home}>
                    <img src="/voon-logo-96.webp" alt="VOON IQ" className="nav-logo-img" width="347" height="96" />
                </a>
                <div className="nav-links">
                    {NAV_ANCHORS.map((href, i) => (
                        <a key={href} href={href} className="nav-link">
                            {nav.links[i]}
                        </a>
                    ))}
                </div>
                <div className="nav-actions">
                    <LanguageSwitcher className="lang-switch--desktop" />
                    <a href="#yhteys" className="nav-cta">
                        {nav.cta}
                    </a>
                    <button
                        className="nav-burger"
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? nav.closeMenu : nav.openMenu}
                        aria-expanded={open}
                    >
                        <Icon name={open ? 'close' : 'menu'} size={22} />
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {NAV_ANCHORS.map((href, i) => (
                            <motion.a
                                key={href}
                                href={href}
                                className="mobile-link"
                                onClick={() => setOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {nav.links[i]}
                            </motion.a>
                        ))}
                        <LanguageSwitcher className="lang-switch--mobile" />
                        <a href="#yhteys" className="btn btn-gradient" onClick={() => setOpen(false)}>
                            {nav.mobileCta}
                            <Icon name="arrowRight" size={18} />
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
