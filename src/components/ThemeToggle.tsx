import React, { useEffect, useState } from 'react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null;
    if (current) {
      setTheme(current);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="w-8 h-8 flex items-center justify-center border border-border bg-surface hover:border-border-strong hover:bg-surface-2 transition-colors cursor-pointer select-none text-text"
      id="theme-toggle-btn"
    >
      {theme === 'dark' ? (
        // Pixel Sun Icon (crisp SVG)
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pixelated text-text"
        >
          <rect x="6" y="6" width="4" height="4" fill="currentColor" />
          <rect x="7" y="2" width="2" height="2" fill="currentColor" />
          <rect x="7" y="12" width="2" height="2" fill="currentColor" />
          <rect x="2" y="7" width="2" height="2" fill="currentColor" />
          <rect x="12" y="7" width="2" height="2" fill="currentColor" />
          <rect x="4" y="4" width="1" height="1" fill="currentColor" />
          <rect x="11" y="4" width="1" height="1" fill="currentColor" />
          <rect x="4" y="11" width="1" height="1" fill="currentColor" />
          <rect x="11" y="11" width="1" height="1" fill="currentColor" />
        </svg>
      ) : (
        // Pixel Moon Icon (crisp SVG)
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pixelated text-text"
        >
          <path
            d="M6 3H9V5H10V7H11V9H10V11H9V13H6V11H5V5H6V3Z"
            fill="currentColor"
          />
          <path
            d="M8 5H9V7H10V9H9V11H8V5Z"
            fill="var(--surface)"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
