import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FlipText from "./FlipText";

const education = [
  {
    degree: "Bachelor's Degree",
    field: "B.Tech in Computer Science & Engineering",
    institution: "Dibrugarh University Institute of Engineering & Technology",
    period: "2024 – Present",
    focus: "Programming, Web Development, Problem-Solving",
  },
  {
    degree: "Higher Secondary (12th)",
    field: "Science Stream",
    institution: "Jonai Science College",
    period: "Completed",
    focus: null,
  },
  {
    degree: "Secondary School (10th)",
    field: null,
    institution: "Fransalian High School (SFS Jonai)",
    period: "Completed",
    focus: null,
  },
];

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 md:py-32 scroll-mt-24 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Education
        </motion.p>
        <h2 className="script-sub mb-16">
          <FlipText text="where I learned the ropes" />
        </h2>

        <div className="border-b border-border max-w-4xl">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="border-t border-border py-8 md:py-10 grid md:grid-cols-12 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.12 }}
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:col-span-3 pt-1">
                {edu.period}
              </span>
              <div className="md:col-span-9">
                <h3 className="text-xl md:text-2xl font-bold mb-1">{edu.degree}</h3>
                {edu.field && <p className="text-foreground/85 mb-1">{edu.field}</p>}
                <p className="text-muted-foreground text-sm">{edu.institution}</p>
                {edu.focus && (
                  <p className="text-muted-foreground text-sm mt-2">
                    Focus: {edu.focus}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
