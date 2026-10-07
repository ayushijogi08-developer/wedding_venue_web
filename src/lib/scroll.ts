export const scrollToSection = (targetIdOrElement: string | HTMLElement) => {
  if (typeof window === 'undefined') return;

  let element: HTMLElement | null = null;
  if (typeof targetIdOrElement === 'string') {
    const cleanId = targetIdOrElement.replace(/^#/, '');
    element = document.getElementById(cleanId);
  } else {
    element = targetIdOrElement;
  }

  if (!element) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lenis = (window as any).lenis;

  if (lenis && typeof lenis.scrollTo === 'function' && !reducedMotion) {
    lenis.scrollTo(element, { offset: 0, duration: 1.2 });
  } else {
    element.scrollIntoView({
      behavior: reducedMotion ? 'instant' : 'smooth',
      block: 'start',
    });
  }
};
