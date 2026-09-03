import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GraduationCap, Award, Rocket, Code2, Briefcase } from 'lucide-react';

const timelineData = [
  {
    year: 'EDUCATION',
    title: 'Diploma in Computer Engineering',
    institution: 'UKA Tarsadia University',
    description: 'Built core foundations in computer science, algorithms, software engineering principles, and web technologies.',
    icon: GraduationCap,
    color: 'from-indigo-500 to-purple-600',
    tags: ['C/C++', 'CS Fundamentals', 'Web Basics'],
  },
  {
    year: 'INTERNSHIP',
    title: 'Full Stack Development Intern',
    institution: 'EVAAN SOFTTECH',
    description: 'Contributed to an enterprise Point of Sale (POS) system using Next.js, TypeScript, .NET Web API, and MSSQL. Developed 20+ modules including Kitchen & Delivery Pipelines, Inventory, Staff Attendance, Table Reservations & Reports.',
    icon: Briefcase,
    color: 'from-cyan-500 to-blue-600',
    tags: ['Next.js', 'TypeScript', '.NET Web API', 'MSSQL', '20+ Modules'],
  },
  {
    year: 'CERTIFICATION',
    title: 'Full Stack Web Development',
    institution: 'Red & White Multimedia Education',
    description: 'Intensive practical training in frontend and backend web development using React.js, JavaScript, Tailwind, and Node ecosystem.',
    icon: Award,
    color: 'from-purple-500 to-pink-600',
    tags: ['React.js', 'JavaScript ES6+', 'HTML5/CSS3', 'Bootstrap'],
  },
  {
    year: 'PRESENT',
    title: 'Seeking Junior / Associate Full Stack & Frontend Roles',
    institution: 'Open for Work',
    description: 'Actively building modern, accessible, and ultra-fast web applications while exploring advanced React patterns and modern UI frameworks.',
    icon: Rocket,
    color: 'from-emerald-500 to-teal-600',
    tags: ['Next.js Developer', 'React Engineer', 'Full Stack Engineer'],
  },
];

function TimelineCard({ item, idx, isInView }: { item: typeof timelineData[0]; idx: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-6deg', '6deg']);

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
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      className="relative pl-8 md:pl-12 group"
    >
      {/* Node Bullet Pulsing Glow */}
      <div className={`absolute -left-[19px] top-1.5 w-9 h-9 rounded-full bg-gradient-to-br ${item.color} p-0.5 shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:scale-125 transition-transform duration-300 z-10`}>
        <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
          <item.icon className="w-4 h-4 text-indigo-400" />
        </div>
      </div>

      {/* Desktop Year Badge */}
      <div className="hidden md:block absolute -left-40 top-2 w-32 text-right font-mono text-xs font-bold text-indigo-400 tracking-widest">
        {item.year}
      </div>

      {/* Glass Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-indigo-500/20 hover:border-indigo-500/50 shadow-2xl hover:shadow-[0_0_35px_rgba(99,102,241,0.2)] transition-all duration-300">
        <div className="md:hidden inline-block px-3 py-1 mb-2 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-mono font-bold">
          {item.year}
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white mb-1 tracking-tight">
          {item.title}
        </h3>
        <p className="text-indigo-400 font-bold text-sm mb-3 font-mono">
          {item.institution}
        </p>
        <p className="text-gray-300 text-sm leading-relaxed mb-5 font-normal">
          {item.description}
        </p>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-800/80 text-gray-300 border border-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative py-28 md:py-36 overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-widest mb-3">
            <Code2 size={14} /> Career Milestone Roadmap
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Experience &{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Growth Path
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        {/* Timeline Line with Glowing Laser Connector */}
        <div className="relative border-l-2 border-indigo-500/40 ml-4 md:ml-36 space-y-14">
          {timelineData.map((item, idx) => (
            <TimelineCard key={item.title} item={item} idx={idx} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
