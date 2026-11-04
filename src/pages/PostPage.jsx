import { useEffect, useMemo } from 'react';
import { marked } from 'marked';
import { useLang } from '../context.jsx';
import { findPost, pick, formatDate } from '../posts.js';

export default function PostPage({ slug }) {
  const { lang, t } = useLang();
  const post = findPost(slug);
  const html = useMemo(() => (post ? marked.parse(post.body) : ''), [post]);

  useEffect(() => {
    if (post) document.title = `${pick(post.title, lang)} — ${t('hero.name')}`;
  }, [post, lang, t]);

  return (
    <section className="post-page container">
      <a href="#/blog" className="post-back">{t('blog.back')}</a>
      {!post ? (
        <p className="post-empty">{t('blog.notFound')}</p>
      ) : (
        <article className="post">
          <header className="post-header">
            <time className="post-date" dateTime={post.date}>{formatDate(post.date, lang)}</time>
            <h1>{pick(post.title, lang)}</h1>
            {post.lang && post.lang !== lang && <p className="post-note">{t('blog.written')[post.lang]}</p>}
          </header>
          {/* Post text is our own Markdown from posts/*.md */}
          <div className="post-body" lang={post.lang} dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      )}
    </section>
  );
}
