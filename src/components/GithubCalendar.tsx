import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';
import profileData from '../data/profile.json';
import FlipText from './FlipText';

const GithubCalendarComponent = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-white">
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
        <h2 className="script-sub mb-12">
          <FlipText text="consistency, one commit at a time" />
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 md:p-10"
        >
          <div className="overflow-x-auto w-full flex justify-center py-2">
            <GitHubCalendar
              username={profileData.githubUsername}
              blockSize={12}
              blockMargin={4}
              fontSize={14}
              colorScheme="light"
              theme={{
                light: ['#f4f4f4', '#b3e0ff', '#66c2ff', '#0099ff', '#0281e0'],
                dark: ['#f4f4f4', '#b3e0ff', '#66c2ff', '#0099ff', '#0281e0'],
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubCalendarComponent;
