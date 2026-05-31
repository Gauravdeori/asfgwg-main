import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download } from "lucide-react";
import profileImage from "@/assets/profile.png";
import profileData from "../data/profile.json";
import * as LucideIcons from "lucide-react";

const techBadges = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
];

const codeLines = [
  { num: 1, content: <><span className="text-purple-400">import</span> <span className="text-emerald-300">React</span> <span className="text-purple-400">from</span> <span className="text-amber-300">'react'</span>;</> },
  { num: 2, content: <><span className="text-purple-400">import</span> {"{"}</> },
  { num: 3, content: <>  <span className="text-cyan-300">Hero</span>,</> },
  { num: 4, content: <>  <span className="text-cyan-300">About</span>,</> },
  { num: 5, content: <>  <span className="text-cyan-300">Projects</span>,</> },
  { num: 6, content: <>  <span className="text-cyan-300">Contact</span></> },
  { num: 7, content: <>{"}"} <span className="text-purple-400">from</span> <span className="text-amber-300">'./components'</span>;</> },
  { num: 8, content: <></> },
  { num: 9, content: <><span className="text-purple-400">const</span> <span className="text-blue-300">App</span> = () =&gt; {"{"}</> },
  { num: 10, content: <>  <span className="text-purple-400">return</span> (</> },
  { num: 11, content: <>    &lt;<span className="text-emerald-300">div</span> <span className="text-cyan-300">className</span>=<span className="text-amber-300">"app"</span>&gt;</> },
  { num: 12, content: <>      &lt;<span className="text-blue-300">Hero</span> /&gt;</> },
  { num: 13, content: <>      &lt;<span className="text-blue-300">Projects</span> /&gt;</> },
  { num: 14, content: <>      &lt;<span className="text-blue-300">Contact</span> /&gt;</> },
  { num: 15, content: <>    &lt;/<span className="text-emerald-300">div</span>&gt;</> },
];

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden hero-gradient">
      {/* Background glow effects */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />
      
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.p 
              className="text-primary text-base font-medium mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              Hi, I'm
            </motion.p>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
            >
              <span>A Full Stack</span>
              <br />
              <span className="text-gradient">Developer</span>
            </motion.h1>
            
            <motion.p 
              className="text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {profileData.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <motion.a 
                href="#projects"
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
                <ArrowRight size={16} />
              </motion.a>
              <motion.a 
                href="#contact"
                className="btn-outline flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
                <Download size={16} />
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex flex-col gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span className="text-sm text-muted-foreground font-medium">Connect with me</span>
              <div className="flex gap-4 justify-center lg:justify-start">
                {profileData.socials.map((social, index) => {
                  const Icon = (LucideIcons as any)[social.icon];
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all duration-300"
                      aria-label={social.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {Icon && <Icon size={18} />}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Code Editor + Profile */}
          <motion.div 
            className="flex-1 relative max-w-xl w-full"
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 80 }}
          >
            {/* Code Editor */}
            <div className="code-editor relative z-10">
              <div className="code-editor-header">
                <div className="code-dot bg-red-500/70" />
                <div className="code-dot bg-yellow-500/70" />
                <div className="code-dot bg-green-500/70" />
                <span className="text-xs text-gray-400 ml-3 font-mono">index.js</span>
              </div>
              <div className="p-4 font-mono text-[13px] leading-6 overflow-hidden">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={line.num}
                    className="flex"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.05 }}
                  >
                    <span className="text-gray-600 w-8 text-right mr-4 select-none">{line.num}</span>
                    <span className="text-gray-300">{line.content}</span>
                  </motion.div>
                ))}
              </div>

              {/* Terminal */}
              <div className="border-t border-gray-700/50 p-3">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-gray-500">Terminal</span>
                  <span className="text-gray-600 ml-auto">Termi.js</span>
                </div>
                <div className="mt-2 text-xs font-mono">
                  <span className="text-gray-500">$ </span>
                  <motion.span 
                    className="text-emerald-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    npm run dev
                  </motion.span>
                </div>
                <motion.div 
                  className="text-xs font-mono mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  <span className="text-gray-500">&gt; Local: </span>
                  <span className="text-blue-400">http://localhost:3000</span>
                </motion.div>
              </div>
            </div>

            {/* Profile Image overlay */}
            <motion.div 
              className="absolute -top-4 -right-4 z-20 hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
            >
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-xl shadow-primary/10">
                <img 
                  src={profileImage} 
                  alt="Gaurav Deori" 
                  className="w-full h-full object-cover object-center scale-150"
                />
              </div>
            </motion.div>

            {/* Floating Tech Badges */}
            <div className="absolute -right-4 lg:-right-16 top-8 flex flex-col gap-3 z-30 hidden lg:flex">
              {techBadges.map((badge, i) => (
                <motion.div
                  key={badge.name}
                  className="tech-badge"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + i * 0.15 }}
                  whileHover={{ scale: 1.05, x: -5 }}
                >
                  <img src={badge.icon} alt={badge.name} className="w-5 h-5" />
                  <span className="text-xs font-semibold">{badge.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.a 
            href="#about" 
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ y: 5 }}
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={16} />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
