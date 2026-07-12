import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profileData from "../data/profile.json";
import FlipText from "./FlipText";

const email =
  profileData.socials.find((s) => s.label === "Email")?.href.replace("mailto:", "") ||
  "deorigaurav1400@gmail.com";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 scroll-mt-24 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.p>
        <h2 className="script-sub mb-12">
          <FlipText text="a little about myself" />
        </h2>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Paragraphs + signature */}
          <motion.div
            className="lg:col-span-8 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {profileData.about.paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-lg md:text-xl leading-relaxed text-foreground/85"
              >
                {para}
              </p>
            ))}

            <p className="font-script text-5xl pt-6 text-foreground">Gaurav.</p>
          </motion.div>

          {/* Meta */}
          <motion.div
            className="lg:col-span-4 space-y-6 lg:border-l lg:border-border lg:pl-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                Name
              </p>
              <p className="font-semibold">{profileData.name}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                Location
              </p>
              <p className="font-semibold">Assam, India</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                Email
              </p>
              <a
                href={`mailto:${email}`}
                className="font-semibold hover:text-primary transition-colors break-all"
              >
                {email}
              </a>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                Availability
              </p>
              <p className="font-semibold text-emerald-600">Open to work</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
