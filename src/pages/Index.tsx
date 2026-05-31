import { motion, AnimatePresence, type Variants } from "framer-motion";
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

// Initial loading animation
const pageVariants: Variants = {
  initial: { 
    opacity: 0
  },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.15
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

const sectionVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 80,
      damping: 20
    }
  }
};

// Premium loading screen
const PremiumLoadingScreen = () => {
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
        return prev + 4;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-8"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Animated logo */}
          <motion.div
            className="relative"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              className="text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              G<span className="text-gradient">.</span>
            </motion.span>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-1 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(217 91% 60%), hsl(190 95% 55%))",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            className="text-sm text-muted-foreground font-mono"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading portfolio...
          </motion.p>

          {/* Background glow */}
          <motion.div
            className="absolute w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(217 91% 60% / 0.08), transparent 70%)",
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Floating ambient particles
const FloatingParticle = ({ delay, size, left, duration }: { delay: number; size: number; left: string; duration: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/10 pointer-events-none"
    style={{
      width: size,
      height: size,
      left,
      bottom: "-20px"
    }}
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: [0, -window.innerHeight - 100],
      opacity: [0, 0.4, 0.4, 0]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatDelay: delay
    }}
  />
);

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground overflow-x-hidden relative"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Ambient particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingParticle delay={0} size={4} left="10%" duration={18} />
        <FloatingParticle delay={3} size={3} left="25%" duration={22} />
        <FloatingParticle delay={5} size={5} left="40%" duration={16} />
        <FloatingParticle delay={2} size={3} left="55%" duration={24} />
        <FloatingParticle delay={4} size={4} left="70%" duration={19} />
        <FloatingParticle delay={1} size={3} left="85%" duration={21} />
      </div>

      {/* Page load overlay */}
      <motion.div
        className="fixed inset-0 z-50 bg-background pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.2,
          ease: [0.65, 0, 0.35, 1]
        }}
        style={{ transformOrigin: "top" }}
      />

      <PremiumLoadingScreen />
      <Navbar />
      <ScrollRobot />
      <main className="relative z-10">
        <motion.div variants={sectionVariants}>
          <Hero />
        </motion.div>
        
        {/* Main Grid: Skills, Projects, and About Sidebar */}
        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column (Skills & Projects) */}
            <div className="lg:col-span-8 space-y-16">
              <motion.div variants={sectionVariants}>
                <Skills />
              </motion.div>
              <motion.div variants={sectionVariants}>
                <Projects />
              </motion.div>
            </div>
            
            {/* Right Column (About Sidebar Card) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <motion.div variants={sectionVariants}>
                <About />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Other Sections */}
        <motion.div variants={sectionVariants}>
          <GithubCalendar />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Experience />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Education />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Certifications />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Contact />
        </motion.div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
