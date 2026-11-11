import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogoMark } from './Taskbar';

const LOG = [
  'Initializing GauravOS kernel 1.0.0',
  'Mounting /projects … 7 found',
  'Loading Webro Studios services',
  'Starting window manager',
  'Applying theme and wallpaper',
  'Welcome, visitor.',
];
const STEP_MS = 260;

/** Short boot sequence. Any key or click skips it. */
export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState(0);

  useEffect(() => {
    const timers = LOG.map((_, i) => setTimeout(() => setLines(i + 1), STEP_MS * (i + 1)));
    timers.push(setTimeout(onDone, STEP_MS * LOG.length + 500));
    const skip = () => onDone();
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [onDone]);

  const progress = lines / LOG.length;

  return (
    <motion.div
      className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-[#05050a] px-6 text-white"
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      role="status"
      aria-label="GauravOS is starting. Press any key to skip."
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="flex flex-col items-center"
      >
        <LogoMark size={64} />
        <p className="mt-5 text-2xl font-semibold tracking-tight">
          Gaurav<span className="text-accent">OS</span>
        </p>
      </motion.div>

      <div className="mt-10 h-1 w-56 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-accent"
          animate={{ width: `${Math.max(progress, 0.06) * 100}%` }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
        />
      </div>

      <div className="mt-8 h-40 w-full max-w-md font-mono text-[12px] leading-6 text-white/55" aria-hidden="true">
        {LOG.slice(0, lines).map((l, i) => (
          <motion.p key={l} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-accent">[ OK ]</span> {l}
            {i === lines - 1 && <span className="caret-blink">▍</span>}
          </motion.p>
        ))}
      </div>

      <p className="absolute bottom-6 text-[12px] text-white/40">Press any key to skip</p>
    </motion.div>
  );
}
