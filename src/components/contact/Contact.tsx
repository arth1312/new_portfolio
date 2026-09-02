import type { FormEvent } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Github, Linkedin, Mail, Send, CheckCircle, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/arth1312',
    color: 'hover:bg-slate-800 hover:text-white',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/arth-koradiya-0b4a9b276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    color: 'hover:bg-blue-600 hover:text-white',
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:arthkoradiya@gmail.com',
    color: 'hover:bg-rose-500 hover:text-white',
  },
];

function TiltFormCard({ children }: { children: React.ReactNode }) {
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
      className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-indigo-500/20 shadow-2xl shadow-indigo-500/10"
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('arthkoradiya@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden bg-slate-950 text-white">
      {/* Background Orbs */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-widest mb-3">
            <MessageSquare size={14} /> Contact Communication Hub
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Get In{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* 3D Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TiltFormCard>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    className="rounded-2xl border-slate-800 bg-slate-950/80 text-white placeholder:text-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 py-3 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="rounded-2xl border-slate-800 bg-slate-950/80 text-white placeholder:text-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 py-3 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project, idea, or role..."
                    rows={5}
                    required
                    className="rounded-2xl border-slate-800 bg-slate-950/80 text-white placeholder:text-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 text-sm resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitted}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/30 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="mr-2 w-5 h-5 text-emerald-400" />
                      Message Transmitted!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </TiltFormCard>
          </motion.div>

          {/* Contact Information & Copy Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-indigo-500/20 shadow-2xl">
              <h3 className="font-black text-white text-2xl mb-3 tracking-tight">
                Let's Build Something Epic
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 font-normal">
                Whether you have a job opportunity, project inquiry, or technical collaboration idea, feel free to reach out directly.
              </p>

              {/* 1-Click Copy Email Card */}
              <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-wider">DIRECT EMAIL</p>
                    <p className="font-extrabold text-white text-sm sm:text-base font-mono">arthkoradiya@gmail.com</p>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-indigo-300 border border-slate-700 hover:border-indigo-500/50 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  {copied ? 'COPIED!' : 'COPY'}
                </button>
              </div>
            </div>

            {/* Glowing 3D Social Buttons */}
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-4 font-bold flex items-center gap-1.5">
                <Sparkles size={14} /> Connect Across Networks
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.05 }}
                    className={`flex-1 py-4 px-4 rounded-2xl bg-slate-900/90 backdrop-blur-2xl border border-indigo-500/20 shadow-xl flex items-center justify-center gap-2 text-gray-300 font-bold text-xs transition-all ${social.color}`}
                  >
                    <social.icon size={18} />
                    <span>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
