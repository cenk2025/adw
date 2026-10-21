import { useEffect, useState } from 'react';

// The visitor's choice: 'system' follows the OS setting, 'light' and 'dark' pin it.
const STORAGE_KEY = 'voon_theme';
export const THEME_OPTIONS = ['system', 'light', 'dark'];
const META_COLORS = { light: '#f6f8fb', dark: '#0d1321' };

const darkQuery = () => window.matchMedia('(prefers-color-scheme: dark)');

const readPreference = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return THEME_OPTIONS.includes(saved) ? saved : 'system';
    } catch {
        return 'system';
    }
};

// Same resolution as the inline script in index.html, which runs before React to avoid a flash.
const applyTheme = (preference) => {
    const theme = preference === 'system' ? (darkQuery().matches ? 'dark' : 'light') : preference;
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLORS[theme]);
};

export function useThemePreference() {
    const [preference, setPreference] = useState(readPreference);

    useEffect(() => {
        applyTheme(preference);
        try {
            localStorage.setItem(STORAGE_KEY, preference);
        } catch {
            // Storage unavailable: the choice still applies for this visit.
        }
        if (preference !== 'system') return;
        const query = darkQuery();
        const onChange = () => applyTheme('system');
        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    }, [preference]);

    return [preference, setPreference];
}
