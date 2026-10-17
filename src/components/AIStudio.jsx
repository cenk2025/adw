import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { SectionHead } from './Reveal';
import Icon from './Icons';
import { STUDIO } from '../content';
import './AIStudio.css';

const STEP_MS = 6500;

const bar = (delay) => ({
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

const rise = (delay) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const ResearchPanel = () => (
    <div className="panel-grid">
        <motion.div className="panel-card span-2" {...rise(0)}>
            <div className="panel-card-head">
                <span>Hakukiinnostus · premium-suklaa</span>
                <span className="tag tag--up">+34 % / v</span>
            </div>
            <svg viewBox="0 0 300 80" className="spark" preserveAspectRatio="none">
                <motion.path
                    d="M0 70 C30 66 45 60 70 58 S110 50 130 44 S170 40 190 30 S240 22 260 14 S290 8 300 6"
                    fill="none"
                    stroke="url(#spark-grad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                />
                <defs>
                    <linearGradient id="spark-grad" x1="0" x2="1">
                        <stop offset="0" stopColor="#00f0ff" />
                        <stop offset="1" stopColor="#b06bff" />
                    </linearGradient>
                </defs>
            </svg>
        </motion.div>
        <motion.div className="panel-card" {...rise(0.1)}>
            <div className="panel-card-head">
                <span>Näkyvyysosuus</span>
            </div>
            {[
                ['Kilpailija A', 0.82],
                ['Kilpailija B', 0.64],
                ['Sinun brändisi', 0.31],
                ['Kilpailija C', 0.22],
            ].map(([name, v], i) => (
                <div key={name} className={`hbar ${name === 'Sinun brändisi' ? 'hbar--you' : ''}`}>
                    <span>{name}</span>
                    <div className="hbar-track">
                        <motion.div className="hbar-fill" style={{ width: `${v * 100}%` }} {...bar(0.2 + i * 0.1)} />
                    </div>
                </div>
            ))}
        </motion.div>
        <motion.div className="panel-card" {...rise(0.2)}>
            <div className="panel-card-head">
                <span>Asiakkaiden kieli</span>
            </div>
            <div className="chips">
                {['laadukas', 'lahjaksi', 'reilu kauppa', 'vegaaninen', 'kotimainen', 'liian kallis'].map((w, i) => (
                    <motion.span key={w} className={`chip ${w === 'liian kallis' ? 'chip--warn' : ''}`} {...rise(0.3 + i * 0.05)}>
                        {w}
                    </motion.span>
                ))}
            </div>
            <p className="panel-insight">
                <Icon name="sparkles" size={14} /> Mahdollisuus: lahjapakkaukset ennen joulua.
            </p>
        </motion.div>
    </div>
);

const PlanPanel = () => (
    <div className="panel-grid">
        {[
            { name: 'Laatutietoinen lahjanantaja', meta: '30–45 v · kaupunki · Instagram' },
            { name: 'Arjen herkuttelija', meta: '20–35 v · opiskelija · TikTok' },
        ].map((p, i) => (
            <motion.div key={p.name} className="panel-card persona" {...rise(i * 0.1)}>
                <span className="persona-avatar">{p.name[0]}</span>
                <div>
                    <strong>{p.name}</strong>
                    <span>{p.meta}</span>
                </div>
            </motion.div>
        ))}
        <motion.div className="panel-card span-2" {...rise(0.2)}>
            <div className="panel-card-head">
                <span>Kanavajako</span>
                <span className="tag">Budjetti 1 500 € / kk</span>
            </div>
            <div className="stack-bar">
                {[
                    ['Instagram', 40, '#00f0ff'],
                    ['Google', 30, '#6f8bff'],
                    ['TikTok', 20, '#b06bff'],
                    ['Uutiskirje', 10, '#c6ff5c'],
                ].map(([name, v, c], i) => (
                    <motion.div
                        key={name}
                        className="stack-seg"
                        style={{ flexBasis: `${v}%`, background: c, transformOrigin: 'left' }}
                        {...bar(0.3 + i * 0.12)}
                    >
                        <span>
                            {name} {v} %
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
        <motion.blockquote className="panel-card span-2 quote" {...rise(0.4)}>
            <span>Ydinviesti</span>
            ”Pieni hetki, joka maistuu isolta.”
        </motion.blockquote>
    </div>
);

const CreatePanel = () => (
    <div className="panel-grid">
        {[
            { src: '/work/choc-twist.webp', label: 'Visuaali A', score: 92 },
            { src: '/work/choc-splash.webp', label: 'Visuaali B', score: 78 },
        ].map((v, i) => (
            <motion.figure key={v.label} className="panel-card creative" {...rise(i * 0.12)}>
                <img src={v.src} alt="" loading="lazy" />
                <figcaption>
                    <span>{v.label}</span>
                    <span className={`tag ${i === 0 ? 'tag--up' : ''}`}>Ennuste {v.score}/100</span>
                </figcaption>
            </motion.figure>
        ))}
        {[
            ['A', 'Pieni hetki, joka maistuu isolta.', true],
            ['B', 'Suomalaista suklaata, reilusti tehty.', false],
        ].map(([k, text, best], i) => (
            <motion.div key={k} className={`panel-card copy-variant ${best ? 'best' : ''}`} {...rise(0.25 + i * 0.1)}>
                <span className="variant-key">{k}</span>
                <span>{text}</span>
                {best && <span className="tag tag--up">Valittu</span>}
            </motion.div>
        ))}
    </div>
);

const DAYS = ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'];
const POSTS = [
    [0, 'IG Reels', '#00f0ff', '18:00'],
    [1, 'Google-mainos', '#6f8bff', 'jatkuva'],
    [2, 'TikTok', '#b06bff', '20:30'],
    [3, 'IG Story', '#00f0ff', '12:00'],
    [4, 'Uutiskirje', '#c6ff5c', '08:00'],
    [5, 'IG Karuselli', '#00f0ff', '11:00'],
    [6, 'TikTok', '#b06bff', '19:00'],
];

const PublishPanel = () => (
    <div className="calendar">
        {DAYS.map((d, i) => (
            <motion.div key={d} className="cal-day" {...rise(i * 0.05)}>
                <span className="cal-label">{d}</span>
                {POSTS.filter(([day]) => day === i).map(([, name, color, time]) => (
                    <motion.div
                        key={name}
                        className="cal-post"
                        style={{ borderColor: color }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.07 }}
                    >
                        <span className="cal-dot" style={{ background: color }} />
                        <strong>{name}</strong>
                        <span>{time}</span>
                    </motion.div>
                ))}
            </motion.div>
        ))}
    </div>
);

const OptimizePanel = () => (
    <div className="panel-grid">
        {[
            ['CTR', '2,8 %', '+0,9'],
            ['Hinta / klikkaus', '0,42 €', '−31 %'],
            ['ROAS', '4,1×', '+1,3'],
        ].map(([k, v, d], i) => (
            <motion.div key={k} className="panel-card kpi" {...rise(i * 0.08)}>
                <span>{k}</span>
                <strong>{v}</strong>
                <span className="tag tag--up">{d}</span>
            </motion.div>
        ))}
        <motion.div className="panel-card span-3" {...rise(0.25)}>
            <div className="panel-card-head">
                <span>Konversiot · 8 viikkoa</span>
            </div>
            <div className="columns">
                {[22, 28, 26, 35, 41, 39, 52, 61].map((v, i) => (
                    <motion.div
                        key={i}
                        className="column"
                        style={{ height: `${v * 1.4}%`, transformOrigin: 'bottom' }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    />
                ))}
            </div>
        </motion.div>
        <motion.div className="panel-card span-3 log" {...rise(0.5)}>
            <Icon name="sparkles" size={14} />
            Visuaali A sai 2,1× enemmän klikkauksia. Budjetti siirretty automaattisesti, B poistettu käytöstä.
        </motion.div>
    </div>
);

const PANELS = {
    research: ResearchPanel,
    plan: PlanPanel,
    create: CreatePanel,
    publish: PublishPanel,
    optimize: OptimizePanel,
};

export default function AIStudio() {
    const [active, setActive] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.35 });

    useEffect(() => {
        if (!autoplay || !inView) return;
        const t = setTimeout(() => setActive((a) => (a + 1) % STUDIO.steps.length), STEP_MS);
        return () => clearTimeout(t);
    }, [active, autoplay, inView]);

    const step = STUDIO.steps[active];
    const Panel = PANELS[step.id];

    return (
        <section id="studio" className="section studio-section" ref={ref}>
            <div className="glow glow--cyan" style={{ width: 600, height: 600, left: '-15%', top: '20%' }} />
            <div className="container">
                <SectionHead eyebrow={STUDIO.eyebrow} title={STUDIO.title} subtitle={STUDIO.subtitle} />

                <div className="studio-layout">
                    <div className="studio-steps" role="tablist" aria-label="AI-studion vaiheet">
                        {STUDIO.steps.map((s, i) => (
                            <button
                                key={s.id}
                                role="tab"
                                aria-selected={i === active}
                                className={`studio-step ${i === active ? 'active' : ''}`}
                                onClick={() => {
                                    setActive(i);
                                    setAutoplay(false);
                                }}
                            >
                                <span className="studio-step-num">0{i + 1}</span>
                                <span className="studio-step-text">
                                    <strong>
                                        {s.label}
                                        <em> · {s.title}</em>
                                    </strong>
                                    <span>{s.body}</span>
                                </span>
                                {i === active && autoplay && inView && (
                                    <motion.span
                                        key={`progress-${active}`}
                                        className="studio-step-progress"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="studio-window">
                        <div className="window-bar">
                            <span className="window-dots">
                                <i />
                                <i />
                                <i />
                            </span>
                            <span className="window-title">
                                VOON IQ Studio · <b>Kaakao &amp; Co</b> · {step.label}
                            </span>
                            <span className="window-live">
                                <i /> AI työssä
                            </span>
                        </div>
                        <div className="window-body" role="tabpanel">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <Panel />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className="window-note">{STUDIO.note}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
