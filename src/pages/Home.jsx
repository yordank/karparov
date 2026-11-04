import { useLang } from '../context.jsx';
import PostList from '../components/PostList.jsx';

const ext = { target: '_blank', rel: 'noopener' };

function SectionHead({ children }) {
  return (
    <div className="section-head">
      <h2>{children}</h2>
    </div>
  );
}

// Decorative chessboard beside the hero: 8x8 squares, a few lit in the accent colour.
const LIT = new Set([5, 14, 19, 28, 34, 41, 50, 59]);
function HeroBoard() {
  return (
    <div className="hero-board" aria-hidden="true">
      {Array.from({ length: 64 }, (_, i) => {
        const dark = (Math.floor(i / 8) + i) % 2 === 1;
        return <span key={i} className={`${dark ? 'sq-dark' : 'sq-light'}${LIT.has(i) ? ' sq-lit' : ''}`} />;
      })}
    </div>
  );
}

const VALUE_ICONS = {
  bitcoin: <div className="value-icon value-icon-btc">₿</div>,
  animalRights: (
    <div className="value-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="16.5" rx="5" ry="4" /><circle cx="5" cy="9" r="2" /><circle cx="10" cy="5" r="2" /><circle cx="15" cy="5" r="2" /><circle cx="19" cy="9" r="2" /></svg>
    </div>
  ),
  independent: (
    <div className="value-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18M12 3l-7 4M12 3l7 4M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0zM8 21h8" /></svg>
    </div>
  ),
  marathon: (
    <div className="value-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3v18M6 4h11l-2 3 2 3H6" /></svg>
    </div>
  ),
};

const SKILLS = ['frontend', 'backend', 'tools', 'design'];

// Projects. `key` points to the description in translations (projects.<key>.desc).
const PROJECTS = [
  {
    key: 'copyTrading',
    name: 'Copy Trading Example',
    tags: ['JavaScript'],
    links: [{ href: 'https://github.com/yordank/copy-trading-example', label: 'projects.viewOnGithub' }],
  },
  {
    key: 'aiAssistant',
    name: 'AI Assistant',
    tags: ['JavaScript', 'AI'],
    links: [{ href: 'https://github.com/yordank/AI-Assistant', label: 'projects.viewOnGithub' }],
  },
  {
    key: 'btcNotar',
    name: 'BTCNotar',
    tags: ['Node.js', 'Bitcoin', 'Open source', 'MIT'],
    links: [
      { href: 'https://github.com/yordank/BTCNotar', label: 'projects.viewOnGithub' },
      { href: 'https://www.npmjs.com/package/btcnotar', text: 'npm' },
    ],
  },
];

export default function Home() {
  const { t } = useLang();
  const fact = (k) => (
    <li key={k}>
      <strong>{t(`about.facts.${k}.label`)}</strong>
      <span>{t(`about.facts.${k}.value`)}</span>
    </li>
  );

  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h1>{t('hero.name')}</h1>
          <p className="hero-role">{t('hero.role')}</p>
          <p className="hero-text">{t('hero.text')}</p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">{t('hero.viewProjects')}</a>
            <a href="#contact" className="btn btn-ghost">{t('hero.getInTouch')}</a>
          </div>
        </div>
        <HeroBoard />
      </section>

      <section id="about" className="about container">
        <SectionHead>{t('about.heading')}</SectionHead>
        <figure className="about-photo">
          <div className="about-photo-grid">
            <img src="assets/jordan-einstein.jpg" alt="Jordan sitting on a bench next to a bronze statue of Albert Einstein" loading="lazy" width="720" height="960" className="photo-einstein" />
            <img src="assets/jordan-chess.jpg" alt="Jordan sitting behind a wooden chess set" loading="lazy" width="640" height="640" />
          </div>
          <figcaption>{t('about.photoCaption')}</figcaption>
        </figure>
        <div className="about-grid">
          <p className="about-text">{t('about.text')}</p>
          <ul className="about-facts">
            {['basedIn', 'politics', 'advocates', 'runs'].map(fact)}
            <li>
              <strong>{t('about.facts.chess.label')}</strong>
              <span>
                {t('about.facts.chess.value')} · <a href="https://ratings.fide.com/profile/2949768" {...ext}>{t('about.facts.chess.fide')}</a>
                {' · '}<a href="https://lichess.org/@/crazyjohny" {...ext}>Lichess</a>
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section id="values" className="values container">
        <SectionHead>{t('values.heading')}</SectionHead>
        <div className="values-grid">
          {Object.keys(VALUE_ICONS).map((k) => (
            <div className="value-card" key={k}>
              {VALUE_ICONS[k]}
              <h3>{t(`values.${k}.title`)}</h3>
              <p>{t(`values.${k}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="skills container">
        <SectionHead>{t('skills.heading')}</SectionHead>
        <div className="skills-grid">
          {SKILLS.map((k) => (
            <div className="skill-card" key={k}>
              <h3>{t(`skills.${k}.title`)}</h3>
              <p>{t(`skills.${k}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="projects container">
        <SectionHead>{t('projects.heading')}</SectionHead>
        <div className="projects-grid">
          <article className="project-card project-featured">
            <span className="project-badge">{t('projects.latest')}</span>
            <h3>Tofi Quant</h3>
            <p>{t('projects.tofiQuant.desc')}</p>
            <div className="project-tags"><span>Quant trading</span><span>Perpetuals</span><span>On-chain</span></div>
            <div className="project-links">
              <a href="https://yordank.github.io/Tofi-Quant-site/" className="project-link" {...ext}>{t('projects.visitWebsite')}</a>
              <a href="https://instagram.com/tofi.quant" className="project-link" {...ext}>Instagram</a>
            </div>
          </article>
          {PROJECTS.map((p) => (
            <article className="project-card" key={p.key}>
              <h3>{p.name}</h3>
              <p>{t(`projects.${p.key}.desc`)}</p>
              <div className="project-tags">{p.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="project-links">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} className="project-link" {...ext}>{l.text || t(l.label)}</a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="blog" className="blog container">
        <SectionHead>{t('blog.heading')}</SectionHead>
        <p className="blog-lead">{t('blog.lead')}</p>
        <PostList limit={3} />
        <a href="#/blog" className="project-link blog-all">{t('blog.all')}</a>
      </section>

      <section id="contact" className="contact container">
        <SectionHead>{t('contact.heading')}</SectionHead>
        <div className="contact-content">
          <p className="contact-lead">{t('contact.lead')}</p>
          <div className="social-links">
            <a href="https://github.com/yordank" {...ext} aria-label="GitHub">GitHub</a>
            <a href="https://x.com/yordankarparov" {...ext} aria-label="X (Twitter)">X</a>
            <a href="https://instagram.com/jordankarparov" {...ext} aria-label="Instagram">Instagram</a>
            <a href="https://lichess.org/@/crazyjohny" {...ext} aria-label="Lichess">Lichess</a>
          </div>
        </div>
      </section>
    </>
  );
}
