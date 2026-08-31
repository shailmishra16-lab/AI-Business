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
  BarChart,
  ShieldCheck,
  Globe,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { OWNER_INFO } from '../../data/mockData';

interface AboutSectionProps {
  onOpenLeadModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenLeadModal }) => {
  return (
    <section id="about-section" className="py-16 sm:py-24 bg-[#05070a] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Profile Card Bento Box */}
          <div className="lg:col-span-5 bento-card p-6 sm:p-8 space-y-6">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl opacity-30 blur-md"></div>

              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-slate-900">
                <img
                  src="/assets/shailendra_mishra.jpg"
                  alt="Shailendra Mishra"
                  className="w-full h-auto object-cover object-top aspect-[4/5] hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/80 to-transparent p-5 text-white">
                  <h3 className="text-xl font-bold text-white">{OWNER_INFO.name}</h3>
                  <p className="text-xs text-indigo-300 font-medium">{OWNER_INFO.title}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{OWNER_INFO.experienceYears} Years Quality & CX Experience</p>
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
                Core Competencies & Stack:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Speech & Call Analytics',
                  '100% Quality Scorecards',
                  'Root Cause Analysis',
                  'Gemini 3.7 & LLM Prompting',
                  'WhatsApp Business API',
                  'Full-Stack TypeScript & React',
                  'Customer Churn Mitigation',
                  'CRM & Lead Pipeline Automation',
                ].map((skill, idx) => (
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
          <div className="lg:col-span-7 bento-card p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                <span>About the Creator</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Bridging 15+ Years of Quality Management with Applied Generative AI
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              I bring <strong className="text-white">15+ years of experience</strong> in customer experience, quality management, speech analytics, and interaction analysis. I'm now combining that deep domain experience with modern AI, workflow automation, and full-stack software development to build practical solutions for growing businesses.
            </p>

            {/* Prototype / Journey Transparency Notice */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 block font-bold mb-0.5">My AI Building Journey:</strong>
                This website is also part of my public AI building journey. Every demo is a functional working prototype connected to live Gemini models. I continuously build and refine custom systems for dealerships, clinics, coaching institutes, and professional firms.
              </div>
            </div>

            {/* AI Journey Timeline */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Experience & Evolution Roadmap</span>
              </h4>

              <div className="space-y-2.5">
                {[
                  {
                    period: '2009 – 2017',
                    role: 'Speech Analytics & Quality Operations',
                    desc: 'Conducted in-depth conversation audits, speech acoustics analysis, and agent scorecard frameworks across high-volume contact centers.',
                  },
                  {
                    period: '2017 – 2022',
                    role: 'CX Strategy & Quality Leadership',
                    desc: 'Led omnichannel quality initiatives, root-cause defect elimination, customer sentiment indexing, and executive reporting.',
                  },
                  {
                    period: '2022 – 2024',
                    role: 'Applied AI & Workflow Automation',
                    desc: 'Engineered custom prompt pipelines, automated WhatsApp intake workflows, and CRM synchronization integrations.',
                  },
                  {
                    period: '2025 – Present',
                    role: 'Founder & AI Builder @ AI GrowthLab',
                    desc: 'Architecting custom conversational bots, speech QA platforms, and revenue leakage recovery engines for mid-market businesses.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bento-subcard text-xs flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 hover:border-indigo-500/30 transition-colors"
                  >
                    <div className="sm:w-1/3">
                      <span className="text-[11px] font-mono font-bold text-indigo-400 block">{item.period}</span>
                      <strong className="text-white font-bold">{item.role}</strong>
                    </div>
                    <p className="sm:w-2/3 text-slate-400 leading-relaxed text-[11px]">
                      {item.desc}
                    </p>
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

