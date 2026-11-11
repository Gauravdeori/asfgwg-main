import { Suspense, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { Battery, ChevronLeft, LayoutList, Moon, Sun, Wifi, WifiOff } from 'lucide-react';
import { apps, desktopApps, type AppId } from '../apps/meta';
import { appComponents, AppLoading } from '../apps/registry';
import { profile } from '../data/profile';
import { formatDate, formatTime, useClock, useOnline } from '../lib/hooks';
import { useSettings } from '../store/settingsStore';
import { openApp, useWindowStore } from '../store/windowStore';
import AppIcon from './AppIcon';
import Wallpaper from './Wallpaper';

const DOCK: AppId[] = ['about', 'projects', 'terminal', 'mail'];

function StatusBar({ onDark = true }: { onDark?: boolean }) {
  const now = useClock(15_000);
  const online = useOnline();
  const theme = useSettings((s) => s.theme);
  const toggleTheme = useSettings((s) => s.toggleTheme);
  return (
    <div
      className={`flex h-9 shrink-0 items-center justify-between px-5 pt-[env(safe-area-inset-top)] text-[13px] font-semibold ${
        onDark ? 'text-white' : 'text-fg'
      }`}
    >
      <span className="tabular-nums">{formatTime(now)}</span>
      <span className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="grid h-7 w-7 place-items-center"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        {online ? <Wifi size={14} aria-label="Online" /> : <WifiOff size={14} aria-label="Offline" />}
        <Battery size={16} aria-label="Battery" />
      </span>
    </div>
  );
}

function HomeIcon({ id, showLabel = true }: { id: AppId; showLabel?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => openApp(id)}
      className="flex flex-col items-center gap-1.5 rounded-2xl p-1 active:scale-95"
      aria-label={`Open ${apps[id].title}`}
    >
      <AppIcon id={id} size={58} />
      {showLabel && (
        <span className="w-full truncate text-center text-[11.5px] font-medium text-white [text-shadow:0_1px_3px_rgb(0_0_0/.7)]">
          {apps[id].label}
        </span>
      )}
    </button>
  );
}

/** A full-screen app with a back button and an edge-swipe-to-go-back gesture. */
function AppScreen({ id, onBack }: { id: AppId; onBack: () => void }) {
  const win = useWindowStore((s) => s.windows[id]);
  const controls = useDragControls();
  const App = appComponents[id];

  return (
    <motion.section
      aria-label={apps[id].title}
      className="fixed inset-0 z-40 flex flex-col bg-bg"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%', transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } }}
      transition={{ type: 'spring', stiffness: 380, damping: 38 }}
      drag="x"
      dragListener={false}
      dragControls={controls}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{ left: 0, right: 0.9 }}
      onDragEnd={(_, info) => (info.offset.x > 90 || info.velocity.x > 500) && onBack()}
    >
      <StatusBar onDark={false} />
      <header className="flex h-12 shrink-0 items-center border-b border-line/10 px-2">
        <button type="button" onClick={onBack} className="flex h-10 items-center gap-0.5 rounded-lg px-2 text-accent" aria-label="Back to home screen">
          <ChevronLeft size={22} aria-hidden="true" />
          <span className="text-[15px]">Home</span>
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold">{apps[id].title}</h1>
      </header>
      <div className="@container min-h-0 flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
        <Suspense fallback={<AppLoading />}>
          <App key={win?.payloadKey} payload={win?.payload} />
        </Suspense>
      </div>
      {/* left edge: swipe right to go back */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-5 touch-none"
        onPointerDown={(e) => controls.start(e)}
      />
    </motion.section>
  );
}

/** Phone layout used under 768px: home screen, dock, full-screen apps. Never draggable windows. */
export default function MobileShell() {
  const activeId = useWindowStore((s) => s.activeId);
  const now = useClock(15_000);
  const pushed = useRef(0);
  const skipPush = useRef(false);

  // Each opened app gets a history entry so the phone's back button closes it
  useEffect(() => {
    // returning to an app underneath (after Back) must not add another entry
    if (skipPush.current) {
      skipPush.current = false;
      return;
    }
    if (!activeId) return;
    window.history.pushState({ gauravos: activeId }, '');
    pushed.current += 1;
  }, [activeId]);

  useEffect(() => {
    const onPop = () => {
      pushed.current = Math.max(0, pushed.current - 1);
      const s = useWindowStore.getState();
      if (!s.activeId) return;
      skipPush.current = true;
      s.close(s.activeId);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const back = useCallback(() => {
    if (pushed.current > 0) window.history.back();
    else {
      const s = useWindowStore.getState();
      if (s.activeId) s.close(s.activeId);
    }
  }, []);

  const gridApps = desktopApps.filter((a) => !DOCK.includes(a.id));

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Wallpaper />
      <div className="relative flex h-full flex-col">
        <StatusBar />

        <main className="flex-1 overflow-y-auto px-5 pt-3" aria-label="Home screen">
          {/* Greeting widget */}
          <section className="mb-6 rounded-3xl border border-white/15 bg-black/25 p-4 text-white backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <img src={profile.portrait.dark} alt="" className="[image-rendering:pixelated] h-12 w-12 rounded-full object-cover ring-2 ring-white/30" />
              <div className="min-w-0">
                <h1 className="text-[17px] font-semibold">Hi, I'm {profile.firstName}</h1>
                <p className="truncate text-[12.5px] text-white/75">{profile.headline}</p>
              </div>
            </div>
            <p className="mt-3 text-[12.5px] text-white/70">
              {formatDate(now, true)} · {profile.location}
            </p>
          </section>

          <div className="grid grid-cols-4 gap-x-3 gap-y-5">
            {gridApps.map((a) => (
              <HomeIcon key={a.id} id={a.id} />
            ))}
          </div>

          <a
            href="?view=simple"
            className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full bg-black/25 px-4 py-2 text-[13px] text-white backdrop-blur-md"
          >
            <LayoutList size={14} aria-hidden="true" /> Simple view
          </a>
        </main>

        {/* Dock */}
        <nav aria-label="Dock" className="mx-3 mb-[max(12px,env(safe-area-inset-bottom))] mt-3 rounded-[28px] border border-white/15 bg-white/15 p-3 backdrop-blur-2xl">
          <div className="grid grid-cols-4 gap-3">
            {DOCK.map((id) => (
              <HomeIcon key={id} id={id} showLabel={false} />
            ))}
          </div>
        </nav>
      </div>

      <AnimatePresence>{activeId && <AppScreen key={activeId} id={activeId} onBack={back} />}</AnimatePresence>
    </div>
  );
}
