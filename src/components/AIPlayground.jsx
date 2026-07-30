import React, { useState, useEffect, useRef } from 'react';
import { Terminal, RefreshCw, Send, ShieldCheck, Heart, AlertTriangle, FileText, Play } from 'lucide-react';

const SYSTEM_PROMPT =
  'You are OpenBioLLM, the clinical assistant for the DiagnoXpert platform. ' +
  'Act as a knowledgeable but cautious medical and dietary assistant. ' +
  'Give concise, practical guidance on nutrition, vitamins, lab biomarkers, and lifestyle. ' +
  'Keep replies short (2-4 sentences). When relevant, remind the user this is informational ' +
  'only and not a substitute for a licensed medical professional.';

export default function AIPlayground() {
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrDone, setOcrDone] = useState(false);
  const [reportType, setReportType] = useState('blood');
  
  // Chat state
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello! I am OpenBioLLM. Load a clinical scan or start asking me medical queries for simulated analysis." }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll the chat body to the latest message / typing indicator.
  // Skip the initial mount so the page doesn't jump to this section on load.
  const chatEndRef = useRef(null);
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isTyping]);

  const sampleReports = {
    blood: {
      rawText: "LAB RESULTS -- DEMO PATIENT\nHemoglobin: 11.2 g/dL (LOW)\nVitamin D3: 18 ng/mL (DEFICIENT)\nTSH: 2.4 mIU/L (NORMAL)\nPatient complains of fatigue, muscle weakness.",
      structured: {
        patient: "Demo Patient (Age 29)",
        conditions: ["Mild Anemia", "Vitamin D Deficient"],
        metrics: { hemoglobin: "11.2 g/dL (Low)", vitD: "18 ng/mL (Deficient)" },
        dietRecommendations: [
          "Increase intake of iron-rich foods: Spinach, red meat, lentils.",
          "Daily morning sun exposure & Vitamin D3 supplementation (2000 IU/day).",
          "Pair iron intake with Vitamin C (citrus fruit) to boost absorption."
        ]
      }
    },
    cardio: {
      rawText: "ECG DIAGNOSIS -- TEST PATIENT\nSinus Rhythm: 88 bpm (NORMAL)\nPR Interval: 140 ms (NORMAL)\nBP: 135/88 mmHg (ELEVATED)\nSymptoms: Occasional chest tightness during aerobic workouts.",
      structured: {
        patient: "Test Patient (Age 42)",
        conditions: ["Pre-hypertension", "Workout Chest tightness"],
        metrics: { bp: "135/88 mmHg (Elevated)", heartRate: "88 bpm (Normal)" },
        dietRecommendations: [
          "Adopt DASH Diet (low sodium, high magnesium/potassium).",
          "Reduce caffeine intake before physical exercise.",
          "Keep cardiovascular exertion levels strictly monitored."
        ]
      }
    }
  };

  const handleRunOCR = () => {
    setOcrLoading(true);
    setOcrDone(false);
    setTimeout(() => {
      setOcrLoading(false);
      setOcrDone(true);
      
      // Feed OCR results into chat automatically
      const reportData = sampleReports[reportType];
      const botReply = `[SYSTEM SCAN COMPLETED]\n\nExtracted Details:\n- Patient: ${reportData.structured.patient}\n- Findings: ${reportData.structured.conditions.join(', ')}\n- Key Metrics: ${JSON.stringify(reportData.structured.metrics)}\n\nLlama3-OpenBioLLM Clinical Analysis:\nWe recommend: \n${reportData.structured.dietRecommendations.map((d, i) => `${i+1}. ${d}`).join('\n')}`;
      
      setMessages(prev => [
        ...prev,
        { role: 'user', text: `Run OCR Analysis on scan: ${reportType.toUpperCase()}_REPORT.jpg` },
        { role: 'assistant', text: botReply }
      ]);
    }, 1500);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;

    const userMsg = inputVal;
    setInputVal('');

    // Map our {role, text} messages to the {role, content} shape the API uses.
    const history = messages.map((m) => ({ role: m.role, content: m.text }));

    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      // Call Groq directly from the browser. NOTE: VITE_ env vars are bundled
      // into the client build, so this key is publicly visible — use a free
      // throwaway key and rotate it if abused.
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) throw new Error('Missing VITE_GROQ_API_KEY');

      const recent = [...history, { role: 'user', content: userMsg }]
        .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .slice(-10);

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...recent],
          max_tokens: 300,
          temperature: 0.6,
        }),
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      const data = await res.json();
      const reply = (data?.choices?.[0]?.message?.content || '').trim();
      if (!reply) throw new Error('Empty response');

      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text:
            "[Connection error] I couldn't reach the AI service just now. " +
            'Please try again in a moment.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="playground" className="py-24 px-4 md:px-8 border-t border-white/5 relative bg-cyber-dark">
      {/* Visual floating neon ring */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyber-green/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl w-full mx-auto relative z-10 space-y-12 text-center">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            Interactive Sandbox
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            DiagnoXpert <span className="text-gradient-cyan-green">AI Playground</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Simulate a medical consultation system. Select a mock patient scan to extract fields via OCR, and prompt the LLM clinical assistant for dietary guidance.
          </p>
        </div>

        {/* Playground console grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto text-left">
          
          {/* Left panel: Scan & OCR Simulator */}
          <div className="lg:col-span-5 rounded-2xl glass-panel p-5 border-white/5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <FileText className="w-5 h-5 text-cyber-green" />
                <h3 className="font-extrabold text-slate-100 text-base">Step 1: Scanned Lab Report</h3>
              </div>

              {/* Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-500">SELECT SAMPLE SCAN TYPE</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setReportType('blood'); setOcrDone(false); }}
                    className={`p-3.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                      reportType === 'blood' 
                        ? 'border-cyber-green bg-cyber-green/5 text-cyber-green shadow-[0_0_12px_rgba(74,222,128,0.15)]'
                        : 'bg-slate-950/60 border-white/5 text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    Blood Panel Report
                  </button>
                  <button
                    onClick={() => { setReportType('cardio'); setOcrDone(false); }}
                    className={`p-3.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                      reportType === 'cardio' 
                        ? 'border-cyber-green bg-cyber-green/5 text-cyber-green shadow-[0_0_12px_rgba(74,222,128,0.15)]'
                        : 'bg-slate-950/60 border-white/5 text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    Cardio Assessment
                  </button>
                </div>
              </div>

              {/* Preview console */}
              <div className="relative">
                <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950 text-[8px] font-mono text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  RAW IMAGE SOURCE
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-400 border border-white/5 leading-relaxed overflow-x-auto min-h-[120px]">
                  {sampleReports[reportType].rawText}
                </pre>
              </div>
            </div>

            {/* OCR trigger button */}
            <div className="pt-4 border-t border-white/5">
              <button
                onClick={handleRunOCR}
                disabled={ocrLoading}
                className="w-full py-3.5 rounded-xl bg-cyber-green text-cyber-dark font-bold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(74,222,128,0.4)] disabled:opacity-50 transition-all cursor-pointer"
              >
                {ocrLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Extracting Medical Data via OCR...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run OCR Scan Extraction
                  </>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-cyber-green" />
                Runs client-side simulation logic.
              </div>
            </div>

          </div>

          {/* Right panel: Doctor & AI Chat console */}
          <div className="lg:col-span-7 rounded-2xl glass-panel p-5 border-white/5 flex flex-col justify-between min-h-[420px]">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyber-cyan" />
                <div>
                  <h3 className="font-extrabold text-slate-100 text-sm">Llama3-OpenBioLLM</h3>
                  <p className="text-[10px] text-slate-500 font-mono">CLINICAL SUITE ASSISTANT</p>
                </div>
              </div>

              {/* Status lights */}
              <div className="flex gap-1.5 items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-cyber-green animate-pulse"></span>
                <span className="text-[10px] font-mono text-slate-400">ONLINE</span>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto max-h-[300px] my-4 pr-1 space-y-3 font-sans">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'bg-slate-900/60 border border-white/5 text-slate-200 mr-auto'
                      : 'bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan ml-auto'
                  }`}
                >
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase mb-1">
                    {msg.role === 'assistant' ? 'OpenBioLLM' : 'User'}
                  </span>
                  <pre className="whitespace-pre-wrap font-sans text-xs">{msg.text}</pre>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 pl-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>OpenBioLLM is thinking...</span>
                </div>
              )}

              {/* Scroll anchor: keeps the newest message in view */}
              <div ref={chatEndRef} />
            </div>

            {/* Prompt input form */}
            <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-white/5">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about diet chart, vitamins, or fatigue remedies..."
                className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-white/5 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyber-cyan/40 placeholder:text-slate-600"
              />
              <button
                type="submit"
                className="px-4 py-3 rounded-xl bg-cyber-cyan text-cyber-dark hover:bg-cyber-cyan/85 hover:shadow-[0_0_12px_rgba(34,211,238,0.3)] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>

        {/* Warning card */}
        <div className="max-w-2xl mx-auto p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-left flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-400 leading-normal">
            <strong className="text-amber-500 font-bold">Important Notice:</strong> This AI playground is a simulated application demo modeling the core capabilities of the <strong>DiagnoXpert</strong> platform. It displays how client-side OCR extraction feeds directly into conversational clinical pipelines. It does not replace real clinical analysis.
          </div>
        </div>

      </div>
    </section>
  );
}
