import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const statement =
  "I turn ideas into clean, modern, responsive websites — interfaces that feel obvious, code that stays maintainable, and details that quietly do the work.";

const words = statement.split(" ");

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* One word of the pinned statement: fades from faint + blurred to solid as its
   slice of the scroll range passes — scrubbed, not one-shot. */
const ScrubWord = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: number;
  range: [number, number];
}) => {
  const t = clamp01((progress - range[0]) / (range[1] - range[0]));
  return (
    <span
      className="mr-[0.28em] inline-block"
      style={{
        opacity: 0.15 + 0.85 * t,
        filter: t >= 1 ? "none" : `blur(${(4 * (1 - t)).toFixed(2)}px)`,
      }}
    >
      {children}
    </span>
  );
};

const CountUp = ({ to, suffix, started }: { to: number; suffix: string; started: boolean }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [started, to]);

  return (
    <span className="display-xl text-stroke text-7xl tabular-nums md:text-9xl">
      {value}
      {suffix}
    </span>
  );
};

const stats = [
  {
    to: 9,
    suffix: "+",
    title: "Projects shipped",
    sub: "from landing pages to AI and IoT-powered web apps, all live in production",
  },
  {
    to: 3,
    suffix: "",
    title: "Ventures founded",
    sub: "PresentIQ (CTII Dibrugarh University funded & incubated SaaS), Webro Studios (web dev agency) & Theposterzz (branding studio)",
  },
];

const Skills = () => {
  const scrubRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = scrubRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      setProgress(clamp01(-rect.top / total));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="skills" className="relative scroll-mt-24 border-t border-border">
      {/* Pinned scroll-scrub statement (tall track, sticky viewport) */}
      <div ref={scrubRef} className="relative h-[240vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="tech-grid absolute inset-0 opacity-30" />
          <div className="relative mx-auto w-full max-w-frame px-6 md:px-10">
            <div className="mb-10 flex items-center gap-4 md:mb-14">
              <span className="label-mono">01 / WHAT I DO</span>
              <span className="h-px flex-1 bg-border" />
              <span className="label-mono tabular-nums">{String(Math.round(progress * 100)).padStart(3, "0")}%</span>
            </div>
            <h2 className="max-w-5xl font-display text-2xl font-medium uppercase leading-[1.22] tracking-[-0.01em] md:text-4xl lg:text-[3.25rem]">
              {words.map((word, i) => {
                const start = i / (words.length + 4);
                const end = (i + 4) / (words.length + 4);
                return (
                  <ScrubWord key={i} progress={progress} range={[start, end]}>
                    {word}
                  </ScrubWord>
                );
              })}
            </h2>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto max-w-frame px-6 pb-24 md:px-10 md:pb-32" ref={statsRef}>
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {stats.map((stat, i) => (
            <div key={stat.title} className="bg-background p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15 }}
              >
                <span className="label-mono mb-6 block">STAT / 0{i + 1}</span>
                <CountUp to={stat.to} suffix={stat.suffix} started={statsInView} />
                <p className="mt-5 font-display text-lg font-bold uppercase tracking-[0.04em]">{stat.title}</p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{stat.sub}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
