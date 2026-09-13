import { Github, Instagram, Linkedin, Mail, ArrowUp, type LucideIcon } from "lucide-react";
import profileData from "../data/profile.json";
import { system } from "../data/system";

const icons: Record<string, LucideIcon> = { Github, Instagram, Linkedin, Mail };

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="mx-auto max-w-frame px-6 pt-14 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="font-display text-2xl uppercase tracking-[0.2em] text-foreground">
              {profileData.name}
            </div>
            <p className="label-mono mt-3">{system.statement}</p>
          </div>
          <a href="#home" className="label-mono inline-flex items-center gap-2 hover:text-foreground">
            BACK TO TOP <ArrowUp className="h-3 w-3" />
          </a>
        </div>

        {/* Social rows — each floods with ink on hover */}
        <div className="mt-12 grid gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {profileData.socials.map((social) => {
            const Icon = icons[social.icon] ?? ArrowUp;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="invert-row flex items-center justify-between gap-4 bg-background px-4 py-6"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em]">{social.label}</span>
                </span>
                <ArrowUp className="h-3.5 w-3.5 rotate-45" aria-hidden="true" />
              </a>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-6">
          <span className="label-mono">SYSTEM SHUTDOWN — SESSION END</span>
          <span className="label-mono">
            © {new Date().getFullYear()} {profileData.name}
          </span>
        </div>
      </div>

      {/* Giant name strip, clipped by the footer edge */}
      <div className="pointer-events-none relative select-none border-t border-border" aria-hidden="true">
        <div className="flex whitespace-nowrap animate-marquee">
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="display-xl pr-[0.4em] pt-4 text-[19vw] leading-[0.78] text-foreground/[0.07]"
            >
              GAURAV DEORI&nbsp;GAURAV DEORI&nbsp;
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
