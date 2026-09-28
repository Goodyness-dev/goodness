import React, { useState } from 'react';

export default function AboutSection() {
  const [copied, setCopied] = useState(false);
  const email = 'goodnesstowobola@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="about" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/10 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400">
            <span>ABOUT & METHODOLOGY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Engineering software that solves real commercial bottlenecks.
          </h2>

          <div className="space-y-4 text-base text-zinc-300 leading-relaxed">
            <p>
              I am <span className="text-white font-semibold">Goodness Adewole</span>, a full-stack engineer and product builder. Over the past several years, I have architected and shipped over 15 production web platforms�ranging from automotive diagnostic management systems with dynamic SQLite backends and Telegram bot alerts to 0% commission direct-ordering engines for high-volume restaurants.
            </p>
            <p>
              I believe modern web applications should feel physical and immediate: sub-second load times, tactile feedback, zero reliance on bloated external component libraries, and hyper-calibrated conversion psychology that turns casual visitors into paying customers.
            </p>
            <p>
              Operating remotely out of Lagos, Nigeria, I engineer solutions for clients, founders, and businesses across North America, Europe, and globally.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={handleCopyEmail}
              className="px-5 py-3 rounded-xl bg-zinc-900 border border-white/15 hover:border-white/30 text-xs font-mono text-zinc-200 flex items-center gap-2 transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-400">Email Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy: {email}</span>
                </>
              )}
            </button>

            <a
              href="https://github.com/Goodyness-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-2 transition-all"
            >
              <span>GitHub Profile</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 w-full">
          <div className="rounded-2xl bg-zinc-900/80 border border-white/10 p-7 space-y-6 shadow-2xl backdrop-blur-md">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Engineering Principles
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
              <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/5 space-y-1">
                <p className="font-semibold text-white">01. Velocity With Zero Technical Debt</p>
                <p className="text-zinc-400">
                  Scaffold and deploy rapidly without cutting architectural corners. Strict separation of concerns, isolated modules, zero disk bloat.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/5 space-y-1">
                <p className="font-semibold text-white">02. Financial & Conversion First</p>
                <p className="text-zinc-400">
                  A pretty site that fails to generate calls or revenue is a failure. Every CTA, inspection anchor, and form is tuned for human conversion.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/5 space-y-1">
                <p className="font-semibold text-white">03. Tactile 60fps Motion</p>
                <p className="text-zinc-400">
                  Hardware-accelerated CSS and GSAP. Interfaces should react with weight, physical springs, and crisp micro-feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
