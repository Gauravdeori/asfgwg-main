import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PixelCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * { cursor: none !important; }
      `}</style>
      
      {/* Main pixel cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x - 8,
          top: position.y - 8,
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        {/* 16x16 pixel cursor design */}
        <svg width="16" height="16" viewBox="0 0 16 16" className="drop-shadow-lg">
          {/* Outer border */}
          <rect x="0" y="0" width="2" height="2" fill="hsl(var(--foreground))" />
          <rect x="2" y="2" width="2" height="2" fill="hsl(var(--foreground))" />
          <rect x="4" y="4" width="2" height="2" fill="hsl(var(--foreground))" />
          <rect x="6" y="6" width="2" height="2" fill="hsl(var(--foreground))" />
          <rect x="8" y="8" width="2" height="2" fill="hsl(var(--foreground))" />
          <rect x="10" y="10" width="2" height="2" fill="hsl(var(--foreground))" />
          
          {/* Inner fill */}
          <rect x="0" y="2" width="2" height="10" fill="hsl(var(--primary))" />
          <rect x="2" y="4" width="2" height="8" fill="hsl(var(--primary))" />
          <rect x="4" y="6" width="2" height="6" fill="hsl(var(--primary))" />
          <rect x="6" y="8" width="2" height="4" fill="hsl(var(--primary))" />
          
          {/* Highlight */}
          <rect x="2" y="2" width="2" height="2" fill="hsl(var(--primary))" opacity="0.8" />
        </svg>
      </motion.div>

      {/* Trailing pixel particles */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: position.x,
          top: position.y,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute w-1 h-1 bg-primary"
          style={{ imageRendering: "pixelated" }}
          animate={{
            x: [0, -8, -12],
            y: [0, 8, 16],
            opacity: [0.8, 0.4, 0],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-1 h-1 bg-primary/60"
          style={{ imageRendering: "pixelated" }}
          animate={{
            x: [0, 6, 10],
            y: [0, 10, 20],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "linear",
            delay: 0.1,
          }}
        />
      </motion.div>
    </>
  );
};

export default PixelCursor;
