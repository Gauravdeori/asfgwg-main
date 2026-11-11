import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootScreen from './components/BootScreen';
import Desktop from './components/Desktop';
import LockScreen from './components/LockScreen';
import MobileShell from './components/MobileShell';
import SimpleView from './components/SimpleView';
import SkipLink from './components/SkipLink';
import { accents } from './lib/appearance';
import { prefersReducedMotion, useIsMobile } from './lib/hooks';
import { useSettings } from './store/settingsStore';

const BOOTED_KEY = 'gauravos-booted';
type Phase = 'boot' | 'lock' | 'os';

function firstPhase(): Phase {
  let returning = false;
  try {
    returning = localStorage.getItem(BOOTED_KEY) === '1';
  } catch {
    /* storage blocked — treat as first visit */
  }
  const always = useSettings.getState().bootEveryVisit;
  return (!returning || always) && !prefersReducedMotion() ? 'boot' : 'lock';
}

/** Keeps <html> in sync with the theme and accent from Settings. */
function useThemeSync() {
  const theme = useSettings((s) => s.theme);
  const accent = useSettings((s) => s.accent);
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.classList.toggle('dark', theme === 'dark');
    root.style.setProperty('--accent', (accents[accent] ?? accents.indigo).rgb);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#09090e' : '#eeeff4');
  }, [theme, accent]);
}

function GauravOS() {
  const [phase, setPhase] = useState<Phase>(firstPhase);
  const isMobile = useIsMobile();

  const finishBoot = useCallback(() => {
    try {
      localStorage.setItem(BOOTED_KEY, '1');
    } catch {
      /* ignore */
    }
    setPhase('lock');
  }, []);
  const unlock = useCallback(() => setPhase('os'), []);
  const lock = useCallback(() => setPhase('lock'), []);

  return (
    <>
      <SkipLink />
      {phase === 'os' && (isMobile ? <MobileShell /> : <Desktop onLock={lock} />)}
      <AnimatePresence>
        {phase === 'lock' && <LockScreen key="lock" onUnlock={unlock} />}
        {phase === 'boot' && <BootScreen key="boot" onDone={finishBoot} />}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  useThemeSync();
  const simple = new URLSearchParams(window.location.search).get('view') === 'simple';
  return simple ? <SimpleView /> : <GauravOS />;
}
