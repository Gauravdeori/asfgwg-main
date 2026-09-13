import { useState } from "react";
import { motion } from "framer-motion";
import { skills, type SkillItem } from "../data/system";
import SectionHeading from "./ui-kit/SectionHeading";

const withIcons = skills.flatMap((g) => g.items).filter((i) => i.icon);
// dedupe by name so the marquee shows each tool once
const marquee = withIcons.filter((item, i) => withIcons.findIndex((x) => x.name === item.name) === i);

export default function TechStack() {
  const [active, setActive] = useState<SkillItem | null>(null);

  return (
    <section id="stack" className="relative scroll-mt-24 border-t border-border py-28 md:py-40">
      <div className="tech-grid absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-frame px-6 md:px-10">
        <SectionHeading
          index="03 / TOOLKIT"
          title={"THE\nTOOLKIT"}
          subtitle="The systems, languages and tools I build with. Hover a node to open it."
        />

        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {skills.map((group, gi) => (
            // the cell stays opaque so the grid-line backdrop never shows through mid-fade
            <div key={group.category} className="bg-background p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: gi * 0.08 }}
              >
                <div className="label-mono mb-8 flex items-center gap-3">
                  <span className="h-1 w-1 bg-foreground" />
                  {group.category}
                  <span className="ml-auto opacity-50">({String(group.items.length).padStart(2, "0")})</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <button
                      key={item.name}
                      onPointerEnter={() => setActive(item)}
                      onPointerLeave={() => setActive(null)}
                      onFocus={() => setActive(item)}
                      onBlur={() => setActive(null)}
                      className="group relative flex items-center gap-2.5 border border-border px-4 py-3 text-left transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:border-foreground hover:shadow-[4px_4px_0_hsl(var(--rule))]"
                    >
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt=""
                          className="mono-icon h-4 w-4 object-contain"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      )}
                      <span className="font-display text-sm uppercase tracking-[0.08em] text-foreground">
                        {item.name}
                      </span>
                      <span className="absolute right-1 top-1 h-1 w-1 bg-foreground/0 transition-colors group-hover:bg-foreground" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Readout for the hovered node */}
        <div className="mt-6 flex min-h-14 items-center gap-4 border border-border px-5 py-4">
          <span className="label-mono shrink-0">OUTPUT</span>
          <span className="h-4 w-px bg-border" />
          <motion.span
            key={active?.name ?? "idle"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-xs tracking-[0.12em] text-muted-foreground"
          >
            {active ? `${active.name.toUpperCase()} — ${active.note}` : "AWAITING SELECTION..."}
            <span className="ml-1 animate-pulse-dot text-foreground">_</span>
          </motion.span>
        </div>
      </div>

      {/* Toolbelt marquee */}
      <div className="marquee-mask group relative mt-16 flex overflow-hidden">
        <div className="flex w-max shrink-0 gap-3 pr-3 animate-marquee group-hover:[animation-play-state:paused]">
          {[...marquee, ...marquee].map((skill, index) => (
            <div key={index} className="tech-badge shrink-0" aria-hidden={index >= marquee.length}>
              <img
                src={skill.icon}
                alt=""
                className="mono-icon h-4 w-4 object-contain"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
