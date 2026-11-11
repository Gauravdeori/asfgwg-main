import {
  User,
  FolderOpen,
  Globe,
  Trophy,
  FileText,
  SquareTerminal,
  Mail,
  Settings,
  StickyNote,
  Gamepad2,
  Info,
  type LucideIcon,
} from 'lucide-react';

/**
 * Plain metadata for every app (no components, so the stores can import it
 * without pulling app code into the main bundle).
 */
export type AppId =
  | 'about'
  | 'projects'
  | 'webro'
  | 'achievements'
  | 'resume'
  | 'terminal'
  | 'mail'
  | 'settings'
  | 'notes'
  | 'snake'
  | 'aboutos';

export interface AppMeta {
  id: AppId;
  title: string;
  /** Short label under desktop / home-screen icons */
  label: string;
  icon: LucideIcon;
  size: { w: number; h: number };
  /** Shown on the desktop and pinned to the taskbar */
  desktop: boolean;
  keywords: string;
}

export const apps: Record<AppId, AppMeta> = {
  about: { id: 'about', title: 'About Me', label: 'About Me', icon: User, size: { w: 860, h: 620 }, desktop: true, keywords: 'profile bio education roles skills' },
  projects: { id: 'projects', title: 'Projects', label: 'Projects', icon: FolderOpen, size: { w: 980, h: 640 }, desktop: true, keywords: 'files explorer work portfolio' },
  webro: { id: 'webro', title: 'Webro Studios', label: 'Webro Studios', icon: Globe, size: { w: 980, h: 660 }, desktop: true, keywords: 'agency browser clients services' },
  achievements: { id: 'achievements', title: 'Achievements', label: 'Achievements', icon: Trophy, size: { w: 780, h: 580 }, desktop: true, keywords: 'awards hackathon wins' },
  resume: { id: 'resume', title: 'Resume.pdf', label: 'Resume', icon: FileText, size: { w: 820, h: 720 }, desktop: true, keywords: 'cv pdf download' },
  terminal: { id: 'terminal', title: 'Terminal', label: 'Terminal', icon: SquareTerminal, size: { w: 740, h: 480 }, desktop: true, keywords: 'shell command line cli' },
  mail: { id: 'mail', title: 'Mail', label: 'Mail', icon: Mail, size: { w: 800, h: 580 }, desktop: true, keywords: 'contact email message hire' },
  settings: { id: 'settings', title: 'Settings', label: 'Settings', icon: Settings, size: { w: 780, h: 560 }, desktop: true, keywords: 'wallpaper theme accent dark light' },
  notes: { id: 'notes', title: 'Notes', label: 'Notes', icon: StickyNote, size: { w: 700, h: 480 }, desktop: true, keywords: 'notepad text welcome' },
  snake: { id: 'snake', title: 'Snake', label: 'Snake', icon: Gamepad2, size: { w: 460, h: 600 }, desktop: true, keywords: 'game play fun' },
  aboutos: { id: 'aboutos', title: 'About GauravOS', label: 'About GauravOS', icon: Info, size: { w: 480, h: 520 }, desktop: false, keywords: 'version system shortcuts' },
};

export const appList = Object.values(apps);
export const desktopApps = appList.filter((a) => a.desktop);
