import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import udemyCertificate from "@/assets/udemy-certificate.png";
import FlipText from "./FlipText";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-24 md:py-32 scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Certifications
        </motion.p>
        <h2 className="script-sub mb-16">
          <FlipText text="proof I put in the hours" />
        </h2>

        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="glass-card p-6 md:p-10 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Certificate Image */}
              <div className="lg:w-1/2">
                <div className="rounded-2xl overflow-hidden border border-border">
                  <img
                    src={cert.image}
                    alt={`${cert.title} Certificate`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Certificate Details */}
              <div className="lg:w-1/2 flex flex-col justify-center">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  {cert.issuer}
                </span>

                <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
                  {cert.title}
                </h3>

                <p className="text-muted-foreground mb-5">
                  Instructor: <span className="text-foreground">{cert.instructor}</span>
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="work-tag">Completed {cert.date}</span>
                  <span className="work-tag">{cert.duration}</span>
                </div>

                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline gap-2 w-fit"
                >
                  View Credential
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
