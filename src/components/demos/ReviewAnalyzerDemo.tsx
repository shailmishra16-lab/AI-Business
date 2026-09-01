import React, { useState } from 'react';
import {
  Star,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Users,
  DollarSign,
  Package,
  Wrench,
  ShieldCheck,
  Building
} from 'lucide-react';
import { analyzeReviews } from '../../utils/api';
import { ReviewAnalysisResult, IndustryType } from '../../types';

interface ReviewAnalyzerDemoProps {
  onOpenLeadModal: (problemContext?: string) => void;
}

export const ReviewAnalyzerDemo: React.FC<ReviewAnalyzerDemoProps> = ({ onOpenLeadModal }) => {
  const [industry, setIndustry] = useState<IndustryType>('Clinic');
  const [reviewsText, setReviewsText] = useState(`Review 1 (★★★★★): Dr. Sharma was extremely patient and clearly explained the root canal procedure. Absolutely painless experience.
Review 2 (★☆☆☆☆): Took an appointment for 11:30 AM but was made to wait till 12:45 PM. No one gave any update. Reception staff was rude when I asked.
Review 3 (★★★☆☆): Good treatment results, but they charged ₹2,500 extra for consumables that were never disclosed in the initial consultation quote.
Review 4 (★★★★★): Spotless clinic and modern equipment. Highly recommend for dental implants.
Review 5 (★★☆☆☆): Sent a message on WhatsApp regarding my swollen gums after filling, but didn't get any reply until the next afternoon. Poor follow-up care.`);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!reviewsText.trim()) {
      setError('Please provide sample customer reviews to analyze.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const data = await analyzeReviews(industry, reviewsText);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Review audit failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="review-analyzer-demo" className="max-w-6xl mx-auto space-y-6">
      {/* Demo Header */}
      <div className="bento-card p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 shadow-inner">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  Interactive Showcase #5
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                  <span>Reputation Intelligence</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                AI Review & Customer Feedback Analyzer
              </h2>
            </div>
          </div>

          <button
            onClick={() => onOpenLeadModal(`I want an AI Review & Customer Reputation Intelligence pipeline for our ${industry} business.`)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold border border-purple-400/30 shadow-lg shadow-purple-600/20 transition-all self-start md:self-auto"
          >
            <span>Deploy Review Intelligence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10">
          Transforms unstructured Google reviews, Trustpilot ratings, and WhatsApp feedback into categorized operational intelligence. Dissects staff, pricing, and service friction while outputting <strong>Top 5 Prioritized Management Actions</strong>.
        </p>

        {/* Industry Selector */}
        <div className="mt-6 relative z-10">
          <div className="text-xs font-semibold text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-purple-400" />
            <span>Select Target Industry:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['Clinic', 'Automobile', 'Restaurant', 'Coaching', 'Salon', 'Retail', 'Professional Services'] as IndustryType[]).map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  industry === ind
                    ? 'border-purple-500 bg-purple-500/20 text-white font-bold shadow-inner'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input / Execution Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Textarea */}
        <div className="lg:col-span-5 bento-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Customer Reviews Sample
            </label>
            <span className="text-[11px] text-slate-500 font-mono">
              {reviewsText.length} chars
            </span>
          </div>

          <textarea
            rows={13}
            value={reviewsText}
            onChange={(e) => setReviewsText(e.target.value)}
            placeholder="Paste multiple customer reviews or survey feedback..."
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm font-mono leading-relaxed text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all resize-none placeholder-slate-500"
          />

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex-1 py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-purple-600/30 border border-purple-400/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Review Feedback...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Analyze Reviews & Feedback</span>
                </>
              )}
            </button>

            <button
              onClick={() => setReviewsText('')}
              className="px-3.5 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-semibold transition-colors"
              title="Clear reviews"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Right Column: Results Dashboard */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="bento-card p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin mx-auto"></div>
              <h4 className="text-base font-bold text-white">
                Categorizing Customer Sentiments & Operational Friction...
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Dissecting staff, waiting times, and pricing issues into prioritized management action plans.
              </p>
            </div>
          ) : result ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Metas Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bento-subcard p-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Calculated CSAT Rating
                  </span>
                  <div className="text-2xl font-extrabold text-amber-400 mt-1 flex items-center gap-1 font-mono">
                    <span>{result.overallRating.toFixed(1)}</span>
                    <span className="text-xs text-slate-500">/ 5.0</span>
                  </div>
                </div>

                <div className="bento-subcard p-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Sentiment Split
                  </span>
                  <div className="text-xs font-bold text-slate-200 mt-1.5 flex items-center gap-2">
                    <span className="text-emerald-400">{result.sentimentBreakdown.positive}% Pos</span>
                    <span className="text-slate-400">{result.sentimentBreakdown.neutral}% Neu</span>
                    <span className="text-rose-400">{result.sentimentBreakdown.negative}% Neg</span>
                  </div>
                </div>

                <div className="bento-subcard p-3.5 col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Reviews Sampled
                  </span>
                  <div className="text-2xl font-extrabold text-purple-300 mt-1 font-mono">
                    {result.totalReviewsAnalyzed}
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bento-card p-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span>Category Breakdown & Root-Cause Friction</span>
                </div>

                <div className="space-y-2 pt-1">
                  {result.categoryBreakdown.map((cat, idx) => (
                    <div key={idx} className="bento-subcard p-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200">{cat.category}</span>
                        <span className={`text-xs font-mono font-bold ${
                          cat.sentimentScore >= 80 ? 'text-emerald-400' : cat.sentimentScore >= 60 ? 'text-amber-400' : 'text-rose-400'
                        }`}>
                          {cat.sentimentScore}% Positive
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {cat.keyFeedback}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prioritized Management Actions */}
              <div className="bento-card p-5 space-y-3 border-purple-500/30 bg-gradient-to-br from-[#120c1c] to-[#08060e]">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Prioritized Executive Management Actions</span>
                </div>

                <div className="space-y-2 pt-1">
                  {result.prioritizedManagementActions.map((act, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {act.priority}
                          </span>
                          <span className="text-xs font-bold text-white">{act.title}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {act.description}
                      </p>
                      <div className="text-[10px] text-emerald-400/90 pt-1 font-medium">
                        📈 Expected Impact: {act.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bento-card p-12 text-center space-y-4 border-dashed border-white/10">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto shadow-inner">
                <Star className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">
                  Ready to Analyze Customer Feedback
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click <strong>Analyze Reviews & Feedback</strong> to scan sentiments, spot operational bottlenecks, and generate executive action items.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
