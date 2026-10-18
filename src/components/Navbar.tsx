import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  currentSection: string;
  onSelectSection: (sectionId: string) => void;
  viewMode: 'section' | 'all';
  onToggleViewMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onSelectSection,
  viewMode,
  onToggleViewMode,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    onSelectSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full pt-3 pb-2 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto bg-surface/90 backdrop-blur-md border border-border px-3 sm:px-4 py-2 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={(e) => handleNavClick('home', e)}
          className="flex items-center gap-2 group cursor-pointer focus-visible:outline-none text-left"
        >
          <div className="w-6 h-6 border border-border overflow-hidden flex-shrink-0 bg-surface-2 flex items-center justify-center">
            <img
              src={portfolioData.profile.avatar}
              alt={portfolioData.profile.name}
              className="w-full h-full object-cover pixelated"
            />
          </div>
          <span className="font-pixel text-[12px] sm:text-[13px] tracking-wider text-text font-bold whitespace-nowrap">
            {portfolioData.profile.name}
          </span>
          <span className="font-mono text-xs text-text-muted hidden min-[400px]:inline">
            &gt;<span className="cursor-blink text-highlight">_</span>
          </span>
        </button>

        {/* Center: Section-Wise Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-6">
          {portfolioData.navigation.map((item) => {
            const isActive = viewMode === 'section' && currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`font-mono text-[12px] uppercase transition-all tracking-wide flex items-center gap-1 cursor-pointer py-1 px-1.5 ${
                  isActive
                    ? 'text-accent bg-accent/10 border-b-2 border-accent font-bold'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                <span className="text-text-muted/70 text-[11px]">{item.number}</span>
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Toggle for View All vs Section Mode */}
          <button
            onClick={onToggleViewMode}
            title={viewMode === 'all' ? 'Switch to Section-Wise View' : 'Switch to Continuous Full Page View'}
            className={`font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 border transition-all cursor-pointer select-none ${
              viewMode === 'all'
                ? 'bg-accent text-accent-ink border-accent font-bold'
                : 'border-border text-text-muted hover:text-text hover:border-border-strong'
            }`}
          >
            {viewMode === 'all' ? '[• VIEWING ALL]' : '[ VIEW ALL ]'}
          </button>
        </nav>

        {/* Right side: Theme Toggle + Let's Talk CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          <ThemeToggle />

          {/* Wrapper carries the visibility: .pixel-btn-primary sets display and would override `hidden` */}
          <span className="hidden sm:inline-flex">
            <a
              href="mailto:deorigaurav1400@gmail.com"
              className="pixel-btn-primary px-3 py-1.5 text-[11.5px] font-mono font-bold tracking-wider whitespace-nowrap"
              id="nav-talk-btn"
            >
              <span>&lt;/&gt;</span>
              <span>LET&apos;S TALK</span>
            </a>
          </span>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden w-8 h-8 flex flex-col items-center justify-center gap-1 border border-border bg-surface text-text hover:bg-surface-2"
          >
            {isMobileMenuOpen ? (
              <span className="font-mono text-sm leading-none">✕</span>
            ) : (
              <>
                <span className="w-4 h-[2px] bg-current" />
                <span className="w-4 h-[2px] bg-current" />
                <span className="w-4 h-[2px] bg-current" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute left-4 right-4 sm:left-6 sm:right-6 top-full -mt-1 bg-surface border border-border p-3 shadow-pixel-lg flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
          {portfolioData.navigation.map((item) => (
            <button
              key={item.id}
              onClick={(e) => handleNavClick(item.id, e)}
              className={`font-mono text-xs py-2 px-2 flex items-center justify-between border-b border-border/40 text-left ${
                viewMode === 'section' && currentSection === item.id
                  ? 'bg-accent/10 text-accent font-bold'
                  : 'text-text'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-text-muted">{item.number}</span>
                <span>{item.label}</span>
              </div>
              {viewMode === 'section' && currentSection === item.id && (
                <span className="text-highlight">▶</span>
              )}
            </button>
          ))}

          <button
            onClick={() => {
              onToggleViewMode();
              setIsMobileMenuOpen(false);
            }}
            className="py-1.5 px-2 border border-border font-mono text-xs text-center text-text-muted"
          >
            {viewMode === 'all' ? 'SWITCH TO SECTION-WISE' : 'VIEW ALL SECTIONS CONTINUOUSLY'}
          </button>

          <a
            href="mailto:deorigaurav1400@gmail.com"
            onClick={() => setIsMobileMenuOpen(false)}
            className="pixel-btn-primary w-full py-2 text-xs font-mono font-bold mt-1 text-center"
          >
            &lt;/&gt; LET&apos;S TALK
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
