import React from 'react';
import { MARQUEE } from '../content';
import './Marquee.css';

export default function Marquee() {
    // The list is rendered twice so the CSS loop can translate by exactly -50%.
    const items = [...MARQUEE, ...MARQUEE];
    return (
        <div className="marquee" aria-label={MARQUEE.join(', ')}>
            <div className="marquee-track" aria-hidden="true">
                {items.map((item, i) => (
                    <span key={i} className="marquee-item">
                        {item}
                        <span className="marquee-star">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
