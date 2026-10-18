import React from 'react';
import { portfolioData } from '../data/portfolio';

export const Hero: React.FC = () => {
  const { profile, socials } = portfolioData;

  return (
    <section id="home" className="relative pt-4 sm:pt-6 pb-2 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto border border-border bg-surface/40 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Column: Bio & Info */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between z-10">
            <div>
              {/* Eyebrow */}
              <div className="font-mono text-[11px] sm:text-xs text-text-muted tracking-wider mb-4 sm:mb-6">
                {profile.eyebrow}
              </div>

              {/* Huge 2-line Heading */}
              <h1 className="font-pixel text-[46px] sm:text-[68px] lg:text-[80px] xl:text-[88px] font-bold tracking-tight text-text leading-[0.9] uppercase mb-5 sm:mb-6 select-none">
                <span className="block">{profile.firstName}</span>
                <span className="block">{profile.lastName}</span>
              </h1>

              {/* Tagline Paragraph */}
              <p className="font-mono text-xs sm:text-[13.5px] leading-relaxed text-text mb-3 max-w-[420px]">
                {profile.tagline}
              </p>

              {/* Muted Subline */}
              <p className="font-mono text-xs sm:text-[13px] leading-relaxed text-text-muted mb-6 sm:mb-8 max-w-[420px]">
                {profile.subline}
              </p>
            </div>

            <div>
              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
                <a
                  href={profile.viewWorkAnchor}
                  className="pixel-btn-primary px-4 sm:px-5 py-2.5 text-xs font-mono font-bold tracking-wide"
                  id="hero-view-work-btn"
                >
                  <span>▶</span>
                  <span>VIEW MY WORK</span>
                </a>

                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-btn-outline px-4 sm:px-5 py-2.5 text-xs font-mono font-bold tracking-wide"
                  id="hero-download-cv-btn"
                >
                  <span>⤓</span>
                  <span>DOWNLOAD CV</span>
                </a>
              </div>

              {/* Social Icons Row */}
              <div className="flex items-center gap-3">
                {/* GitHub */}
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="w-8 h-8 border border-border bg-surface hover:border-border-strong hover:bg-surface-2 flex items-center justify-center text-text transition-colors"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-8 h-8 border border-border bg-surface hover:border-border-strong hover:bg-surface-2 flex items-center justify-center text-text transition-colors"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram Profile"
                  className="w-8 h-8 border border-border bg-surface hover:border-border-strong hover:bg-surface-2 flex items-center justify-center text-text transition-colors"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href={socials.x}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X (Twitter) Profile"
                  className="w-8 h-8 border border-border bg-surface hover:border-border-strong hover:bg-surface-2 flex items-center justify-center text-text transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Pixel Art Illustration */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[460px] flex items-center justify-center overflow-hidden border-t lg:border-t-0 lg:border-l border-border bg-surface-2">
            {/* Dark Mode Illustration */}
            <img
              src={profile.heroImageDark}
              alt="Pixel-art illustration of Gaurav overlooking Dibrugarh city at dusk"
              className="w-full h-full object-cover object-center pixelated block dark-only"
            />

            {/* Light Mode Illustration */}
            <img
              src={profile.heroImageLight}
              alt="Pixel-art illustration of Gaurav overlooking Dibrugarh city in daytime"
              className="w-full h-full object-cover object-center pixelated block light-only"
            />

            {/* Light Mode Overlays (in dark mode they are baked into the artwork) */}
            <div className="light-only absolute top-[30%] left-[44%] bg-surface/95 border border-border p-2.5 shadow-sm text-text font-mono text-[9px] leading-relaxed hidden sm:block pointer-events-none select-none z-10">
              <div className="font-bold">IDEAS</div>
              <div>CODE</div>
              <div>PRODUCTS</div>
              <div>COMMUNITY</div>
              <div>AND MORE...</div>
            </div>

            <div className="light-only absolute top-3.5 right-3.5 bg-surface/90 border border-border px-2 py-1 flex items-center gap-1.5 pointer-events-none select-none z-10">
              <div className="w-2 h-2 bg-highlight" />
              <div className="text-[9px] font-mono leading-tight uppercase">
                <div className="font-bold text-text">DIBRUGARH</div>
                <div className="text-text-muted">ASSAM, INDIA</div>
              </div>
            </div>

            {/* Twinkling Pixel Stars Overlay (Dark Mode) */}
            <div className="dark-only absolute inset-0 pointer-events-none overflow-hidden">
              <span
                className="twinkle-star absolute w-1.5 h-1.5 bg-white shadow-sm"
                style={{ top: '12%', left: '20%', animationDelay: '0.2s' }}
              />
              <span
                className="twinkle-star absolute w-1 h-1 bg-white"
                style={{ top: '22%', left: '42%', animationDelay: '0.9s' }}
              />
              <span
                className="twinkle-star absolute w-1.5 h-1.5 bg-white"
                style={{ top: '15%', right: '35%', animationDelay: '1.4s' }}
              />
              <span
                className="twinkle-star absolute w-1 h-1 bg-white"
                style={{ top: '8%', right: '18%', animationDelay: '0.6s' }}
              />
              <span
                className="twinkle-star absolute w-1.5 h-1.5 bg-cyan-200"
                style={{ top: '28%', left: '26%', animationDelay: '1.8s' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
