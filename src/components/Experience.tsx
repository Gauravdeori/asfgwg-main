import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./ui-kit/SectionHeading";

const experiences = [
  {
    title: "Founder & CEO",
    company: "PresentIQ",
    url: "https://present-iq1.vercel.app/",
    description:
      "Building PresentIQ — a role-based attendance management SaaS, funded and incubated by CTII, Dibrugarh University.",
  },
  {
    title: "Founder & CEO",
    company: "Webro Studios",
    url: "https://www.webrostudios.space/",
    description: "Running a web development agency, building websites and digital experiences for clients.",
  },
  {
    title: "Founder & CEO",
    company: "Theposterzz",
    url: "https://theposterzz.in/",
    description:
      "Leading a creative branding initiative, designing visual identities for individuals and student communities.",
  },
  {
    title: "Freelance Web & Design Work",
    company: "Self-Employed",
    url: null,
    description: "Building websites and creating design assets for various clients and personal projects.",
  },
  {
    title: "Student Web Developer",
    company: "Independent",
    url: null,
    description: "Continuously learning and building projects to strengthen web development skills.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="relative scroll-mt-24 border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-frame px-6 md:px-10">
        <SectionHeading
          index="06 / EXPERIENCE"
          title={"THE\nJOURNEY"}
          subtitle="Roles I've held and ventures I've started."
          status={`● ${String(experiences.length).padStart(2, "0")} ROLES`}
        />

        <div className="border-t border-border">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="invert-row group grid grid-cols-1 gap-3 border-b border-border px-3 py-8 md:grid-cols-[70px_1fr_1.2fr_auto] md:items-baseline md:gap-8"
            >
              <span className="label-mono">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="display-xl text-3xl text-foreground transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                  {exp.company}
                </h3>
                <span className="label-mono mt-2 block">{exp.title}</span>
              </div>
              <p className="muted-invert max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {exp.description}
              </p>
              {exp.url ? (
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono inline-flex items-center gap-1.5 self-start border border-current px-3 py-2"
                >
                  VISIT <ArrowUpRight className="h-3 w-3" />
                </a>
              ) : (
                <span className="label-mono self-start px-3 py-2 opacity-60">—</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
