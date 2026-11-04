import { useState } from 'react';
import { useLang, useTheme } from '../context.jsx';

const SECTIONS = ['about', 'values', 'skills', 'projects'];

export default function Header() {
  const { lang, t, toggleLang } = useLang();
  const toggleTheme = useTheme();
  const [open, setOpen] = useState(false);
  const [first, last] = t('nav.initials');
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <nav className="nav container">
        <a href="#" className="logo" onClick={close}>
          {first}<span>.</span>{last}
        </a>
        <button
          className="nav-toggle"
          aria-label={t('ui.openMenu')}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
        <ul className={`nav-links${open ? ' open' : ''}`}>
          {SECTIONS.map((id) => (
            <li key={id}><a href={`#${id}`} onClick={close}>{t(`nav.${id}`)}</a></li>
          ))}
          <li><a href="#/blog" onClick={close}>{t('nav.blog')}</a></li>
          <li><a href="#contact" onClick={close}>{t('nav.contact')}</a></li>
        </ul>
        <div className="nav-controls">
          <button className="lang-toggle" aria-label={t('ui.switchLang')} onClick={toggleLang}>
            {lang === 'en' ? 'BG' : 'EN'}
          </button>
          <button className="theme-toggle" aria-label={t('ui.toggleTheme')} onClick={toggleTheme}>
            <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
            <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" /></svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
