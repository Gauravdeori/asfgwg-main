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
        ink: "var(--ink)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        highlight: "var(--highlight)",
        skill: "var(--skill)",
        field: "var(--field)",
        ok: "var(--ok)",
        screen: "var(--screen)",
        phosphor: "var(--phosphor)",
      },
      fontFamily: {
        pixel: ["'Silkscreen'", "'Pixelify Sans'", "monospace"],
        display: ["'Pixelify Sans'", "'Silkscreen'", "monospace"],
        // VT323 terminal font; body sets font-size-adjust so small sizes stay legible
        mono: ["'VT323'", "'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        none: "0px",
      },
      boxShadow: {
        pixel: "3px 3px 0px var(--shadow-ink)",
        "pixel-lg": "5px 5px 0px var(--shadow-ink)",
      },
    },
  },
  plugins: [],
} satisfies Config;
