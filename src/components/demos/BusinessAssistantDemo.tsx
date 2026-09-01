import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  ArrowRight,
  User,
  MessageSquare,
  RefreshCw,
  HelpCircle,
  Cpu,
  Building,
  CheckCircle2
} from 'lucide-react';
import { sendAssistantMessage } from '../../utils/api';
import { ChatMessage } from '../../types';
import { OWNER_INFO } from '../../data/mockData';

interface BusinessAssistantDemoProps {
  onOpenLeadModal: (problemContext?: string) => void;
}

export const BusinessAssistantDemo: React.FC<BusinessAssistantDemoProps> = ({ onOpenLeadModal }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `Hello! I'm the **AI GrowthLab Business Assistant**, designed by **Shailendra Mishra**.\n\nI help founders, business owners, and CX leaders discover practical, measurable AI applications for:\n- **24/7 WhatsApp Lead Qualification & Instant Quoting**\n- **Speech Analytics & 100% Sales Call QA Coaching**\n- **Customer Interaction & Root-Cause Pain Point Intelligence**\n- **No-Show Reduction & Automated Follow-Up Cadences**\n\nTell me about your business or pick a scenario below to explore a tailored AI architecture.`,
      timestamp: 'Just now',
      showCta: true,
      suggestedPrompts: [
        'I run a multi-brand car dealership with 400 monthly leads',
        'I own a specialty clinic with high patient no-shows',
        'We run a coaching academy and want sales call audits',
        'How can WhatsApp AI recover cold leads automatically?',
      ],
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInputPrompt('');
    setLoading(true);

    try {
      const response = await sendAssistantMessage(
        updatedHistory.map((m) => ({ role: m.role, content: m.content }))
      );

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showCta: response.showCta ?? true,
        suggestedPrompts: response.suggestedPrompts,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `I'd be glad to discuss how AI can streamline that exact workflow. You can submit your problem directly or message Shailendra on WhatsApp to design a custom blueprint.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showCta: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div id="business-assistant-demo" className="max-w-4xl mx-auto space-y-6">
      {/* Assistant Header Box */}
      <div className="bento-card p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0 shadow-inner">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Interactive Showcase #6
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Conversational Engine</span>
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
              AI GrowthLab Business & Architecture Consultant
            </h2>
          </div>
        </div>

        <button
          onClick={() => onOpenLeadModal("I chatted with your AI Business Assistant and would like a custom architecture discovery call.")}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
        >
          <span>Submit Custom Request</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Chat Container */}
      <div className="bento-card flex flex-col h-[560px] overflow-hidden">
        {/* Messages List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/10 text-indigo-400 border border-white/10'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bento-subcard text-slate-200 border-white/10'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                {msg.showCta && msg.role === 'assistant' && (
                  <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => onOpenLeadModal(msg.content.slice(0, 120))}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>Book 30-Min Discovery Session</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <a
                      href={OWNER_INFO.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] text-xs font-bold border border-[#25D366]/30 flex items-center gap-1.5 transition-colors"
                    >
                      <span>WhatsApp Shailendra</span>
                    </a>
                  </div>
                )}

                {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                  <div className="pt-2 border-t border-white/5 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Suggested Inquiries:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedPrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(prompt)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] border border-white/10 text-left transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/10 text-indigo-400 border border-white/10 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bento-subcard p-3 rounded-2xl text-xs text-slate-400 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>Thinking and analyzing business context...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about conversational AI, WhatsApp bots, speech QA, or your industry challenge..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 outline-none transition-all"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputPrompt.trim()}
              className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold transition-all shadow-md shadow-indigo-600/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
