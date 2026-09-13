import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Hard ink rule pinned to the top of the viewport that fills as the page
 * scrolls. Sits above the navbar so the frame reads as one continuous edge.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-foreground origin-left z-[70] pointer-events-none"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
