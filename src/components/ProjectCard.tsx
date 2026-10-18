import React, { useState } from 'react';
import { ProjectItem } from '../data/portfolio';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showBrief, setShowBrief] = useState(false);

  return (
    <div className="pixel-card p-3 sm:p-4 flex flex-col justify-between group">
      <div>
        {/* Framed Thumbnail with Overlapping Arrow Button */}
        <div className="relative border border-border/80 bg-surface-2 overflow-hidden mb-3.5">
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
            className="project-arrow-btn absolute bottom-0 right-0 w-7 h-7 bg-surface border-t border-l border-border flex items-center justify-center text-text text-[13px] font-mono font-bold transition-colors select-none"
          >
            ↗
          </a>
        </div>

        {/* Title with small icon */}
        <h3 className="font-mono text-[15px] sm:text-[16.5px] font-bold text-text flex items-center justify-between gap-2 mb-2">
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
              className="flex-shrink-0 whitespace-nowrap text-[10px] font-mono border border-border px-1.5 py-0.5 text-text-muted hover:text-text hover:border-border-strong bg-surface-2 transition-colors select-none"
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
          <div className="mb-4 p-3 border border-border bg-surface-2/80 space-y-2.5 animate-in fade-in duration-150">
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
            className="border border-border/80 bg-surface-2 px-2.5 py-1 text-[10.5px] sm:text-[11px] font-mono text-text/90 tracking-wide select-none"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
