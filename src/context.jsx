import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { translations, LANGUAGES } from './translations.js';

// ---------- Language ----------
const LangContext = createContext(null);

const CODES = LANGUAGES.map((l) => l.code);

function readLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (CODES.includes(saved)) return saved;
  } catch (e) {}
  // First visit: use the browser language if we have it.
  const nav = (navigator.language || 'en').slice(0, 2);
  return CODES.includes(nav) ? nav : 'en';
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(readLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }, [lang]);


  // t('about.facts.basedIn.label') -> string (falls back to English)
  const t = useCallback(
    (key) => {
      const get = (dict) => key.split('.').reduce((o, p) => (o == null ? undefined : o[p]), dict);
      const v = get(translations[lang]);
      return v === undefined ? get(translations.en) : v;
    },
    [lang]
  );

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

// ---------- Theme ----------
export function useTheme() {
  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const attr = root.getAttribute('data-theme');
    const isDark = attr === 'dark' || (!attr && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  }, []);
  return toggleTheme;
}

// ---------- Routing (hash based, works on GitHub Pages) ----------
//   #/blog        -> blog list
//   #/blog/<slug> -> one post
//   anything else -> home (#about etc. scroll to that section)
function parseHash() {
  const h = window.location.hash || '';
  if (h.startsWith('#/blog/')) return { page: 'post', slug: decodeURIComponent(h.slice(7)) };
  if (h.startsWith('#/blog')) return { page: 'blog' };
  return { page: 'home', section: h.length > 1 ? h.slice(1) : null };
}

export function useRoute() {
  const [route, setRoute] = useState(parseHash);
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}
