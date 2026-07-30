import React from 'react';
import { GraduationCap, Award, Trophy, Users, BadgeCheck } from 'lucide-react';

export default function Education() {
  const certifications = [
    {
      title: 'Introduction to MySQL',
      issuer: 'DataCamp',
      blurb: 'Relational database design, querying, joins, and aggregation fundamentals.',
      color: 'text-cyber-green border-cyber-green/30 bg-cyber-green/5',
    },
    {
      title: 'Introduction to Artificial Intelligence',
      issuer: 'DataCamp',
      blurb: 'Core AI concepts, machine learning intuition, and applied model workflows.',
      color: 'text-cyber-purple border-cyber-purple/30 bg-cyber-purple/5',
    },
  ];

  const activities = [
    {
      icon: Users,
      title: 'Final Year Project Team Lead',
      blurb:
        'Led a team of 4 developers, owning frontend, backend, AI integration, OCR systems, deployment, and task coordination.',
      color: 'text-cyber-cyan',
    },
    {
      icon: Trophy,
      title: 'University Coding Competitions',
      blurb:
        'Competed in university-level coding competitions, sharpening problem-solving and algorithmic skills.',
      color: 'text-cyber-yellow',
    },
  ];

  return (
    <section
      id="education"
      className="py-24 px-4 md:px-8 border-t border-white/5 relative bg-cyber-dark/80"
    >
      {/* Decorative blur background */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-cyber-purple/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Education &amp; <span className="text-gradient-cyan-purple">Credentials</span>
          </h2>
          <p className="text-slate-400">
            Academic foundation, professional certifications, and the leadership activities that
            shaped my engineering discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Education card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyber-cyan uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              Academic Background
            </div>

            <div className="p-6 rounded-2xl glass-panel glass-panel-hover border border-white/5 space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/20 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-100 leading-tight">
                    BS in Computer Science
                  </h3>
                  <p className="text-sm text-cyber-purple font-semibold">
                    COMSATS University Islamabad (CUI)
                  </p>
                  <p className="text-xs text-slate-500 font-mono">Sahiwal Campus</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-5 border-t border-white/5">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-center">
                  <p className="text-[10px] font-mono text-slate-500 mb-1">CGPA</p>
                  <p className="text-lg font-extrabold text-cyber-green">3.27 / 4.0</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-center">
                  <p className="text-[10px] font-mono text-slate-500 mb-1">DEGREE</p>
                  <p className="text-lg font-extrabold text-cyber-cyan">BSCS</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {['Data Structures', 'Algorithms', 'DBMS', 'Web Engineering', 'AI', 'OOP'].map(
                  (course) => (
                    <span
                      key={course}
                      className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-950 border border-white/5 text-slate-400"
                    >
                      {course}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Certifications + Activities */}
          <div className="lg:col-span-7 space-y-8">
            {/* Certifications */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyber-green uppercase tracking-wider">
                <BadgeCheck className="w-4 h-4" />
                Certifications
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="p-5 rounded-2xl glass-panel glass-panel-hover border border-white/5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <Award className="w-7 h-7 text-cyber-yellow" />
                      <span
                        className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-md border ${cert.color}`}
                      >
                        {cert.issuer}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-100 text-sm leading-snug">{cert.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{cert.blurb}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership & Activities */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyber-purple uppercase tracking-wider">
                <Trophy className="w-4 h-4" />
                Leadership &amp; Activities
              </div>

              <div className="space-y-3">
                {activities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <div
                      key={act.title}
                      className="flex items-start gap-4 p-4 rounded-2xl glass-panel border border-white/5 hover:border-white/10 transition-all"
                    >
                      <div className={`p-2.5 rounded-xl bg-slate-950/60 border border-white/5 ${act.color} shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-100 text-sm">{act.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{act.blurb}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
