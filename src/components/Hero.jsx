import React from 'react';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[92dvh] flex flex-col justify-center pt-28 pb-16 px-5 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>// FULL-STACK ENGINEER & PRODUCT BUILDER</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            I build high-velocity{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              web platforms
            </span>{' '}
            that drive real revenue.
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-[58ch] leading-relaxed">
            Specialized in tactile, conversion-obsessed commercial platforms, performant reactive web applications, and decentralized protocols. Zero boilerplate slop, zero excuses.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
            <a
              href="#projects"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-xl shadow-blue-600/25 active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <span>Explore Selected Work</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 hover:border-white/20 transition-all active:scale-95 text-center"
            >
              Start A Project
            </a>
          </div>

          <div className="pt-4 flex items-center gap-3 text-xs font-mono text-zinc-500 flex-wrap">
            <span className="text-zinc-400">STACK:</span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/5 text-zinc-300">React</span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/5 text-zinc-300">Next.js</span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/5 text-zinc-300">TypeScript</span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/5 text-zinc-300">Node.js</span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/5 text-zinc-300">SQLite/Postgres</span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/5 text-zinc-300">Tailwind</span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/5 text-zinc-300">Web3</span>
          </div>
        </div>

        <div className="lg:col-span-5 w-full">
          <div className="relative rounded-2xl bg-zinc-900/90 border border-white/10 p-6 sm:p-7 shadow-2xl shadow-black/80 backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="ml-2 text-zinc-300 font-semibold">goodness@terminal:~</span>
              </div>
              <span className="text-blue-400">live-metrics</span>
            </div>

            <div className="pt-5 space-y-4 font-mono text-xs text-zinc-300">
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">$</span>
                <span className="text-zinc-100">whoami</span>
              </div>
              <div className="pl-4 text-zinc-400 space-y-1">
                <p><span className="text-zinc-500">//</span> Name: Goodness Adewole</p>
                <p><span className="text-zinc-500">//</span> Role: Full-Stack Engineer & Product Architect</p>
                <p><span className="text-zinc-500">//</span> Focus: High-Conversion Commercial Systems & Web3</p>
                <p><span className="text-zinc-500">//</span> Base: Lagos, Nigeria (Building Worldwide)</p>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <span className="text-blue-400 font-bold">$</span>
                <span className="text-zinc-100">system.status</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Active Deployed Platforms</span>
                  <span className="text-emerald-400 font-bold">15+ Live</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Commission Fee Elimination</span>
                  <span className="text-cyan-400 font-bold">0% Direct Ordering</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Lighthouse Performance</span>
                  <span className="text-blue-400 font-bold">95-100</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Contract Availability</span>
                  <span className="text-emerald-400 font-bold">?? Open</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500">
                <span>git commit -m "shipped with speed"</span>
                <span className="text-zinc-400">v2.4.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
