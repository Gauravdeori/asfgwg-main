import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GithubCalendar from "@/components/GithubCalendar";
import ScrollRobot from "@/components/ScrollRobot";

const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, when: "beforeChildren" } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const NAME = "GAURAV";
const PANELS = 6;

/**
 * Cinematic intro: the name flips up letter-by-letter over a dark navy screen,
 * a glowing underline sweeps across, then the screen shatters into vertical
 * panels that slide up like blinds to reveal the site.
 */
const IntroAnimation = ({ onDone }: { onDone: () => void }) => {
  const reduce = useReducedMotion();
  const [revealing, setRevealing] = useState(false);

  useEffect(() => {
    if (reduce) {
      onDone();
      return;
    }
    const t1 = setTimeout(() => setRevealing(true), 1900);
    const t2 = setTimeout(onDone, 2900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce, onDone]);

  if (reduce) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-none">
      {/* Panels layer — slide up like blinds on reveal */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: PANELS }).map((_, i) => (
          <motion.div
            key={i}
            className="h-full flex-1"
            style={{ background: "linear-gradient(180deg, #0b1220 0%, #060a12 100%)" }}
            initial={{ y: 0 }}
            animate={revealing ? { y: "-100%" } : { y: 0 }}
            transition={{
              duration: 0.7,
              delay: revealing ? i * 0.07 : 0,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        ))}
      </div>

      {/* Ambient glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(204 100% 50% / 0.18), transparent 65%)" }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={revealing ? { opacity: 0 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Wordmark */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        animate={revealing ? { opacity: 0, scale: 1.08 } : { opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="flex items-end"
          style={{ perspective: 900, fontFamily: "'Zalando Sans Expanded','Inter Tight',sans-serif" }}
        >
          {NAME.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="text-white font-black text-5xl sm:text-7xl md:text-8xl leading-none tracking-tight"
              style={{ transformOrigin: "50% 100%", display: "inline-block" }}
              initial={{ opacity: 0, rotateX: 95, y: 20 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              {ch}
            </motion.span>
          ))}
          <motion.span
            className="text-5xl sm:text-7xl md:text-8xl font-black leading-none"
            style={{ color: "hsl(204 100% 55%)" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + NAME.length * 0.07, type: "spring", stiffness: 300 }}
          >
            .
          </motion.span>
        </div>

        {/* Underline sweep */}
        <motion.div
          className="h-[3px] mt-5 rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(204 100% 55%), hsl(262 83% 58%))" }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "min(70vw, 340px)", opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        />

        <motion.p
          className="mt-6 text-white/50 font-mono text-[11px] uppercase tracking-[0.35em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          Full Stack Developer
        </motion.p>
      </motion.div>
    </div>
  );
};

const Index = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!introDone && <IntroAnimation onDone={() => setIntroDone(true)} />}
      </AnimatePresence>

      <motion.div
        className="min-h-screen bg-background text-foreground relative"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Navbar />
        <ScrollRobot />
        <main className="relative z-10">
          <Hero />
          <Skills />
          <Projects />
          <About />
          <GithubCalendar />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
