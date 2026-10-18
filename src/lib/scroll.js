// Shared access to the page's Lenis instance so components can scroll smoothly.
let lenis = null;

export const setLenis = (instance) => {
    lenis = instance;
};

export const scrollToY = (y) => {
    if (lenis) lenis.scrollTo(y, { duration: 1.6 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
};
