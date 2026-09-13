import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowUpRight } from "lucide-react";
import profileData from "../data/profile.json";
import SectionHeading from "./ui-kit/SectionHeading";

const profileUrl = `https://github.com/${profileData.githubUsername}`;

const GithubCalendarComponent = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <section id="github" className="relative scroll-mt-24 overflow-hidden border-t border-border py-28 md:py-40">
      <div className="scanlines absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-frame px-6 md:px-10">
        <SectionHeading
          index="05 / COMMIT LOG"
          title={"COMMIT\nLOG"}
          subtitle="Consistency, one commit at a time."
          status="● LIVE"
        />

        <motion.a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Gaurav's GitHub profile"
          data-cursor="GITHUB"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hud-panel hud-corners lift block p-6 md:p-10"
        >
          <div className="label-mono mb-6 flex items-center justify-between">
            <span>@{profileData.githubUsername} / CONTRIBUTIONS</span>
            <span className="flex items-center gap-1.5 text-foreground">
              OPEN <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
          <div className="flex w-full justify-center overflow-x-auto py-2 font-mono">
            <GitHubCalendar
              username={profileData.githubUsername}
              blockSize={12}
              blockMargin={4}
              blockRadius={0}
              fontSize={12}
              colorScheme={isDark ? "dark" : "light"}
              /* Greyscale ramp: intensity reads as value, never as hue */
              theme={{
                light: ["#ededed", "#c4c4c4", "#8f8f8f", "#525252", "#0a0a0a"],
                dark: ["#141414", "#3a3a3a", "#6b6b6b", "#a8a8a8", "#ffffff"],
              }}
            />
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default GithubCalendarComponent;
