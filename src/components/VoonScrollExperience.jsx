import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import Loader from './Loader';
import Icon from './Icons';
import { useI18n } from '../i18n/context';
import { HERO_SLIDES } from '../i18n/shared';
import { scrollToY } from '../lib/scroll';
import './VoonScrollExperience.css';

// The hero scroll is split evenly between the slides, which play one after another.
const SLIDE_COUNT = HERO_SLIDES.length;
const SCROLL_VH_PER_SLIDE = 300;
const SCROLL_HEIGHT_VH = SCROLL_VH_PER_SLIDE * SLIDE_COUNT;

// The source frames are 1920x1080 with baked-in letterbox bars (y < 132, y > 947)
// and a generator watermark in the bottom-right corner. Draw only the clean area.
const CROP = { sx: 0, sy: 136, sw: 1800, sh: 806 };

// The loader hides once every 16th frame is in, so scrubbing works immediately.
const COARSE_STEP = 16;
const MAX_PARALLEL = 6;

const STORY_RANGES = [
    [0.06, 0.09, 0.24, 0.28],
    [0.39, 0.42, 0.57, 0.61],
    [0.72, 0.75, 0.84, 0.87],
    [0.9, 0.93, 1, 1.01],
];

// A short dip to black hides the cut where one slide hands over to the next.
const DIP_HALF = 0.025;
const DIP_INPUT = [0];
const DIP_OUTPUT = [0];
for (let k = 1; k < SLIDE_COUNT; k++) {
    const b = k / SLIDE_COUNT;
    DIP_INPUT.push(b - DIP_HALF, b, b + DIP_HALF);
    DIP_OUTPUT.push(0, 1, 0);
}
DIP_INPUT.push(1);
DIP_OUTPUT.push(0);

// Global hero progress (0..1) -> [slide index, progress within that slide].
const slideAt = (p) => {
    const c = Math.min(1, Math.max(0, p)) * SLIDE_COUNT;
    const i = Math.min(SLIDE_COUNT - 1, Math.floor(c));
    return [i, Math.min(1, c - i)];
};

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
    const { t } = useI18n();
    const hero = t.hero;
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
    // Lets a slide's loader start the next slide without ensureLoaded referencing itself.
    const loadNextRef = useRef(null);

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
        const [slideIndex, p] = slideAt(progressRef.current);
        const entry = cacheRef.current[slideIndex];
        if (!canvas || !entry) return;

        const slide = HERO_SLIDES[slideIndex];
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
                    const done = entry.coarseLoaded === coarseTotal(slide);
                    if (slideIndex === 0) {
                        setCoarseProgress(entry.coarseLoaded / coarseTotal(slide));
                        if (done) setReady(true);
                    }
                    // Chain the slides: once one is scrubbable, start loading the next.
                    if (done && slideIndex + 1 < SLIDE_COUNT) loadNextRef.current?.(slideIndex + 1);
                },
            });
        },
        [draw],
    );

    useEffect(() => {
        loadNextRef.current = ensureLoaded;
        ensureLoaded(0);
        draw();
    }, [ensureLoaded, draw]);

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
        const [slideIndex, local] = slideAt(v);
        if (slideIndex !== activeRef.current) {
            activeRef.current = slideIndex;
            setActiveSlide(slideIndex);
            ensureLoaded(slideIndex);
        }
        draw();
        setBuildPercent(Math.round(local * 100));
    });

    const heroOpacity = useTransform(smoothProgress, [0, 0.03], [1, 0]);
    const heroY = useTransform(smoothProgress, [0, 0.03], [0, -60]);
    const heroPointer = useTransform(smoothProgress, (v) => (v > 0.025 ? 'none' : 'auto'));
    const dipOpacity = useTransform(smoothProgress, DIP_INPUT, DIP_OUTPUT);

    // The dots and arrows scroll to the start of a slide's part of the hero.
    const selectSlide = (idx) => {
        const el = containerRef.current;
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const range = el.offsetHeight - window.innerHeight;
        const offset = idx === 0 ? 0 : (idx + DIP_HALF * SLIDE_COUNT) / SLIDE_COUNT;
        scrollToY(top + range * offset);
    };
    const nextSlide = () => selectSlide(Math.min(SLIDE_COUNT - 1, activeSlide + 1));
    const prevSlide = () => selectSlide(Math.max(0, activeSlide - 1));

    return (
        <>
            <AnimatePresence>{!ready && <Loader progress={coarseProgress * 100} />}</AnimatePresence>

            <section
                ref={containerRef}
                style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
                className="scroll-container"
                aria-label={hero.aria}
            >
                <div className="sticky-viewport">
                    <canvas ref={canvasRef} className="main-canvas" />
                    <div className="hero-vignette" aria-hidden="true" />
                    <motion.div className="hero-dip" style={{ opacity: dipOpacity }} aria-hidden="true" />

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
                            {hero.eyebrow}
                        </motion.span>
                        <h1 className="hero-headline">
                            {hero.title.map((line, i) => (
                                <motion.span
                                    key={line}
                                    className={i === hero.title.length - 1 ? 'gradient-text' : undefined}
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
                            <p className="hero-subheadline">{hero.subtitle}</p>
                            <div className="hero-ctas">
                                <a href="#yhteys" className="btn btn-primary">
                                    {hero.primaryCta}
                                    <Icon name="arrowRight" size={18} />
                                </a>
                                <a href="#palvelut" className="btn btn-ghost">
                                    {hero.secondaryCta}
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {hero.story.map((item, i) => (
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
                            <span className="hud-title">{hero.slides[activeSlide]}</span>
                        </div>
                        <div className="hud-build" aria-hidden="true">
                            <span>{activeSlide === 0 && buildPercent === 0 ? hero.scrollHint : hero.building}</span>
                            <div className="hud-bar">
                                <div className="hud-bar-fill" style={{ transform: `scaleX(${buildPercent / 100})` }} />
                            </div>
                            <span className="hud-pct">{buildPercent}%</span>
                        </div>
                        <div className="hud-controls">
                            <button
                                className="slider-nav"
                                onClick={prevSlide}
                                disabled={activeSlide === 0}
                                aria-label={hero.prev}
                            >
                                <Icon name="chevronLeft" size={20} />
                            </button>
                            <div className="slider-dots">
                                {HERO_SLIDES.map((slide, idx) => (
                                    <button
                                        key={slide.id}
                                        className={`slider-dot ${activeSlide === idx ? 'active' : ''}`}
                                        onClick={() => selectSlide(idx)}
                                        aria-label={hero.slides[idx]}
                                        aria-current={activeSlide === idx}
                                    />
                                ))}
                            </div>
                            <button
                                className="slider-nav"
                                onClick={nextSlide}
                                disabled={activeSlide === SLIDE_COUNT - 1}
                                aria-label={hero.next}
                            >
                                <Icon name="chevronRight" size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
