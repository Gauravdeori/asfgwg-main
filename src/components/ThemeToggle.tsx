import React, { useEffect, useState } from 'react';
import { playClick } from '../lib/sfx';

type Theme = 'dark' | 'light';

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.classList.toggle('dark', theme === 'dark');
  try {
    localStorage.setItem('portfolio-theme', theme);
  } catch {
    // storage blocked — theme still applies for this visit
  }
};

/**
 * A house switchboard rocker. Lights ON = light theme, OFF = dark theme.
 * As in Indian/UK wiring, the switch is ON when the bottom half is pressed.
 * Flipping it plays a "clack" and a tube-light flicker across the room.
 */
export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [flicker, setFlicker] = useState<null | 'on' | 'off'>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as Theme | null;
    if (current) setTheme(current);
  }, []);

  const lightsOn = theme === 'light';

  const flip = () => {
    if (flicker) return;
    playClick('switch');
    const next: Theme = lightsOn ? 'dark' : 'light';
    setTheme(next);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyTheme(next);
      return;
    }
    setFlicker(lightsOn ? 'off' : 'on');
    setTimeout(() => applyTheme(next), 150);
    setTimeout(() => setFlicker(null), 620);
  };

  return (
    <>
      <button
        type="button"
        role="switch"
        aria-checked={lightsOn}
        aria-label="Room lights (light theme)"
        title={lightsOn ? 'Lights off' : 'Lights on'}
        onClick={flip}
        className="switch-plate"
        id="theme-toggle-btn"
      >
        <span className="switch-screw top-[3px]" aria-hidden="true" />
        <span className="switch-screw bottom-[3px]" aria-hidden="true" />

        <span className="rocker" aria-hidden="true">
          <span className="rocker-half" data-down={!lightsOn} />
          <span className="rocker-half" data-down={lightsOn} />
        </span>

        {/* indicator lamp: red when on, glow-in-the-dark locator when off */}
        <span
          aria-hidden="true"
          className="absolute right-[3px] top-1/2 h-[6px] w-[4px] -translate-y-1/2 border border-ink"
          style={
            lightsOn
              ? { background: 'var(--led)', boxShadow: '0 0 6px var(--led)' }
              : { background: 'color-mix(in srgb, var(--phosphor) 60%, transparent)', boxShadow: '0 0 6px var(--phosphor)' }
          }
        />
      </button>

      {flicker && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[200]"
          style={{
            background: flicker === 'off' ? '#000' : '#fffbea',
            animation: `${flicker === 'off' ? 'lights-off' : 'lights-on'} 600ms linear forwards`,
          }}
        />
      )}
    </>
  );
};

export default ThemeToggle;
