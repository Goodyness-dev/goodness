import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-zinc-950 py-12 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start space-y-1">
          <span className="font-mono font-bold text-white tracking-tight">
            Goodness Adewole
          </span>
          <span className="text-xs text-zinc-500">
            � ${currentYear} All rights reserved. Built with precision & speed.
          </span>
        </div>

        <a
          href="#top"
          className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <span>Back to Top</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </a>

        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <a
            href="https://github.com/Goodyness-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span>�</span>
          <a
            href="mailto:goodnesstowobola@gmail.com"
            className="hover:text-white transition-colors"
          >
            Email
          </a>
          <span>�</span>
          <span className="text-zinc-600">Lagos, NG</span>
        </div>
      </div>
    </footer>
  );
}
