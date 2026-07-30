import React, { useState } from 'react';
import { ExternalLink, Sparkles, MessageSquare, Search, HeartPulse, Filter } from 'lucide-react';
import { Github } from './SocialIcons';

export default function Projects({ selectedSkill }) {
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = [
    { id: 'All', label: 'All Projects' },
    { id: 'Full-Stack', label: 'Full-Stack' },
    { id: 'AI/ML', label: 'AI/ML & OCR' },
    { id: 'Real-Time', label: 'Real-Time' },
  ];

  const projectsData = [
    {
      title: "DiagnoXpert",
      tagline: "AI Healthcare Platform with OCR & LLM Analysis",
      description: "Developed a medical consulting workspace featuring specialized patient and doctor dashboards. Users extract scanned prescription data instantly using OCR and trigger a context-aware treatment recommender using specialized open-source medical LLMs.",
      icon: HeartPulse,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      category: ["Full-Stack", "AI/ML"],
      tags: ["Next.js", "Tesseract.js OCR", "Llama3-OpenBioLLM", "Socket.io", "RBAC", "Tailwind CSS"],
      github: "https://github.com/EmanDeveloper",
      demo: "https://diagno-xpert.vercel.app/",
      stats: { "Accuracy": "94% OCR", "Model": "OpenBioLLM" }
    },
    {
      title: "Easy Finder Platform",
      tagline: "Multi-Source Product Discovery & Comparison Engine",
      description: "Built a full-stack e-commerce comparison application integrating laptops, phones, and tablets databases. Built high-performance multi-column query scripts supporting localized country and price filtering operations.",
      icon: Search,
      iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      category: ["Full-Stack"],
      tags: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Sequelize ORM", "SQL"],
      github: "https://github.com/EmanDeveloper",
      demo: "https://easy-finder-nu.vercel.app/",
      stats: { "Response": "120ms", "Filtering": "Active" }
    },
    {
      title: "Real-Time Chat Application",
      tagline: "Theta Konnect Real-Time Chat Engine",
      description: "Designed and implemented a rich client-side messaging console enabling dual-channel sockets for real-time collaboration. Features secure JWT cookie authentication, message histories storage, read indicators, and an adaptive layout.",
      icon: MessageSquare,
      iconColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      category: ["Full-Stack", "Real-Time"],
      tags: ["React.js", "Node.js", "Express.js", "Socket.io", "JWT & Authentication", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/EmanDeveloper",
      stats: { "Latency": "< 50ms", "Delivery": "Reliable" }
    },
    
    {
      title: "Portfolio Management Platform",
      tagline: "Dynamic Content Showcase Builder",
      description: "Engineered a responsive portfolio CMS engine letting developers construct, tag, and publish projects portfolios. Features API routing hooks, secure database structures, and high-fidelity reusable modules.",
      icon: Sparkles,
      iconColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      category: ["Full-Stack"],
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "RESTful APIs"],
      github: "https://github.com/EmanDeveloper",
      stats: { "UX Load": "Instant", "Components": "Reusable" }
    }
  ];

  // Filter projects by category and optionally by selectedSkill
  const filteredProjects = projectsData.filter(project => {
    // Category check
    const matchesCategory = filterCategory === 'All' || project.category.includes(filterCategory);
    
    // Skill check (if a skill is selected, search if project tags contain this skill)
    const matchesSkill = !selectedSkill || project.tags.includes(selectedSkill);
    
    return matchesCategory && matchesSkill;
  });

  return (
    <section id="projects" className="py-24 px-4 md:px-8 border-t border-white/5 relative bg-cyber-dark">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl w-full mx-auto relative z-10 space-y-12 text-center">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Featured <span className="text-gradient-cyan-purple">Projects</span>
          </h2>
          <p className="text-slate-400">
            A selection of production-grade platforms, full-stack systems, and AI modules I have engineered.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between max-w-4xl mx-auto border border-white/5 bg-slate-900/40 p-3 rounded-2xl backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Filter className="w-4 h-4" />
            <span>CATEGORIES:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  filterCategory === cat.id
                    ? 'bg-cyber-cyan text-cyber-dark shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                    : 'bg-slate-950/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Skill Tag indicator */}
        {selectedSkill && (
          <div className="text-sm font-mono text-cyber-cyan animate-pulse">
            Filtering by tech: <span className="underline font-bold">{selectedSkill}</span> ({filteredProjects.length} projects found)
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {filteredProjects.map((project) => {
            const ProjectIcon = project.icon;
            
            return (
              <div
                key={project.title}
                className="flex flex-col justify-between p-6 rounded-2xl glass-panel glass-panel-hover text-left border border-white/5 relative group overflow-hidden"
              >
                {/* Visual highlights */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyber-cyan/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="space-y-4">
                  {/* Top Bar (Icon + Stats) */}
                  <div className="flex justify-between items-center">
                    <div className={`p-3 rounded-xl border ${project.iconColor}`}>
                      <ProjectIcon className="w-6 h-6 animate-pulse" style={{ animationDuration: '3s' }} />
                    </div>

                    {/* Compact stats badge */}
                    <div className="flex gap-2">
                      {Object.entries(project.stats).map(([label, value]) => (
                        <div key={label} className="px-2 py-0.5 rounded bg-slate-950 border border-white/5 text-[9px] font-mono text-slate-500">
                          <span className="text-slate-400 font-bold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-extrabold text-slate-100 group-hover:text-cyber-cyan transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-semibold text-cyber-purple font-mono uppercase tracking-wide">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed min-h-[70px]">
                    {project.description}
                  </p>

                  {/* Skill Tag list */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => {
                      const isHighlighted = selectedSkill === tag;
                      return (
                        <span
                          key={tag}
                          className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded transition-all ${
                            isHighlighted
                              ? 'bg-cyber-cyan text-cyber-dark ring-1 ring-cyber-cyan shadow-[0_0_10px_rgba(34,211,238,0.4)]'
                              : 'bg-slate-950 border border-white/5 text-slate-400'
                          }`}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 pt-6 mt-4 border-t border-white/5">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-white/5 text-slate-300 font-semibold text-xs text-center flex items-center justify-center gap-1.5 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Source Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-cyber-cyan/15 to-cyber-purple/15 hover:from-cyber-cyan/35 hover:to-cyber-purple/35 border border-cyber-cyan/20 text-cyber-cyan font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(34,211,238,0.05)] hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Preview
                  </a>)}
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state check */}
        {filteredProjects.length === 0 && (
          <div className="p-12 rounded-2xl glass-panel border-white/5 max-w-md mx-auto text-slate-500 font-mono text-xs">
            No projects found matching the active filter selections.
          </div>
        )}

      </div>
    </section>
  );
}
