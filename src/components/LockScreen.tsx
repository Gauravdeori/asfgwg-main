import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { profile } from '../data/profile';
import { formatDate, formatTime, useClock } from '../lib/hooks';
import Wallpaper from './Wallpaper';

/** Lock screen: no password — click, tap, Enter or Space to enter. */
export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const now = useClock(1000);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    buttonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest?.('a')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onUnlock();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onUnlock]);

  return (
    <motion.div
      className="fixed inset-0 z-[1500] select-none overflow-hidden text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.55, ease: [0.7, 0, 0.3, 1] } }}
      onClick={onUnlock}
    >
      <Wallpaper />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/55" />

      <div className="relative flex h-full flex-col items-center justify-between px-6 py-[12vh]">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center [text-shadow:0_2px_24px_rgb(0_0_0/.35)]"
        >
          <p className="text-[clamp(4.5rem,14vw,8.5rem)] font-semibold leading-none tracking-tight tabular-nums">{formatTime(now)}</p>
          <p className="mt-3 text-lg font-medium text-white/85 sm:text-xl">{formatDate(now, true)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <img
            src={profile.portrait.dark}
            alt=""
            className="h-24 w-24 rounded-full object-cover shadow-2xl ring-4 ring-white/25 [image-rendering:pixelated]"
            width={96}
            height={96}
          />
          <p className="mt-4 text-2xl font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-white/70">{profile.headline}</p>
          <button
            ref={buttonRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onUnlock();
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-5 py-2.5 text-sm font-medium backdrop-blur-md transition-colors hover:bg-white/25"
          >
            Click to enter <ArrowRight size={16} aria-hidden="true" />
          </button>
          <a
            href="?view=simple"
            onClick={(e) => e.stopPropagation()}
            className="mt-4 text-[13px] text-white/70 underline-offset-4 hover:text-white hover:underline"
          >
            Prefer a simple page? Open the simple view
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
