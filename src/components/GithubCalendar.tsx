import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import profileData from '../data/profile.json';

const GithubCalendarComponent = () => {
  const { resolvedTheme } = useTheme();

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-10 relative overflow-hidden"
        >
          {/* Terminal-style header */}
          <div className="flex items-center gap-2 mb-8 font-mono text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-3 opacity-60">gaurav@portfolio:~$ git log --activity --graph</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold mb-8 text-center">
              GitHub <span className="text-gradient">Contributions</span>
            </h3>
            
            <div className="overflow-x-auto w-full flex justify-center py-4">
              <GitHubCalendar 
                username={profileData.githubUsername}
                blockSize={12}
                blockMargin={4}
                fontSize={14}
                colorScheme={resolvedTheme === 'light' ? 'light' : 'dark'}
                theme={{
                  dark: ['#1e293b', '#1d4ed8', '#3b82f6', '#60a5fa', '#93c5fd'],
                  light: ['#f1f5f9', '#93c5fd', '#60a5fa', '#3b82f6', '#1d4ed8'],
                }}
              />
            </div>
          </div>

          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default GithubCalendarComponent;
