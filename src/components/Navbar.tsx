import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { portfolioData } from '../data/portfolio';
import ThemeToggle from './ThemeToggle';
import PixelIcon from './retro/PixelIcon';
import { sfx } from '../lib/sfx';

interface NavbarProps {
  currentSection: string;
  onSelectSection: (sectionId: string) => void;
  viewMode: 'section' | 'all';
  onToggleViewMode: () => void;
}

function useClock() {
  const fmt = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 10_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const SoundToggle: React.FC = () => {
  const on = useSyncExternalStore(sfx.subscribe, sfx.get, () => true);
  return (
    <button
      type="button"
      onClick={() => sfx.set(!on)}
      aria-pressed={on}
      aria-label={on ? 'Mute click sounds' : 'Unmute click sounds'}
      title={on ? 'Sound on' : 'Sound off'}
      className="flex h-6 w-6 items-center justify-center text-text hover:bg-accent hover:text-accent-ink"
    >
      <PixelIcon name={on ? 'speaker' : 'mute'} size={16} />
    </button>
  );
};

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onSelectSection,
  viewMode,
  onToggleViewMode,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const time = useClock();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    onSelectSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full pt-3 pb-2 px-4 sm:px-6">
      <div className="win max-w-[1200px] mx-auto px-2 sm:px-3 py-1.5 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <button
          onClick={(e) => handleNavClick('home', e)}
          className="raised flex items-center gap-2 px-2 py-1 cursor-pointer text-left min-w-0"
          data-key
        >
          <div className="w-6 h-6 border-2 border-ink overflow-hidden flex-shrink-0 bg-surface-2 flex items-center justify-center">
            <img
              src={portfolioData.profile.avatar}
              alt={portfolioData.profile.name}
              className="w-full h-full object-cover pixelated"
            />
          </div>
          <span className="font-pixel text-[11px] sm:text-[12px] tracking-wider text-text whitespace-nowrap truncate">
            {portfolioData.profile.name}
          </span>
          <span className="font-mono text-base text-text-muted hidden min-[400px]:inline">
            &gt;<span className="cursor-blink text-highlight">_</span>
          </span>
        </button>

        {/* Center: Section-Wise Navigation Tabs (menu bar) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {portfolioData.navigation.map((item) => {
            const isActive = viewMode === 'section' && currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(item.id, e)}
                aria-current={isActive ? 'page' : undefined}
                className={`font-pixel text-[11px] uppercase tracking-wide flex items-center gap-1.5 cursor-pointer py-1.5 px-2 transition-colors duration-75 ${
                  isActive ? 'bg-accent text-accent-ink' : 'text-text hover:bg-text hover:text-bg'
                }`}
              >
                <span className="opacity-60">{item.number}</span>
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Toggle for View All vs Section Mode */}
          <button
            onClick={onToggleViewMode}
            title={viewMode === 'all' ? 'Switch to Section-Wise View' : 'Switch to Continuous Full Page View'}
            aria-pressed={viewMode === 'all'}
            className={`ml-1 font-pixel text-[10px] uppercase tracking-wider px-2 py-1 border-2 border-ink cursor-pointer select-none ${
              viewMode === 'all' ? 'sunken text-accent' : 'raised text-text'
            }`}
            data-key
          >
            {viewMode === 'all' ? '[• VIEWING ALL]' : '[ VIEW ALL ]'}
          </button>
        </nav>

        {/* Right side: tray + light switch + Let's Talk */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="sunken hidden sm:flex items-center gap-2 px-2 py-0.5">
            <SoundToggle />
            <span className="h-4 w-[2px] bg-border" aria-hidden="true" />
            <span className="font-mono text-lg leading-none tabular-nums text-text" aria-label={`Time ${time}`}>
              {time}
            </span>
          </div>

          <ThemeToggle />

          {/* Wrapper carries the visibility: .pixel-btn-primary sets display and would override `hidden` */}
          <span className="hidden md:inline-flex">
            <a
              href="mailto:deorigaurav1400@gmail.com"
              className="pixel-btn-primary !mb-1 px-3 py-2 text-[11px] whitespace-nowrap"
              id="nav-talk-btn"
            >
              LET&apos;S TALK
            </a>
          </span>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
            className="pixel-btn-outline lg:hidden !mb-1 w-10 h-10"
          >
            <PixelIcon name={isMobileMenuOpen ? 'close' : 'menu'} size={14} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Window */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute left-4 right-4 sm:left-6 sm:right-6 top-full -mt-1 win flex flex-col">
          <div className="win-title">
            <PixelIcon name="folder" size={13} />
            <span>MENU.EXE</span>
            <span className="win-grip" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="win-btn"
            >
              <PixelIcon name="close" size={8} />
            </button>
          </div>

          <div className="p-3 flex flex-col gap-1">
            {portfolioData.navigation.map((item) => {
              const isActive = viewMode === 'section' && currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={`font-pixel text-[12px] py-2.5 px-2.5 flex items-center justify-between text-left uppercase ${
                    isActive ? 'bg-accent text-accent-ink' : 'text-text hover:bg-text hover:text-bg'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="opacity-60">{item.number}</span>
                    <span>{item.label}</span>
                  </span>
                  {isActive && <PixelIcon name="arrowRight" size={12} />}
                </button>
              );
            })}

            <button
              onClick={() => {
                onToggleViewMode();
                setIsMobileMenuOpen(false);
              }}
              className="pixel-btn-outline mt-2 py-2 text-[10px]"
            >
              {viewMode === 'all' ? 'SWITCH TO SECTION-WISE' : 'VIEW ALL SECTIONS'}
            </button>

            <a
              href="mailto:deorigaurav1400@gmail.com"
              onClick={() => setIsMobileMenuOpen(false)}
              className="pixel-btn-primary w-full py-2.5 text-[11px] mt-1"
            >
              LET&apos;S TALK
            </a>
          </div>

          <div className="win-status sm:hidden">
            <span className="flex-1">{portfolioData.navigation.length} item(s)</span>
            <span className="flex items-center gap-2">
              <SoundToggle /> {time}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
