import React from 'react';
import { portfolioData } from '../data/portfolio';

export const Footer: React.FC = () => {
  const { footer } = portfolioData;

  return (
    <footer className="w-full border-t border-border bg-surface/30 mt-6 py-4 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        {/* Left Side: Brand Box + Motto */}
        <div className="flex items-center gap-2.5">
          <div className="border border-border bg-surface px-1.5 py-0.5 font-pixel text-[10px] font-bold text-text tracking-wider uppercase select-none">
            {footer.brand}
          </div>
          <span className="text-text-muted text-[11px] sm:text-xs">
            {footer.motto}
          </span>
        </div>

        {/* Right Side: Location + Divider + Copyright */}
        <div className="flex items-center gap-2.5 text-text-muted text-[11px] sm:text-xs">
          <span>{footer.location}</span>
          <span className="text-border-strong select-none">|</span>
          <span>{footer.year}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
