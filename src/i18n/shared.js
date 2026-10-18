// Language-independent data shared by all locales. Locale files hold the text;
// arrays here line up with the matching arrays there by index.

export const CONTACT_EMAIL = 'info@voon.fi';

export const LOCALES = ['fi', 'en', 'sv'];

export const HERO_SLIDES = [
    { id: 'voonarc', count: 192, firstFrame: 1 },
    { id: 'voonc', count: 140, firstFrame: 53 },
    { id: 'voona', count: 131, firstFrame: 37 },
];

export const WORK_IMAGES = [
    { src: '/work/arc-final.webp', size: 'wide' },
    { src: '/work/choc-twist.webp', size: 'tall' },
    { src: '/work/car-chassis.webp', size: 'tall' },
    { src: '/work/arc-frame.webp', size: 'tall' },
    { src: '/work/choc-splash.webp', size: 'tall' },
    { src: '/work/car-final.webp', size: 'wide' },
];

export const PRODUCTS = [
    { name: 'SkillPath', url: 'https://tyo.voon.fi', domain: 'tyo.voon.fi' },
    { name: 'Talent Factory', url: 'https://worklife.voon.fi', domain: 'worklife.voon.fi' },
    { name: 'BizPulse', url: 'https://biz.voon.fi', domain: 'biz.voon.fi' },
    { name: 'Nordway', url: 'https://nordway.voon.fi', domain: 'nordway.voon.fi' },
];

export const STACK = ['React', 'Next.js', 'Supabase', 'Vercel', 'Claude & OpenAI', 'n8n'];

export const NAV_ANCHORS = ['#palvelut', '#studio', '#tyot', '#web', '#hinnat', '#ukk'];
