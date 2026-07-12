import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import profileData from "../data/profile.json";
import FlipText from "./FlipText";

/* One accent per project (HSL triplets consumed by .stack-card via --accent) */
const accents = [
  "204 100% 50%", // PresentIQ — blue
  "262 83% 58%",  // TapPlay — purple
  "160 84% 39%",  // AttendanceHub — emerald
  "38 92% 50%",   // Amar Adda — amber
  "173 80% 40%",  // QR Shield AI — teal
  "350 89% 60%",  // Theposterzz — rose
  "142 71% 45%",  // Echoes of Poba — green
  "24 95% 53%",   // Portfolio v1 — orange
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 md:py-32 scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Selected Work
        </motion.p>
        <h2 className="script-sub mb-4">
          <FlipText text="check out some of my work" />
        </h2>
        <motion.p
          className="text-muted-foreground text-base md:text-lg mb-16 max-w-xl"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A few products I've built and shipped, and the thinking behind them.
        </motion.p>

        {/* Sticky stacking case-study cards */}
        <div className="flex flex-col gap-8">
          {profileData.projects.map((project, index) => (
            <article
              key={project.title}
              className="stack-card group"
              style={{
                top: `${88 + index * 10}px`,
                "--accent": accents[index % accents.length],
              } as React.CSSProperties}
            >
              {/* Giant watermark number */}
              <span
                className="pointer-events-none absolute top-0 right-4 md:right-8 font-display font-black leading-none select-none"
                style={{
                  fontSize: "clamp(5rem, 12vw, 9rem)",
                  color: "hsl(var(--accent) / 0.09)",
                }}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <motion.div
                className="relative grid gap-6 md:grid-cols-[4rem_1fr_auto]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              >
                {/* Accent number badge */}
                <div
                  className="hidden md:flex items-start justify-center pt-2"
                  aria-hidden="true"
                >
                  <span
                    className="w-11 h-11 rounded-full flex items-center justify-center font-mono text-sm font-semibold border"
                    style={{
                      color: "hsl(var(--accent))",
                      borderColor: "hsl(var(--accent) / 0.35)",
                      background: "hsl(var(--accent) / 0.08)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="max-w-2xl">
                  <span
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3"
                    style={{ color: "hsl(var(--accent))" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "hsl(var(--accent))" }}
                    />
                    {project.role}
                  </span>

                  <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t) => (
                      <span key={t} className="work-tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-3 md:items-end md:pt-1.5">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary gap-2 whitespace-nowrap"
                  >
                    Live Demo
                    <ArrowUpRight size={15} />
                  </a>
                  <a
                    href="https://github.com/Gauravdeori"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline gap-2 whitespace-nowrap"
                  >
                    <Github size={15} />
                    GitHub
                  </a>
                </div>
              </motion.div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
