import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Send, ArrowUpRight } from "lucide-react";

const rotatingWords = ["design", "build", "create"];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setWordIndex((i) => (i + 1) % rotatingWords.length),
      2000
    );
    return () => clearInterval(interval);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(`From: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:deorigaurav1400@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 md:py-32 scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            lets{" "}
            <span className="relative inline-block align-baseline w-[3.2em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[wordIndex]}
                  className="font-script text-primary absolute left-0"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3 }}
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="invisible font-script">create</span>
            </span>
            <br />
            incredible work together.
          </h2>

          <div className="mt-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                Email
              </p>
              <a
                href="mailto:deorigaurav1400@gmail.com"
                className="text-lg md:text-xl font-semibold hover:text-primary transition-colors inline-flex items-center gap-2 group"
              >
                deorigaurav1400@gmail.com
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-2xl space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                Name
              </label>
              <input
                type="text"
                id="contact-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none focus:ring-0 transition-colors duration-300 rounded-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                Email
              </label>
              <input
                type="email"
                id="contact-email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none focus:ring-0 transition-colors duration-300 rounded-none"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">
              Message
            </label>
            <textarea
              id="contact-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
              className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none focus:ring-0 transition-colors duration-300 resize-none rounded-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button type="submit" className="btn-primary gap-2">
            <Send size={16} />
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
