export type IndustryType =
  | 'Automobile'
  | 'Clinic'
  | 'Coaching'
  | 'Real Estate'
  | 'Retail'
  | 'Restaurant'
  | 'Salon'
  | 'Professional Services'
  | 'Other';

export interface InteractionAnalysisResult {
  intent: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  urgency: 'Low' | 'Medium' | 'High' | 'Immediate';
  customer_pain_point: string;
  business_risk: string;
  recommended_action: string;
  follow_up_priority: 'Immediate' | 'Within 2 hours' | 'Same day' | 'Routine';
  suggested_response: string;
  key_topics: string[];
  isDemo?: boolean;
}

export interface CustomerVoiceItem {
  id: string;
  channel: 'WhatsApp' | 'Web Chat' | 'Phone Call' | 'Review' | 'Email';
  timestamp: string;
  text: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  intent: string;
  pain_point: string;
  category: string;
}

export interface CustomerVoiceDataset {
  industry: IndustryType;
  interactions: CustomerVoiceItem[];
}

export interface CustomerVoiceAnalysisResult {
  totalInteractions: number;
  positivePct: number;
  neutralPct: number;
  negativePct: number;
  topPainPoints: { name: string; count: number; percentage: number }[];
  topIntents: { name: string; count: number; percentage: number }[];
  complaintCategories: { category: string; count: number; severity: 'High' | 'Medium' | 'Low' }[];
  positiveThemes: string[];
  objections: string[];
  commonQuestions: string[];
  aiExecutiveSummary: {
    overview: string;
    recommendations: {
      title: string;
      description: string;
      impact: 'High' | 'Medium';
      actionableStep: string;
    }[];
  };
  isDemo?: boolean;
}

export interface LeadHealthInput {
  monthlyEnquiries: number;
  avgResponseTimeHours: number;
  leadsFollowedUp: number;
  leadsConverted: number;
  avgDealValue: number;
}

export interface LeadHealthResult {
  responseHealth: { score: number; status: 'Excellent' | 'Good' | 'Needs Attention' | 'Critical'; note: string };
  followUpHealth: { score: number; status: 'Excellent' | 'Good' | 'Needs Attention' | 'Critical'; followUpRate: number };
  conversionRate: { rate: number; benchmark: number; status: 'Above Benchmark' | 'Average' | 'Below Benchmark' };
  potentialLeadLeakage: { leakedLeads: number; estimatedRevenueLost: number };
  illustrativeOpportunity: { potentialExtraDeals: number; potentialRevenueGain: number };
  aiOpportunities: {
    title: string;
    description: string;
    icon: string;
    estimatedImpact: string;
  }[];
  isDemo?: boolean;
}

export interface SalesCoachScoreItem {
  category: string;
  score: number; // 0 - 10
  feedback: string;
  quoteObserved?: string;
}

export interface SalesCoachResult {
  overallScore: number; // 0 - 100
  rating: 'Exceptional' | 'Competent' | 'Needs Coaching' | 'Critical Risk';
  scores: {
    greeting: SalesCoachScoreItem;
    requirementDiscovery: SalesCoachScoreItem;
    questionQuality: SalesCoachScoreItem;
    productExplanation: SalesCoachScoreItem;
    objectionHandling: SalesCoachScoreItem;
    empathy: SalesCoachScoreItem;
    closingAttempt: SalesCoachScoreItem;
    nextStepCommitment: SalesCoachScoreItem;
  };
  whatWasDoneWell: string[];
  areasForImprovement: string[];
  coachingRecommendations: {
    skillArea: string;
    advice: string;
    drillOrExercise: string;
  }[];
  suggestedBetterResponse: {
    originalSegment: string;
    improvedVersion: string;
    explanation: string;
  };
  isDemo?: boolean;
}

export interface ReviewItem {
  id: string;
  rating: number; // 1 - 5
  source: string;
  date: string;
  author: string;
  text: string;
}

export interface ReviewAnalysisResult {
  overallSentiment: {
    score: number; // e.g. 4.1/5 or 72%
    distribution: { positive: number; neutral: number; negative: number };
  };
  positiveThemes: { theme: string; mentions: number }[];
  negativeThemes: { theme: string; mentions: number }[];
  repeatedComplaints: string[];
  categoryBreakdown: {
    staffIssues: { count: number; examples: string[] };
    priceIssues: { count: number; examples: string[] };
    productIssues: { count: number; examples: string[] };
    serviceIssues: { count: number; examples: string[] };
  };
  top5ManagementActions: {
    action: string;
    targetArea: string;
    priority: 'Immediate (P1)' | 'Short-term (P2)' | 'Medium-term (P3)';
    expectedRoi: string;
  }[];
  isDemo?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedPrompts?: string[];
  showCta?: boolean;
}

export interface BusinessScanInput {
  businessType: string;
  currentProcess: string;
  biggestProblem: string;
  monthlyEnquiryVolume: string;
  contactChannels: string[];
}

export interface BusinessScanResult {
  businessType: string;
  urgencyLevel: 'High' | 'Medium' | 'Strategic';
  estimatedHoursSavedMonthly: number;
  projectedConversionIncrease: string;
  diagnosticSummary: string;
  customRoadmap: {
    phase: string;
    timeline: string;
    action: string;
    deliverable: string;
  }[];
  quickWinAutomations: string[];
  isDemo?: boolean;
}

export type LeadStatus = 'New' | 'Contacted' | 'In Discussion' | 'Converted' | 'Closed';

export interface LeadRecord {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  industry: string;
  website?: string;
  problem: string;
  preferredContact: 'WhatsApp' | 'Email' | 'Phone Call';
  status: LeadStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseStudy {
  id: string;
  industry: string;
  title: string;
  clientType: string;
  badge: string;
  image: string;
  imageAlt: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  blueprintSteps: string[];
  quote: string;
}
