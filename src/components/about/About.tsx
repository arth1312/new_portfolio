import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GraduationCap, Code2, Rocket, Sparkles, Building2 } from 'lucide-react';

const highlights = [
  {
    icon: Building2,
    title: 'Experience',
    description: 'Internship at EVAAN SOFTTECH on Enterprise POS System',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Diploma in Computer Engineering from UKA Tarsadia University',
  },
  {
    icon: Code2,
    title: 'Full Stack',
    description: 'Next.js, TypeScript, .NET Web API, MSSQL & React',
  },
  {
    icon: Rocket,
    title: 'Goal',
    description: 'Building high-performance, scalable web applications',
  },
];

function AboutCard({ item, index, isInView }: { item: typeof highlights[0]; index: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className="p-6 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-indigo-500/20 hover:border-indigo-500/50 shadow-xl hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300 group cursor-default"
    >
      <div className="w-11 h-11 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300">
        <item.icon className="w-5 h-5 text-indigo-400 group-hover:text-white transition-colors" />
      </div>
      <h3 className="font-extrabold text-white mb-1.5 text-base tracking-tight">
        {item.title}
      </h3>
      <p className="text-gray-400 text-xs leading-relaxed font-normal">
        {item.description}
      </p>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden bg-slate-950 text-white">
      {/* Ambient background light */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-widest mb-3">
            <Sparkles size={14} /> Profile Overview
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            About{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Arth Kumar
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Main Glass Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-indigo-500/20 shadow-2xl shadow-indigo-500/5">
              <p className="text-gray-300 leading-relaxed mb-5 text-base sm:text-lg">
                Hello! I'm{' '}
                <span className="font-bold text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Arth Kumar Hiteshbhai Koradiya
                </span>
                , a passionate Full Stack Developer with hands-on experience building enterprise web applications.
              </p>

              <p className="text-gray-300 leading-relaxed mb-5 text-base sm:text-lg">
                During my internship at{' '}
                <span className="font-bold text-indigo-400">
                  EVAAN SOFTTECH
                </span>
                , I contributed to an enterprise{' '}
                <span className="font-bold text-purple-400">
                  Point of Sale (POS) System
                </span>{' '}
                using{' '}
                <span className="font-bold text-pink-400">
                  Next.js, TypeScript, .NET Web API, and MSSQL
                </span>
                , developing 20+ business modules including Kitchen/Delivery Pipelines, Inventory, and Analytics.
              </p>

              <p className="text-gray-400 leading-relaxed text-sm">
                I hold a Diploma in Computer Engineering from UKA Tarsadia University and Full Stack training from Red & White Education. I love crafting clean code, high-performance APIs, and futuristic UI designs.
              </p>
            </div>
          </motion.div>

          {/* 3D Highlight Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <AboutCard key={item.title} item={item} index={index} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
