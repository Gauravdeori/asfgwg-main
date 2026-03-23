import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, School } from "lucide-react";

const education = [
  {
    degree: "Bachelor's Degree",
    field: "B.Tech in Computer Science & Engineering",
    institution: "Dibrugarh University Institute of Engineering & Technology",
    period: "2024 – Present",
    focus: "Programming, Web Development, Problem-Solving",
    icon: GraduationCap,
  },
  {
    degree: "Higher Secondary (12th)",
    field: "Science Stream",
    institution: "Jonai Science College",
    period: "Completed",
    focus: null,
    icon: School,
  },
  {
    degree: "Secondary School (10th)",
    field: null,
    institution: "Fransalian High School (SFS Jonai)",
    period: "Completed",
    focus: null,
    icon: School,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-heading">Education</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Academic Journey
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto relative"
        >
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-6"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full bg-secondary border-2 border-primary/30 items-center justify-center z-10">
                  <edu.icon className="text-primary" size={20} />
                </div>

                <div className="glass-card p-6 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <span className="text-sm text-primary font-medium">{edu.period}</span>
                  </div>
                  
                  {edu.field && (
                    <p className="text-foreground mb-1">{edu.field}</p>
                  )}
                  
                  <p className="text-muted-foreground text-sm mb-2">
                    {edu.institution}
                  </p>
                  
                  {edu.focus && (
                    <p className="text-xs text-muted-foreground">
                      Focus: {edu.focus}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
