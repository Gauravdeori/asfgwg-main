import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Image, Info, RefreshCw, SquareTerminal } from 'lucide-react';
import { apps, desktopApps, type AppId } from '../apps/meta';
import { useShallow } from 'zustand/react/shallow';
import { TASKBAR_H, openApp, useWindowStore } from '../store/windowStore';
import AppIcon from './AppIcon';
import AppSwitcher from './AppSwitcher';
import ContextMenu, { type MenuItem } from './ContextMenu';
import StartMenu from './StartMenu';
import Taskbar from './Taskbar';
import Wallpaper from './Wallpaper';
import Window from './Window';

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));

/** One desktop shortcut: click selects, double-click (or tap / Enter) opens. */
function DesktopIcon({ id, selected, onSelect }: { id: AppId; selected: boolean; onSelect: (id: AppId) => void }) {
  const pointerType = useRef('mouse');
  return (
    <button
      type="button"
      onPointerDown={(e) => (pointerType.current = e.pointerType)}
      onClick={(e) => {
        // keyboard activation (detail 0) and touch taps open straight away
        if (e.detail === 0 || pointerType.current === 'touch') openApp(id);
        else onSelect(id);
      }}
      onDoubleClick={() => openApp(id)}
      onFocus={() => onSelect(id)}
      aria-label={`Open ${apps[id].title}`}
      className={`flex w-[84px] flex-col items-center gap-1.5 rounded-lg border px-1 pb-2 pt-2.5 text-center outline-none transition-colors ${
        selected ? 'border-white/25 bg-white/15' : 'border-transparent hover:bg-white/10'
      } focus-visible:ring-2 focus-visible:ring-accent`}
    >
      <AppIcon id={id} size={46} />
      <span className="line-clamp-2 text-[12px] font-medium leading-tight text-white [text-shadow:0_1px_3px_rgb(0_0_0/.8)]">
        {apps[id].label}
      </span>
    </button>
  );
}

export default function Desktop({ onLock }: { onLock: () => void }) {
  const windowIds = useWindowStore(useShallow((s) => Object.keys(s.windows) as AppId[]));
  const snapPreview = useWindowStore((s) => s.snapPreview);
  const [selected, setSelected] = useState<AppId | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [switcher, setSwitcher] = useState<{ ids: AppId[]; index: number } | null>(null);
  const switcherRef = useRef(switcher);
  switcherRef.current = switcher;

  const closeMenu = useCallback(() => setMenu(null), []);

  // Deep links: gauravdeori.in/#projects opens the Projects window
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1) as AppId;
      if (id in apps) openApp(id);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  // Close the Start menu when clicking anywhere else
  useEffect(() => {
    if (!startOpen) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest('[data-start-menu]') && !t.closest('[data-start-button]')) setStartOpen(false);
    };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, [startOpen]);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const store = useWindowStore.getState();

      // Alt+Tab (or Alt+`) window switcher
      if (e.altKey && (e.key === 'Tab' || e.key === '`')) {
        const ids = [...store.order].reverse();
        if (!ids.length) return;
        e.preventDefault();
        setSwitcher((cur) => {
          const step = e.shiftKey ? -1 : 1;
          if (!cur) return { ids, index: ids.length > 1 ? 1 : 0 };
          return { ids: cur.ids, index: (cur.index + step + cur.ids.length) % cur.ids.length };
        });
        return;
      }

      // Ctrl/Cmd+K toggles Start search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setStartOpen((o) => !o);
        return;
      }

      if (e.key === 'Escape') {
        if (switcherRef.current) return setSwitcher(null);
        if (startOpen) return setStartOpen(false);
        if (menu) return setMenu(null);
        if (store.activeId && !isTyping(e.target)) {
          e.preventDefault();
          store.close(store.activeId);
        }
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const s = switcherRef.current;
      if (e.key === 'Alt' && s) {
        useWindowStore.getState().focus(s.ids[s.index]);
        setSwitcher(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [startOpen, menu]);

  const menuItems: MenuItem[] = [
    { label: 'Change wallpaper', icon: <Image size={15} />, onSelect: () => openApp('settings', { tab: 'wallpaper' }) },
    { label: 'Refresh', icon: <RefreshCw size={15} />, onSelect: () => setRefreshKey((k) => k + 1) },
    { label: 'Open Terminal', icon: <SquareTerminal size={15} />, onSelect: () => openApp('terminal') },
    { label: 'About GauravOS', icon: <Info size={15} />, onSelect: () => openApp('aboutos'), separatorBefore: true },
  ];

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden"
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Wallpaper />

      {/* Desktop surface + icons */}
      <main
        aria-label="Desktop"
        className="absolute inset-x-0 top-0"
        style={{ bottom: TASKBAR_H }}
        onPointerDown={(e) => e.target === e.currentTarget && setSelected(null)}
        onContextMenu={(e) => {
          if ((e.target as HTMLElement).closest('[data-window]')) return;
          e.preventDefault();
          setMenu({ x: e.clientX, y: e.clientY });
        }}
        onKeyDown={(e) => {
          if ((e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) && !(e.target as HTMLElement).closest('[data-window]')) {
            e.preventDefault();
            setMenu({ x: window.innerWidth / 2 - 110, y: window.innerHeight / 3 });
          }
        }}
      >
        <h1 className="sr-only">GauravOS — Gaurav Deori's portfolio</h1>
        <div
          key={refreshKey}
          className="grid h-full w-fit auto-cols-[84px] grid-flow-col content-start gap-1 p-3"
          style={{ gridTemplateRows: 'repeat(auto-fill, 100px)' }}
          onPointerDown={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          {desktopApps.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.03 }}
            >
              <DesktopIcon id={a.id} selected={selected === a.id} onSelect={setSelected} />
            </motion.div>
          ))}
        </div>

        {/* Windows layer */}
        <div className="pointer-events-none absolute inset-0">
          <AnimatePresence>
            {snapPreview && (
              <motion.div
                key={snapPreview}
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute rounded-xl border border-accent/50 bg-accent/15 backdrop-blur-sm"
                style={{
                  zIndex: 400,
                  top: 8,
                  bottom: 8,
                  left: snapPreview === 'right' ? 'calc(50% + 4px)' : 8,
                  right: snapPreview === 'left' ? 'calc(50% + 4px)' : 8,
                }}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {windowIds.map((id) => (
              <Window key={id} id={id} />
            ))}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {startOpen && <StartMenu onClose={() => setStartOpen(false)} onLock={onLock} />}
      </AnimatePresence>
      <AnimatePresence>{switcher && <AppSwitcher ids={switcher.ids} index={switcher.index} />}</AnimatePresence>
      {menu && <ContextMenu x={menu.x} y={menu.y} items={menuItems} onClose={closeMenu} />}

      <Taskbar startOpen={startOpen} onToggleStart={() => setStartOpen((o) => !o)} />
    </motion.div>
  );
}
