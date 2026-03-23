import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { ExternalLink, Folder } from "lucide-react";
import profileData from "../data/profile.json";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: {
      duration: 0.6
    }
  },
};

const PixelCube = ({ delay = 0, x = 0, y = 0, size = 20 }) => (
  <motion.div
    style={{
      position: 'absolute',
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      transformStyle: 'preserve-3d',
    }}
    animate={{
      rotateX: [0, 360],
      rotateY: [0, 360],
      y: [0, -20, 0],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      delay,
      ease: "linear"
    }}
    className="opacity-20 pointer-events-none"
  >
    <div className="absolute inset-0 bg-primary/40 border border-primary/20" style={{ transform: `translateZ(${size/2}px)` }} />
    <div className="absolute inset-0 bg-primary/30 border border-primary/20" style={{ transform: `rotateY(90deg) translateZ(${size/2}px)` }} />
    <div className="absolute inset-0 bg-primary/20 border border-primary/20" style={{ transform: `rotateY(180deg) translateZ(${size/2}px)` }} />
    <div className="absolute inset-0 bg-primary/30 border border-primary/20" style={{ transform: `rotateY(-90deg) translateZ(${size/2}px)` }} />
    <div className="absolute inset-0 bg-primary/40 border border-primary/20" style={{ transform: `rotateX(90deg) translateZ(${size/2}px)` }} />
    <div className="absolute inset-0 bg-primary/20 border border-primary/20" style={{ transform: `rotateX(-90deg) translateZ(${size/2}px)` }} />
  </motion.div>
);

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      className={className}
    >
      <div className="h-full relative z-10" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
        animate={{
          background: isHovered 
            ? "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(174 72% 56% / 0.1), transparent 80%)"
            : "transparent",
          boxShadow: isHovered 
            ? "0 25px 50px -12px hsl(174 72% 56% / 0.25), 0 0 0 1px hsl(174 72% 56% / 0.3)"
            : "none"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cubes = useMemo(() => [
    { x: 10, y: 20, size: 30, delay: 0 },
    { x: 85, y: 15, size: 20, delay: 2 },
    { x: 75, y: 80, size: 40, delay: 4 },
    { x: 5, y: 70, size: 25, delay: 1 },
    { x: 50, y: 50, size: 15, delay: 3 },
  ], []);

  return (
    <section id="projects" className="py-32 relative overflow-hidden" ref={ref}>
      {/* 3D Background Elements */}
      {cubes.map((cube, i) => (
        <PixelCube key={i} {...cube} />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-heading">Projects</p>
          <h2 className="section-title">
            Things I've built
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          style={{ perspective: "1000px" }}
        >
          {profileData.projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              custom={index}
            >
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block h-full group outline-none"
              >
                <TiltCard className="glass-card p-8 flex flex-col h-full relative overflow-hidden transition-all duration-500 group-hover:bg-primary/5">
                  {/* 3D Parallax Layers */}
                  <div className="flex items-start justify-between mb-6" style={{ transform: "translateZ(50px)" }}>
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Folder className="text-primary group-hover:scale-110 transition-transform duration-300" size={44} />
                    </motion.div>
                    <div 
                      className="text-muted-foreground group-hover:text-primary transition-colors relative z-20"
                    >
                      <ExternalLink size={22} className="group-hover:scale-125 transition-transform duration-300" />
                    </div>
                  </div>

                  <div style={{ transform: "translateZ(40px)" }}>
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-primary/80 mb-4 font-medium">{project.role}</p>
                  </div>
                  
                  <p 
                    className="text-muted-foreground text-base leading-relaxed flex-1 mb-6"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto" style={{ transform: "translateZ(20px)" }}>
                    {project.tech.map((t, i) => (
                      <motion.span
                        key={t}
                        className="text-xs text-foreground font-mono px-3 py-1.5 rounded-md bg-secondary/30 border border-border/50 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: "hsl(174 72% 56% / 0.15)",
                          color: "hsl(174 72% 56%)",
                          borderColor: "hsl(174 72% 56% / 0.3)"
                        }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>

                  {/* Ambient card glow */}
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/15 transition-colors" />
                </TiltCard>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
