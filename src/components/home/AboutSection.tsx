import React from 'react';
import {
  Award,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Mail,
  Phone,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Globe,
  Clock,
  ArrowUpRight,
  TrendingUp,
  UserCheck,
  Layers,
  Activity,
  Headphones,
  Bot,
  Zap,
  BarChart3
} from 'lucide-react';
import { OWNER_INFO } from '../../data/mockData';

interface AboutSectionProps {
  onOpenLeadModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenLeadModal }) => {
  return (
    <section id="about-section" className="py-20 sm:py-28 bg-[#05070a] border-t border-white/10 relative overflow-hidden">
      {/* Dynamic Interaction Analytics & AI Integration Background Theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Deep Ambient Glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-[130px]" />

        {/* Tech Grid Matrix */}
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.12]" />

        {/* Decorative SVG: Audio Waveform & Speech Spectral Stream */}
        <svg
          className="absolute top-8 right-[-10%] w-[650px] lg:w-[850px] h-[400px] text-indigo-500/10 stroke-current opacity-70"
          fill="none"
          viewBox="0 0 800 350"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 175 Q 80 40, 160 175 T 320 175 T 480 175 T 640 175 T 800 175"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <path
            d="M 0 175 Q 70 260, 150 175 T 300 175 T 450 175 T 600 175 T 750 175"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          <path
            d="M 50 175 C 120 70, 200 280, 280 175 S 420 50, 500 175 S 650 300, 720 175"
            stroke="url(#analytics-gradient)"
            strokeWidth="2"
            strokeOpacity="0.4"
          />
          <defs>
            <linearGradient id="analytics-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Telemetry & AI Stream Watermark Nodes */}
        <div className="absolute top-12 left-8 hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] text-[10px] font-mono text-slate-500 opacity-60">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>SPEECH_NLP :: 99.4% INTENT_TRIAGE</span>
        </div>
        <div className="absolute bottom-16 right-12 hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] text-[10px] font-mono text-slate-500 opacity-60">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span>OMNICHANNEL_INTERACTION_STREAM // ACTIVE_AUDIT</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Profile Card Bento Box with Interaction Analytics & AI Architecture */}
          <div className="lg:col-span-5 bento-card p-6 sm:p-8 space-y-6 relative overflow-hidden">
            {/* Subtle inner card accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl opacity-20 blur-md"></div>

              <div className="relative rounded-2xl border border-white/15 bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-[#05070a] p-6 sm:p-7 space-y-5">
                {/* Header Crest & Verification */}
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-950/40 relative">
                    <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-indigo-200 via-white to-cyan-200 tracking-wider font-mono">
                      SM
                    </span>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#05070a] flex items-center justify-center" title="Verified Practitioner">
                      <UserCheck className="w-3 h-3 text-black" />
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      Founder & Lead Architect
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-end gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" /> 15+ Yrs Industry Veteran
                    </p>
                  </div>
                </div>

                {/* Identity Title */}
                <div className="pt-1">
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">{OWNER_INFO.name}</h3>
                  <p className="text-xs font-semibold text-indigo-300 mt-1">{OWNER_INFO.title}</p>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Interaction Analytics • CX & Quality Transformation • Applied Generative AI Pipelines
                  </p>
                </div>

                {/* Dual Core Pillars: Interaction Analytics, CX & Quality Transformation + Applied AI */}
                <div className="space-y-2.5 pt-1">
                  {/* Pillar 1: Interaction Analytics, CX & Quality Transformation */}
                  <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/25 hover:border-indigo-500/40 transition-colors text-left">
                    <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold">
                      <div className="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                        <Headphones className="w-3.5 h-3.5 text-indigo-300" />
                      </div>
                      <span>Interaction Analytics, CX & Quality Transformation</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1.5 pl-8 leading-relaxed">
                      Speech acoustics, omnichannel conversation audits, Gemba root-cause analysis, and systematic customer friction elimination.
                    </p>
                  </div>

                  {/* Pillar 2: Applied Generative AI Integration */}
                  <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/25 hover:border-cyan-500/40 transition-colors text-left">
                    <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold">
                      <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                        <Bot className="w-3.5 h-3.5 text-cyan-300" />
                      </div>
                      <span>Applied AI Integration & Workflow Engines</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1.5 pl-8 leading-relaxed">
                      Gemini prompt engineering, WhatsApp instant triage bots, automated telecaller scorecards, and revenue recovery workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="p-4 rounded-2xl bento-subcard text-xs space-y-2.5">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Email:</span>
                </span>
                <a href={`mailto:${OWNER_INFO.email}`} className="font-semibold text-white hover:text-indigo-300 transition-colors">
                  {OWNER_INFO.email}
                </a>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp / Direct:</span>
                </span>
                <a href={OWNER_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] hover:underline">
                  {OWNER_INFO.phone}
                </a>
              </div>
            </div>

            {/* Core Competencies Badges */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Core Competencies & Domain Expertise:
              </span>
              <div className="flex flex-wrap gap-2">
                {OWNER_INFO.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-white/5 text-slate-300 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Philosophy & Journey Timeline Bento Box */}
          <div className="lg:col-span-7 bento-card p-6 sm:p-8 space-y-6 relative overflow-hidden">
            {/* Subtle inner background glow */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                <span>About the Creator</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Bridging Interaction Analytics, CX & Quality Transformation with Applied AI
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              I bring <strong className="text-white">15+ years of hands-on leadership</strong> across Interaction Analytics, CX & Quality Transformation, root-cause process audits, and customer conversation intelligence. Today, I fuse that battle-tested domain rigor with modern applied Generative AI, automated WhatsApp triage pipelines, and intelligent business scorecards to eliminate revenue leakage and accelerate conversion for mid-market enterprises.
            </p>

            {/* Interaction Analytics & AI Architecture Diagnostic Callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-cyan-950/40 border border-indigo-500/25 text-indigo-200 text-xs sm:text-sm leading-relaxed flex items-start gap-3.5 shadow-lg shadow-indigo-950/20">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <strong className="text-white block font-bold mb-1">
                  Interaction Analytics + Applied AI in Action:
                </strong>
                Every interactive demo on this platform is a working diagnostic system—evaluating conversation transcripts, audio telecaller acoustics, multi-channel customer reviews, and enterprise lead leakages in real-time.
              </div>
            </div>

            {/* AI Journey & Transformation Timeline */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Experience & Transformation Roadmap</span>
                </span>
                <span className="text-[11px] font-mono text-indigo-400 font-semibold">2011 — Present</span>
              </h4>

              <div className="space-y-3">
                {OWNER_INFO.journeyTimeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bento-subcard text-xs flex flex-col md:flex-row md:items-start justify-between gap-3 hover:border-indigo-500/30 transition-all group"
                  >
                    <div className="md:w-5/12 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {item.period}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {item.badge}
                        </span>
                      </div>
                      <strong className="text-white font-bold text-xs sm:text-sm block group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </strong>
                      <p className="text-[11px] text-slate-400 font-medium">{item.role}</p>
                    </div>
                    <div className="md:w-7/12">
                      <p className="text-slate-300 leading-relaxed text-xs">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenLeadModal}
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 border border-indigo-400/30"
              >
                <span>Discuss Your Business Problem</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={OWNER_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-semibold text-xs sm:text-sm border border-[#25D366]/30 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


