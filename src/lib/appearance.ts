/** Accent colours and wallpapers available in Settings. */

export const accents = {
  indigo: { label: 'Indigo', rgb: '99 102 241' },
  blue: { label: 'Blue', rgb: '59 130 246' },
  teal: { label: 'Teal', rgb: '20 184 166' },
  rose: { label: 'Rose', rgb: '244 63 94' },
  amber: { label: 'Amber', rgb: '245 158 11' },
  violet: { label: 'Violet', rgb: '139 92 246' },
} as const;

export type AccentId = keyof typeof accents;

type Theme = 'dark' | 'light';

/**
 * Wallpapers are CSS backgrounds (no image download) except "Dibrugarh",
 * which uses the pixel-art city illustration. `aurora` follows the accent.
 */
export const wallpapers: Record<string, { label: string; css: Record<Theme, string> }> = {
  aurora: {
    label: 'Aurora',
    css: {
      dark:
        'radial-gradient(1100px 760px at 12% 18%, rgb(var(--accent) / .55), transparent 62%), radial-gradient(900px 700px at 88% 26%, rgb(236 72 153 / .30), transparent 60%), radial-gradient(1000px 800px at 62% 96%, rgb(34 211 238 / .25), transparent 62%), #07070d',
      light:
        'radial-gradient(1100px 760px at 12% 18%, rgb(var(--accent) / .35), transparent 62%), radial-gradient(900px 700px at 88% 26%, rgb(236 72 153 / .22), transparent 60%), radial-gradient(1000px 800px at 62% 96%, rgb(34 211 238 / .25), transparent 62%), #eef0f8',
    },
  },
  dusk: {
    label: 'Dusk',
    css: {
      dark: 'linear-gradient(160deg, #1e1b4b 0%, #4c1d95 45%, #9a3412 100%)',
      light: 'linear-gradient(160deg, #e0e7ff 0%, #fbcfe8 50%, #fed7aa 100%)',
    },
  },
  ocean: {
    label: 'Ocean',
    css: {
      dark: 'linear-gradient(185deg, #071426 0%, #0c3456 50%, #0f5f5a 100%)',
      light: 'linear-gradient(185deg, #dbeafe 0%, #bae6fd 50%, #a7f3d0 100%)',
    },
  },
  graphite: {
    label: 'Graphite',
    css: {
      dark: 'radial-gradient(120% 90% at 50% 0%, #2b2b35 0%, #0b0b10 70%)',
      light: 'radial-gradient(120% 90% at 50% 0%, #ffffff 0%, #dfe0e7 75%)',
    },
  },
  dibrugarh: {
    label: 'Dibrugarh',
    css: {
      dark: 'linear-gradient(rgb(0 0 0 / .25), rgb(0 0 0 / .35)), url(/images/hero-dark.png) center / cover',
      light: 'linear-gradient(rgb(255 255 255 / .1), rgb(255 255 255 / .1)), url(/images/hero-light.png) center / cover',
    },
  },
};

export type WallpaperId = keyof typeof wallpapers;
