import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface MenuItem {
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  onSelect: () => void;
  separatorBefore?: boolean;
}

interface Props {
  x: number;
  y: number;
  items: MenuItem[];
  onClose: () => void;
}

/** Right-click menu with keyboard support (arrows, Enter, Esc). Stays on-screen. */
export default function ContextMenu({ x, y, items, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y });
  const [index, setIndex] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    setPos({ x: Math.min(x, window.innerWidth - width - 8), y: Math.min(y, window.innerHeight - height - 64) });
  }, [x, y]);

  useEffect(() => {
    (ref.current?.querySelectorAll('[role="menuitem"]')[index] as HTMLElement | undefined)?.focus();
  }, [index]);

  useEffect(() => {
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && onClose();
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, [onClose]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => (i + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => (i - 1 + items.length) % items.length);
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <motion.div
      ref={ref}
      role="menu"
      aria-label="Desktop menu"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.12 }}
      onKeyDown={onKeyDown}
      onContextMenu={(e) => e.preventDefault()}
      className="glass-strong shadow-window fixed z-[700] min-w-[220px] origin-top-left rounded-xl p-1.5"
      style={{ left: pos.x, top: pos.y }}
    >
      {items.map((item, i) => (
        <div key={item.label}>
          {item.separatorBefore && <div className="mx-2 my-1 h-px bg-line/10" role="separator" />}
          <button
            type="button"
            role="menuitem"
            tabIndex={i === index ? 0 : -1}
            onMouseEnter={() => setIndex(i)}
            onClick={() => {
              onClose();
              item.onSelect();
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] outline-none hover:bg-accent/15 focus:bg-accent/15"
          >
            <span className="grid w-4 place-items-center text-muted" aria-hidden="true">
              {item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
            {item.shortcut && <span className="text-[11px] text-muted">{item.shortcut}</span>}
          </button>
        </div>
      ))}
    </motion.div>
  );
}
