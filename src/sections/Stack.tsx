import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { skills } from '@/data/portfolio';
import type { Skill, SkillCategory } from '@/data/portfolio';
import { SectionHeader } from '@/components/SectionHeader';
import { useScrollSection } from '@/hooks/useScrollSection';
import './Stack.scss';

// ============================================================
// THE STACK — visualized as a T-shaped constellation.
//
// The "trunk" of the T = my core (TS / JS / React) — deepest expertise.
// The "arms" of the T = breadth across backend, cloud, tooling, AI.
//
// Instead of progress bars, we show:
//   1. A ring constellation where dot size = years of usage
//      and ring distance = depth of expertise.
//   2. A category grid below with structured detail.
// ============================================================

const categoryMeta: Record<SkillCategory, { label: string; color: string; description: string }> = {
  core: { label: 'Core', color: '#d4ff4a', description: 'The trunk of the T — daily-use languages.' },
  frontend: { label: 'Frontend', color: '#d4ff4a', description: 'Frameworks I architect production systems with.' },
  backend: { label: 'Backend', color: '#5ee2f0', description: 'Services and data layers I build and own.' },
  cloud: { label: 'Cloud', color: '#f5c84b', description: 'Infrastructure for serverless and event-driven systems.' },
  tooling: { label: 'Tooling', color: '#c8c8cf', description: 'CI/CD, testing, build tooling.' },
  ai: { label: 'AI', color: '#ff7a3d', description: 'Agent integration and AI-augmented delivery.' },
};

export function Stack() {
  const ref = useScrollSection<HTMLElement>('stack');
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');
  const [hovered, setHovered] = useState<string | null>(null);

  // Pre-compute orbit positions
  const placedSkills = useMemo(() => placeSkillsOnConstellation(skills), []);

  return (
    <section id="stack" ref={ref} className="stack">
      <div className="container">
        <SectionHeader
          index="01"
          label="Technical stack"
          title={'A T-shaped engineer. Deep where it matters, broad enough to architect.'}
          description="No progress bars — they lie. Below is a constellation: the closer a node is to center, the deeper my expertise. Size signals years of production-grade usage, while the categories represent the breadth of my stack."
        />

        {/* CONSTELLATION */}
        <div className="stack__constellation-wrap">
          <div className="stack__constellation">
            {/* Concentric rings */}
            <svg className="stack__rings" viewBox="-200 -200 400 400" aria-hidden>
              {[60, 120, 180].map((r, i) => (
                <circle
                  key={r}
                  cx="0" cy="0" r={r}
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.5"
                  strokeDasharray={i === 0 ? '0' : '2 4'}
                />
              ))}
              {/* T-shape guides */}
              <line x1="-180" y1="-180" x2="180" y2="-180" stroke="rgba(212, 255, 74, 0.08)" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="0" y1="-180" x2="0" y2="180" stroke="rgba(212, 255, 74, 0.08)" strokeWidth="0.5" strokeDasharray="3 3" />

              {/* Connection lines from center outward */}
              {placedSkills.map((s) => (
                <line
                  key={`l-${s.name}`}
                  x1="0" y1="0"
                  x2={s.x} y2={s.y}
                  stroke={categoryMeta[s.category].color}
                  strokeWidth="0.4"
                  strokeOpacity={s.level === 'expert' ? 0.4 : s.level === 'advanced' ? 0.25 : 0.12}
                />
              ))}

              {/* Ring labels */}
              <text x="0" y="-65" fill="rgba(212, 255, 74, 0.6)" fontSize="6" textAnchor="middle" fontFamily="JetBrains Mono, monospace" letterSpacing="1">EXPERT</text>
              <text x="0" y="-125" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle" fontFamily="JetBrains Mono, monospace" letterSpacing="1">ADVANCED</text>
              <text x="0" y="-185" fill="rgba(255,255,255,0.3)" fontSize="6" textAnchor="middle" fontFamily="JetBrains Mono, monospace" letterSpacing="1">PROFICIENT</text>
            </svg>

            {/* Center pulse */}
            <div className="stack__center" aria-hidden>
              <span>Ds</span>
            </div>

            {/* Skill nodes */}
            {placedSkills.map((s, i) => {
              const isActive = activeCategory === 'all' || activeCategory === s.category;
              const isHovered = hovered === s.name;
              const dotSize = 6 + s.years * 1.4;

              return isActive ? (
                <motion.button
                  key={s.name}
                  className={`stack__node ${isHovered ? 'stack__node--hover' : ''}`}
                  style={{
                    left: `calc(50% + ${s.x}px)`,
                    top: `calc(50% + ${s.y}px)`,
                    '--node-color': categoryMeta[s.category].color,
                    '--node-size': `${dotSize}px`,
                  } as React.CSSProperties}
                  onMouseEnter={() => setHovered(s.name)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(s.name)}
                  onBlur={() => setHovered(null)}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.025,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  aria-label={`${s.name}: ${s.level}, ${s.years} years`}
                >
                  <span className="stack__node-dot" />
                  <span className="stack__node-label">{s.name}</span>
                </motion.button>
              ) : null;
            })}

          </div>

          {/* Filter chips */}
          <div className="stack__filters">
            <button
              className={`stack__filter ${activeCategory === 'all' ? 'stack__filter--active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            {(Object.keys(categoryMeta) as SkillCategory[]).map((cat) => (
              <button
                key={cat}
                className={`stack__filter ${activeCategory === cat ? 'stack__filter--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                style={{ '--cat-color': categoryMeta[cat].color } as React.CSSProperties}
              >
                <span className="stack__filter-dot" />
                {categoryMeta[cat].label}
              </button>
            ))}
          </div>

          {/* Hover detail panel */}
          <div className="stack__detail">
            {hovered ? (
              (() => {
                const s = skills.find((x) => x.name === hovered)!;
                return (
                  <>
                    <span className="stack__detail-name">{s.name}</span>
                    <span className="stack__detail-meta">
                      <span style={{ color: categoryMeta[s.category].color }}>
                        {categoryMeta[s.category].label}
                      </span>
                      <span>·</span>
                      <span>{s.level}</span>
                      <span>·</span>
                      <span>{s.years} {s.years === 1 ? 'year' : 'years'}</span>
                    </span>
                  </>
                );
              })()
            ) : (
              <span className="stack__detail-hint">Hover a node for details · {skills.length} technologies</span>
            )}
          </div>
        </div>

        {/* CATEGORY GRID — structured supplement to the visualization */}
        <div className="stack__categories">
          {(Object.keys(categoryMeta) as SkillCategory[]).filter(cat => activeCategory === 'all' || cat === activeCategory).map((cat) => {
            const items = skills.filter((s) => s.category === cat);
            return (
              <div
                key={cat}
                className="stack__category"
                style={{ '--cat-color': categoryMeta[cat].color } as React.CSSProperties}
              >
                <header className="stack__category-head">
                  <span className="stack__category-label">{categoryMeta[cat].label}</span>
                  <span className="stack__category-count">{items.length}</span>
                </header>
                <p className="stack__category-desc">{categoryMeta[cat].description}</p>
                <ul className="stack__category-list">
                  {items.map((s) => (
                    <li key={s.name}>
                      <span className="stack__category-skill">{s.name}</span>
                      <span className="stack__category-years">{s.years}y</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Constellation layout algorithm ─────────────────────────
// Place each skill on a ring based on level (expertise depth).
// Distribute by category so related skills cluster together.
function placeSkillsOnConstellation(items: Skill[]): (Skill & { x: number; y: number })[] {
  const radiusByLevel: Record<Skill['level'], number> = {
    expert: 80,
    advanced: 130,
    proficient: 180,
  };

  // Group by category to cluster angles
  const categoryAngles: Record<SkillCategory, number> = {
    core: -90,        // top
    frontend: -45,    // top-right
    backend: 30,      // right-low
    cloud: 90,        // bottom
    tooling: 150,     // bottom-left
    ai: -135,         // top-left
  };

  const angleSpread = 60; // degrees within each cluster

  // Group items by category
  const byCategory: Record<string, Skill[]> = {};
  for (const item of items) {
    if (!byCategory[item.category]) byCategory[item.category] = [];
    byCategory[item.category].push(item);
  }

  const result: (Skill & { x: number; y: number })[] = [];

  for (const [cat, list] of Object.entries(byCategory)) {
    const baseAngle = categoryAngles[cat as SkillCategory];
    const step = list.length > 1 ? angleSpread / (list.length - 1) : 0;
    const start = baseAngle - angleSpread / 2;

    list.forEach((s, i) => {
      const angle = list.length === 1 ? baseAngle : start + step * i;
      const radius = radiusByLevel[s.level];
      // Slight jitter so nodes aren't perfectly aligned across rings
      const jitter = ((i % 2) * 8) - 4;
      const r = radius + jitter;
      const rad = (angle * Math.PI) / 180;
      result.push({
        ...s,
        x: Math.cos(rad) * r,
        y: Math.sin(rad) * r,
      });
    });
  }

  return result;
}
