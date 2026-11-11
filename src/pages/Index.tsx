import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import Projects from '../components/Projects';
import About from '../components/About';
import TechStack from '../components/TechStack';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import Ticker from '../components/Ticker';
import GithubCommitLog from '../components/GithubCommitLog';
import RetroFx from '../components/retro/RetroFx';
import { TitleBar } from '../components/retro/Window';
import DesktopIcons from '../components/retro/DesktopIcons';

const SECTION_IDS = ['home', 'about', 'projects', 'experience', 'contact'];

export const Index: React.FC = () => {
  // Support section-wise mode by default, or all-in-one view mode
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [viewMode, setViewMode] = useState<'section' | 'all'>('section');

  // Handle URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'all') {
        setViewMode('all');
      } else if (SECTION_IDS.includes(hash)) {
        setCurrentSection(hash);
        setViewMode('section');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    setViewMode('section');
    window.history.pushState(null, '', `#${sectionId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleViewMode = () => {
    const nextMode = viewMode === 'all' ? 'section' : 'all';
    setViewMode(nextMode);
    window.history.pushState(null, '', nextMode === 'all' ? '#all' : `#${currentSection}`);
  };

  // Next / Prev section helpers
  const currentIndex = SECTION_IDS.indexOf(currentSection);
  const prevSection = currentIndex > 0 ? SECTION_IDS[currentIndex - 1] : null;
  const nextSection = currentIndex < SECTION_IDS.length - 1 ? SECTION_IDS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-accent selection:text-accent-ink flex flex-col relative pb-[54px]">
      <RetroFx />

      {/* 1. Navbar with Section-Wise Controls */}
      <Navbar
        currentSection={currentSection}
        onSelectSection={handleSelectSection}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* VIEW MODE 1: SECTION-WISE VIEW (TAP AND IT SHOWS THAT PART) */}
        {viewMode === 'section' ? (
          <div key={currentSection} className="animate-in fade-in slide-in-from-bottom-2 duration-250 pt-4 sm:pt-6">
            {/* Section 1: Home */}
            {currentSection === 'home' && (
              <div className="space-y-4 sm:space-y-6">
                <DesktopIcons onOpenSection={handleSelectSection} />
                <Hero />
                <Ticker
                  items={[
                    'FULL STACK DEVELOPER',
                    'PRODUCT BUILDER',
                    'REACT & TYPESCRIPT',
                    'AI / ML & IOT',
                    'FOUNDER OF PRESENTIQ & THEPOSTERZZ',
                    'OPEN TO WORK',
                  ]}
                />
                <StatsBar />
              </div>
            )}

            {/* Section 2: About */}
            {currentSection === 'about' && (
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                <div className="win">
                  <TitleBar title="ABOUT_ME.TXT" icon="file" />
                  <div className="p-4 sm:p-8 lg:p-10">
                    <About />
                  </div>
                </div>
              </div>
            )}

            {/* Section 3: Projects */}
            {currentSection === 'projects' && (
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                <div className="win">
                  <TitleBar title="C:\GD\PROJECTS" icon="folder" />
                  <div className="py-4 sm:py-6">
                    <Projects />
                  </div>
                </div>
              </div>
            )}

            {/* Section 4: Experience & Skills */}
            {currentSection === 'experience' && (
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                <div className="win">
                  <TitleBar title="EXPERIENCE.LOG" icon="folder" />
                  <div className="p-4 sm:p-8 lg:p-10">
                    <TechStack />
                  </div>
                </div>
              </div>
            )}

            {/* Section 5: Contact */}
            {currentSection === 'contact' && (
              <div className="space-y-4 sm:space-y-6">
                <Ticker
                  items={[
                    "LET'S BUILD SOMETHING AMAZING",
                    'DIRECT TERMINAL OPEN',
                    'DIBRUGARH, ASSAM',
                    'INITIATE TRANSMISSION',
                  ]}
                  variant="outline"
                />
                <CTA />
              </div>
            )}

            {/* Section-Wise Pager Bar: indicator on its own row below lg, prev/next side by side below */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-6 sm:mt-8">
              <div className="win">
              <TitleBar title="Portfolio Tour" icon="sparkle" />
              <div className="p-3 sm:p-4 grid grid-cols-2 gap-2.5 lg:flex lg:items-center lg:justify-between lg:gap-3 text-xs font-mono">
                <div className="col-span-2 lg:order-2 flex items-center justify-center gap-2 whitespace-nowrap">
                  <span className="text-text-muted hidden sm:inline">SECTION:</span>
                  <span className="font-bold text-accent">
                    [0{currentIndex + 1}] {currentSection.toUpperCase()}
                  </span>
                  <span className="text-text-muted/60">/ 05</span>
                  <span className="text-border-strong mx-1">|</span>
                  <button
                    onClick={handleToggleViewMode}
                    className="text-text-muted hover:text-text underline cursor-pointer"
                  >
                    VIEW ALL<span className="hidden sm:inline"> AT ONCE</span>
                  </button>
                </div>

                <div className="lg:order-1 flex">
                  {prevSection ? (
                    <button
                      onClick={() => handleSelectSection(prevSection)}
                      className="pixel-btn-outline w-full lg:w-auto px-3 py-2 sm:py-1.5 font-bold tracking-wider hover:border-border-strong cursor-pointer whitespace-nowrap"
                    >
                      &lt; Back<span className="hidden sm:inline">: {prevSection.toUpperCase()}</span>
                    </button>
                  ) : (
                    <span className="w-full text-center lg:text-left text-text-muted/50 px-3 py-2 sm:py-1.5 whitespace-nowrap">— FIRST SECTION —</span>
                  )}
                </div>

                <div className="lg:order-3 flex justify-end">
                  {nextSection ? (
                    <button
                      onClick={() => handleSelectSection(nextSection)}
                      className="pixel-btn-primary w-full lg:w-auto px-3 py-2 sm:py-1.5 font-bold tracking-wider cursor-pointer whitespace-nowrap"
                    >
                      Next<span className="hidden sm:inline">: {nextSection.toUpperCase()}</span> &gt;
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSelectSection('home')}
                      className="pixel-btn-primary w-full lg:w-auto px-3 py-2 sm:py-1.5 font-bold tracking-wider cursor-pointer whitespace-nowrap"
                    >
                      ↺ BACK TO HOME
                    </button>
                  )}
                </div>
              </div>
              </div>
            </div>
          </div>
        ) : (
          /* VIEW MODE 2: CONTINUOUS ALL SECTIONS (AS IN SCREENSHOT) */
          <div className="animate-in fade-in duration-200 pt-4 sm:pt-6 space-y-8 sm:space-y-12">
            <DesktopIcons onOpenSection={handleSelectSection} />

            {/* 2. Hero */}
            <Hero />

            {/* Marquee Ticker 1 */}
            <Ticker
              items={[
                'FULL STACK DEVELOPER',
                'PRODUCT BUILDER',
                'REACT & TYPESCRIPT',
                'AI / ML & IOT',
                'FOUNDER OF PRESENTIQ & THEPOSTERZZ',
                'OPEN TO WORK',
              ]}
            />

            {/* 3. Stats Bar */}
            <StatsBar />

            {/* 4. Featured & All Projects */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="win">
                <TitleBar title="C:\GD\PROJECTS" icon="folder" />
                <div className="py-4 sm:py-6">
                  <Projects />
                </div>
              </div>
            </div>

            {/* Marquee Ticker 2 */}
            <Ticker
              items={[
                'ENGINEERING LOG',
                '10+ PROJECTS SHIPPED',
                'IDEA → SYSTEM → PRODUCT',
                '1ST PLACE THIGMAMINDS HACKATHON',
                'LIVE IN PRODUCTION',
              ]}
              variant="outline"
              reverse
            />

            {/* 5. About + Tech Stack (Two columns matching reference layout) */}
            <section id="about" className="px-4 sm:px-6">
              <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
                <div className="lg:col-span-6 win">
                  <TitleBar title="ABOUT_ME.TXT" icon="file" />
                  <div className="p-4 sm:p-6">
                    <About />
                  </div>
                </div>
                <div id="experience" className="lg:col-span-6 win">
                  <TitleBar title="EXPERIENCE.LOG" icon="folder" />
                  <div className="p-4 sm:p-6">
                    <TechStack compact />
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Live GitHub Contributions Stream */}
            <section className="px-4 sm:px-6">
              <div className="max-w-[1200px] mx-auto">
                <GithubCommitLog />
              </div>
            </section>

            {/* Marquee Ticker 3 */}
            <Ticker
              items={[
                "LET'S BUILD SOMETHING AMAZING",
                'CHANNEL OPEN',
                'DIBRUGARH, ASSAM',
                'INITIATE TRANSMISSION',
              ]}
            />

            {/* 7. CTA Banner & Direct Terminal Transmission */}
            <CTA />
          </div>
        )}
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* 9. Refined Assistant Bot (Persistent in Bottom Right) */}
      <ChatBot />
    </div>
  );
};

export default Index;
