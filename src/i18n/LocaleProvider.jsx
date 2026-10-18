import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LocaleContext, localeFromPath, pathForLocale } from './context';
import fi from './fi';
import en from './en';
import sv from './sv';

const DICTIONARIES = { fi, en, sv };

export default function LocaleProvider({ children }) {
    const [locale, setLocaleState] = useState(() => localeFromPath(window.location.pathname));
    const t = DICTIONARIES[locale];

    const setLocale = useCallback((next) => {
        if (!DICTIONARIES[next]) return;
        window.history.pushState(null, '', pathForLocale(next) + window.location.hash);
        setLocaleState(next);
    }, []);

    useEffect(() => {
        const onPop = () => setLocaleState(localeFromPath(window.location.pathname));
        window.addEventListener('popstate', onPop);
        return () => window.removeEventListener('popstate', onPop);
    }, []);

    // Keep the document language, title and description in step with the page.
    useEffect(() => {
        document.documentElement.lang = locale;
        document.title = t.meta.title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    }, [locale, t]);

    const value = useMemo(() => ({ locale, t, setLocale }), [locale, t, setLocale]);
    return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
