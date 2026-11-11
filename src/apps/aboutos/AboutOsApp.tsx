import { LogoMark } from '../../components/Taskbar';
import { profile } from '../../data/profile';

const shortcuts = [
  ['Double-click / Enter', 'Open a desktop app'],
  ['Ctrl + K', 'Search apps & projects'],
  ['Alt + Tab  (or Alt + `)', 'Switch windows'],
  ['Esc', 'Close the focused window'],
  ['Double-click title bar', 'Maximize / restore'],
  ['Drag to screen edge', 'Snap left / right / maximize'],
  ['Right-click desktop', 'Wallpaper, refresh, terminal'],
];

export default function AboutOsApp() {
  return (
    <div className="p-6 text-center">
      <div className="mx-auto w-fit">
        <LogoMark size={56} />
      </div>
      <h2 className="mt-4 text-xl font-bold">
        Gaurav<span className="text-accent">OS</span> 1.0
      </h2>
      <p className="mt-1 text-[13px] text-muted">
        Designed & built by {profile.name} with React, TypeScript, Tailwind CSS, Framer Motion and Zustand.
      </p>

      <h3 className="eyebrow mb-2 mt-6 text-left">Keyboard shortcuts</h3>
      <dl className="card divide-y divide-line/[0.07] text-left text-[13px]">
        {shortcuts.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 px-4 py-2">
            <dt>
              <kbd className="rounded-md border border-line/15 bg-line/[0.06] px-1.5 py-0.5 font-mono text-[11.5px]">{k}</kbd>
            </dt>
            <dd className="text-right text-muted">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[12px] text-muted">
        Prefer a plain page?{' '}
        <a href="?view=simple" className="text-accent hover:underline">
          Open the simple view
        </a>
      </p>
    </div>
  );
}
