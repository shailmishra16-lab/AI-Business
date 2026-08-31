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
    <div id="review-analyzer-demo" className="max-w-6xl mx-auto space-y-8">
      {/* Demo Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Interactive Showcase #5
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Sentiment & Reputation Intelligence
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                AI Review & Customer Feedback Analyzer
              </h2>
            </div>
          </div>

          <button
            onClick={() => onOpenLeadModal(`I want an AI Review & Customer Reputation Intelligence pipeline for our ${industry} business.`)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 transition-colors self-start md:self-auto"
          >
            <span>Deploy Review Intelligence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Transforms unstructured Google reviews, Trustpilot ratings, and WhatsApp feedback into categorized operational intelligence. Dissects staff, pricing, and service friction while outputting <strong>Top 5 Prioritized Management Actions</strong>.
        </p>

        {/* Industry Selector */}
        <div className="mt-6">
          <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-indigo-600" />
            <span>Target Industry:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['Clinic', 'Automobile', 'Restaurant', 'Coaching', 'Salon', 'Retail', 'Professional Services'] as IndustryType[]).map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  industry === ind
                    ? 'border-indigo-600 bg-indigo-600 text-white font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700 bg-white'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input / Execution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Textarea */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Batch Customer Reviews / Feedback
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              {reviewsText.length} chars
            </span>
          </div>

          <textarea
            id="review-analyzer-input-textarea"
            rows={11}
            value={reviewsText}
            onChange={(e) => setReviewsText(e.target.value)}
            placeholder="Paste multiple customer reviews or feedback snippets..."
            className="w-full p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm font-mono leading-relaxed text-slate-800 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none bg-slate-50/50"
          />

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
              {error}
            </div>
          )}

          <button
            id="review-analyzer-submit-btn"
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Auditing Feedback Categories...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Analyse Customer Feedback</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Categorized Intelligence Output */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin mx-auto"></div>
              <h4 className="text-base font-bold text-slate-900">
                Auditing Sentiment & Complaint Categories...
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Classifying staff friction, hidden pricing issues, service bottlenecks, and generating ROI-ranked management actions.
              </p>
            </div>
          ) : result ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Sentiment Score Header */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center font-extrabold text-xl border border-amber-200">
                    ★
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Overall Sentiment Score
                    </span>
                    <div className="text-2xl font-extrabold text-slate-900">
                      {result.overallSentiment.score} <span className="text-sm font-normal text-slate-500">/ 5.0</span>
                    </div>
                  </div>
                </div>

                {/* Distribution Bar */}
                <div className="w-full sm:w-64 space-y-1">
                  <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500">
                    <span>Pos: {result.overallSentiment.distribution.positive}%</span>
                    <span>Neu: {result.overallSentiment.distribution.neutral}%</span>
                    <span>Neg: {result.overallSentiment.distribution.negative}%</span>
                  </div>
                  <div className="h-2 rounded-full flex overflow-hidden bg-slate-200">
                    <div style={{ width: `${result.overallSentiment.distribution.positive}%` }} className="bg-emerald-500"></div>
                    <div style={{ width: `${result.overallSentiment.distribution.neutral}%` }} className="bg-slate-400"></div>
                    <div style={{ width: `${result.overallSentiment.distribution.negative}%` }} className="bg-rose-500"></div>
                  </div>
                </div>
              </div>

              {/* 4 Friction Buckets */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 border-b border-slate-100">
                  Categorized Feedback Breakdown
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-bold mb-1">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      <span>Staff</span>
                    </div>
                    <div className="text-lg font-extrabold text-slate-900">
                      {result.categoryBreakdown.staffIssues.count} <span className="text-[10px] font-normal text-slate-500">issues</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-bold mb-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Pricing</span>
                    </div>
                    <div className="text-lg font-extrabold text-slate-900">
                      {result.categoryBreakdown.priceIssues.count} <span className="text-[10px] font-normal text-slate-500">issues</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-bold mb-1">
                      <Package className="w-3.5 h-3.5 text-purple-600" />
                      <span>Product</span>
                    </div>
                    <div className="text-lg font-extrabold text-slate-900">
                      {result.categoryBreakdown.productIssues.count} <span className="text-[10px] font-normal text-slate-500">issues</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-bold mb-1">
                      <Wrench className="w-3.5 h-3.5 text-rose-600" />
                      <span>Service</span>
                    </div>
                    <div className="text-lg font-extrabold text-slate-900">
                      {result.categoryBreakdown.serviceIssues.count} <span className="text-[10px] font-normal text-slate-500">issues</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Repeated Complaints */}
              {result.repeatedComplaints && result.repeatedComplaints.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/60 space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Repeated Operational Complaints (High Severity)</span>
                  </h5>
                  <ul className="space-y-1 text-xs text-rose-950">
                    {result.repeatedComplaints.map((comp, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Top 5 Management Actions */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Top 5 Prescriptive Management Actions & Expected ROI</span>
                </h4>
                <div className="space-y-2.5">
                  {result.top5ManagementActions.map((action, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-indigo-50/30 border border-indigo-200/60 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          <span>{action.action}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                          {action.priority}
                        </span>
                      </div>
                      <p className="text-slate-600 pl-6">
                        Target Area: <strong className="text-slate-800">{action.targetArea}</strong>
                      </p>
                      <div className="pl-6 text-[11px] font-semibold text-emerald-700">
                        ⚡ Expected Impact: {action.expectedRoi}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-700">Awaiting Customer Reviews</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Review or modify the sample clinic/dealership feedback on the left, then click <strong>"Analyse Customer Feedback"</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
