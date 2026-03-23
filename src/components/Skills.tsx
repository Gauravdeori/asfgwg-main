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
              className="glass-card p-6 relative overflow-hidden"
            >
              <PixelCorner position="top-left" />
              <PixelCorner position="top-right" />
              <PixelCorner position="bottom-left" />
              <PixelCorner position="bottom-right" />
              <h3 className="text-lg font-semibold mb-4 text-primary">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
