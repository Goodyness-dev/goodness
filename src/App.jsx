import { useEffect, useRef, useState } from 'react';
import { projectsData } from './data/projectsData';
import ContactSection from './components/ContactSection';

const screenshots = {
  'top-canada-plumbing': '/previews/preview-top-canada.jpg',
  'captain-pauls': '/previews/preview-captain-pauls.jpg',
  'steakhouse-verandah': '/previews/preview-steakhouse.jpg',
  'bluebird-jewelry': '/previews/preview-bluebird.jpg',
};
const notes = {
  'top-canada-plumbing': 'A quicker route from a plumbing problem to an enquiry.',
  'captain-pauls': 'Bring the order straight to the restaurant.',
};
const work = projectsData.filter(p => p.category === 'client').map(p => ({ ...p, preview: screenshots[p.id], unavailable: p.id === 'tobys-auto' })).sort((a,b) => Number(!!b.preview) - Number(!!a.preview));
const featured = work.filter(p => p.preview);
const number = i => String(i + 1).padStart(2, '0');
const Arrow = () => <span aria-hidden="true">↗</span>;
function Logo() {
  return <><svg viewBox="0 0 40 40" aria-hidden="true"><path fill="currentColor" d="M5 35V5h21l9 9v9L23 35H13V15h10v9h-5v5h3l8-8v-5l-5-5H11v24Z"/></svg><span>pilogram<span className="brand-period">.</span></span></>;
}
function ProjectDetails({ project, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    dialog.current.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = before; };
  }, []);
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="dialog-top"><span className="micro">PROJECT NOTES / PILOGRAM</span><button onClick={onClose} aria-label="Close project details">Close ×</button></div>
    <div className="dialog-image" tabIndex={0} aria-label="Scrollable project preview"><img src={project.preview || project.image} alt={`${project.title} ${project.preview ? 'website screenshot' : 'project imagery'}`}/></div>
    <div className="dialog-copy"><h2 id="project-title">{project.title}</h2><p>{project.description}</p><ul>{project.highlights?.map(item => <li key={item}>{item}</li>)}</ul><div className="actions">{project.unavailable ? <p className="micro">Archived project · Live site unavailable</p> : <a className="button" href={project.liveUrl} target="_blank" rel="noreferrer">Open the website <Arrow /></a>}<a className="underlink" href="#contact" onClick={onClose}>Discuss a similar project <Arrow /></a></div></div>
  </dialog>;
}
const services = [
  { name: 'Get found.', type: 'BUSINESS WEBSITES & REDESIGNS', title: 'Be there when someone looks.', copy: 'A recommendation only goes so far if the next search turns up nothing. We give your business a proper home online: what you do, why someone should choose you, and how to take the next step.', includes: ['Clear service pages', 'Mobile-first design', 'Search-friendly structure'] },
  { name: 'Get the enquiry.', type: 'LANDING PAGES & ENQUIRY FLOWS', title: 'Let the page do the explaining.', copy: 'Repeating prices, answering the same questions, and chasing details in DMs eats into your day. A focused landing page answers the basics and collects the information you need before the conversation starts.', includes: ['Offer-led landing pages', 'Enquiry & booking forms', 'Direct ordering flows'] },
  { name: 'Keep control.', type: 'WEBSITE + ADMIN DASHBOARD', title: 'No more “where was that message?”', copy: 'A missed follow-up can be a missed sale. We can connect your website to a dashboard where you see customer enquiries, update their status, and manage bookings. One place to see what needs your attention.', includes: ['Customer & enquiry records', 'Status tracking', 'Booking management'] },
];
export default function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('pilogram-theme', theme); } catch { /* Storage may be disabled. */ }
  }, [theme]);
  const [selected, setSelected] = useState(null);
  const [desk, setDesk] = useState(3);
  const [service, setService] = useState(0);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(4);
  const [menu, setMenu] = useState(false);
  const seen = useRef(new WeakSet());
  const project = featured[desk] || featured[0];
  const visible = work.filter(p => `${p.title} ${p.description}`.toLowerCase().includes(search.toLowerCase()));
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    const animations = new Set();
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!seen.current.has(entry.target)) {
        seen.current.add(entry.target);
        const animation = entry.target.animate([{ opacity: .2, transform: 'translateY(28px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 700, easing: 'cubic-bezier(.2,.65,.2,1)' });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
      observer.unobserve(entry.target);
    }), { threshold: .12 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    const stop = () => { if (reduced.matches) { observer.disconnect(); animations.forEach(a => a.cancel()); } };
    reduced.addEventListener('change', stop);
    return () => { observer.disconnect(); animations.forEach(a => a.cancel()); reduced.removeEventListener('change', stop); };
  }, [search, limit]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a className="wordmark" href="#top" aria-label="Pilogram home"><Logo /></a><span className="header-note">Websites. Landing pages.<br/>The systems behind them.</span><button className="theme-toggle" aria-label="Black theme" aria-pressed={theme === 'dark'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><span className="theme-swatch" aria-hidden="true"/><span>{theme === 'dark' ? 'Light' : 'Black'}</span></button><button className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? 'Close −' : 'Menu +'}</button><nav id="navigation" className={menu ? 'open' : ''} aria-label="Main navigation">{[['projects','Work'],['services','What we do']].map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}<a className="nav-contact" href="#contact" onClick={() => setMenu(false)}>Let’s talk <Arrow /></a></nav></header>
    <main id="main">
      <section className="studio-hero" id="top"><div className="hero-story"><div className="hero-kicker micro"><span>INDEPENDENT WEB STUDIO</span><span>BASED ONLINE. BUILT FOR BUSINESS.</span></div><h1>Built to<br/>bring you<br/><span>business.</span></h1><div className="hero-intro"><span className="intro-arrow" aria-hidden="true">↳</span><div><p>Good at what you do.<br/>Hard to find online?</p><p>We build websites that get your business out there — and systems that keep the enquiries from getting lost in your DMs.</p><a className="underlink" href="#contact">Let’s put that right <Arrow /></a></div></div></div><div className="desk"><div className="desk-top micro"><span>ON THE DESK / SELECTED WORK</span><span>{number(desk)}—{String(featured.length).padStart(2, '0')}</span></div><button className="desk-image" onClick={() => setSelected(project)} aria-label={`Explore ${project.title}`}><img key={project.id} src={project.preview} alt={`${project.title} website screenshot`}/><span className="desk-open" aria-hidden="true">↗</span></button><div className="desk-caption"><span className="micro">DESIGNED & DEVELOPED BY PILOGRAM</span><h2>{project.title}</h2><button className="underlink" onClick={() => setSelected(project)}>Take a closer look <Arrow /></button></div><div className="desk-switcher" aria-label="Choose a featured website">{featured.map((p,i) => <button key={p.id} aria-pressed={desk===i} aria-label={`Preview ${p.title}`} onClick={() => setDesk(i)}><span>{number(i)}</span><span className="switch-line"/></button>)}</div></div></section>
      <div className="studio-strip"><span>LESS CHASING CUSTOMERS.</span><span className="strip-symbol" aria-hidden="true">↗</span><span>MORE RUNNING YOUR BUSINESS.</span><a href="#projects">SCROLL TO THE WORK ↓</a></div>
      <section id="projects" className="portfolio section-pad"><div className="portfolio-heading" data-reveal><div><span className="micro">01 / THE PORTFOLIO</span><h2>Proof.<br/><span>Not promises.</span></h2></div><div className="work-intro"><p>Restaurants. Local services. Independent brands. Different businesses, each with a website built around what their customers need.</p><label className="search-label"><span className="micro">FIND A PROJECT</span><input aria-label="Search client websites" value={search} onChange={e => { setSearch(e.target.value); setLimit(4); }} placeholder="Business name or keyword"/><span aria-hidden="true">⌕</span></label></div></div><div className="project-list">{visible.slice(0,limit).map((p,i) => <article className="project-row" key={p.id} data-reveal><div className="project-notes"><div className="project-index"><span>{number(i)}</span><span className="micro">WEB DESIGN<br/>DEVELOPMENT</span></div><h3>{p.title}</h3><p>{notes[p.id] || p.tagline}</p><div className="project-links"><button className="underlink" onClick={() => setSelected(p)}>Project notes <Arrow /></button>{p.unavailable ? <span className="micro">ARCHIVED / SITE OFFLINE</span> : <a href={p.liveUrl} className="underlink" target="_blank" rel="noreferrer" aria-label={`Visit ${p.title}`}>Visit website <Arrow /></a>}</div></div><button className="project-canvas" onClick={() => setSelected(p)} aria-label={`Explore ${p.title}`}><span className="canvas-label micro">{p.preview ? 'WEBSITE / DESKTOP VIEW' : 'FROM THE PROJECT ARCHIVE'}</span><img src={p.preview || p.image} alt={`${p.title} ${p.preview ? 'website screenshot' : 'project imagery'}`} loading="lazy"/><span className="canvas-bottom micro"><span>{p.preview ? new URL(p.liveUrl).hostname : p.title}</span><span>OPEN PROJECT ↗</span></span></button></article>)}</div>{!visible.length && <p className="empty-state">No matching projects. Try a different business name.</p>}<div className="portfolio-end"><span className="micro">{Math.min(limit,visible.length)} OF {visible.length} CLIENT PROJECTS</span>{limit<visible.length && <button className="underlink" onClick={() => setLimit(limit+4)}>Keep exploring <span aria-hidden="true">+</span></button>}</div></section>
      <section id="services" className="services section-pad"><div className="services-heading" data-reveal><span className="micro">02 / WHAT WE CAN DO FOR YOU</span><h2>The website is<br/>only the beginning.</h2></div><div className="service-layout"><div className="service-menu" aria-label="Explore services">{services.map((s,i) => <button key={s.name} aria-pressed={service===i} onClick={() => setService(i)}><span className="micro">{number(i)}</span><span>{s.name}</span><span aria-hidden="true">↗</span></button>)}</div><div className="service-story" key={service} aria-live="polite"><p className="micro">{services[service].type}</p><h3>{services[service].title}</h3><p>{services[service].copy}</p><ul>{services[service].includes.map(item=><li key={item}><span aria-hidden="true">↳</span>{item}</li>)}</ul><a className="underlink" href="#contact">Talk it through with us <Arrow /></a></div></div></section>
      <section className="studio-note section-pad" data-reveal><span className="micro">A NOTE FROM PILOGRAM</span><div><h2>You shouldn’t need<br/>another full-time job<br/>to run your website.</h2><p>We keep it practical. Clear pages for your customers. Useful controls for you. A place to see the enquiries, pick up a conversation, and get back to the work you’re actually here to do.</p></div></section>
      <ContactSection />
    </main><footer className="site-footer"><div><span className="micro">GOOD BUSINESS DESERVES A GOOD WEBSITE.</span><a className="footer-wordmark" href="#top" aria-label="Pilogram home">pilogram<span>↗</span></a></div><div className="footer-bottom micro"><span>© {new Date().getFullYear()} PILOGRAM</span><span>WEB DESIGN & DEVELOPMENT</span><a href="#top">BACK TO TOP ↑</a></div></footer>
    {selected && <ProjectDetails project={selected} onClose={() => setSelected(null)}/>}
  </>;
}

