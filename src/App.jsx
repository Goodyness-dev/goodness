import { useEffect, useRef, useState } from 'react';
import { projectsData } from './data/projectsData';
import { skillsData } from './data/skillsData';
import ContactSection from './components/ContactSection';

const categories = [['all', 'All work'], ['client', 'Commercial'], ['web3', 'Web3 & FinTech'], ['systems', 'Systems & tools']];
const Arrow = () => <span aria-hidden="true">↗</span>;
function ProjectDetails({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, []);
  return <dialog ref={ref} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <button className="dialog-close" onClick={onClose} aria-label="Close project details">×</button>
    <img src={project.image} alt={project.title} />
    <div className="dialog-content"><p className="eyebrow">{project.categoryLabel}</p><h2 id="project-dialog-title">{project.title}</h2><p>{project.description}</p><ul>{project.highlights?.map(item => <li key={item}>{item}</li>)}</ul><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="actions"><a className="button primary" href={project.liveUrl} target="_blank" rel="noreferrer">View live site <Arrow /></a><a className="text-link" href={project.githubUrl} target="_blank" rel="noreferrer">Source code <Arrow /></a></div></div>
  </dialog>;
}
export default function App() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(4);
  const [selected, setSelected] = useState(null);
  const [menu, setMenu] = useState(false);
  const filtered = projectsData.filter(p => (category === 'all' || p.category === category) && `${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase()));
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a className="wordmark" href="#top" aria-label="Goodness Adewole home">goodness<span>.dev</span></a><button className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? 'Close −' : 'Menu +'}</button><nav id="navigation" className={menu ? 'open' : ''} aria-label="Main navigation">{[['projects','Work'],['about','About'],['stack','Stack']].map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}<a className="nav-contact" href="#contact" onClick={() => setMenu(false)}>Let’s talk <Arrow /></a></nav></header>
    <main id="main">
      <section className="hero shell" id="top"><div className="hero-topline"><span className="eyebrow">INDEPENDENT FULL-STACK ENGINEER</span><span className="availability"><i /> Available for projects</span></div><div className="hero-layout"><div className="hero-copy"><h1>Thoughtfully built.<br /><span>Made to work.</span></h1><p>I’m Goodness Adewole. I turn complex ideas into fast, intuitive digital products — from the first interaction to the last line of code.</p><div className="actions"><a className="button primary" href="#projects">Explore my work <span aria-hidden="true">↓</span></a><a className="text-link" href="#contact">Let’s build something <Arrow /></a></div></div><div className="system-art" aria-hidden="true"><div className="art-label">FIG. 01 / FROM IDEA TO INTERFACE</div><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="core">g<span>.</span></div><span className="art-node node-a">DESIGN</span><span className="art-node node-b">ENGINEER</span><span className="art-node node-c">SHIP</span><div className="art-bottom"><span>FRONTEND ↔ BACKEND</span><span className="lime">● CONNECTED</span></div></div></div><div className="hero-footer"><span>LAGOS, NG <span className="muted">/ BUILDING WORLDWIDE</span></span><span>React <b>/</b> Next.js <b>/</b> TypeScript <b>/</b> Node.js</span><a href="https://github.com/Goodyness-dev" target="_blank" rel="noreferrer">GitHub <Arrow /></a></div></section>
      <section className="work-section shell" id="projects"><div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Ideas, out in the world<span className="lime">.</span></h2></div><p>Commercial platforms, decentralized apps,<br />and tools built for real people.</p></div><div className="project-toolbar"><div className="filters" aria-label="Project categories">{categories.map(([id,label]) => <button key={id} aria-pressed={category === id} onClick={() => { setCategory(id); setLimit(4); }}>{label}{id === 'all' && <sup>{projectsData.length}</sup>}</button>)}</div><label className="search"><span aria-hidden="true">⌕</span><input aria-label="Search projects" placeholder="Search projects…" value={search} onChange={e => { setSearch(e.target.value); setLimit(4); }}/></label></div><div className="project-grid">{filtered.slice(0,limit).map((p,i) => <article className="project-card" key={p.id}><button className="project-image" aria-label={`Explore ${p.title}`} onClick={() => setSelected(p)}><img src={p.image} alt={`${p.title} website preview`} loading="lazy"/><span className="image-action">Explore project <Arrow /></span></button><div className="project-meta"><span>{p.categoryLabel}</span><span>{String(i + 1).padStart(2,'0')}</span></div><div className="project-title"><h3><button onClick={() => setSelected(p)}>{p.title}</button></h3><a href={p.liveUrl} aria-label={`Visit ${p.title}`} target="_blank" rel="noreferrer"><Arrow /></a></div><p className="project-summary">{p.tagline}</p><div className="tags">{p.tags.slice(0,3).map(t => <span key={t}>{t}</span>)}</div></article>)}</div>{!filtered.length && <div className="empty-state">No projects found. Try another search or category.</div>}<div className="work-bottom"><span>Showing {Math.min(limit,filtered.length)} of {filtered.length} projects</span>{limit < filtered.length && <button className="button secondary" onClick={() => setLimit(limit + 6)}>More projects <span>+</span></button>}</div></section>
      <section className="about-section shell" id="about"><p className="eyebrow">02 / THE PERSON BEHIND THE CODE</p><div className="about-layout"><h2>Clear thinking.<br />Careful engineering.<br /><span className="muted">Better products.</span></h2><div><p>I’m a full-stack engineer and product builder based in Lagos, working with founders and businesses around the world.</p><p>My work connects considered interfaces with reliable systems: booking platforms, direct-ordering engines, automation, and Web3 applications. Every decision starts with what the product needs to do for the people using it.</p><a className="text-link" href="#contact">Have something in mind? <Arrow /></a></div></div></section>
      <section className="stack-section shell" id="stack"><div className="section-heading"><div><p className="eyebrow">03 / TOOLKIT</p><h2>The right tools. Applied well.</h2></div><p>From interface to infrastructure.</p></div><div className="stack-list">{skillsData.map((group,i) => <details key={group.category}><summary><span className="stack-number">0{i+1}</span><h3>{group.category}</h3><span className="stack-preview">{group.skills.slice(0,2).map(s => s.name).join(' / ')}</span><span className="expand">+</span></summary><div className="stack-content"><p>{group.description}</p><div className="tags">{group.skills.map(s => <span key={s.name}>{s.name}</span>)}</div></div></details>)}</div></section>
      <ContactSection />
    </main><footer className="site-footer shell"><a className="wordmark" href="#top">goodness<span>.dev</span></a><span>© {new Date().getFullYear()} Goodness Adewole</span><a href="#top">Back to top ↑</a></footer>
    {selected && <ProjectDetails project={selected} onClose={() => setSelected(null)}/>}
  </>;
}


