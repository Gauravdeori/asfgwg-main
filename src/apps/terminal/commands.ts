import { apps, type AppId } from '../meta';
import { achievements, profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { accents } from '../../lib/appearance';
import { useSettings } from '../../store/settingsStore';
import { openApp, useWindowStore } from '../../store/windowStore';

/** One printed line. `tone` picks the colour. */
export interface Line {
  text: string;
  tone?: 'out' | 'muted' | 'accent' | 'error' | 'success';
}

export interface CommandContext {
  print: (lines: Line[] | string) => void;
  clear: () => void;
  /** Print lines one after another with a delay (for the easter egg). */
  printSlowly: (lines: Line[], ms?: number) => Promise<void>;
}

type Command = { desc: string; usage?: string; run: (args: string[], ctx: CommandContext) => void | Promise<void> };

const bootTime = Date.now();

/** Friendly names → app ids for `open <app>` */
const appAliases: Record<string, AppId> = {
  about: 'about',
  me: 'about',
  projects: 'projects',
  explorer: 'projects',
  webro: 'webro',
  'webro-studios': 'webro',
  browser: 'webro',
  achievements: 'achievements',
  awards: 'achievements',
  resume: 'resume',
  cv: 'resume',
  terminal: 'terminal',
  mail: 'mail',
  contact: 'mail',
  settings: 'settings',
  notes: 'notes',
  snake: 'snake',
  game: 'snake',
  'about-os': 'aboutos',
};

const uptime = () => {
  const s = Math.floor((Date.now() - bootTime) / 1000);
  const m = Math.floor(s / 60);
  return m ? `${m} min ${s % 60} sec` : `${s} sec`;
};

const LOGO = ['   ██████╗ ', '  ██╔════╝ ', '  ██║  ███╗', '  ██║   ██║', '  ╚██████╔╝', '   ╚═════╝ '];

export const commands: Record<string, Command> = {
  help: {
    desc: 'List available commands',
    run: (_, { print }) => {
      print([
        { text: 'Available commands:', tone: 'accent' },
        ...Object.entries(commands).map(([name, c]) => ({ text: `  ${(c.usage ?? name).padEnd(22)} ${c.desc}` })),
        { text: '' },
        { text: 'Tip: ↑/↓ browse history · Tab autocompletes · Ctrl+L clears', tone: 'muted' },
      ]);
    },
  },
  whoami: {
    desc: 'Who is Gaurav?',
    run: (_, { print }) => print([{ text: `${profile.name} — ${profile.headline}` }, { text: profile.location, tone: 'muted' }]),
  },
  about: {
    desc: 'A short bio',
    run: (_, { print }) => print([...profile.intro.map((t) => ({ text: t })), { text: `“${profile.motto}”`, tone: 'accent' }]),
  },
  projects: {
    desc: 'List projects (open <id> for details)',
    run: (_, { print }) =>
      print([
        ...projects.map((p) => ({ text: `  ${p.id.padEnd(14)} ${p.title} — ${p.tagline}` })),
        { text: '' },
        { text: 'Try: open ecobin', tone: 'muted' },
      ]),
  },
  skills: {
    desc: 'Tech I work with',
    run: (_, { print }) => print(Object.entries(profile.skills).map(([g, items]) => ({ text: `  ${g.padEnd(13)} ${items.join(', ')}` }))),
  },
  achievements: {
    desc: 'Wins and milestones',
    run: (_, { print }) => print(achievements.map((a) => ({ text: `  ★ ${a.title}` }))),
  },
  contact: {
    desc: 'How to reach Gaurav',
    run: (_, { print }) =>
      print([
        { text: `  email     ${profile.email}` },
        { text: `  github    ${profile.socials.github}` },
        { text: `  linkedin  ${profile.socials.linkedin}` },
        { text: `  website   ${profile.website}` },
        { text: '' },
        { text: 'Or run: open mail', tone: 'muted' },
      ]),
  },
  open: {
    desc: 'Open an app or a project',
    usage: 'open <app|project>',
    run: ([target], { print }) => {
      if (!target) return print([{ text: `usage: open <app|project>. Apps: ${Object.keys(apps).filter((k) => k !== 'aboutos').join(', ')}`, tone: 'error' }]);
      const key = target.toLowerCase();
      const appId = appAliases[key];
      if (appId) {
        openApp(appId);
        return print([{ text: `Opening ${apps[appId].title}…`, tone: 'success' }]);
      }
      const project = projects.find((p) => p.id === key || p.title.toLowerCase() === key);
      if (project) {
        openApp('projects', { projectId: project.id });
        return print([{ text: `Opening ${project.title} in Projects…`, tone: 'success' }]);
      }
      print([{ text: `open: no app or project named "${target}"`, tone: 'error' }]);
    },
  },
  theme: {
    desc: 'Switch theme',
    usage: 'theme dark|light',
    run: ([mode], { print }) => {
      const s = useSettings.getState();
      if (mode !== 'dark' && mode !== 'light') return print([{ text: `Current theme: ${s.theme}. Usage: theme dark|light`, tone: 'muted' }]);
      s.setTheme(mode);
      print([{ text: `Theme set to ${mode}.`, tone: 'success' }]);
    },
  },
  neofetch: {
    desc: 'System info',
    run: (_, { print }) => {
      const s = useSettings.getState();
      const info = [
        `${profile.handle}@gauravos`,
        '─'.repeat(18),
        `OS:        GauravOS 1.0`,
        `Host:      ${profile.location}`,
        `Uptime:    ${uptime()}`,
        `Shell:     gsh 1.0`,
        `Theme:     ${s.theme} · ${accents[s.accent].label}`,
        `Projects:  ${projects.length}`,
        `Wins:      1st @ TigmaMinds`,
        `Stack:     React · TypeScript · Node`,
      ];
      print(info.map((t, i) => ({ text: `${(LOGO[i] ?? ' '.repeat(LOGO[0].length)).padEnd(13)} ${t}`, tone: i === 0 ? 'accent' : 'out' })));
    },
  },
  ls: {
    desc: 'List apps',
    run: (_, { print }) => print([{ text: Object.values(apps).map((a) => `${a.id}.app`).join('   ') }]),
  },
  echo: { desc: 'Print text', usage: 'echo <text>', run: (args, { print }) => print(args.join(' ')) },
  date: { desc: 'Current date & time', run: (_, { print }) => print(new Date().toString()) },
  clear: { desc: 'Clear the screen', run: (_, { clear }) => clear() },
  exit: { desc: 'Close the terminal', run: () => useWindowStore.getState().close('terminal') },
  sudo: {
    desc: 'Try it: sudo hire-gaurav',
    usage: 'sudo hire-gaurav',
    run: async ([what], { print, printSlowly }) => {
      if (what !== 'hire-gaurav') {
        return print([{ text: `${profile.handle} is not in the sudoers file. This incident will be reported. 😄`, tone: 'error' }]);
      }
      await printSlowly([
        { text: '[sudo] password for recruiter: ********', tone: 'muted' },
        { text: 'Verifying recruiter credentials… ok', tone: 'out' },
        { text: 'Checking skills: React ✓  TypeScript ✓  IoT ✓  Shipping ✓', tone: 'out' },
        { text: 'Checking hackathon record… 1st place found ✓', tone: 'out' },
        { text: '✔ Permission granted. Excellent decision.', tone: 'success' },
        { text: 'Opening Mail to start the conversation…', tone: 'accent' },
      ]);
      openApp('mail', { subject: "Let's work together" });
    },
  },
};

/** Tab completion: commands first, then the argument for open/theme/sudo. */
export function complete(input: string): string[] {
  const parts = input.split(/\s+/);
  if (parts.length <= 1) return Object.keys(commands).filter((c) => c.startsWith(parts[0] ?? ''));
  const [cmd, arg = ''] = parts;
  const pool =
    cmd === 'open'
      ? [...Object.keys(appAliases), ...projects.map((p) => p.id)]
      : cmd === 'theme'
        ? ['dark', 'light']
        : cmd === 'sudo'
          ? ['hire-gaurav']
          : [];
  return pool.filter((o) => o.startsWith(arg.toLowerCase())).map((o) => `${cmd} ${o}`);
}
