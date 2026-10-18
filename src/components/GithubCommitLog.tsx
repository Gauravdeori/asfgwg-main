import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { portfolioData } from '../data/portfolio';

export const GithubCommitLog: React.FC = () => {
  const { socials } = portfolioData;
  const username = socials.github.split('/').pop() || 'Gauravdeori';

  return (
    <div className="border border-border bg-surface p-4 sm:p-6 transition-colors">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-border/40">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-text-muted font-bold">
            @{username}
          </span>
          <span className="text-text-muted/40 font-mono text-xs">/</span>
          <span className="font-mono text-xs text-text font-bold tracking-wider">
            CONTRIBUTION_STREAM
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted">
            <span className="w-2 h-2 bg-emerald-500 inline-block animate-pulse" />
            <span>LIVE SYNC</span>
          </div>

          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="pixel-btn-outline px-2.5 py-1 text-[11px] font-mono font-bold"
          >
            VIEW PROFILE ↗
          </a>
        </div>
      </div>

      {/* GitHub Calendar Container */}
      <div className="overflow-x-auto py-2 font-mono flex justify-center text-xs">
        <GitHubCalendar
          username={username}
          blockSize={12}
          blockMargin={4}
          blockRadius={0}
          fontSize={11}
          theme={{
            light: ['#eceee9', '#c5cac0', '#8d9685', '#485242', '#141812'],
            dark: ['#1c1c1c', '#2c3328', '#3e5236', '#597d4c', '#a3e635'],
          }}
        />
      </div>

      {/* Footer Readout */}
      <div className="mt-4 pt-3 border-t border-border/40 flex flex-wrap items-center justify-between gap-2 text-[10.5px] font-mono text-text-muted">
        <div>
          <span>REPOSITORIES: </span>
          <span className="text-text font-bold">PUBLIC & VERIFIED</span>
        </div>
        <div>
          <span>PLATFORM: </span>
          <span className="text-text font-bold">GITHUB ENTERPRISE / OS</span>
        </div>
        <div>
          <span>ACTIVITY: </span>
          <span className="text-text font-bold">PERSISTENT SHIPPER</span>
        </div>
      </div>
    </div>
  );
};

export default GithubCommitLog;
