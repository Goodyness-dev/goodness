import { useEffect, useRef, useState } from 'react';
import { projectsData } from './data/projectsData';
import ContactSection from './components/ContactSection';
import './Showcase.css';

const previewImages = {
  '/projects/top-canada.jpg': '/previews/preview-top-canada.jpg',
  '/projects/captain-pauls.jpg': '/previews/preview-captain-pauls.jpg',
  '/projects/steakhouse.jpg': '/previews/preview-steakhouse.jpg',
  '/projects/bluebird-jewelry.jpg': '/previews/preview-bluebird.jpg',
};
const work = projectsData.filter(project => project.category === 'client').map(project => ({
  ...project,
  preview: previewImages[project.image],
  unavailable: project.id === 'tobys-auto',
})).sort((a,b) => Number(!!b.preview) - Number(!!a.preview));
const Arrow = () => <span aria-hidden="true">↗</span>;
function WebsitePreview({ project, onOpen, compact = false }) {
  const host = new URL(project.liveUrl).hostname;
  return <button className={compact ? 'browser-preview compact-preview' : 'browser-preview'} aria-label={`Explore ${project.title}`} onClick={onOpen}>
    <span className="browser-bar"><span className="window-dots" aria-hidden="true"><i/><i/><i/></span><span className="browser-address">{project.preview ? host : 'PROJECT IMAGERY'}</span><span className="browser-open" aria-hidden="true">↗</span></span>
    <span className="browser-screen"><img src={project.preview || project.image} alt={`${project.title} ${project.preview ? "website preview" : "project image"}`} loading="lazy"/></span>
    <span className="preview-hover">Explore the project <Arrow /></span>
  </button>;
}
function Logo() {
  return <><svg className="brand-symbol" viewBox="0 0 40 40" aria-hidden="true"><path fill="currentColor" d="M6 4h19a11 11 0 0 1 0 22H16v10H6V4Zm10 8v6h9a3 3 0 0 0 0-6h-9Z"/><path fill="currentColor" d="M21 30h13v6H21z"/></svg><span>pilogram<span className="logo-stop">.</span></span></>;
}
function ProjectDetails({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, []);
  return <dialog ref={ref} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <button className="dialog-close" onClick={onClose} aria-label="Close project details">×</button>
    <div className="detail-preview"><div className="browser-bar"><span className="window-dots" aria-hidden="true"><i/><i/><i/></span><span className="browser-address">{new URL(project.liveUrl).hostname}</span></div><div className="detail-screen" tabIndex={0} aria-label="Scrollable website screenshot"><img src={project.preview || project.image} alt={project.title} /></div></div>
    <div className="dialog-content"><p className="eyebrow">PILOGRAM / CLIENT WEBSITE</p><h2 id="project-dialog-title">{project.title}</h2><p>{project.description}</p><ul>{project.highlights?.map(item => <li key={item}>{item}</li>)}</ul><div className="actions">{project.unavailable ? <p className="archive-note">Archived project · Live website currently unavailable</p> : <a className="button primary" href={project.liveUrl} target="_blank" rel="noreferrer">Visit website <Arrow /></a>}<a className="text-link" href="#contact" onClick={onClose}>Build yours with us <Arrow /></a></div></div>
  </dialog>;
}
const services = [
  ['Landing pages', 'Turn interest into an enquiry.', 'Sending people from an ad straight into your DMs leaves you doing the same sales pitch over and over. Give them a page that explains the offer, answers the obvious questions, and captures the details you need to follow up.'],
  ['Business websites', 'Be there when customers look.', 'Someone is looking for what you sell. A clear, searchable website puts your services, proof of work, and contact details in one place, so potential customers can understand your business without waiting for a reply.'],
  ['Admin dashboards', 'Know who needs a follow-up.', 'We can connect your website to an admin dashboard built around your workflow. View customer enquiries, track their status, manage bookings, and see who needs a reply. You stay in control without digging through scattered chats.'],
  ['Website redesigns', 'Make the next step obvious.', 'If people land on your site and leave confused, something needs to change. We rethink the messaging, navigation, and enquiry flow so customers can find what they need and know what to do next.'],
];
export default function App() {
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(3);
  const [selected, setSelected] = useState(null);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;
    const animations = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const animation = entry.target.animate(
          [{ opacity: .2, transform: 'translateY(42px) scale(.975)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }],
          { duration: 850, easing: 'cubic-bezier(.2,.7,.2,1)' }
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    document.querySelectorAll('.section-heading, .project-card, .launch-item, .about-layout, .process-grid > div').forEach(el => observer.observe(el));
    const stopMotion = () => {
      if (preference.matches) { observer.disconnect(); animations.forEach(animation => animation.cancel()); }
    };
    preference.addEventListener('change', stopMotion);
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); preference.removeEventListener('change', stopMotion); };
  }, [limit, search]);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    function update() {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty('--page-progress', max > 0 ? scrollY / max : 0);
      document.documentElement.style.setProperty('--hero-shift', reduced.matches ? '0px' : Math.min(scrollY * .06, 40) + 'px');
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);
    update();
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); reduced.removeEventListener('change', schedule); };
  }, []);
  const filtered = work.filter(p => `${p.title} ${p.description}`.toLowerCase().includes(search.toLowerCase()));
  return <>
    <div className="scroll-progress" aria-hidden="true"/><a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header shell"><a className="wordmark" href="#top" aria-label="Pilogram home"><Logo /></a><button className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? 'Close −' : 'Menu +'}</button><nav id="navigation" className={menu ? 'open' : ''} aria-label="Main navigation">{[['projects','Our work'],['services','Services'],['about','Why Pilogram']].map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}<a className="nav-contact" href="#contact" onClick={() => setMenu(false)}>Start a project <Arrow /></a></nav></header>
    <main id="main">
      <section className="hero shell" id="top"><div className="hero-topline"><span className="eyebrow">A WEB DESIGN & DEVELOPMENT STUDIO</span><span className="availability"><i /> Open for new projects</span></div><h1>Invisible online.<br /><em>Losing business.</em></h1><div className="hero-bottom"><p>When customers search and can’t find you, the enquiry goes somewhere else. We build websites that make your business easier to find, easier to trust, and easier to buy from.</p><div className="actions"><a className="button primary" href="#contact">Let’s build your website <Arrow /></a><a className="text-link" href="#projects">See our work <span aria-hidden="true">↓</span></a></div></div><div className="launch-showcase"><div className="launch-heading"><span className="eyebrow">A FEW RECENT BUILDS</span><a href="#projects">Explore our work <Arrow /></a></div><div className="launch-windows">{work.filter(p => p.preview).slice(1,4).map(p => <div className="launch-item" key={p.id}><WebsitePreview project={p} compact onOpen={() => setSelected(p)}/><span className="launch-name">{p.title}</span></div>)}</div></div><div className="hero-footer"><span>GET FOUND. CAPTURE THE ENQUIRY. FOLLOW IT THROUGH.</span><span>Landing pages <b>/</b> Websites <b>/</b> Admin dashboards</span></div></section>
      <section className="work-section shell" id="projects"><div className="section-heading"><div><p className="eyebrow">01 / THE PROOF IS IN THE WORK</p><h2>The work.<br /><span className="muted">Out in the real world.</span></h2></div><p>Websites we’ve built for businesses.<br />Open a project. See what it does.</p></div><div className="project-toolbar"><span className="work-count">Client websites <sup>{work.length}</sup></span><label className="search"><span aria-hidden="true">⌕</span><input aria-label="Search client websites" placeholder="Find a business…" value={search} onChange={e => { setSearch(e.target.value); setLimit(3); }}/></label></div><div className="project-grid">{filtered.slice(0,limit).map((p,i) => <article className="project-card" key={p.id}>
          <div className="project-stage"><div className="stage-grid" aria-hidden="true"/><span className="stage-label">PILOGRAM / PROJECT {String(i + 1).padStart(2,'0')}</span><WebsitePreview project={p} onOpen={() => setSelected(p)}/><span className="stage-caption">DESIGNED TO CONNECT. BUILT TO WORK.</span></div>
          <div className="project-info"><div className="project-meta"><span>CLIENT WEBSITE</span><span>{String(i + 1).padStart(2,'0')}</span></div><div className="project-title"><h3><button onClick={() => setSelected(p)}>{p.title}</button></h3></div><p className="project-summary">{p.tagline}</p><div className="project-deliverables"><span>Web design</span><span>Development</span><span>Responsive</span></div><div className="project-actions"><button className="text-link" onClick={() => setSelected(p)}>Inside the project <Arrow /></button>{p.unavailable ? <span className="archive-note">Archived project</span> : <a className="text-link" href={p.liveUrl} aria-label={`Visit ${p.title}`} target="_blank" rel="noreferrer">Visit website <Arrow /></a>}</div></div>
        </article>)}</div>{!filtered.length && <div className="empty-state">No websites found. Try another business name.</div>}<div className="work-bottom"><span>Showing {Math.min(limit,filtered.length)} of {filtered.length} websites</span>{limit < filtered.length && <button className="button secondary" onClick={() => setLimit(limit + 6)}>More of our work <span>+</span></button>}</div></section>
      <section className="services-section" id="services"><div className="shell"><div className="section-heading"><div><p className="eyebrow">02 / WHAT WE DO</p><h2>Less chasing.<br />More running your business.</h2></div><p>A clear way in for customers.<br />A simpler way to manage what comes next.</p></div><div className="service-list">{services.map(([title,subtitle,description],i) => <details key={title} open={i === 0 ? true : undefined}><summary><span className="service-number">0{i+1}</span><h3>{title}</h3><span className="service-subtitle">{subtitle}</span><span className="expand">+</span></summary><div className="service-content"><p>{description}</p><a href="#contact" className="text-link">Let’s talk about it <Arrow /></a></div></details>)}</div></div></section>
      <section className="about-section shell" id="about"><p className="eyebrow">03 / YOUR INBOX IS NOT A SALES SYSTEM</p><div className="about-layout"><h2>Manual DMs.<br /><em>Real money slipping away.</em></h2><div><p>A buried message. A price sent three times. A customer you meant to follow up with. Managing every sale by hand costs time, and missed conversations can cost you the sale.</p><p>Pilogram builds the website and the workflow behind it. Let customers explore your offer and send a proper enquiry, then use an admin dashboard to track the conversation, update its status, and decide what happens next. Less guesswork. Fewer loose ends.</p></div></div><div className="process-grid">{[['Capture it once.','Collect the customer’s details and what they need through your website, instead of piecing it together across messages.'],['See what’s happening.','Keep enquiries and customer records together. Check what is new, what is in progress, and what needs your attention.'],['Follow through.','Update the status, manage the booking, and pick up the next conversation with the context already there.']].map(([title,copy],i)=><div key={title}><span className="eyebrow">0{i+1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></section>
      <ContactSection />
    </main><footer className="site-footer shell"><a className="wordmark" href="#top" aria-label="Pilogram home"><Logo /></a><span>© {new Date().getFullYear()} Pilogram. Built with intention.</span><a href="#top">Back to top ↑</a></footer>
    {selected && <ProjectDetails project={selected} onClose={() => setSelected(null)}/>}
  </>;
}

