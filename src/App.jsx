import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import VoonScrollExperience from './components/VoonScrollExperience';
import ContentSections from './components/ContentSections';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import './index.css';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">VOON</div>
      <div className="nav-links">
        <a href="#" className="nav-link">Palvelut</a>
        <a href="#" className="nav-link">Miksi Voon</a>
        <a href="#" className="nav-link">Kuinka se toimii</a>
      </div>
      <button className="nav-cta">
        Ota yhteyttä
      </button>
    </nav>
  );
};

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-root">
      <Navigation />

      <main>
        <VoonScrollExperience />
        <ContentSections />
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
}
