import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import PixelSprite from "./PixelSprite";

const PixelLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-8"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Animated pixel character */}
          <motion.div
            className="relative"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Pixel robot/character */}
            <div style={{ imageRendering: "pixelated" }} className="scale-[3]">
              <svg width="24" height="24" viewBox="0 0 24 24">
                {/* Head */}
                <rect x="8" y="2" width="8" height="8" fill="hsl(var(--primary))" />
                {/* Eyes */}
                <rect x="10" y="4" width="2" height="2" fill="hsl(var(--background))" />
                <rect x="14" y="4" width="2" height="2" fill="hsl(var(--background))" />
                {/* Antenna */}
                <rect x="11" y="0" width="2" height="2" fill="hsl(var(--primary))" />
                {/* Body */}
                <rect x="6" y="10" width="12" height="8" fill="hsl(var(--primary))" />
                {/* Arms */}
                <rect x="2" y="10" width="4" height="2" fill="hsl(var(--primary))" />
                <rect x="18" y="10" width="4" height="2" fill="hsl(var(--primary))" />
                {/* Legs */}
                <rect x="8" y="18" width="3" height="4" fill="hsl(var(--primary))" />
                <rect x="13" y="18" width="3" height="4" fill="hsl(var(--primary))" />
                {/* Chest detail */}
                <rect x="10" y="12" width="4" height="4" fill="hsl(var(--background))" />
              </svg>
            </div>
          </motion.div>

          {/* Loading text */}
          <motion.div
            className="text-lg font-mono text-primary"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            LOADING...
          </motion.div>

          {/* Pixel progress bar */}
          <div className="w-48 h-4 border-2 border-primary relative" style={{ imageRendering: "pixelated" }}>
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            {/* Pixel segments */}
            <div className="absolute inset-0 flex">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 border-r border-background/30 last:border-r-0"
                />
              ))}
            </div>
          </div>

          {/* Floating pixel stars */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              >
                <PixelSprite type="star" size={2} animated={false} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PixelLoadingScreen;
