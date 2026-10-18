import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';

export const CTA: React.FC = () => {
  const { cta, socials, profile } = portfolioData;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sentNotice, setSentNotice] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const verbs = ['DESIGN', 'BUILD', 'CREATE', 'SHIP'];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % verbs.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${socials.email}?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${name}`
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailto;
    setSentNotice(true);
  };

  return (
    <section id="contact" className="pt-12 sm:pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Landscape Banner from Screenshot */}
        <div className="border border-border relative overflow-hidden bg-surface-2 min-h-[105px] sm:min-h-[115px] flex items-center">
          {/* Background Pixel-art landscape */}
          <div className="absolute inset-0 z-0">
            <img
              src={cta.imageDark}
              alt="Pixel-art landscape banner dark"
              className="w-full h-full object-cover pixelated block dark-only"
            />
            <img
              src={cta.imageLight}
              alt="Pixel-art landscape banner light"
              className="w-full h-full object-cover pixelated block light-only"
            />
          </div>

          {/* Overlay Content */}
          <div className="relative z-10 w-full p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Centered Terminal-style bordered box */}
            <div className="border border-border/80 bg-surface/90 backdrop-blur-sm px-4 py-2.5 max-w-full">
              <span className="font-mono text-xs sm:text-[13px] text-text font-medium tracking-wide">
                {cta.terminalText}
              </span>
              <span className="cursor-blink text-text ml-1 text-xs select-none">█</span>
            </div>

            {/* Right: Filled Button */}
            <a
              href={`mailto:${socials.email}`}
              className="pixel-btn-primary px-4 sm:px-5 py-2.5 text-xs font-mono font-bold tracking-wider select-none flex-shrink-0"
              id="cta-get-in-touch-btn"
            >
              <span>✉</span>
              <span>{cta.buttonText.replace('✉', '').trim()}</span>
            </a>
          </div>
        </div>

        {/* Supplementary Terminal Contact Console (from previous codebase) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border border-border bg-surface/60 p-6 sm:p-8">
          {/* Left Column: Direct info & Coordinates */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>// 10 / TERMINAL TRANSMISSION</span>
                <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none inline-block animate-pulse" />
                  CHANNEL OPEN
                </span>
              </div>

              {/* Big Animated Rotating Headline from old Contact.tsx */}
              <h3 className="font-pixel text-2xl sm:text-3xl lg:text-[34px] font-bold text-text leading-tight mb-3">
                LET&apos;S{' '}
                <span className="text-highlight underline decoration-2 underline-offset-4 transition-all duration-300">
                  {verbs[wordIdx]}
                </span>{' '}
                SOMETHING.
              </h3>

              <p className="font-mono text-xs text-text-muted leading-relaxed mb-6">
                Have an idea, project, collaboration or opportunity? Drop a message or reach out directly.
              </p>

              <div className="space-y-2 mb-6 border-y border-border/50 py-3 font-mono text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-text-muted">DIRECT EMAIL:</span>
                  <a
                    href={`mailto:${socials.email}`}
                    className="font-bold text-text hover:underline break-all"
                  >
                    {socials.email}
                  </a>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-text-muted">LOCATION:</span>
                  <span className="text-text font-medium">{profile.location}</span>
                </div>

                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-text-muted">COORDINATES:</span>
                  <span className="text-text">{profile.coordinates}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-text-muted">STATUS:</span>
                  <span className="text-emerald-500 font-bold">OPEN TO WORK</span>
                </div>

                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-text-muted">RESPONSE:</span>
                  <span className="text-text-muted">Usually within a day</span>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn-outline px-2.5 py-1 text-[11px] font-mono"
              >
                GITHUB ↗
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn-outline px-2.5 py-1 text-[11px] font-mono"
              >
                LINKEDIN ↗
              </a>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn-outline px-2.5 py-1 text-[11px] font-mono"
              >
                INSTAGRAM ↗
              </a>
              <a
                href={socials.x}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn-outline px-2.5 py-1 text-[11px] font-mono"
              >
                X / TWITTER ↗
              </a>
            </div>
          </div>

          {/* Right Column: Direct Quick Message Form */}
          <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8">
            <div className="font-mono text-[11px] text-text-muted uppercase tracking-wider mb-4">
              // SEND QUICK MESSAGE
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] text-text-muted mb-1">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Smith"
                    className="w-full bg-surface-2 border border-border px-3 py-2 text-xs font-mono text-text placeholder:text-text-muted/50 focus:border-border-strong focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-text-muted mb-1">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@example.com"
                    className="w-full bg-surface-2 border border-border px-3 py-2 text-xs font-mono text-text placeholder:text-text-muted/50 focus:border-border-strong focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-text-muted mb-1">
                  PROJECT / MESSAGE DETAILS
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about what you'd like to build..."
                  className="w-full bg-surface-2 border border-border p-3 text-xs font-mono text-text placeholder:text-text-muted/50 focus:border-border-strong focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="submit"
                  className="pixel-btn-primary px-5 py-2.5 text-xs font-mono font-bold tracking-wider"
                >
                  TRANSMIT MESSAGE →
                </button>

                {sentNotice && (
                  <span className="font-mono text-xs text-emerald-400">
                    ✓ Mail client triggered!
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
