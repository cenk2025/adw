import React from 'react';
import { useI18n } from '../i18n/context';
import './Marquee.css';

export default function Marquee() {
    const { t } = useI18n();
    // The list is rendered twice so the CSS loop can translate by exactly -50%.
    const items = [...t.marquee, ...t.marquee];
    return (
        <div className="marquee" aria-label={t.marquee.join(', ')}>
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
