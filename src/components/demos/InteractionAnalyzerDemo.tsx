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
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Negative':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'Immediate':
      case 'High':
        return 'bg-amber-50 text-amber-700 border-amber-200 font-bold';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div id="interaction-analyzer-demo" className="max-w-6xl mx-auto space-y-8">
      {/* Demo Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <MessageSquareText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Interactive Showcase #1
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Gemini Backend
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                AI Customer Interaction Analyzer
              </h2>
            </div>
          </div>

          <button
            onClick={() => onOpenLeadModal("I want an automated Customer Interaction Analyzer for our support and sales chats.")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors self-start md:self-auto"
          >
            <span>Get This Built For My Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Paste any multi-turn customer chat, email, or support transcript. The AI instantly classifies customer intent, extracts the underlying root-cause pain point, scores urgency, highlights churn risk, and writes a professional, empathetic response.
        </p>

        {/* Preset Selector */}
        <div className="mt-6">
          <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Load Real-World Scenarios:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {INTERACTION_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setInputText(preset.text)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                  inputText === preset.text
                    ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
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
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Customer Transcript / Message
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              {inputText.length} chars
            </span>
          </div>

          <textarea
            id="interaction-input-textarea"
            rows={11}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste transcript or type customer chat here..."
            className="w-full p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm font-mono leading-relaxed text-slate-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none bg-slate-50/50"
          />

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              id="interaction-analyze-btn"
              onClick={handleAnalyze}
              disabled={loading}
              className="flex-1 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Interaction...</span>
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
              className="px-3.5 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium transition-colors"
              title="Clear input"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Right Column: Results Dashboard */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto"></div>
              <h4 className="text-base font-bold text-slate-900">
                Running Multi-Dimensional Speech & Sentiment Audit...
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Extracting customer intent, identifying pain point root cause, scoring business risk, and crafting tailored reply.
              </p>
            </div>
          ) : result ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Primary Metas Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Sentiment
                  </div>
                  <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getSentimentBadge(result.sentiment)}`}>
                    {result.sentiment}
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Urgency
                  </div>
                  <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border ${getUrgencyBadge(result.urgency)}`}>
                    {result.urgency}
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Follow-Up Priority
                  </div>
                  <div className="mt-1 text-xs font-bold text-slate-800 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{result.follow_up_priority}</span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Classified Intent
                  </div>
                  <div className="mt-1 text-xs font-bold text-slate-900 truncate" title={result.intent}>
                    {result.intent}
                  </div>
                </div>
              </div>

              {/* Analysis Cards */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                {/* Pain Point */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Customer Pain Point (Root Cause)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium bg-rose-50/50 p-3 rounded-xl border border-rose-100">
                    {result.customer_pain_point}
                  </p>
                </div>

                {/* Business Risk & Action Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                      <span>Business & Churn Risk</span>
                    </div>
                    <p className="text-xs text-amber-950 leading-relaxed">
                      {result.business_risk}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/60">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-800 mb-1">
                      <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                      <span>Recommended Action</span>
                    </div>
                    <p className="text-xs text-blue-950 leading-relaxed">
                      {result.recommended_action}
                    </p>
                  </div>
                </div>

                {/* Suggested Response */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>AI Suggested Response (Ready to Dispatch)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleToggleSpeech}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                        title="Listen to audio synthesis"
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-red-500" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Audio</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleCopyResponse}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs sm:text-sm leading-relaxed font-sans border border-slate-800 shadow-inner">
                    {result.suggested_response}
                  </div>
                </div>

                {/* Tags */}
                {result.key_topics && result.key_topics.length > 0 && (
                  <div className="pt-2 flex items-center flex-wrap gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-slate-400" />
                    {result.key_topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 text-slate-700"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-700">Awaiting Interaction Input</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Click any of the example presets above or paste your custom chat, then click <strong>"Analyze Interaction"</strong> to generate structured intelligence.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
