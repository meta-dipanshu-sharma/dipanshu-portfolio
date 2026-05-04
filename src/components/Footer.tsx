import { useDevMode } from '@/context/DevModeContext';
import { profile } from '@data/portfolio';
import './Footer.scss';

export function Footer() {
  const { enabled } = useDevMode();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__row footer__row--top">
          <div className="footer__brand">
            <span className="footer__monogram">{profile.initials}</span>
            <span className="footer__brand-name">{profile.name}</span>
          </div>
          <div className="footer__nav">
            <a href="#hero">Top</a>
            <a href="#experience">Experience</a>
            <a href="#stack">Stack</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer__row footer__row--meta">
          <div className="footer__col">
            <span className="footer__k">©</span>
            <span className="footer__v">{year} · {profile.name}</span>
          </div>
          <div className="footer__col">
            <span className="footer__k">BUILT</span>
            <span className="footer__v">React · TypeScript · Vite · Framer Motion · Lenis</span>
          </div>
          <div className="footer__col">
            <span className="footer__k">RUNTIME</span>
            <span className="footer__v">
              <span className="footer__led" aria-hidden />
              {enabled ? 'live' : 'idle'}
            </span>
          </div>
        </div>

        <div className="footer__seal" aria-hidden>
          <span>Hand-crafted in Berlin</span>
          <span>·</span>
          <span>v 2026.1</span>
          <span>·</span>
          <span>No templates were harmed</span>
        </div>
      </div>
    </footer>
  );
}
