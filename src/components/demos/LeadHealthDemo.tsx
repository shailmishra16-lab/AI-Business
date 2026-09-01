import React, { useState, useEffect } from 'react';
import {
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Zap,
  CheckCircle,
  Clock,
  DollarSign,
  Info,
  ShieldCheck,
  Bell,
  MessageCircle,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { calculateLeadHealth } from '../../utils/api';
import { LeadHealthInput, LeadHealthResult } from '../../types';

interface LeadHealthDemoProps {
  onOpenLeadModal: (problemContext?: string) => void;
}

export const LeadHealthDemo: React.FC<LeadHealthDemoProps> = ({ onOpenLeadModal }) => {
  const [form, setForm] = useState<LeadHealthInput>({
    monthlyEnquiries: 120,
    avgResponseTimeHours: 4.5,
    leadsFollowedUp: 70,
    leadsConverted: 7,
    avgDealValue: 30000,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LeadHealthResult | null>(null);

  const fetchHealthData = async (values: LeadHealthInput) => {
    setLoading(true);
    try {
      const data = await calculateLeadHealth(values);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthData(form);
  }, []);

  const handleChange = (field: keyof LeadHealthInput, value: number) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
  };

  const handleRecalculate = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHealthData(form);
  };

  return (
    <div id="lead-health-demo" className="max-w-6xl mx-auto space-y-6">
      {/* Demo Header */}
      <div className="bento-card p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Interactive Showcase #3
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Revenue Leakage Engine</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                AI Lead Health Check & Opportunity Calculator
              </h2>
            </div>
          </div>

          <button
            onClick={() => onOpenLeadModal(`I want to fix lead response delay and recover estimated revenue leakage for our business.`)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold border border-emerald-400/30 shadow-lg shadow-emerald-600/20 transition-all self-start md:self-auto"
          >
            <span>Get This Built For My Business</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10">
          Enter your monthly enquiry volume, team response latency, and conversion stats. The calculator assesses your pipeline response health, computes lead leakage value, and highlights high-impact AI automation opportunities.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form */}
        <form onSubmit={handleRecalculate} className="lg:col-span-5 bento-card p-6 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span>Pipeline Operating Parameters</span>
            <button
              type="submit"
              disabled={loading}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span>Update Analysis</span>
            </button>
          </div>

          {/* Slider 1: Monthly Enquiries */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Monthly Inbound Enquiries</span>
              <span className="font-bold text-white font-mono">{form.monthlyEnquiries} leads</span>
            </div>
            <input
              type="range"
              min="20"
              max="1000"
              step="10"
              value={form.monthlyEnquiries}
              onChange={(e) => handleChange('monthlyEnquiries', Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Slider 2: Average Response Time */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Average 1st Response Latency</span>
              <span className={`font-bold font-mono ${form.avgResponseTimeHours > 2 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {form.avgResponseTimeHours} hours
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="24"
              step="0.5"
              value={form.avgResponseTimeHours}
              onChange={(e) => handleChange('avgResponseTimeHours', Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Slider 3: Leads Followed Up */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Leads Followed Up</span>
              <span className="font-bold text-white font-mono">{form.leadsFollowedUp} / {form.monthlyEnquiries}</span>
            </div>
            <input
              type="range"
              min="0"
              max={form.monthlyEnquiries}
              step="1"
              value={form.leadsFollowedUp}
              onChange={(e) => handleChange('leadsFollowedUp', Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Slider 4: Leads Converted */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Leads Converted to Paying Deals</span>
              <span className="font-bold text-white font-mono">{form.leadsConverted} deals</span>
            </div>
            <input
              type="range"
              min="0"
              max={form.leadsFollowedUp}
              step="1"
              value={form.leadsConverted}
              onChange={(e) => handleChange('leadsConverted', Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Input: Average Deal Value */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 block">Average Deal / Customer Lifetime Value (₹)</label>
            <input
              type="number"
              value={form.avgDealValue}
              onChange={(e) => handleChange('avgDealValue', Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:border-emerald-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 border border-emerald-400/30 transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>Recalculate Leakage & Opportunity</span>
          </button>
        </form>

        {/* Right Dashboard */}
        <div className="lg:col-span-7 space-y-4">
          {result && (
            <>
              {/* Financial Leakage Hero Box */}
              <div className="bento-card p-6 bg-gradient-to-br from-[#0c1812] to-[#060e0a] border-emerald-500/30 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
                      Estimated Monthly Revenue Leakage
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 mt-1 font-mono">
                      ₹{result.potentialLeadLeakage.estimatedRevenueLost.toLocaleString('en-IN')}
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Lost due to ~<strong>{result.potentialLeadLeakage.leakedLeads} missed or decayed leads</strong> each month.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bento-subcard border-emerald-500/20 text-right shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                      Potential Gain with AI
                    </span>
                    <div className="text-2xl font-extrabold text-emerald-400 mt-0.5 font-mono">
                      +₹{result.illustrativeOpportunity.potentialRevenueGain.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      from +{result.illustrativeOpportunity.potentialExtraDeals} extra closed deals/mo
                    </span>
                  </div>
                </div>
              </div>

              {/* Health Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bento-subcard p-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Response Speed SLA
                  </span>
                  <div className={`text-lg font-bold mt-1 font-mono ${
                    result.responseHealth.status === 'Critical' ? 'text-rose-400' :
                    result.responseHealth.status === 'Needs Attention' ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {result.responseHealth.status}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                    {result.responseHealth.note}
                  </p>
                </div>

                <div className="bento-subcard p-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Follow-up Coverage
                  </span>
                  <div className="text-lg font-bold text-white mt-1 font-mono">
                    {result.followUpHealth.followUpRate}%
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                    {result.followUpHealth.status} ({form.monthlyEnquiries - form.leadsFollowedUp} unattended leads)
                  </p>
                </div>

                <div className="bento-subcard p-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Conversion Rate
                  </span>
                  <div className="text-lg font-bold text-emerald-400 mt-1 font-mono">
                    {result.conversionRate.rate}%
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                    Benchmark: {result.conversionRate.benchmark}%
                  </p>
                </div>
              </div>

              {/* High-Impact AI Opportunities */}
              <div className="bento-card p-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>High-Impact AI Interventions to Plug Leakage</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {result.aiOpportunities.map((opp, idx) => (
                    <div key={idx} className="bento-subcard p-3 space-y-1">
                      <div className="text-xs font-bold text-white">{opp.title}</div>
                      <p className="text-[11px] text-slate-400 leading-snug">{opp.description}</p>
                      <div className="text-[10px] text-emerald-400 font-semibold pt-1">
                        🚀 {opp.estimatedImpact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
