import { useEffect, useRef, useState } from 'react';
import { useLang, useTheme } from '../context.jsx';
import { LANGUAGES } from '../translations.js';

const SECTIONS = ['about', 'values', 'skills', 'projects'];

function LangMenu() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="lang-menu" ref={ref}>
      <button
        className="pill-btn lang-toggle"
        aria-label={t('ui.language')}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {current.short}
        <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && (
        <ul className="lang-list" role="listbox" aria-label={t('ui.language')}>
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                role="option"
                aria-selected={l.code === lang}
                className={l.code === lang ? 'active' : ''}
                lang={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
              >
                <span className="lang-short">{l.short}</span>
                {l.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  const toggleTheme = useTheme();
  const [open, setOpen] = useState(false);
  const [first, last] = t('nav.initials');
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <nav className="nav container">
        <a href="#" className="logo" onClick={close} aria-label={t('hero.name')}>
          <span className="logo-mark" aria-hidden="true" />
          {first}{last}
        </a>
        <ul className={`nav-links${open ? ' open' : ''}`}>
          {SECTIONS.map((id) => (
            <li key={id}><a href={`#${id}`} onClick={close}>{t(`nav.${id}`)}</a></li>
          ))}
          <li><a href="#/blog" onClick={close}>{t('nav.blog')}</a></li>
          <li><a href="#contact" onClick={close}>{t('nav.contact')}</a></li>
        </ul>
        <div className="nav-controls">
          <LangMenu />
          <button className="pill-btn theme-toggle" aria-label={t('ui.toggleTheme')} onClick={toggleTheme}>
            <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
            <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" /></svg>
          </button>
          <button
            className="pill-btn nav-toggle"
            aria-label={t('ui.openMenu')}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span />
          </button>
        </div>
      </nav>
    </header>
  );
}
