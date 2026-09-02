import React, { useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Layout, Wrench, Code2, Cpu } from 'lucide-react';

const allSkills = [
  { name: 'Next.js 15', level: 88, category: 'Frontend', color: 'from-blue-500 to-indigo-600', icon: '▲' },
  { name: 'TypeScript', level: 85, category: 'Frontend', color: 'from-indigo-500 to-purple-600', icon: '🔷' },
  { name: 'React.js', level: 86, category: 'Frontend', color: 'from-cyan-400 to-indigo-500', icon: '⚛️' },
  { name: 'JavaScript (ES6+)', level: 88, category: 'Frontend', color: 'from-amber-400 to-yellow-600', icon: '⚡' },
  { name: 'Tailwind CSS', level: 92, category: 'Frontend', color: 'from-sky-400 to-blue-600', icon: '🎨' },
  { name: 'HTML5 & CSS3', level: 92, category: 'Frontend', color: 'from-orange-500 to-red-500', icon: '🌐' },
  { name: '.NET Web API & C#', level: 80, category: 'Backend & Tools', color: 'from-purple-600 to-pink-600', icon: '⚙️' },
  { name: 'Microsoft SQL Server', level: 82, category: 'Backend & Tools', color: 'from-red-600 to-rose-700', icon: '🗄️' },
  { name: 'Git & GitHub', level: 88, category: 'Backend & Tools', color: 'from-rose-500 to-orange-600', icon: '🐙' },
  { name: 'Firebase & Cloud', level: 80, category: 'Backend & Tools', color: 'from-amber-500 to-orange-500', icon: '🔥' },
];

const categories = [
  { id: 'All', label: 'All Technologies', icon: Code2 },
  { id: 'Frontend', label: 'Frontend Stack', icon: Layout },
  { id: 'Backend & Tools', label: 'Backend & Databases', icon: Cpu },
];

function SkillTile({ skill, idx, isInView }: { skill: typeof allSkills[0]; idx: number; isInView: boolean }) {
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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: idx * 0.07 }}
      className="p-6 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-indigo-500/20 hover:border-indigo-500/50 shadow-xl hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] transition-all duration-300 group cursor-default"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl p-2.5 rounded-2xl bg-slate-800 border border-slate-700 group-hover:scale-110 transition-transform">
            {skill.icon}
          </span>
          <div>
            <h3 className="font-extrabold text-white text-base tracking-tight">
              {skill.name}
            </h3>
            <span className="text-xs text-indigo-400 font-mono">
              {skill.category}
            </span>
          </div>
        </div>
        <span className="text-sm font-black text-gray-300 font-mono">
          {skill.level}%
        </span>
      </div>

      {/* Animated Glowing Neon Progress Bar */}
      <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: 0.2 + idx * 0.08, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-[0_0_15px_rgba(99,102,241,0.5)]`}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredSkills = allSkills.filter(
    (skill) => activeTab === 'All' || skill.category === activeTab
  );

  return (
    <section id="skills" className="relative py-28 md:py-36 overflow-hidden bg-slate-950 text-white">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-widest mb-3">
            <Wrench size={14} /> 3D Holographic Tech Matrix
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Skills &{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-8" />
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-14">
          <div className="bg-slate-900/90 backdrop-blur-2xl p-2 rounded-3xl border border-slate-800 shadow-2xl flex gap-1.5">
            {categories.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Skill Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <SkillTile key={skill.name} skill={skill} idx={idx} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
