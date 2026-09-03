import React, { useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Search, Eye, Filter, Sparkles, Film, ArrowUpRight } from 'lucide-react';
import ProjectModal, { type ProjectType } from './ProjectModal';
import { playHoverSound, playClickSound } from '../../utils/sounds';

const projectsList: ProjectType[] = [
  {
    title: 'POS - Enterprise Point of Sale System',
    category: 'Full Stack',
    description:
      'Enterprise Point of Sale (POS) system built during internship at EVAAN SOFTTECH using Next.js, TypeScript, .NET Web API, and MSSQL, featuring 20+ modules including Kitchen & Delivery Pipelines.',
    longDescription:
      'Contributed to the development of an enterprise-grade Point of Sale (POS) system during internship at EVAAN SOFTTECH. Built responsive Next.js & TypeScript interfaces integrated with RESTful .NET Web APIs and Microsoft SQL Server database for end-to-end retail and restaurant operation management.',
    features: [
      'Next.js & TypeScript UI integrated with RESTful .NET Web API & MSSQL',
      '20+ Core Modules: Kitchen Pipeline, Delivery Pipeline, Inventory & Stock',
      'Staff Attendance, Table Management, Menu Items & Combo Management',
      'Real-time Dashboard Analytics, Sales Reports, Tax & Feedback System',
    ],
    image: '/pos-project.png',
    tags: ['Next.js', 'TypeScript', '.NET Web API', 'MSSQL', 'Tailwind CSS'],
    github: 'https://github.com/arth1312',
    live: 'https://pos-ui-chi.vercel.app/',
  },
  {
    title: 'Blinkit Clone - Quick Commerce',
    category: 'Full Stack',
    description:
      'A full-featured Blinkit grocery delivery app clone built with React, featuring product browsing, categories, cart management, Cloudinary media, and Firebase authentication.',
    longDescription:
      'This Blinkit Clone mirrors modern quick-commerce platforms. Users can explore grocery categories, add items to cart, manage quantities dynamically, and authenticate seamlessly with Firebase. Cloudinary handles instant image previews and media hosting.',
    features: [
      'Firebase Authentication (Signup/Login/Logout)',
      'Cloudinary Media Integration for product assets',
      'Real-time Shopping Cart & Quantity Controls',
      'Category-based product filtering & search',
    ],
    image: '/blinkit-project.png',
    tags: ['React', 'Firebase', 'Cloudinary', 'React Bootstrap', 'JavaScript'],
    github: 'https://github.com/arth1312/react_js-project/tree/main/pr-13_Blinkit_firebase_Cloudinary_Auth',
    live: 'https://blinkit-21937.web.app/',
  },
  {
    title: 'Minima - Design Agency',
    category: 'Frontend',
    description:
      'A sleek design agency website recognized as a Top 20 Agency, showcasing web design, UI/UX design, and product design services with a modern aesthetic.',
    longDescription:
      'Minima showcases high-end digital agency services with modern minimalism, interactive layout transitions, custom micro-interactions, and a responsive grid system.',
    features: [
      'Recognized Top 20 Agency landing design',
      'Smooth micro-animations & layout transitions',
      'Fully responsive for all screen sizes',
      'Clean HTML5/CSS3 architecture',
    ],
    image: '/minima-project.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UX'],
    github: 'https://github.com/arth1312/minima_project',
    live: 'https://minima-project.netlify.app/',
  },
  {
    title: 'Fruit Selling Website',
    category: 'Frontend',
    description:
      'A vibrant e-commerce fruit selling website featuring seasonal products, deals of the month, and a beautiful UI for an engaging shopping experience.',
    longDescription:
      'Fruit Selling E-Commerce provides a fresh shopping experience with seasonal highlight banners, deals of the month grid, customer review section, and interactive shopping UI.',
    features: [
      'Bootstrap grid system layout',
      'Deals of the Month interactive promotion grid',
      'Custom styled product cards with badge highlights',
      'Cross-browser optimization',
    ],
    image: '/fruit-selling.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/arth1312/fruit-selling',
    live: 'https://fruitselling.netlify.app/',
  },
  {
    title: 'Charitee - Charity Foundation',
    category: 'Frontend',
    description:
      'A heartfelt charity foundation website designed to inspire donations, featuring program highlights, blog posts, and a clean, professional layout.',
    longDescription:
      'Charitee empowers nonprofit organizations by organizing cause awareness programs, blog updates, impact statistics, and donation call-to-action cards.',
    features: [
      'Cause & Program highlight sections',
      'Donation progress bars & goal tracker',
      'Blog & Stories updates layout',
      'Mobile-optimized navigation & footer',
    ],
    image: '/charitee-project.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
    github: 'https://github.com/arth1312/charitee',
    live: 'https://charitee-project.netlify.app/',
  },
];

const categories = ['All', 'Full Stack', 'Frontend', 'React'];

// Cinematic 3D Tilt Card Component
function CinematicProjectCard({
  project,
  index,
  isInView,
  onOpenModal,
}: {
  project: ProjectType;
  index: number;
  isInView: boolean;
  onOpenModal: (p: ProjectType) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

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
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative group rounded-3xl p-0.5 bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] overflow-hidden flex flex-col"
    >
      {/* Dynamic Cursor Spotlight Glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: `radial-gradient(600px circle at ${glowX} ${glowY}, rgba(139, 92, 246, 0.25), transparent 40%)`,
        }}
      />

      {/* Main Card Container */}
      <div className="relative w-full h-full bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-2xl rounded-[22px] overflow-hidden flex flex-col justify-between z-20">
        
        {/* 3D Mockup Frame (Laptop or Mobile) */}
        <div className="px-4 pt-4 relative group cursor-pointer perspective-1000" onClick={() => { playClickSound(); onOpenModal(project); }} onMouseEnter={playHoverSound}>
          
          {project.device === 'mobile' ? (
            /* MOBILE MOCKUP */
            <div className="relative mx-auto w-full max-w-[140px] sm:max-w-[180px] aspect-[9/19] bg-slate-900 rounded-[1.5rem] sm:rounded-[2rem] border-[4px] sm:border-[6px] border-slate-700 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden transform-gpu group-hover:rotate-x-2 transition-transform duration-500">
              {/* iPhone Dynamic Island / Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-950 rounded-full flex justify-center items-center z-30">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 shadow-[0_0_4px_#3b82f6] mr-2" />
                <div className="w-1 h-1 rounded-full bg-slate-800" />
              </div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-10 relative"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300 z-20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center bg-indigo-950/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 w-full h-full">
                <button className="px-3 py-1.5 rounded-xl bg-white text-gray-900 font-extrabold text-[10px] shadow-2xl flex items-center gap-1.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-105 pointer-events-none">
                  <Eye size={12} className="text-indigo-600" /> View
                </button>
              </div>
            </div>
          ) : (
            /* RESPONSIVE MOCKUP (Default) */
            <>
              {/* DESKTOP (Laptop) - Visible on md and above */}
              <div className="hidden md:block">
                <div className="relative mx-auto w-full max-w-[95%] aspect-[16/10] bg-slate-900 rounded-t-xl border-[6px] border-slate-700 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden transform-gpu group-hover:rotate-x-2 transition-transform duration-500">
                  {/* Laptop Camera Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-slate-950 rounded-b-md flex justify-center items-center z-30">
                    <div className="w-1 h-1 rounded-full bg-blue-500/50 shadow-[0_0_4px_#3b82f6]" />
                  </div>
                  {/* Screen Content (Image) */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out z-10 relative"
                  />
                  {/* Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300 z-20" />
                  {/* Category Badge on Screen */}
                  <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-indigo-400 border border-indigo-500/40 backdrop-blur-md shadow-lg">
                    <Sparkles size={10} className="text-indigo-400 animate-pulse" />
                    <span>{project.category}</span>
                  </div>
                  {/* Cinematic Quick View Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-indigo-950/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                    <button className="px-4 py-2 rounded-2xl bg-white text-gray-900 font-extrabold text-xs shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-105 pointer-events-none">
                      <Eye size={14} className="text-indigo-600" /> View Case Study
                    </button>
                  </div>
                </div>
                {/* Laptop Base/Keyboard Deck */}
                <div className="relative mx-auto w-full h-3 bg-slate-600 rounded-b-xl shadow-[-10px_20px_20px_rgba(0,0,0,0.5)] z-10 flex justify-center transform-gpu group-hover:-translate-y-0.5 transition-transform duration-500">
                  <div className="w-1/5 h-1.5 bg-slate-500 rounded-b-sm mt-0.5 shadow-inner" />
                </div>
              </div>

              {/* TABLET (iPad) - Visible on sm only (between sm and md) */}
              <div className="hidden sm:block md:hidden">
                <div className="relative mx-auto w-full max-w-[80%] aspect-[4/3] bg-slate-900 rounded-[2rem] border-[10px] border-slate-700 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden transform-gpu group-hover:rotate-x-2 transition-transform duration-500">
                  {/* Tablet Camera Bezel */}
                  <div className="absolute top-1/2 left-2 -translate-y-1/2 w-1.5 h-1.5 bg-slate-950 rounded-full shadow-[0_0_4px_#3b82f6] z-30" />
                  
                  {/* Image */}
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out z-10 relative" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300 z-20" />
                  <div className="absolute top-4 left-6 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-indigo-400 border border-indigo-500/40 backdrop-blur-md shadow-lg">
                    <Sparkles size={10} className="text-indigo-400 animate-pulse" />
                    <span>{project.category}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-indigo-950/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                    <button className="px-4 py-2 rounded-2xl bg-white text-gray-900 font-extrabold text-xs shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-105 pointer-events-none">
                      <Eye size={14} className="text-indigo-600" /> View
                    </button>
                  </div>
                </div>
              </div>

              {/* MOBILE (iPhone) - Visible below sm */}
              <div className="block sm:hidden">
                <div className="relative mx-auto w-full max-w-[160px] aspect-[9/19] bg-slate-900 rounded-[2rem] border-[6px] border-slate-700 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden transform-gpu group-hover:rotate-x-2 transition-transform duration-500">
                  {/* iPhone Dynamic Island / Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-slate-950 rounded-full flex justify-center items-center z-30">
                    <div className="w-1 h-1 rounded-full bg-blue-500/50 shadow-[0_0_4px_#3b82f6] mr-1.5" />
                    <div className="w-0.5 h-0.5 rounded-full bg-slate-800" />
                  </div>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out z-10 relative" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300 z-20" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center bg-indigo-950/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 w-full h-full">
                    <button className="px-3 py-1.5 rounded-xl bg-white text-gray-900 font-extrabold text-[10px] shadow-2xl flex items-center gap-1.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-105 pointer-events-none">
                      <Eye size={12} className="text-indigo-600" /> View
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Card Body Details */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-extrabold text-white text-xl group-hover:text-indigo-400 transition-colors tracking-tight leading-snug">
                {project.title}
              </h3>
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
                title="Open Live App"
              >
                <ArrowUpRight size={18} />
              </a>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-normal">
              {project.description}
            </p>
          </div>

          <div>
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-3 py-1 rounded-full bg-slate-800/80 text-indigo-300 font-mono font-medium border border-indigo-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Interactive Action Bar */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-2 border-t border-slate-800/80">
              <button
                onClick={() => { playClickSound(); onOpenModal(project); }}
                onMouseEnter={playHoverSound}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-indigo-400 text-xs font-semibold border border-indigo-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              >
                <Film size={14} /> Details
              </button>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                onMouseEnter={playHoverSound}
                className="py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-gray-300 text-xs font-semibold border border-slate-700 transition-all flex items-center justify-center gap-1.5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                <Github size={14} /> Code
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                onMouseEnter={playHoverSound}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-1.5 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<ProjectType | null>(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredProjects = projectsList.filter((proj) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      proj.category === selectedCategory ||
      (selectedCategory === 'React' && proj.tags.includes('React'));

    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="relative py-28 md:py-36 overflow-hidden bg-slate-950 text-white">
      {/* Cinematic Background Light Beams */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-widest mb-4">
            <Film size={14} className="text-indigo-400" /> Cinematic Showcase
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Featured{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects & Apps
            </span>
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Interactive enterprise web applications, e-commerce platforms, and sleek UI/UX digital experiences.
          </p>
        </motion.div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-14 bg-slate-900/80 backdrop-blur-2xl p-3.5 rounded-3xl border border-slate-800 shadow-2xl">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-gray-500 text-xs px-2 hidden sm:inline-flex items-center gap-1 font-mono">
              <Filter size={12} /> CATEGORY:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { playClickSound(); setSelectedCategory(cat); }}
                onMouseEnter={playHoverSound}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech, name, module..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs bg-slate-950/80 border border-slate-800 text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500/80 font-mono"
            />
          </div>
        </div>

        {/* 3D Cinematic Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, index) => (
            <CinematicProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
              onOpenModal={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-gray-500 font-mono text-sm">
            No cinematic projects found matching "{searchQuery}".
          </div>
        )}
      </div>

      {/* Detailed Modal Popup */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
