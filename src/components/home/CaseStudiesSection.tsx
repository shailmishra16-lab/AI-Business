import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Info,
  Building
} from 'lucide-react';
import { CASE_STUDIES } from '../../data/mockData';

interface CaseStudiesSectionProps {
  onOpenLeadModal: (context?: string) => void;
  onNavigateDemo: (demoId: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onOpenLeadModal,
  onNavigateDemo,
}) => {
  const [selectedCase, setSelectedCase] = useState(CASE_STUDIES[0]);

  return (
    <section id="case-studies-section" className="py-16 sm:py-24 bg-[#05070a] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Practical Architectures & Problem-Solving</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Detailed Industry Case Studies
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Examine how business bottlenecks in lead response, appointment no-shows, and sales call consistency are systematically dismantled using applied AI workflows.
          </p>

          {/* Mandatory Prototype / Sample Data Label */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 text-slate-400 text-xs font-medium border border-white/10">
            <Info className="w-3.5 h-3.5 text-indigo-400" />
            <span>Demonstration project architectures using sample business datasets</span>
          </div>
        </div>

        {/* Case Study Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          {CASE_STUDIES.map((cs) => (
            <button
              key={cs.id}
              onClick={() => setSelectedCase(cs)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold border transition-all text-left flex items-center gap-2 ${
                selectedCase.id === cs.id
                  ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300 shadow-lg shadow-indigo-600/10'
                  : 'bg-[#0a0d17] border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <Building className="w-4 h-4 text-indigo-400" />
              <span>{cs.clientType}</span>
            </button>
          ))}
        </div>

        {/* Active Case Study Detail Bento Box */}
        <div className="bento-card p-6 sm:p-10 space-y-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                {selectedCase.clientType} Case Study
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {selectedCase.title}
              </h3>
            </div>

            <button
              onClick={() => onOpenLeadModal(`I want to discuss an AI solution similar to the ${selectedCase.clientType} Case Study.`)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors self-start md:self-auto shadow-md shadow-indigo-600/25 border border-indigo-400/30"
            >
              <span>Build Similar Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Metrics Impact Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(selectedCase.results || []).map((res, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bento-subcard space-y-1 hover:border-indigo-500/30 transition-colors"
              >
                <span className="text-xs font-semibold text-slate-400">{res.label}</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">
                  {res.metric}
                </div>
              </div>
            ))}
          </div>

          {/* Problem vs Solution Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>The Core Business Problem</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                {selectedCase.challenge}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>The AI GrowthLab Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                {selectedCase.solution}
              </p>
            </div>
          </div>

          {/* Architecture Steps */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Technical & Operational Implementation Blueprint:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(selectedCase.blueprintSteps || []).map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bento-subcard flex items-start gap-2.5 text-xs text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Result Quote & Demo Link */}
          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 italic max-w-xl">
              "{selectedCase.quote}"
            </div>

            <button
              onClick={() => onNavigateDemo(
                selectedCase.id === 'case-auto'
                  ? '/demos/lead-health'
                  : selectedCase.id === 'case-clinic'
                  ? '/demos/customer-voice'
                  : '/demos/sales-coach'
              )}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
            >
              <span>Test Interactive Demo Tool</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

