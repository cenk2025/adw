import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from './Icons';
import { NAV_LINKS } from '../content';
import './Navigation.css';

export default function Navigation() {
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
            <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`} aria-label="Päävalikko">
                <a href="#top" className="nav-logo" aria-label="VOON IQ etusivu">
                    <img src="/voon-logo-96.webp" alt="VOON" className="nav-logo-img" width="245" height="96" />
                    <span className="logo-iq">IQ</span>
                </a>
                <div className="nav-links">
                    {NAV_LINKS.map((link) => (
                        <a key={link.href} href={link.href} className="nav-link">
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="nav-actions">
                    <a href="#yhteys" className="nav-cta">
                        Varaa kartoitus
                    </a>
                    <button
                        className="nav-burger"
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? 'Sulje valikko' : 'Avaa valikko'}
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
                        {NAV_LINKS.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                className="mobile-link"
                                onClick={() => setOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                        <a href="#yhteys" className="btn btn-gradient" onClick={() => setOpen(false)}>
                            Varaa maksuton kartoitus
                            <Icon name="arrowRight" size={18} />
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
