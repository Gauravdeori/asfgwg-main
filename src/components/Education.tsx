import { motion } from "framer-motion";
import SectionHeading from "./ui-kit/SectionHeading";

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
  return (
    <section id="education" className="relative scroll-mt-24 border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-frame px-6 md:px-10">
        <SectionHeading
          index="08 / EDUCATION"
          title={"THE\nGROUNDWORK"}
          subtitle="Where I learned the ropes."
          status={`● ${String(education.length).padStart(2, "0")} RECORDS`}
        />

        <div className="border-t border-border">
          {education.map((edu, index) => (
            <motion.div
              key={edu.institution}
              className="invert-row group grid gap-4 border-b border-border px-3 py-8 md:grid-cols-[70px_220px_1fr] md:items-baseline md:gap-8 md:py-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
            >
              <span className="label-mono">{String(index + 1).padStart(2, "0")}</span>
              <span className="label-mono">{edu.period}</span>
              <div>
                <h3 className="display-xl text-2xl text-foreground transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                  {edu.degree}
                </h3>
                {edu.field && <p className="mt-2 font-display text-foreground">{edu.field}</p>}
                <p className="muted-invert mt-1 text-sm text-muted-foreground">{edu.institution}</p>
                {edu.focus && (
                  <p className="muted-invert mt-2 text-sm text-muted-foreground">Focus: {edu.focus}</p>
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
