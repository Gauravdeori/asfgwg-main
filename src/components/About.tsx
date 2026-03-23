import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profileData from "../data/profile.json";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <motion.p 
            className="section-heading"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            About Me
          </motion.p>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {profileData.about.title}
          </motion.h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            {profileData.about.paragraphs.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                dangerouslySetInnerHTML={{ __html: para.replace(/Web Developer|Founder of Theposterzz/g, match => `<span class="text-foreground font-medium">${match}</span>`) }}
              />
            ))}
          </div>

          {/* Animated decorative elements */}
          <motion.div
            className="flex gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            <motion.div 
              className="h-1 w-20 bg-primary rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
            <motion.div 
              className="h-1 w-10 bg-primary/50 rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            />
            <motion.div 
              className="h-1 w-5 bg-primary/30 rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.4, delay: 1 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
