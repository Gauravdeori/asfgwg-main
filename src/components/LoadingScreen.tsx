import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const NAME = "GAURAV";
const STEPS = ["LOADING PROJECTS...", "LOADING SYSTEMS...", "LOADING EXPERIENCE...", "SYSTEM ONLINE"];
const PANELS = 6;
const SEEN_KEY = "gd-intro";

/**
 * Boot sequence: the wordmark flips up letter-by-letter while system steps
 * tick through to 100%, then the screen splits into shutters that clear
 * upward. Plays once per session; skippable.
 */
export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"boot" | "reveal" | "done">("boot");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* storage blocked — just play it */
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || seen) {
      setPhase("done");
      onDone();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    STEPS.forEach((_, i) => timers.push(setTimeout(() => setStep(i + 1), 380 * (i + 1))));
    timers.push(setTimeout(() => setPhase("reveal"), 2000));
    timers.push(
      setTimeout(() => {
        markSeen();
        setPhase("done");
        onDone();
      }, 2900),
    );
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const markSeen = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const skip = () => {
    markSeen();
    setPhase("done");
    onDone();
  };

  const revealing = phase === "reveal";
  const pct = Math.round((step / STEPS.length) * 100);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Shutters */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: PANELS }).map((_, i) => (
              <motion.div
                key={i}
                className="h-full flex-1 bg-background"
                animate={revealing ? { y: "-100%" } : { y: 0 }}
                transition={{ duration: 0.7, delay: revealing ? i * 0.06 : 0, ease: [0.76, 0, 0.24, 1] }}
              />
            ))}
          </div>

          <motion.div
            className="tech-grid absolute inset-0 flex flex-col justify-between p-6 md:p-10"
            animate={revealing ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <span className="label-mono">INITIALIZING GAURAV.DEORI</span>
              <button onClick={skip} className="label-mono pointer-events-auto hover:text-foreground">
                SKIP →
              </button>
            </div>

            <div className="mx-auto w-full max-w-xl">
              <div className="mb-10 flex items-end" style={{ perspective: 900 }}>
                {NAME.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    className="display-xl text-glow inline-block text-6xl text-foreground md:text-8xl"
                    style={{ transformOrigin: "50% 100%" }}
                    initial={{ opacity: 0, rotateX: 95, y: 20 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                  >
                    {ch}
                  </motion.span>
                ))}
                <motion.span
                  className="mb-2 ml-2 h-3 w-3 bg-foreground md:h-4 md:w-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15 + NAME.length * 0.07, duration: 0.3 }}
                />
              </div>

              <div className="space-y-2">
                {STEPS.map((s, i) => (
                  <div
                    key={s}
                    className={`label-mono flex items-center gap-3 transition-opacity duration-300 ${
                      i < step ? "text-foreground opacity-100" : "opacity-25"
                    }`}
                  >
                    <span className="h-1 w-1 bg-current" />
                    {s}
                  </div>
                ))}
              </div>
              <div className="mt-6 h-px w-full bg-border">
                <motion.div
                  className="h-px bg-foreground"
                  animate={{ width: `${pct}%` }}
                  transition={{ ease: "easeOut", duration: 0.35 }}
                />
              </div>
            </div>

            <div className="flex items-end justify-between">
              <span className="label-mono">V.02</span>
              <span className="display-xl text-4xl tabular-nums text-foreground md:text-6xl">
                {String(pct).padStart(3, "0")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
