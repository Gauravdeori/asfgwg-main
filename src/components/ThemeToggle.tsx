import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * Square ink toggle. Both themes are greyscale, so the icon carries no colour —
 * it inverts against the button fill instead.
 */
const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    setIsTransitioning(true);
    setTimeout(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"), 180);
    setTimeout(() => setIsTransitioning(false), 520);
  };

  // Reserve the slot before hydration so the navbar doesn't shift
  if (!mounted) return <span className="w-9 h-9 block" aria-hidden="true" />;

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <motion.button
        onClick={handleThemeChange}
        className="relative w-9 h-9 flex items-center justify-center border-[1.5px] border-rule bg-background text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        disabled={isTransitioning}
        whileTap={{ scale: 0.92 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              <Moon size={15} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              <Sun size={15} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Hard wipe across the page instead of a coloured glow */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[200] pointer-events-none bg-foreground origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 1, 0] }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.5, times: [0, 0.35, 0.6, 1], ease: [0.76, 0, 0.24, 1] }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeToggle;
