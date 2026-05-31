import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, MapPin, Mail, Sparkles } from "lucide-react";
import profileData from "../data/profile.json";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div id="about" className="relative scroll-mt-24" ref={ref}>
      <motion.h2 
        className="text-2xl font-bold flex items-center gap-1.5 text-foreground mb-6"
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        About Me <span className="text-primary">•</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full"
      >
        <div className="glass-card p-6">
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
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <User size={14} />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block">Name</span>
                  <p className="text-xs font-semibold text-foreground">{profileData.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin size={14} />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block">Location</span>
                  <p className="text-xs font-semibold text-foreground">Assam, India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Mail size={14} />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block">Email</span>
                  <p className="text-xs font-semibold text-foreground">{profileData.socials.find(s => s.label === "Email")?.href.replace("mailto:", "") || "deorigaurav1400@gmail.com"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Sparkles size={14} />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block">Availability</span>
                  <p className="text-xs font-semibold text-emerald-500">Open to work</p>
                </div>
              </div>
            </div>

            {/* CTA Link to connect */}
            <motion.a
              href="#contact"
              className="btn-primary w-full flex items-center justify-center gap-2 text-xs py-2.5 mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Let's Connect →
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
