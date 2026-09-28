import React from 'react';
import { skillsData } from '../data/skillsData';

export default function TechStackSection() {
  return (
    <section id="stack" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/10 scroll-mt-20">
      <div className="space-y-3 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
          <span>ENGINEERING ARSENAL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Technical Stack & Disciplines
        </h2>
        <p className="text-base text-zinc-400 max-w-[60ch]">
          Battle-tested across production web platforms, high-throughput microservices, and decentralized protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {skillsData.map((group, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-zinc-900/60 border border-white/10 p-6 sm:p-8 space-y-6 hover:border-white/20 transition-all duration-300"
          >
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {group.category}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                {group.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {group.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3 rounded-xl bg-zinc-950/70 border border-white/5 flex flex-col justify-between space-y-1 hover:border-blue-500/30 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-medium text-zinc-200">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono text-blue-400">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
