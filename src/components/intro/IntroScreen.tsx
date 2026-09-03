import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSequence = [
  "> INITIALIZING SYSTEM KERNEL...",
  "> BYPASSING SECURITY PROTOCOLS...",
  "> LOADING 3D WEBGL ENGINE...",
  "> DECRYPTING UI MODULES...",
];

// Individual Terminal Line Component
const TerminalLine = ({ text, onComplete }: { text: string; onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast interval to increment progress from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment between 3 and 10 for a slower, more realistic loading feel
        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 90); // 90ms interval for slower counting

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Once progress hits 100%, tell the parent component it's done
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 150); // slight pause after reaching 100% before starting next line
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-xs sm:text-sm md:text-base mb-2 flex tracking-wider font-mono w-full"
    >
      <span className="text-indigo-400/80 mr-3">{text}</span>
      {progress < 100 ? (
        <span className="text-indigo-300 font-bold ml-auto">[{progress}%]</span>
      ) : (
        <span className="text-emerald-400 font-bold drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] ml-auto">
          [OK]
        </span>
      )}
    </motion.div>
  );
};

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [accessGranted, setAccessGranted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleLineComplete = () => {
    setCurrentLineIndex((prev) => prev + 1);
  };

  useEffect(() => {
    // If all lines are completed, trigger the final sequence
    if (currentLineIndex === bootSequence.length) {
      const t1 = setTimeout(() => setAccessGranted(true), 400); // Wait a bit, then ACCESS GRANTED
      const t2 = setTimeout(() => setIsExiting(true), 1500); // Start fade out
      const t3 = setTimeout(() => onComplete(), 2100); // Unmount and load website

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [currentLineIndex, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, scale: 1.05, filter: "brightness(3)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col justify-center bg-[#05050a] px-6 sm:px-20 font-mono overflow-hidden"
        >
          {/* Subtle Scanline Overlay for CRT Monitor Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-40" />

          <div className="relative z-20 max-w-4xl w-full mx-auto flex flex-col items-start">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center gap-2"
            >
              <span className="text-3xl md:text-4xl font-extralight text-indigo-500/80">{'<'}</span>
              <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                A
              </span>
              <span className="text-3xl md:text-4xl font-extralight text-indigo-500/80">{'/>'}</span>
            </motion.div>

            {/* Terminal Lines Container - fixed width so percentages align on the right */}
            <div className="w-full max-w-lg">
              {bootSequence.slice(0, currentLineIndex + 1).map((line, idx) => (
                <TerminalLine
                  key={idx}
                  text={line}
                  onComplete={idx === currentLineIndex ? handleLineComplete : () => {}}
                />
              ))}
            </div>

            {/* Access Granted Message */}
            {accessGranted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1] }}
                transition={{ duration: 0.3 }}
                className="mt-6 text-emerald-400 font-bold text-base sm:text-lg md:text-xl drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] tracking-widest font-mono"
              >
                [ ACCESS GRANTED - WELCOME ARTH KUMAR ]
              </motion.div>
            )}

            {/* Blinking Cursor */}
            {!accessGranted && (
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-3 h-5 bg-indigo-400 mt-2"
              />
            )}
          </div>

          {/* CRT Vignette/Shadow */}
          <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
