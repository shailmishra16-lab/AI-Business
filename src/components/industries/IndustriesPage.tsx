import React, { useState } from 'react';
import {
  Building2,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Zap,
  TrendingUp,
  Car,
  Stethoscope,
  GraduationCap,
  Home,
  ShoppingBag,
  Utensils,
  Scissors,
  Briefcase,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { INDUSTRY_SOLUTIONS_LIST } from '../../data/mockData';

interface IndustriesPageProps {
  onOpenLeadModal: (context?: string) => void;
  onNavigateDemo: (demoId: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onOpenLeadModal, onNavigateDemo }) => {
  const [selectedId, setSelectedId] = useState<string>(INDUSTRY_SOLUTIONS_LIST[0].id);

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'car':
        return Car;
      case 'stethoscope':
        return Stethoscope;
      case 'graduation-cap':
        return GraduationCap;
      case 'home':
        return Home;
      case 'shopping-bag':
        return ShoppingBag;
      case 'utensils':
        return Utensils;
      case 'scissors':
        return Scissors;
      case 'briefcase':
        return Briefcase;
      default:
        return Layers;
    }
  };

  const currentData = INDUSTRY_SOLUTIONS_LIST.find((ind) => ind.id === selectedId) || INDUSTRY_SOLUTIONS_LIST[0];
  const IconComponent = getIndustryIcon(currentData.icon);

  return (
    <div id="industries-page" className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          <Building2 className="w-3.5 h-3.5" />
          <span>Tailored Business Verticals</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Practical AI Solutions by Industry
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Every industry has distinct operational bottlenecks. Explore how we solve friction points in your domain.
        </p>
      </div>

      {/* Industry Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {INDUSTRY_SOLUTIONS_LIST.map((ind) => {
          const Icon = getIndustryIcon(ind.icon);
          const isSelected = selectedId === ind.id;
          return (
            <button
              key={ind.id}
              onClick={() => setSelectedId(ind.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                isSelected
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div
                className={`p-2 rounded-xl ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-600'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold truncate">{ind.industry}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Industry Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Industry Blueprint
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                {currentData.industry}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">{currentData.headline}</p>
            </div>
          </div>

          <button
            onClick={() => onOpenLeadModal(`I want to discuss an AI solution for our ${currentData.industry} business.`)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all self-start md:self-auto"
          >
            <span>Discuss Solution for {currentData.industry.split(' ')[0]}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Problem vs Opportunity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/60 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Common Industry Bottlenecks</span>
            </div>
            <ul className="space-y-1.5 text-xs text-rose-950 font-medium">
              {currentData.problems.map((prob, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>High-Value AI Opportunities</span>
            </div>
            <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
              {currentData.aiOpportunities.map((opp, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{opp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Step-by-Step Workflow Blueprint */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Recommended Operational AI Workflow:
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
            {currentData.workflow}
          </div>
        </div>

        {/* Demo Link Banner */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <h4 className="text-sm font-bold text-white">Recommended Live Demo Tool for {currentData.industry}</h4>
            <p className="text-xs text-slate-300">
              Test the AI logic using sample datasets tailored for this industry.
            </p>
          </div>

          <button
            onClick={() => onNavigateDemo(currentData.demoRoute)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm"
          >
            <span>Launch Recommended Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
