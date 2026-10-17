import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal, { SectionHead } from './Reveal';
import { PROCESS } from '../content';
import './Process.css';

export default function Process() {
    const listRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="prosessi" className="section process-section">
            <div className="container">
                <SectionHead eyebrow={PROCESS.eyebrow} title={PROCESS.title} align="center" />

                <div className="process-wrap" ref={listRef}>
                    <div className="process-line" aria-hidden="true">
                        <motion.div className="process-line-fill" style={{ scaleY: lineScale }} />
                    </div>
                    <ol className="process-list">
                        {PROCESS.steps.map((step, i) => (
                            <Reveal key={step.title} as="li" className="process-step" delay={0.05}>
                                <span className="process-marker">{i + 1}</span>
                                <div className="process-card">
                                    <span className="process-kicker">Vaihe {String(i + 1).padStart(2, '0')}</span>
                                    <h3>{step.title}</h3>
                                    <p>{step.body}</p>
                                </div>
                            </Reveal>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
