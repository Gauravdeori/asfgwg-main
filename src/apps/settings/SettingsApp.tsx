import { useEffect, useState } from 'react';
import { Check, Image, Monitor, Moon, Palette, Sun } from 'lucide-react';
import { accents, wallpapers, type AccentId } from '../../lib/appearance';
import { useSettings } from '../../store/settingsStore';
import { openApp } from '../../store/windowStore';
import type { AppProps } from '../registry';

type Tab = 'appearance' | 'wallpaper' | 'system';

const tabs: { id: Tab; label: string; icon: typeof Palette }[] = [
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'wallpaper', label: 'Wallpaper', icon: Image },
  { id: 'system', label: 'System', icon: Monitor },
];

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-accent' : 'bg-line/20'}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  );
}

export default function SettingsApp({ payload }: AppProps) {
  const [tab, setTab] = useState<Tab>('appearance');
  const s = useSettings();

  useEffect(() => {
    const t = payload?.tab as Tab | undefined;
    if (t && tabs.some((x) => x.id === t)) setTab(t);
  }, [payload]);

  return (
    <div className="flex h-full min-h-[420px] flex-col @2xl:flex-row">
      <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-line/10 p-2 @2xl:w-48 @2xl:flex-col @2xl:border-b-0 @2xl:border-r" aria-label="Settings sections">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            aria-current={tab === id ? 'page' : undefined}
            className={`flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-left text-[13px] ${tab === id ? 'bg-accent/15 font-medium' : 'hover:bg-line/[0.07]'}`}
          >
            <Icon size={16} className="text-accent" aria-hidden="true" /> {label}
          </button>
        ))}
      </nav>

      <div className="min-w-0 flex-1 overflow-y-auto p-5 @xl:p-6">
        {tab === 'appearance' && (
          <div className="space-y-6">
            <section>
              <h2 className="text-[15px] font-semibold">Mode</h2>
              <div className="mt-3 grid max-w-md grid-cols-2 gap-3">
                {(['dark', 'light'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => s.setTheme(m)}
                    aria-pressed={s.theme === m}
                    className={`card flex items-center gap-3 p-4 text-left transition-colors ${s.theme === m ? '!border-accent ring-2 ring-accent/40' : 'hover:bg-line/[0.07]'}`}
                  >
                    {m === 'dark' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
                    <span className="font-medium capitalize">{m}</span>
                  </button>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-[15px] font-semibold">Accent colour</h2>
              <p className="text-[13px] text-muted">Used for icons, buttons and highlights across GauravOS.</p>
              <div className="mt-3 flex flex-wrap gap-3" role="radiogroup" aria-label="Accent colour">
                {(Object.keys(accents) as AccentId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={s.accent === id}
                    aria-label={accents[id].label}
                    title={accents[id].label}
                    onClick={() => s.setAccent(id)}
                    className={`grid h-10 w-10 place-items-center rounded-full ring-offset-2 ring-offset-glass transition-transform hover:scale-110 ${s.accent === id ? 'ring-2 ring-fg' : ''}`}
                    style={{ background: `rgb(${accents[id].rgb})` }}
                  >
                    {s.accent === id && <Check size={16} className="text-white" aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {tab === 'wallpaper' && (
          <section>
            <h2 className="text-[15px] font-semibold">Wallpaper</h2>
            <p className="text-[13px] text-muted">Each wallpaper has a light and a dark version.</p>
            <div className="mt-4 grid grid-cols-2 gap-3 @xl:grid-cols-3">
              {Object.entries(wallpapers).map(([id, w]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => s.setWallpaper(id)}
                  aria-pressed={s.wallpaper === id}
                  className={`group overflow-hidden rounded-xl text-left ring-1 ring-line/10 transition-all ${s.wallpaper === id ? '!ring-2 !ring-accent' : 'hover:ring-line/30'}`}
                >
                  <span className="block aspect-[16/10] w-full" style={{ background: w.css[s.theme] }} aria-hidden="true" />
                  <span className="flex items-center justify-between px-3 py-2 text-[13px]">
                    {w.label}
                    {s.wallpaper === id && <Check size={15} className="text-accent" aria-hidden="true" />}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {tab === 'system' && (
          <div className="max-w-lg space-y-3">
            <h2 className="text-[15px] font-semibold">System</h2>
            <div className="card flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-medium">Boot animation on every visit</p>
                <p className="text-[13px] text-muted">First visits always see it. Turn on to replay it every time.</p>
              </div>
              <Toggle checked={s.bootEveryVisit} onChange={s.setBootEveryVisit} label="Boot animation on every visit" />
            </div>
            <div className="card flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-medium">About GauravOS</p>
                <p className="text-[13px] text-muted">Version, credits and keyboard shortcuts.</p>
              </div>
              <button type="button" className="btn" onClick={() => openApp('aboutos')}>
                Open
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
