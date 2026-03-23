import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Pixel rocket component
const PixelRocket = ({ direction }: { direction: "up" | "down" }) => (
  <div style={{ imageRendering: "pixelated" }} className="scale-[2]">
    <svg width="16" height="24" viewBox="0 0 16 24">
      {/* Rocket body */}
      <rect x="6" y="4" width="4" height="12" fill={direction === "up" ? "hsl(var(--primary))" : "hsl(45, 100%, 60%)"} />
      {/* Nose cone */}
      <rect x="7" y="2" width="2" height="2" fill={direction === "up" ? "hsl(var(--primary))" : "hsl(45, 100%, 60%)"} />
      <rect x="6" y="0" width="4" height="2" fill={direction === "up" ? "hsl(var(--primary))" : "hsl(45, 100%, 60%)"} />
      {/* Wings */}
      <rect x="4" y="12" width="2" height="4" fill={direction === "up" ? "hsl(var(--primary))" : "hsl(45, 100%, 60%)"} />
      <rect x="10" y="12" width="2" height="4" fill={direction === "up" ? "hsl(var(--primary))" : "hsl(45, 100%, 60%)"} />
      {/* Window */}
      <rect x="7" y="6" width="2" height="2" fill="hsl(var(--background))" />
      {/* Fire/exhaust */}
      <rect x="7" y="16" width="2" height="2" fill="hsl(25, 100%, 50%)" />
      <rect x="6" y="18" width="4" height="2" fill="hsl(45, 100%, 60%)" />
      <rect x="7" y="20" width="2" height="2" fill="hsl(45, 100%, 80%)" />
    </svg>
  </div>
);

// Pixel stars for the transition
const PixelStars = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-foreground"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          imageRendering: "pixelated",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.3,
          delay: i * 0.02,
        }}
      />
    ))}
  </div>
);

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    setIsTransitioning(true);
    
    // Delay the actual theme change to show the animation
    setTimeout(() => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }, 400);

    // Hide transition overlay after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={handleThemeChange}
        className="relative p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors duration-300"
        aria-label="Toggle theme"
        disabled={isTransitioning}
      >
        <motion.div
          initial={false}
          animate={{ rotate: resolvedTheme === "dark" ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          {resolvedTheme === "dark" ? (
            <Moon size={18} className="text-primary" />
          ) : (
            <Sun size={18} className="text-amber-500" />
          )}
        </motion.div>
      </button>

      {/* Theme transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[200] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Background flash */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: resolvedTheme === "dark" 
                  ? "linear-gradient(to top, hsl(var(--background)), hsl(45, 100%, 95%))" 
                  : "linear-gradient(to bottom, hsl(var(--background)), hsl(240, 10%, 10%))",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.8 }}
            />

            {/* Pixel stars */}
            <PixelStars />

            {/* Flying rocket */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              initial={{ 
                y: resolvedTheme === "dark" ? "100vh" : "-100px",
                rotate: resolvedTheme === "dark" ? 0 : 180,
              }}
              animate={{ 
                y: resolvedTheme === "dark" ? "-100px" : "100vh",
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <PixelRocket direction={resolvedTheme === "dark" ? "up" : "down"} />
              
              {/* Trail particles */}
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-primary/50"
                  style={{
                    top: resolvedTheme === "dark" ? 48 + i * 12 : -12 - i * 12,
                    imageRendering: "pixelated",
                  }}
                  animate={{
                    opacity: [0.8, 0],
                    scale: [1, 0.5],
                  }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.05,
                    repeat: 3,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeToggle;
