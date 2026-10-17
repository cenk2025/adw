import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal, { SectionHead } from './Reveal';
import Icon from './Icons';
import { FAQ as ITEMS } from '../content';
import './FAQ.css';

export default function FAQ() {
    const [open, setOpen] = useState(0);

    return (
        <section id="ukk" className="section faq-section">
            <div className="container faq-grid">
                <SectionHead
                    eyebrow="UKK"
                    title="Usein kysyttyä."
                    subtitle="Etkö löytänyt vastausta? Kysy suoraan, vastaamme mielellämme."
                />

                <div className="faq-list">
                    {ITEMS.map((item, i) => {
                        const isOpen = open === i;
                        return (
                            <Reveal key={item.q} delay={0.04 * i} className={`faq-item ${isOpen ? 'open' : ''}`}>
                                <button
                                    className="faq-question"
                                    onClick={() => setOpen(isOpen ? -1 : i)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-${i}`}
                                >
                                    {item.q}
                                    <span className="faq-icon">
                                        <Icon name="plus" size={18} />
                                    </span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={`faq-${i}`}
                                            className="faq-answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <p>{item.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
