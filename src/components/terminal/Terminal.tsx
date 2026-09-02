import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, CornerDownLeft } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export default function Terminal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1">
          <p className="text-indigo-400 font-bold">🚀 Welcome to Arth Kumar's Developer CLI v2.0!</p>
          <p className="text-gray-400 text-xs">
            Type <span className="text-yellow-400 font-mono font-semibold">help</span> to view available commands or navigate directly.
          </p>
        </div>
      ),
    },
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { toggleTheme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let res: React.ReactNode;

    switch (trimmed) {
      case 'help':
        res = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs py-1">
            <div><span className="text-yellow-400 font-semibold">about</span> - Learn about Arth</div>
            <div><span className="text-yellow-400 font-semibold">skills</span> - View tech stack</div>
            <div><span className="text-yellow-400 font-semibold">projects</span> - Showcase of apps</div>
            <div><span className="text-yellow-400 font-semibold">contact</span> - Get in touch</div>
            <div><span className="text-yellow-400 font-semibold">theme</span> - Toggle Dark/Light</div>
            <div><span className="text-yellow-400 font-semibold">clear</span> - Clear terminal</div>
            <div><span className="text-yellow-400 font-semibold">sudo hire-arth</span> - Executive action</div>
            <div><span className="text-yellow-400 font-semibold">whoami</span> - Visitor status</div>
          </div>
        );
        break;

      case 'about':
        res = (
          <p className="text-gray-300 text-xs leading-relaxed">
            🎓 Diploma in Computer Engineering from UKA Tarsadia University.<br />
            💻 Full Stack Web Development from Red & White Education.<br />
            ⚡ Passionate about building high-performance modern web apps.
          </p>
        );
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'skills':
        res = (
          <div className="text-xs text-gray-300 space-y-1">
            <p><span className="text-cyan-400 font-bold">Frontend:</span> HTML5, CSS3, JavaScript, React.js, Tailwind CSS, Bootstrap</p>
            <p><span className="text-purple-400 font-bold">Tools:</span> Git, GitHub, VS Code, Firebase, Vite</p>
          </div>
        );
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'projects':
        res = (
          <div className="text-xs text-gray-300 space-y-1">
            <p>1. <span className="text-emerald-400 font-semibold">POS Enterprise System</span> (Next.js + TypeScript + .NET API + MSSQL)</p>
            <p>2. <span className="text-emerald-400 font-semibold">Blinkit Clone</span> (React + Firebase)</p>
            <p>3. <span className="text-emerald-400 font-semibold">Minima Design Agency</span> (HTML/CSS/JS)</p>
            <p>4. <span className="text-emerald-400 font-semibold">Fruit Selling E-Commerce</span> (Bootstrap)</p>
            <p>5. <span className="text-emerald-400 font-semibold">Charitee Foundation</span> (Responsive Web)</p>
          </div>
        );
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'contact':
        res = (
          <div className="text-xs text-gray-300 space-y-1">
            <p>📧 Email: <a href="mailto:arthkoradiya@gmail.com" className="text-indigo-400 underline">arthkoradiya@gmail.com</a></p>
            <p>🐙 GitHub: <a href="https://github.com/arth1312" target="_blank" rel="noreferrer" className="text-indigo-400 underline">github.com/arth1312</a></p>
          </div>
        );
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'theme':
        toggleTheme();
        res = <p className="text-emerald-400 text-xs">Theme toggled successfully!</p>;
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'whoami':
        res = <p className="text-pink-400 text-xs font-semibold">guest@visitor-system-v2</p>;
        break;

      case 'sudo hire-arth':
      case 'hire':
        res = (
          <div className="p-2 bg-indigo-950/80 border border-indigo-500/50 rounded text-xs space-y-1">
            <p className="text-emerald-400 font-bold">🎉 PERMISSION GRANTED!</p>
            <p className="text-gray-200">Executing candidate profile dispatch... Arth is ready to join your engineering team!</p>
          </div>
        );
        break;

      default:
        if (trimmed === '') return;
        res = (
          <p className="text-rose-400 text-xs">
            Command not found: <span className="font-mono">{cmd}</span>. Type <span className="text-yellow-400 font-mono">help</span> for commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output: res }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full bg-slate-950/95 border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
              isMaximized ? 'max-w-[95vw] h-[90vh]' : 'max-w-2xl h-[480px]'
            }`}
          >
            {/* Header / Title Bar */}
            <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80" />
                  <button onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-yellow-500 hover:opacity-80" />
                  <button onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-green-500 hover:opacity-80" />
                </div>
                <div className="flex items-center gap-2 ml-3 text-xs font-mono text-gray-400">
                  <TerminalIcon size={14} className="text-indigo-400" />
                  <span>arth@developer-cli ~ zsh</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-1 hover:text-white rounded"
                >
                  {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button onClick={onClose} className="p-1 hover:text-white rounded">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-4 font-mono overflow-y-auto space-y-3 text-sm scrollbar-thin">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  {item.command !== 'welcome' && (
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs">
                      <span>guest@portfolio:~$</span>
                      <span className="text-gray-100">{item.command}</span>
                    </div>
                  )}
                  <div className="pl-2">{item.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Prompt Input Form */}
            <form onSubmit={handleSubmit} className="bg-slate-900/80 px-4 py-3 border-t border-slate-800 flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-xs font-semibold">guest@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type command (e.g. help, skills, projects)..."
                className="flex-1 bg-transparent text-gray-100 font-mono text-xs focus:outline-none placeholder:text-gray-600"
              />
              <button type="submit" className="text-gray-400 hover:text-indigo-400">
                <CornerDownLeft size={14} />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
