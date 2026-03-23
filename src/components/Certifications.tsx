import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";
import { PixelCorner } from "./PixelDecorations";
import udemyCertificate from "@/assets/udemy-certificate.png";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-heading">Certifications</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Professional <span className="text-mint">Credentials</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card p-6 md:p-8 relative overflow-hidden"
            >
              <PixelCorner position="top-left" />
              <PixelCorner position="top-right" />
              <PixelCorner position="bottom-left" />
              <PixelCorner position="bottom-right" />
              
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Certificate Image */}
                <motion.div 
                  className="lg:w-1/2 relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="rounded-xl overflow-hidden border border-border/50 shadow-lg">
                    <img
                      src={cert.image}
                      alt={`${cert.title} Certificate`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-mint/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>

                {/* Certificate Details */}
                <div className="lg:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-mint/10 flex items-center justify-center">
                      <Award className="text-mint" size={24} />
                    </div>
                    <span className="text-mint font-medium">{cert.issuer}</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
                    {cert.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    Instructor: <span className="text-foreground">{cert.instructor}</span>
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-mint" />
                      Completed: {cert.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-mint/60" />
                      Duration: {cert.duration}
                    </span>
                  </div>

                  <motion.a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-mint/10 text-mint border border-mint/30 hover:bg-mint/20 hover:border-mint/50 transition-all duration-300 w-fit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium">View Credential</span>
                    <ExternalLink size={16} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
