import { motion } from 'framer-motion';
import { apps, type AppId } from '../apps/meta';
import AppIcon from './AppIcon';

/** Alt+Tab overlay: shows open windows, most recent first. */
export default function AppSwitcher({ ids, index }: { ids: AppId[]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      className="pointer-events-none absolute inset-0 z-[800] grid place-items-center"
      role="listbox"
      aria-label="Switch window"
    >
      <div className="glass-strong shadow-window flex max-w-[90vw] gap-2 overflow-hidden rounded-2xl p-3">
        {ids.map((id, i) => (
          <div
            key={id}
            role="option"
            aria-selected={i === index}
            className={`flex w-28 flex-col items-center gap-2 rounded-xl px-2 py-3 ${i === index ? 'bg-accent/20 ring-2 ring-accent' : ''}`}
          >
            <AppIcon id={id} size={44} />
            <span className="w-full truncate text-center text-[12px]">{apps[id].title}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
