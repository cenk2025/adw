import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Loader from './Loader';
import './VoonScrollExperience.css';

const FRAME_COUNT = 192;
const SCROLL_HEIGHT_VH = 1000; // Increased height for slower scroll

const TextSection = ({ opacity, y, title, subtitle }) => (
    <motion.div
        style={{ opacity, y }}
        className="scroll-text-section"
    >
        <h2 className="scroll-headline">{title}</h2>
        <p className="scroll-subtitle">{subtitle}</p>
    </motion.div>
);

export default function VoonScrollExperience() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [slidesData, setSlidesData] = useState({}); // { 0: [img...], 1: [img...] }
    const [loading, setLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const SLIDES = [
        {
            id: 'voonarc',
            count: 192,
            getFileName: (i) => `/voonarc/ezgif-frame-${(i + 1).toString().padStart(3, '0')}.jpg`
        },
        {
            id: 'voonc',
            count: 140, // 53 to 192 = 140 frames
            getFileName: (i) => `/voonc/ezgif-frame-${(i + 53).toString().padStart(3, '0')}.jpg`
        },
        {
            id: 'voona',
            count: 131, // 37 to 167 = 131 frames
            getFileName: (i) => `/voona/ezgif-frame-${(i + 37).toString().padStart(3, '0')}.jpg`
        }
    ];

    // Scroll hooks
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Load images for a specific slide
    const loadSlideImages = async (slideIndex) => {
        if (slidesData[slideIndex]) {
            setLoading(false);
            return; // Already loaded
        }

        setLoading(true);
        setLoadProgress(0);

        const slide = SLIDES[slideIndex];
        const imgArray = [];
        let loadedCount = 0;

        const promises = [];

        for (let i = 0; i < slide.count; i++) {
            const promise = new Promise((resolve, reject) => {
                const img = new Image();
                img.src = slide.getFileName(i);
                img.onload = () => {
                    imgArray[i] = img;
                    loadedCount++;
                    setLoadProgress((loadedCount / slide.count) * 100);
                    resolve();
                };
                img.onerror = () => {
                    // Handle error gracefully - maybe skip or use placeholder?
                    console.warn(`Failed to load ${img.src}`);
                    // Resolve anyway to avoid hanging
                    imgArray[i] = null;
                    loadedCount++;
                    setLoadProgress((loadedCount / slide.count) * 100);
                    resolve();
                }
            });
            promises.push(promise);
        }

        await Promise.all(promises);

        setSlidesData(prev => ({
            ...prev,
            [slideIndex]: imgArray
        }));
        setLoading(false);
    };

    // Initial load
    useEffect(() => {
        loadSlideImages(activeSlide);
    }, [activeSlide]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && canvasRef.current.parentElement) {
                const { clientWidth, clientHeight } = canvasRef.current.parentElement;
                canvasRef.current.width = clientWidth;
                canvasRef.current.height = clientHeight;
                setDimensions({ width: clientWidth, height: clientHeight });
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Draw Frame
    useEffect(() => {
        const currentImages = slidesData[activeSlide];
        if (loading || !canvasRef.current || !currentImages || currentImages.length === 0) return;

        const render = (val) => {
            const slide = SLIDES[activeSlide];
            const safeVal = Math.min(1, Math.max(0, val));

            // Map scroll 0-1 to frame index 0-(count-1)
            const index = Math.min(
                slide.count - 1,
                Math.floor(safeVal * (slide.count - 1))
            );

            const img = currentImages[index];
            if (!img) return;

            const ctx = canvasRef.current.getContext('2d');
            const cw = canvasRef.current.width;
            const ch = canvasRef.current.height;

            // Object cover logic
            const imgRatio = img.width / img.height;
            const canvasRatio = cw / ch;

            let drawW, drawH, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                drawW = cw;
                drawH = cw / imgRatio;
                offsetX = 0;
                offsetY = (ch - drawH) / 2;
            } else {
                drawH = ch;
                drawW = ch * imgRatio;
                offsetX = (cw - drawW) / 2;
                offsetY = 0;
            }

            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        };

        const unsubscribe = smoothProgress.onChange(render);
        render(smoothProgress.get());

        return () => unsubscribe();
    }, [loading, slidesData, activeSlide, dimensions, smoothProgress]);

    // Text Animations (Existing logic)
    const heroOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);
    const heroY = useTransform(smoothProgress, [0, 0.05], [0, -50]);

    const s1Opacity = useTransform(smoothProgress, [0.15, 0.20, 0.30, 0.35], [0, 1, 1, 0]);
    const s1Y = useTransform(smoothProgress, [0.15, 0.20, 0.30, 0.35], [50, 0, 0, -50]);

    const s2Opacity = useTransform(smoothProgress, [0.40, 0.45, 0.55, 0.60], [0, 1, 1, 0]);
    const s2Y = useTransform(smoothProgress, [0.40, 0.45, 0.55, 0.60], [50, 0, 0, -50]);

    const s3Opacity = useTransform(smoothProgress, [0.65, 0.70, 0.80, 0.85], [0, 1, 1, 0]);
    const s3Y = useTransform(smoothProgress, [0.65, 0.70, 0.80, 0.85], [50, 0, 0, -50]);

    const s4Opacity = useTransform(smoothProgress, [0.85, 0.90, 0.98, 1.0], [0, 1, 1, 1]);
    const s4Y = useTransform(smoothProgress, [0.85, 0.90, 0.98, 1.0], [50, 0, 0, 0]);


    const nextSlide = () => setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    const prevSlide = () => setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

    return (
        <>
            {loading && <Loader progress={loadProgress} />}

            <div
                ref={containerRef}
                style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
                className="scroll-container relative"
            >
                <div className="sticky-viewport">
                    <canvas ref={canvasRef} className="main-canvas" />

                    {/* Navigation Arrows */}
                    <button className="slider-nav prev" onClick={prevSlide} aria-label="Previous Slide">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button className="slider-nav next" onClick={nextSlide} aria-label="Next Slide">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>

                    {/* Dots */}
                    <div className="slider-dots">
                        {SLIDES.map((_, idx) => (
                            <div
                                key={idx}
                                className={`slider-dot ${activeSlide === idx ? 'active' : ''}`}
                                onClick={() => setActiveSlide(idx)}
                            />
                        ))}
                    </div>

                    {/* Hero Content */}
                    <motion.div style={{ opacity: heroOpacity, y: heroY }} className="hero-overlay">
                        <h1 className="hero-headline">VOON MARKETING MANAGER.</h1>
                        <p className="hero-subheadline">Markkinointi, joka toimii ennen kuin ehdit kysyä.</p>
                    </motion.div>

                    {/* Scrolly Sections - Only show on first slide/voonarc? Or both? Assuming both for now. */}
                    <TextSection
                        opacity={s1Opacity} y={s1Y}
                        title="Tämä ei ole markkinointitoimisto."
                        subtitle="Tämä on markkinointisi ohjauskeskus."
                    />

                    <TextSection
                        opacity={s2Opacity} y={s2Y}
                        title="Tekoäly, joka tekee enemmän kuin analysoi."
                        subtitle="Suunnittelee, tuottaa ja optimoi kampanjasi reaaliajassa."
                    />

                    <TextSection
                        opacity={s3Opacity} y={s3Y}
                        title="Vähemmän manuaalista työtä. Enemmän tuloksia."
                        subtitle="Sosiaalinen media, sisällöt ja kampanjat — automaattisesti."
                    />

                    <TextSection
                        opacity={s4Opacity} y={s4Y}
                        title="Rakennettu suomalaisille yrityksille."
                        subtitle="Tietoturva, läpinäkyvyys ja luotettavuus edellä."
                    />
                </div>
            </div>
        </>
    );
}
