import { useRef, useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import PixelIcon, { type PixelIconName } from './PixelIcon';

type Shortcut = { label: string; icon: PixelIconName; color: string } & ({ section: string } | { href: string });

const shortcuts: Shortcut[] = [
  { label: 'My Projects', icon: 'folder', color: '#f7c948', section: 'projects' },
  { label: 'About Me', icon: 'file', color: '#ffffff', section: 'about' },
  { label: 'Experience', icon: 'book', color: '#7fd1ff', section: 'experience' },
  { label: 'Contact', icon: 'mail', color: '#ffe08a', section: 'contact' },
  { label: 'Resume', icon: 'download', color: '#b7f7c2', href: portfolioData.profile.resumeUrl },
  { label: 'GitHub', icon: 'github', color: '#ffffff', href: portfolioData.socials.github },
];

/**
 * A row of classic desktop shortcuts. Click selects (label turns blue),
 * double-click opens; Enter and touch taps open straight away.
 */
export default function DesktopIcons({ onOpenSection }: { onOpenSection: (id: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const pointerType = useRef('mouse');

  const open = (s: Shortcut) => {
    if ('section' in s) onOpenSection(s.section);
    else window.open(s.href, '_blank', 'noopener');
  };

  return (
    <section aria-label="Desktop shortcuts" className="px-4 sm:px-6">
      <ul className="mx-auto flex max-w-[1200px] flex-wrap gap-x-2 gap-y-3">
        {shortcuts.map((s) => {
          const isSel = selected === s.label;
          return (
            <li key={s.label}>
              <button
                type="button"
                onPointerDown={(e) => (pointerType.current = e.pointerType)}
                onClick={(e) => (e.detail === 0 || pointerType.current === 'touch' ? open(s) : setSelected(s.label))}
                onDoubleClick={() => open(s)}
                onBlur={() => setSelected((cur) => (cur === s.label ? null : cur))}
                aria-label={`Open ${s.label}`}
                className="group flex w-[86px] flex-col items-center gap-1.5 p-1 focus:outline-none"
              >
                <span
                  className={`grid h-12 w-12 place-items-center ${isSel ? 'opacity-80' : ''}`}
                  style={{ color: s.color, filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,.55))' }}
                >
                  <PixelIcon name={s.icon} size={34} />
                </span>
                <span
                  className={`px-1 text-center font-pixel text-[10px] uppercase leading-tight tracking-wide ${
                    isSel ? 'bg-accent text-accent-ink outline-dotted outline-1 outline-[var(--title-ink)]' : 'text-[color:var(--desk-ink)] [text-shadow:1px_1px_0_rgba(0,0,0,.8)]'
                  } group-focus-visible:outline group-focus-visible:outline-1 group-focus-visible:outline-dotted`}
                >
                  {s.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
