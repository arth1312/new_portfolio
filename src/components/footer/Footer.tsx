import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { icon: Github, href: 'https://github.com/arth1312', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/arth-koradiya-0b4a9b276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:arthkoradiya@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white border-t border-slate-800">
      {/* Neon Laser Glow Divider */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_15px_rgba(99,102,241,0.8)]" />

      <div className="py-12 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Brand Mark */}
          <div className="mb-6 inline-flex items-center gap-2">
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Arth<span className="text-indigo-400 font-bold">.dev</span>
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.15 }}
                className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-indigo-400" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm font-mono flex items-center justify-center gap-1.5">
            © 2026 Arth Kumar. Engineered with
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
            using Next.js & React
          </p>
        </div>
      </div>
    </footer>
  );
}
