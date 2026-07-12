import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import ChatBot from "./ChatBot";

// Section-aware idle messages
const sectionMessages: Record<string, string[]> = {
  hero: ["Hey there! 👋", "Scroll down ⬇️", "Chat with me 💬"],
  skills: ["So skilled! 💪", "Nice stack 🛠️", "Impressive 🔥"],
  projects: ["Cool work! 🚀", "Nice builds 💻", "Creative 🎨"],
  about: ["Nice bio ✨", "Cool story 📝"],
  experience: ["Big journey 🛤️", "Growth 🌱"],
  education: ["Smart 🧠", "Learning 📚"],
  contact: ["Say hi! 💬", "Let's talk 🤝"],
};

const ScrollRobot = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [scrollState, setScrollState] = useState<"idle" | "fast" | "veryfast">("idle");

  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 100, damping: 30 });

  // Tilt the robot with scroll direction/speed
  const robotRotate = useTransform(smoothVelocity, [-0.03, 0, 0.03], [-14, 0, 14]);
  const smoothRotate = useSpring(robotRotate, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const unsub = smoothVelocity.on("change", (v) => {
      const a = Math.abs(v);
      if (a < 0.004) setScrollState("idle");
      else if (a < 0.015) setScrollState("fast");
      else setScrollState("veryfast");
    });
    return () => unsub();
  }, [smoothVelocity]);

  useEffect(() => {
    const sections = ["hero", "skills", "projects", "about", "experience", "education", "contact"];
    const onScroll = () => {
      const pos = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const el =
          document.getElementById(section) ||
          (section === "hero" ? document.querySelector("section") : null);
        if (el instanceof HTMLElement) {
          const { offsetTop, offsetHeight } = el;
          if (pos >= offsetTop && pos < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleClick = () => {
    setIsChatOpen((o) => !o);
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1000);
  };

  // Pupils follow the cursor (robot lives bottom-right)
  const eyeOffset = (() => {
    const max = 3;
    const dx = (mousePos.x - window.innerWidth * 0.92) / window.innerWidth;
    const dy = (mousePos.y - window.innerHeight * 0.85) / window.innerHeight;
    return {
      x: Math.max(-max, Math.min(max, dx * 24)),
      y: Math.max(-max, Math.min(max, dy * 24)),
    };
  })();

  const message = (() => {
    if (isWaving) return "Hi there! 👋";
    if (isChatOpen) return "Chatting! 💬";
    if (scrollState === "veryfast") return "Woah! 🚀";
    if (scrollState === "fast") return "Speedy! ⚡";
    const msgs = sectionMessages[currentSection] || sectionMessages.hero;
    return msgs[Math.floor(Date.now() / 3500) % msgs.length];
  })();

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-4 sm:right-6 z-40 pointer-events-auto cursor-pointer"
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      onClick={handleClick}
      role="button"
      aria-label="Open chat assistant"
    >
      {/* Gentle idle bob */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div className="relative" style={{ rotate: smoothRotate }}>
          {/* Speech bubble */}
          <motion.div
            key={message}
            className="absolute right-full mr-3 top-2 whitespace-nowrap rounded-2xl rounded-br-sm px-3 py-1.5 text-xs font-medium shadow-lg"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
            initial={{ opacity: 0, scale: 0.9, x: 6 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          >
            {message}
          </motion.div>

          {/* Antenna */}
          <motion.div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 rounded-full"
            style={{ background: "hsl(var(--border))" }}
          />
          <motion.div
            className="absolute -top-[18px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary"
            animate={{
              scale: scrollState === "veryfast" ? [1, 1.5, 1] : [1, 1.25, 1],
              opacity: [0.6, 1, 0.6],
              boxShadow: [
                "0 0 0px hsl(var(--primary) / 0.6)",
                "0 0 12px hsl(var(--primary) / 0.9)",
                "0 0 0px hsl(var(--primary) / 0.6)",
              ],
            }}
            transition={{ duration: scrollState === "veryfast" ? 0.4 : 1.4, repeat: Infinity }}
          />

          {/* Robot head */}
          <motion.div
            className="w-16 h-16 sm:w-[74px] sm:h-[74px] rounded-[20px] border p-2.5 shadow-xl"
            style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
            animate={{
              borderColor:
                scrollState === "veryfast" ? "hsl(var(--primary))" : "hsl(var(--border))",
              boxShadow:
                scrollState === "veryfast"
                  ? "0 0 24px hsl(var(--primary) / 0.35)"
                  : "0 12px 28px -12px hsl(220 25% 12% / 0.4)",
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            {/* Dark face screen */}
            <div
              className="w-full h-full rounded-xl flex flex-col items-center justify-center gap-1.5 relative overflow-hidden"
              style={{ background: "linear-gradient(160deg, #10192b, #0a0f1a)" }}
            >
              {/* Eyes */}
              <div className="flex gap-2.5">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full flex items-center justify-center"
                  >
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full bg-primary"
                      style={{ boxShadow: "0 0 8px hsl(var(--primary) / 0.9)" }}
                      animate={{
                        x: eyeOffset.x,
                        y: eyeOffset.y,
                        scaleY: isWaving ? [1, 0.15, 1] : scrollState === "veryfast" ? 0.5 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  </div>
                ))}
              </div>
              {/* Mouth */}
              <motion.div
                className="rounded-full bg-primary/70"
                animate={{
                  width: isWaving ? 8 : scrollState === "veryfast" ? 6 : 12,
                  height: isWaving ? 8 : 3,
                  borderRadius: isWaving ? "50%" : "9999px",
                }}
                transition={{ duration: 0.2 }}
              />
              {/* Screen sheen */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 40%, hsl(0 0% 100% / 0.06) 50%, transparent 60%)",
                }}
              />
            </div>
          </motion.div>

          {/* Little base */}
          <div
            className="w-9 h-2 rounded-b-lg mx-auto border-x border-b"
            style={{ background: "hsl(var(--muted))", borderColor: "hsl(var(--border))" }}
          />
        </motion.div>
      </motion.div>

      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </motion.div>
  );
};

export default ScrollRobot;
