import React, { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: 'Client Platform',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, text: '' });
  const [copied, setCopied] = useState(false);

  const emailAddress = 'goodnesstowobola@gmail.com';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, text: '' });

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'service_aqm9eua',
          template_id: 'template_oxfdpcf',
          user_id: 'cv2I_dwTk6foaIr_C',
          template_params: {
            name: form.name,
            to_name: 'Goodness Adewole',
            email: form.email,
            to_email: 'adewolegoodness22@gmail.com',
            project_type: form.projectType,
            message: `[Scope: ${form.projectType}] - ${form.message}`
          }
        })
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          text: 'Thank you! Your message has been sent successfully. I will get back to you within 24 hours.'
        });
        setForm({ name: '', email: '', projectType: 'Client Platform', message: '' });
      } else {
        throw new Error('Email service response error');
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        text: `Could not send directly via EmailJS. Please send an email directly to ${emailAddress}.`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/10 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
            <span>GET IN TOUCH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Let's build something exceptional together.
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed">
            Whether you need a high-conversion commercial platform, an automated direct-ordering engine, or a full-stack Web3 application, I am available for immediate engagement.
          </p>

          <div className="pt-2 space-y-4">
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Direct Inquiries
                </span>
                <span className="text-sm font-semibold text-white">
                  {emailAddress}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono text-emerald-300">
                Current response time: &lt; 4 hours
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-zinc-900/80 border border-white/10 p-7 sm:p-9 space-y-5 shadow-2xl backdrop-blur-md"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-300 uppercase tracking-wider block">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 focus:border-blue-500 focus:outline-none text-sm text-white placeholder-zinc-600 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-300 uppercase tracking-wider block">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 focus:border-blue-500 focus:outline-none text-sm text-white placeholder-zinc-600 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-300 uppercase tracking-wider block">
                Project Category
              </label>
              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 focus:border-blue-500 focus:outline-none text-sm text-white transition-colors"
              >
                <option value="Client Platform">Commercial / Client Platform (Web & Mobile)</option>
                <option value="Direct Ordering">0% Commission Direct-Ordering Engine</option>
                <option value="Web3 & FinTech">Web3 / Ethereum / FinTech dApp</option>
                <option value="Full-Stack Engineering">Full-Stack Contract / Custom Microservices</option>
                <option value="Other">Other Strategic Opportunity</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-300 uppercase tracking-wider block">
                Project Details & Timeline *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe your project, goals, and target launch timeframe..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 focus:border-blue-500 focus:outline-none text-sm text-white placeholder-zinc-600 transition-colors resize-none"
              />
            </div>

            {status.text && (
              <div
                className={`p-4 rounded-xl text-xs sm:text-sm font-medium ${
                  status.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/10 text-red-400 border border-red-500/30'
                }`}
              >
                {status.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-xl shadow-blue-600/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Project Inquiry</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
