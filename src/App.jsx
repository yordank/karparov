import { useEffect } from 'react';
import { LangProvider, useLang, useRoute } from './context.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import BlogPage from './pages/BlogPage.jsx';
import PostPage from './pages/PostPage.jsx';

function Site() {
  const route = useRoute();
  const { t } = useLang();

  // Scroll: to the section on home (#about), otherwise to the top.
  useEffect(() => {
    if (route.page === 'home' && route.section) {
      const el = document.getElementById(route.section);
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [route.page, route.slug, route.section]);

  // Page title for home and blog list (posts set their own).
  useEffect(() => {
    if (route.page === 'home') document.title = t('hero.name');
    if (route.page === 'blog') document.title = `${t('blog.heading')} — ${t('hero.name')}`;
  }, [route.page, t]);

  return (
    <>
      <div className="noise-overlay" />
      <Header route={route} />
      <main id="top">
        {route.page === 'blog' && <BlogPage />}
        {route.page === 'post' && <PostPage slug={route.slug} />}
        {route.page === 'home' && <Home />}
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  );
}
