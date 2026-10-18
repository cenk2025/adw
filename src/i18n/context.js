import { createContext, useContext } from 'react';
import { LOCALES } from './shared';

export const LocaleContext = createContext(null);

// { locale, t, setLocale } for the current page language.
export const useI18n = () => useContext(LocaleContext);

// Finnish lives at "/", the other languages at "/en" and "/sv".
export const localeFromPath = (path) => {
    const segment = path.split('/')[1];
    return LOCALES.includes(segment) ? segment : 'fi';
};

export const pathForLocale = (locale) => (locale === 'fi' ? '/' : `/${locale}`);
