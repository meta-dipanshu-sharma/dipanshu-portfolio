import { useEffect, useRef } from 'react';
import { useDevMode } from '@/context/DevModeContext';

/**
 * Tracks when a section element passes a "trigger band" near the top
 * of the viewport, and reports it as the active section.
 *
 * Uses a rootMargin that defines a thin horizontal band ~30% from the
 * top of the viewport. A section is considered active when it
 * intersects that band. This is far more reliable than threshold-based
 * intersection because the element only has to *touch* the band, not
 * occupy a specific fraction of it.
 */
export function useScrollSection<T extends HTMLElement>(id: string) {
  const ref = useRef<T | null>(null);
  const { setActiveSection } = useDevMode();

  // Capture the latest setter into a ref so the effect deps stay constant.
  const setActiveSectionRef = useRef(setActiveSection);
  useEffect(() => {
    setActiveSectionRef.current = setActiveSection;
  }, [setActiveSection]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSectionRef.current(id);
          }
        }
      },
      {
        // A 1px-tall trigger band ~30% from the top of the viewport.
        // Top margin: -30% (band starts 30% down).
        // Bottom margin: -70% (band ends 30% + 1px down — i.e. just below).
        // Together they shrink the "root" to a thin horizontal strip.
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0,
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [id]);

  return ref;
}
