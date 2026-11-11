import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { portfolioData } from '../data/portfolio';
import ThemeToggle from './ThemeToggle';
import PixelIcon, { type PixelIconName } from './retro/PixelIcon';
import { sfx } from '../lib/sfx';

interface NavbarProps {
  currentSection: string;
  onSelectSection: (sectionId: string) => void;
  viewMode: 'section' | 'all';
  onToggleViewMode: () => void;
}

export const TASKBAR_H = 54;

const sectionIcons: Record<string, PixelIconName> = {
  home: 'sparkle',
  about: 'file',
  projects: 'folder',
  experience: 'book',
  contact: 'mail',
};

function useClock() {
  const fmt = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
      className="grid h-6 w-6 place-items-center text-text hover:bg-accent hover:text-accent-ink"
    >
      <PixelIcon name={on ? 'speaker' : 'mute'} size={16} />
    </button>
  );
};

/**
 * Classic bottom taskbar: Start button + Start menu, a button per section
 * (the open one looks pressed), and a tray with sound, the wall light
 * switch and the clock. Keeps the old navbar's props.
 */
export const Navbar: React.FC<NavbarProps> = ({ currentSection, onSelectSection, viewMode, onToggleViewMode }) => {
  const [startOpen, setStartOpen] = useState(false);
  const time = useClock();
  const menuRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLButtonElement>(null);
  const { navigation, socials, profile } = portfolioData;

  // Close the Start menu on outside click / Esc, and focus its first item when it opens
  useEffect(() => {
    if (!startOpen) return;
    (menuRef.current?.querySelector('[role="menuitem"]') as HTMLElement | null)?.focus();
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !startRef.current?.contains(t)) setStartOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setStartOpen(false);
        startRef.current?.focus();
      }
    };
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [startOpen]);

  const go = (id: string) => {
    onSelectSection(id);
    setStartOpen(false);
  };

  // Arrow keys move through the Start menu items
  const onMenuKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const items = [...(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])];
    const i = items.indexOf(document.activeElement as HTMLElement);
    items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus();
  };

  const itemClass =
    'flex w-full items-center gap-3 px-3 py-2 text-left font-pixel text-[11px] uppercase tracking-wide text-text hover:bg-accent hover:text-accent-ink focus:bg-accent focus:text-accent-ink focus:outline-none';

  return (
    <>
      {/* Start menu */}
      {startOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Start menu"
          onKeyDown={onMenuKey}
          className="win fixed bottom-[58px] left-1 z-[70] flex w-[290px] max-w-[calc(100vw-8px)]"
        >
          {/* side banner */}
          <div
            className="m-[2px] mr-0 flex w-9 shrink-0 items-end justify-center pb-3"
            style={{ background: 'linear-gradient(0deg, var(--title-a), var(--title-b))' }}
            aria-hidden="true"
          >
            <span className="whitespace-nowrap font-display text-[17px] font-bold text-white [writing-mode:vertical-rl] rotate-180">
              Gaurav <span className="opacity-70">Deori</span>
            </span>
          </div>

          <div className="flex-1 py-1.5">
            {navigation.map((item) => (
              <button key={item.id} type="button" role="menuitem" onClick={() => go(item.id)} className={itemClass}>
                <PixelIcon name={sectionIcons[item.id] ?? 'file'} size={16} />
                <span className="flex-1">{item.label}</span>
                <span className="opacity-60">{item.number}</span>
              </button>
            ))}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onToggleViewMode();
                setStartOpen(false);
              }}
              className={itemClass}
            >
              <PixelIcon name="maximize" size={14} />
              {viewMode === 'all' ? 'One section at a time' : 'View all sections'}
            </button>

            <div className="mx-2 my-1.5 h-[2px] border-t border-border bg-[var(--bevel-hi)]" role="separator" />

            <a role="menuitem" href={profile.resumeUrl} target="_blank" rel="noreferrer" className={itemClass}>
              <PixelIcon name="download" size={15} /> Resume
            </a>
            <a role="menuitem" href={socials.github} target="_blank" rel="noreferrer" className={itemClass}>
              <PixelIcon name="github" size={15} /> GitHub
            </a>
            <a role="menuitem" href={socials.linkedin} target="_blank" rel="noreferrer" className={itemClass}>
              <PixelIcon name="linkedin" size={15} /> LinkedIn
            </a>
            <a role="menuitem" href={socials.instagram} target="_blank" rel="noreferrer" className={itemClass}>
              <PixelIcon name="instagram" size={15} /> Instagram
            </a>

            <div className="mx-2 my-1.5 h-[2px] border-t border-border bg-[var(--bevel-hi)]" role="separator" />

            <a role="menuitem" href={`mailto:${socials.email}`} className={itemClass}>
              <PixelIcon name="mail" size={15} /> Let&apos;s talk…
            </a>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <nav
        aria-label="Taskbar"
        className="raised fixed inset-x-0 bottom-0 z-[60] flex items-center gap-1.5 !border-x-0 !border-b-0 px-1.5"
        style={{ height: TASKBAR_H }}
      >
        <button
          ref={startRef}
          type="button"
          onClick={() => setStartOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={startOpen}
          className={`flex h-10 shrink-0 items-center gap-2 border-2 border-ink px-2 font-pixel text-[12px] uppercase text-text ${
            startOpen ? 'sunken' : 'raised'
          }`}
          data-key
        >
          <img src={profile.avatar} alt="" className="h-6 w-6 border border-ink object-cover pixelated" />
          Start
        </button>

        <span className="mx-0.5 h-9 w-[2px] shrink-0 border-l border-border bg-[var(--bevel-hi)]" aria-hidden="true" />

        {/* One taskbar button per section */}
        <div className="no-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
          {navigation.map((item) => {
            const active = viewMode === 'section' && currentSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSection(item.id)}
                aria-current={active ? 'page' : undefined}
                className={`hidden h-10 min-w-0 shrink items-center gap-2 border-2 border-ink px-2.5 font-pixel text-[11px] uppercase text-text md:flex lg:w-40 ${
                  active ? 'sunken' : 'raised'
                }`}
                style={active ? { backgroundImage: 'repeating-conic-gradient(var(--bevel-hi) 0 25%, transparent 0 50%)', backgroundSize: '4px 4px' } : undefined}
                data-key
              >
                <PixelIcon name={sectionIcons[item.id] ?? 'file'} size={14} className="shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* System tray */}
        <div className="sunken flex h-12 shrink-0 items-center gap-2 px-2">
          <SoundToggle />
          <ThemeToggle />
          <span className="font-mono text-lg leading-none tabular-nums text-text" aria-label={`Time ${time}`}>
            {time}
          </span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
