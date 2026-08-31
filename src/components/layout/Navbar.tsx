import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Bot,
  MessageSquareText,
  Activity,
  Award,
  Star,
  Cpu,
  Layers,
  Building2,
  Scan,
  UserCheck,
  Send,
  Menu,
  X,
  ChevronDown,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';
import { OWNER_INFO } from '../../data/mockData';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenLeadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenLeadModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [demosOpen, setDemosOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const demosList = [
    {
      path: '/demos/interaction-analyzer',
      title: 'Customer Interaction Analyzer',
      desc: 'Deep sentiment, urgency & CX pain-point triage',
      icon: MessageSquareText,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      path: '/demos/customer-voice',
      title: 'Customer Voice Analyzer',
      desc: 'Multi-turn industry analytics & top complaints',
      icon: Activity,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
    {
      path: '/demos/lead-health',
      title: 'Lead Health & Revenue Leakage',
      desc: 'Response velocity formula & opportunity calculator',
      icon: Layers,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      path: '/demos/sales-coach',
      title: 'Sales Conversation Coach',
      desc: '15+ yr QA scorecard & objection drill feedback',
      icon: Award,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      path: '/demos/review-analyzer',
      title: 'Review & Feedback Intelligence',
      desc: 'Categorized sentiment & top 5 management ROI actions',
      icon: Star,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      path: '/demos/business-assistant',
      title: 'AI Business Assistant',
      desc: 'Consultative AI chatbot tailored to your industry',
      icon: Bot,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setDemosOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05070a]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3'
          : 'bg-[#05070a]/70 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-brand-logo"
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform border border-indigo-400/30">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                AI Growth<span className="text-indigo-400">Lab</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                LIVE DEMOS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden md:block">
              Practical AI & Customer Intelligence
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Demos Dropdown */}
          <div className="relative">
            <button
              id="nav-demos-dropdown"
              onClick={() => setDemosOpen(!demosOpen)}
              onMouseEnter={() => setDemosOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentPath.startsWith('/demos')
                  ? 'text-indigo-300 bg-indigo-500/15 border border-indigo-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Interactive Demos</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                  demosOpen ? 'rotate-180 text-indigo-400' : ''
                }`}
              />
            </button>

            {demosOpen && (
              <div
                onMouseLeave={() => setDemosOpen(false)}
                className="absolute top-full left-0 mt-2 w-[440px] rounded-2xl bg-[#0a0d17] border border-white/10 shadow-2xl shadow-black/80 p-3 z-50 grid grid-cols-1 gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-xl"
              >
                <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    6 Working AI Showcases
                  </span>
                  <span className="text-[11px] text-indigo-400 font-medium">Real Gemini Backend</span>
                </div>
                {demosList.map((demo) => {
                  const Icon = demo.icon;
                  const isActive = currentPath === demo.path;
                  return (
                    <button
                      key={demo.path}
                      id={`nav-demo-link-${demo.path.split('/').pop()}`}
                      onClick={() => handleNavClick(demo.path)}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${
                        isActive
                          ? 'bg-indigo-600/20 text-white font-semibold border border-indigo-500/30'
                          : 'hover:bg-white/5 text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
                          {demo.title}
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{demo.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            id="nav-solutions-link"
            onClick={() => handleNavClick('/solutions')}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
              currentPath === '/solutions'
                ? 'text-indigo-300 bg-indigo-500/15 border border-indigo-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            Solutions
          </button>

          <button
            id="nav-industries-link"
            onClick={() => handleNavClick('/industries')}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
              currentPath === '/industries'
                ? 'text-indigo-300 bg-indigo-500/15 border border-indigo-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            Industries
          </button>

          <button
            id="nav-scan-link"
            onClick={() => handleNavClick('/scan')}
            className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors ${
              currentPath === '/scan'
                ? 'text-purple-300 bg-purple-500/20 border border-purple-500/40 font-bold'
                : 'text-slate-300 hover:text-purple-300 hover:bg-purple-500/10 border border-transparent'
            }`}
          >
            <Scan className="w-4 h-4 text-purple-400" />
            <span>Free AI Scan</span>
          </button>

          <button
            id="nav-about-link"
            onClick={() => handleNavClick('/about')}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
              currentPath === '/about'
                ? 'text-indigo-300 bg-indigo-500/15 border border-indigo-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            About Shailendra
          </button>

          <button
            id="nav-contact-link"
            onClick={() => handleNavClick('/contact')}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
              currentPath === '/contact'
                ? 'text-indigo-300 bg-indigo-500/15 border border-indigo-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            id="nav-whatsapp-direct"
            href={OWNER_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <span>WhatsApp Shailendra</span>
          </a>

          <button
            id="nav-submit-problem-btn"
            onClick={onOpenLeadModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 active:scale-95 transition-all border border-indigo-400/30"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Business Problem</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            id="nav-mobile-problem-btn"
            onClick={onOpenLeadModal}
            className="p-2 rounded-xl bg-indigo-600 text-white text-xs font-bold sm:hidden"
          >
            Submit Problem
          </button>
          <button
            id="nav-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="nav-mobile-drawer"
          className="lg:hidden bg-[#0a0d17] border-b border-white/10 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto"
        >
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Working AI Demos
            </div>
            {demosList.map((demo) => {
              const Icon = demo.icon;
              return (
                <button
                  key={demo.path}
                  onClick={() => handleNavClick(demo.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium ${
                    currentPath === demo.path ? 'bg-indigo-600/20 text-indigo-300 font-bold border border-indigo-500/30' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span>{demo.title}</span>
                </button>
              );
            })}

            <div className="pt-3 border-t border-white/5">
              <button
                onClick={() => handleNavClick('/solutions')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium ${
                  currentPath === '/solutions' ? 'bg-indigo-600/20 text-indigo-300 font-bold' : 'text-slate-300'
                }`}
              >
                <Layers className="w-4 h-4 text-slate-400" />
                <span>Solutions (Build, Automate, Understand, Improve)</span>
              </button>

              <button
                onClick={() => handleNavClick('/industries')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium ${
                  currentPath === '/industries' ? 'bg-indigo-600/20 text-indigo-300 font-bold' : 'text-slate-300'
                }`}
              >
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>Industry Solutions</span>
              </button>

              <button
                onClick={() => handleNavClick('/scan')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium ${
                  currentPath === '/scan' ? 'bg-purple-600/20 text-purple-300 font-bold' : 'text-purple-400'
                }`}
              >
                <Scan className="w-4 h-4 text-purple-400" />
                <span>Free AI Business Opportunity Scan</span>
              </button>

              <button
                onClick={() => handleNavClick('/about')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium ${
                  currentPath === '/about' ? 'bg-indigo-600/20 text-indigo-300 font-bold' : 'text-slate-300'
                }`}
              >
                <UserCheck className="w-4 h-4 text-slate-400" />
                <span>About Shailendra Mishra</span>
              </button>

              <button
                onClick={() => handleNavClick('/contact')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium ${
                  currentPath === '/contact' ? 'bg-indigo-600/20 text-indigo-300 font-bold' : 'text-slate-300'
                }`}
              >
                <PhoneCall className="w-4 h-4 text-slate-400" />
                <span>Contact & Direct Discussion</span>
              </button>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLeadModal();
                }}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md text-center"
              >
                Submit My Business Problem
              </button>
              <a
                href={OWNER_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 font-semibold text-xs text-center flex items-center justify-center gap-2"
              >
                <span>WhatsApp: {OWNER_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
