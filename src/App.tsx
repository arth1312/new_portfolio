import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import ProgressBar from '@/components/ui/ProgressBar';
import CustomCursor from '@/components/ui/CustomCursor';
import Terminal from '@/components/terminal/Terminal';
import IntroScreen from '@/components/intro/IntroScreen';
import Navbar from '@/components/navbar/Navbar';
import Hero from '@/components/hero/Hero';
import Stats from '@/components/stats/Stats';
import About from '@/components/about/About';
import Timeline from '@/components/timeline/Timeline';
import Skills from '@/components/skills/Skills';
import Projects from '@/components/projects/Projects';
import Contact from '@/components/contact/Contact';
import Footer from '@/components/footer/Footer';
import BackToTop from '@/components/BackToTop';

function MainApp() {
  const [showIntro, setShowIntro] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <>
      <ProgressBar />
      <CustomCursor enabled={true} />

      <AnimatePresence>
        {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 relative selection:bg-indigo-500 selection:text-white transition-colors duration-300"
      >
        <Navbar
          onOpenTerminal={() => setTerminalOpen(true)}
        />
        <main>
          <Hero onOpenTerminal={() => setTerminalOpen(true)} />
          <Stats />
          <About />
          <Timeline />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </motion.div>

      {/* Developer CLI Terminal Modal */}
      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
