import React from 'react';
import { portfolioData } from '../data/portfolio';

export const Footer: React.FC = () => {
  const { footer } = portfolioData;

  return (
    <footer className="raised w-full !border-x-0 !border-b-0 mt-8 py-3 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        {/* Left Side: Brand Box + Motto */}
        <div className="flex items-center gap-2.5">
          <div className="sunken px-2 py-0.5 font-pixel text-[10px] text-text tracking-wider uppercase select-none">
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
