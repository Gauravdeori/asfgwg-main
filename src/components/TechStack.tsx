import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';
import TechLogo from './TechLogos';
import GithubCommitLog from './GithubCommitLog';

const LEVEL_MAX = 7;

const TABS = [
  { id: 'skills', label: '[ SKILLS ]' },
  { id: 'roles', label: '[ ROLES ]' },
  { id: 'pipeline', label: '[ BUILD LOG ]' },
  { id: 'github', label: '[ GITHUB ]' },
] as const;

type TabId = (typeof TABS)[number]['id'];

/** Seven-square proficiency meter; a .5 level renders a half-filled square */
const LevelMeter: React.FC<{ level: number }> = ({ level }) => (
  <div
    className="flex items-center gap-[3px] sm:gap-1 mt-3"
    role="img"
    aria-label={`Proficiency ${level} out of ${LEVEL_MAX}`}
  >
    {Array.from({ length: LEVEL_MAX }).map((_, i) => {
      const fill = Math.max(0, Math.min(1, level - i));
      return (
        <span
          key={i}
          className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-border"
          style={
            fill > 0
              ? {
                  background:
                    fill === 1
                      ? 'var(--skill)'
                      : `linear-gradient(to right, var(--skill) ${fill * 100}%, var(--border) ${fill * 100}%)`,
                }
              : undefined
          }
        />
      );
    })}
  </div>
);

interface TechStackProps {
  /** Narrow container (e.g. half-width column): cap the skill grid at 3 columns */
  compact?: boolean;
}

export const TechStack: React.FC<TechStackProps> = ({ compact = false }) => {
  const { techStack, experiences, buildLog } = portfolioData;
  const [activeTab, setActiveTab] = useState<TabId>('skills');

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
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono overflow-x-auto no-scrollbar max-w-full">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                aria-pressed={activeTab === id}
                className={`px-2.5 sm:px-3 py-1.5 border select-none transition-colors whitespace-nowrap ${
                  activeTab === id
                    ? 'bg-accent text-accent-ink border-accent font-bold'
                    : 'border-border bg-surface text-text-muted hover:text-text hover:border-border-strong'
                }`}
              >
                {id === 'roles' ? `[ ROLES (${experiences.length}) ]` : label}
              </button>
            ))}
          </div>
        </div>

        {/* Section Title with boxed icon */}
        <div className={`flex items-center gap-3 ${activeTab === 'skills' && techStack.subtitle ? 'mb-2 sm:mb-3' : 'mb-5 sm:mb-8'}`}>
          <h2 className="font-pixel text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-text uppercase tracking-wide">
            {activeTab === 'skills'
              ? techStack.title
              : activeTab === 'roles'
              ? 'EXPERIENCE'
              : activeTab === 'pipeline'
              ? 'BUILD LOG'
              : 'COMMIT LOG'}
          </h2>
          <div className="w-7 h-7 sm:w-8 sm:h-8 border border-border flex items-center justify-center font-mono text-[11px] sm:text-xs text-text-muted select-none">
            {activeTab === 'skills' ? '</>' : activeTab === 'roles' ? '✦' : activeTab === 'pipeline' ? '⚡' : '⌥'}
          </div>
        </div>

        {/* TAB 1: Skill cards with index, link, category and proficiency meter */}
        {activeTab === 'skills' && (
          <div className="animate-in fade-in duration-200">
            {techStack.subtitle && (
              <p className="font-mono text-xs sm:text-[13px] text-text-muted leading-relaxed max-w-[520px] mb-5 sm:mb-7">
                {techStack.subtitle}
              </p>
            )}

            <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 ${compact ? '' : 'lg:grid-cols-5'}`}>
              {techStack.items.map((tech, idx) => (
                <div key={tech.name} className="tech-card p-3 sm:p-4 flex flex-col select-none">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[10px] sm:text-[11px] text-text-muted tracking-wider">
                      [{String(idx + 1).padStart(2, '0')}]
                    </span>
                    {tech.url && (
                      <a
                        href={tech.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${tech.name} website`}
                        className="tech-card-arrow w-6 h-6 sm:w-7 sm:h-7 border border-border flex items-center justify-center font-mono text-xs text-text-muted transition-colors flex-shrink-0"
                      >
                        ↗
                      </a>
                    )}
                  </div>

                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center -mt-1 sm:-mt-0.5">
                    <TechLogo iconId={tech.iconId} className="w-full h-full object-contain" />
                  </div>

                  <h3 className="font-mono text-[14px] sm:text-[17px] font-medium text-text mt-2.5 sm:mt-3 leading-tight truncate">
                    {tech.name}
                  </h3>
                  {tech.category && (
                    <div className="font-mono text-[10.5px] sm:text-xs text-text-muted mt-1 truncate">
                      {tech.category}
                    </div>
                  )}

                  {tech.level !== undefined && <LevelMeter level={tech.level} />}
                </div>
              ))}

              {/* Fills the empty slot an odd item count leaves in the 2-column mobile grid */}
              {techStack.items.length % 2 === 1 && (
                <div className="sm:hidden border border-dashed border-border flex flex-col items-center justify-center gap-1.5 p-3 text-center font-mono select-none">
                  <span className="text-skill text-lg leading-none">+</span>
                  <span className="text-[10.5px] text-text-muted leading-snug">ALWAYS ADDING<br />MORE TOOLS</span>
                </div>
              )}
            </div>

            <div className="mt-5 sm:mt-6 font-mono text-[11px] text-text-muted tracking-wider">
              &gt; CONSTANTLY LEARNING...
              <span className="cursor-blink inline-block w-2 h-3.5 bg-skill align-middle ml-1" />
            </div>
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
