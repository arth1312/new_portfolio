import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, FileText, Terminal as TerminalIcon, Sparkles, Code2, Cpu, Rocket, Globe } from 'lucide-react';
import { HeroScene } from '../3d/HeroScene';

const roles = [
  'Full Stack Web Developer',
  'Next.js & React Specialist',
  'Frontend UI/UX Engineer',
  'Problem Solver & Builder',
];

const floatingPills = [
  { text: 'Next.js 15', icon: Globe, color: 'from-blue-500 to-indigo-600', position: 'top-10 left-4 sm:-left-4' },
  { text: 'TypeScript', icon: Code2, color: 'from-indigo-500 to-purple-600', position: 'bottom-20 left-6 sm:-left-8' },
  { text: '.NET & MSSQL', icon: Cpu, color: 'from-purple-500 to-pink-600', position: 'top-14 right-4 sm:-right-4' },
  { text: 'Full Stack Developer', icon: Rocket, color: 'from-pink-500 to-rose-600', position: 'bottom-16 right-6 sm:-right-8' },
];

export default function Hero({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const [currentRole, setCurrentRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Parallax 3D mouse effect
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const orbX = useTransform(springX, [-0.5, 0.5], ['-30px', '30px']);
  const orbY = useTransform(springY, [-0.5, 0.5], ['-30px', '30px']);
  const rotateX = useTransform(springY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-8deg', '8deg']);

  useEffect(() => {
    const currentWord = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentRole(currentWord.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
          if (charIndex + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setCurrentRole(currentWord.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
          if (charIndex - 1 === 0) {
            setIsDeleting(false);
            setRoleIndex((roleIndex + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-slate-950 text-white"
    >
      {/* Background Grid & Light Beams */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b15_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-rose-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container - Split into 2 columns for large screens */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="text-left"
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-8 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <Sparkles size={14} className="text-emerald-400" /> OPEN FOR ROLES
            </motion.div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4 leading-none text-white">
              Hi, I'm <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
                Arth Kumar
              </span>
            </h1>

            {/* Role Typewriter */}
            <div className="text-xl sm:text-2xl font-mono font-bold text-gray-300 mb-6 h-10 flex items-center justify-start gap-2">
              <span className="text-indigo-400">{'>'}</span>
              <span className="typing-cursor pr-1 text-white">{currentRole}</span>
            </div>

            {/* Bio */}
            <p className="text-gray-400 max-w-xl mb-10 text-base md:text-lg leading-relaxed font-normal">
              Engineering modern, high-performance web applications with Next.js, TypeScript, React & .NET Web API. Specialized in enterprise POS systems & sleek UI/UX interfaces.
            </p>

            {/* Cinematic Action Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_45px_rgba(168,85,247,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                Explore Projects
                <ArrowRight size={18} />
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm border border-slate-800 hover:border-indigo-500/50 shadow-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                <FileText size={18} className="text-indigo-400" />
                Resume
              </a>

              <button
                onClick={onOpenTerminal}
                className="px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-indigo-400 font-mono font-bold text-sm border border-indigo-500/40 hover:border-indigo-400 shadow-xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <TerminalIcon size={18} />
                CLI
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: 3D Canvas & Tech Pills */}
        <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center lg:mt-0 mt-10">
          {/* Real 3D WebGL Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            className="absolute inset-0 w-full h-full"
          >
            <HeroScene />
          </motion.div>

          {/* Floating 3D Tech Pills around the 3D model */}
          {floatingPills.map((pill, idx) => (
            <motion.div
              key={pill.text}
              style={{ x: orbX, y: orbY }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + idx * 0.15 }}
              className={`absolute ${pill.position} hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-[0_0_25px_rgba(99,102,241,0.2)] backdrop-blur-xl z-20 pointer-events-none`}
            >
              <div className={`w-7 h-7 rounded-xl bg-gradient-to-br ${pill.color} flex items-center justify-center text-white text-xs`}>
                <pill.icon size={14} />
              </div>
              <span className="text-xs font-mono font-bold text-gray-200">{pill.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
