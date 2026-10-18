import React from 'react';

// Minimal stroke icon set (24px grid, inherits currentColor).
const PATHS = {
    radar: (
        <>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" />
            <path d="M12 12l6-6" />
            <circle cx="12" cy="12" r="1" />
        </>
    ),
    palette: (
        <>
            <path d="M12 3a9 9 0 100 18c1.1 0 1.7-.9 1.7-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.7-1.7H16a5 5 0 005-5c0-4.1-4-7.1-9-7.1z" />
            <circle cx="7.5" cy="11.5" r="1" />
            <circle cx="10" cy="7.5" r="1" />
            <circle cx="14.5" cy="7.5" r="1" />
        </>
    ),
    sparkles: (
        <>
            <path d="M12 3l1.8 4.9L19 9.8l-5.2 1.9L12 16.6l-1.8-4.9L5 9.8l5.2-1.9z" />
            <path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z" />
        </>
    ),
    calendar: (
        <>
            <rect x="3" y="5" width="18" height="16" rx="3" />
            <path d="M3 10h18M8 3v4M16 3v4" />
            <path d="M8 14h3v3H8z" />
        </>
    ),
    trending: (
        <>
            <path d="M3 17l6-6 4 4 8-8" />
            <path d="M15 7h6v6" />
        </>
    ),
    code: (
        <>
            <path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" />
        </>
    ),
    shield: (
        <>
            <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" />
            <path d="M9 12l2 2 4-4" />
        </>
    ),
    user: (
        <>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
        </>
    ),
    eye: (
        <>
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
        </>
    ),
    pin: (
        <>
            <path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z" />
            <circle cx="12" cy="9" r="2.5" />
        </>
    ),
    mail: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="M3 7l9 6 9-6" />
        </>
    ),
    globe: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
        </>
    ),
    arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
    trendUp: (
        <>
            <path d="M3 17l6-6 4 4 8-8" />
            <path d="M15 7h6v6" />
        </>
    ),
    trendDown: (
        <>
            <path d="M3 7l6 6 4-4 8 8" />
            <path d="M15 17h6v-6" />
        </>
    ),
    star: <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />,
    target: (
        <>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="12" cy="12" r="1.5" />
        </>
    ),
    cursor: <path d="M5 3l14 7-6 2-2 6z" />,
    coins: (
        <>
            <ellipse cx="12" cy="6" rx="7" ry="3" />
            <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
            <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </>
    ),
    arrowUpRight: <path d="M7 17L17 7M8 7h9v9" />,
    chevronLeft: <path d="M15 18l-6-6 6-6" />,
    chevronRight: <path d="M9 18l6-6-6-6" />,
    check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
    plus: <path d="M12 5v14M5 12h14" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M6 6l12 12M18 6L6 18" />,
    alert: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v6M12 16.5v.5" />
        </>
    ),
    cookie: (
        <>
            <path d="M21 12.5A9 9 0 1111.5 3a3 3 0 003.5 3.5 3 3 0 003 3 3 3 0 003 3z" />
            <circle cx="8.5" cy="10.5" r=".8" />
            <circle cx="10" cy="15.5" r=".8" />
            <circle cx="15" cy="14.5" r=".8" />
        </>
    ),
};

export default function Icon({ name, size = 24, className = '', strokeWidth = 1.7 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {PATHS[name]}
        </svg>
    );
}
