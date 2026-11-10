import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';

// ============================================================
// DEV MODE — "Engineer's Console"
// Reveals the technical metadata of the site itself:
//  - 12-col grid overlay
//  - Architecture view
//  - FPS
// ============================================================

interface DevModeContextValue {
  enabled: boolean;
  toggle: () => void;
  showGrid: boolean;
  setShowGrid: (v: boolean) => void;
  showArchitecture: boolean;
  setShowArchitecture: (v: boolean) => void;
  /** Currently visible section (driven by IntersectionObserver). */
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const DevModeContext = createContext<DevModeContextValue | null>(null);

export function DevModeProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  // Keyboard shortcut — Cmd/Ctrl + .
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '.') {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggle]);

  const value = useMemo<DevModeContextValue>(
    () => ({
      enabled,
      toggle,
      showGrid,
      setShowGrid,
      showArchitecture,
      setShowArchitecture,
      activeSection,
      setActiveSection,
    }),
    [enabled, toggle, showGrid, showArchitecture, activeSection]
  );

  return <DevModeContext.Provider value={value}>{children}</DevModeContext.Provider>;
}

export function useDevMode() {
  const ctx = useContext(DevModeContext);
  if (!ctx) throw new Error('useDevMode must be used within DevModeProvider');
  return ctx;
}
