import { motion } from "framer-motion";
import { buildLog } from "../data/system";
import SectionHeading from "./ui-kit/SectionHeading";

/** Phases rendered as a horizontal pipeline on wide screens, a grid below that. */
export default function BuildLog() {
  return (
    <section id="build-log" className="relative scroll-mt-24 border-t border-border py-28 md:py-40">
      <div className="tech-grid absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-frame px-6 md:px-10">
        <SectionHeading
          index="07 / BUILD LOG"
          title={"BUILD\nLOG"}
          subtitle="From idea → system → product."
          status="● PIPELINE"
        />

        <div className="grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-5">
          {buildLog.map((entry, i) => {
            const last = i === buildLog.length - 1;
            return (
              // the cell stays opaque so the grid-line backdrop never shows through mid-fade
              <div
                key={entry.index}
                className={`group bg-background transition-colors duration-300 hover:bg-surface-2 ${
                  // odd one out on the 2-col layout spans the row instead of leaving a hole
                  last ? "md:col-span-2 xl:col-span-1" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="flex h-full flex-col p-6 md:p-7 xl:min-h-[320px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="label-mono">{entry.index}</span>
                    <span className={`h-2 w-2 ${last ? "animate-pulse-dot bg-foreground" : "bg-foreground/30"}`} />
                  </div>

                  {/* progress rail fills as you move along the pipeline */}
                  <div className="mt-5 h-px w-full bg-border">
                    <motion.div
                      className="h-px bg-foreground"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${((i + 1) / buildLog.length) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>

                  <h3 className="display-xl mt-8 text-2xl text-foreground transition-transform duration-500 group-hover:translate-x-1 md:text-3xl xl:mt-auto xl:text-[1.35rem]">
                    {entry.phase}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{entry.body}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
