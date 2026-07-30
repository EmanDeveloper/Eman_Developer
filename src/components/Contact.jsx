import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Copy, Check, AlertTriangle } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';

// ── Email delivery (Web3Forms) ──────────────────────────────────────────────
// A static site can't send email on its own, so submissions go through Web3Forms
// (free, no backend). Get a key in ~30s: visit https://web3forms.com, enter
// memankhadim@gmail.com, then paste the emailed access key below (or set the
// VITE_WEB3FORMS_ACCESS_KEY env var). Until then, the form falls back to mailto.
const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY';
const CONTACT_EMAIL = 'memankhadim@gmail.com';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Fallback for when no Web3Forms key is configured yet: open a prefilled draft.
  const openMailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setError('');
    const keyConfigured =
      WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY';

    // No key yet → keep the site functional via the visitor's mail client.
    if (!keyConfigured) {
      openMailtoFallback();
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio Inquiry from ${formState.name}`,
          from_name: 'Portfolio Contact Form',
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setIsSent(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSent(false), 6000);
      } else {
        throw new Error(data.message || 'Delivery failed');
      }
    } catch {
      setError(`Couldn't send right now. Please email me directly at ${CONTACT_EMAIL}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 border-t border-white/5 relative bg-cyber-dark">
      {/* Background neon light */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyber-cyan/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Let's <span className="text-gradient-cyan-purple">Connect</span>
          </h2>
          <p className="text-slate-400">
            Have a project in mind, a remote opportunity, or simply want to say hello? Send a transmission below.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left max-w-5xl mx-auto">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-100">Contact Details</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm active in remote communication networks. Email or LinkedIn are the fastest routes to schedule a sync.
              </p>

              {/* Grid lists */}
              <div className="space-y-4">
                <div className="flex items-center gap-3.5 p-4 rounded-xl glass-panel border-white/5 hover:border-cyber-cyan/35 hover:bg-slate-900/20 transition-all duration-300 group">
                  <div className="p-2.5 rounded-lg bg-cyber-cyan/15 text-cyber-cyan">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-mono">EMAIL ADDRESS</p>
                    <div className="flex items-center gap-2">
                      <a href="mailto:memankhadim@gmail.com" className="text-sm font-semibold text-slate-200 hover:text-cyber-cyan transition-colors">
                        memankhadim@gmail.com
                      </a>
                      <button 
                        onClick={handleCopyEmail}
                        className="text-slate-500 hover:text-slate-300 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? <Check className="w-4 h-4 text-cyber-green" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-xl glass-panel border-white/5 hover:border-cyber-purple/35 hover:bg-slate-900/20 transition-all duration-300 group">
                  <div className="p-2.5 rounded-lg bg-cyber-purple/15 text-cyber-purple">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-mono">PHONE NUMBER</p>
                    <a href="tel:+923446010309" className="text-sm font-semibold text-slate-200 hover:text-cyber-purple transition-colors">
                      +92 344-6010309
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-xl glass-panel border-white/5 hover:border-cyber-green/35 hover:bg-slate-900/20 transition-all duration-300 group">
                  <div className="p-2.5 rounded-lg bg-cyber-green/15 text-cyber-green">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-mono">LOCATION</p>
                    <p className="text-sm font-semibold text-slate-200">
                      Sahiwal, Pakistan (Open to Remote / Relocation)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social footer block */}
            <div className="pt-6 border-t border-white/5">
              <p className="text-[10px] font-mono text-slate-500 mb-3">PROFESSIONAL NETWORKS</p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/EmanDeveloper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border-white/5 text-xs text-slate-300 font-medium hover:text-cyber-cyan hover:border-cyber-cyan/35 transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub Profile
                </a>
                <a
                  href="https://www.linkedin.com/in/eman-developer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border-white/5 text-xs text-slate-300 font-medium hover:text-cyber-purple hover:border-cyber-purple/35 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </div>

          </div>

          {/* Right message input form */}
          <div className="lg:col-span-7 rounded-2xl glass-panel p-6 border-white/5 relative">
            {isSent && (
              <div className="absolute inset-0 rounded-2xl bg-slate-950/95 backdrop-blur-sm z-20 flex flex-col justify-center items-center text-center p-6 space-y-4 animate-fade-in-up">
                <CheckCircle className="w-16 h-16 text-cyber-green animate-bounce" />
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-100 text-lg">Message Sent!</h3>
                  <p className="text-sm text-slate-400 max-w-sm">
                    Thanks for reaching out — your message was delivered to my inbox. I'll get back to
                    you via email shortly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-slate-100 mb-2">Send Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/5 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyber-cyan/40 placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/5 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyber-cyan/40 placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-500">MESSAGE CONTENT</label>
                <textarea
                  required
                  rows="4"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your inquiry, position role, or business idea..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/5 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyber-cyan/40 placeholder:text-slate-600 resize-none"
                ></textarea>
              </div>

              {error && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-cyber-dark font-bold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:opacity-50 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING MESSAGE...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Transmit Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Footer legalities */}
        <div className="pt-12 border-t border-white/5 text-center text-[10px] font-mono text-slate-600">
          <p>© 2026 Eman Khadim. Engineered with React, Tailwind CSS, & Lucide Icons.</p>
        </div>

      </div>
    </section>
  );
}
