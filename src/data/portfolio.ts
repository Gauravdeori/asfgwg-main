export interface NavItem {
  id: string;
  number: string;
  label: string;
  href: string;
}

export interface StatItem {
  id: string;
  icon: 'cube' | 'star' | 'trophy' | 'users';
  value: string;
  label: string;
  sublabel?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  role?: string;
  description: string;
  longDescription?: string;
  category: 'saas' | 'iot' | 'ecommerce' | 'web' | 'game';
  featured: boolean;
  tags: string[];
  imageDark: string;
  imageLight: string;
  link: string;
  caseStudy?: {
    problem: string;
    solution: string;
    features: string[];
  };
}

export interface TechItem {
  name: string;
  iconId: string;
  category?: string;
  note?: string;
  /** Proficiency out of 7 (halves allowed, e.g. 4.5) */
  level?: number;
  /** Official site, opened from the card's arrow button */
  url?: string;
}

export interface ExperienceItem {
  number: string;
  title: string;
  company: string;
  period: string;
  description: string;
  url?: string | null;
  achievements?: string[];
}

export interface EducationItem {
  degree: string;
  field: string | null;
  institution: string;
  period: string;
  focus?: string | null;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  instructor: string;
  date: string;
  duration: string;
  credentialUrl: string;
  image?: string;
}

export interface BuildLogEntry {
  index: string;
  phase: string;
  body: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    firstName: string;
    lastName: string;
    role: string;
    avatar: string;
    eyebrow: string;
    tagline: string;
    subline: string;
    bioStatement: string;
    motto: string;
    resumeUrl: string;
    viewWorkAnchor: string;
    location: string;
    coordinates: string;
    badgeLocation: string;
    badgeCountry: string;
    speechBubbleLines: string[];
    heroImageDark: string;
    heroImageLight: string;
  };
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
    x: string;
    email: string;
  };
  navigation: NavItem[];
  stats: StatItem[];
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAllUrl: string;
    items: ProjectItem[];
  };
  about: {
    eyebrow: string;
    title: string;
    subtitle: string;
    philosophyStatement?: string;
    motto?: string;
    statement?: string;
    portraitDark: string;
    portraitLight: string;
    paragraphs: string[];
    extendedParagraphs: string[];
    buttonText: string;
    buttonUrl: string;
    traits: string[];
    systemSpecs: { key: string; value: string }[];
  };
  techStack: {
    eyebrow: string;
    title: string;
    subtitle?: string;
    items: TechItem[];
  };
  buildLog: BuildLogEntry[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  cta: {
    terminalText: string;
    buttonText: string;
    buttonUrl: string;
    imageDark: string;
    imageLight: string;
  };
  footer: {
    brand: string;
    motto: string;
    location: string;
    year: string;
  };
  bot: {
    name: string;
    version: string;
    greeting: string;
    questions: { field: string; question: string }[];
    quickPrompts: { label: string; answer: string }[];
  };
}

export const portfolioData: PortfolioData = {
  profile: {
    name: "GAURAV DEORI",
    firstName: "GAURAV",
    lastName: "DEORI",
    role: "Web Developer | Founder & CEO – PresentIQ, Webro Studios & Theposterzz",
    avatar: "/images/avatar.png",
    eyebrow: "// DEVELOPER   // BUILDER   // STUDENT",
    tagline: "Computer Science Engineering Student at Dibrugarh University Institute of Engineering and Technology (DUIET)",
    subline: "Building products, exploring ideas and turning coffee into code.",
    bioStatement: "I build clean, modern, user-friendly websites through real-world projects and creative leadership.",
    motto: "I build. I break. I learn. I ship.",
    resumeUrl: "https://github.com/Gauravdeori",
    viewWorkAnchor: "#projects",
    location: "DIBRUGARH, ASSAM",
    coordinates: "26.1445° N, 91.7362° E",
    badgeLocation: "DIBRUGARH",
    badgeCountry: "ASSAM, INDIA",
    speechBubbleLines: [
      "IDEAS",
      "CODE",
      "PRODUCTS",
      "COMMUNITY",
      "AND MORE..."
    ],
    heroImageDark: "/images/hero-dark.png",
    heroImageLight: "/images/hero-light.png"
  },
  socials: {
    github: "https://github.com/Gauravdeori",
    linkedin: "https://www.linkedin.com/in/gaurav-deori-759214304",
    instagram: "https://www.instagram.com/_gauravdeori__/?utm_source=ig_web_button_share_sheet",
    x: "https://x.com/gauravdeori",
    email: "deorigaurav1400@gmail.com"
  },
  navigation: [
    { id: "home", number: "[01]", label: "HOME", href: "#home" },
    { id: "about", number: "[02]", label: "ABOUT", href: "#about" },
    { id: "projects", number: "[03]", label: "PROJECTS", href: "#projects" },
    { id: "experience", number: "[04]", label: "EXPERIENCE", href: "#experience" },
    { id: "contact", number: "[05]", label: "CONTACT", href: "#contact" }
  ],
  stats: [
    {
      id: "projects",
      icon: "cube",
      value: "5+",
      label: "Major Projects"
    },
    {
      id: "sales",
      icon: "star",
      value: "80K+",
      label: "theposterzz Sales",
      sublabel: "(in 5+ months)"
    },
    {
      id: "hackathon",
      icon: "trophy",
      value: "1st Place",
      label: "Thigmaminds Hackathon 2026",
      sublabel: "(EcoBin)"
    },
    {
      id: "student",
      icon: "users",
      value: "Student",
      label: "DUIET, Dibrugarh University",
      sublabel: "B.Tech CSE (Sem III)"
    }
  ],
  projects: {
    eyebrow: "// FEATURED PROJECTS",
    title: "PROJECTS",
    subtitle: "Products, hackathon projects and web apps I've built and worked on.",
    viewAllUrl: "#projects",
    items: [
      {
        id: "present-iq",
        title: "Present IQ",
        role: "Founder & CEO",
        description: "Role-based attendance platform with AI routine import, analytics and more.",
        longDescription: "A role-based attendance management SaaS for educational institutions with Admin, Teacher, and Student dashboards, active tracking sessions, and institutional analytics. Funded and incubated by CTII, Dibrugarh University.",
        category: "saas",
        featured: true,
        tags: ["React", "Firebase", "Gemini AI"],
        imageDark: "/images/project-presentiq-dark.png",
        imageLight: "/images/project-presentiq-light.png",
        link: "https://present-iq1.vercel.app/",
        caseStudy: {
          problem: "Attendance in institutions is still manual, slow and easy to manipulate, and the data it produces is rarely used for anything useful.",
          solution: "A connected attendance ecosystem: capture attendance intelligently, store it securely, and turn it into analytics institutions can act on.",
          features: ["Smart attendance", "AI routine import", "Teacher & Student dashboards", "Institutional analytics", "Secure records"]
        }
      },
      {
        id: "waste-wise",
        title: "Waste Wise (EcoBin)",
        role: "Lead Developer",
        description: "Smart waste-management solution using IoT and a real-time dashboard. 1st place at Thigmaminds Hackathon 2026.",
        longDescription: "An IoT-powered food waste monitoring platform for hostels — live weight data from ESP32 + load cell hardware streams to a real-time dashboard with per-hostel analytics, alerts, and CSV reports.",
        category: "iot",
        featured: true,
        tags: ["ESP32", "Thingspeak", "React"],
        imageDark: "/images/project-wastewise-dark.png",
        imageLight: "/images/project-wastewise-light.png",
        link: "https://waste-wise-psi.vercel.app/",
        caseStudy: {
          problem: "Hostels generate tons of unmonitored food waste daily without real-time tracking or accountability.",
          solution: "Hardware load cells connected to ESP32 stream weight measurements to ThingSpeak, rendered on a live web dashboard with actionable reduction alerts.",
          features: ["Real-time hardware telemetry", "Per-hostel metrics", "Threshold alerts", "CSV reporting"]
        }
      },
      {
        id: "theposterzz",
        title: "theposterzz",
        role: "Founder & CEO",
        description: "Poster brand offering premium quality posters. 1L+ revenue in 5-7 months.",
        longDescription: "A creative branding initiative where we design and sell high-quality posters for individuals and student communities. Building visual identities that stand out with ₹80K-1L+ revenue in 5-7 months.",
        category: "ecommerce",
        featured: true,
        tags: ["E-Commerce", "Marketing", "Branding"],
        imageDark: "/images/project-theposterzz-dark.png",
        imageLight: "/images/project-theposterzz-light.png",
        link: "https://theposterzz.in/"
      },
      {
        id: "poba-express",
        title: "Poba Express",
        role: "Developer",
        description: "Food, cake and medicine delivery platform for Jonai, Assam.",
        longDescription: "Hyperlocal delivery platform designed to bring food, cake, and medicine delivery to the town of Jonai, Assam with mobile-first PWA experience.",
        category: "web",
        featured: true,
        tags: ["React", "Firebase", "PWA"],
        imageDark: "/images/project-pobaexpress-dark.png",
        imageLight: "/images/project-pobaexpress-light.png",
        link: "https://pobaexpress.com"
      },
      {
        id: "echoes-of-poba",
        title: "Echoes of Poba",
        role: "Lead Developer",
        description: "NGO website for Poba Reserve Forest with volunteer system.",
        longDescription: "A student-led initiative documenting and showcasing the beauty of the Poba rainforest. Built to raise awareness and inspire conservation with volunteer onboarding.",
        category: "web",
        featured: true,
        tags: ["React", "Email Integration", "NGO"],
        imageDark: "/images/project-echoesofpoba-dark.png",
        imageLight: "/images/project-echoesofpoba-light.png",
        link: "https://echoesofpoba.in/"
      },
      {
        id: "qrshield-ai",
        title: "QRShield AI",
        role: "Developer",
        description: "Cybersecurity tool to scan URLs and detect threats using AI.",
        longDescription: "An AI-powered security tool that scans and detects malicious QR codes, ensuring safer browsing and digital payments by analyzing URL patterns, RDAP/WHOIS records, and threat heuristics.",
        category: "saas",
        featured: true,
        tags: ["Google Gemini", "RDAP/WHOIS", "React"],
        imageDark: "/images/project-qrshield-dark.png",
        imageLight: "/images/project-qrshield-light.png",
        link: "https://qr-shield-ai.vercel.app/"
      },
      // Previous additional projects from profile.json
      {
        id: "tapplay",
        title: "TapPlay Hub",
        role: "Game Developer",
        description: "Addictive mini-games including Tic Tac Toe, Snake, and Memory for quick gaming.",
        longDescription: "A collection of fun, addictive mini-games including Tic Tac Toe, Snake, and Memory, designed for a quick and engaging gaming experience.",
        category: "game",
        featured: false,
        tags: ["React", "Vite", "Tailwind CSS", "Game Dev"],
        imageDark: "/images/project-presentiq-dark.png",
        imageLight: "/images/project-presentiq-light.png",
        link: "https://tapplayhub.vercel.app/"
      },
      {
        id: "attendance-hub",
        title: "AttendanceHub",
        role: "Developer",
        description: "AI-powered attendance tracker for students to manage subject-wise attendance and routine.",
        longDescription: "An advanced AI-powered attendance tracker for students to manage subject-wise attendance and percentage with seamless routine integration.",
        category: "saas",
        featured: false,
        tags: ["React", "Tailwind CSS", "AI/ML", "Vite"],
        imageDark: "/images/project-wastewise-dark.png",
        imageLight: "/images/project-wastewise-light.png",
        link: "https://www.attendancehub.space/"
      },
      {
        id: "amar-adda",
        title: "Amar Adda",
        role: "Developer",
        description: "Modern street food ordering platform bringing traditional tastes to the digital age.",
        longDescription: "A modern street food ordering platform designed to bring traditional tastes to the digital age with a seamless ordering experience.",
        category: "ecommerce",
        featured: false,
        tags: ["React", "Tailwind CSS", "E-commerce", "UI/UX"],
        imageDark: "/images/project-pobaexpress-dark.png",
        imageLight: "/images/project-pobaexpress-light.png",
        link: "https://www.amaaradda.shop/"
      },
      {
        id: "portfolio-v1",
        title: "Personal Portfolio (v1)",
        role: "Developer",
        description: "First milestone portfolio website built from scratch with pure HTML, CSS & JavaScript.",
        longDescription: "My first portfolio website, built from scratch using pure HTML, CSS, and JavaScript. A milestone project that marked my journey into web development.",
        category: "web",
        featured: false,
        tags: ["HTML", "CSS", "JavaScript"],
        imageDark: "/images/hero-dark.png",
        imageLight: "/images/hero-light.png",
        link: "https://www.gauravdeori.online/"
      }
    ]
  },
  about: {
    eyebrow: "// ABOUT ME",
    title: "A BIT ABOUT ME",
    subtitle: "Building the web, one project at a time.",
    philosophyStatement: "I turn ideas into clean, modern, responsive websites — interfaces that feel obvious, code that stays maintainable, and details that quietly do the work.",
    motto: "I build. I break. I learn. I ship.",
    statement: "Code is the tool. Building is the purpose.",
    portraitDark: "/images/about-portrait-dark.png",
    portraitLight: "/images/about-portrait-light.png",
    paragraphs: [
      "I'm Gaurav Deori, a B.Tech CSE student at DUIET, Dibrugarh University. I love building products, working on real-world problems and exploring new technologies.",
      "From web apps to IoT projects, I enjoy turning ideas into useful products. I'm also part of GDG On Campus, work on community events, and run theposterzz."
    ],
    extendedParagraphs: [
      "I'm an aspiring Web Developer focused on crafting clean, modern, and responsive websites. My core stack includes HTML, CSS, JavaScript, React, and Tailwind CSS—tools I use to bring ideas to life.",
      "I believe in learning by doing. Every project is an opportunity to grow, experiment, and push my skills further. From simple landing pages to complex web applications, I approach each challenge with curiosity and determination.",
      "Beyond coding, I'm the Founder of Theposterzz—a creative initiative where we design and sell high-quality posters, social media content, and visual identities for individuals and student communities. This blend of design and development gives me a unique perspective on building user-centric digital experiences."
    ],
    buttonText: "LEARN MORE →",
    buttonUrl: "#experience",
    traits: ["Developer", "Builder", "Product creator", "Technology enthusiast"],
    systemSpecs: [
      { key: "ROLE", value: "DEVELOPER / BUILDER" },
      { key: "FIELD", value: "COMPUTER SCIENCE & ENGINEERING" },
      { key: "FOCUS", value: "SOFTWARE + AI + PRODUCTS" },
      { key: "STATUS", value: "BUILDING & SHIPPING" },
      { key: "LOCATION", value: "ASSAM, INDIA" },
      { key: "COORDS", value: "26.1445° N, 91.7362° E" },
      { key: "SYS", value: "GD-01 / ONLINE" }
    ]
  },
  techStack: {
    eyebrow: "// SKILLS & TOOLKIT",
    title: "TECH STACK",
    subtitle: "Technologies I work with to build real-world projects, from ideas to deployment.",
    items: [
      { name: "React", iconId: "react", category: "Frontend", level: 5, url: "https://react.dev", note: "Component-driven interfaces" },
      { name: "TypeScript", iconId: "typescript", category: "Language", level: 5, url: "https://www.typescriptlang.org", note: "Typed JavaScript for larger codebases" },
      { name: "Firebase", iconId: "firebase", category: "Backend / BaaS", level: 4.5, url: "https://firebase.google.com", note: "Auth, Firestore & Hosting" },
      { name: "Node.js", iconId: "nodejs", category: "Backend", level: 5, url: "https://nodejs.org", note: "Server-side JavaScript APIs" },
      { name: "Python", iconId: "python", category: "Language", level: 5, url: "https://www.python.org", note: "Scripting, Data & AI work" },
      { name: "C / C++", iconId: "cpp", category: "Language", level: 5, url: "https://isocpp.org", note: "Systems fundamentals & DSA" },
      { name: "Java", iconId: "java", category: "Language", level: 5, url: "https://dev.java", note: "Object-oriented programming" },
      { name: "Tailwind CSS", iconId: "tailwind", category: "Frontend", level: 5, url: "https://tailwindcss.com", note: "Utility-first design systems" },
      { name: "MongoDB", iconId: "mongodb", category: "Database", level: 5, url: "https://www.mongodb.com", note: "NoSQL document store" },
      { name: "MySQL", iconId: "mysql", category: "Database", level: 4, url: "https://www.mysql.com", note: "Relational database management" },
      { name: "ESP32 / IoT", iconId: "esp32", category: "Hardware / IoT", level: 4, url: "https://www.espressif.com/en/products/socs/esp32", note: "Embedded sensors & ThingSpeak telemetry" },
      { name: "Git", iconId: "git", category: "Tools", level: 5, url: "https://git-scm.com", note: "Version control discipline" },
      { name: "Figma", iconId: "figma", category: "Design", level: 4, url: "https://www.figma.com", note: "UI/UX wireframes & design assets" },
      { name: "Vercel", iconId: "vercel", category: "Deployment", level: 4, url: "https://vercel.com", note: "Edge deployment & CI/CD" },
      { name: "Linux", iconId: "linux", category: "OS", level: 4, url: "https://www.kernel.org", note: "Shell scripting & server environments" }
    ]
  },
  buildLog: [
    {
      index: "01",
      phase: "LEARNING",
      body: "Started with fundamentals — C, C++, the web, and how systems actually fit together."
    },
    {
      index: "02",
      phase: "BUILDING",
      body: "Moved from exercises to products. Interfaces, backends, and the glue between them."
    },
    {
      index: "03",
      phase: "LAUNCHING",
      body: "Shipped THEPOSTERZZ with my co-founders — brand, website and real customers."
    },
    {
      index: "04",
      phase: "EXPERIMENTING",
      body: "AI and machine learning applied inside products rather than kept in notebooks."
    },
    {
      index: "05",
      phase: "SHIPPING",
      body: "Present IQ and Waste Wise — systems built to solve problems that already exist."
    }
  ],
  experiences: [
    {
      number: "01",
      title: "Founder & CEO",
      company: "PresentIQ",
      period: "2024 – PRESENT",
      description: "Building PresentIQ — a role-based attendance management SaaS platform, funded and incubated by CTII, Dibrugarh University.",
      url: "https://present-iq1.vercel.app/",
      achievements: [
        "Incubated and funded by CTII, Dibrugarh University",
        "Role-based authorization for Admin, Teachers, and Students",
        "AI-assisted timetable and routine import engine"
      ]
    },
    {
      number: "02",
      title: "Founder & CEO",
      company: "Webro Studios",
      period: "2024 – PRESENT",
      description: "Running a web development agency, building high-performance modern websites and digital experiences for clients.",
      url: "https://www.webrostudios.space/",
      achievements: [
        "Delivered full-stack web solutions for commercial clients",
        "Modern responsive design systems using React & Tailwind"
      ]
    },
    {
      number: "03",
      title: "Founder & Lead",
      company: "theposterzz",
      period: "2024 – PRESENT",
      description: "Creative poster brand offering premium quality posters, generating ₹80K-1L+ revenue in 5-7 months through creative branding and community marketing.",
      url: "https://theposterzz.in/",
      achievements: [
        "₹80,000+ to ₹1,00,000+ sales within 5-7 months of launch",
        "Designed and shipped visual identities for student communities"
      ]
    },
    {
      number: "04",
      title: "Freelance Developer & Designer",
      company: "Self-Employed",
      period: "2023 – PRESENT",
      description: "Crafting end-to-end web applications, IoT dashboards, and custom brand visual identities.",
      url: null,
      achievements: [
        "1st Place at Thigmaminds Hackathon 2026 for Waste Wise EcoBin",
        "Active member of GDG (Google Developer Groups) On Campus"
      ]
    },
    {
      number: "05",
      title: "Student Web Developer",
      company: "Independent / DUIET",
      period: "2023 – PRESENT",
      description: "Continuously learning and building real products to master full-stack software and web engineering.",
      url: null,
      achievements: [
        "B.Tech CSE student at Dibrugarh University",
        "Full-Stack Web Bootcamp certified (Dr. Angela Yu, 62 hours)"
      ]
    }
  ],
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering",
      field: "Computer Science",
      institution: "Dibrugarh University Institute of Engineering & Technology (DUIET)",
      period: "2024 – Present (Sem III)",
      focus: "Data Structures, Algorithms, Web Technologies, IoT & System Architecture"
    },
    {
      degree: "Higher Secondary (12th Grade)",
      field: "Science Stream",
      institution: "Jonai Science College",
      period: "Completed",
      focus: "Physics, Chemistry, Mathematics"
    },
    {
      degree: "Secondary School (10th Grade)",
      field: null,
      institution: "Fransalian High School (SFS Jonai)",
      period: "Completed",
      focus: null
    }
  ],
  certifications: [
    {
      title: "The Complete Full-Stack Web Development Bootcamp",
      issuer: "Udemy",
      instructor: "Dr. Angela Yu",
      date: "Jan. 19, 2026",
      duration: "62 Total Hours",
      credentialUrl: "https://ude.my/UC-7f06c9f6-05f4-42de-9ff7-2c3bc43b4a7f",
      image: "/images/udemy-certificate.png"
    }
  ],
  cta: {
    terminalText: "> Let's build something amazing together.",
    buttonText: "✉ GET IN TOUCH",
    buttonUrl: "mailto:deorigaurav1400@gmail.com",
    imageDark: "/images/cta-landscape-dark.png",
    imageLight: "/images/cta-landscape-light.png"
  },
  footer: {
    brand: "GAURAV DEORI",
    motto: "> BUILD · LEARN · IMPACT",
    location: "DIBRUGARH, ASSAM",
    year: "© 2026"
  },
  bot: {
    name: "GAURAV.AI",
    version: "v2.6",
    greeting: "Hey! 👋 I'm Gaurav's Assistant Bot. How can I help you today?",
    questions: [
      { field: "name", question: "Want to share a project idea? Let's start with your name. (Or tap a quick question below 👇)" },
      { field: "email", question: "Nice to meet you! What's your email so Gaurav can reach you?" },
      { field: "project", question: "Awesome! Tell me about the project or work you have in mind 💡" },
      { field: "budget", question: "Got it! Do you have a budget range in mind? (e.g. ₹5k-15k, flexible, etc.)" },
      { field: "timeline", question: "Last one — when do you need this done by? ⏰" }
    ],
    quickPrompts: [
      {
        label: "Who is Gaurav?",
        answer: "Gaurav Deori is a B.Tech CSE student at Dibrugarh University (DUIET). He is the founder of PresentIQ and theposterzz, and won 1st Place at Thigmaminds Hackathon 2026!"
      },
      {
        label: "Top Projects?",
        answer: "His top projects include PresentIQ (AI attendance SaaS funded by CTII), Waste Wise EcoBin (1st place IoT smart bin), theposterzz (e-commerce brand with 80K+ sales), and QRShield AI!"
      },
      {
        label: "Hackathon Win?",
        answer: "Gaurav won 1st Place at the Thigmaminds Hackathon 2026 for 'Waste Wise (EcoBin)', an IoT smart waste-management solution built with ESP32 and React!"
      },
      {
        label: "Can I hire Gaurav?",
        answer: "Yes! Gaurav is open to freelance web development, full-stack projects, and collaborations. You can fill out the questionnaire right here or email deorigaurav1400@gmail.com!"
      }
    ]
  }
};
