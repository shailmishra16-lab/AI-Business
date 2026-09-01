import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  Bot,
  Zap,
  Activity,
  Award,
  Sparkles,
  CheckCircle2,
  Code2,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { OWNER_INFO } from '../../data/mockData';

interface SolutionsPageProps {
  onOpenLeadModal: (context?: string) => void;
  onNavigateDemo: (demoId: string) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onOpenLeadModal, onNavigateDemo }) => {
  const [activeTab, setActiveTab] = useState<'build' | 'automate' | 'understand' | 'improve'>('build');

  const pillars = [
    {
      id: 'build' as const,
      label: '1. BUILD',
      title: 'Build Interactive AI Tools & Custom Portals',
      subtitle: 'Customer-facing apps, quote calculators, AI diagnosis tools & internal dashboards',
      desc: 'Move past static websites. We design responsive web applications and portals where customers receive instant value, quote calculations, and personalized recommendations powered by Gemini API.',
      features: [
        'Interactive Quote & ROI Estimators for high-ticket sales',
        'Customer-facing Diagnosis & Symptom/Requirement Checkers',
        'Custom Admin & Telecalling Operation Portals',
        'Production-grade High-Performance Architecture on Cloud Run',
      ],
      demoLink: '/demos/interaction-analyzer',
      demoTitle: 'Try Interaction Analyzer Demo',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      id: 'automate' as const,
      label: '2. AUTOMATE',
      title: 'Automate Lead Follow-ups & Omnichannel Intake',
      subtitle: '24/7 WhatsApp AI qualification, instant PDF quotes & CRM sync',
      desc: 'Eliminate the 4-hour lead decay window. Our automation pipelines qualify new inquiries on WhatsApp within 30 seconds, calculate pricing, and alert sales representatives with full context.',
      features: [
        'Sub-60s WhatsApp conversational intake & qualification',
        'Instant dynamic PDF brochure & quote dispatch',
        'Automated multi-touch follow-up cadences on WhatsApp & SMS',
        'Real-time webhook notifications pushed to floor sales reps',
      ],
      demoLink: '/demos/lead-health',
      demoTitle: 'Try Lead Leakage Calculator',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'understand' as const,
      label: '3. UNDERSTAND',
      title: 'Understand Customer Interactions & Root Causes',
      subtitle: 'Omnichannel sentiment analysis, repeated complaint audits & churn detection',
      desc: 'Aggregate hundreds of chats, emails, recorded audio calls, and reviews into actionable management dashboards. Discover exactly why leads stall, which competitors are mentioned, and what staff errors repeat.',
      features: [
        'Root-cause pain point extraction from unstructured conversations',
        'Negative sentiment & churn risk real-time alerts',
        'Competitor price comparison & objection categorization',
        'Executive summaries with prioritized management roadmaps',
      ],
      demoLink: '/demos/customer-voice',
      demoTitle: 'Try Customer Voice Intelligence',
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
    {
      id: 'improve' as const,
      label: '4. IMPROVE',
      title: 'Improve Sales Conversations & Speech QA',
      subtitle: '100% speech analytics audits, scorecard grading & roleplay drills',
      desc: 'Leverage Shailendra Mishra’s 15+ years in QA and Speech Analytics. Evaluate 100% of sales calls across 8 quality parameters without paying massive enterprise speech analytics licensing fees.',
      features: [
        'Standardized 8-point QA scorecard grading for sales calls',
        'Discovery & requirement identification scoring',
        'Objection handling & closing commitment analysis',
        'Actionable roleplay drills and script improvement suggestions',
      ],
      demoLink: '/demos/sales-coach',
      demoTitle: 'Try Sales Conversation Coach',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
  ];

  const currentPillar = pillars.find((p) => p.id === activeTab)!;

  return (
    <div id="solutions-page" className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Layers className="w-3.5 h-3.5" />
          <span>Core AI GrowthLab Offerings</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          4 Pillars of Applied AI Solutions
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          From customer-facing interactive web tools to automated WhatsApp follow-ups and speech analytics quality scorecards.
        </p>
      </div>

      {/* 4 Pillars Navigation Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            onClick={() => setActiveTab(pillar.id)}
            className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
              activeTab === pillar.id
                ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span
              className={`text-xs font-extrabold tracking-wider ${
                activeTab === pillar.id ? 'text-blue-400' : 'text-slate-400'
              }`}
            >
              {pillar.label}
            </span>
            <div className="mt-2">
              <h3 className="text-sm font-bold leading-snug">{pillar.title.split('&')[0]}</h3>
              <p
                className={`text-[11px] mt-1 line-clamp-2 ${
                  activeTab === pillar.id ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                {pillar.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Active Pillar Showcase Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${currentPillar.color}`}>
              Pillar Focus: {currentPillar.label}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {currentPillar.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">{currentPillar.subtitle}</p>
          </div>

          <button
            onClick={() => onOpenLeadModal(`I want to discuss implementing ${currentPillar.title} for our business.`)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all self-start md:self-auto"
          >
            <span>Request Custom Solution</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
          {currentPillar.desc}
        </p>

        {/* Feature Checkpoints */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Included Capabilities & Deliverables:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentPillar.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs sm:text-sm text-slate-800"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Try Associated Demo Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-bold text-white">
              Experience the working prototype right now
            </h4>
            <p className="text-xs text-slate-300">
              Run interactive tests with sample or custom business data.
            </p>
          </div>

          <button
            onClick={() => onNavigateDemo(currentPillar.demoLink)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentPillar.demoTitle}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
