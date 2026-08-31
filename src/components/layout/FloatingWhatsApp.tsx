import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, X, ArrowUpRight } from 'lucide-react';
import { OWNER_INFO } from '../../data/mockData';

export const FloatingWhatsApp: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div id="floating-whatsapp-container" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Contact Card */}
      {expanded && (
        <div className="mb-3 w-80 rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-900/20 p-4 text-slate-900 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">Shailendra Mishra</h4>
                <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Usually replies within minutes
                </p>
              </div>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="py-3 text-xs text-slate-600 leading-relaxed">
            Hi! Tell me what business bottleneck you are trying to solve with AI or automation, and I'll share a practical solution.
          </p>

          <div className="space-y-2">
            <a
              id="floating-whatsapp-chat-now"
              href={OWNER_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-between shadow-md shadow-emerald-600/20 transition-all"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </a>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${OWNER_INFO.phone.replace(/[^0-9+]/g, '')}`}
                className="py-2 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Call Shailendra</span>
              </a>
              <a
                href={`mailto:${OWNER_INFO.email}`}
                className="py-2 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-600" />
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        id="floating-whatsapp-trigger"
        onClick={() => setExpanded(!expanded)}
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all"
        aria-label="Contact Shailendra via WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>
        <MessageSquare className="w-5 h-5" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">WhatsApp Shailendra</span>
      </button>
    </div>
  );
};
