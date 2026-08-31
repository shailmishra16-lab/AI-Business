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
    <div id="lead-health-demo" className="max-w-6xl mx-auto space-y-8">
      {/* Demo Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Interactive Showcase #3
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Revenue Leakage Engine
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                AI Lead Health Check & Opportunity Calculator
              </h2>
            </div>
          </div>

          <button
            onClick={() => onOpenLeadModal(`I want to fix lead response delay and recover estimated revenue leakage for our business.`)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors self-start md:self-auto"
          >
            <span>Get This Built For My Business</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Enter your monthly enquiry volume, team response latency, and conversion stats. The calculator assesses your pipeline response health, computes lead leakage value, and highlights high-impact AI automation opportunities.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
            Pipeline Parameters
          </h3>

          <form onSubmit={handleRecalculate} className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Monthly Enquiries Received</span>
                <span className="text-blue-600 font-bold">{form.monthlyEnquiries}</span>
              </div>
              <input
                type="range"
                min={20}
                max={1000}
                step={10}
                value={form.monthlyEnquiries}
                onChange={(e) => handleChange('monthlyEnquiries', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>20</span>
                <span>500</span>
                <span>1,000+</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Average First Response Time</span>
                <span className="text-rose-600 font-bold">
                  {form.avgResponseTimeHours < 1
                    ? `${Math.round(form.avgResponseTimeHours * 60)} mins`
                    : `${form.avgResponseTimeHours} hrs`}
                </span>
              </div>
              <input
                type="range"
                min={0.1}
                max={24}
                step={0.5}
                value={form.avgResponseTimeHours}
                onChange={(e) => handleChange('avgResponseTimeHours', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>&lt;10 mins</span>
                <span>4 hrs</span>
                <span>24 hrs</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Leads Actually Followed Up</span>
                <span className="text-slate-800 font-bold">
                  {form.leadsFollowedUp} ({Math.round((form.leadsFollowedUp / form.monthlyEnquiries) * 100)}%)
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={form.monthlyEnquiries}
                step={5}
                value={Math.min(form.leadsFollowedUp, form.monthlyEnquiries)}
                onChange={(e) => handleChange('leadsFollowedUp', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Leads Converted Into Paying Customers</span>
                <span className="text-emerald-700 font-bold">{form.leadsConverted}</span>
              </div>
              <input
                type="range"
                min={1}
                max={Math.min(form.leadsFollowedUp, 100)}
                step={1}
                value={form.leadsConverted}
                onChange={(e) => handleChange('leadsConverted', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Average Customer Deal / Order Value (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  min={1000}
                  step={1000}
                  value={form.avgDealValue}
                  onChange={(e) => handleChange('avgDealValue', Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:border-blue-600 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <TrendingUp className="w-3.5 h-3.5" />}
              <span>Calculate Leakage & Opportunity</span>
            </button>
          </form>
        </div>

        {/* Right Output Dashboard */}
        <div className="lg:col-span-7 space-y-4">
          {result && (
            <>
              {/* Top Summary Meters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Response Speed Meter */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Response Health
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        result.responseHealth.status === 'Excellent'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : result.responseHealth.status === 'Good'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {result.responseHealth.status}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900">
                      {result.responseHealth.score}
                    </span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {result.responseHealth.note}
                  </p>
                </div>

                {/* Follow-up Velocity */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Follow-up Rate
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {result.followUpHealth.followUpRate}%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900">
                      {result.conversionRate.rate}%
                    </span>
                    <span className="text-xs text-slate-500">
                      Conv. (Benchmark: ~{result.conversionRate.benchmark}%)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Status: <strong className="text-slate-800">{result.conversionRate.status}</strong>
                  </p>
                </div>
              </div>

              {/* Financial Leakage & Opportunity Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-rose-50/70 border border-rose-200/70 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-800">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Potential Lead Leakage</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-rose-950">
                    ₹{result.potentialLeadLeakage.estimatedRevenueLost.toLocaleString()}
                  </div>
                  <p className="text-xs text-rose-800">
                    ~{result.potentialLeadLeakage.leakedLeads} leads lost to delay & missed touchpoints each month.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-emerald-50/70 border border-emerald-200/70 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Illustrative Opportunity</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
                    +₹{result.illustrativeOpportunity.potentialRevenueGain.toLocaleString()}
                  </div>
                  <p className="text-xs text-emerald-800">
                    With instant sub-60s qualification & follow-up (+{result.illustrativeOpportunity.potentialExtraDeals} deals/mo).
                  </p>
                </div>
              </div>

              {/* Mandatory Disclaimer */}
              <div className="p-3 rounded-2xl bg-slate-100/80 border border-slate-200 text-slate-500 text-[11px] flex items-center gap-2">
                <Info className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span>
                  * Illustrative estimate based on information entered. Actual business conversion lift depends on industry sales cycles and rep execution.
                </span>
              </div>

              {/* AI Opportunity Cards */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Recommended AI Automation Modules to Recover Lost Revenue:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.aiOpportunities.map((opp, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </div>
                        <h5 className="text-xs font-bold text-slate-900">{opp.title}</h5>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-8">
                        {opp.description}
                      </p>
                      <div className="pl-8 text-[11px] font-semibold text-emerald-700">
                        {opp.estimatedImpact}
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
