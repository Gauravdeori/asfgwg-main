/**
 * Projects shown in the Projects (File Explorer) app, Start menu search,
 * Terminal and the simple view. Add or edit entries here.
 *
 * screenshots: give `light` too when a project has a light-theme image.
 * links: leave a key out if there's no public URL yet — its button hides.
 */

export type ProjectCategory = 'Web' | 'AI/ML' | 'IoT' | 'Startups';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  /** Tools and topics. */
  tech: string[];
  role?: string;
  highlights?: string[];
  links: { live?: string; github?: string };
  screenshots: { dark: string; light?: string; alt: string }[];
}

export const categories: { id: ProjectCategory; blurb: string }[] = [
  { id: 'Web', blurb: 'Websites and web apps' },
  { id: 'AI/ML', blurb: 'Models and AI-powered tools' },
  { id: 'IoT', blurb: 'Hardware meets software' },
  { id: 'Startups', blurb: 'Products and ventures' },
];

export const projects: Project[] = [
  {
    id: 'ecobin',
    title: 'EcoBin',
    tagline: 'IoT smart waste bin + live monitoring dashboard',
    description:
      'An IoT-powered food waste monitoring system for hostels. Load-cell hardware on an ESP32 streams live weight data to ThingSpeak, and a React dashboard turns it into per-hostel analytics, alerts and CSV reports.',
    categories: ['IoT'],
    tech: ['ESP32', 'Load cell', 'ThingSpeak', 'React'],
    role: 'Lead Developer',
    highlights: [
      '1st place at TigmaMinds Hackathon (18 teams across Assam)',
      'Real-time hardware telemetry',
      'Per-hostel metrics and threshold alerts',
      'CSV reporting',
    ],
    links: { live: 'https://waste-wise-psi.vercel.app/' },
    screenshots: [
      { dark: '/images/project-wastewise-dark.png', light: '/images/project-wastewise-light.png', alt: 'EcoBin illustration' },
    ],
  },
  {
    id: 'taxofusion',
    title: 'TaxoFusion',
    tagline: 'Fine-grained skin lesion classification',
    description:
      'A multi-branch fusion architecture for fine-grained skin lesion classification — combining what several network branches learn to tell apart lesion types that look very similar.',
    categories: ['AI/ML'],
    tech: ['Deep learning', 'Computer vision', 'Image classification'],
    links: {},
    screenshots: [],
  },
  {
    id: 'routineai',
    title: 'RoutineAI',
    tagline: 'AI-powered to-do app with brain-dump input',
    description:
      'A to-do app where you brain-dump everything on your mind in plain words and AI turns it into an organised task list.',
    categories: ['AI/ML', 'Web'],
    tech: ['AI', 'Web app', 'Productivity'],
    links: {},
    screenshots: [],
  },
  {
    id: 'career-setu',
    title: 'Career Setu',
    tagline: 'Career & skill platform — Game of Codes (ANAZORI v16.0)',
    description:
      'A career and skill platform built during the Game of Codes hackathon at ANAZORI v16.0, helping students map skills to career paths.',
    categories: ['Web'],
    tech: ['Web app', 'Hackathon'],
    links: {},
    screenshots: [],
  },
  {
    id: 'theposterzz',
    title: 'theposterzz',
    tagline: 'E-commerce website for a poster brand',
    description:
      'The online storefront for theposterzz, a poster brand designing and selling premium posters for individuals and student communities.',
    categories: ['Web', 'Startups'],
    tech: ['E-commerce', 'Branding', 'Marketing'],
    role: 'Team',
    highlights: ['₹80K–1L+ in sales within 5–7 months of launch'],
    links: { live: 'https://theposterzz.in/' },
    screenshots: [
      { dark: '/images/project-theposterzz-dark.png', light: '/images/project-theposterzz-light.png', alt: 'theposterzz illustration' },
    ],
  },
  {
    id: 'golden-stay',
    title: 'Golden Stay',
    tagline: 'Homestay website for a Webro Studios client',
    description: 'A website for Golden Stay, a homestay, designed and built by Webro Studios for a client.',
    categories: ['Web'],
    tech: ['Website', 'Client project', 'Responsive design'],
    role: 'Webro Studios',
    links: {},
    screenshots: [],
  },
  {
    id: 'present-iq',
    title: 'Present IQ',
    tagline: 'Attendance intelligence startup — incubated under CTII',
    description:
      'A role-based attendance management SaaS for educational institutions with Admin, Teacher and Student dashboards, active tracking sessions, AI routine import and institutional analytics. Incubated under CTII, Dibrugarh University.',
    categories: ['Startups', 'Web'],
    tech: ['React', 'Firebase', 'Gemini AI'],
    role: 'Founder',
    highlights: ['Incubated under CTII, Dibrugarh University', 'AI routine import', 'Teacher & Student dashboards', 'Institutional analytics'],
    links: { live: 'https://present-iq1.vercel.app/' },
    screenshots: [
      { dark: '/images/project-presentiq-dark.png', light: '/images/project-presentiq-light.png', alt: 'Present IQ illustration' },
    ],
  },
];

export const findProject = (id: string) => projects.find((p) => p.id === id);
