import React, { useState } from 'react';
import { ProjectItem } from '../data/portfolio';
import { TitleBar } from './retro/Window';

const fileName = (title: string) =>
  title.toUpperCase().replace(/\(.*?\)/g, '').replace(/[^A-Z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 14) + '.EXE';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showBrief, setShowBrief] = useState(false);

  return (
    <div className="pixel-card flex flex-col group">
      <TitleBar title={fileName(project.title)} icon={project.featured ? 'folder' : 'file'} inactive />
      <div className="p-3 sm:p-4 flex flex-1 flex-col justify-between">
      <div>
        {/* Framed Thumbnail with Overlapping Arrow Button */}
        <div className="sunken relative p-[3px] overflow-hidden mb-3.5">
          <img
            src={project.imageDark}
            alt={project.title}
            className="w-full aspect-[16/7] object-cover pixelated block dark-only"
          />
          <img
            src={project.imageLight}
            alt={project.title}
            className="w-full aspect-[16/7] object-cover pixelated block light-only"
          />

          {/* Role Eyebrow on thumbnail */}
          {project.role && (
            <span className="absolute top-1.5 left-1.5 border border-border/80 bg-surface/90 px-2 py-0.5 font-mono text-[9.5px] font-bold text-text tracking-wider uppercase select-none">
              {project.role}
            </span>
          )}

          {/* Overlapping ↗ Button in bottom-right corner of thumbnail */}
          <a
            href={project.link || '#'}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open project ${project.title}`}
            className="project-arrow-btn absolute bottom-[3px] right-[3px] w-8 h-8 bg-surface border-t-2 border-l-2 border-ink flex items-center justify-center text-text text-[13px] font-mono font-bold transition-colors select-none"
          >
            ↗
          </a>
        </div>

        {/* Title with small icon */}
        <h3 className="font-display text-[19px] sm:text-[21px] font-bold text-text group-hover:text-accent flex items-center justify-between gap-2 mb-2">
          <span className="flex items-center gap-2 min-w-0">
            <span className="text-text-muted text-xs select-none">
              {project.id === 'waste-wise' || project.id === 'poba-express' ? '📍' : project.id === 'qrshield-ai' ? '🛡️' : '✦'}
            </span>
            <span>{project.title}</span>
          </span>

          {/* Expandable Brief Button */}
          {(project.caseStudy || project.longDescription) && (
            <button
              onClick={() => setShowBrief(!showBrief)}
              aria-expanded={showBrief}
              className="pixel-btn-outline !mb-1 flex-shrink-0 whitespace-nowrap text-[9px] px-1.5 py-1"
            >
              {showBrief ? '[ CLOSE ]' : '[ CASE STUDY ]'}
            </button>
          )}
        </h3>

        {/* Description */}
        <p className="font-mono text-[12px] sm:text-[12.5px] text-text-muted leading-relaxed mb-3 sm:mb-4">
          {project.description}
        </p>

        {/* Expandable Case Study Details (from old system.ts) */}
        {showBrief && (
          <div className="sunken mb-4 p-3 space-y-2.5 animate-in fade-in duration-150">
            {project.caseStudy?.problem && (
              <div>
                <span className="font-mono text-[10px] text-highlight font-bold uppercase block">
                  PROBLEM:
                </span>
                <p className="font-mono text-[11px] text-text-muted leading-relaxed">
                  {project.caseStudy.problem}
                </p>
              </div>
            )}

            {project.caseStudy?.solution && (
              <div>
                <span className="font-mono text-[10px] text-accent font-bold uppercase block">
                  SOLUTION:
                </span>
                <p className="font-mono text-[11px] text-text-muted leading-relaxed">
                  {project.caseStudy.solution}
                </p>
              </div>
            )}

            {project.caseStudy?.features && (
              <div>
                <span className="font-mono text-[10px] text-text-muted font-bold uppercase block mb-1">
                  CORE FEATURES:
                </span>
                <div className="flex flex-wrap gap-1">
                  {project.caseStudy.features.map((feat) => (
                    <span
                      key={feat}
                      className="border border-border bg-surface px-1.5 py-0.5 text-[9.5px] font-mono text-text"
                    >
                      › {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!project.caseStudy && project.longDescription && (
              <p className="font-mono text-[11px] text-text-muted leading-relaxed">
                {project.longDescription}
              </p>
            )}

            <div className="pt-1">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn-outline px-2.5 py-1 text-[10.5px] font-mono font-bold inline-flex items-center gap-1"
              >
                <span>OPEN LIVE PROJECT</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Outlined square tag chips */}
      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="border-2 border-ink bg-surface-2 px-2 py-0.5 text-[9.5px] font-pixel uppercase text-text tracking-wide select-none"
          >
            {tag}
          </span>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ProjectCard;
