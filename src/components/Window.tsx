import { memo, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Copy, Minus, Square, X } from 'lucide-react';
import { apps, type AppId } from '../apps/meta';
import { appComponents, AppLoading } from '../apps/registry';
import { MIN_H, MIN_W, useWindowStore, type Rect } from '../store/windowStore';
import AppIcon from './AppIcon';

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

type Dir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
const handles: { dir: Dir; className: string; cursor: string }[] = [
  { dir: 'n', className: '-top-1 left-3 right-3 h-2', cursor: 'ns-resize' },
  { dir: 's', className: '-bottom-1 left-3 right-3 h-2', cursor: 'ns-resize' },
  { dir: 'e', className: '-right-1 top-3 bottom-3 w-2', cursor: 'ew-resize' },
  { dir: 'w', className: '-left-1 top-3 bottom-3 w-2', cursor: 'ew-resize' },
  { dir: 'ne', className: '-right-1 -top-1 h-4 w-4', cursor: 'nesw-resize' },
  { dir: 'nw', className: '-left-1 -top-1 h-4 w-4', cursor: 'nwse-resize' },
  { dir: 'se', className: '-right-1 -bottom-1 h-4 w-4', cursor: 'nwse-resize' },
  { dir: 'sw', className: '-left-1 -bottom-1 h-4 w-4', cursor: 'nesw-resize' },
];

/**
 * A desktop window. Geometry lives in the window store; while dragging or
 * resizing we write straight to the element's style for 60fps and commit to
 * the store on pointer-up.
 */
function Window({ id }: { id: AppId }) {
  const win = useWindowStore((s) => s.windows[id]);
  const z = useWindowStore((s) => s.order.indexOf(id));
  const active = useWindowStore((s) => s.activeId === id);
  const ref = useRef<HTMLDivElement>(null);
  const [minTarget, setMinTarget] = useState({ x: 0, y: 60 });

  const meta = apps[id];
  const App = appComponents[id];

  // Only re-render the app itself when it receives a new payload
  const content = useMemo(
    () => (
      <Suspense fallback={<AppLoading />}>
        <App payload={win?.payload} />
      </Suspense>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [win?.payloadKey],
  );

  // Minimize flies toward this app's taskbar button
  useLayoutEffect(() => {
    if (!win?.minimized || !ref.current) return;
    const btn = document.querySelector(`[data-taskbar-app="${id}"]`);
    if (!btn) return;
    const b = btn.getBoundingClientRect();
    const r = ref.current.getBoundingClientRect();
    setMinTarget({ x: b.left + b.width / 2 - (r.left + r.width / 2), y: b.top + b.height / 2 - (r.top + r.height / 2) });
  }, [win?.minimized, id]);

  // Move keyboard focus into a freshly opened window
  useEffect(() => {
    if (useWindowStore.getState().activeId === id) ref.current?.focus({ preventScroll: true });
  }, [id]);

  if (!win) return null;
  const store = useWindowStore.getState;

  const onTitlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest('button')) return;
    const el = ref.current;
    const parent = el?.offsetParent as HTMLElement | null;
    if (!el || !parent) return;
    const bounds = parent.getBoundingClientRect();
    const initial = store().windows[id]!;
    let start = { x: e.clientX, y: e.clientY };
    let rect: Rect = { ...initial.rect };
    let detached = !(initial.maximized || initial.snap);
    let moved = false;

    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - start.x;
      const dy = ev.clientY - start.y;
      if (!moved && Math.hypot(dx, dy) < 4) return;
      if (!moved) {
        moved = true;
        el.dataset.dragging = '';
        document.body.style.userSelect = 'none';
      }
      if (!detached) {
        // Pull a maximized/snapped window back to its normal size under the cursor
        const cur = el.getBoundingClientRect();
        const ratio = (start.x - cur.left) / cur.width;
        rect = {
          ...rect,
          x: clamp(ev.clientX - bounds.left - rect.w * ratio, -rect.w + 120, bounds.width - 120),
          y: clamp(ev.clientY - bounds.top - 18, 0, bounds.height - 40),
        };
        store().restoreTo(id, rect);
        start = { x: ev.clientX, y: ev.clientY };
        detached = true;
        return;
      }
      const nx = clamp(rect.x + dx, -rect.w + 120, bounds.width - 120);
      const ny = clamp(rect.y + dy, 0, bounds.height - 40);
      el.style.left = `${nx}px`;
      el.style.top = `${ny}px`;

      // Snap zones: screen edges → half, top edge → maximize
      const edge = 8;
      store().setSnapPreview(
        ev.clientX <= bounds.left + edge
          ? 'left'
          : ev.clientX >= bounds.right - edge
            ? 'right'
            : ev.clientY <= bounds.top + edge
              ? 'max'
              : null,
      );
    };

    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      document.body.style.userSelect = '';
      if (!moved) return;
      delete el.dataset.dragging;
      const finalRect = { ...rect, x: parseFloat(el.style.left), y: parseFloat(el.style.top) };
      const snap = store().snapPreview;
      store().setSnapPreview(null);
      store().setRect(id, finalRect);
      if (snap) store().setSnap(id, snap);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const onResizeDown = (dir: Dir) => (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    const el = ref.current;
    const parent = el?.offsetParent as HTMLElement | null;
    if (!el || !parent) return;
    const bounds = parent.getBoundingClientRect();
    const s = store().windows[id]!;
    if (s.maximized || s.snap) return;
    const r0 = { ...s.rect };
    const start = { x: e.clientX, y: e.clientY };
    let next = r0;
    el.dataset.dragging = '';
    document.body.style.userSelect = 'none';

    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - start.x;
      const dy = ev.clientY - start.y;
      let { x, y, w, h } = r0;
      if (dir.includes('e')) w = clamp(r0.w + dx, MIN_W, bounds.width - r0.x);
      if (dir.includes('s')) h = clamp(r0.h + dy, MIN_H, bounds.height - r0.y);
      if (dir.includes('w')) {
        w = clamp(r0.w - dx, MIN_W, r0.x + r0.w);
        x = r0.x + (r0.w - w);
      }
      if (dir.includes('n')) {
        h = clamp(r0.h - dy, MIN_H, r0.y + r0.h);
        y = r0.y + (r0.h - h);
      }
      next = { x, y, w, h };
      Object.assign(el.style, { left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      delete el.dataset.dragging;
      document.body.style.userSelect = '';
      store().setRect(id, next);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const geometry: CSSProperties = win.maximized
    ? { left: 0, top: 0, width: '100%', height: '100%' }
    : win.snap === 'left'
      ? { left: 0, top: 0, width: '50%', height: '100%' }
      : win.snap === 'right'
        ? { left: '50%', top: 0, width: '50%', height: '100%' }
        : { left: win.rect.x, top: win.rect.y, width: win.rect.w, height: win.rect.h };

  const docked = win.maximized || !!win.snap;

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-label={meta.title}
      aria-hidden={win.minimized || undefined}
      tabIndex={-1}
      data-window={id}
      onPointerDownCapture={() => store().focus(id)}
      className="win-geometry pointer-events-auto absolute outline-none"
      style={{ ...geometry, zIndex: 10 + z }}
      initial={{ opacity: 0, scale: 0.94, y: 18 }}
      animate={
        win.minimized
          ? { opacity: 0, scale: 0.18, x: minTarget.x, y: minTarget.y, transitionEnd: { visibility: 'hidden' } }
          : { opacity: 1, scale: 1, x: 0, y: 0, visibility: 'visible' }
      }
      exit={{ opacity: 0, scale: 0.94, y: 10, transition: { duration: 0.16 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 34, mass: 0.8 }}
    >
      {/* Rounded glass shell clips the content; resize handles sit outside it */}
      <div
        className={`flex h-full flex-col overflow-hidden glass-strong shadow-window ${docked ? 'rounded-none' : 'rounded-xl'} ${
          active ? '' : 'saturate-[.85]'
        }`}
      >
      {/* Title bar */}
      <div
        className={`flex h-10 shrink-0 select-none items-center gap-2.5 pl-3 ${
          active ? 'bg-line/[0.04]' : 'bg-transparent opacity-80'
        } border-b border-line/[0.08]`}
        onPointerDown={onTitlePointerDown}
        onDoubleClick={(e) => !(e.target as HTMLElement).closest('button') && store().toggleMaximize(id)}
      >
        <AppIcon id={id} size={18} />
        <span className="truncate text-[13px] font-medium">{meta.title}</span>
        <span className="flex-1" />
        <div className="flex h-full">
          <button
            type="button"
            aria-label={`Minimize ${meta.title}`}
            onClick={() => store().minimize(id)}
            className="grid h-full w-11 place-items-center text-fg/80 transition-colors hover:bg-line/10"
          >
            <Minus size={15} />
          </button>
          <button
            type="button"
            aria-label={docked ? `Restore ${meta.title}` : `Maximize ${meta.title}`}
            onClick={() => store().toggleMaximize(id)}
            className="grid h-full w-11 place-items-center text-fg/80 transition-colors hover:bg-line/10"
          >
            {docked ? <Copy size={13} className="-scale-x-100" /> : <Square size={12} />}
          </button>
          <button
            type="button"
            aria-label={`Close ${meta.title}`}
            onClick={() => store().close(id)}
            className="grid h-full w-12 place-items-center text-fg/80 transition-colors hover:bg-red-500 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* App content */}
      <div className="@container relative min-h-0 flex-1 overflow-auto">{content}</div>
      </div>

      {/* Resize handles */}
      {!docked &&
        handles.map((h) => (
          <div
            key={h.dir}
            aria-hidden="true"
            onPointerDown={onResizeDown(h.dir)}
            className={`absolute z-10 ${h.className}`}
            style={{ cursor: h.cursor }}
          />
        ))}
    </motion.div>
  );
}

export default memo(Window);
