import { Github, Instagram, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Gauravdeori", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/_gauravdeori__/?utm_source=ig_web_button_share_sheet", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/gaurav-deori-759214304", label: "LinkedIn" },
  { icon: Mail, href: "mailto:deorigaurav1400@gmail.com", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Name */}
          <div className="text-center md:text-left">
            <p className="text-lg font-bold">
              <span className="text-primary font-mono">&lt;/&gt;</span>
              {" "}Gaurav <span className="text-primary">Deori</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Web Developer & Founder
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground text-center md:text-right">
            © {new Date().getFullYear()} Gaurav Deori. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
