import { motion } from "framer-motion";
import profileData from "../data/profile.json";
import { system } from "../data/system";
import SectionHeading from "./ui-kit/SectionHeading";
import portrait from "@/assets/hero-dev.jpg";

const email =
  profileData.socials.find((s) => s.label === "Email")?.href.replace("mailto:", "") ||
  "deorigaurav1400@gmail.com";

const About = () => {
  const rows = [
    { key: "NAME", value: profileData.name.toUpperCase() },
    ...system.systemProfile,
    { key: "LOCATION", value: system.location.toUpperCase() },
  ];

  return (
    <section id="about" className="relative scroll-mt-24 border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-frame px-6 md:px-10">
        <SectionHeading index="02 / SYSTEM PROFILE" title={"SYSTEM\nPROFILE"} status="● BIO" />

        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="font-display text-2xl leading-tight text-foreground sm:text-3xl md:text-4xl"
            >
              {system.bio}
            </motion.p>

            <motion.div
              className="mt-10 space-y-6 border-l border-border pl-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {profileData.about.paragraphs.map((para, i) => (
                <p key={i} className="leading-relaxed text-muted-foreground md:text-lg">
                  {para}
                </p>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="label-mono mt-10 text-foreground"
            >
              {system.motto}
            </motion.p>

            <div className="mt-6 flex flex-wrap gap-2">
              {system.traits.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>

            <p className="display-xl mt-12 text-5xl text-foreground">Gaurav.</p>
          </div>

          <div className="hud-panel hud-corners lift self-start p-6 md:p-8">
            <div className="label-mono mb-6 flex items-center justify-between">
              <span>PROFILE.DAT</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-foreground" />
                LIVE
              </span>
            </div>

            {/* Illustration, colour stripped, scanned into the panel */}
            <div className="relative mb-6 aspect-[4/3] overflow-hidden border border-border">
              <img
                src={portrait}
                alt="Illustration of Gaurav at work"
                loading="lazy"
                className="duotone h-full w-full object-cover object-right transition-transform duration-700 hover:scale-105"
              />
              <div className="scanlines pointer-events-none absolute inset-0" />
              <span className="label-mono absolute bottom-2 left-2 bg-background/80 px-2 py-1 text-[9px]">
                IMG / GD-01
              </span>
            </div>

            <div className="divide-y divide-border">
              {rows.map((row, i) => (
                <motion.div
                  key={row.key}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex items-center justify-between gap-4 py-3.5"
                >
                  <span className="label-mono">{row.key}</span>
                  <span className="text-right font-mono text-xs tracking-[0.14em] text-foreground">
                    {row.value}
                  </span>
                </motion.div>
              ))}

              <div className="flex items-center justify-between gap-4 py-3.5">
                <span className="label-mono">EMAIL</span>
                <a
                  href={`mailto:${email}`}
                  className="link-hover break-all text-right font-mono text-xs tracking-[0.06em] text-foreground"
                >
                  {email}
                </a>
              </div>

              <div className="flex items-center justify-between gap-4 py-3.5">
                <span className="label-mono">STATUS</span>
                <span className="flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-foreground">
                  <span className="h-1.5 w-1.5 animate-pulse-dot bg-foreground" />
                  OPEN TO WORK
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
