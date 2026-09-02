import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle, Layers, Film, Sparkles } from 'lucide-react';

export interface ProjectType {
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  features?: string[];
  image: string;
  tags: string[];
  github: string;
  live: string;
  device?: 'laptop' | 'mobile';
}

interface ProjectModalProps {
  project: ProjectType | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.85, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-slate-950/95 text-white rounded-3xl shadow-[0_0_60px_rgba(99,102,241,0.2)] border border-indigo-500/30 overflow-hidden my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-gray-300 hover:text-white backdrop-blur-md border border-slate-700 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Banner Image with Vignette */}
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/30 border border-indigo-500/50 backdrop-blur-md text-indigo-300 uppercase tracking-wider mb-2">
                <Sparkles size={12} /> {project.category}
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto font-sans">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2 font-bold flex items-center gap-1.5">
                <Layers size={14} /> Overview & Architecture
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Key Features */}
            {project.features && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-3 font-bold flex items-center gap-1.5">
                  <Film size={14} /> Key Modules & Technical Highlights
                </h4>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {project.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-gray-200 bg-slate-900/90 p-3 rounded-2xl border border-slate-800"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Tags */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-3 font-bold">
                Tech Stack & Integration
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800/80">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-gray-200 border border-slate-700 flex items-center justify-center gap-2 font-semibold text-sm transition-all"
              >
                <Github size={18} />
                View Source Code
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2 text-sm transition-all"
              >
                <ExternalLink size={18} />
                Visit Live Application
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
