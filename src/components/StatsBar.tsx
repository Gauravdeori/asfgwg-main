import React from 'react';
import { portfolioData, StatItem } from '../data/portfolio';

const StatIcon: React.FC<{ type: StatItem['icon'] }> = ({ type }) => {
  switch (type) {
    case 'cube':
      return (
        <svg
          className="w-6 h-6 text-text flex-shrink-0 pixelated"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          {/* Isometric Cube Pixel lines */}
          <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" />
          <path d="M12 22V12" />
          <path d="M21 7L12 12L3 7" />
        </svg>
      );
    case 'star':
      return (
        <svg
          className="w-6 h-6 text-text flex-shrink-0 pixelated"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          {/* 5-pointed pixel star */}
          <path d="M12 2L15 8.5L22 9.5L17 14.5L18.5 21.5L12 18L5.5 21.5L7 14.5L2 9.5L9 8.5L12 2Z" />
        </svg>
      );
    case 'trophy':
      return (
        <svg
          className="w-6 h-6 text-text flex-shrink-0 pixelated"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          {/* Trophy Cup */}
          <path d="M6 3H18V10C18 13.3 15.3 16 12 16C8.7 16 6 13.3 6 10V3Z" />
          <path d="M6 6H3C2.4 6 2 6.4 2 7V8C2 9.7 3.3 11 5 11H6" />
          <path d="M18 6H21C21.6 6 22 6.4 22 7V8C22 9.7 20.7 11 19 11H18" />
          <path d="M12 16V19" />
          <path d="M8 21H16" />
        </svg>
      );
    case 'users':
      return (
        <svg
          className="w-6 h-6 text-text flex-shrink-0 pixelated"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          {/* Users / Community */}
          <circle cx="9" cy="7" r="4" />
          <path d="M2 20C2 16.5 5 14 9 14C13 14 16 16.5 16 20" />
          <path d="M16 3.5C17.5 4.3 18.5 5.8 18.5 7.5C18.5 9.2 17.5 10.7 16 11.5" />
          <path d="M19 14.5C21 15.5 22 17.5 22 20" />
        </svg>
      );
    default:
      return null;
  }
};

export const StatsBar: React.FC = () => {
  const { stats } = portfolioData;

  return (
    <section className="relative px-4 sm:px-6 -mt-[1px] z-20">
      <div className="max-w-[1200px] mx-auto border border-border bg-surface">
        {/* gap-px over a border-colored background draws the 1px dividers for any column count */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-surface p-3.5 sm:p-5 flex flex-col sm:flex-row items-start gap-2 sm:gap-3.5"
            >
              <div className="sm:p-1 text-text sm:mt-0.5">
                <StatIcon type={stat.icon} />
              </div>

              <div className="min-w-0">
                <div className="font-pixel text-[17px] sm:text-[19px] font-bold text-text leading-tight tracking-wide">
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] sm:text-[11.5px] text-text-muted mt-1 leading-snug">
                  {stat.label}
                </div>
                {stat.sublabel && (
                  <div className="font-mono text-[10.5px] text-text-muted/80 leading-snug">
                    {stat.sublabel}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
