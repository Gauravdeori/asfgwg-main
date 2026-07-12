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

const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// Minimal white loading screen
const LoadingScreen = () => {
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
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center gap-8"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.span
            className="font-script text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Gaurav<span className="text-primary">.</span>
          </motion.span>

          <div className="w-48 h-px bg-border overflow-hidden">
            <motion.div
              className="h-full bg-foreground"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Index = () => {
  return (
    <motion.div
      className="min-h-screen bg-white text-foreground relative"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <LoadingScreen />
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
  );
};

export default Index;
