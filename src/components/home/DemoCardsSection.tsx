import React from 'react';
import {
  MessageSquareText,
  Activity,
  Layers,
  Award,
  Star,
  Bot,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';

interface DemoCardsSectionProps {
  onNavigate: (path: string) => void;
}

export const DemoCardsSection: React.FC<DemoCardsSectionProps> = ({ onNavigate }) => {
  const demos = [
    {
      id: 'interaction-analyzer',
      path: '/demos/interaction-analyzer',
      title: 'Customer Interaction Analyzer',
      tagline: 'Deep sentiment, root-cause pain point & urgency triage',
      description: 'Paste any customer chat or email to extract underlying intent, business risk, follow-up priority, and receive a ready-to-send empathetic reply with audio synthesis.',
      badge: 'Live Backend',
      icon: MessageSquareText,
      color: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400',
      badgeColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
      btnText: 'Test Interaction Analyzer',
    },
    {
      id: 'customer-voice',
      path: '/demos/customer-voice',
      title: 'Customer Voice & Multichannel Intelligence',
      tagline: 'Aggregate chats, calls & reviews across 9 industries',
      description: 'Audit hundreds of omnichannel interactions across automobile, clinics, coaching, real estate, and more. Visualizes sentiment splits, top pain points, and executive action recommendations.',
      badge: 'Multi-Industry',
      icon: Activity,
      color: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
      badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      btnText: 'Test Customer Voice',
    },
    {
      id: 'lead-health',
      path: '/demos/lead-health',
      title: 'Lead Health & Revenue Leakage Calculator',
      tagline: 'Calculate lost revenue from delayed follow-ups',
      description: 'Enter your monthly inquiries, average response latency, and deal value. Diagnoses response health score, computes leaked pipeline value, and prescribes 6 AI automation modules.',
      badge: 'ROI Calculator',
      icon: Layers,
      color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      btnText: 'Test Leakage Calculator',
    },
    {
      id: 'sales-coach',
      path: '/demos/sales-coach',
      title: 'Sales Conversation Coach & Speech QA',
      tagline: '15+ Years Quality Scorecard & Call Coaching',
      description: 'Audit telecalling and sales rep transcripts against 8 standardized QA criteria (Greeting, Discovery, Objections, Closing). Delivers performance scores and roleplay exercises.',
      badge: 'Speech QA Matrix',
      icon: Award,
      color: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      btnText: 'Test Sales Coach',
    },
    {
      id: 'review-analyzer',
      path: '/demos/review-analyzer',
      title: 'Review & Customer Feedback Intelligence',
      tagline: 'Categorize staff, pricing & service friction',
      description: 'Analyze Google Reviews, Trustpilot feedback, and WhatsApp ratings. Extracts negative themes, detects repeat complaints, and delivers Top 5 Prioritized ROI Management Actions.',
      badge: 'Reputation AI',
      icon: Star,
      color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
      badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      btnText: 'Test Review Analyzer',
    },
    {
      id: 'business-assistant',
      path: '/demos/business-assistant',
      title: 'AI GrowthLab Business Consultant',
      tagline: 'Conversational AI tailored to your operational bottlenecks',
      description: 'Consultative AI chatbot representing Shailendra Mishra. Explore how instant WhatsApp intake, speech QA, and custom portals solve bottlenecks in your specific industry.',
      badge: 'Consultative Chat',
      icon: Bot,
      color: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      btnText: 'Chat with Assistant',
    },
  ];

  return (
    <section id="demos-section" className="py-16 sm:py-24 bg-[#070a12] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive AI Building Capability</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            6 Working Interactive AI Demos
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Not a static marketing mockup. Click below to enter your own inputs, select real-world presets, and test functional AI solutions running on live server-side Gemini models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo) => {
            const Icon = demo.icon;
            return (
              <div
                key={demo.id}
                id={`demo-card-${demo.id}`}
                className="bento-card p-6 sm:p-7 flex flex-col justify-between space-y-6 group relative overflow-hidden"
              >
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl border ${demo.color} transition-transform group-hover:scale-105`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${demo.badgeColor}`}>
                      {demo.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {demo.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 mt-1">
                      {demo.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {demo.description}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate(demo.path)}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-indigo-600 border border-white/10 hover:border-indigo-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs group-hover:shadow-lg group-hover:shadow-indigo-600/30"
                >
                  <span>{demo.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

