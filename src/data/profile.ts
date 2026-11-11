/**
 * Everything about Gaurav lives here. Edit this file to update the site —
 * no UI code needs to change.
 */

export const profile = {
  name: 'Gaurav Deori',
  firstName: 'Gaurav',
  handle: 'gaurav',
  headline: 'Developer · Builder · B.Tech CSE student',
  location: 'Dibrugarh, Assam, India',
  avatar: '/images/avatar.png',
  portrait: { dark: '/images/about-portrait-dark.png', light: '/images/about-portrait-light.png' },
  email: 'deorigaurav1400@gmail.com',
  website: 'https://gauravdeori.in',
  /** Drop a PDF at public/resume.pdf and the Resume app shows it automatically. */
  resumePdf: '/resume.pdf',
  socials: {
    github: 'https://github.com/Gauravdeori',
    linkedin: 'https://www.linkedin.com/in/gaurav-deori-759214304',
    instagram: 'https://www.instagram.com/_gauravdeori__/',
    x: 'https://x.com/gauravdeori',
  },
  intro: [
    "I'm Gaurav Deori, a B.Tech CSE student at DUIET, Dibrugarh University. I love building products, working on real-world problems and exploring new technologies.",
    'From web apps to IoT projects, I enjoy turning ideas into useful products — interfaces that feel obvious, code that stays maintainable, and details that quietly do the work.',
  ],
  motto: 'I build. I break. I learn. I ship.',
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      school: 'DUIET, Dibrugarh University',
      period: '2024 – Present',
      note: 'Data structures, algorithms, web technologies, IoT and system architecture',
    },
    { degree: 'Higher Secondary (Science)', school: 'Jonai Science College', period: 'Completed', note: 'Physics, Chemistry, Mathematics' },
  ],
  roles: [
    { title: 'Founder & Lead Web Developer', org: 'Webro Studios', url: 'https://www.webrostudios.space' },
    { title: 'Founder', org: 'Present IQ', note: 'Incubated under CTII, Dibrugarh University', url: 'https://present-iq1.vercel.app/' },
    { title: 'Team member', org: 'theposterzz', url: 'https://theposterzz.in/' },
    { title: 'Campus Ambassador', org: 'Physics Wallah' },
    { title: 'Marketing Core Team', org: 'GDG On Campus DU' },
  ],
  skills: {
    Languages: ['TypeScript', 'JavaScript', 'Python', 'C / C++', 'Java'],
    Frontend: ['React', 'Tailwind CSS', 'Vite', 'Figma'],
    Backend: ['Node.js', 'Firebase', 'MongoDB', 'MySQL'],
    'IoT & tools': ['ESP32', 'ThingSpeak', 'Git', 'Vercel', 'Linux'],
  } as Record<string, string[]>,
} as const;

export const achievements = [
  {
    id: 'tigmaminds',
    title: '1st Place — TigmaMinds Hackathon',
    detail: 'Won against 18 teams from across Assam with EcoBin, an IoT smart waste bin and live monitoring dashboard.',
    kind: 'hackathon',
    projectId: 'ecobin',
  },
  {
    id: 'clients',
    title: '5+ client projects delivered',
    detail: 'Websites and web apps shipped for real clients through Webro Studios, including Golden Stay.',
    kind: 'work',
  },
  {
    id: 'ctii',
    title: 'Startup incubated at CTII',
    detail: 'Present IQ, an attendance intelligence platform, is incubated under CTII, Dibrugarh University.',
    kind: 'startup',
    projectId: 'present-iq',
  },
  {
    id: 'game-of-codes',
    title: 'Game of Codes — ANAZORI v16.0',
    detail: 'Built Career Setu, a career and skill platform, during the Game of Codes hackathon.',
    kind: 'hackathon',
    projectId: 'career-setu',
  },
  {
    id: 'bootcamp',
    title: 'Full-Stack Web Development Bootcamp',
    detail: 'Completed the 62-hour bootcamp by Dr. Angela Yu on Udemy.',
    kind: 'certificate',
    url: 'https://ude.my/UC-7f06c9f6-05f4-42de-9ff7-2c3bc43b4a7f',
  },
] as const;

export const stats = [
  { value: '1st', label: 'TigmaMinds Hackathon' },
  { value: '5+', label: 'Client projects' },
  { value: '7', label: 'Featured projects' },
  { value: '18', label: 'Teams beaten' },
];

export const webro = {
  name: 'Webro Studios',
  url: 'https://www.webrostudios.space',
  tagline: 'A web development studio building fast, modern websites and digital experiences.',
  founder: 'Founded and led by Gaurav Deori',
  services: [
    { title: 'Business websites', body: 'Responsive, fast-loading sites that present a brand clearly.' },
    { title: 'Web applications', body: 'Dashboards and full-stack apps built with React and modern tooling.' },
    { title: 'UI & design systems', body: 'Clean, consistent interfaces designed in Figma and built in Tailwind.' },
  ],
  clientWork: [
    { title: 'Golden Stay', body: 'Homestay website for a Webro Studios client.', projectId: 'golden-stay' },
    { title: 'theposterzz', body: 'E-commerce storefront for a poster brand.', projectId: 'theposterzz' },
  ],
  stat: '5+ client projects delivered',
};
