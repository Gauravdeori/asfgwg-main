import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import ChatBot from "./ChatBot";

// Section-specific messages for context awareness
const sectionMessages: Record<string, string[]> = {
  hero: ["Welcome! 👋", "Scroll down! ⬇️", "Hey there! 🙌"],
  about: ["Learn more! 📖", "Cool story! 📝", "Nice bio! ✨"],
  skills: ["So skilled! 💪", "Tech stack! 🛠️", "Impressive! 🔥"],
  projects: ["Cool work! 🚀", "Nice builds! 💻", "Creative! 🎨"],
  experience: ["Journey! 🛤️", "Experience! 📈", "Growth! 🌱"],
  education: ["Learning! 📚", "Knowledge! 🎓", "Smart! 🧠"],
  contact: ["Say hi! 💬", "Connect! 🤝", "Reach out! 📧"],
};

const ScrollRobot = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Scroll tracking
  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  
  // Smooth the velocity for better animation
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 100, damping: 30 });
  
  // Robot position follows scroll - responsive values
  const robotY = useTransform(scrollY, [0, 1000], [100, 600]);
  const smoothRobotY = useSpring(robotY, { stiffness: 50, damping: 20 });
  
  // Robot reactions based on scroll speed
  const eyeSize = useTransform(smoothVelocity, [-0.01, 0, 0.01], [1.5, 1, 1.5]);
  const mouthWidth = useTransform(smoothVelocity, [-0.02, 0, 0.02], [1.5, 1, 1.5]);
  const robotRotate = useTransform(smoothVelocity, [-0.02, 0, 0.02], [-15, 0, 15]);
  
  // Determine scroll state for expressions
  const [scrollState, setScrollState] = useState<'idle' | 'slow' | 'fast' | 'veryfast'>('idle');
  
  useEffect(() => {
    const unsubscribe = smoothVelocity.on("change", (v) => {
      const absV = Math.abs(v);
      if (absV < 0.001) setScrollState('idle');
      else if (absV < 0.005) setScrollState('slow');
      else if (absV < 0.015) setScrollState('fast');
      else setScrollState('veryfast');
    });
    return () => unsubscribe();
  }, [smoothVelocity]);

  // Detect current section based on scroll position
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section) || 
          (section === 'hero' ? document.querySelector('section') : null);
        
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show robot after initial scroll
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle robot click interactions
  const handleRobotClick = () => {
    setClickCount(prev => prev + 1);
    
    // Every 3rd click opens/closes chat, others do animations
    if (clickCount % 3 === 0) {
      setIsChatOpen(prev => !prev);
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1000);
    } else if (clickCount % 3 === 1) {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 600);
    } else {
      setIsChatOpen(prev => !prev);
    }
  };

  // Calculate eye position based on mouse
  const getEyeOffset = () => {
    const maxMove = 4;
    const dx = (mousePos.x - window.innerWidth * 0.9) / window.innerWidth;
    const dy = (mousePos.y - window.innerHeight * 0.5) / window.innerHeight;
    return {
      x: Math.max(-maxMove, Math.min(maxMove, dx * 20)),
      y: Math.max(-maxMove, Math.min(maxMove, dy * 20)),
    };
  };

  const eyeOffset = getEyeOffset();

  const getExpressionText = () => {
    if (isWaving) return "Hi there! 👋";
    if (isBouncing) return "Wheee! 🎉";
    
    // Speed-based messages take priority
    switch (scrollState) {
      case 'veryfast': return "Woah! 🚀";
      case 'fast': return "Speedy! ⚡";
      case 'slow': 
      case 'idle': {
        if (isChatOpen) return "Chatting! 💬";
        const messages = sectionMessages[currentSection] || sectionMessages.hero;
        const randomIndex = Math.floor(Date.now() / 3000) % messages.length;
        // Occasionally hint at chat
        if (Math.floor(Date.now() / 6000) % 3 === 0) return "Chat with me! 💬";
        return messages[randomIndex];
      }
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed right-2 sm:right-4 lg:right-8 z-40 pointer-events-auto cursor-pointer"
      style={{ top: smoothRobotY }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        y: isBouncing ? [0, -20, 0, -10, 0] : 0
      }}
      transition={{ duration: 0.5 }}
      onClick={handleRobotClick}
    >
      <motion.div
        className="relative"
        style={{ rotate: robotRotate }}
        animate={{ 
          scale: isBouncing ? [1, 1.1, 1] : 1
        }}
      >
        {/* Waving Arm - only shows when waving */}
        <motion.div
          className="absolute -left-4 top-16 w-3 h-8 bg-secondary rounded-full border border-border origin-top"
          animate={{ 
            rotate: isWaving ? [0, -30, 20, -30, 20, 0] : 0,
            opacity: isWaving ? 1 : 0
          }}
          transition={{ duration: 1 }}
        />

        {/* Robot Head - smaller on mobile */}
        <motion.div 
          className="w-14 h-16 sm:w-20 sm:h-24 bg-secondary rounded-2xl border border-border relative shadow-lg"
          animate={{ 
            borderColor: scrollState === 'veryfast' ? 'hsl(174 72% 56%)' : 'hsl(var(--border))',
            boxShadow: scrollState === 'veryfast' 
              ? '0 0 20px hsl(174 72% 56% / 0.4)' 
              : '0 4px 24px -4px hsl(0 0% 0% / 0.4)'
          }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Antenna */}
          <motion.div 
            className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 w-0.5 sm:w-1 h-2 sm:h-3 bg-primary rounded-full"
            animate={{ 
              scaleY: scrollState === 'veryfast' ? [1, 1.5, 1] : [1, 1.2, 1],
              backgroundColor: scrollState === 'veryfast' ? '#ff6b6b' : 'hsl(174 72% 56%)'
            }}
            transition={{ duration: scrollState === 'veryfast' ? 0.2 : 1, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-primary rounded-full"
            animate={{ 
              scale: isWaving ? [1, 2, 1] : scrollState === 'veryfast' ? [1, 1.5, 1] : [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: scrollState === 'veryfast' ? 0.15 : 1, repeat: Infinity }}
          />
          
          {/* Eyes */}
          <div className="flex gap-2 sm:gap-3 justify-center pt-3 sm:pt-5">
            <motion.div 
              className="w-4 sm:w-5 h-4 sm:h-5 bg-background rounded-full flex items-center justify-center overflow-hidden"
              style={{ scale: eyeSize }}
            >
              <motion.div 
                className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-primary rounded-full"
                animate={{ 
                  x: eyeOffset.x, 
                  y: eyeOffset.y,
                  scale: scrollState === 'veryfast' ? 0.5 : 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </motion.div>
            <motion.div 
              className="w-4 sm:w-5 h-4 sm:h-5 bg-background rounded-full flex items-center justify-center overflow-hidden"
              style={{ scale: eyeSize }}
            >
              <motion.div 
                className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-primary rounded-full"
                animate={{ 
                  x: eyeOffset.x, 
                  y: eyeOffset.y,
                  scale: scrollState === 'veryfast' ? 0.5 : 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </motion.div>
          </div>
          
          {/* Eyebrows for expression */}
          <motion.div 
            className="absolute top-2 sm:top-3 left-2 sm:left-4 w-2 sm:w-3 h-0.5 bg-muted-foreground rounded-full origin-right"
            animate={{ 
              rotate: scrollState === 'veryfast' ? 20 : scrollState === 'fast' ? 10 : 0 
            }}
          />
          <motion.div 
            className="absolute top-2 sm:top-3 right-2 sm:right-4 w-2 sm:w-3 h-0.5 bg-muted-foreground rounded-full origin-left"
            animate={{ 
              rotate: scrollState === 'veryfast' ? -20 : scrollState === 'fast' ? -10 : 0 
            }}
          />
          
          {/* Mouth */}
          <motion.div 
            className="mx-auto mt-2 sm:mt-3 bg-primary/50 rounded-full"
            style={{ scaleX: mouthWidth }}
            animate={{ 
              width: isWaving || isBouncing ? 16 : scrollState === 'veryfast' ? 10 : 18,
              height: isWaving || isBouncing ? 8 : scrollState === 'veryfast' ? 6 : 4,
              borderRadius: isWaving || isBouncing || scrollState === 'veryfast' ? '50%' : '9999px'
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Blinking LEDs */}
          <div className="flex gap-1 sm:gap-1.5 justify-center mt-1.5 sm:mt-2">
            <motion.div 
              className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-green-400 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: scrollState === 'veryfast' ? 0.1 : 1, repeat: Infinity }}
            />
            <motion.div 
              className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-primary rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: scrollState === 'veryfast' ? 0.15 : 1.5, repeat: Infinity }}
            />
            <motion.div 
              className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                backgroundColor: scrollState === 'veryfast' ? '#ff6b6b' : '#facc15'
              }}
              transition={{ duration: scrollState === 'veryfast' ? 0.08 : 0.8, repeat: Infinity }}
            />
          </div>
        </motion.div>
        
        {/* Robot Body */}
        <div className="w-10 sm:w-14 h-4 sm:h-6 bg-secondary/50 rounded-b-xl mx-auto border-x border-b border-border" />
        
        {/* Speech bubble - responsive */}
        <motion.div
          className="absolute -left-20 sm:-left-28 top-1 sm:top-2 bg-card border border-border rounded-xl px-2 sm:px-3 py-1 sm:py-2 text-xs max-w-20 sm:max-w-24"
          animate={{ 
            scale: scrollState !== 'idle' || isWaving || isBouncing ? [1, 1.05, 1] : 1,
            borderColor: scrollState === 'veryfast' ? 'hsl(174 72% 56%)' : 'hsl(var(--border))'
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-muted-foreground leading-tight block text-[10px] sm:text-xs">
            {getExpressionText()}
          </span>
          <div className="absolute right-0 top-2 sm:top-3 translate-x-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-card border-r border-t border-border rotate-45" />
        </motion.div>
      </motion.div>
      
      {/* Chatbot Panel */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </motion.div>
  );
};

export default ScrollRobot;
