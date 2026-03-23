import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { PixelCorner } from "./PixelDecorations";

const experiences = [
  {
    title: "Founder",
    company: "Theposterzz",
    description: "Leading a creative branding initiative, designing visual identities for individuals and student communities.",
  },
  {
    title: "Freelance Web & Design Work",
    company: "Self-Employed",
    description: "Building websites and creating design assets for various clients and personal projects.",
  },
  {
    title: "Student Web Developer",
    company: "Independent",
    description: "Continuously learning and building projects to strengthen web development skills.",
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
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-heading">Experience</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Roles & Responsibilities
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl mx-auto space-y-6"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card p-6 flex gap-4 relative overflow-hidden"
            >
              <PixelCorner position="top-left" />
              <PixelCorner position="top-right" />
              <PixelCorner position="bottom-left" />
              <PixelCorner position="bottom-right" />
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="text-primary" size={22} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{exp.title}</h3>
                <p className="text-primary text-sm mb-2">{exp.company}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
