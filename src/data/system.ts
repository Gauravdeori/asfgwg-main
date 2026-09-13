/**
 * Supplementary copy carried over from the engineering design.
 *
 * profile.json stays the source of truth for everything about Gaurav
 * (name, links, email, projects). This file only holds the extra copy that
 * design introduced — nothing here overrides profile.json. Where the two
 * disagreed (e.g. a project's role or tech list), profile.json won and the
 * conflicting line was left out.
 */

export const system = {
  shortName: "GD",
  role: "Computer Science Engineer · Developer · Builder",
  tagline: "Building things that should exist.",
  bio: "Computer Science & Engineering student building real products. I work across software, web and AI — turning ideas into systems people can actually use.",
  statement: "Code is the tool. Building is the purpose.",
  motto: "I build. I break. I learn. I ship.",
  location: "Assam, India",
  traits: ["Developer", "Builder", "Product creator", "Technology enthusiast"],
  systemProfile: [
    { key: "ROLE", value: "DEVELOPER / BUILDER" },
    { key: "FIELD", value: "COMPUTER SCIENCE & ENGINEERING" },
    { key: "FOCUS", value: "SOFTWARE + AI + PRODUCTS" },
    { key: "MODE", value: "BUILDING" },
  ],
  readout: [
    { k: "LAT", v: "26.1445" },
    { k: "LON", v: "91.7362" },
    { k: "SYS", v: "GD-01" },
    { k: "PWR", v: "100%" },
  ],
} as const;

const devicon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

export type SkillItem = { name: string; note: string; icon?: string };
export type SkillGroup = { category: string; items: SkillItem[] };

/** Union of both designs' stacks, grouped. */
export const skills: SkillGroup[] = [
  {
    category: "DEVELOPMENT",
    items: [
      { name: "HTML", note: "Structure and semantics", icon: devicon("html5/html5-original.svg") },
      { name: "CSS", note: "Layout, motion, interface craft", icon: devicon("css3/css3-original.svg") },
      { name: "JavaScript", note: "The language I build the web with", icon: devicon("javascript/javascript-original.svg") },
      { name: "TypeScript", note: "Typed JavaScript for larger codebases", icon: devicon("typescript/typescript-original.svg") },
      { name: "React", note: "Component-driven interfaces", icon: devicon("react/react-original.svg") },
      { name: "Next.js", note: "React framework for production sites", icon: devicon("nextjs/nextjs-original.svg") },
      { name: "Tailwind CSS", note: "Utility-first styling", icon: devicon("tailwindcss/tailwindcss-original.svg") },
      { name: "Node.js", note: "Server-side JavaScript", icon: devicon("nodejs/nodejs-original.svg") },
      { name: "Express.js", note: "Minimal web framework for Node APIs", icon: devicon("express/express-original.svg") },
      { name: "MongoDB", note: "Document database", icon: devicon("mongodb/mongodb-original.svg") },
      { name: "Backend", note: "APIs, data and application logic" },
    ],
  },
  {
    category: "PROGRAMMING",
    items: [
      { name: "C", note: "Systems fundamentals", icon: devicon("c/c-original.svg") },
      { name: "C++", note: "Problem solving and DSA", icon: devicon("cplusplus/cplusplus-original.svg") },
      { name: "Python", note: "Scripting, data, AI work", icon: devicon("python/python-original.svg") },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "Artificial Intelligence", note: "Applied AI inside real products" },
      { name: "Machine Learning", note: "Models that make systems smarter" },
    ],
  },
  {
    category: "TOOLS",
    items: [
      { name: "Git", note: "Version control discipline", icon: devicon("git/git-original.svg") },
      { name: "GitHub", note: "Collaboration and shipping", icon: devicon("github/github-original.svg") },
      { name: "VS Code", note: "Where the building happens", icon: devicon("vscode/vscode-original.svg") },
    ],
  },
];

export type LogEntry = { index: string; phase: string; body: string };

export const buildLog: LogEntry[] = [
  {
    index: "01",
    phase: "LEARNING",
    body: "Started with fundamentals — C, C++, the web, and how systems actually fit together.",
  },
  {
    index: "02",
    phase: "BUILDING",
    body: "Moved from exercises to products. Interfaces, backends, and the glue between them.",
  },
  {
    index: "03",
    phase: "LAUNCHING",
    body: "Shipped THEPOSTERZZ with my co-founders — brand, website and real customers.",
  },
  {
    index: "04",
    phase: "EXPERIMENTING",
    body: "AI and machine learning applied inside products rather than kept in notebooks.",
  },
  {
    index: "05",
    phase: "SHIPPING",
    body: "Present IQ and Waste Wise — systems built to solve problems that already exist.",
  },
];

export type Visual = {
  kind: "dashboard" | "system" | "creative" | "code";
  label: string;
  /** node labels for the "system" visual, tile prefix for "creative" */
  tokens?: string[];
};

export type CaseStudyExtra = {
  featured?: boolean;
  subtitle?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  visual: Visual;
};

/** Keyed by project title in profile.json. */
export const caseStudies: Record<string, CaseStudyExtra> = {
  PresentIQ: {
    featured: true,
    subtitle: "Institutional Attendance Intelligence",
    problem:
      "Attendance in institutions is still manual, slow and easy to manipulate, and the data it produces is rarely used for anything useful.",
    solution:
      "A connected attendance ecosystem: capture attendance intelligently, store it securely, and turn it into analytics institutions can act on.",
    features: [
      "Smart attendance",
      "AI / face-recognition capabilities",
      "Attendance analytics",
      "Student management",
      "Faculty management",
      "Institutional dashboard",
      "Secure attendance records",
    ],
    visual: { kind: "dashboard", label: "ATTENDANCE / LIVE" },
  },
  WasteWise: {
    featured: true,
    subtitle: "Technology for smarter waste management",
    visual: { kind: "system", label: "WEIGHT / STREAM", tokens: ["ESP32", "LOAD", "CLOUD", "DASH"] },
  },
  Theposterzz: {
    featured: true,
    subtitle: "Technology × Design × Entrepreneurship",
    problem:
      "Running a creative product brand needs more than good design: it needs a storefront, a brand and an operation behind it.",
    solution:
      "We built the brand and the website ourselves — from idea to product to a site customers actually buy through.",
    features: [
      "Built our own website from scratch",
      "Brand and visual identity",
      "Poster and product design",
      "Team / co-founder operation",
    ],
    visual: { kind: "creative", label: "PRINT / GRID", tokens: ["P"] },
  },
  TapPlay: { visual: { kind: "creative", label: "GAMES / GRID", tokens: ["G"] } },
  AttendanceHub: { visual: { kind: "dashboard", label: "SUBJECTS / TRACK" } },
  "Amar Adda": { visual: { kind: "creative", label: "MENU / GRID", tokens: ["M"] } },
  "QR Shield AI": {
    visual: { kind: "system", label: "SCAN / FLOW", tokens: ["QR", "URL", "SCAN", "SAFE"] },
  },
  "Echoes of Poba": { visual: { kind: "creative", label: "FIELD / NOTES", tokens: ["F"] } },
  "Personal Portfolio (v1)": { visual: { kind: "code", label: "INDEX.HTML" } },
};

export const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "STACK", href: "#stack" },
  { label: "WORK", href: "#projects" },
  { label: "JOURNEY", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];
