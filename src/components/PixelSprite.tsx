import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PixelSpriteProps {
  type: "star" | "heart" | "diamond" | "coin";
  size?: number;
  className?: string;
  animated?: boolean;
}

const sprites = {
  star: [
    "    ##    ",
    "    ##    ",
    "##########",
    " ######## ",
    "  ######  ",
    " ######## ",
    "##  ##  ##",
    "#   ##   #",
  ],
  heart: [
    " ## ## ",
    "#######",
    "#######",
    "#######",
    " ##### ",
    "  ###  ",
    "   #   ",
  ],
  diamond: [
    "   ##   ",
    "  ####  ",
    " ###### ",
    "########",
    " ###### ",
    "  ####  ",
    "   ##   ",
  ],
  coin: [
    "  ####  ",
    " ###### ",
    "## ## ##",
    "## ## ##",
    "## ## ##",
    " ###### ",
    "  ####  ",
  ],
};

const PixelSprite = ({ type, size = 2, className = "", animated = true }: PixelSpriteProps) => {
  const sprite = sprites[type];
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!animated) return;
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 2);
    }, 500);
    return () => clearInterval(interval);
  }, [animated]);

  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ imageRendering: "pixelated" }}
      animate={animated ? {
        y: frame === 0 ? 0 : -2,
        scale: frame === 0 ? 1 : 1.05,
      } : {}}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col">
        {sprite.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.split("").map((pixel, pixelIndex) => (
              <div
                key={pixelIndex}
                style={{
                  width: size,
                  height: size,
                  backgroundColor: pixel === "#" ? "hsl(var(--primary))" : "transparent",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PixelSprite;
