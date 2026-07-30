import React, { useState } from 'react';
import { Calendar, Briefcase, Award, Users, ChevronDown, ChevronUp, Terminal, Star } from 'lucide-react';

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const experiences = [
    {
      role: "Full-Stack MERN Developer (Remote)",
      company: "UK",
      period: "June 2025 - Present",
      type: "work",
      highlights: [
        "Architected and delivered core frontend and backend features for a multi-tenant SaaS platform, accelerating feature delivery by 25% across multiple release cycles.",
        "Engineered responsive admin and vendor dashboards with React, Redux Toolkit, and Tailwind CSS, reducing render times by 30% through optimized component architecture.",
        "Built secure authentication and role-based access control (RBAC) across multiple user portals, safeguarding sensitive data.",
        "Designed and developed RESTful APIs with Node.js and Express.js, integrating Redis caching to cut query response times.",
        "Integrated Twilio API for automated SMS communication workflows and notification alerts.",
        "Developed a real-time internal chat system using Socket.io to enable collaboration across distributed teams.",
        "Delivered a robust staff job-assignment and shift-tracking module, reducing manual scheduling overhead."
      ],
      tags: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "Socket.io", "Redis", "Twilio", "RBAC", "SaaS Architecture"]
    },
    {
      role: "Final Year Project Team Lead",
      company: "COMSATS University Islamabad",
      period: "Academic Year 2024 - 2025",
      type: "leadership",
      highlights: [
        "Led a team of 4 developers to design, develop, and deploy an AI-enabled clinical OCR assessment system.",
        "Owned the architectural design, frontend/backend integration, and local LLM deployment flow.",
        "Coordinated weekly tasks using Agile Scrum methodologies, ensuring full milestone compliance.",
        "Configured continuous integration and test workflows for rapid verification."
      ],
      tags: ["Project Leadership", "Next.js", "Llama3-OpenBioLLM", "Tesseract.js", "OCR", "Agile/Scrum"]
    },
    {
      role: "Coding Competitions & Algorithmic Practice",
      company: "University Level",
      period: "2023 - Present",
      type: "award",
      highlights: [
        "Participated in multiple university-level coding hackathons and speed programming matches.",
        "Strengthened problem-solving speed, algorithmic complexity designs (Big O), and optimized data structures implementations.",
        "Solved code challenges focused on binary tree manipulations, graph traversals, and dynamic programming."
      ],
      tags: ["Algorithms", "Data Structures", "Problem Solving", "Speed Programming"]
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 md:px-8 border-t border-white/5 relative bg-cyber-dark/80">
      {/* Decorative Blur Background */}
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyber-cyan/5 rounded-full blur-3xl"></div>

      <div className="max-w-5xl w-full mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Professional <span className="text-gradient-cyan-purple">Journey</span>
          </h2>
          <p className="text-slate-400">
            A chronological timeline of my professional roles, engineering contributions, and collaborative leadership experience.
          </p>
        </div>

        {/* Centralized Timeline List */}
        <div className="relative border-l border-white/10 md:pl-8 pl-6 space-y-12 max-w-4xl mx-auto">
          {experiences.map((exp, idx) => {
            const isExpanded = expandedIndex === idx;
            const isWork = exp.type === 'work';
            const isLeadership = exp.type === 'leadership';
            
            return (
              <div key={idx} className="relative group">
                
                {/* Timeline Dot with Active Ring */}
                <div className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-6 h-6 rounded-full border-4 border-cyber-dark flex items-center justify-center transition-all duration-300 ${
                  isExpanded 
                    ? 'bg-cyber-cyan shadow-[0_0_15px_rgba(34,211,238,0.8)] scale-110' 
                    : 'bg-slate-700 hover:bg-cyber-cyan/50'
                }`}>
                  {isWork ? (
                    <Briefcase className="w-2.5 h-2.5 text-cyber-dark" />
                  ) : isLeadership ? (
                    <Users className="w-2.5 h-2.5 text-cyber-dark" />
                  ) : (
                    <Award className="w-2.5 h-2.5 text-cyber-dark" />
                  )}
                </div>

                {/* Timeline Card */}
                <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                  isExpanded 
                    ? 'glass-panel border-cyber-cyan bg-slate-900/40 shadow-lg' 
                    : 'glass-panel border-white/5 hover:border-white/10 hover:bg-slate-900/20'
                }`}>
                  
                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer" onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}>
                    <div className="space-y-1 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-extrabold text-slate-100 text-lg group-hover:text-cyber-cyan transition-colors">
                          {exp.role}
                        </h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isWork ? 'bg-cyber-cyan/15 text-cyber-cyan' : isLeadership ? 'bg-cyber-purple/15 text-cyber-purple' : 'bg-cyber-yellow/15 text-cyber-yellow'
                        }`}>
                          {exp.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <button className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 group-hover:text-cyber-cyan transition-colors">
                      {isExpanded ? (
                        <>
                          Collapse <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Expand Details <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expandable Core content */}
                  {isExpanded && (
                    <div className="mt-6 border-t border-white/5 pt-4 space-y-4 text-left animate-fade-in-up">
                      <h4 className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-wider">
                        Key Accomplishments & Impact:
                      </h4>
                      <ul className="space-y-2.5">
                        {exp.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple mt-2 shrink-0"></span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Applied Technologies tags */}
                      <div className="pt-4 border-t border-white/5 space-y-2.5">
                        <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                          Technologies & Competencies:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-950 border border-white/5 text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
