import React from 'react';
import { motion } from 'framer-motion';

// Fades and lifts its children into view once, when scrolled into the viewport.
export default function Reveal({ children, delay = 0, y = 32, className = '', as = 'div' }) {
    const Component = motion[as];
    return (
        <Component
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </Component>
    );
}

export function SectionHead({ eyebrow, title, subtitle, align = 'left' }) {
    return (
        <div className={`section-head section-head--${align}`}>
            {eyebrow && (
                <Reveal>
                    <span className="eyebrow">{eyebrow}</span>
                </Reveal>
            )}
            <Reveal delay={0.05}>
                <h2 className="section-title">{title}</h2>
            </Reveal>
            {subtitle && (
                <Reveal delay={0.1}>
                    <p className="section-subtitle">{subtitle}</p>
                </Reveal>
            )}
        </div>
    );
}
