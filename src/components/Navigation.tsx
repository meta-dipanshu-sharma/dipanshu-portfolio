import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import './Navigation.scss';

const links = [
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export function Navigation() {
  const { enabled, toggle, activeSection } = useDevMode();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav__inner">
        <button className="nav__brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="nav__brand-mark">DS</span>
          <span className="nav__brand-meta">
            <span className="nav__brand-name">Dipanshu Sharma</span>
            <span className="nav__brand-role">FullStack Engineer · Berlin</span>
          </span>
        </button>

        <ul className="nav__links">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNav(link.id)}
                className={`nav__link ${activeSection === link.id ? 'nav__link--active' : ''}`}
              >
                <span className="nav__link-dot" aria-hidden />
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className={`nav__dev-toggle ${enabled ? 'nav__dev-toggle--on' : ''}`}
          onClick={toggle}
          aria-pressed={enabled}
          aria-label="Toggle developer console"
        >
          <span className="nav__dev-led" aria-hidden />
          <span className="nav__dev-label">Dev Mode</span>
          <kbd className="nav__dev-kbd">⌘.</kbd>
        </button>
      </div>
    </motion.nav>
  );
}
