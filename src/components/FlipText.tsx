import { motion } from "framer-motion";

interface FlipTextProps {
  text: string;
  /** Seconds between each letter */
  stagger?: number;
  /** Base delay before the first letter */
  delay?: number;
  /** Animate immediately on mount instead of when scrolled into view */
  immediate?: boolean;
  /** Extra class applied to every letter (e.g. gradient text) */
  letterClassName?: string;
}

/**
 * Per-letter 3D flip reveal: letters start face-down (rotateX 100°) inside a
 * 1200px perspective and flip up into place — the reference site's signature
 * text effect. Words stay unbreakable so lines wrap naturally.
 */
const FlipText = ({ text, stagger = 0.035, delay = 0, immediate = false, letterClassName = "" }: FlipTextProps) => {
  let letterIndex = 0;

  const animationProps = immediate
    ? { animate: { opacity: 1, rotateX: 0 } }
    : {
        whileInView: { opacity: 1, rotateX: 0 },
        // vertical-only margin: a horizontal margin would exclude letters near
        // the left viewport edge, leaving leading characters invisible
        viewport: { once: true, margin: "-60px 0px -60px 0px" },
      };

  return (
    <span style={{ perspective: 1200 }} className="inline-block" aria-label={text}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split("").map((ch, ci) => {
            const i = letterIndex++;
            return (
              <motion.span
                key={ci}
                className={`inline-block ${letterClassName}`}
                style={{ transformOrigin: "50% 100%", backfaceVisibility: "hidden" }}
                initial={{ opacity: 0, rotateX: 100 }}
                transition={{
                  delay: delay + i * stagger,
                  duration: 0.55,
                  ease: [0.25, 1, 0.5, 1],
                }}
                {...animationProps}
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < text.split(" ").length - 1 && <span aria-hidden="true">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

export default FlipText;
