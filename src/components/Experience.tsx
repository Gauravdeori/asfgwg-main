import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FlipText from "./FlipText";

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

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 md:py-32 scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.p>
        <h2 className="script-sub mb-16">
          <FlipText text="the journey so far" />
        </h2>

        <div className="border-b border-border max-w-4xl">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="border-t border-border py-8 md:py-10 grid md:grid-cols-12 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.12 }}
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:col-span-3 pt-1">
                {exp.company}
              </span>
              <div className="md:col-span-9">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{exp.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xl">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
