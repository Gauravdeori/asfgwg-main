import GitHubCalendar from 'react-github-calendar';
import { motion } from 'framer-motion';
import profileData from '../data/profile.json';

const GithubCalendarComponent = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 relative overflow-hidden"
        >
          {/* Terminal-style header */}
          <div className="flex items-center gap-2 mb-8 font-mono text-sm text-primary/60">
            <span className="w-3 h-3 rounded-full bg-red-500/50" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <span className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="ml-2">gaurav@portfolio:~$ git log --activity --graph</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              GitHub Contributions
            </h3>
            
            <div className="overflow-x-auto w-full flex justify-center py-4">
              <GitHubCalendar 
                username={profileData.githubUsername}
                blockSize={12}
                blockMargin={4}
                fontSize={14}
                theme={{
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                }}
              />
            </div>
          </div>

          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default GithubCalendarComponent;
