import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'logo' | 'text' | 'exit'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 800);
    const t2 = setTimeout(() => setPhase('exit'), 2400);
    const t3 = setTimeout(() => onComplete(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? null : null}
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        animate={phase === 'exit' ? { opacity: 0, scale: 1.1 } : { opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950">
          {/* Animated mesh overlay */}
          <motion.div
            animate={{
              background: [
                'radial-gradient(ellipse 600px 600px at 30% 40%, rgba(99,102,241,0.15) 0%, transparent 70%)',
                'radial-gradient(ellipse 600px 600px at 70% 60%, rgba(139,92,246,0.2) 0%, transparent 70%)',
                'radial-gradient(ellipse 600px 600px at 40% 70%, rgba(99,102,241,0.15) 0%, transparent 70%)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          />
        </div>

        {/* Glowing particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${165 + Math.random() * 90}, ${130 + Math.random() * 80}, 255, ${0.3 + Math.random() * 0.5})`,
              boxShadow: `0 0 ${6 + Math.random() * 10}px rgba(139,92,246,0.4)`,
            }}
            animate={{
              y: [0, -30 - Math.random() * 40, 0],
              x: [0, (Math.random() - 0.5) * 40, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Core glow ring behind logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.6, 0.3] }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Logo mark — animated brackets */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex items-center justify-center gap-2"
          >
            <motion.span
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl md:text-6xl font-extralight text-indigo-400/80"
            >
              {'<'}
            </motion.span>
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              A
            </motion.span>
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl md:text-6xl font-extralight text-indigo-400/80"
            >
              {'/>'}
            </motion.span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={phase === 'text' || phase === 'exit' ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl font-bold text-white/90 tracking-wide mb-2"
          >
            Arth Kumar
          </motion.h1>

          {/* Role tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={phase === 'text' || phase === 'exit' ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm md:text-base text-indigo-300/70 tracking-[0.3em] uppercase font-light"
          >
            Full Stack Developer
          </motion.p>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase === 'text' || phase === 'exit' ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-8 mx-auto w-48 h-[2px] bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
