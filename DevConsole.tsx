import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import './DevConsole.scss';

export function DevConsole() {
  const {
    enabled,
    showGrid,
    setShowGrid,
    showArchitecture,
    setShowArchitecture,
    activeSection,
  } = useDevMode();

  const [fps, setFps] = useState(60);
  useEffect(() => {
    if (!enabled) return;
    let frames = 0;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      frames += 1;
      if (now - last >= 1000) {
        setFps(frames);
        frames = 0;
        last = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  const fpsTone = fps >= 55 ? "good" : fps >= 30 ? "warn" : "bad";

  return (
    <>
      {/* GRID OVERLAY */}
      <AnimatePresence>
        {enabled && showGrid && (
          <motion.div
            className="dev-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-hidden
          >
            <div className="container dev-grid__inner">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="dev-grid__col">
                  <span className="dev-grid__col-label">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONSOLE PANEL */}
      <AnimatePresence>
        {enabled && (
          <motion.aside
            className="dev-console"
            initial={{ opacity: 0, x: 60, y: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Developer console"
          >
            <header className="dev-console__header">
              <span className="dev-console__title">
                <span className="dev-console__led" /> ENGINEER&rsquo;S CONSOLE
              </span>
              <span className="dev-console__hint">⌘. to close</span>
            </header>

            {/* TELEMETRY ROW */}
            <div className="dev-console__row dev-console__row--telemetry">
              <div className="dev-console__metric">
                <span className="dev-console__metric-label">FPS</span>
                <span
                  className={`dev-console__metric-value dev-console__metric-value--${fpsTone}`}
                >
                  {fps}
                </span>
              </div>
              <div className="dev-console__metric">
                <span className="dev-console__metric-label">SECTION</span>
                <span className="dev-console__metric-value">
                  {activeSection}
                </span>
              </div>
              <div className="dev-console__metric">
                <span className="dev-console__metric-label">VIEWPORT</span>
                <span className="dev-console__metric-value">
                  {window.innerWidth}×{window.innerHeight}
                </span>
              </div>
            </div>

            {/* TOGGLES */}
            <div className="dev-console__toggles">
              <Toggle
                label="12-col grid"
                checked={showGrid}
                onChange={setShowGrid}
              />
              <Toggle
                label="Architecture view"
                checked={showArchitecture}
                onChange={setShowArchitecture}
              />
            </div>

            {/* META */}
            <footer className="dev-console__footer">
              <code>
                build = next-level · stack = react+ts+vite+scss · motion =
                framer
              </code>
            </footer>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ARCHITECTURE VIEW */}
      <AnimatePresence>
        {enabled && showArchitecture && <ArchitectureView />}
      </AnimatePresence>
    </>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className={`dev-toggle ${checked ? 'dev-toggle--on' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="dev-toggle__track">
        <span className="dev-toggle__thumb" />
      </span>
      <span className="dev-toggle__label">{label}</span>
    </label>
  );
}

function ArchitectureView() {
  const nodes = [
    { id: 'app', label: 'App.tsx', x: 50, y: 8, kind: 'root' },
    { id: 'nav', label: 'Navigation', x: 18, y: 22, kind: 'shell' },
    { id: 'console', label: 'DevConsole', x: 82, y: 22, kind: 'shell' },
    { id: 'hero', label: 'Hero', x: 12, y: 42, kind: 'section' },
    { id: 'experience', label: 'Experience', x: 50, y: 42, kind: 'section' },
    { id: 'stack', label: 'Stack', x: 68, y: 42, kind: 'section' },
    { id: 'data', label: 'portfolio.ts', x: 30, y: 70, kind: 'data' },
    { id: 'context', label: 'DevModeContext', x: 70, y: 70, kind: 'data' },
    { id: 'hooks', label: 'hooks/*', x: 50, y: 88, kind: 'data' },
  ];

  const edges = [
    ['app', 'nav'], ['app', 'console'],
    ['app', 'hero'], ['app', 'experience'], ['app', 'stack'],
    ['hero', 'data'], ['experience', 'data'], ['stack', 'data'],
    ['nav', 'context'], ['console', 'context'],
    ['hero', 'hooks'], ['experience', 'hooks'],
  ] as const;

  return (
    <motion.div
      className="dev-arch"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="dev-arch__header">
        <span>ARCHITECTURE GRAPH · COMPONENT TREE</span>
      </div>
      <svg className="dev-arch__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map(([from, to], i) => {
          const a = nodes.find((n) => n.id === from)!;
          const b = nodes.find((n) => n.id === to)!;
          return (
            <motion.line
              key={i}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="rgba(212, 255, 74, 0.35)"
              strokeWidth="0.1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: i * 0.04 }}
            />
          );
        })}
      </svg>
      <div className="dev-arch__nodes">
        {nodes.map((n, i) => (
          <motion.span
            key={n.id}
            className={`dev-arch__node dev-arch__node--${n.kind}`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.04 }}
          >
            {n.label}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
