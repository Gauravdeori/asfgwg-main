import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import profileData from "../data/profile.json";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  },
};

// Color accents for project cards
const cardAccents = [
  "from-blue-500/20 to-cyan-500/10",
  "from-purple-500/20 to-pink-500/10",
  "from-emerald-500/20 to-teal-500/10",
  "from-amber-500/20 to-orange-500/10",
  "from-rose-500/20 to-red-500/10",
  "from-indigo-500/20 to-violet-500/10",
  "from-sky-500/20 to-blue-500/10",
  "from-teal-500/20 to-cyan-500/10",
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-heading">Projects</p>
          <h2 className="section-title">
            Featured Projects
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl"
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
                <div className="glass-card h-full flex flex-col relative overflow-hidden">
                  {/* Gradient header */}
                  <div className={`h-36 bg-gradient-to-br ${cardAccents[index % cardAccents.length]} relative overflow-hidden`}>
                    {/* Abstract pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-4 left-4 w-20 h-20 rounded-2xl bg-white/10 rotate-12" />
                      <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-white/10" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-xl bg-white/5 rotate-45" />
                    </div>
                    
                    {/* Project title overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span 
                        className="text-2xl font-bold text-white/90 drop-shadow-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        {project.title}
                      </motion.span>
                    </div>

                    {/* External link icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                      <ExternalLink size={14} className="text-white" />
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-1">
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-primary/70 font-medium">{project.role}</p>
                    </div>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5 mt-2">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary/80 border border-border/50 text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Live Demo link */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/30">
                      <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Live Demo
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
