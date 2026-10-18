import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        highlight: "var(--highlight)",
      },
      fontFamily: {
        pixel: ["'Silkscreen'", "'Pixelify Sans'", "monospace"],
        mono: ["'JetBrains Mono'", "'IBM Plex Mono'", "monospace"],
      },
      borderRadius: {
        none: "0px",
      },
      boxShadow: {
        pixel: "2px 2px 0px var(--shadow-ink)",
        "pixel-lg": "3px 3px 0px var(--shadow-ink)",
      },
    },
  },
  plugins: [],
} satisfies Config;
