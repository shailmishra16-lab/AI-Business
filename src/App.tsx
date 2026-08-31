import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { LeadModal } from './components/layout/LeadModal';
import { HeroSection } from './components/home/HeroSection';
import { DemoCardsSection } from './components/home/DemoCardsSection';
import { AboutSection } from './components/home/AboutSection';
import { CaseStudiesSection } from './components/home/CaseStudiesSection';
import { InteractionAnalyzerDemo } from './components/demos/InteractionAnalyzerDemo';
import { CustomerVoiceDemo } from './components/demos/CustomerVoiceDemo';
import { LeadHealthDemo } from './components/demos/LeadHealthDemo';
import { SalesCoachDemo } from './components/demos/SalesCoachDemo';
import { ReviewAnalyzerDemo } from './components/demos/ReviewAnalyzerDemo';
import { BusinessAssistantDemo } from './components/demos/BusinessAssistantDemo';
import { SolutionsPage } from './components/solutions/SolutionsPage';
import { IndustriesPage } from './components/industries/IndustriesPage';
import { BusinessScanPage } from './components/scan/BusinessScanPage';
import { AdminLeadsDashboard } from './components/admin/AdminLeadsDashboard';
import { Sparkles, ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react';
import { OWNER_INFO } from './data/mockData';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [leadModalOpen, setLeadModalOpen] = useState<boolean>(false);
  const [modalProblemContext, setModalProblemContext] = useState<string>('');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLeadModal = (context?: string) => {
    setModalProblemContext(context || '');
    setLeadModalOpen(true);
  };

  // Render sub-view according to currentPath
  const renderContent = () => {
    // 1. Interactive Demo 1: Interaction Analyzer
    if (currentPath === '/demos/interaction-analyzer') {
      return (
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Showcases</span>
          </button>
          <InteractionAnalyzerDemo onOpenLeadModal={handleOpenLeadModal} />
        </div>
      );
    }

    // 2. Interactive Demo 2: Customer Voice
    if (currentPath === '/demos/customer-voice') {
      return (
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Showcases</span>
          </button>
          <CustomerVoiceDemo onOpenLeadModal={handleOpenLeadModal} />
        </div>
      );
    }

    // 3. Interactive Demo 3: Lead Health & Leakage Calculator
    if (currentPath === '/demos/lead-health') {
      return (
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Showcases</span>
          </button>
          <LeadHealthDemo onOpenLeadModal={handleOpenLeadModal} />
        </div>
      );
    }

    // 4. Interactive Demo 4: Sales Conversation Coach
    if (currentPath === '/demos/sales-coach') {
      return (
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Showcases</span>
          </button>
          <SalesCoachDemo onOpenLeadModal={handleOpenLeadModal} />
        </div>
      );
    }

    // 5. Interactive Demo 5: Review Analyzer
    if (currentPath === '/demos/review-analyzer') {
      return (
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Showcases</span>
          </button>
          <ReviewAnalyzerDemo onOpenLeadModal={handleOpenLeadModal} />
        </div>
      );
    }

    // 6. Interactive Demo 6: Business Assistant Chatbot
    if (currentPath === '/demos/business-assistant') {
      return (
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Showcases</span>
          </button>
          <BusinessAssistantDemo onOpenLeadModal={handleOpenLeadModal} />
        </div>
      );
    }

    // 7. Solutions Page (4 Pillars)
    if (currentPath === '/solutions') {
      return <SolutionsPage onOpenLeadModal={handleOpenLeadModal} onNavigateDemo={navigate} />;
    }

    // 8. Industries Page (9 Verticals)
    if (currentPath === '/industries') {
      return <IndustriesPage onOpenLeadModal={handleOpenLeadModal} onNavigateDemo={navigate} />;
    }

    // 9. About Shailendra Page
    if (currentPath === '/about') {
      return (
        <div className="pt-24">
          <AboutSection onOpenLeadModal={() => handleOpenLeadModal()} />
        </div>
      );
    }

    // 10. Free AI Business Opportunity Scan Lead Magnet
    if (currentPath === '/scan') {
      return <BusinessScanPage />;
    }

    // 11. Owner Admin Leads Dashboard
    if (currentPath === '/admin/leads') {
      return <AdminLeadsDashboard />;
    }

    // Default: Home Landing View with all core sections
    return (
      <div className="space-y-0">
        <HeroSection onNavigate={navigate} onOpenLeadModal={() => handleOpenLeadModal()} />
        <DemoCardsSection onNavigate={navigate} />
        <CaseStudiesSection onOpenLeadModal={handleOpenLeadModal} onNavigateDemo={navigate} />
        <AboutSection onOpenLeadModal={() => handleOpenLeadModal()} />

        {/* Global Bottom CTA Ribbon */}
        <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let's Build Practical AI Together</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Have a Business Bottleneck in Mind?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              You don't need to know if AI can solve it. Describe your problem, and let's explore if a custom WhatsApp workflow, speech analytics auditor, or interactive portal makes sense.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => handleOpenLeadModal()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-sm text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Describe Your Business Problem</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={OWNER_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-sm text-white shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Shailendra Direct</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05070a] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white relative">
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[128px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[128px] pointer-events-none -z-10"></div>

      {/* Top Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenLeadModal={() => handleOpenLeadModal()}
      />

      {/* Main App Content Body */}
      <main className="flex-1">{renderContent()}</main>

      {/* Persistent Footer */}
      <Footer onNavigate={navigate} onOpenLeadModal={() => handleOpenLeadModal()} />

      {/* Floating WhatsApp Contact Quick Trigger */}
      <FloatingWhatsApp />

      {/* Business Problem Intake Modal */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaultProblem={modalProblemContext}
      />
    </div>
  );
}
