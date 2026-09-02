import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code, FolderGit2, Clock, CheckCircle2 } from 'lucide-react';

const stats = [
  {
    icon: FolderGit2,
    value: '5+',
    label: 'Enterprise & Web Projects',
    description: 'POS System, Blinkit Clone, Agency Apps',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: Clock,
    value: '500+',
    label: 'Hours Coded & Training',
    description: 'EVAAN SOFTTECH Internship & Bootcamp',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: Code,
    value: '12+',
    label: 'Modern Tech Tools',
    description: 'Next.js, TS, .NET API, MSSQL, React',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: CheckCircle2,
    value: '100%',
    label: 'Production Ready Code',
    description: 'Scalable Architecture & Responsive UI',
    color: 'from-emerald-500 to-teal-600',
  },
];

function StatCard({ stat, idx, isInView }: { stat: typeof stats[0]; idx: number; isInView: boolean }) {
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
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="relative p-6 sm:p-7 rounded-3xl bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-2xl border border-indigo-500/20 hover:border-indigo-500/50 shadow-2xl hover:shadow-[0_0_35px_rgba(99,102,241,0.25)] transition-all duration-300 group overflow-hidden"
    >
      {/* Background glow Accent */}
      <div className={`absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-gradient-to-br ${stat.color} opacity-15 blur-2xl group-hover:opacity-30 transition-opacity`} />

      <div className="flex items-center gap-4 mb-3">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300`}>
          <stat.icon size={22} />
        </div>
        <span className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-mono tracking-tight`}>
          {stat.value}
        </span>
      </div>

      <h4 className="font-extrabold text-white text-base mb-1 tracking-tight">
        {stat.label}
      </h4>
      <p className="text-gray-400 text-xs font-normal leading-relaxed">
        {stat.description}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="relative py-14 overflow-hidden bg-slate-950">
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} idx={idx} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
