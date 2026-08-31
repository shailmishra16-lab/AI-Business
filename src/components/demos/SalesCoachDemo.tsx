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
    if (score >= 8) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 6) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  return (
    <div id="sales-coach-demo" className="max-w-6xl mx-auto space-y-8">
      {/* Demo Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Interactive Showcase #4
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  Speech QA & Quality Matrix
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                AI Sales Conversation Coach & Call Auditor
              </h2>
            </div>
          </div>

          <button
            onClick={() => onOpenLeadModal("I want an automated Sales Call QA & Conversation Coaching system for our telecallers/sales reps.")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200 transition-colors self-start md:self-auto"
          >
            <span>Deploy Sales Call Coaching</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Built on <strong>15+ years of Quality Management and Speech Analytics methodology</strong>. Analyzes 100% of recorded sales conversations across 8 standardized scorecard parameters, detects price objection mishandling, and provides reps with concrete roleplay drills.
        </p>

        {/* Preset Selector */}
        <div className="mt-6">
          <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Load Real Sales Transcripts:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {SALES_COACH_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setTranscript(preset.transcript)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                  transcript === preset.transcript
                    ? 'border-amber-600 bg-amber-50/80 text-amber-950 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input / Execution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Transcript Input */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Sales Call Audio Transcript
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              {transcript.length} chars
            </span>
          </div>

          <textarea
            id="sales-coach-input-textarea"
            rows={12}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste sales pitch or telecalling transcript..."
            className="w-full p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm font-mono leading-relaxed text-slate-800 focus:border-amber-600 focus:ring-2 focus:ring-amber-100 outline-none transition-all resize-none bg-slate-50/50"
          />

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            id="sales-coach-analyze-btn"
            onClick={handleAudit}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-amber-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Auditing 8 Quality Parameters...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Audit & Coach Sales Call</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Scorecard & Coaching Output */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-amber-600 border-t-transparent animate-spin mx-auto"></div>
              <h4 className="text-base font-bold text-slate-900">
                Evaluating Speech & QA Scorecard...
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Grading greeting, requirement discovery, question quality, empathy, objection handling, and commitment closing.
              </p>
            </div>
          ) : result ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Overall Score Header */}
              <div className="p-5 rounded-3xl bg-slate-900 text-white flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    QA Speech Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-extrabold text-white">
                      {result.overallScore}
                    </span>
                    <span className="text-slate-400 text-sm">/ 100</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Performance Grade</span>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-extrabold border ${
                      result.overallScore >= 80
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : result.overallScore >= 60
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    }`}
                  >
                    {result.rating}
                  </span>
                </div>
              </div>

              {/* 8 Scorecard Parameters Grid */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 border-b border-slate-100 flex items-center justify-between">
                  <span>8-Point Quality Criteria Breakdown</span>
                  <span className="text-[10px] text-slate-400 lowercase font-normal">score /10</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.entries(result.scores).map(([key, item]: [string, any]) => (
                    <div
                      key={key}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">{item.category}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getScoreColor(item.score)}`}>
                          {item.score}/10
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">{item.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Good vs Improve Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>What Was Done Well</span>
                  </h5>
                  <ul className="space-y-1 text-xs text-emerald-950">
                    {result.whatWasDoneWell.map((w, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/70 space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Areas For Improvement</span>
                  </h5>
                  <ul className="space-y-1 text-xs text-rose-950">
                    {result.areasForImprovement.map((a, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Coaching Drills */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Targeted Coaching Recommendations & Roleplay Drills</span>
                </h4>
                <div className="space-y-2.5">
                  {result.coachingRecommendations.map((drill, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200/60 text-xs space-y-1.5">
                      <div className="font-bold text-amber-900 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span>{drill.skillArea}</span>
                      </div>
                      <p className="text-slate-700 pl-5">{drill.advice}</p>
                      <div className="pl-5 pt-1 text-[11px] font-semibold text-amber-800">
                        ⚡ Drill: {drill.drillOrExercise}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Better Response Comparison */}
              {result.suggestedBetterResponse && (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Suggested Better Response Comparison</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                      <span className="font-bold block text-[10px] uppercase text-rose-600 mb-0.5">Observed in Call:</span>
                      {result.suggestedBetterResponse.originalSegment}
                    </div>
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium">
                      <span className="font-bold block text-[10px] uppercase text-emerald-700 mb-0.5">Recommended Pitch / Script:</span>
                      {result.suggestedBetterResponse.improvedVersion}
                    </div>
                    <p className="text-[11px] text-slate-500 italic pl-1">
                      Why: {result.suggestedBetterResponse.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-700">Awaiting Sales Call Transcript</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Select one of the sample sales transcripts above or paste your telecalling recording transcript, then click <strong>"Audit & Coach Sales Call"</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
