import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { SectionHead } from './Reveal';
import Icon from './Icons';
import { useI18n } from '../i18n/context';
import './AIStudio.css';

const STEP_MS = 6500;

// Illustrative shapes only: bar lengths, channel widths and column heights carry no real data.
const SHARE_WIDTHS = [0.82, 0.64, 0.31, 0.22];
const YOUR_BRAND = 2;
const CHANNELS = [
    [40, '#00f0ff'],
    [30, '#6f8bff'],
    [20, '#b06bff'],
    [10, '#c6ff5c'],
];
const POSTS = [
    [0, '#00f0ff', '18:00'],
    [1, '#6f8bff', null],
    [2, '#b06bff', '20:30'],
    [3, '#00f0ff', '12:00'],
    [4, '#c6ff5c', '08:00'],
    [5, '#00f0ff', '11:00'],
    [6, '#b06bff', '19:00'],
];
const COLUMNS = [22, 28, 26, 35, 41, 39, 52, 61];
const KPI_ICONS = ['cursor', 'coins', 'target'];

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

const ResearchPanel = ({ s }) => (
    <div className="panel-grid">
        <motion.div className="panel-card span-2" {...rise(0)}>
            <div className="panel-card-head">
                <span>{s.research.interest}</span>
                <span className="tag tag--up">
                    <Icon name="trendUp" size={13} strokeWidth={2.2} /> {s.research.trend}
                </span>
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
                <span>{s.research.share}</span>
            </div>
            {s.research.competitors.map((name, i) => (
                <div key={name} className={`hbar ${i === YOUR_BRAND ? 'hbar--you' : ''}`}>
                    <span>{name}</span>
                    <div className="hbar-track">
                        <motion.div className="hbar-fill" style={{ width: `${SHARE_WIDTHS[i] * 100}%` }} {...bar(0.2 + i * 0.1)} />
                    </div>
                </div>
            ))}
        </motion.div>
        <motion.div className="panel-card" {...rise(0.2)}>
            <div className="panel-card-head">
                <span>{s.research.language}</span>
            </div>
            <div className="chips">
                {s.research.words.map((w, i) => (
                    <motion.span
                        key={w}
                        className={`chip ${i === s.research.words.length - 1 ? 'chip--warn' : ''}`}
                        {...rise(0.3 + i * 0.05)}
                    >
                        {w}
                    </motion.span>
                ))}
            </div>
            <p className="panel-insight">
                <Icon name="sparkles" size={14} /> {s.research.insight}
            </p>
        </motion.div>
    </div>
);

const PlanPanel = ({ s }) => (
    <div className="panel-grid">
        {s.plan.personas.map((p, i) => (
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
                <span>{s.plan.channels}</span>
            </div>
            <div className="stack-bar">
                {CHANNELS.map(([width, color], i) => (
                    <motion.div
                        key={color + i}
                        className="stack-seg"
                        style={{ flexBasis: `${width}%`, background: color, transformOrigin: 'left' }}
                        {...bar(0.3 + i * 0.12)}
                    >
                        <span>{s.plan.channelNames[i]}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
        <motion.blockquote className="panel-card span-2 quote" {...rise(0.4)}>
            <span>{s.plan.message}</span>
            {s.plan.quote}
        </motion.blockquote>
    </div>
);

const CreatePanel = ({ s }) => (
    <div className="panel-grid">
        {['/work/choc-twist.webp', '/work/choc-splash.webp'].map((src, i) => (
            <motion.figure key={src} className="panel-card creative" {...rise(i * 0.12)}>
                <img src={src} alt="" loading="lazy" />
                <figcaption>
                    <span>
                        {s.create.visual} {i === 0 ? 'A' : 'B'}
                    </span>
                    {i === 0 ? (
                        <span className="tag tag--up">
                            <Icon name="star" size={12} strokeWidth={2.2} /> {s.create.best}
                        </span>
                    ) : (
                        <span className="tag">{s.create.alternative}</span>
                    )}
                </figcaption>
            </motion.figure>
        ))}
        {s.create.copies.map((text, i) => (
            <motion.div key={text} className={`panel-card copy-variant ${i === 0 ? 'best' : ''}`} {...rise(0.25 + i * 0.1)}>
                <span className="variant-key">{i === 0 ? 'A' : 'B'}</span>
                <span>{text}</span>
                {i === 0 && <span className="tag tag--up">{s.create.chosen}</span>}
            </motion.div>
        ))}
    </div>
);

const PublishPanel = ({ s }) => (
    <div className="calendar">
        {s.publish.days.map((d, i) => (
            <motion.div key={d} className="cal-day" {...rise(i * 0.05)}>
                <span className="cal-label">{d}</span>
                {POSTS.filter(([day]) => day === i).map(([day, color, time]) => (
                    <motion.div
                        key={day}
                        className="cal-post"
                        style={{ borderColor: color }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.07 }}
                    >
                        <span className="cal-dot" style={{ background: color }} />
                        <strong>{s.publish.posts[day]}</strong>
                        <span>{time ?? s.publish.always}</span>
                    </motion.div>
                ))}
            </motion.div>
        ))}
    </div>
);

const OptimizePanel = ({ s }) => (
    <div className="panel-grid">
        {s.optimize.kpis.map((kpi, i) => (
            <motion.div key={kpi.label} className="panel-card kpi" {...rise(i * 0.08)}>
                <span className="kpi-icon">
                    <Icon name={KPI_ICONS[i]} size={20} />
                </span>
                <span>{kpi.label}</span>
                <span className="tag tag--up">
                    <Icon name={kpi.dir === 'up' ? 'trendUp' : 'trendDown'} size={13} strokeWidth={2.2} /> {kpi.trend}
                </span>
            </motion.div>
        ))}
        <motion.div className="panel-card span-3" {...rise(0.25)}>
            <div className="panel-card-head">
                <span>{s.optimize.chart}</span>
            </div>
            <div className="columns">
                {COLUMNS.map((v, i) => (
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
            {s.optimize.log}
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
    const { t } = useI18n();
    const studio = t.studio;
    const [active, setActive] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.35 });

    useEffect(() => {
        if (!autoplay || !inView) return;
        const timer = setTimeout(() => setActive((a) => (a + 1) % studio.steps.length), STEP_MS);
        return () => clearTimeout(timer);
    }, [active, autoplay, inView, studio.steps.length]);

    const step = studio.steps[active];
    const Panel = PANELS[step.id];

    return (
        <section id="studio" className="section studio-section" ref={ref}>
            <div className="glow glow--cyan" style={{ width: 600, height: 600, left: '-15%', top: '20%' }} />
            <div className="container">
                <SectionHead eyebrow={studio.eyebrow} title={studio.title} subtitle={studio.subtitle} />

                <div className="studio-layout">
                    <div className="studio-steps" role="tablist" aria-label={studio.tabsLabel}>
                        {studio.steps.map((s, i) => (
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
                                VOON IQ Studio · <b>{studio.brand}</b> · {step.label}
                            </span>
                            <span className="window-live">
                                <i /> {studio.live}
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
                                    <Panel s={studio} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className="window-note">{studio.note}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
