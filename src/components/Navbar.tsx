import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import profileData from "../data/profile.json";
import { navItems, system } from "../data/system";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          compact
            ? "border-border bg-background/80 py-3 backdrop-blur-xl"
            : "border-transparent py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-frame items-center justify-between px-6 md:px-10">
          {/* Wordmark collapses to initials once scrolled */}
          <a
            href="#home"
            className="group inline-flex items-center gap-2.5 font-display text-lg font-bold uppercase tracking-[0.2em] text-foreground"
          >
            <span className="h-2 w-2 bg-foreground transition-transform duration-300 group-hover:rotate-45" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={compact ? "short" : "full"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {compact ? system.shortName : profileData.name}
              </motion.span>
            </AnimatePresence>
          </a>

          {/* Numbered links; ink floods up from below on hover */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item, i) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group relative block overflow-hidden px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-background"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-300 ease-brut group-hover:scale-y-100"
                  />
                  <span className="relative">
                    <span className="opacity-50">0{i + 1} </span>
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <span className="label-mono hidden items-center gap-2 xl:flex">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-foreground" />
              SYSTEM ONLINE
            </span>
            <ThemeToggle />
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center border border-border-strong text-foreground transition-colors hover:bg-foreground hover:text-background lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="tech-grid fixed inset-0 z-[60] flex flex-col bg-background lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-6">
              <span className="label-mono">NAVIGATION</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center border border-border-strong"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center px-6">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.15 }}
                  className="border-b border-border"
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="invert-row display-xl flex items-baseline gap-4 px-2 py-4 text-4xl text-foreground"
                  >
                    <span className="label-mono">0{i + 1}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="label-mono flex justify-between px-6 py-8">
              <span>● SYSTEM ONLINE</span>
              <span>{system.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
