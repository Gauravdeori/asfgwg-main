import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import profileData from "../data/profile.json";
import { system } from "../data/system";
import MagneticButton from "./ui-kit/MagneticButton";

const email =
  profileData.socials.find((s) => s.label === "Email")?.href.replace("mailto:", "") ||
  "deorigaurav1400@gmail.com";

const socials = profileData.socials.filter((s) => s.label !== "Email");

const rotatingWords = ["design", "build", "create"];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % rotatingWords.length), 2000);
    return () => clearInterval(id);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Message from ${data.get("name")}`);
    const body = encodeURIComponent(
      `From: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 border-t border-border py-28 md:py-40">
      <div className="scanlines absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-frame px-6 md:px-10">
        <div className="label-mono mb-8 flex items-center gap-4">
          <span>10 / TERMINAL</span>
          <span className="h-px flex-1 bg-border" />
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-foreground" />
            CHANNEL OPEN
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="display-xl text-glow text-[13vw] leading-[0.85] text-foreground lg:text-[9rem]"
        >
          <span className="block">LET&apos;S</span>
          {/* the verb cycles in a clipped slot so the line never reflows */}
          <span className="relative block h-[0.9em] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[wordIndex]}
                className="text-stroke absolute left-0 top-0 whitespace-nowrap [text-shadow:none]"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="block">SOMETHING.</span>
        </motion.h2>

        <p className="mt-8 max-w-xl text-sm text-muted-foreground md:text-base">
          Have an idea, project, collaboration or opportunity?
        </p>

        <div className="mt-14 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="label-mono mb-3">DIRECT LINE</p>
            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-3 break-all font-mono text-lg text-foreground md:text-2xl"
            >
              <span className="border-b border-foreground px-0.5 transition-colors group-hover:border-transparent group-hover:bg-foreground group-hover:text-background">
                {email}
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>

            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton href={`mailto:${email}`} variant="solid">
                GET IN TOUCH
              </MagneticButton>
              {socials.map((s) => (
                <MagneticButton key={s.label} href={s.href} external>
                  {s.label}
                </MagneticButton>
              ))}
            </div>

            <div className="mt-10 divide-y divide-border border-y border-border">
              {[
                { k: "EMAIL", v: email },
                { k: "LOCATION", v: system.location },
                { k: "STATUS", v: "Open to work" },
                { k: "RESPONSE", v: "Usually within a day" },
              ].map((row) => (
                <div key={row.k} className="flex items-center justify-between gap-4 py-3">
                  <span className="label-mono">{row.k}</span>
                  <span className="break-all text-right font-mono text-xs uppercase tracking-[0.12em] text-foreground">
                    {row.v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="hud-panel hud-corners space-y-6 p-6 md:p-8">
            <div className="label-mono flex items-center justify-between">
              <span>TRANSMISSION FORM</span>
              <span className="animate-pulse-dot text-foreground">_</span>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                { id: "name", label: "NAME", type: "text", placeholder: "Your name" },
                { id: "email", label: "EMAIL", type: "email", placeholder: "your@email.com" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={`contact-${f.id}`} className="label-mono">
                    {f.label}
                  </label>
                  <input
                    id={`contact-${f.id}`}
                    name={f.id}
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    className="field placeholder:text-muted-foreground/50"
                  />
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="contact-message" className="label-mono">
                MESSAGE
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                placeholder="Tell me about your project..."
                className="field resize-none placeholder:text-muted-foreground/50"
              />
            </div>

            <MagneticButton type="submit" variant="solid" className="w-full">
              INITIATE CONNECTION →
            </MagneticButton>

            {sent && (
              <p className="label-mono text-foreground">
                CHANNEL HANDED TO YOUR MAIL CLIENT — SEND TO COMPLETE.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
