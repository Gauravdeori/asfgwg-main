import { motion, type Variants } from "framer-motion";
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
import PixelCursor from "@/components/PixelCursor";
import { FloatingSprites } from "@/components/PixelDecorations";
import PixelLoadingScreen from "@/components/PixelLoadingScreen";

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

// Floating particles for background
const FloatingParticle = ({ delay, size, left, duration }: { delay: number; size: number; left: string; duration: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20 pointer-events-none"
    style={{
      width: size,
      height: size,
      left,
      bottom: "-20px"
    }}
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: [0, -window.innerHeight - 100],
      opacity: [0, 0.6, 0.6, 0]
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
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingParticle delay={0} size={6} left="10%" duration={15} />
        <FloatingParticle delay={2} size={4} left="20%" duration={18} />
        <FloatingParticle delay={4} size={8} left="35%" duration={12} />
        <FloatingParticle delay={1} size={5} left="50%" duration={20} />
        <FloatingParticle delay={3} size={7} left="65%" duration={14} />
        <FloatingParticle delay={5} size={4} left="80%" duration={16} />
        <FloatingParticle delay={2} size={6} left="90%" duration={17} />
      </div>

      {/* Initial page load overlay animation */}
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

      <PixelLoadingScreen />
      <PixelCursor />
      <FloatingSprites />
      <Navbar />
      <ScrollRobot />
      <main className="relative z-10">
        <motion.div variants={sectionVariants}>
          <Hero />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <About />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <GithubCalendar />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Skills />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Projects />
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
