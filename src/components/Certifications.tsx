import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import udemyCertificate from "@/assets/udemy-certificate.png";
import SectionHeading from "./ui-kit/SectionHeading";
import MagneticButton from "./ui-kit/MagneticButton";

const certifications = [
  {
    title: "The Complete Full-Stack Web Development Bootcamp",
    issuer: "Udemy",
    instructor: "Dr. Angela Yu",
    date: "Jan. 19, 2026",
    duration: "62 total hours",
    image: udemyCertificate,
    credentialUrl: "https://ude.my/UC-7f06c9f6-05f4-42de-9ff7-2c3bc43b4a7f",
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="relative scroll-mt-24 border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-frame px-6 md:px-10">
        <SectionHeading
          index="09 / CERTIFICATIONS"
          title={"VERIFIED\nHOURS"}
          subtitle="Proof I put in the hours."
          status="● VERIFIED"
        />

        {certifications.map((cert) => (
          <motion.div
            key={cert.title}
            className="hud-panel hud-corners grid gap-8 p-6 md:p-10 lg:grid-cols-2 lg:gap-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="VERIFY"
              className="group relative block overflow-hidden border border-border"
            >
              <img
                src={cert.image}
                alt={`${cert.title} Certificate`}
                loading="lazy"
                className="duotone h-auto w-full object-cover transition-all duration-700 group-hover:scale-[1.03] group-hover:[filter:none]"
              />
              <div className="scanlines pointer-events-none absolute inset-0" />
            </a>

            <div className="flex flex-col justify-center">
              <div className="label-mono mb-4 flex items-center gap-3">
                <span className="h-1 w-1 bg-foreground" />
                {cert.issuer}
              </div>

              <h3 className="display-xl mb-6 text-3xl leading-[0.95] text-foreground md:text-4xl">{cert.title}</h3>

              <div className="mb-8 divide-y divide-border border-y border-border">
                {[
                  { k: "INSTRUCTOR", v: cert.instructor },
                  { k: "COMPLETED", v: cert.date },
                  { k: "DURATION", v: cert.duration },
                ].map((row) => (
                  <div key={row.k} className="flex items-center justify-between gap-4 py-3">
                    <span className="label-mono">{row.k}</span>
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-foreground">{row.v}</span>
                  </div>
                ))}
              </div>

              <MagneticButton href={cert.credentialUrl} external className="self-start">
                VIEW CREDENTIAL <ArrowUpRight className="h-3.5 w-3.5" />
              </MagneticButton>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
