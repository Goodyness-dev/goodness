import { useEffect, useRef } from 'react';
import './InteractiveOrb.css';

export default function InteractiveOrb() {
  const canvasRef = useRef(null);
  const input = useRef({ x: 0, y: 0, pulse: 0 });
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, frame = 0, time = 0, last = 0;
    let visible = true, rx = 0, ry = 0;
    const points = Array.from({ length: 650 }, (_, i) => {
      const y = 1 - i / 649 * 2, r = Math.sqrt(1 - y * y);
      const a = i * Math.PI * (3 - Math.sqrt(5));
      return [Math.cos(a) * r, y, Math.sin(a) * r];
    });
    function draw(now) {
      frame = 0;
      const dt = Math.min((now - last) / 1000, .04); last = now;
      if (!media.matches) time += dt;
      rx += (input.current.y * .45 - rx) * .06;
      ry += (input.current.x * .65 - ry) * .06;
      input.current.pulse *= .96;
      const energy = media.matches ? 0 : input.current.pulse;
      const r = Math.min(width * .32, height * .32) * (1 + Math.sin(time * 1.3) * .025 + energy * .1);
      const cx = width / 2 + ry * 15, cy = height / 2 + rx * 12;
      ctx.clearRect(0, 0, width, height);
      const glow = ctx.createRadialGradient(cx, cy, r * .2, cx, cy, r * 1.7);
      glow.addColorStop(0, '#a4ec4422'); glow.addColorStop(.5, '#a4ec4415'); glow.addColorStop(1, '#a4ec4400');
      ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
      const surface = ctx.createRadialGradient(cx - r * .3, cy - r * .35, 0, cx, cy, r);
      surface.addColorStop(0, '#33472499'); surface.addColorStop(.75, '#16241099'); surface.addColorStop(1, '#96d25522');
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = surface; ctx.fill();
      function project(x, y, z) {
        const ay = time * .16 + ry, ax = -.25 + rx;
        const xx = x * Math.cos(ay) + z * Math.sin(ay), zz = z * Math.cos(ay) - x * Math.sin(ay);
        return [cx + xx * r, cy + (y * Math.cos(ax) - zz * Math.sin(ax)) * r, y * Math.sin(ax) + zz * Math.cos(ax)];
      }
      for (let line = 0; line < 10; line++) {
        const angle = line * Math.PI / 5; ctx.beginPath();
        for (let j = 0; j <= 80; j++) {
          const a = j / 80 * Math.PI * 2;
          const p = project(Math.sin(a) * Math.cos(angle), Math.cos(a), Math.sin(a) * Math.sin(angle));
          if (j === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]);
        }
        ctx.strokeStyle = '#b4f47116'; ctx.lineWidth = .65; ctx.stroke();
      }
      const projected = points.map(([x,y,z], i) => {
        const ripple = 1 + Math.sin(y * 9 + time * 1.7 + x * 4) * .018;
        return [...project(x * ripple, y * ripple, z * ripple), i];
      }).sort((a,b) => a[2] - b[2]);
      for (const [x,y,z,i] of projected) {
        const alpha = (.12 + (z + 1) * .32) * (.7 + Math.sin(time * 2 + i * .7) * .3);
        ctx.fillStyle = `rgba(199,255,142,${alpha})`;
        ctx.beginPath(); ctx.arc(x, y, .6 + (z + 1) * .48, 0, Math.PI * 2); ctx.fill();
      }
      for (let ring = 0; ring < 2; ring++) {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(ring ? -.55 + ry * .2 : .55 + rx * .2);
        ctx.beginPath(); ctx.ellipse(0, 0, r * 1.35, r * .48, 0, 0, Math.PI * 2);
        ctx.strokeStyle = '#c2f97033'; ctx.lineWidth = .7; ctx.stroke();
        const a = time * (ring ? -.4 : .3) + ring * 2;
        ctx.shadowBlur = 15; ctx.shadowColor = '#c2f970'; ctx.fillStyle = '#d8ffae';
        ctx.beginPath(); ctx.arc(Math.cos(a) * r * 1.35, Math.sin(a) * r * .48, 2.8, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      }
      if (energy > .02) {
        ctx.beginPath(); ctx.arc(cx,cy,r * (1 + (1 - energy) * .65),0,Math.PI*2);
        ctx.strokeStyle = `rgba(194,249,112,${energy * .6})`; ctx.lineWidth = 1.5; ctx.stroke();
      }
      if (visible && !document.hidden && !media.matches) frame = requestAnimationFrame(draw);
    }
    function restart() { cancelAnimationFrame(frame); last = performance.now(); draw(last); }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); restart();
    });
    resize.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; restart(); });
    observer.observe(canvas);
    media.addEventListener('change', restart); document.addEventListener('visibilitychange', restart);
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect();
      media.removeEventListener('change', restart); document.removeEventListener('visibilitychange', restart);
    };
  }, []);
  return <div className="orb-scene">
    <span className="orb-caption">FIG. 01 / A LITTLE DIGITAL ENERGY</span>
    <button className="orb-control" aria-label="Pulse the interactive orb" onPointerMove={e => {
      const b = e.currentTarget.getBoundingClientRect();
      input.current.x = ((e.clientX - b.left) / b.width - .5) * 2;
      input.current.y = ((e.clientY - b.top) / b.height - .5) * 2;
    }} onPointerLeave={() => { input.current.x = 0; input.current.y = 0; }} onClick={() => { input.current.pulse = 1; }}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="orb-monogram" aria-hidden="true">g<span>.</span></span>
    </button>
    <span className="orb-tag orb-design">DESIGN</span><span className="orb-tag orb-engineer">ENGINEER</span><span className="orb-tag orb-ship">SHIP</span>
    <div className="orb-footer"><span>MOVE TO EXPLORE / TAP TO PULSE</span><span className="lime">● CONNECTED</span></div>
  </div>;
}
