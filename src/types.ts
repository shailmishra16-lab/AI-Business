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

export interface SalesCoachParameter {
  name: string;
  score: number;
  weight: string;
  strengths: string;
  weaknesses: string;
  coachingTip: string;
}

export interface SalesCoachResult {
  overallScore: number;
  performanceRating: string;
  summary: string;
  parameterEvaluations: SalesCoachParameter[];
  strongPoints: string[];
  improvementAreas: string[];
  coachingDrills: {
    title: string;
    focus: string;
    drillSteps: string[];
  }[];
  scriptRewrite: {
    originalContext: string;
    recommendedDialogue: string;
  };
  isDemo?: boolean;
}

export interface ReviewCategoryFeedback {
  category: string;
  sentimentScore: number;
  positiveCount: number;
  negativeCount: number;
  keyFeedback: string;
}

export interface ReviewManagementAction {
  priority: string;
  title: string;
  description: string;
  impact: string;
  expectedRoi: string;
}

export interface ReviewAnalysisResult {
  overallRating: number;
  totalReviewsAnalyzed: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  categoryBreakdown: ReviewCategoryFeedback[];
  positiveHighlights: string[];
  frequentComplaints: string[];
  prioritizedManagementActions: ReviewManagementAction[];
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
  industry?: string;
  businessType: string;
  monthlyEnquiries?: number | string;
  avgDealValue?: number | string;
  bottlenecks?: string[];
  currentProcess?: string;
  biggestProblem?: string;
  monthlyEnquiryVolume?: string;
  contactChannels?: string[];
}

export interface BusinessScanResult {
  industry?: string;
  businessType: string;
  estimatedMonthlyHoursSaved?: number;
  estimatedRevenueUpside?: number;
  projectedConversionLift?: string;
  leadLeakageSeverity?: string;
  implementationRoadmap?: {
    phase: string;
    objective: string;
    deliverables: string[];
  }[];
  urgencyLevel?: 'High' | 'Medium' | 'Strategic';
  estimatedHoursSavedMonthly?: number;
  projectedConversionIncrease?: string;
  diagnosticSummary?: string;
  customRoadmap?: {
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
