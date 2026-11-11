import { Battery, BatteryCharging, BatteryLow, BatteryMedium, LayoutList, Moon, Sun, Wifi, WifiOff } from 'lucide-react';
import { appList, desktopApps, type AppId } from '../apps/meta';
import { useShallow } from 'zustand/react/shallow';
import { TASKBAR_H, useWindowStore } from '../store/windowStore';
import { useSettings } from '../store/settingsStore';
import { formatDate, formatTime, useBattery, useClock, useOnline } from '../lib/hooks';
import AppIcon from './AppIcon';

interface Props {
  startOpen: boolean;
  onToggleStart: () => void;
}

/** GauravOS logo mark, used on the Start button and boot screen. */
export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="9" height="9" rx="2.4" fill="rgb(var(--accent))" />
      <rect x="13" y="2" width="9" height="9" rx="2.4" fill="rgb(var(--accent) / .55)" />
      <rect x="2" y="13" width="9" height="9" rx="2.4" fill="rgb(var(--accent) / .55)" />
      <rect x="13" y="13" width="9" height="9" rx="4.5" fill="rgb(var(--accent))" />
    </svg>
  );
}

function TaskbarButton({ id }: { id: AppId }) {
  const win = useWindowStore((s) => s.windows[id]);
  const active = useWindowStore((s) => s.activeId === id);
  const running = !!win;
  const title = appList.find((a) => a.id === id)!.title;

  const onClick = () => {
    const s = useWindowStore.getState();
    if (!win) s.open(id);
    else if (active && !win.minimized) s.minimize(id);
    else s.focus(id);
  };

  return (
    <button
      type="button"
      data-taskbar-app={id}
      onClick={onClick}
      aria-label={`${title}${running ? (win?.minimized ? ' (minimized)' : ' (open)') : ''}`}
      aria-pressed={active && !win?.minimized}
      className={`group relative grid h-11 w-11 place-items-center rounded-lg transition-colors hover:bg-line/10 ${
        active && !win?.minimized ? 'bg-line/10' : ''
      }`}
    >
      <AppIcon id={id} size={28} className="transition-transform group-active:scale-90" />
      {/* running / focused indicator */}
      <span
        aria-hidden="true"
        className={`absolute bottom-0.5 h-[3px] rounded-full transition-all ${
          running ? (active && !win?.minimized ? 'w-4 bg-accent' : 'w-1.5 bg-fg/50') : 'w-0'
        }`}
      />
      {/* tooltip */}
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md px-2 py-1 text-[12px] opacity-0 transition-opacity glass-strong group-hover:opacity-100">
        {title}
      </span>
    </button>
  );
}

function BatteryIcon() {
  const battery = useBattery();
  if (!battery) return <Battery size={17} aria-label="Battery" />;
  const pct = Math.round(battery.level * 100);
  const Icon = battery.charging ? BatteryCharging : pct < 25 ? BatteryLow : pct < 70 ? BatteryMedium : Battery;
  return (
    <span className="flex items-center" title={`Battery ${pct}%${battery.charging ? ', charging' : ''}`}>
      <Icon size={17} aria-label={`Battery ${pct}%`} />
    </span>
  );
}

export default function Taskbar({ startOpen, onToggleStart }: Props) {
  const now = useClock(15_000);
  const online = useOnline();
  const theme = useSettings((s) => s.theme);
  const toggleTheme = useSettings((s) => s.toggleTheme);
  // Apps running that aren't pinned (e.g. About GauravOS) appear after the pins
  const extra = useWindowStore(useShallow((s) => s.order.filter((id) => !desktopApps.some((a) => a.id === id))));

  return (
    <nav
      aria-label="Taskbar"
      className="glass-strong absolute inset-x-0 bottom-0 z-[500] flex items-center border-x-0 border-b-0 px-3"
      style={{ height: TASKBAR_H }}
    >
      {/* equal flex spacers keep the app strip centred on wide screens */}
      <div className="hidden min-w-0 flex-1 basis-0 xl:block" />

      {/* Centre: Start + apps */}
      <div className="no-scrollbar flex min-w-0 items-center gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={onToggleStart}
          aria-label="Start"
          aria-expanded={startOpen}
          aria-haspopup="dialog"
          data-start-button
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg transition-colors hover:bg-line/10 ${startOpen ? 'bg-line/10' : ''}`}
        >
          <LogoMark size={24} />
        </button>
        {desktopApps.map((a) => (
          <TaskbarButton key={a.id} id={a.id} />
        ))}
        {extra.length > 0 && <span className="mx-1 h-6 w-px bg-line/15" aria-hidden="true" />}
        {extra.map((id) => (
          <TaskbarButton key={id} id={id} />
        ))}
      </div>

      {/* System tray */}
      <div className="flex flex-1 basis-0 items-center justify-end gap-1 whitespace-nowrap">
        <a
          href="?view=simple"
          className="hidden h-9 shrink-0 items-center gap-1.5 rounded-lg px-2 text-[12px] text-fg/80 hover:bg-line/10 2xl:flex"
          title="Plain scrollable portfolio"
        >
          <LayoutList size={15} /> Simple view
        </a>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="grid h-9 w-9 place-items-center rounded-lg hover:bg-line/10"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <div className="flex h-9 items-center gap-2 rounded-lg px-2 text-fg/85">
          {online ? <Wifi size={16} aria-label="Online" /> : <WifiOff size={16} aria-label="Offline" />}
          <BatteryIcon />
        </div>
        <div className="flex shrink-0 flex-col items-end px-2 text-right leading-tight" aria-label={`${formatTime(now)}, ${formatDate(now)}`}>
          <span className="text-[12px] font-medium tabular-nums">{formatTime(now)}</span>
          <span className="text-[11px] text-muted tabular-nums">{formatDate(now)}</span>
        </div>
      </div>
    </nav>
  );
}
