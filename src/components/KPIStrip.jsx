import React from 'react';

export default function KPIStrip() {
  const kpis = [
    { value: '35+', label: 'Production Sites Deployed', detail: 'Live client platforms & tools' },
    { value: '0%', label: 'Delivery Commission Bleed', detail: 'Direct-order engines built' },
    { value: '60fps', label: 'Tactile Motion & UI', detail: 'GSAP-tuned smooth performance' },
    { value: '< 1.2s', label: 'Mobile Page Load Speed', detail: 'Zero bundle & asset waste' }
  ];

  return (
    <section className="border-y border-white/10 bg-zinc-950/60 backdrop-blur-sm py-10 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="flex flex-col space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              {kpi.value}
            </span>
            <span className="text-sm font-semibold text-zinc-200">
              {kpi.label}
            </span>
            <span className="text-xs text-zinc-500">
              {kpi.detail}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
