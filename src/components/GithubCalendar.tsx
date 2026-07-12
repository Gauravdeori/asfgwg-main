import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { ArrowUpRight } from 'lucide-react';
import profileData from '../data/profile.json';
import FlipText from './FlipText';

const profileUrl = `https://github.com/${profileData.githubUsername}`;

const GithubCalendarComponent = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          GitHub Activity
        </motion.p>
        <h2 className="script-sub mb-4">
          <FlipText text="consistency, one commit at a time" />
        </h2>
        <motion.a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors mb-12 font-mono text-xs uppercase tracking-[0.2em]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          @{profileData.githubUsername} on GitHub
          <ArrowUpRight size={13} />
        </motion.a>

        <motion.a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Gaurav's GitHub profile"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card block p-8 md:p-10 hover:border-primary/40 transition-colors"
        >
          <div className="overflow-x-auto w-full flex justify-center py-2">
            <GitHubCalendar
              username={profileData.githubUsername}
              blockSize={12}
              blockMargin={4}
              fontSize={14}
              colorScheme={isDark ? 'dark' : 'light'}
              theme={{
                light: ['#eef0f2', '#b3e0ff', '#66c2ff', '#0099ff', '#0281e0'],
                dark: ['#1a2130', '#12496b', '#0a6fb0', '#0099ff', '#4db8ff'],
              }}
            />
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default GithubCalendarComponent;
