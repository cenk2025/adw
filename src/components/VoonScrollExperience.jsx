import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import Loader from './Loader';
import Icon from './Icons';
import { HERO, HERO_SLIDES, HERO_STORY } from '../content';
import './VoonScrollExperience.css';

const SCROLL_HEIGHT_VH = 460;

// The source frames are 1920x1080 with baked-in letterbox bars (y < 132, y > 947)
// and a generator watermark in the bottom-right corner. Draw only the clean area.
const CROP = { sx: 0, sy: 136, sw: 1800, sh: 806 };

// The loader hides once every 16th frame is in, so scrubbing works immediately.
const COARSE_STEP = 16;
const MAX_PARALLEL = 6;

const STORY_RANGES = [
    [0.14, 0.19, 0.3, 0.35],
    [0.38, 0.43, 0.53, 0.58],
    [0.61, 0.66, 0.76, 0.81],
    [0.84, 0.89, 1, 1.01],
];

const frameSrc = (slide, i) =>
    `/${slide.id}/ezgif-frame-${String(i + slide.firstFrame).padStart(3, '0')}.jpg`;

const coarseTotal = (slide) => Math.ceil(slide.count / COARSE_STEP);

// Coarse-to-fine order: every 16th frame first, then every 8th, 4th, 2nd, then the rest.
function loadOrder(count) {
    const order = [];
    const seen = new Set();
    for (const step of [COARSE_STEP, 8, 4, 2, 1]) {
        for (let i = 0; i < count; i += step) {
            if (!seen.has(i)) {
                seen.add(i);
                order.push(i);
            }
        }
    }
    if (!seen.has(count - 1)) order.push(count - 1);
    return order;
}

function startLoading(entry, slide, { onFrame, onCoarse }) {
    const order = loadOrder(slide.count);
    let cursor = 0;

    const next = () => {
        if (cursor >= order.length) return;
        const i = order[cursor++];
        const img = new Image();
        img.decoding = 'async';
        const done = (ok) => {
            if (ok) entry.images[i] = img;
            onFrame();
            if (i % COARSE_STEP === 0) {
                entry.coarseLoaded++;
                onCoarse();
            }
            next();
        };
        img.onload = () => done(true);
        img.onerror = () => done(false);
        img.src = frameSrc(slide, i);
    };

    for (let k = 0; k < MAX_PARALLEL; k++) next();
}

const StoryText = ({ progress, range, title, subtitle }) => {
    const opacity = useTransform(progress, range, [0, 1, 1, 0]);
    const y = useTransform(progress, range, [50, 0, 0, -50]);
    return (
        <motion.div style={{ opacity, y }} className="scroll-text-section">
            <h2 className="scroll-headline">{title}</h2>
            <p className="scroll-subtitle">{subtitle}</p>
        </motion.div>
    );
};

export default function VoonScrollExperience() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [ready, setReady] = useState(false);
    const [coarseProgress, setCoarseProgress] = useState(0);
    const [buildPercent, setBuildPercent] = useState(0);

    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    // slideIndex -> { images: Image[], coarseLoaded: number }
    const cacheRef = useRef({});
    const activeRef = useRef(0);
    const progressRef = useRef(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const slideIndex = activeRef.current;
        const entry = cacheRef.current[slideIndex];
        if (!canvas || !entry) return;

        const slide = HERO_SLIDES[slideIndex];
        const p = Math.min(1, Math.max(0, progressRef.current));
        const target = Math.min(slide.count - 1, Math.floor(p * (slide.count - 1)));

        // Fall back to the nearest frame that has finished loading.
        let img = null;
        for (let d = 0; d < slide.count && !img; d++) {
            img = entry.images[target - d] || entry.images[target + d] || null;
        }
        if (!img) return;

        const ctx = canvas.getContext('2d');
        const cw = canvas.width;
        const ch = canvas.height;
        const srcRatio = CROP.sw / CROP.sh;

        let drawW, drawH;
        if (cw / ch > srcRatio) {
            drawW = cw;
            drawH = cw / srcRatio;
        } else {
            drawH = ch;
            drawW = ch * srcRatio;
        }

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, CROP.sx, CROP.sy, CROP.sw, CROP.sh, (cw - drawW) / 2, (ch - drawH) / 2, drawW, drawH);
    }, []);

    const ensureLoaded = useCallback(
        (slideIndex) => {
            if (cacheRef.current[slideIndex]) return;
            const slide = HERO_SLIDES[slideIndex];
            const entry = { images: new Array(slide.count), coarseLoaded: 0 };
            cacheRef.current[slideIndex] = entry;

            startLoading(entry, slide, {
                onFrame: () => {
                    if (activeRef.current === slideIndex) draw();
                },
                onCoarse: () => {
                    if (activeRef.current !== slideIndex) return;
                    setCoarseProgress(entry.coarseLoaded / coarseTotal(slide));
                    if (entry.coarseLoaded === coarseTotal(slide)) setReady(true);
                },
            });
        },
        [draw],
    );

    useEffect(() => {
        activeRef.current = activeSlide;
        ensureLoaded(activeSlide);
        draw();
    }, [activeSlide, ensureLoaded, draw]);

    // Once the active slide is usable, warm up the next one in the background.
    useEffect(() => {
        if (coarseProgress >= 1) ensureLoaded((activeSlide + 1) % HERO_SLIDES.length);
    }, [coarseProgress, activeSlide, ensureLoaded]);

    // Keep the canvas pixel size in sync with its box and the device pixel ratio.
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(canvas.clientWidth * dpr);
            canvas.height = Math.round(canvas.clientHeight * dpr);
            draw();
        };
        resize();
        const observer = new ResizeObserver(resize);
        observer.observe(canvas);
        return () => observer.disconnect();
    }, [draw]);

    useMotionValueEvent(smoothProgress, 'change', (v) => {
        progressRef.current = v;
        draw();
        const pct = Math.round(Math.min(1, Math.max(0, v)) * 100);
        setBuildPercent(pct);
    });

    const heroOpacity = useTransform(smoothProgress, [0, 0.07], [1, 0]);
    const heroY = useTransform(smoothProgress, [0, 0.07], [0, -60]);
    const heroPointer = useTransform(smoothProgress, (v) => (v > 0.06 ? 'none' : 'auto'));

    const selectSlide = (idx) => {
        const entry = cacheRef.current[idx];
        setCoarseProgress(entry ? entry.coarseLoaded / coarseTotal(HERO_SLIDES[idx]) : 0);
        setActiveSlide(idx);
    };
    const nextSlide = () => selectSlide((activeSlide + 1) % HERO_SLIDES.length);
    const prevSlide = () => selectSlide((activeSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

    return (
        <>
            <AnimatePresence>{!ready && <Loader progress={coarseProgress * 100} />}</AnimatePresence>

            <section
                ref={containerRef}
                style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
                className="scroll-container"
                aria-label="VOON IQ esittely"
            >
                <div className="sticky-viewport">
                    <canvas ref={canvasRef} className="main-canvas" />
                    <div className="hero-vignette" aria-hidden="true" />

                    <motion.div
                        style={{ opacity: heroOpacity, y: heroY, pointerEvents: heroPointer }}
                        className="hero-overlay"
                    >
                        <motion.span
                            className="eyebrow eyebrow--glass"
                            initial={{ opacity: 0, y: 20 }}
                            animate={ready ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {HERO.eyebrow}
                        </motion.span>
                        <h1 className="hero-headline">
                            {HERO.title.map((line, i) => (
                                <motion.span
                                    key={line}
                                    className={i === HERO.title.length - 1 ? 'gradient-text' : undefined}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={ready ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {line}
                                </motion.span>
                            ))}
                        </h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={ready ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="hero-subheadline">{HERO.subtitle}</p>
                            <div className="hero-ctas">
                                <a href="#yhteys" className="btn btn-primary">
                                    {HERO.primaryCta}
                                    <Icon name="arrowRight" size={18} />
                                </a>
                                <a href="#palvelut" className="btn btn-ghost">
                                    {HERO.secondaryCta}
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {HERO_STORY.map((item, i) => (
                        <StoryText
                            key={item.title}
                            progress={smoothProgress}
                            range={STORY_RANGES[i]}
                            title={item.title}
                            subtitle={item.subtitle}
                        />
                    ))}

                    <div className="hero-hud">
                        <div className="hud-label">
                            <span className="hud-index">
                                {String(activeSlide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
                            </span>
                            <span className="hud-title">{HERO_SLIDES[activeSlide].label}</span>
                        </div>
                        <div className="hud-build" aria-hidden="true">
                            <span>{buildPercent === 0 ? HERO.scrollHint : 'Rakentuu'}</span>
                            <div className="hud-bar">
                                <div className="hud-bar-fill" style={{ transform: `scaleX(${buildPercent / 100})` }} />
                            </div>
                            <span className="hud-pct">{buildPercent}%</span>
                        </div>
                        <div className="hud-controls">
                            <button className="slider-nav" onClick={prevSlide} aria-label="Edellinen konsepti">
                                <Icon name="chevronLeft" size={20} />
                            </button>
                            <div className="slider-dots">
                                {HERO_SLIDES.map((slide, idx) => (
                                    <button
                                        key={slide.id}
                                        className={`slider-dot ${activeSlide === idx ? 'active' : ''}`}
                                        onClick={() => selectSlide(idx)}
                                        aria-label={slide.label}
                                        aria-current={activeSlide === idx}
                                    />
                                ))}
                            </div>
                            <button className="slider-nav" onClick={nextSlide} aria-label="Seuraava konsepti">
                                <Icon name="chevronRight" size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
