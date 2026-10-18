import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';
import ProjectCard from './ProjectCard';

export const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState<'featured' | 'all' | 'saas' | 'iot' | 'ecommerce' | 'web' | 'game'>('featured');

  const filteredItems = projects.items.filter((item) => {
    if (activeFilter === 'featured') return item.featured;
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section id="projects" className="pt-12 sm:pt-16 pb-4 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-border/40">
          <div>
            {/* Eyebrow */}
            <div className="font-mono text-xs text-text-muted tracking-wider mb-2">
              {projects.eyebrow}
            </div>

            {/* Title with boxed > icon */}
            <div className="flex items-center gap-3">
              <h2 className="font-pixel text-[28px] sm:text-[34px] lg:text-[36px] font-bold text-text uppercase tracking-wide">
                {projects.title}
              </h2>
              <div className="w-6 h-6 border border-border flex items-center justify-center font-mono text-xs text-text-muted select-none">
                &gt;
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:text-right">
            <p className="font-mono text-xs sm:text-[12.5px] text-text-muted max-w-[340px] leading-relaxed">
              {projects.subtitle}
            </p>

            {/* Filter Toggle */}
            <div className="flex items-center gap-1 border border-border bg-surface p-1 text-[11px] font-mono">
              <button
                onClick={() => setActiveFilter('featured')}
                className={`px-2.5 py-1 transition-colors select-none ${
                  activeFilter === 'featured'
                    ? 'bg-accent text-accent-ink font-bold'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                [ FEATURED (6) ]
              </button>
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-2.5 py-1 transition-colors select-none ${
                  activeFilter === 'all'
                    ? 'bg-accent text-accent-ink font-bold'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                [ ALL ({projects.items.length}) ]
              </button>
            </div>
          </div>
        </div>

        {/* Category Chips Sub-Bar */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar font-mono text-[11px]">
          <span className="text-text-muted mr-1">FILTER:</span>
          {(['saas', 'iot', 'ecommerce', 'web', 'game'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(activeFilter === cat ? 'all' : cat)}
              className={`border px-2 py-0.5 uppercase transition-colors select-none whitespace-nowrap ${
                activeFilter === cat
                  ? 'border-accent bg-accent text-accent-ink font-bold'
                  : 'border-border bg-surface text-text-muted hover:text-text hover:border-border-strong'
              }`}
            >
              {cat === 'saas'
                ? 'SAAS & AI'
                : cat === 'iot'
                ? 'IOT / HARDWARE'
                : cat === 'ecommerce'
                ? 'E-COMMERCE'
                : cat === 'web'
                ? 'WEB APPS'
                : 'MINI GAMES'}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredItems.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
