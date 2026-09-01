import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  Bot,
  Layers,
  Activity,
  Award,
  Star,
  CheckCircle2,
  Cpu,
  Zap,
  TrendingUp,
  Scan,
  ShieldCheck,
  Mail,
  Phone,
  ArrowUpRight,
  UserCheck
} from 'lucide-react';
import { OWNER_INFO } from '../../data/mockData';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
  onOpenLeadModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenLeadModal }) => {
  return (
    <section id="hero-section" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        
        {/* Top Bento Grid Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Hero Bento Card (8 Columns) */}
          <div className="lg:col-span-8 bento-card p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/15 transition-all"></div>
            
            <div className="space-y-6 relative z-10">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-slate-200 shadow-sm backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>AI Solutions Showcase & Interactive Platform</span>
                <span className="text-white/20">•</span>
                <span className="text-indigo-400">By Shailendra Mishra</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Practical AI.{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                  Real Business Problems.
                </span>{' '}
                Measurable Action.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                Turn customer interactions, missed follow-ups, and sales conversations into measurable business growth. Test 6 functional AI demos powered by real Gemini models.
              </p>

              {/* Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  id="hero-explore-demos-btn"
                  onClick={() => onNavigate('/demos/interaction-analyzer')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 border border-indigo-400/30"
                >
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  <span>Test Working AI Demos</span>
                </button>

                <button
                  id="hero-free-scan-btn"
                  onClick={() => onNavigate('/scan')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 font-semibold text-sm border border-purple-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Scan className="w-4 h-4 text-purple-400" />
                  <span>Free AI Opportunity Scan</span>
                </button>

                <a
                  id="hero-whatsapp-btn"
                  href={OWNER_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-semibold text-sm border border-[#25D366]/30 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Shailendra</span>
                </a>
              </div>
            </div>

            {/* Trust Badges inside card */}
            <div className="pt-8 mt-8 border-t border-white/5 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium relative z-10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">15+ Years Speech Analytics & CX</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">6 Working Interactive Demos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Zero Mock Placeholders / Real Backend</span>
              </div>
            </div>
          </div>

          {/* Profile & Credibility Bento Card (4 Columns) */}
          <div className="lg:col-span-4 bento-card p-6 sm:p-7 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                  Creator & AI Builder
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Available for Consult
                </span>
              </div>

              {/* Shailendra Profile Card */}
              <div className="flex items-center gap-4 pt-1">
                <div className="w-14 h-14 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-950/40 relative group-hover:border-indigo-500/50 transition-colors">
                  <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-300 via-white to-cyan-300 tracking-wider font-mono">
                    SM
                  </span>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#05070a] flex items-center justify-center">
                    <UserCheck className="w-3 h-3 text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-snug">{OWNER_INFO.name}</h3>
                  <p className="text-xs text-indigo-300 font-medium">{OWNER_INFO.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{OWNER_INFO.experienceYears} Years Quality & CX Leadership</p>
                </div>
              </div>

              {/* Mini Bio Quote */}
              <div className="bento-subcard p-3.5 text-xs text-slate-300 leading-relaxed">
                "I bridge 15+ years of customer speech analytics and contact center QA with applied Gemini AI to eliminate operational friction."
              </div>

              {/* Direct Info Pills */}
              <div className="space-y-2 text-xs">
                <a
                  href={`mailto:${OWNER_INFO.email}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{OWNER_INFO.email}</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href={OWNER_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 text-[#25D366] transition-colors font-medium"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{OWNER_INFO.phone}</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#25D366]/20 px-2 py-0.5 rounded-md">Chat</span>
                </a>
              </div>
            </div>

            <button
              onClick={onOpenLeadModal}
              className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Submit My Business Problem</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            </button>
          </div>

        </div>

        {/* Bottom Bento Row: Lifecycle Visualizer & Tech Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Tech Engine Bento Tile (4 Columns) */}
          <div className="lg:col-span-4 bento-card p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                  AI Architecture Stack
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="bento-subcard p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Gemini 3.7 Flash</div>
                      <div className="text-[10px] text-slate-400">Server-Side Low Latency API</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-indigo-300 bg-indigo-500/15 px-2 py-0.5 rounded">
                    PROD
                  </span>
                </div>

                <div className="bento-subcard p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Speech QA Matrix</div>
                      <div className="text-[10px] text-slate-400">15+ Yr Quality Scoring Model</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded">
                    100%
                  </span>
                </div>

                <div className="bento-subcard p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-xs font-bold text-white">WhatsApp & CRM Webhooks</div>
                      <div className="text-[10px] text-slate-400">Instant Lead Dispatch Engine</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded">
                    &lt; 500ms
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('/solutions')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center justify-between pt-2 border-t border-white/5 group"
            >
              <span>Explore full 4-pillar solution blueprint</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Operational Workflow Bento Tile (8 Columns) */}
          <div className="lg:col-span-8 bento-card p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  End-to-End Operational Lifecycle
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  How AI GrowthLab Dismantles Customer Friction
                </h3>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Sample Enterprise Pipeline
              </div>
            </div>

            {/* Workflow Steps Bento Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {[
                { step: '01', title: 'Inquiry', desc: 'WhatsApp, Web, Voice calls', icon: MessageSquare, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
                { step: '02', title: 'Intake', desc: 'Multi-turn chat & speech audio', icon: Bot, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
                { step: '03', title: 'Audit', desc: '15+ yr QA matrix & root cause', icon: Cpu, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
                { step: '04', title: 'Risk Score', desc: 'Sentiment & leakage triage', icon: Activity, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                { step: '05', title: 'Dispatch', desc: 'Instant quote & rep alerts', icon: Zap, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                { step: '06', title: 'Action ROI', desc: 'Recovered deals & coached reps', icon: TrendingUp, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bento-subcard flex flex-col justify-between space-y-3 hover:border-indigo-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500 font-bold">{item.step}</span>
                      <div className={`p-1.5 rounded-lg border ${item.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

