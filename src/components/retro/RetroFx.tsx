import { useEffect } from 'react';
import { playClick } from '../../lib/sfx';

/**
 * Pixel-art system cursors (arrow + pointing hand) built as SVG data URLs and
 * handed to CSS, so the browser draws them natively with zero lag. Also plays
 * the key "tick" whenever a button-style key is pressed anywhere on the page.
 */
const ARROW = [
  'B..........',
  'BB.........',
  'BWB........',
  'BWWB.......',
  'BWWWB......',
  'BWWWWB.....',
  'BWWWWWB....',
  'BWWWWWWB...',
  'BWWWWWWWB..',
  'BWWWWWWWWB.',
  'BWWWWWBBBBB',
  'BWWBWWB....',
  'BWB.BWWB...',
  'BB..BWWB...',
  'B....BWWB..',
  '.....BWWB..',
  '......BB...',
];

const HAND = [
  '.....BB.........',
  '....BWWB........',
  '....BWWB........',
  '....BWWB........',
  '....BWWBBB......',
  '....BWWBWWBBB...',
  '....BWWBWWBWWBB.',
  '.BB.BWWBWWBWWBWB',
  'BWWBBWWWWWWWWBWB',
  'BWWWBWWWWWWWWWWB',
  '.BWWWWWWWWWWWWWB',
  '..BWWWWWWWWWWWWB',
  '..BWWWWWWWWWWWB.',
  '...BWWWWWWWWWWB.',
  '....BWWWWWWWWB..',
  '....BWWWWWWWWB..',
  '....BBBBBBBBBB..',
];

function toCursor(rows: string[], scale: number, hotX: number, hotY: number) {
  let rects = '';
  rows.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch === '.') return;
      const fill = ch === 'B' ? '#111' : '#fff';
      rects += `<rect x="${x * scale}" y="${y * scale}" width="${scale}" height="${scale}" fill="${fill}"/>`;
    }),
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${rows[0].length * scale}" height="${rows.length * scale}" shape-rendering="crispEdges">${rects}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${hotX} ${hotY}`;
}

const KEY_SELECTOR = '.pixel-btn-primary, .pixel-btn-outline, .win-btn, [data-key]';

export default function RetroFx() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(pointer: fine)').matches) {
      root.style.setProperty('--cur-arrow', toCursor(ARROW, 2, 0, 0));
      root.style.setProperty('--cur-hand', toCursor(HAND, 2, 11, 0));
      root.classList.add('px-cursor');
    }

    const onDown = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest(KEY_SELECTOR);
      if (el && !(el as HTMLButtonElement).disabled) playClick('key');
    };
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      root.classList.remove('px-cursor');
    };
  }, []);

  return null;
}
