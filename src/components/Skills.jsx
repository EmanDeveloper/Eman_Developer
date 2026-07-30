import React, { useState } from 'react';
import { Code2, Layers, Server, Database, Cloud, Brain, ShieldCheck, ScanText, BrainCircuit, Boxes, X } from 'lucide-react';
import {
  SiJavascript, SiTypescript, SiPython, SiHtml5, SiReact, SiNextdotjs, SiRedux,
  SiTailwindcss, SiNodedotjs, SiExpress, SiSocketdotio, SiJsonwebtokens, SiMongodb,
  SiPostgresql, SiSequelize, SiRedis, SiSupabase, SiGithub, SiDocker, SiVercel, SiHuggingface,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

export default function Skills({ selectedSkill, setSelectedSkill }) {
  const [activeCategory, setActiveCategory] = useState('All');

  // Category metadata drives both the filter tabs and the grouped panel headers.
  const categories = [
    { id: 'All', label: 'All Tech Stack', icon: Code2 },
    { id: 'Languages', label: 'Languages', icon: Code2 },
    { id: 'Frontend', label: 'Frontend', icon: Layers },
    { id: 'Backend', label: 'Backend', icon: Server },
    { id: 'Databases', label: 'Databases', icon: Database },
    { id: 'DevOps', label: 'DevOps & Cloud', icon: Cloud },
    { id: 'AI/ML', label: 'AI/ML & Practices', icon: Brain },
  ];

  // Each skill carries its real brand icon + brand color for icon-forward panels.
  const skillData = [
    // Languages
    { name: 'JavaScript (ES6+)', level: 95, category: 'Languages', icon: SiJavascript, color: '#F7DF1E', description: 'Core application logic, async patterns, DOM & server-side runtimes.' },
    { name: 'TypeScript', level: 90, category: 'Languages', icon: SiTypescript, color: '#3178C6', description: 'Strong static typing, interface contracts, safe full-stack execution.' },
    { name: 'Python', level: 80, category: 'Languages', icon: SiPython, color: '#4B8BBE', description: 'AI agent scripts, file utilities, OCR extraction scripting.' },
    { name: 'SQL', level: 85, category: 'Languages', icon: Database, color: '#38BDF8', description: 'Relational data query writing, schema migration, indexing optimizations.' },
    { name: 'HTML5 / CSS3', level: 95, category: 'Languages', icon: SiHtml5, color: '#E34F26', description: 'Semantic structure, layout styling, adaptive media responsiveness.' },

    // Frontend
    { name: 'React.js', level: 95, category: 'Frontend', icon: SiReact, color: '#61DAFB', description: 'State management, custom hooks, reusable design patterns, virtual DOM optimization.' },
    { name: 'Next.js', level: 90, category: 'Frontend', icon: SiNextdotjs, color: '#E2E8F0', description: 'Server-side rendering, static site generation, API endpoints, App Router structure.' },
    { name: 'Redux Toolkit', level: 88, category: 'Frontend', icon: SiRedux, color: '#764ABC', description: 'Global slice-based stores, thunk middleware API handling.' },
    { name: 'Tailwind CSS', level: 95, category: 'Frontend', icon: SiTailwindcss, color: '#06B6D4', description: 'Utility-first layout, custom theme grids, high-fidelity layouts.' },

    // Backend
    { name: 'Node.js', level: 92, category: 'Backend', icon: SiNodedotjs, color: '#5FA04E', description: 'Event-driven, asynchronous I/O, server-side scaling, module architecture.' },
    { name: 'Express.js', level: 92, category: 'Backend', icon: SiExpress, color: '#E2E8F0', description: 'RESTful API routing, customized request middlewares, controller setups.' },
    { name: 'Socket.io', level: 85, category: 'Backend', icon: SiSocketdotio, color: '#E2E8F0', description: 'Real-time duplex connections, room-based events, instant state syncing.' },
    { name: 'JWT & Authentication', level: 90, category: 'Backend', icon: SiJsonwebtokens, color: '#FB015B', description: 'JSON Web Token generation, secure HTTP-only cookies, auth verification.' },
    { name: 'Role-Based Access (RBAC)', level: 90, category: 'Backend', icon: ShieldCheck, color: '#4ADE80', description: 'Fine-grained route guard filters and permission mappings.' },

    // Databases
    { name: 'MongoDB', level: 90, category: 'Databases', icon: SiMongodb, color: '#47A248', description: 'NoSQL collections design, document indexing, lookup aggregations.' },
    { name: 'PostgreSQL / MySQL', level: 85, category: 'Databases', icon: SiPostgresql, color: '#4169E1', description: 'ACID transactional data design, foreign key relationships.' },
    { name: 'Sequelize ORM', level: 85, category: 'Databases', icon: SiSequelize, color: '#52B0E7', description: 'Model definitions, programmatic migrations, association queries.' },
    { name: 'Redis', level: 80, category: 'Databases', icon: SiRedis, color: '#FF4438', description: 'In-memory caching layer, session caching, access speed-ups.' },
    { name: 'Supabase', level: 85, category: 'Databases', icon: SiSupabase, color: '#3FCF8E', description: 'Real-time database integration, row-level security (RLS), authentication.' },

    // DevOps
    { name: 'Git & GitHub', level: 92, category: 'DevOps', icon: SiGithub, color: '#E2E8F0', description: 'Branch management, pull requests, semantic tags, repository version control.' },
    { name: 'Docker', level: 78, category: 'DevOps', icon: SiDocker, color: '#2496ED', description: 'Containerizing Node/React apps, multi-container orchestration.' },
    { name: 'AWS (EC2, S3)', level: 82, category: 'DevOps', icon: FaAws, color: '#FF9900', description: 'Hosting web instances, secure asset buckets, cloud server deploys.' },
    { name: 'Vercel / Netlify', level: 92, category: 'DevOps', icon: SiVercel, color: '#E2E8F0', description: 'Automated CI/CD git integrations, instant preview deploys.' },

    // AI/ML & Practices
    { name: 'LLM Integration', level: 85, category: 'AI/ML', icon: BrainCircuit, color: '#C084FC', description: 'Connecting Llama3/GPT models to Node/React setups using APIs.' },
    { name: 'OCR (Tesseract.js)', level: 88, category: 'AI/ML', icon: ScanText, color: '#22D3EE', description: 'Extracting data from medical scans/bills directly on clients.' },
    { name: 'Hugging Face', level: 80, category: 'AI/ML', icon: SiHuggingface, color: '#FFD21E', description: 'Accessing open-source models for text processing and inference.' },
    { name: 'SaaS Architecture', level: 90, category: 'AI/ML', icon: Boxes, color: '#F472B6', description: 'Designing multi-tenant isolation, shared schemas, domain routing.' },
  ];

  // Map a numeric proficiency to a professional tier label + styling.
  const tierFor = (level) =>
    level >= 90 ? 'Expert' : level >= 83 ? 'Advanced' : 'Proficient';
  const tierStyles = {
    Expert: 'text-cyber-cyan bg-cyber-cyan/10 border-cyber-cyan/25',
    Advanced: 'text-cyber-purple bg-cyber-purple/10 border-cyber-purple/25',
    Proficient: 'text-slate-400 bg-slate-500/10 border-slate-500/25',
  };

  const isAll = activeCategory === 'All';
  const visibleCategories = categories.filter(
    (c) => c.id !== 'All' && (isAll || c.id === activeCategory)
  );

  return (
    <section id="skills" className="py-24 px-4 md:px-8 border-t border-white/5 relative bg-cyber-dark">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyber-purple/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl w-full mx-auto relative z-10 space-y-12">

        {/* Section Header */}
        <div className="space-y-4 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Technical <span className="text-gradient-cyan-purple">Expertise</span>
          </h2>
          <p className="text-slate-400">
            A breakdown of the languages, frameworks, and platforms I work with across production-grade
            systems — grouped by discipline. Select any skill to highlight the projects that use it.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                    : 'glass-panel text-slate-400 border-white/5 hover:text-slate-200 hover:border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-cyber-cyan' : 'text-slate-500'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Grouped Skill Panels */}
        <div className={isAll ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'max-w-3xl mx-auto'}>
          {visibleCategories.map((cat) => {
            const CatIcon = cat.icon;
            const groupSkills = skillData.filter((s) => s.category === cat.id);

            return (
              <div
                key={cat.id}
                className="rounded-2xl glass-panel border border-white/5 p-5 sm:p-6"
              >
                {/* Panel Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-lg bg-slate-950/60 border border-white/5 text-cyber-cyan">
                      <CatIcon className="w-4 h-4" />
                    </span>
                    <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider">
                      {cat.label}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {groupSkills.length} skills
                  </span>
                </div>

                {/* Skill Rows */}
                <div className={isAll ? 'space-y-1.5' : 'grid sm:grid-cols-2 gap-x-6 gap-y-1.5'}>
                  {groupSkills.map((skill) => {
                    const Icon = skill.icon;
                    const { color } = skill;
                    const tier = tierFor(skill.level);
                    const isHighlighted = selectedSkill === skill.name;

                    return (
                      <button
                        key={skill.name}
                        title={skill.description}
                        onClick={() =>
                          setSelectedSkill(selectedSkill === skill.name ? null : skill.name)
                        }
                        className={`group w-full flex items-center justify-between gap-3 py-2.5 px-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                          isHighlighted
                            ? 'bg-white/[0.04]'
                            : 'border-transparent hover:bg-white/[0.03] hover:border-white/10'
                        }`}
                        style={
                          isHighlighted
                            ? { borderColor: `${color}66`, boxShadow: `0 0 14px -6px ${color}` }
                            : undefined
                        }
                      >
                        <span className="flex items-center gap-3 min-w-0">
                          <span
                            className="w-9 h-9 rounded-lg flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-110"
                            style={{ color, backgroundColor: `${color}1a`, borderColor: `${color}33` }}
                          >
                            <Icon className="w-[18px] h-[18px]" />
                          </span>
                          <span
                            className={`font-semibold text-sm truncate transition-colors ${
                              isHighlighted ? 'text-slate-100' : 'text-slate-300 group-hover:text-slate-100'
                            }`}
                          >
                            {skill.name}
                          </span>
                        </span>

                        <span
                          className={`shrink-0 inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${tierStyles[tier]}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {tier}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Skill Banner */}
        {selectedSkill && (
          <div className="flex justify-center">
            <div className="p-3 pl-4 rounded-xl border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan inline-flex items-center gap-3 text-xs font-mono">
              <span>
                Highlighting projects built with <strong>{selectedSkill}</strong>
              </span>
              <button
                onClick={() => setSelectedSkill(null)}
                className="flex items-center gap-1 px-2 py-1 bg-cyber-cyan/15 rounded-lg hover:bg-cyber-cyan/30 transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
