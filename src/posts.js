// Blog posts: metadata from posts/posts.json, text from posts/<slug>.md.
// Both are bundled at build time, so a new post just needs those two edits.
import list from '../posts/posts.json';
import { LANGUAGES } from './translations.js';

const bodies = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });

export const posts = list
  .filter((p) => !p.draft)
  .map((p) => ({ ...p, body: bodies[`../posts/${p.slug}.md`] ?? '' }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const findPost = (slug) => posts.find((p) => p.slug === slug);

// title/summary may be a string or { bg, en }
export const pick = (value, lang) =>
  value && typeof value === 'object' ? value[lang] || value.bg || value.en || '' : value || '';

export function formatDate(iso, lang) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  const locale = (LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]).locale;
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
}
