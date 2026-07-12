import { Github, Instagram, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Gauravdeori", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/_gauravdeori__/?utm_source=ig_web_button_share_sheet", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/gaurav-deori-759214304", label: "LinkedIn" },
  { icon: Mail, href: "mailto:deorigaurav1400@gmail.com", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} Gaurav Deori
          </p>
        </div>
      </div>

      {/* Giant name marquee strip */}
      <div className="relative select-none pointer-events-none" aria-hidden="true">
        <div className="flex whitespace-nowrap animate-marquee">
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="display-md text-[18vw] leading-[0.8] text-foreground/[0.09] pr-[0.5em]"
            >
              GAURAV DEORI&nbsp;GAURAV DEORI&nbsp;
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
