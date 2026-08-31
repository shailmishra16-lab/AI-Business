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
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                  Interactive Showcase #6
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Consultative Agent
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                AI GrowthLab Business Solutions Consultant
              </h2>
            </div>
          </div>

          <button
            onClick={() => onOpenLeadModal('I chatted with the AI Business Assistant and want to explore a custom build.')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 text-xs font-semibold border border-cyan-200 transition-colors self-start sm:self-auto"
          >
            <span>Submit Business Problem</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Ask questions about automating lead intake, speech analytics for your telecalling team, WhatsApp workflows, or customer retention.
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm flex flex-col h-[560px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/40">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[78%] space-y-2`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-xs shadow-xs'
                        : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line font-sans space-y-2">
                      {msg.content}
                    </div>

                    {/* CTA Box inside Assistant Message */}
                    {!isUser && msg.showCta && (
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => onOpenLeadModal(`Context from chat: ${msg.content.slice(0, 150)}...`)}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Submit My Problem for Shailendra</span>
                        </button>
                        <a
                          href={OWNER_INFO.whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3 h-3 text-emerald-600" />
                          <span>Discuss on WhatsApp</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Suggestion Chips */}
                  {!isUser && msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedPrompts.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(chip)}
                          className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50 text-slate-700 text-[11px] font-medium transition-all shadow-2xs text-left"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}

                  <div
                    className={`text-[10px] text-slate-400 px-1 ${
                      isUser ? 'text-right' : 'text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-500 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse delay-75"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse delay-150"></span>
                <span className="ml-1 text-slate-600 font-medium">Consultant formulating practical AI recommendations...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            id="business-assistant-input"
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about automating your business or describe your customer process..."
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100 outline-none transition-all"
          />
          <button
            id="business-assistant-send-btn"
            onClick={() => handleSendMessage()}
            disabled={loading || !inputPrompt.trim()}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
