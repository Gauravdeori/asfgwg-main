import { Suspense, lazy } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import profileData from "../data/profile.json";
import { system } from "../data/system";
import { useIsLite, useMounted } from "@/lib/use-client";
import FlipText from "./FlipText";
import MagneticButton from "./ui-kit/MagneticButton";

const CoreScene = lazy(() => import("./three/CoreScene"));

export default function Hero() {
  const mounted = useMounted();
  const lite = useIsLite();
  const { resolvedTheme } = useTheme();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 160]);
  const opacity = useTransform(scrollY, [0, 520], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.18]);

  const socials = profileData.socials.filter((s) => s.label !== "Email");

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <div className="tech-grid absolute inset-0 opacity-60" />
      <div className="scanlines absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,hsl(var(--foreground)/0.08),transparent_60%)]" />

      {/* 3D core */}
      <motion.div style={{ scale, opacity }} className="absolute inset-0">
        {mounted && (
          <Suspense fallback={null}>
            <CoreScene lite={lite} dark={resolvedTheme !== "light"} />
          </Suspense>
        )}
      </motion.div>

      {/* Focus vignette so the type stays legible over the core */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_28%_at_50%_52%,hsl(var(--background)/0.88),transparent_70%)]" />

      {/* HUD rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[68vmin] w-[68vmin] animate-spin-slow rounded-full border border-border" />
        <div className="absolute h-[86vmin] w-[86vmin] animate-spin-slow-reverse rounded-full border border-dashed border-border" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-frame flex-col justify-between px-6 pb-10 pt-32 md:px-10"
      >
        <div className="flex items-center justify-between">
          <span className="label-mono flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse-dot bg-foreground" />
            CORE / ONLINE
          </span>
          <span className="label-mono hidden sm:block">{system.location}</span>
        </div>

        <div className="py-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="label-mono"
          >
            Hey — I&apos;m {profileData.name}
            <span className="hidden sm:inline"> · {system.role}</span>
          </motion.p>

          <h1 className="display-xl text-glow mt-6 text-[15vw] leading-[0.85] text-foreground sm:text-[12vw] lg:text-[9rem]">
            <span className="sr-only">{profileData.name}, Full Stack Developer</span>
            <span aria-hidden="true">
              <FlipText text={profileData.name.toUpperCase()} delay={0.35} stagger={0.045} immediate />
            </span>
          </h1>

          {/* Outlined second line: the brutalist two-tone largetype */}
          <p
            aria-hidden="true"
            className="display-xl text-stroke mt-2 text-[8.5vw] leading-[0.95] sm:text-[6vw] lg:text-[4.75rem]"
          >
            <FlipText text="Full Stack Developer" delay={0.9} stagger={0.025} immediate />
          </p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.9 }}
            className="mx-auto mt-8 max-w-2xl font-display text-base uppercase tracking-[0.12em] text-muted-foreground sm:text-lg"
          >
            {system.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.45, duration: 0.8 }}
            className="mt-3 text-sm text-muted-foreground"
          >
            Building clean, modern web experiences @{" "}
            <a
              href="https://theposterzz.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-0.5 font-semibold text-foreground underline decoration-1 underline-offset-4 transition-colors hover:bg-foreground hover:text-background hover:no-underline"
            >
              theposterzz
            </a>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.9 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton href="#projects" variant="solid">
              EXPLORE MY WORK
            </MagneticButton>
            <MagneticButton href="#about">ABOUT ME</MagneticButton>
          </motion.div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-4">
            {system.readout.map((r) => (
              <div key={r.k} className="label-mono flex gap-2">
                <span className="opacity-50">{r.k}</span>
                <span className="text-foreground">{r.v}</span>
              </div>
            ))}
          </div>

          <div className="hidden gap-5 md:flex">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover font-mono text-[11px] uppercase tracking-[0.22em]"
              >
                {s.label}
              </a>
            ))}
          </div>

          <a href="#skills" className="label-mono flex items-center gap-3 hover:text-foreground">
            SCROLL
            <span className="block h-8 w-px bg-gradient-to-b from-foreground to-transparent" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
