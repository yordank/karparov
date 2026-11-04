// Blog: reads posts/posts.json and renders the post list or a single post.
// Used by index.html (latest posts), blog.html (all posts) and post.html (one post).
(function () {
  const root = document.documentElement;
  const UI = {
    en: { readMore: 'Read →', back: '← All posts', notFound: 'Post not found.', empty: 'No posts yet.', error: 'Could not load posts.', blogTitle: 'Blog', written: { bg: 'This post is written in Bulgarian.', en: 'This post is written in English.' } },
    bg: { readMore: 'Прочети →', back: '← Всички статии', notFound: 'Статията не е намерена.', empty: 'Все още няма статии.', error: 'Статиите не можаха да се заредят.', blogTitle: 'Блог', written: { bg: 'Статията е на български.', en: 'Статията е на английски.' } },
  };

  const lang = () => (root.lang === 'bg' ? 'bg' : 'en');
  const t = (key) => UI[lang()][key];
  const pick = (v) => (v && typeof v === 'object' ? v[lang()] || v.bg || v.en || '' : v || '');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function formatDate(iso) {
    const d = new Date(iso + 'T12:00:00');
    if (isNaN(d)) return iso;
    return d.toLocaleDateString(lang() === 'bg' ? 'bg-BG' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  let postsPromise;
  function loadPosts() {
    if (!postsPromise) {
      postsPromise = fetch('posts/posts.json', { cache: 'no-cache' })
        .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then((list) => list.filter((p) => !p.draft).sort((a, b) => b.date.localeCompare(a.date)));
    }
    return postsPromise;
  }

  function postItem(p) {
    return `
      <article class="post-item">
        <time class="post-date" datetime="${esc(p.date)}">${esc(formatDate(p.date))}</time>
        <h3><a href="post.html?p=${encodeURIComponent(p.slug)}">${esc(pick(p.title))}</a></h3>
        ${p.summary ? `<p>${esc(pick(p.summary))}</p>` : ''}
        <a class="project-link" href="post.html?p=${encodeURIComponent(p.slug)}">${t('readMore')}</a>
      </article>`;
  }

  async function renderList(el) {
    const limit = parseInt(el.dataset.limit, 10) || 0;
    try {
      let posts = await loadPosts();
      if (!posts.length) { el.innerHTML = `<p class="post-empty">${t('empty')}</p>`; return; }
      if (limit) posts = posts.slice(0, limit);
      el.innerHTML = posts.map(postItem).join('');
    } catch (e) {
      el.innerHTML = `<p class="post-empty">${t('error')}</p>`;
    }
  }

  const mdCache = {};
  async function renderPost(el) {
    const slug = new URLSearchParams(location.search).get('p');
    try {
      const posts = await loadPosts();
      const post = posts.find((p) => p.slug === slug);
      if (!post) { el.innerHTML = `<p class="post-empty">${t('notFound')}</p>`; return; }
      if (!(slug in mdCache)) {
        const r = await fetch(`posts/${encodeURIComponent(slug)}.md`, { cache: 'no-cache' });
        if (!r.ok) throw new Error(r.status);
        mdCache[slug] = await r.text();
      }
      const body = window.marked ? window.marked.parse(mdCache[slug]) : `<pre>${esc(mdCache[slug])}</pre>`;
      const otherLang = post.lang && post.lang !== lang();
      el.innerHTML = `
        <header class="post-header">
          <time class="post-date" datetime="${esc(post.date)}">${esc(formatDate(post.date))}</time>
          <h1>${esc(pick(post.title))}</h1>
          ${otherLang ? `<p class="post-note">${t('written')[post.lang] || ''}</p>` : ''}
        </header>
        <div class="post-body" lang="${esc(post.lang || '')}">${body}</div>`;
      document.title = `${pick(post.title)} — Jordan Karparov`;
    } catch (e) {
      el.innerHTML = `<p class="post-empty">${t('error')}</p>`;
    }
  }

  function renderAll() {
    document.querySelectorAll('[data-blog-list]').forEach(renderList);
    document.querySelectorAll('[data-blog-post]').forEach(renderPost);
    if (document.body.dataset.page === 'blog') document.title = `${t('blogTitle')} — Jordan Karparov`;
    document.querySelectorAll('[data-blog-back]').forEach((a) => { a.textContent = t('back'); });
  }

  renderAll();
  document.addEventListener('langchange', renderAll);
})();
