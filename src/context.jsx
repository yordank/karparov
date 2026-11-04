import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { translations } from './translations.js';

// ---------- Language ----------
const LangContext = createContext(null);

function readLang() {
  try {
    return localStorage.getItem('lang') === 'bg' ? 'bg' : 'en';
  } catch (e) {
    return 'en';
  }
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(readLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }, [lang]);

  const toggleLang = useCallback(() => setLang((l) => (l === 'en' ? 'bg' : 'en')), []);

  // t('about.facts.basedIn.label') -> string (falls back to English)
  const t = useCallback(
    (key) => {
      const get = (dict) => key.split('.').reduce((o, p) => (o == null ? undefined : o[p]), dict);
      const v = get(translations[lang]);
      return v === undefined ? get(translations.en) : v;
    },
    [lang]
  );

  return <LangContext.Provider value={{ lang, t, toggleLang }}>{children}</LangContext.Provider>;
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
