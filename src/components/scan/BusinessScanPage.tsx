import React, { useState } from 'react';
import {
  Scan,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Building,
  Mail,
  Phone,
  Send,
  Zap,
  TrendingUp,
  MessageSquare,
  Clock,
  Check
} from 'lucide-react';
import { submitLead } from '../../utils/api';
import { IndustryType } from '../../types';
import { OWNER_INFO } from '../../data/mockData';

export const BusinessScanPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    industry: 'Automobile' as IndustryType,
    monthlyVolume: '100 - 300 inquiries/mo',
    primaryBottleneck: 'Slow first-response time & lost leads',
    toolsUsed: ['WhatsApp', 'Phone Calls'],
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any | null>(null);

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

  const bottlenecks = [
    'Slow first-response time & lost leads to competitors',
    'High appointment/consultation no-shows & missed follow-ups',
    'No visibility or QA on sales rep call conversations',
    'Overwhelming repetitive customer questions on WhatsApp',
    'Uncategorized customer reviews & negative feedback',
    'Manual quote generation & spreadsheet bottlenecks',
  ];

  const availableTools = ['WhatsApp', 'Phone Calls', 'Excel / Google Sheets', 'CRM (HubSpot/LeadSquared)', 'Google Forms', 'Website Chat'];

  const toggleTool = (tool: string) => {
    if (formData.toolsUsed.includes(tool)) {
      setFormData({ ...formData, toolsUsed: formData.toolsUsed.filter((t) => t !== tool) });
    } else {
      setFormData({ ...formData, toolsUsed: [...formData.toolsUsed, tool] });
    }
  };

  const handleRunScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.email.includes('@')) {
      setError('Please provide your name and a valid business email address.');
      return;
    }

    setLoading(true);

    try {
      // Formulate problem summary
      const problemSummary = `[Free AI Opportunity Scan] Industry: ${formData.industry} | Volume: ${formData.monthlyVolume} | Primary Bottleneck: ${formData.primaryBottleneck} | Tools: ${formData.toolsUsed.join(', ')}`;

      // Save to backend leads registry
      await submitLead({
        name: formData.name,
        businessName: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        industry: formData.industry,
        problem: problemSummary,
        preferredContact: 'WhatsApp',
      });

      // Generate instant diagnostic analysis
      setScanResult({
        opportunityScore: 88,
        potentialEfficiencyLift: '35% – 50% Reduction in Response Decay',
        recommendedModules: [
          {
            name: `Instant ${formData.industry} WhatsApp Intake & Qualification Bot`,
            impact: 'Responds within 30 seconds with dynamic answers, brochures, and quote calculators.',
            timeline: '3 - 5 days',
          },
          {
            name: 'Automated Rep Notification & Context Handover Webhook',
            impact: 'Alerts floor sales reps within 2 minutes when high-intent prospects request live contact.',
            timeline: '2 - 3 days',
          },
          {
            name: 'Speech & Interaction Sentiment Intelligence Audit',
            impact: 'Audits 100% of customer interactions against standardized CX quality matrix.',
            timeline: '5 - 7 days',
          },
        ],
        estimatedImplementationTime: '7 – 12 Days Total',
      });

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Scan evaluation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="business-scan-page" className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          <Scan className="w-3.5 h-3.5" />
          <span>Interactive Lead Magnet</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Free AI Business Opportunity Scan
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Tell us about your operational bottleneck. Receive an instant diagnostic roadmap of high-ROI AI automations tailored for your team.
        </p>
      </div>

      {!submitted ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRunScan} className="space-y-6">
            {/* Step 1: Industry & Volume */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Your Industry Vertical
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value as IndustryType })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-white"
                >
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Estimated Monthly Inquiries / Leads
                </label>
                <select
                  value={formData.monthlyVolume}
                  onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-white"
                >
                  <option value="Under 50 inquiries/mo">Under 50 inquiries/mo</option>
                  <option value="50 - 150 inquiries/mo">50 - 150 inquiries/mo</option>
                  <option value="150 - 500 inquiries/mo">150 - 500 inquiries/mo</option>
                  <option value="500 - 1,500+ inquiries/mo">500 - 1,500+ inquiries/mo</option>
                </select>
              </div>
            </div>

            {/* Step 2: Primary Bottleneck */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                What is your biggest operational headache right now?
              </label>
              <div className="space-y-2">
                {bottlenecks.map((btnk, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs font-medium transition-all ${
                      formData.primaryBottleneck === btnk
                        ? 'border-purple-600 bg-purple-50/70 text-purple-950 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="bottleneck"
                      checked={formData.primaryBottleneck === btnk}
                      onChange={() => setFormData({ ...formData, primaryBottleneck: btnk })}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span>{btnk}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Current Channels */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Channels & Tools Currently in Use:
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTools.map((tool) => (
                  <button
                    type="button"
                    key={tool}
                    onClick={() => toggleTool(tool)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      formData.toolsUsed.includes(tool)
                        ? 'border-purple-600 bg-purple-600 text-white font-bold'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Contact Info */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Where should we send your full diagnostic roadmap?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Mehta"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-purple-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business / Clinic / Brand Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mehta Orthodontics"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-purple-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@mehtaclinic.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-purple-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Number (for instant report delivery)
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-purple-600 outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Generating AI Opportunity Scan...</span>
                </span>
              ) : (
                <>
                  <Scan className="w-5 h-5" />
                  <span>Generate Free AI Opportunity Scan</span>
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* Results View */
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8 animate-in fade-in duration-200">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Diagnostic Scan Complete!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Prepared specifically for <strong className="text-slate-900">{formData.name}</strong> ({formData.businessName || formData.industry}).
            </p>
          </div>

          {/* Diagnostic Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/70 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">
                AI Automation Feasibility
              </span>
              <div className="text-3xl font-extrabold text-purple-950">
                {scanResult.opportunityScore}% High Feasibility
              </div>
              <p className="text-xs text-purple-800">
                Standard WhatsApp & Webhook APIs can solve this friction completely without changing your core CRM.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                Expected Efficiency Recovery
              </span>
              <div className="text-2xl font-extrabold text-emerald-950">
                {scanResult.potentialEfficiencyLift}
              </div>
              <p className="text-xs text-emerald-800">
                Speed-to-lead improvement delivers an immediate lift in prospect show rates.
              </p>
            </div>
          </div>

          {/* Recommended Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Recommended 3-Stage AI Architecture:
            </h4>
            <div className="space-y-3">
              {scanResult.recommendedModules.map((mod: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900">{mod.name}</h5>
                    </div>
                    <p className="text-xs text-slate-600 pl-7">{mod.impact}</p>
                  </div>
                  <span className="pl-7 sm:pl-0 text-xs font-semibold text-purple-700 whitespace-nowrap">
                    ⚡ Time: {mod.timeline}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps CTA with Shailendra */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold text-white">
                Review this Blueprint with Shailendra Mishra
              </h4>
              <p className="text-xs text-slate-300">
                15-minute direct strategy discussion on WhatsApp or Google Meet.
              </p>
            </div>

            <a
              href={OWNER_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss On WhatsApp Now</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
