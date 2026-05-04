import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { profile } from '@/data/portfolio';
import { useScrollSection } from '@/hooks/useScrollSection';
import './Hero.scss';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useScrollSection<HTMLElement>('hero');
  const heroInnerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <section id="hero" ref={sectionRef} className="hero">
      {/* Atmospheric backdrop */}
      <div className="hero__atmosphere" aria-hidden>
        <div className="hero__grid" />
        <div className="hero__halo" />
        <div className="hero__noise" />
      </div>

      <motion.div
        ref={heroInnerRef}
        className="container hero__inner"
        style={{ y, opacity }}
      >
        {/* ── SPLIT: left = content, right = photo ── */}
        <div className="hero__split">
          {/* LEFT — all existing content, untouched */}
          <div className="hero__content">
            {/* Status row */}
            <motion.div
              className="hero__status"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="hero__status-led" aria-hidden />
              <span className="hero__status-text">
                <span className="hero__status-mono">AVAILABLE</span> — Full
                Stack & Frontend Developer · Mid/Senior · Berlin / Germany
              </span>
            </motion.div>

            {/* Name intro */}
            <motion.div
              className="hero__intro"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="hero__intro-hi">Hi, my name is</span>
              <span className="hero__intro-name">{profile.name}</span>
            </motion.div>

            {/* The headline — staggered, editorial */}
            <h1
              className="hero__title"
              aria-label={`${profile.name} — ${profile.title} — Building interfaces that scale to millions`}
            >
              <motion.span
                className="hero__title-line"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
              >
                <span className="hero__title-word">I Build</span>{" "}
                <span className="hero__title-word hero__title-word--italic">
                  interfaces
                </span>
              </motion.span>

              <motion.span
                className="hero__title-line"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.48, ease: EASE }}
              >
                <span className="hero__title-word">that scale to</span>{" "}
                <span className="hero__title-word hero__title-word--accent">
                  millions
                </span>
                <span className="hero__title-cursor" aria-hidden>
                  ▌
                </span>
              </motion.span>
            </h1>

            {/* Subline */}
            <motion.p
              className="hero__lede"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
            >
              {profile.subtitle} with{" "}
              <strong>{profile.yearsExperience}+ years</strong> shipping
              enterprise-scale collaboration tools at <em>Cisco Webex</em>,
              high-traffic e-commerce surfaces at <em>Kaufland</em>, and robust,
              end-to-end web products for global clients.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
            >
              <a className="btn btn--primary" href={`mailto:${profile.email}`}>
                <span>Get in touch</span>
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="square"
                  />
                </svg>
              </a>
            </motion.div>

            {/* Manifesto */}
            <motion.ul
              className="hero__manifesto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {profile.manifesto.map((line, i) => (
                <motion.li
                  key={line}
                  className="hero__manifesto-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.05 + i * 0.1 }}
                >
                  <span className="hero__manifesto-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{line}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          {/* end hero__content */}

          {/* RIGHT — photo */}
          <motion.div
            className="hero__photo-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/dipanshu.webp"
              alt="Dipanshu Sharma"
              className="hero__photo"
              width={600}
              height={800}
              loading="eager"
            />
          </motion.div>
        </div>
        {/* end hero__split */}
      </motion.div>

      {/* Scroll affordance */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-line" aria-hidden />
      </motion.div>

      {/* Side data column */}
      <motion.aside
        className="hero__sidebar"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
      >
        <SidebarLine label="LOCATION" value={profile.location} />
        <SidebarLine label="ROLE" value={profile.title} />
        <SidebarLine
          label="YEARS"
          value={`${profile.yearsExperience}+ shipped`}
        />
        <SidebarLine label="FOCUS" value="Scale · Friction · AI" />
        <SidebarLine label="STATUS" value="Open to opportunities" highlight />
      </motion.aside>
    </section>
  );
}

function SidebarLine({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={`hero__sidebar-row ${highlight ? 'hero__sidebar-row--highlight' : ''}`}>
      <span className="hero__sidebar-label">{label}</span>
      <span className="hero__sidebar-value">{value}</span>
    </div>
  );
}
