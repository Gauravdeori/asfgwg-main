import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
];

const statement =
  "I turn ideas into clean, modern, responsive websites — interfaces that feel obvious, code that stays maintainable, and details that quietly do the work.";

const words = statement.split(" ");

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* One word of the pinned statement: fades from faint + blurred to solid black
   as its slice of the scroll range passes — scrubbed, not one-shot. */
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
      className="inline-block mr-[0.28em]"
      style={{
        opacity: 0.18 + 0.82 * t,
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
    <span className="display-md text-6xl md:text-8xl text-gradient-brand">
      {value}
      {suffix}
    </span>
  );
};

const stats = [
  {
    to: 8,
    suffix: "+",
    title: "Projects shipped",
    sub: "from landing pages to AI-powered web apps, all live in production",
  },
  {
    to: 2,
    suffix: "",
    title: "Ventures founded",
    sub: "PresentIQ — a CTII Dibrugarh University funded & incubated SaaS — and Theposterzz, a creative branding studio",
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
    <section id="skills" className="scroll-mt-24 bg-white">
      {/* Pinned scroll-scrub statement (tall track, sticky viewport) */}
      <div ref={scrubRef} className="relative h-[260vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="container mx-auto px-6">
            <p className="section-label mb-10">What I Do</p>
            <h2 className="text-2xl md:text-4xl lg:text-[2.75rem] font-semibold leading-snug max-w-4xl">
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

      {/* Stats + toolbelt */}
      <div className="container mx-auto px-6 pb-24 md:pb-32" ref={statsRef}>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-20 border-t border-border pt-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
            >
              <CountUp to={stat.to} suffix={stat.suffix} started={statsInView} />
              <p className="text-lg font-semibold mt-3">{stat.title}</p>
              <p className="text-muted-foreground text-sm mt-1 max-w-xs">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={statsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 10 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.04 }}
              className="tech-badge"
            >
              <img
                src={skill.icon}
                alt=""
                className="w-4 h-4 object-contain"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              {skill.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
