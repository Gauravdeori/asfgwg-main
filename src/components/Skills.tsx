import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PixelCorner } from "./PixelDecorations";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
  },
  {
    title: "Backend (Learning)",
    skills: ["Node.js", "Express"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Canva", "Figma", "Vercel"],
  },
  {
    title: "Design & Creative",
    skills: ["Branding", "Poster Design", "Social Media Creatives"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const skillIcons: Record<string, string> = {
  "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Express": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "Vercel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-heading">Skills & Tools</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Technologies I work with
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="glass-card p-8 relative overflow-hidden group hover:shadow-glow transition-all duration-500"
            >
              <PixelCorner position="top-left" />
              <PixelCorner position="top-right" />
              <PixelCorner position="bottom-left" />
              <PixelCorner position="bottom-right" />
              
              <h3 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="skill-pill flex items-center gap-3 cursor-default"
                  >
                    {skillIcons[skill] && (
                      <img 
                        src={skillIcons[skill]} 
                        alt={skill} 
                        className={`w-6 h-6 object-contain ${skill === "GitHub" ? "dark:invert" : ""}`}
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    )}
                    <span className="font-semibold">{skill}</span>
                  </motion.div>
                ))}
              </div>

              {/* Decorative accent */}
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/20 transition-colors" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
