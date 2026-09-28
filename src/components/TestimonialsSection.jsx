import React from 'react';
import { testimonialsData } from '../data/testimonialsData';

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/10 scroll-mt-20">
      <div className="space-y-3 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
          <span>CLIENT & PARTNER FEEDBACK</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Trusted by Shop Owners & Founders
        </h2>
        <p className="text-base text-zinc-400 max-w-[60ch]">
          Real feedback from owners who rely on these production platforms to run day-to-day operations and acquire clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {testimonialsData.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-zinc-900/60 border border-white/10 p-7 sm:p-8 flex flex-col justify-between space-y-6 hover:border-emerald-500/30 transition-all duration-300"
          >
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(item.rating)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed italic">
              "{item.quote}"
            </p>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white text-sm">
                  {item.clientName}
                </p>
                <p className="text-xs text-zinc-400">
                  {item.role}, <span className="text-zinc-300">{item.company}</span>
                </p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
