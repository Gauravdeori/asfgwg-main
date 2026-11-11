import type { Config } from "tailwindcss";

/** Colours read "R G B" channel variables from index.css so opacity modifiers work. */
const c = (v: string) => `rgb(var(--${v}) / <alpha-value>)`;

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: c("bg"),
        fg: c("fg"),
        muted: c("muted"),
        glass: c("glass"),
        "glass-2": c("glass-2"),
        line: c("line"),
        accent: c("accent"),
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
} satisfies Config;
