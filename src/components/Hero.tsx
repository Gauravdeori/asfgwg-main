import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import profileData from "../data/profile.json";
import FlipText from "./FlipText";
import heroIllustration from "@/assets/hero-dev.jpg";

const line1 = "full stack";
const line2 = "developer";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-white">
      {/* Full-bleed illustration background */}
      <motion.img
        src={heroIllustration}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-[100%_center] pointer-events-none"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
      />
      {/* Readability overlays: white wash from the left + fade into the page below */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, hsl(0 0% 100% / 0.97) 0%, hsl(0 0% 100% / 0.92) 45%, hsl(0 0% 100% / 0.55) 68%, hsl(0 0% 100% / 0.1) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-56 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(0 0% 100%))" }}
      />
      {/* Top wash keeps the transparent navbar readable over the sky */}
      <div
        className="absolute inset-x-0 top-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, hsl(0 0% 100% / 0.9), transparent)" }}
      />

      <div className="container mx-auto px-6 pt-28 pb-16 relative z-10">
        {/* Script intro */}
        <motion.p
          className="font-script text-4xl md:text-5xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          👋 Hey, I'm <span className="text-primary">Gaurav</span>
        </motion.p>

        {/* Giant display headline with 3D letter flips */}
        <h1 className="display-giant mb-10">
          <span className="sr-only">Full Stack Developer</span>
          <span className="block" aria-hidden="true">
            <FlipText text={line1} delay={0.6} immediate />
          </span>
          <span className="block" aria-hidden="true">
            <FlipText
              text={line2}
              delay={0.6 + line1.length * 0.035}
              immediate
              letterClassName="text-gradient-brand"
            />
          </span>
        </h1>

        {/* Bottom row: tagline + meta */}
        <div className="max-w-3xl">
          <div>
            {/* Tagline */}
            <motion.p
              className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              Building clean, modern web experiences @{" "}
              <a
                href="https://theposterzz.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-semibold underline underline-offset-4 decoration-2 hover:text-primary transition-colors"
              >
                theposterzz
              </a>
            </motion.p>

            {/* Mono meta row */}
            <motion.div
              className="flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <div className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">
                <span className="block mb-1">Based in</span>
                <span className="text-foreground">Assam, IN</span>
              </div>

              <div className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">
                create &gt; consume
              </div>

              {/* Socials */}
              <div className="flex gap-5">
                {profileData.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-hover font-mono text-xs md:text-sm uppercase tracking-[0.2em]"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#skills"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
