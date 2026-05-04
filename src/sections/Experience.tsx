import { motion } from 'framer-motion';
import { experiences } from '@/data/portfolio';
import type { Experience as ExperienceType } from '@/data/portfolio';
import { SectionHeader } from '@/components/SectionHeader';
import { useScrollSection } from '@/hooks/useScrollSection';
import './Experience.scss';

export function Experience() {
  const ref = useScrollSection<HTMLElement>('experience');

  return (
    <section id="experience" ref={ref} className="experience">
      <div className="container">
        <SectionHeader
          index="02"
          label="Career arc"
          title="7+ years of engineering growth, from early MERN stack web apps to complex enterprise ecosystems."
          description="My experience has been a steady build—mastering full-stack delivery, diving into the intricacies of real-time SDKs, and ultimately scaling high-traffic surfaces at a marketplace level."
        />

        <ol className="experience__timeline">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} isLast={i === experiences.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  exp: ExperienceType;
  index: number;
  isLast: boolean;
}

function ExperienceCard({ exp, index, isLast }: ExperienceCardProps) {
  const isCurrent = exp.end === 'present';

  return (
    <motion.li
      className={`experience__item ${isCurrent ? 'experience__item--current' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Spine + node */}
      <div className="experience__spine" aria-hidden>
        <span className={`experience__node experience__node--${exp.accent}`}>
          {isCurrent && <span className="experience__node-pulse" />}
        </span>
        {!isLast && <span className="experience__line" />}
      </div>

      {/* Content */}
      <div className="experience__content">
        <header className="experience__head">
          <div className="experience__meta">
            <span className="experience__period">{exp.period}</span>
            {isCurrent && <span className="experience__current-tag">CURRENT</span>}
          </div>
          <h3 className="experience__company">{exp.company}</h3>
          <span className="experience__role">
            {exp.role} · <em>{exp.location}</em>
          </span>
          <p className="experience__tagline">{exp.tagline}</p>
        </header>

        {/* Domain chip */}
        <div className="experience__domain">
          <span className="experience__domain-label">DOMAIN</span>
          <span className="experience__domain-value">{exp.domain}</span>
        </div>

        {/* Achievements */}
        <ul className="experience__achievements">
          {exp.achievements.map((a, i) => (
            <li key={i} className="experience__achievement">
              <span className="experience__achievement-marker" aria-hidden>—</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>

        {/* Metrics shelf */}
        <div className="experience__metrics">
          {exp.metrics.map((m) => (
            <div key={m.label} className="experience__metric">
              <span className="experience__metric-value">{m.value}</span>
              <span className="experience__metric-label">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Stack */}
        <ul className="experience__stack">
          {exp.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}
