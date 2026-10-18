import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';
import TechLogo from './TechLogos';
import GithubCommitLog from './GithubCommitLog';

export const TechStack: React.FC = () => {
  const { techStack, experiences, buildLog } = portfolioData;
  const [activeTab, setActiveTab] = useState<'skills' | 'roles' | 'pipeline' | 'github'>('skills');

  return (
    <div className="flex flex-col justify-between">
      <div>
        {/* Eyebrow & View Switcher */}
        <div className="flex flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-2">
          <div className="font-mono text-xs text-text-muted tracking-wider whitespace-nowrap">
            {activeTab === 'skills'
              ? techStack.eyebrow
              : activeTab === 'roles'
              ? '// ROLES & VENTURES'
              : activeTab === 'pipeline'
              ? '// ENGINEERING LOG'
              : '// GITHUB ACTIVITY'}
          </div>

          {/* Quick tab switcher */}
          <div className="flex items-center border border-border bg-surface text-[10px] font-mono overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-2 py-1 select-none transition-colors whitespace-nowrap ${
                activeTab === 'skills'
                  ? 'bg-accent text-accent-ink font-bold'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              [ SKILLS ]
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`px-2 py-1 select-none transition-colors whitespace-nowrap ${
                activeTab === 'roles'
                  ? 'bg-accent text-accent-ink font-bold'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              [ ROLES ({experiences.length}) ]
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-2 py-1 select-none transition-colors whitespace-nowrap ${
                activeTab === 'pipeline'
                  ? 'bg-accent text-accent-ink font-bold'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              [ BUILD LOG ]
            </button>
            <button
              onClick={() => setActiveTab('github')}
              className={`px-2 py-1 select-none transition-colors whitespace-nowrap ${
                activeTab === 'github'
                  ? 'bg-accent text-accent-ink font-bold'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              [ GITHUB ]
            </button>
          </div>
        </div>

        {/* Section Title with boxed icon */}
        <div className="flex items-center gap-3 mb-5 sm:mb-8">
          <h2 className="font-pixel text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-text uppercase tracking-wide">
            {activeTab === 'skills'
              ? techStack.title
              : activeTab === 'roles'
              ? 'EXPERIENCE'
              : activeTab === 'pipeline'
              ? 'BUILD LOG'
              : 'COMMIT LOG'}
          </h2>
          <div className="w-6 h-6 border border-border flex items-center justify-center font-mono text-[11px] text-text-muted select-none">
            {activeTab === 'skills' ? '</>' : activeTab === 'roles' ? '✦' : activeTab === 'pipeline' ? '⚡' : '⌥'}
          </div>
        </div>

        {/* TAB 1: 5 columns x 3 rows grid of 15 square tiles (from Screenshot) */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-2.5 animate-in fade-in duration-200">
            {techStack.items.map((tech) => (
              <div
                key={tech.name}
                className="aspect-square border border-border bg-surface hover:border-border-strong hover:bg-surface-2 transition-colors p-2 flex flex-col items-center justify-center text-center group cursor-default select-none"
              >
                <div className="transition-transform duration-150 group-hover:-translate-y-0.5 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8">
                  <TechLogo iconId={tech.iconId} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] text-text-muted group-hover:text-text transition-colors mt-1.5 line-clamp-1">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Roles and Ventures from previous repo */}
        {activeTab === 'roles' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className="border border-border bg-surface hover:border-border-strong p-3.5 transition-colors group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-text-muted text-[11px] font-bold">
                      [{exp.number}]
                    </span>
                    <h3 className="font-mono text-sm font-bold text-text group-hover:text-accent">
                      {exp.company}
                    </h3>
                  </div>

                  <span className="font-mono text-[10px] text-text-muted border border-border px-1.5 py-0.5 bg-surface-2">
                    {exp.period}
                  </span>
                </div>

                <div className="font-mono text-xs text-text-muted font-medium mb-1">
                  {exp.title}
                </div>

                <p className="font-mono text-[11.5px] text-text-muted/80 leading-relaxed mb-2">
                  {exp.description}
                </p>

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="mb-2 space-y-0.5">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="text-[10.5px] font-mono text-text-muted/70 flex items-start gap-1.5">
                        <span className="text-highlight">›</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exp.url && (
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-text hover:underline"
                  >
                    <span>VISIT VENTURE</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Build Log Pipeline from previous system.ts */}
        {activeTab === 'pipeline' && (
          <div className="space-y-2.5 animate-in fade-in duration-200">
            {buildLog.map((log) => (
              <div
                key={log.index}
                className="border border-border bg-surface p-3 hover:border-border-strong transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-text">
                    PHASE {log.index} // {log.phase}
                  </span>
                  <span className="w-2 h-2 bg-highlight" />
                </div>
                <p className="font-mono text-xs text-text-muted leading-relaxed">
                  {log.body}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: Live GitHub Contributions Log */}
        {activeTab === 'github' && (
          <div className="animate-in fade-in duration-200">
            <GithubCommitLog />
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStack;
