import React, { useState, useEffect } from 'react';
import { Terminal, ArrowRight, Sparkles, Cpu, Layers, Mail, FileText, Download } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import resumeUrl from '../assets/Resume.pdf';

export default function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const words = [
    "MERN Stack Specialist",
    "AI Integration Engineer",
    "SaaS Architect",
    "Real-Time App Developer"
  ];

  useEffect(() => {
    let timer;
    const handleType = () => {
      const i = loopNum % words.length;
      const fullWord = words[i];

      if (isDeleting) {
        setText(fullWord.substring(0, text.length - 1));
        setTypingSpeed(40);
      } else {
        setText(fullWord.substring(0, text.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && text === fullWord) {
        timer = setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(100);
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 md:px-8 cyber-grid overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyber-cyan/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left text panel */}
        <div className="lg:col-span-7 space-y-6 text-left animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-cyber-cyan/30 text-cyber-cyan text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-cyber-yellow animate-spin" style={{ animationDuration: '4s' }} />
            Open for Remote Full-Stack Opportunities
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Hi, I'm <span className="text-gradient-cyan-purple font-black">Eman Khadim</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-300 min-h-[40px] flex items-center gap-2">
            <Cpu className="w-7 h-7 text-cyber-purple animate-pulse" />
            <span>I'm a </span>
            <span className="text-cyber-cyan border-r-2 border-cyber-cyan pr-1 animate-pulse font-mono">
              {text}
            </span>
          </h2>

          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            Full-Stack MERN Developer specializing in architecting end-to-end, production-grade applications. I build highly responsive React interfaces, secure backend microservices, and integrate AI pipelines (LLMs, OCR) to build SaaS systems with speed and scale.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 items-center">
            <a href="https://github.com/EmanDeveloper" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl glass-panel hover:text-cyber-cyan hover:border-cyber-cyan/50 hover:scale-110 transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/eman-developer/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl glass-panel hover:text-cyber-purple hover:border-cyber-purple/50 hover:scale-110 transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:memankhadim@gmail.com" className="p-3 rounded-xl glass-panel hover:text-cyber-green hover:border-cyber-green/50 hover:scale-110 transition-all">
              <Mail className="w-5 h-5" />
            </a>
            <span className="text-xs font-mono text-slate-500 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
              LOC: Pakistan
            </span>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#projects" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-cyber-dark font-bold hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all flex items-center gap-2 group">
              Explore Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#playground" className="px-6 py-3.5 rounded-xl glass-panel text-slate-300 font-bold hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-all flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyber-cyan" />
              Try AI Playground
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl glass-panel text-slate-300 font-bold hover:border-cyber-purple/40 hover:text-cyber-purple transition-all flex items-center gap-2"
            >
              <FileText className="w-5 h-5 text-cyber-purple" />
              View Résumé
            </a>
            <a
              href={resumeUrl}
              download="Eman_Khadim_Resume.pdf"
              className="px-6 py-3.5 rounded-xl glass-panel text-slate-300 font-bold hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5 text-cyber-cyan" />
              Download
            </a>
          </div>
        </div>

        {/* Right mockup panel */}
        <div className="lg:col-span-5 relative flex justify-center animate-slide-in-right">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyber-cyan via-cyber-purple to-cyber-pink opacity-30 blur-xl"></div>
          
          {/* Glass dashboard mockup */}
          <div className="relative w-full max-w-md rounded-2xl glass-panel border-white/10 p-5 shadow-2xl flex flex-col font-mono text-xs">
            {/* Top window decorations */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              </div>
              <span className="text-slate-500 font-mono text-[10px]">dev_terminal.sh</span>
              <div className="w-6"></div>
            </div>

            {/* Simulated Shell */}
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px] pr-2">
              <div className="flex gap-2">
                <span className="text-cyber-green">eman@portfolio:~$</span>
                <span className="text-slate-300">fetch skills --level=all</span>
              </div>
              <div className="text-slate-400 pl-4 space-y-1">
                <p>⚡ Frontend: React.js, Next.js, Redux, Tailwind</p>
                <p>⚙️ Backend: Node.js, Express.js, Socket.io, JWT</p>
                <p>💾 Databases: MongoDB, PostgreSQL, Supabase, Redis</p>
                <p>🤖 AI/ML: LLM Integrations, HuggingFace, OCR</p>
              </div>

              <div className="flex gap-2 pt-2">
                <span className="text-cyber-green">eman@portfolio:~$</span>
                <span className="text-slate-300">cat current_status.json</span>
              </div>
              <div className="text-slate-400 pl-4">
                <p className="text-cyber-cyan font-semibold">{"{"}</p>
                <p className="pl-4">"role": "Full-Stack Developer",</p>
                <p className="pl-4">"focus": "High-Perf SaaS Platforms",</p>
                <p className="pl-4">"status": "Ready for remote roles",</p>
                <p className="pl-4">"availability": "Immediate"</p>
                <p className="text-cyber-cyan font-semibold">{"}"}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <span className="text-cyber-green">eman@portfolio:~$</span>
                <span className="text-slate-300 animate-pulse">_</span>
              </div>
            </div>

            {/* Bottom floating widgets */}
            <div className="absolute -bottom-8 -right-4 bg-slate-950/80 border border-cyber-cyan/30 rounded-xl p-3 shadow-xl backdrop-blur-md flex items-center gap-3 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="p-2 rounded-lg bg-cyber-cyan/15 text-cyber-cyan">
                <Layers className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-left font-sans">
                <p className="text-[10px] text-slate-500 font-mono">STACK</p>
                <p className="text-xs font-bold text-slate-300">React + Express + AI</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
