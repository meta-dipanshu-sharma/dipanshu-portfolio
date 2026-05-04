import { motion } from 'framer-motion';
import { SectionHeader } from '@components/SectionHeader';
import { useScrollSection } from '@hooks/useScrollSection';
import { profile, education } from '@data/portfolio';
import './Contact.scss';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const ref = useScrollSection<HTMLElement>('contact');

  const channels = [
    {
      key: 'email',
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      hint: 'Best for new work',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      value: 'sharma-dipanshu',
      href: profile.linkedin,
      hint: 'Long-form context',
    },
    {
      key: 'github',
      label: 'GitHub',
      value: 'meta-dipanshu-sharma',
      href: profile.github,
      hint: 'Code in motion',
    },
    {
      key: 'phone',
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, '')}`,
      hint: 'For the urgent',
    },
  ];

  return (
    <section id="contact" ref={ref} className="contact section">
      <div className="container">
        <SectionHeader
          index="03"
          label="Contact / Sign-off"
          title="Let's build something that scales."
          description="Currently in Berlin but open to relocation anywhere in Germany, open to senior frontend & full-stack roles where the problems are hard, the team is sharp, and the work matters."
        />

        {/* Editorial CTA card */}
        <motion.div
          className="contact__lead"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="contact__lead-inner">
            <span className="contact__eyebrow">Open for</span>
            <h3 className="contact__statement">
              Senior frontend, and full stack roles —
              <em> anywhere in Germany</em>.
            </h3>
            <p className="contact__sub">
              I'm most useful where there's <strong>real scale</strong>, a need
              for
              <strong> design intuition</strong>, and an appetite for{" "}
              <strong>AI as a force multiplier</strong>. If that's the shape of
              the problem you're solving, let's talk.
            </p>
            <a className="contact__primary" href={`mailto:${profile.email}`}>
              <span>Start a conversation</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className="contact__lead-aside" aria-hidden>
            <div className="contact__signal">
              <span className="contact__led" />
              <span>Available · 01.06.2026 or 1 month Notice period</span>
            </div>
            <div className="contact__locale">
              <span className="contact__locale-row">
                <span className="contact__k">UTC</span>
                <span className="contact__v">+02:00 · CEST</span>
              </span>
              <span className="contact__locale-row">
                <span className="contact__k">CITY</span>
                <span className="contact__v">Berlin, DE</span>
              </span>
              <span className="contact__locale-row">
                <span className="contact__k">REPLY</span>
                <span className="contact__v">&lt; 24h, weekdays</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Channels grid */}
        <div className="contact__channels">
          {channels.map((c, i) => (
            <motion.a
              key={c.key}
              href={c.href}
              target={
                c.key === "linkedin" || c.key === "github"
                  ? "_blank"
                  : undefined
              }
              rel={
                c.key === "linkedin" || c.key === "github"
                  ? "noopener noreferrer"
                  : undefined
              }
              className="contact__channel"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              whileHover={{ y: -2 }}
            >
              <span className="contact__channel-label">{c.label}</span>
              <span className="contact__channel-value">{c.value}</span>
              <span className="contact__channel-hint">{c.hint}</span>
              <span className="contact__channel-arrow" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M4 10L10 4M10 4H5M10 4V9"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>

        {/* Resume download */}
        <motion.div
          className="contact__resume"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="contact__resume-left">
            <div className="contact__resume-icon" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 2h8l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 2v4h4M7 9h6M7 12h6M7 15h4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="contact__resume-meta">
              <span className="contact__resume-title">Resume</span>
              <span className="contact__resume-sub">
                Dipanshu Sharma · Full Stack Engineer · 2026
              </span>
            </div>
          </div>
          <a
            className="contact__resume-btn"
            href="/dipanshu-sharma-resume.pdf"
            download="Dipanshu_Sharma_Resume.pdf"
            aria-label="Download Dipanshu Sharma's resume as PDF"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              aria-hidden
            >
              <path
                d="M7.5 2v8M4 7l3.5 3.5L11 7M2.5 13h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Download PDF</span>
          </a>
        </motion.div>

        {/* Education + footer block */}
        <div className="contact__appendix">
          <motion.div
            className="contact__education"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="contact__appendix-head">
              <span className="contact__appendix-num">07</span>
              <span className="contact__appendix-label">
                Education / Foundation
              </span>
            </div>
            <ul className="contact__edu-list">
              {education.map((e) => (
                <li key={e.school} className="contact__edu-item">
                  <div className="contact__edu-row">
                    <span className="contact__edu-school">{e.school}</span>
                    <span className="contact__edu-period">{e.period}</span>
                  </div>
                  <div className="contact__edu-meta">
                    <span>{e.degree}</span>
                    <span className="contact__edu-dot" aria-hidden>
                      ·
                    </span>
                    <span>{e.grade}</span>
                    <span className="contact__edu-dot" aria-hidden>
                      ·
                    </span>
                    <span>{e.location}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
