import { useLang } from '../context.jsx';
import { posts, pick, formatDate } from '../posts.js';

export default function PostList({ limit }) {
  const { lang, t } = useLang();
  const shown = limit ? posts.slice(0, limit) : posts;

  if (!shown.length) return <p className="post-empty">{t('blog.empty')}</p>;

  return (
    <div className="post-list">
      {shown.map((p) => {
        const href = `#/blog/${encodeURIComponent(p.slug)}`;
        return (
          <article className="post-item" key={p.slug}>
            <time className="post-date" dateTime={p.date}>{formatDate(p.date, lang)}</time>
            <h3><a href={href}>{pick(p.title, lang)}</a></h3>
            {p.summary && <p>{pick(p.summary, lang)}</p>}
            <a className="project-link" href={href}>{t('blog.readMore')}</a>
          </article>
        );
      })}
    </div>
  );
}
