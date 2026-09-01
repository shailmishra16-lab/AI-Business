import React, { useState } from 'react';
import {
  MessageSquareText,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Volume2,
  VolumeX,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Lightbulb,
  Tag,
  RefreshCw,
  Send,
  Zap,
  HelpCircle
} from 'lucide-react';
import { analyzeInteraction } from '../../utils/api';
import { InteractionAnalysisResult } from '../../types';
import { INTERACTION_PRESETS } from '../../data/mockData';

interface InteractionAnalyzerDemoProps {
  onOpenLeadModal: (problemContext?: string) => void;
}

export const InteractionAnalyzerDemo: React.FC<InteractionAnalyzerDemoProps> = ({ onOpenLeadModal }) => {
  const [inputText, setInputText] = useState(INTERACTION_PRESETS[0].text);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InteractionAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError('Please enter or select a customer interaction transcript.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const data = await analyzeInteraction(inputText);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResponse = () => {
    if (!result?.suggested_response) return;
    navigator.clipboard.writeText(result.suggested_response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleToggleSpeech = () => {
    if (!result?.suggested_response) return;
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(result.suggested_response);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Negative':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'Immediate':
      case 'High':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30 font-bold';
      case 'Medium':
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div id="interaction-analyzer-demo" className="max-w-6xl mx-auto space-y-6">
      {/* Demo Header */}
      <div className="bento-card p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0 shadow-inner">
              <MessageSquareText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Interactive Showcase #1
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Active Analysis Engine</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                AI Customer Interaction Analyzer
              </h2>
            </div>
          </div>

          <button
            onClick={() => onOpenLeadModal("I want an automated Customer Interaction Analyzer for our support and sales chats.")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold border border-indigo-400/30 shadow-lg shadow-indigo-600/20 transition-all self-start md:self-auto"
          >
            <span>Get This Built For My Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10">
          Paste any multi-turn customer chat, email, or support transcript. The AI instantly classifies customer intent, extracts the underlying root-cause pain point, scores urgency, highlights churn risk, and writes a professional, empathetic response.
        </p>

        {/* Preset Selector */}
        <div className="mt-6 relative z-10">
          <div className="text-xs font-semibold text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Load Real-World Scenarios or Paste Your Own Below:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {INTERACTION_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setInputText(preset.text)}
                className={`px-3 py-2.5 rounded-xl text-xs text-left transition-all border ${
                  inputText === preset.text
                    ? 'border-indigo-500 bg-indigo-500/20 text-white font-semibold shadow-inner'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input / Execution Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 bento-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Customer Transcript / Message
            </label>
            <span className="text-[11px] text-slate-500 font-mono">
              {inputText.length} chars
            </span>
          </div>

          <textarea
            id="interaction-input-textarea"
            rows={11}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste transcript or type customer chat here..."
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm font-mono leading-relaxed text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all resize-none placeholder-slate-500"
          />

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              id="interaction-analyze-btn"
              onClick={handleAnalyze}
              disabled={loading}
              className="flex-1 py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-indigo-600/30 border border-indigo-400/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Transcript...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Analyze Interaction</span>
                </>
              )}
            </button>

            <button
              onClick={() => setInputText('')}
              className="px-3.5 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-semibold transition-colors"
              title="Clear input"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Right Column: Results Dashboard */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="bento-card p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mx-auto"></div>
              <h4 className="text-base font-bold text-white">
                Running Multi-Dimensional Speech & Sentiment Audit...
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Extracting customer intent, identifying pain point root cause, scoring business risk, and crafting tailored reply.
              </p>
            </div>
          ) : result ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Primary Metas Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bento-subcard p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Sentiment
                  </div>
                  <div className={`mt-1.5 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getSentimentBadge(result.sentiment)}`}>
                    {result.sentiment}
                  </div>
                </div>

                <div className="bento-subcard p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Urgency
                  </div>
                  <div className={`mt-1.5 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getUrgencyBadge(result.urgency)}`}>
                    {result.urgency}
                  </div>
                </div>

                <div className="bento-subcard p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    SLA Priority
                  </div>
                  <div className="mt-1.5 text-xs font-bold text-slate-200 font-mono">
                    {result.followUpPriority}
                  </div>
                </div>

                <div className="bento-subcard p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Detected Intent
                  </div>
                  <div className="mt-1.5 text-xs font-bold text-indigo-300 truncate" title={result.intent}>
                    {result.intent}
                  </div>
                </div>
              </div>

              {/* Pain Point & Business Risk Bento Box */}
              <div className="bento-card p-5 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Customer Pain Point Root Cause</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {result.customer_pain_point}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Business Churn & Leakage Risk</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {result.business_risk}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4" />
                    <span>Recommended Immediate Action</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-semibold">
                    {result.recommended_action}
                  </p>
                </div>
              </div>

              {/* AI Suggested Response Box */}
              <div className="bento-card p-5 space-y-3 border-indigo-500/30 bg-gradient-to-br from-[#0c101c] to-[#080a10]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                    <Send className="w-3.5 h-3.5" />
                    <span>AI-Generated Empathetic Reply</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleToggleSpeech}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      title={isSpeaking ? "Stop Voice" : "Listen Voice"}
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4 text-indigo-400 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={handleCopyResponse}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs"
                      title="Copy Response"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-100 leading-relaxed font-sans select-all">
                  {result.suggested_response}
                </div>

                {/* Topics Tag List */}
                {result.key_topics && result.key_topics.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mr-1">
                      Key Topics:
                    </span>
                    {result.key_topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-slate-300 border border-white/10"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bento-card p-12 text-center space-y-4 border-dashed border-white/10">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto shadow-inner">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">
                  Ready to Analyze Customer Interactions
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click <strong>Analyze Interaction</strong> to inspect customer sentiment, identify churn risks, and generate an AI reply.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
