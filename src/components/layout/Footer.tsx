import React from 'react';
import {
  Cpu,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Layers,
  Building2,
  Lock
} from 'lucide-react';
import { OWNER_INFO } from '../../data/mockData';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenLeadModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLeadModal }) => {
  return (
    <footer id="main-footer" className="bg-[#05070a] text-slate-300 border-t border-white/5 relative">
      {/* Pre-footer Callout Bento Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="bento-card p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/15 transition-all"></div>
          
          <div className="max-w-2xl text-center lg:text-left z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Direct Consultation with Shailendra</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Have a specific customer bottleneck in your business?
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              You don't need a technical spec. Describe your operational challenge, and I will outline a practical AI and automation architecture for you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto z-10">
            <button
              id="footer-callout-submit-btn"
              onClick={onOpenLeadModal}
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 border border-indigo-400/30"
            >
              <span>Submit My Business Problem</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              id="footer-callout-whatsapp-btn"
              href={OWNER_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                AI Growth<span className="text-indigo-400">Lab</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              "Practical AI. Real Business Problems. Measurable Action."
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built and curated by <strong className="text-slate-200">Shailendra Mishra</strong>. Combining 15+ years of Quality Management, Speech Analytics, and Customer Experience with modern Generative AI.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href={`mailto:${OWNER_INFO.email}`} className="hover:text-white transition-colors">
                  {OWNER_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${OWNER_INFO.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                  {OWNER_INFO.phone} (WhatsApp / Voice)
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Demos */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Working AI Demos
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('/demos/interaction-analyzer')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Interaction Analyzer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/demos/customer-voice')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Customer Voice Analyzer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/demos/lead-health')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Lead Health Check
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/demos/sales-coach')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Sales Conversation Coach
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/demos/review-analyzer')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Review & Feedback Intelligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/demos/business-assistant')}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  AI Business Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions & Industries */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Solutions & Industries
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('/solutions')} className="hover:text-indigo-400 transition-colors text-left">
                  BUILD: AI Websites & Portals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/solutions')} className="hover:text-indigo-400 transition-colors text-left">
                  AUTOMATE: WhatsApp Workflows
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/solutions')} className="hover:text-indigo-400 transition-colors text-left">
                  UNDERSTAND: Speech Analytics & QA
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/solutions')} className="hover:text-indigo-400 transition-colors text-left">
                  IMPROVE: Sales Coaching & ROI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/industries')} className="hover:text-indigo-400 transition-colors text-left">
                  Automobile Dealerships
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/industries')} className="hover:text-indigo-400 transition-colors text-left">
                  Clinics & Healthcare Practices
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/industries')} className="hover:text-indigo-400 transition-colors text-left">
                  Coaching & Education Academies
                </button>
              </li>
            </ul>
          </div>

          {/* Platform & Transparency */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Transparency & Access
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-indigo-400 transition-colors text-left">
                  About Shailendra's Journey
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/scan')} className="hover:text-purple-400 transition-colors text-left text-purple-400 font-medium">
                  Free AI Opportunity Scan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-indigo-400 transition-colors text-left">
                  Schedule Direct Consultation
                </button>
              </li>
              <li className="pt-2">
                <button
                  id="footer-admin-link"
                  onClick={() => onNavigate('/admin/leads')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Owner Lead Portal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer and Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} AI GrowthLab. Created & maintained by Shailendra Mishra. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Server-Side Gemini API</span>
            </span>
            <span>•</span>
            <span className="text-slate-400">Sample & live demo environments</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

