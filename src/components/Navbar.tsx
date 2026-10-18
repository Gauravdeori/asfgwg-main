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
          <span className="font-pixel text-[13px] tracking-wider text-text font-bold">
            {portfolioData.profile.name}
          </span>
          <span className="font-mono text-xs text-text-muted">
            &gt;<span className="cursor-blink text-highlight">_</span>
          </span>
        </button>

        {/* Center: Section-Wise Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
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
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <a
            href="mailto:deorigaurav1400@gmail.com"
            className="pixel-btn-primary px-3 py-1.5 text-[11.5px] font-mono font-bold tracking-wider hidden sm:inline-flex"
            id="nav-talk-btn"
          >
            <span>&lt;/&gt;</span>
            <span>LET&apos;S TALK</span>
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1 border border-border bg-surface text-text hover:bg-surface-2"
          >
            <span className="w-4 h-[2px] bg-currentColor" />
            <span className="w-4 h-[2px] bg-currentColor" />
            <span className="w-4 h-[2px] bg-currentColor" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden max-w-[1200px] mx-auto mt-1 bg-surface border border-border p-4 shadow-lg flex flex-col gap-2.5">
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
