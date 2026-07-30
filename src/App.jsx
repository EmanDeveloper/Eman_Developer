import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUp, Cpu, FileText, Download } from 'lucide-react';
import resumeUrl from './assets/Resume.pdf';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import AIPlayground from './components/AIPlayground';
import Contact from './components/Contact';

export default function App() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Nav items list
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Timeline' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'playground', label: 'AI Sandbox' },
    { id: 'contact', label: 'Contact' },
  ];

  // Always start at the Home section on load: ignore the browser's
  // restored scroll position and any leftover URL hash (e.g. #projects).
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
    setActiveSection('hero');
  }, []);

  // Scroll listener for top navigation bar and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Toggle scroll to top button
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Highlight active section in nav
      const scrollPos = window.scrollY + 200;
      for (let i = 0; i < navItems.length; i++) {
        const section = document.getElementById(navItems[i].id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-slate-100 flex flex-col relative select-none">
      
      {/* Sticky Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          
          {/* Logo brand */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-1.5 rounded-lg bg-cyber-cyan/10 text-cyber-cyan group-hover:bg-cyber-cyan/20 group-hover:scale-105 transition-all">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <span className="font-extrabold text-slate-100 tracking-tight text-lg">
              Eman.<span className="text-cyber-cyan">dev</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/40 p-1.5 rounded-xl border border-white/5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all uppercase cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-cyber-cyan text-cyber-dark font-black shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Button CTA */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyber-cyan/15 to-cyber-purple/15 hover:from-cyber-cyan/30 hover:to-cyber-purple/30 border border-cyber-cyan/20 text-cyber-cyan font-bold text-xs shadow-[0_0_10px_rgba(34,211,238,0.05)] transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              Résumé
            </a>
            <a
              href={resumeUrl}
              download="Eman_Khadim_Resume.pdf"
              title="Download résumé"
              className="px-3 py-2 rounded-lg glass-panel border border-white/5 text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/40 font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg glass-panel hover:text-cyber-cyan transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[69px] z-40 bg-cyber-dark/95 backdrop-blur-lg flex flex-col p-6 space-y-3 animate-fade-in-up md:hidden border-t border-white/5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full py-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-all ${
                activeSection === item.id
                  ? 'bg-cyber-cyan text-cyber-dark border border-cyber-cyan'
                  : 'glass-panel border-white/5 text-slate-300 hover:text-cyber-cyan'
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-cyber-dark text-center text-sm font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            View Résumé
          </a>
          <a
            href={resumeUrl}
            download="Eman_Khadim_Resume.pdf"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-4 rounded-xl glass-panel border-white/5 text-slate-300 hover:text-cyber-cyan text-center text-sm font-bold transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Résumé
          </a>
        </div>
      )}

      {/* Main Sections Wrapper */}
      <main className="flex-1">
        <Hero />
        <Skills selectedSkill={selectedSkill} setSelectedSkill={setSelectedSkill} />
        <Experience />
        <Education />
        <Projects selectedSkill={selectedSkill} />
        <AIPlayground />
        <Contact />
      </main>

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-cyber-dark hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all animate-float cursor-pointer"
          title="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5 font-black" />
        </button>
      )}

    </div>
  );
}
