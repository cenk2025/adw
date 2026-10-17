import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import VoonScrollExperience from './components/VoonScrollExperience';
import Marquee from './components/Marquee';
import Intro from './components/Intro';
import Services from './components/Services';
import AIStudio from './components/AIStudio';
import Showcase from './components/Showcase';
import WebApps from './components/WebApps';
import Process from './components/Process';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import './index.css';

export default function App() {
    // Service preselected in the contact form when a pricing plan CTA is clicked.
    const [presetNeed, setPresetNeed] = useState('');

    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
            anchors: { offset: -80 },
        });

        let frame;
        function raf(time) {
            lenis.raf(time);
            frame = requestAnimationFrame(raf);
        }
        frame = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frame);
            lenis.destroy();
        };
    }, []);

    return (
        <div className="app-root" id="top">
            <Navigation />

            <main>
                <VoonScrollExperience />
                <Marquee />
                <Intro />
                <Services />
                <AIStudio />
                <Showcase />
                <WebApps />
                <Process />
                <Pricing onSelectPlan={setPresetNeed} />
                <FAQ />
                <Contact presetNeed={presetNeed} />
            </main>

            <Footer />
            <CookieConsent />
        </div>
    );
}
