import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  Zap,
  BookOpen,
  UserCheck,
  MessageSquare,
  ShieldCheck,
  BarChart2
} from 'lucide-react';
import { coachSalesConversation } from '../../utils/api';
import { SalesCoachResult } from '../../types';
import { SALES_COACH_PRESETS } from '../../data/mockData';

interface SalesCoachDemoProps {
  onOpenLeadModal: (problemContext?: string) => void;
}

export const SalesCoachDemo: React.FC<SalesCoachDemoProps> = ({ onOpenLeadModal }) => {
  const [transcript, setTranscript] = useState(SALES_COACH_PRESETS[0].transcript);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SalesCoachResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async () => {
    if (!transcript.trim()) {
      setError('Please provide a sales conversation transcript to coach.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const data = await coachSalesConversation(transcript);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Call audit failed.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
    if (score >= 65) return 'text-amber-400 bg-amber-500/15 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/15 border-rose-500/30';
  };

  return (
    <div id="sales-coach-demo" className="max-w-6xl mx-auto space-y-6">
      {/* Demo Header */}
      <div className="bento-card p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Interactive Showcase #4
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  <span>Speech QA & Scorecards</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                AI Sales Conversation Coach & Call Auditor
              </h2>
            </div>
          </div>

          <button
            onClick={() => onOpenLeadModal("I want an automated Sales Call QA & Conversation Coaching system for our telecallers/sales reps.")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold border border-amber-400/30 shadow-lg shadow-amber-600/20 transition-all self-start md:self-auto"
          >
            <span>Deploy Sales Call Coaching</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10">
          Built on <strong>15+ years of Quality Management and Speech Analytics methodology</strong>. Analyzes 100% of recorded sales conversations across 8 standardized scorecard parameters, detects price objection mishandling, and provides reps with concrete roleplay drills.
        </p>

        {/* Preset Selector */}
        <div className="mt-6 relative z-10">
          <div className="text-xs font-semibold text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Load Real Sales Transcripts or Paste Custom Dialogue:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {SALES_COACH_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setTranscript(preset.transcript)}
                className={`px-3 py-2.5 rounded-xl text-xs text-left transition-all border ${
                  transcript === preset.transcript
                    ? 'border-amber-500 bg-amber-500/20 text-white font-semibold shadow-inner'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className="font-bold text-white text-[11px]">{preset.title}</div>
                <div className="text-[10px] text-slate-400 truncate">{preset.industry}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input / Execution Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Textarea */}
        <div className="lg:col-span-5 bento-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Sales Call Audio Transcript
            </label>
            <span className="text-[11px] text-slate-500 font-mono">
              {transcript.length} chars
            </span>
          </div>

          <textarea
            rows={13}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste rep vs customer dialogue transcript here..."
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm font-mono leading-relaxed text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all resize-none placeholder-slate-500"
          />

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleAudit}
              disabled={loading}
              className="flex-1 py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-amber-600/30 border border-amber-400/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating 8 Parameters...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Run Speech QA Audit</span>
                </>
              )}
            </button>

            <button
              onClick={() => setTranscript('')}
              className="px-3.5 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-semibold transition-colors"
              title="Clear transcript"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Right: Results Dashboard */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="bento-card p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-amber-500 border-t-transparent animate-spin mx-auto"></div>
              <h4 className="text-base font-bold text-white">
                Scoring Call Across 8 QA Parameters...
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Auditing requirement discovery, objection handling, closing velocity, and generating personalized rep coaching drills.
              </p>
            </div>
          ) : result ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Overall Score Header */}
              <div className="bento-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Audit Performance Rating
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {result.performanceRating}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-md">
                    {result.summary}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center justify-center p-4 rounded-2xl bento-subcard border-white/10 shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    QA Score
                  </span>
                  <div className="text-3xl font-extrabold font-mono text-amber-400">
                    {result.overallScore}
                    <span className="text-xs text-slate-500 font-normal">/100</span>
                  </div>
                </div>
              </div>

              {/* 8 Parameter Scorecards */}
              <div className="bento-card p-5 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                  <BarChart2 className="w-4 h-4 text-amber-400" />
                  <span>8-Point Quality Evaluation Matrix</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {result.parameterEvaluations.map((param, idx) => (
                    <div key={idx} className="bento-subcard p-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-200 truncate pr-2" title={param.name}>
                          {param.name}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border font-mono ${getScoreColor(param.score)}`}>
                          {param.score}/100
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {param.weaknesses || param.strengths}
                      </p>
                      <div className="text-[10px] text-amber-300/90 pt-1 border-t border-white/5 font-medium">
                        💡 {param.coachingTip}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Script Rewrite */}
              {result.scriptRewrite && (
                <div className="bento-card p-5 space-y-2.5 border-amber-500/30 bg-gradient-to-br from-[#141008] to-[#0a0805]">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <MessageSquare className="w-4 h-4" />
                    <span>Recommended High-Converting Dialogue Rewrite</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    {result.scriptRewrite.recommendedDialogue}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bento-card p-12 text-center space-y-4 border-dashed border-white/10">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">
                  Ready to Audit Sales Dialogue
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click <strong>Run Speech QA Audit</strong> to evaluate objection handling, qualification techniques, and rep scorecard ratings.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
