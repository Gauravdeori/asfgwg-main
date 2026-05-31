import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, MapPin, Mail, Sparkles } from "lucide-react";
import profileData from "../data/profile.json";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Main About Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-2xl"
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
              className="section-title mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {profileData.about.title}
            </motion.h2>

            <div className="space-y-5 text-base text-muted-foreground leading-relaxed">
              {profileData.about.paragraphs.map((para, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  dangerouslySetInnerHTML={{ __html: para.replace(/Web Developer|Founder of Theposterzz/g, match => `<span class="text-foreground font-semibold">${match}</span>`) }}
                />
              ))}
            </div>

            {/* Decorative line */}
            <motion.div
              className="flex gap-2 mt-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              <motion.div 
                className="h-1 w-16 bg-primary rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
              <motion.div 
                className="h-1 w-8 bg-primary/40 rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
              />
              <motion.div 
                className="h-1 w-4 bg-primary/20 rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.4, delay: 1 }}
              />
            </motion.div>
          </motion.div>

          {/* About Me Card - Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:w-80"
          >
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                About Me
                <span className="section-heading text-[10px] m-0 p-0" style={{ marginBottom: 0 }}></span>
              </h3>

              <div className="space-y-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I'm a passionate Full Stack Developer who loves building web applications that are fast, accessible and visually appealing.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I enjoy turning ideas into reality using modern technologies.
                </p>

                {/* Info items */}
                <div className="space-y-4 pt-4 border-t border-border/30">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-primary" />
                    <div>
                      <span className="text-xs text-muted-foreground">Name</span>
                      <p className="text-sm font-medium">{profileData.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-primary" />
                    <div>
                      <span className="text-xs text-muted-foreground">Location</span>
                      <p className="text-sm font-medium">Assam, India</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-primary" />
                    <div>
                      <span className="text-xs text-muted-foreground">Email</span>
                      <p className="text-sm font-medium">deorigaurav1400@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles size={16} className="text-primary" />
                    <div>
                      <span className="text-xs text-muted-foreground">Availability</span>
                      <p className="text-sm font-medium text-emerald-500">Open to work</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <motion.a
                  href="#contact"
                  className="btn-primary w-full flex items-center justify-center gap-2 text-sm mt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Let's Connect →
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
