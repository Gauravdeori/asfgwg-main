/** First focusable element on every screen: jumps to the plain portfolio. */
export default function SkipLink() {
  return (
    <a
      href="?view=simple"
      className="sr-only fixed left-3 top-3 z-[3000] rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-white"
    >
      Skip to simple view
    </a>
  );
}
