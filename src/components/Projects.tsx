import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowUpRight, Github } from "lucide-react";
import profileData from "../data/profile.json";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1]
    }
  },
};

const ProjectMockup = ({ title }: { title: string }) => {
  switch (title) {
    case "PresentIQ":
      return (
        <div className="absolute inset-0 bg-[#070b13] flex flex-col p-3 font-mono text-[9px] text-gray-400 select-none">
          <div className="flex items-center justify-between border-b border-gray-800 pb-1.5 mb-2">
            <span className="font-bold text-primary">PresentIQ Admin</span>
            <span className="bg-emerald-500/10 text-emerald-400 px-1 py-0.2 rounded text-[7px]">Active</span>
          </div>
          <div className="grid grid-cols-2 gap-2 flex-1">
            <div className="border border-gray-800/80 rounded p-1.5 flex flex-col justify-between bg-[#0e1322]/40">
              <span>Attendance Rate</span>
              <span className="text-xs font-bold text-white mt-0.5">94.2%</span>
            </div>
            <div className="border border-gray-800/80 rounded p-1.5 flex flex-col justify-between bg-[#0e1322]/40">
              <span>Total Classes</span>
              <span className="text-xs font-bold text-blue-400 mt-0.5">24 Sessions</span>
            </div>
            <div className="border border-gray-800/80 rounded p-1.5 col-span-2 bg-[#0e1322]/40 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Class XII - Physics</span>
              </div>
              <span className="text-[7px] text-gray-500">10:30 AM</span>
            </div>
          </div>
        </div>
      );
    case "TapPlay":
      return (
        <div className="absolute inset-0 bg-[#090b10] flex items-center justify-center p-3 select-none">
          <div className="grid grid-cols-3 gap-1 w-20 h-20">
            {[
              { val: "X", color: "text-blue-400" },
              { val: "", color: "" },
              { val: "O", color: "text-pink-400" },
              { val: "", color: "" },
              { val: "X", color: "text-blue-400" },
              { val: "", color: "" },
              { val: "O", color: "text-pink-400" },
              { val: "", color: "" },
              { val: "X", color: "text-blue-400" },
            ].map((cell, idx) => (
              <div 
                key={idx} 
                className="bg-[#121622] border border-gray-800 rounded flex items-center justify-center font-bold text-xs"
              >
                <span className={cell.color}>{cell.val}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-1.5 right-2 text-[7px] font-mono text-gray-500">
            Mini Games
          </div>
        </div>
      );
    case "AttendanceHub":
      return (
        <div className="absolute inset-0 bg-[#070b13] flex flex-col p-3 font-mono text-[9px] text-gray-400 select-none">
          <div className="flex items-center justify-between border-b border-gray-800 pb-1.5 mb-2">
            <span className="font-bold text-white">AttendanceHub AI</span>
            <span className="text-primary text-[7px]">75% Alert</span>
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex justify-between items-center bg-[#0d1222] px-2 py-0.5 rounded border border-gray-800/40">
              <span>Maths</span>
              <span className="text-emerald-400 font-bold">85% (Safe)</span>
            </div>
            <div className="flex justify-between items-center bg-[#0d1222] px-2 py-0.5 rounded border border-gray-800/40">
              <span>Physics</span>
              <span className="text-amber-500 font-bold">72% (Alert)</span>
            </div>
          </div>
        </div>
      );
    case "Amar Adda":
      return (
        <div className="absolute inset-0 bg-[#0b0c10] flex flex-col p-3 text-[9px] text-gray-400 select-none">
          <div className="flex items-center justify-between border-b border-gray-800/80 pb-1 mb-2">
            <span className="font-bold text-amber-500">Amar Adda Food</span>
            <span className="text-[7px] text-gray-500">Store Active</span>
          </div>
          <div className="grid grid-cols-2 gap-2 flex-1">
            <div className="bg-[#11131a] rounded p-1 border border-gray-800/60 flex flex-col justify-between">
              <span className="text-white font-medium text-[8px]">Burger</span>
              <div className="flex justify-between items-center mt-0.5">
                <span className="text-amber-400">₹80</span>
                <span className="bg-amber-500/10 text-amber-400 text-[6px] px-1 rounded">Add</span>
              </div>
            </div>
            <div className="bg-[#11131a] rounded p-1 border border-gray-800/60 flex flex-col justify-between">
              <span className="text-white font-medium text-[8px]">Momos</span>
              <div className="flex justify-between items-center mt-0.5">
                <span className="text-amber-400">₹60</span>
                <span className="bg-amber-500/10 text-amber-400 text-[6px] px-1 rounded">Add</span>
              </div>
            </div>
          </div>
        </div>
      );
    case "QR Shield AI":
      return (
        <div className="absolute inset-0 bg-[#080d14] flex flex-col items-center justify-center p-3 text-[10px] text-gray-400 select-none">
          <div className="w-8 h-8 rounded-full border border-dashed border-emerald-500/40 flex items-center justify-center relative mb-1.5">
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/60 flex items-center justify-center">
              <span className="text-emerald-400 text-[7px] font-bold">AI</span>
            </div>
          </div>
          <span className="font-bold text-emerald-400 text-[10px]">SCAN STATUS: SAFE</span>
          <span className="text-[7px] text-gray-500 mt-0.5 font-mono">qr-shield-ai.vercel.app</span>
        </div>
      );
    case "Theposterzz":
      return (
        <div className="absolute inset-0 bg-[#0d0a0f] flex flex-col p-3 text-[9px] text-gray-400 select-none">
          <div className="flex items-center justify-between border-b border-gray-800 pb-1 mb-2">
            <span className="font-bold text-purple-400">Theposterzz Store</span>
            <span className="text-[7px] text-gray-500">Live</span>
          </div>
          <div className="grid grid-cols-3 gap-1 flex-1">
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded border border-purple-800/30 flex items-center justify-center">
              <span className="text-[7px] text-purple-300">Poster</span>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/20 rounded border border-blue-800/30 flex items-center justify-center">
              <span className="text-[7px] text-blue-300">Neon</span>
            </div>
            <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 rounded border border-amber-800/30 flex items-center justify-center">
              <span className="text-[7px] text-amber-300">Custom</span>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 bg-[#0d0f17] flex items-center justify-center text-[10px] text-gray-500">
          Preview
        </div>
      );
  }
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div id="projects" className="relative scroll-mt-24" ref={ref}>
      <motion.h2 
        className="text-2xl font-bold flex items-center gap-1.5 text-foreground mb-6"
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Featured Projects <span className="text-primary">•</span>
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {profileData.projects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={cardVariants}
            custom={index}
            className="h-full"
          >
            <div className="glass-card h-full flex flex-col relative overflow-hidden group">
              {/* Mockup Preview Header */}
              <div className="h-40 relative bg-[#06080d] border-b border-border/40 overflow-hidden">
                <ProjectMockup title={project.title} />
                
                {/* External link overlay */}
                <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-2">
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    {project.title}
                    <span className="text-[10px] bg-secondary/80 text-muted-foreground px-1.5 py-0.5 rounded border border-border/30">
                      {project.role}
                    </span>
                  </h3>
                </div>
                
                <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-4">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-medium px-2 py-0.5 rounded bg-secondary/35 border border-border/30 text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Live Demo / GitHub Links */}
                <div className="flex items-center justify-between pt-3 border-t border-border/20 mt-auto text-xs">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 group/link"
                  >
                    Live Demo
                    <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                  <a 
                    href="https://github.com/Gauravdeori" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
                  >
                    <Github size={12} />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
