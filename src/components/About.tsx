import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';

export const About: React.FC = () => {
  const { about, education, certifications } = portfolioData;
  const [subTab, setSubTab] = useState<'bio' | 'story' | 'education' | 'certs'>('bio');

  return (
    <div className="flex flex-col justify-between">
      <div>
        {/* Eyebrow & Sub-tab switcher */}
        <div className="flex flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-2">
          <div className="font-mono text-xs text-text-muted tracking-wider whitespace-nowrap">
            {about.eyebrow}
          </div>

          <div className="flex items-center border border-border bg-surface text-[10px] font-mono overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setSubTab('bio')}
              className={`px-2 py-1 select-none transition-colors whitespace-nowrap ${
                subTab === 'bio'
                  ? 'bg-accent text-accent-ink font-bold'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              [ BIO ]
            </button>
            <button
              onClick={() => setSubTab('story')}
              className={`px-2 py-1 select-none transition-colors whitespace-nowrap ${
                subTab === 'story'
                  ? 'bg-accent text-accent-ink font-bold'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              [ PHILOSOPHY ]
            </button>
            <button
              onClick={() => setSubTab('education')}
              className={`px-2 py-1 select-none transition-colors whitespace-nowrap ${
                subTab === 'education'
                  ? 'bg-accent text-accent-ink font-bold'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              [ EDUCATION ]
            </button>
            <button
              onClick={() => setSubTab('certs')}
              className={`px-2 py-1 select-none transition-colors whitespace-nowrap ${
                subTab === 'certs'
                  ? 'bg-accent text-accent-ink font-bold'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              [ CERTIFICATE ]
            </button>
          </div>
        </div>

        {/* Section Title */}
        <h2 className="font-pixel text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-text uppercase tracking-wide mb-5 sm:mb-8">
          {subTab === 'bio'
            ? about.title
            : subTab === 'story'
            ? 'MY PHILOSOPHY'
            : subTab === 'education'
            ? 'EDUCATION'
            : 'CERTIFICATIONS'}
        </h2>

        {/* Tab 1: Bio Story & Portrait (from Screenshot) */}
        {subTab === 'bio' && (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-start animate-in fade-in duration-200">
            {/* Portrait with thick stepped corners frame */}
            <div className="sm:col-span-5 flex-shrink-0">
              <div className="stepped-frame max-w-[210px] mx-auto sm:mx-0">
                <div className="relative border border-border bg-surface-2 overflow-hidden aspect-square">
                  <img
                    src={about.portraitDark}
                    alt="Gaurav Deori pixel art portrait dark"
                    className="w-full h-full object-cover pixelated block dark-only"
                  />
                  <img
                    src={about.portraitLight}
                    alt="Gaurav Deori pixel art portrait light"
                    className="w-full h-full object-cover pixelated block light-only"
                  />
                </div>
              </div>

              {/* System Specs Readout */}
              <div className="mt-3 border border-border/80 bg-surface p-2 text-[10px] font-mono space-y-1">
                {about.systemSpecs.slice(0, 3).map((spec) => (
                  <div key={spec.key} className="flex justify-between text-text-muted">
                    <span className="text-text-muted/60">{spec.key}:</span>
                    <span className="text-text font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio text paragraphs */}
            <div className="sm:col-span-7 flex flex-col justify-between">
              <div className="space-y-4">
                {about.paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="font-mono text-xs sm:text-[13px] text-text-muted leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-5 sm:mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={about.buttonUrl}
                  className="pixel-btn-primary px-5 py-2.5 text-xs font-mono font-bold tracking-wider"
                  id="about-learn-more-btn"
                >
                  {about.buttonText}
                </a>

                <button
                  onClick={() => setSubTab('story')}
                  className="pixel-btn-outline px-3.5 py-2.5 text-xs font-mono font-medium text-text-muted hover:text-text"
                >
                  READ STORY →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Full Story & Philosophy (from previous profile.json & Skills.tsx) */}
        {subTab === 'story' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Major Philosophy Statement from old Skills.tsx */}
            <div className="border border-border bg-surface-2 p-3 sm:p-4">
              <span className="font-mono text-[10px] text-highlight uppercase tracking-wider block mb-1">
                // WHAT I DO · CORE PHILOSOPHY
              </span>
              <p className="font-mono text-xs sm:text-sm font-bold text-text leading-relaxed">
                &quot;{about.philosophyStatement || 'I turn ideas into clean, modern, responsive websites — interfaces that feel obvious, code that stays maintainable, and details that quietly do the work.'}&quot;
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-[10.5px] font-mono text-text-muted">
                <span className="border border-border px-2 py-0.5 bg-surface text-text">
                  MOTTO: {about.motto || 'I build. I break. I learn. I ship.'}
                </span>
                <span className="border border-border px-2 py-0.5 bg-surface text-text">
                  MISSION: {about.statement || 'Code is the tool. Building is the purpose.'}
                </span>
              </div>
            </div>

            {about.extendedParagraphs.map((para, idx) => (
              <p
                key={idx}
                className="font-mono text-xs sm:text-[13px] text-text-muted leading-relaxed"
              >
                {para}
              </p>
            ))}

            {/* Core Traits Chips */}
            <div className="pt-3 border-t border-border flex flex-wrap gap-2 items-center">
              <span className="text-[11px] font-mono text-text-muted">TRAITS:</span>
              {about.traits.map((trait) => (
                <span
                  key={trait}
                  className="border border-border bg-surface-2 px-2 py-0.5 text-[10.5px] font-mono text-text"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Education Records (from previous repo) */}
        {subTab === 'education' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            {education.map((edu) => (
              <div
                key={edu.institution}
                className="border border-border bg-surface p-3.5 hover:border-border-strong transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-text">
                    {edu.degree}
                  </span>
                  <span className="font-mono text-[10px] text-text-muted border border-border px-1.5 py-0.5 bg-surface-2">
                    {edu.period}
                  </span>
                </div>
                <div className="font-mono text-xs text-text-muted font-medium mb-1">
                  {edu.institution}
                </div>
                {edu.focus && (
                  <p className="font-mono text-[11px] text-text-muted/80">
                    Focus: {edu.focus}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Certifications (from previous repo with image preview) */}
        {subTab === 'certs' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="border border-border bg-surface p-4 hover:border-border-strong transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-2">
                  <span className="w-1.5 h-1.5 bg-highlight inline-block" />
                  <span>{cert.issuer}</span>
                  <span>•</span>
                  <span>{cert.date}</span>
                </div>
                <h3 className="font-mono text-sm font-bold text-text mb-2">
                  {cert.title}
                </h3>
                <div className="font-mono text-xs text-text-muted mb-3">
                  Instructor: {cert.instructor} | Duration: {cert.duration}
                </div>

                {cert.image && (
                  <div className="border border-border mb-3 overflow-hidden max-w-sm bg-surface-2">
                    <img
                      src={cert.image}
                      alt={`${cert.title} Certificate`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-btn-outline px-3 py-1.5 text-xs font-mono font-bold inline-block"
                >
                  VIEW VERIFIED CREDENTIAL ↗
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
