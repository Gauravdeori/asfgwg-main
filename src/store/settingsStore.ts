import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AccentId, WallpaperId } from '../lib/appearance';

export type Theme = 'dark' | 'light';

interface SettingsState {
  theme: Theme;
  accent: AccentId;
  wallpaper: WallpaperId;
  /** Replay the boot animation on every visit (first visit always plays it). */
  bootEveryVisit: boolean;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setAccent: (a: AccentId) => void;
  setWallpaper: (w: WallpaperId) => void;
  setBootEveryVisit: (v: boolean) => void;
}

/** User preferences, persisted to localStorage under "gauravos-settings". */
export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'dark',
      accent: 'indigo',
      wallpaper: 'aurora',
      bootEveryVisit: false,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      setAccent: (accent) => set({ accent }),
      setWallpaper: (wallpaper) => set({ wallpaper }),
      setBootEveryVisit: (bootEveryVisit) => set({ bootEveryVisit }),
    }),
    { name: 'gauravos-settings' },
  ),
);
