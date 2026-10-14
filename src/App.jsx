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
const number = i => String(i + 1).padStart(2, '0');
const Arrow = () => <span aria-hidden="true">↗</span>;
function Logo() {
  return <><svg viewBox="0 0 40 40" aria-hidden="true"><path fill="currentColor" d="M34 10 29 15A12 12 0 1 0 30 26H21V19H38V24A19 19 0 1 1 34 10Z"/></svg><span>goodness<span className="brand-period">.</span></span></>;
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
    <div className="dialog-top"><span className="micro">PROJECT NOTES / GOODNESS</span><button onClick={onClose} aria-label="Close project details">Close ×</button></div>
    <div className="dialog-image" tabIndex={0} aria-label="Scrollable project preview"><img src={project.preview || project.image} alt={`${project.title} ${project.preview ? 'website screenshot' : 'project imagery'}`}/></div>
    <div className="dialog-copy"><h2 id="project-title">{project.title}</h2><p>{project.description}</p><ul>{project.highlights?.map(item => <li key={item}>{item}</li>)}</ul><div className="actions">{project.unavailable ? <p className="micro">Archived project · Live site unavailable</p> : <a className="button" href={project.liveUrl} target="_blank" rel="noreferrer">Open the website <Arrow /></a>}<a className="underlink" href="#contact" onClick={onClose}>Discuss a similar project <Arrow /></a></div></div>
  </dialog>;
}
const services = [
  { name: 'Get found.', type: 'BUSINESS WEBSITES & REDESIGNS', title: 'Be there when someone looks.', copy: 'A recommendation only goes so far if the next search turns up nothing. I give your business a proper home online: what you do, why someone should choose you, and how to take the next step.', includes: ['Clear service pages', 'Mobile-first design', 'Search-friendly structure'] },
  { name: 'Get the enquiry.', type: 'LANDING PAGES & ENQUIRY FLOWS', title: 'Let the page do the explaining.', copy: 'Repeating prices, answering the same questions, and chasing details in DMs eats into your day. A focused landing page answers the basics and collects the information you need before the conversation starts.', includes: ['Offer-led landing pages', 'Enquiry & booking forms', 'Direct ordering flows'] },
  { name: 'Keep control.', type: 'WEBSITE + ADMIN DASHBOARD', title: 'No more “where was that message?”', copy: 'A missed follow-up can be a missed sale. I can connect your website to a dashboard where you see customer enquiries, update their status, and manage bookings. One place to see what needs your attention.', includes: ['Customer & enquiry records', 'Status tracking', 'Booking management'] },
];
export default function App() {
  const [footerPaused, setFooterPaused] = useState(false);
  useEffect(() => { document.documentElement.dataset.theme = 'dark'; }, []);
  const [selected, setSelected] = useState(null);
  const [service, setService] = useState(0);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(4);
  const [menu, setMenu] = useState(false);
  const seen = useRef(new WeakSet());
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
    <header className="site-header"><a className="wordmark" href="#top" aria-label="Goodness home"><Logo /></a><span className="header-note">Websites. Landing pages.<br/>The systems behind them.</span><button className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? 'Close −' : 'Menu +'}</button><nav id="navigation" className={menu ? 'open' : ''} aria-label="Main navigation">{[['projects','Work'],['about','About me'],['services','How I help']].map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}<a className="nav-contact" href="#contact" onClick={() => setMenu(false)}>Let’s talk <Arrow /></a></nav></header>
    <main id="main">
      <section className="personal-hero" id="top"><div className="personal-intro"><p className="eyebrow">WEB DEVELOPER / DESIGN-MINDED BUILDER</p><h1>Hey, I’m<br/><span>Goodness.</span></h1><p className="personal-lead">I turn ideas into websites<br/>people enjoy using.</p><p className="personal-summary">I care about the details you see and the systems you don’t. I build websites, landing pages, and dashboards that look good and do their job.</p><div className="personal-actions"><a className="button" href="#projects">Explore my work <Arrow /></a><a className="underlink" href="#contact">Say hello <Arrow /></a></div></div><aside className="personal-note"><div className="note-top"><span>GOODNESS / FIELD NOTES</span><span>01</span></div><div className="initial-art" aria-hidden="true">g<span>↗</span></div><p className="note-hand">A little design.<br/>A lot of figuring things out.</p><div className="note-bottom"><span>MY APPROACH</span><p>Understand the problem.<br/>Build with care.<br/>Keep making it better.</p></div><span className="note-stamp">DESIGN + CODE</span></aside><div className="hero-foot"><span>PERSONAL PORTFOLIO</span><a href="#projects">SCROLL TO EXPLORE ↓</a></div></section>
      <section className="personal-about" id="about" data-reveal><span className="eyebrow">01 / A LITTLE ABOUT ME</span><div><h2>I like making<br/>the complicated <em>feel simple.</em></h2><p>I’m Goodness, a web developer who enjoys bringing an idea to life — from the first layout to the small interactions that make it feel right.</p><p>My work spans restaurant websites, local services, independent brands, and the tools behind them. I approach each project with the same question: how can this be clearer, easier, and more useful?</p></div></section>
      <section id="projects" className="portfolio section-pad"><div className="portfolio-heading" data-reveal><div><span className="micro">02 / SELECTED WORK</span><h2>Things I’ve<br/><span>built.</span></h2></div><div className="work-intro"><p>A collection of websites I’ve designed and developed. Open a project to explore the details or visit the live site.</p><label className="search-label"><span className="micro">FIND A PROJECT</span><input aria-label="Search client websites" value={search} onChange={e => { setSearch(e.target.value); setLimit(4); }} placeholder="Business name or keyword"/><span aria-hidden="true">⌕</span></label></div></div><div className="project-list">{visible.slice(0,limit).map((p,i) => <article className="project-row" key={p.id} data-reveal><div className="project-notes"><div className="project-index"><span>{number(i)}</span><span className="micro">WEB DESIGN<br/>DEVELOPMENT</span></div><h3>{p.title}</h3><p>{notes[p.id] || p.tagline}</p><div className="project-links"><button className="underlink" onClick={() => setSelected(p)}>Project notes <Arrow /></button>{p.unavailable ? <span className="micro">ARCHIVED / SITE OFFLINE</span> : <a href={p.liveUrl} className="underlink" target="_blank" rel="noreferrer" aria-label={`Visit ${p.title}`}>Visit website <Arrow /></a>}</div></div><button className="project-canvas" onClick={() => setSelected(p)} aria-label={`Explore ${p.title}`}><span className="canvas-label micro">{p.preview ? 'WEBSITE / DESKTOP VIEW' : 'FROM THE PROJECT ARCHIVE'}</span><img src={p.preview || p.image} alt={`${p.title} ${p.preview ? 'website screenshot' : 'project imagery'}`} loading="lazy"/><span className="canvas-bottom micro"><span>{p.preview ? new URL(p.liveUrl).hostname : p.title}</span><span>OPEN PROJECT ↗</span></span></button></article>)}</div>{!visible.length && <p className="empty-state">No matching projects. Try a different business name.</p>}<div className="portfolio-end"><span className="micro">{Math.min(limit,visible.length)} OF {visible.length} CLIENT PROJECTS</span>{limit<visible.length && <button className="underlink" onClick={() => setLimit(limit+4)}>Keep exploring <span aria-hidden="true">+</span></button>}</div></section>
      <section id="services" className="services section-pad"><div className="services-heading" data-reveal><span className="micro">03 / WHAT I BRING</span><h2>Design sense.<br/>Developer thinking.</h2></div><div className="service-layout"><div className="service-menu" aria-label="Explore services">{services.map((s,i) => <button key={s.name} aria-pressed={service===i} onClick={() => setService(i)}><span className="micro">{number(i)}</span><span>{s.name}</span><span aria-hidden="true">↗</span></button>)}</div><div className="service-story" key={service} aria-live="polite"><p className="micro">{services[service].type}</p><h3>{services[service].title}</h3><p>{services[service].copy}</p><ul>{services[service].includes.map(item=><li key={item}><span aria-hidden="true">↳</span>{item}</li>)}</ul><a className="underlink" href="#contact">Talk it through with me <Arrow /></a></div></div></section>
      <section className="studio-note section-pad" data-reveal><span className="micro">HOW I LIKE TO WORK</span><div><h2>Good work starts<br/>with a conversation.</h2><p>Tell me what you’re trying to build, what isn’t working, or the idea you haven’t quite figured out yet. I’ll help turn it into something clear and useful.</p></div></section>
      <ContactSection />
    </main><footer className={`site-footer living-footer ${footerPaused ? 'motion-paused' : ''}`} onPointerMove={e => { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; const box = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--drift-x', `${((e.clientX - box.left) / box.width - .5) * 24}px`); e.currentTarget.style.setProperty('--drift-y', `${((e.clientY - box.top) / box.height - .5) * 14}px`); }} onPointerLeave={e => { e.currentTarget.style.setProperty('--drift-x', '0px'); e.currentTarget.style.setProperty('--drift-y', '0px'); }}><div className="footer-art" aria-hidden="true"><div className="footer-ribbon"/><div className="footer-light"/></div><button className="footer-motion-toggle" aria-label={footerPaused ? 'Play footer animation' : 'Pause footer animation'} aria-pressed={footerPaused} onClick={() => setFooterPaused(!footerPaused)}>{footerPaused ? 'Play motion ↗' : 'Pause motion Ⅱ'}</button><div><span className="micro">HAVE SOMETHING IN MIND? LET’S BUILD IT.</span><a className="footer-wordmark" href="#top" aria-label="Goodness home">goodness<span>↗</span></a></div><div className="footer-bottom micro"><span>© {new Date().getFullYear()} GOODNESS</span><span>WEB DESIGN & DEVELOPMENT</span><a href="#top">BACK TO TOP ↑</a></div></footer>
    {selected && <ProjectDetails project={selected} onClose={() => setSelected(null)}/>}
  </>;
}

