import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import FlipText from "./FlipText";

const experiences = [
  {
    title: "Founder & CEO",
    company: "PresentIQ",
    url: "https://present-iq1.vercel.app/",
    accent: "204 100% 50%",
    description:
      "Building PresentIQ — a role-based attendance management SaaS, funded and incubated by CTII, Dibrugarh University.",
  },
  {
    title: "Founder & CEO",
    company: "Webro Studios",
    url: "https://www.webrostudios.space/",
    accent: "262 83% 58%",
    description: "Running a web development agency, building websites and digital experiences for clients.",
  },
  {
    title: "Founder & CEO",
    company: "Theposterzz",
    url: "https://theposterzz.in/",
    accent: "350 89% 60%",
    description:
      "Leading a creative branding initiative, designing visual identities for individuals and student communities.",
  },
  {
    title: "Freelance Web & Design Work",
    company: "Self-Employed",
    url: null,
    accent: "160 84% 39%",
    description: "Building websites and creating design assets for various clients and personal projects.",
  },
  {
    title: "Student Web Developer",
    company: "Independent",
    url: null,
    accent: "38 92% 50%",
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

        {/* Timeline */}
        <div className="relative max-w-3xl">
          {/* Vertical rail */}
          <div className="absolute left-[9px] top-3 bottom-3 w-px bg-border" />

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative pl-10 md:pl-14"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + index * 0.12, duration: 0.5 }}
              >
                {/* Node */}
                <span
                  className="absolute left-0 top-5 w-[19px] h-[19px] rounded-full border-2 bg-background flex items-center justify-center z-10"
                  style={{ borderColor: `hsl(${exp.accent})` }}
                >
                  <motion.span
                    className="w-2 h-2 rounded-full"
                    style={{ background: `hsl(${exp.accent})` }}
                    animate={isInView ? { scale: [0, 1.4, 1] } : {}}
                    transition={{ delay: 0.3 + index * 0.12, duration: 0.4 }}
                  />
                </span>

                {/* Card */}
                <div
                  className="glass-card p-5 md:p-6 transition-all duration-300"
                  style={{ ["--accent" as string]: exp.accent }}
                >
                  {/* accent side bar */}
                  <span
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                    style={{ background: `hsl(${exp.accent})` }}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="text-lg md:text-xl font-bold">{exp.title}</h3>
                    {exp.url ? (
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.15em] hover:underline underline-offset-4 transition-colors self-start"
                        style={{ color: `hsl(${exp.accent})` }}
                      >
                        {exp.company}
                        <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground self-start">
                        {exp.company}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
