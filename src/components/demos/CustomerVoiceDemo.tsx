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
  const [dataset, setDataset] = useState<CustomerVoiceItem[]>(CUSTOMER_VOICE_DATASETS['Automobile'] || []);
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
        return <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />;
      case 'Phone Call':
        return <Phone className="w-3.5 h-3.5 text-blue-400" />;
      case 'Review':
        return <Star className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-indigo-400" />;
    }
  };

  return (
    <div id="customer-voice-demo" className="max-w-6xl mx-auto space-y-6">
      {/* Demo Header */}
      <div className="bento-card p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0 shadow-inner">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Interactive Showcase #2
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                  <span>Omnichannel Intelligence</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                AI Customer Voice & Interaction Intelligence
              </h2>
            </div>
          </div>

          <button
            onClick={() => onOpenLeadModal(`I want a Customer Voice & Interaction Analytics pipeline for our ${selectedIndustry} business.`)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold border border-indigo-400/30 shadow-lg shadow-indigo-600/20 transition-all self-start md:self-auto"
          >
            <span>Deploy Customer Voice Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10">
          Aggregates hundreds of multi-channel customer interactions (WhatsApp chats, recorded calls, web enquiries, Google reviews) to detect recurring pain points, sentiment distribution, and generate an executive action roadmap for management.
        </p>

        {/* Industry Pill Selector */}
        <div className="mt-6 relative z-10">
          <div className="text-xs font-semibold text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-indigo-400" />
            <span>Select Your Industry Segment:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => handleIndustryChange(ind)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  selectedIndustry === ind
                    ? 'border-indigo-500 bg-indigo-500/20 text-white font-bold shadow-inner'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Dataset Loaded: <strong className="text-white">{dataset.length} Omnichannel Interactions</strong> ({selectedIndustry})</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex-1 sm:flex-initial py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 border border-indigo-400/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
      <div className="bento-card p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'summary'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              Executive Insights & Metrics
            </button>
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'recommendations'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              Top 5 Management Actions
            </button>
            <button
              onClick={() => setActiveTab('dataset')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dataset'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white bg-white/5'
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
              <div className="bento-subcard p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Total Analyzed
                </span>
                <div className="text-2xl font-extrabold text-white mt-1 font-mono">
                  {result ? result.totalInteractions : dataset.length}
                </div>
                <span className="text-[11px] text-slate-500">Live & benchmarked records</span>
              </div>

              <div className="bento-subcard p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Positive Sentiment
                </span>
                <div className="text-2xl font-extrabold text-emerald-400 mt-1 font-mono">
                  {result ? `${result.positivePct}%` : '52%'}
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${result ? result.positivePct : 52}%` }}
                  ></div>
                </div>
              </div>

              <div className="bento-subcard p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Neutral Sentiment
                </span>
                <div className="text-2xl font-extrabold text-slate-300 mt-1 font-mono">
                  {result ? `${result.neutralPct}%` : '22%'}
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-slate-400 h-full rounded-full"
                    style={{ width: `${result ? result.neutralPct : 22}%` }}
                  ></div>
                </div>
              </div>

              <div className="bento-subcard p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
                  Negative / Churn Risk
                </span>
                <div className="text-2xl font-extrabold text-rose-400 mt-1 font-mono">
                  {result ? `${result.negativePct}%` : '26%'}
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full"
                    style={{ width: `${result ? result.negativePct : 26}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Pain Points & Intents Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Pain Points */}
              <div className="bento-subcard p-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Top Customer Pain Points (Root Cause)</span>
                </h4>
                <div className="space-y-2.5">
                  {(result?.topPainPoints || [
                    { name: 'Delayed Response / Ignored WhatsApp Messages', count: 18, percentage: 38 },
                    { name: 'Pricing Ambiguity & Unclear Add-on Charges', count: 14, percentage: 29 },
                    { name: 'Multiple Follow-ups Required for Same Query', count: 10, percentage: 21 },
                    { name: 'Waiting Time & Appointment Uncertainty', count: 6, percentage: 12 },
                  ]).map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1">
                        <span>{item.name}</span>
                        <span className="text-rose-400 font-bold font-mono">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-rose-500 h-full rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Customer Intents */}
              <div className="bento-subcard p-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>High-Volume Buying Intents</span>
                </h4>
                <div className="space-y-2.5">
                  {(result?.topIntents || [
                    { name: 'Price & Quotation Request', count: 22, percentage: 46 },
                    { name: 'Appointment / Test Booking', count: 15, percentage: 31 },
                    { name: 'Trade-in / Financing Consultation', count: 7, percentage: 15 },
                    { name: 'Post-Service Escalation', count: 4, percentage: 8 },
                  ]).map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1">
                        <span>{item.name}</span>
                        <span className="text-indigo-400 font-bold font-mono">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-500 h-full rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Recommendations */}
        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4" />
              <span>Prioritized AI & Automation Strategy for {selectedIndustry}</span>
            </div>

            {(result?.aiExecutiveSummary?.recommendations || [
              {
                title: "Deploy Instant 24/7 WhatsApp Lead Intake",
                description: "Engage prospective buyers within 45 seconds to deliver transparent answers and lock appointments.",
                impact: "High",
                actionableStep: "Set up interactive WhatsApp conversational flow with instant quote delivery."
              },
              {
                title: "Automate High-Intent Sales Alerts",
                description: "Alert senior representatives via mobile push within 3 minutes when hot prospects trigger buying signals.",
                impact: "High",
                actionableStep: "Integrate CRM webhook triggers with lead context push."
              },
              {
                title: "Speech & Conversation QA Audits",
                description: "Audit 100% of recorded inbound calls to identify missed discovery questions and coach agents on price objections.",
                impact: "High",
                actionableStep: "Run daily automated speech QA scorecard evaluations."
              },
              {
                title: "Structured Multi-Touch Nurture Cadence",
                description: "Automatically re-engage cold leads at 24h, 72h, and 7-day intervals with educational value.",
                impact: "Medium",
                actionableStep: "Deploy automated drip campaign for non-responsive quotes."
              },
              {
                title: "Executive Visibility Dashboard",
                description: "Track lead velocity, response SLA adherence, and conversion metrics on a real-time Power BI dashboard.",
                impact: "Medium",
                actionableStep: "Connect pipeline events to central executive reporting."
              }
            ]).map((rec, idx) => (
              <div key={idx} className="bento-subcard p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold text-white">#{idx + 1}. {rec.title}</h5>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Impact: {rec.impact}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{rec.description}</p>
                <div className="text-[11px] text-emerald-400 pt-1 font-semibold">
                  🚀 Action: {rec.actionableStep}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Raw Dataset */}
        {activeTab === 'dataset' && (
          <div className="space-y-3">
            <div className="text-xs text-slate-400 mb-2">
              Viewing {dataset.length} omnichannel customer conversations in the {selectedIndustry} dataset:
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {dataset.map((item) => (
                <div key={item.id} className="bento-subcard p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getChannelIcon(item.channel)}
                      <span className="font-bold text-white">{item.customerName || 'Customer'}</span>
                      <span className="text-slate-500 font-mono text-[10px]">({item.channel})</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.sentiment === 'Positive' ? 'bg-emerald-500/15 text-emerald-400' :
                      item.sentiment === 'Negative' ? 'bg-rose-500/15 text-rose-400' : 'bg-slate-500/15 text-slate-300'
                    }`}>
                      {item.sentiment}
                    </span>
                  </div>
                  <p className="text-slate-300 italic font-mono text-[11px]">"{item.text}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
