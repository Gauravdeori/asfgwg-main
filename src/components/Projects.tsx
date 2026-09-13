import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import profileData from "../data/profile.json";
import { caseStudies, type CaseStudyExtra } from "../data/system";
import SectionHeading from "./ui-kit/SectionHeading";
import ProjectVisual from "./ProjectVisual";
import MagneticButton from "./ui-kit/MagneticButton";

const GITHUB = "https://github.com/Gauravdeori";

type Project = (typeof profileData.projects)[number] & {
  index: string;
  extra: CaseStudyExtra;
};

/* profile.json order is preserved; extras are joined on by title */
const projects: Project[] = profileData.projects.map((p, i) => ({
  ...p,
  index: String(i + 1).padStart(2, "0"),
  extra: caseStudies[p.title] ?? { visual: { kind: "creative", label: "BUILD / GRID" } },
}));

const featured = projects.filter((p) => p.extra.featured);
const more = projects.filter((p) => !p.extra.featured);

function FeaturedBlock({
  project,
  flip,
  onOpen,
}: {
  project: Project;
  flip: boolean;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.2]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - (r.top + r.height / 2)) / r.height) * -8,
      y: ((e.clientX - (r.left + r.width / 2)) / r.width) * 8,
    });
  };

  const highlights = project.extra.features ?? project.tech;

  return (
    <motion.article
      ref={ref}
      style={{ opacity }}
      className="grid items-center gap-10 border-b border-border py-20 md:py-32 lg:grid-cols-2 lg:gap-20"
    >
      <div className={flip ? "lg:order-2" : ""}>
        <div className="flex items-center gap-4">
          <span className="display-xl text-stroke text-6xl md:text-8xl">{project.index}</span>
          <span className="h-px flex-1 bg-border" />
          <span className="label-mono">{project.role}</span>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="display-xl mt-4 text-4xl text-foreground sm:text-5xl md:text-6xl"
        >
          {project.title}
        </motion.h3>
        {project.extra.subtitle && <p className="label-mono mt-3">{project.extra.subtitle}</p>}
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
          {project.description}
        </p>

        <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
          {highlights.slice(0, 6).map((f) => (
            <div key={f} className="bg-background px-4 py-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/85">{f}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <MagneticButton variant="solid" onClick={onOpen}>
            CASE STUDY
          </MagneticButton>
          <MagneticButton href={project.link} external>
            VIEW LIVE <ArrowUpRight className="h-3.5 w-3.5" />
          </MagneticButton>
        </div>
      </div>

      <motion.div
        style={{ y }}
        onPointerMove={onMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        data-cursor="OPEN"
        onClick={onOpen}
        className="cursor-pointer [perspective:1200px]"
      >
        <div
          className="transition-transform duration-300 ease-out"
          style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        >
          <ProjectVisual visual={project.extra.visual} />
        </div>
      </motion.div>
    </motion.article>
  );
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const rows = [
    { k: "OVERVIEW", v: project.description },
    { k: "PROBLEM", v: project.extra.problem },
    { k: "SOLUTION", v: project.extra.solution },
    { k: "MY ROLE", v: project.role },
  ].filter((r): r is { k: string; v: string } => Boolean(r.v));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="tech-grid fixed inset-0 z-[90] overflow-y-auto bg-background/95 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto min-h-full max-w-4xl px-6 py-20 md:px-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="label-mono">CASE STUDY / {project.index}</span>
            <h3 className="display-xl mt-3 text-4xl text-foreground md:text-6xl">{project.title}</h3>
            {project.extra.subtitle && <p className="label-mono mt-3">{project.extra.subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center border border-border-strong transition-colors hover:bg-foreground hover:text-background"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-10 max-w-xl">
          <ProjectVisual visual={project.extra.visual} />
        </div>

        <div className="mt-12 space-y-10">
          {rows.map((row) => (
            <div key={row.k} className="grid gap-3 border-t border-border pt-6 md:grid-cols-[160px_1fr]">
              <span className="label-mono">{row.k}</span>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{row.v}</p>
            </div>
          ))}

          <div className="grid gap-3 border-t border-border pt-6 md:grid-cols-[160px_1fr]">
            <span className="label-mono">TECHNOLOGY</span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {project.extra.features && (
            <div className="grid gap-3 border-t border-border pt-6 md:grid-cols-[160px_1fr]">
              <span className="label-mono">FEATURES</span>
              <ul className="space-y-2">
                {project.extra.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-muted-foreground md:text-base">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-foreground" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-3 border-t border-border pt-6 md:grid-cols-[160px_1fr]">
            <span className="label-mono">LINKS</span>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href={project.link} variant="solid" external>
                VIEW LIVE →
              </MagneticButton>
              <MagneticButton href={GITHUB} external>
                <Github className="h-3.5 w-3.5" /> GITHUB
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative scroll-mt-24 border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-frame px-6 md:px-10">
        <SectionHeading
          index="04 / PROJECTS"
          title={"ENGINEERING\nLOG"}
          subtitle="Things I've built. Problems I've tried to solve."
          status={`● ${String(projects.length).padStart(2, "0")} BUILDS`}
          className="mb-4 md:mb-8"
        />

        {featured.map((p, i) => (
          <FeaturedBlock key={p.title} project={p} flip={i % 2 === 1} onOpen={() => setOpen(p)} />
        ))}

        {/* Remaining builds: dense index, each row floods with ink */}
        <div className="pt-20 md:pt-28">
          <div className="mb-8 flex items-center gap-4">
            <span className="label-mono">MORE BUILDS</span>
            <span className="h-px flex-1 bg-border" />
            <span className="label-mono">({String(more.length).padStart(2, "0")})</span>
          </div>

          <div className="border-t border-border">
            {more.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="invert-row group grid grid-cols-1 items-baseline gap-3 border-b border-border px-3 py-7 md:grid-cols-[70px_1.1fr_1.4fr_auto] md:gap-8"
              >
                <span className="label-mono">{p.index}</span>
                <button
                  onClick={() => setOpen(p)}
                  data-cursor="OPEN"
                  className="text-left"
                >
                  <h3 className="display-xl text-3xl text-foreground transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                    {p.title}
                  </h3>
                  <span className="label-mono mt-2 block">{p.tech.join(" · ")}</span>
                </button>
                <p className="muted-invert text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <div className="flex gap-2 md:justify-end">
                  <button
                    onClick={() => setOpen(p)}
                    className="label-mono border border-current px-3 py-2 transition-colors"
                  >
                    DETAILS
                  </button>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${p.title}`}
                    className="flex items-center border border-current px-3 py-2"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && <CaseStudy project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
