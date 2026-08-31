import React, { useState } from 'react';
import {
  Activity,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Layers,
  Filter,
  BarChart3,
  Lightbulb,
  Building,
  RefreshCw,
  Zap,
  MessageCircle,
  Phone,
  Globe,
  Star
} from 'lucide-react';
import { analyzeCustomerVoice } from '../../utils/api';
import { CustomerVoiceAnalysisResult, IndustryType, CustomerVoiceItem } from '../../types';
import { CUSTOMER_VOICE_DATASETS } from '../../data/mockData';

interface CustomerVoiceDemoProps {
  onOpenLeadModal: (problemContext?: string) => void;
}

export const CustomerVoiceDemo: React.FC<CustomerVoiceDemoProps> = ({ onOpenLeadModal }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>('Automobile');
  const [dataset, setDataset] = useState<CustomerVoiceItem[]>(CUSTOMER_VOICE_DATASETS['Automobile']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CustomerVoiceAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'dataset' | 'recommendations'>('summary');

  const industries: IndustryType[] = [
    'Automobile',
    'Clinic',
    'Coaching',
    'Real Estate',
    'Retail',
    'Restaurant',
    'Salon',
    'Professional Services',
    'Other',
  ];

  const handleIndustryChange = (ind: IndustryType) => {
    setSelectedIndustry(ind);
    const data = CUSTOMER_VOICE_DATASETS[ind] || CUSTOMER_VOICE_DATASETS['Automobile'];
    setDataset(data);
    setResult(null);
  };

  const handleAnalyze = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await analyzeCustomerVoice(selectedIndustry, dataset);
      setResult(data);
      setActiveTab('summary');
    } catch (err: any) {
      setError(err.message || 'Customer voice analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'WhatsApp':
        return <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Phone Call':
        return <Phone className="w-3.5 h-3.5 text-blue-600" />;
      case 'Review':
        return <Star className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-indigo-600" />;
    }
  };

  return (
    <div id="customer-voice-demo" className="max-w-6xl mx-auto space-y-8">
      {/* Demo Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Interactive Showcase #2
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                  Customer Intelligence Engine
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                AI Customer Voice & Interaction Intelligence
              </h2>
            </div>
          </div>

          <button
            onClick={() => onOpenLeadModal(`I want a Customer Voice & Interaction Analytics pipeline for our ${selectedIndustry} business.`)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold border border-purple-200 transition-colors self-start md:self-auto"
          >
            <span>Deploy Customer Voice Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Aggregates hundreds of multi-channel customer interactions (WhatsApp chats, recorded calls, web enquiries, Google reviews) to detect recurring pain points, sentiment distribution, and generate an executive action roadmap for management.
        </p>

        {/* Industry Pill Selector */}
        <div className="mt-6">
          <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-purple-600" />
            <span>Select Your Industry Segment:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => handleIndustryChange(ind)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedIndustry === ind
                    ? 'border-purple-600 bg-purple-600 text-white shadow-sm shadow-purple-600/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700 bg-white'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Dataset Loaded: <strong>{dataset.length} Omnichannel Interactions</strong> ({selectedIndustry})</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex-1 sm:flex-initial py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm shadow-md shadow-purple-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Voice Intelligence...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Analyse Customer Voice</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Dataset & Tabs Preview */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'summary'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Executive Insights & Metrics
            </button>
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'recommendations'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Top 5 Management Actions
            </button>
            <button
              onClick={() => setActiveTab('dataset')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dataset'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Raw Interactions ({dataset.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Summary Dashboard */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Total Analyzed
                </span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">
                  {result ? result.totalInteractions : dataset.length}
                </div>
                <span className="text-[11px] text-slate-500">Live & simulated records</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Positive Sentiment
                </span>
                <div className="text-2xl font-extrabold text-emerald-800 mt-1">
                  {result ? `${result.positivePct}%` : '48%'}
                </div>
                <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${result ? result.positivePct : 48}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Neutral Sentiment
                </span>
                <div className="text-2xl font-extrabold text-slate-800 mt-1">
                  {result ? `${result.neutralPct}%` : '24%'}
                </div>
                <div className="w-full bg-slate-300 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-slate-500 h-full rounded-full"
                    style={{ width: `${result ? result.neutralPct : 24}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/70">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
                  Negative / Churn Risk
                </span>
                <div className="text-2xl font-extrabold text-rose-800 mt-1">
                  {result ? `${result.negativePct}%` : '28%'}
                </div>
                <div className="w-full bg-rose-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-rose-600 h-full rounded-full"
                    style={{ width: `${result ? result.negativePct : 28}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Pain Points & Intents Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Pain Points */}
              <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Top Customer Pain Points (Root Cause)</span>
                </h4>
                <div className="space-y-2.5">
                  {(result?.topPainPoints || [
                    { name: 'Delayed Response / Ignored WhatsApp Messages', count: 18, percentage: 40 },
                    { name: 'Pricing Ambiguity & Hidden Extra Charges', count: 12, percentage: 27 },
                    { name: 'Multiple Follow-ups Required for Same Query', count: 9, percentage: 20 },
                    { name: 'Staff Handover Inconsistency', count: 6, percentage: 13 },
                  ]).map((item, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                      <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                        <span>{item.name}</span>
                        <span className="text-rose-600 font-bold">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-rose-500 h-full rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Intents */}
              <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <span>Top Inbound Intents & Demand Drivers</span>
                </h4>
                <div className="space-y-2.5">
                  {(result?.topIntents || [
                    { name: 'Quotation & Finance / Price Breakdown', count: 20, percentage: 44 },
                    { name: 'Appointment / Test Slot Booking', count: 14, percentage: 31 },
                    { name: 'Service / Escalation Resolution', count: 7, percentage: 16 },
                    { name: 'General Information & Timings', count: 4, percentage: 9 },
                  ]).map((item, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                      <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                        <span>{item.name}</span>
                        <span className="text-blue-600 font-bold">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Complaint Categories Severity Breakdown */}
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-600" />
                <span>Complaint Categories & Severity Breakdown</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {(result?.complaintCategories || [
                  { category: 'Follow-up Velocity', count: 14, severity: 'High' as const },
                  { category: 'Pricing Transparency', count: 9, severity: 'Medium' as const },
                  { category: 'Staff Handover Gaps', count: 6, severity: 'Medium' as const },
                  { category: 'Post-Sale Communication', count: 4, severity: 'Low' as const },
                ]).map((cat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{cat.category}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          cat.severity === 'High'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : cat.severity === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {cat.severity}
                      </span>
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 mt-2">
                      {cat.count} <span className="text-xs font-normal text-slate-500">mentions</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Recommendations */}
        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/60 mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>AI Executive Overview</span>
              </h4>
              <p className="text-xs sm:text-sm text-purple-950 leading-relaxed">
                {result?.aiExecutiveSummary?.overview ||
                  `Customer interactions in ${selectedIndustry} indicate high purchase intent, but 28% of leads decay due to slow first-response times and lack of standardized follow-up collateral.`}
              </p>
            </div>

            <div className="space-y-3">
              {(result?.aiExecutiveSummary?.recommendations || [
                {
                  title: 'Deploy 24/7 WhatsApp Instant Qualification',
                  description: 'Automate immediate brochure and quote delivery within 30 seconds of enquiry.',
                  impact: 'High' as const,
                  actionableStep: 'Set up WhatsApp bot to answer FAQs and calculate indicative quotes instantly.',
                },
                {
                  title: 'Automate Salesperson Notification Triggers',
                  description: 'Alert floor sales reps within 3 minutes when high-intent prospects request live consultations.',
                  impact: 'High' as const,
                  actionableStep: 'Integrate webhook push notifications to salesperson phones with pre-qualified context.',
                },
                {
                  title: 'Standardize Transparent Pricing Collateral',
                  description: 'Provide one-click downloadable PDF quotes to eliminate customer anxiety over hidden charges.',
                  impact: 'Medium' as const,
                  actionableStep: 'Template dynamic pricing sheets directly inside CRM auto-responses.',
                },
                {
                  title: 'Implement Speech & Text Sentiment Audits',
                  description: 'Continuously audit 100% of recorded customer conversations to flag dissatisfied leads before they churn.',
                  impact: 'High' as const,
                  actionableStep: 'Run daily automated sentiment scans across all incoming messages.',
                },
                {
                  title: 'Create Post-Visit Feedback Loop',
                  description: 'Send automated 2-question micro-surveys 1 hour after visit to catch grievances early.',
                  impact: 'Medium' as const,
                  actionableStep: 'Trigger WhatsApp NPS survey automatically upon appointment completion.',
                },
              ]).map((rec, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 transition-all shadow-xs flex flex-col sm:flex-row items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h5 className="text-sm font-bold text-slate-900">{rec.title}</h5>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          rec.impact === 'High'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {rec.impact} Impact
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 pl-7">{rec.description}</p>
                    <div className="pl-7 pt-1 text-xs text-purple-700 font-medium flex items-center gap-1.5">
                      <ArrowRight className="w-3 h-3 text-purple-500" />
                      <span>Actionable Step: {rec.actionableStep}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Raw Dataset Table */}
        {activeTab === 'dataset' && (
          <div className="space-y-3">
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3">Channel</th>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Customer Interaction Message</th>
                    <th className="p-3">Intent</th>
                    <th className="p-3">Sentiment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dataset.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 flex items-center gap-1.5 font-medium text-slate-700">
                        {getChannelIcon(row.channel)}
                        <span>{row.channel}</span>
                      </td>
                      <td className="p-3 text-slate-400 font-mono whitespace-nowrap">
                        {row.timestamp}
                      </td>
                      <td className="p-3 text-slate-800 max-w-md font-sans">
                        {row.text}
                      </td>
                      <td className="p-3 text-slate-600 font-medium whitespace-nowrap">
                        {row.intent}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            row.sentiment === 'Positive'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : row.sentiment === 'Negative'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {row.sentiment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
