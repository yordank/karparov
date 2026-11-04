import { useLang } from '../context.jsx';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer container">
      <p>© {new Date().getFullYear()} {t('footer.name')}. {t('footer.rights')}</p>
      <a href="#" className="back-to-top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        {t('footer.backToTop')}
      </a>
    </footer>
  );
}
