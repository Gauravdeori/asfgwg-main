import { motion } from "framer-motion";
import PixelSprite from "./PixelSprite";

// Floating animated sprites that appear in sections
export const FloatingSprites = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top left corner */}
      <motion.div
        className="absolute top-32 left-8"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <PixelSprite type="star" size={3} />
      </motion.div>

      {/* Top right */}
      <motion.div
        className="absolute top-48 right-12"
        animate={{
          y: [0, 8, 0],
          x: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <PixelSprite type="diamond" size={2} />
      </motion.div>

      {/* Middle left */}
      <motion.div
        className="absolute top-[40%] left-4"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <PixelSprite type="heart" size={2} />
      </motion.div>

      {/* Middle right */}
      <motion.div
        className="absolute top-[60%] right-8"
        animate={{
          y: [0, 10, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <PixelSprite type="coin" size={3} />
      </motion.div>

      {/* Bottom left */}
      <motion.div
        className="absolute bottom-[30%] left-16"
        animate={{
          y: [0, -8, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        <PixelSprite type="star" size={2} />
      </motion.div>
    </div>
  );
};

// Pixel corner decorations
export const PixelCorner = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 rotate-90",
    "bottom-left": "bottom-0 left-0 -rotate-90",
    "bottom-right": "bottom-0 right-0 rotate-180",
  };

  return (
    <div className={`absolute ${positionClasses[position]} pointer-events-none`}>
      <svg width="24" height="24" viewBox="0 0 24 24" style={{ imageRendering: "pixelated" }}>
        <rect x="0" y="0" width="4" height="4" fill="hsl(var(--primary))" opacity="0.3" />
        <rect x="4" y="0" width="4" height="4" fill="hsl(var(--primary))" opacity="0.2" />
        <rect x="8" y="0" width="4" height="4" fill="hsl(var(--primary))" opacity="0.1" />
        <rect x="0" y="4" width="4" height="4" fill="hsl(var(--primary))" opacity="0.2" />
        <rect x="0" y="8" width="4" height="4" fill="hsl(var(--primary))" opacity="0.1" />
      </svg>
    </div>
  );
};

// Pixel divider line
export const PixelDivider = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center gap-1 ${className}`} style={{ imageRendering: "pixelated" }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-primary"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.3 + (Math.sin(i * 0.5) * 0.2),
            scale: 1,
          }}
          transition={{
            delay: i * 0.05,
            duration: 0.3,
          }}
          style={{
            opacity: 0.1 + (i % 3) * 0.15,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingSprites;
