import { useCallback, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import GithubCalendar from "@/components/GithubCalendar";
import Experience from "@/components/Experience";
import BuildLog from "@/components/BuildLog";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollRobot from "@/components/ScrollRobot";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import Ticker from "@/components/Ticker";
import { useMounted } from "@/lib/use-client";

const Index = () => {
  const mounted = useMounted();
  const [, setReady] = useState(false);
  const onLoaded = useCallback(() => setReady(true), []);

  return (
    <div className="grain relative min-h-screen bg-background text-foreground">
      {mounted && <LoadingScreen onDone={onLoaded} />}
      {mounted && <CustomCursor />}
      <ScrollProgress />
      <Navbar />
      <ScrollRobot />

      <main className="relative z-10">
        <Hero />

        <Ticker items={["Full Stack Developer", "Builder", "React", "Node", "AI / ML", "Open to work"]} />

        <Skills />
        <About />
        <TechStack />

        <Ticker items={["Engineering Log", "Built & shipped", "Idea → System → Product"]} variant="outline" reverse />

        <Projects />
        <GithubCalendar />
        <Experience />
        <BuildLog />
        <Education />
        <Certifications />

        <Ticker items={["Let's build something", "Channel open"]} size="lg" />

        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
