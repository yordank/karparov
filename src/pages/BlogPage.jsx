import { useLang } from '../context.jsx';
import PostList from '../components/PostList.jsx';

export default function BlogPage() {
  const { t } = useLang();
  return (
    <section className="blog-page container">
      <div className="section-head">
        <h1>{t('blog.heading')}</h1>
      </div>
      <p className="blog-lead">{t('blog.lead')}</p>
      <PostList />
    </section>
  );
}
