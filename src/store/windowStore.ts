import { create } from 'zustand';
import { apps, type AppId } from '../apps/meta';

export const TASKBAR_H = 56;
export const MIN_W = 360;
export const MIN_H = 260;

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type Snap = 'left' | 'right' | null;

export interface WindowState {
  id: AppId;
  rect: Rect;
  minimized: boolean;
  maximized: boolean;
  snap: Snap;
  /** Extra data an app was opened with (e.g. which project to show). */
  payload?: Record<string, unknown>;
  /** Bumps whenever a new payload arrives so the app can react to it. */
  payloadKey: number;
}

interface WindowStore {
  windows: Partial<Record<AppId, WindowState>>;
  /** Stacking order, bottom → top. Index = z-order. */
  order: AppId[];
  activeId: AppId | null;
  snapPreview: 'left' | 'right' | 'max' | null;

  open: (id: AppId, payload?: Record<string, unknown>) => void;
  close: (id: AppId) => void;
  focus: (id: AppId) => void;
  minimize: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  setRect: (id: AppId, rect: Rect) => void;
  setSnap: (id: AppId, snap: Snap | 'max') => void;
  /** Leave maximized/snapped state with a given rect (used when dragging out). */
  restoreTo: (id: AppId, rect: Rect) => void;
  setSnapPreview: (p: WindowStore['snapPreview']) => void;
  closeAll: () => void;
}

/** Size of the area windows live in (everything above the taskbar). */
export const desktopSize = () => ({
  w: typeof window === 'undefined' ? 1280 : window.innerWidth,
  h: typeof window === 'undefined' ? 720 : window.innerHeight - TASKBAR_H,
});

/** The highest non-minimized window, which becomes focused after a change. */
const topVisible = (order: AppId[], windows: WindowStore['windows']) =>
  [...order].reverse().find((id) => windows[id] && !windows[id]!.minimized) ?? null;

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: {},
  order: [],
  activeId: null,
  snapPreview: null,

  open: (id, payload) => {
    const { windows, order } = get();
    const existing = windows[id];

    if (existing) {
      set({
        windows: {
          ...windows,
          [id]: {
            ...existing,
            minimized: false,
            ...(payload ? { payload, payloadKey: existing.payloadKey + 1 } : {}),
          },
        },
        order: [...order.filter((o) => o !== id), id],
        activeId: id,
      });
      return;
    }

    // Cascade new windows from the centre so they never stack exactly
    const { w: dw, h: dh } = desktopSize();
    const meta = apps[id];
    const w = Math.min(meta.size.w, dw - 48);
    const h = Math.min(meta.size.h, dh - 32);
    const step = (order.length % 6) * 28;
    const x = Math.max(8, Math.round((dw - w) / 2) - 70 + step);
    const y = Math.max(8, Math.round((dh - h) / 2) - 40 + step);

    set({
      windows: {
        ...windows,
        [id]: { id, rect: { x, y, w, h }, minimized: false, maximized: false, snap: null, payload, payloadKey: 0 },
      },
      order: [...order, id],
      activeId: id,
    });
  },

  close: (id) => {
    const { windows, order } = get();
    const next = { ...windows };
    delete next[id];
    const nextOrder = order.filter((o) => o !== id);
    set({ windows: next, order: nextOrder, activeId: topVisible(nextOrder, next) });
  },

  focus: (id) => {
    const { windows, order, activeId } = get();
    const win = windows[id];
    if (!win || (activeId === id && !win.minimized)) return;
    set({
      windows: { ...windows, [id]: { ...win, minimized: false } },
      order: [...order.filter((o) => o !== id), id],
      activeId: id,
    });
  },

  minimize: (id) => {
    const { windows, order } = get();
    const win = windows[id];
    if (!win) return;
    const next = { ...windows, [id]: { ...win, minimized: true } };
    set({ windows: next, activeId: topVisible(order, next) });
  },

  toggleMaximize: (id) => {
    const { windows } = get();
    const win = windows[id];
    if (!win) return;
    const maximize = !(win.maximized || win.snap);
    set({ windows: { ...windows, [id]: { ...win, maximized: maximize, snap: null } } });
    get().focus(id);
  },

  setRect: (id, rect) => {
    const { windows } = get();
    const win = windows[id];
    if (!win) return;
    set({ windows: { ...windows, [id]: { ...win, rect } } });
  },

  setSnap: (id, snap) => {
    const { windows } = get();
    const win = windows[id];
    if (!win) return;
    set({
      windows: {
        ...windows,
        [id]: { ...win, maximized: snap === 'max', snap: snap === 'max' ? null : snap },
      },
    });
  },

  restoreTo: (id, rect) => {
    const { windows } = get();
    const win = windows[id];
    if (!win) return;
    set({ windows: { ...windows, [id]: { ...win, rect, maximized: false, snap: null } } });
  },

  setSnapPreview: (snapPreview) => {
    if (get().snapPreview !== snapPreview) set({ snapPreview });
  },

  closeAll: () => set({ windows: {}, order: [], activeId: null }),
}));

/** Open an app from anywhere (Terminal, Start menu, links inside apps…). */
export const openApp = (id: AppId, payload?: Record<string, unknown>) => useWindowStore.getState().open(id, payload);
