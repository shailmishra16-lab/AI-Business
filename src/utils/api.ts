import {
  InteractionAnalysisResult,
  CustomerVoiceAnalysisResult,
  LeadHealthInput,
  LeadHealthResult,
  SalesCoachResult,
  ReviewAnalysisResult,
  BusinessScanInput,
  BusinessScanResult,
  LeadRecord,
  IndustryType
} from '../types';

export async function analyzeInteraction(conversation: string): Promise<InteractionAnalysisResult> {
  const response = await fetch('/api/ai/interaction-analyzer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversation }),
  });
  if (!response.ok) {
    throw new Error(`Failed to analyze interaction (${response.statusText})`);
  }
  return response.json();
}

export async function analyzeCustomerVoice(industry: IndustryType, dataset?: any[]): Promise<CustomerVoiceAnalysisResult> {
  const response = await fetch('/api/ai/customer-voice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ industry, dataset }),
  });
  if (!response.ok) {
    throw new Error(`Failed to analyze customer voice (${response.statusText})`);
  }
  return response.json();
}

export async function calculateLeadHealth(input: LeadHealthInput): Promise<LeadHealthResult> {
  const response = await fetch('/api/ai/lead-health', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error(`Failed to calculate lead health (${response.statusText})`);
  }
  return response.json();
}

export async function coachSalesConversation(transcript: string): Promise<SalesCoachResult> {
  const response = await fetch('/api/ai/sales-coach', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript }),
  });
  if (!response.ok) {
    throw new Error(`Failed to coach sales conversation (${response.statusText})`);
  }
  return response.json();
}

export async function analyzeReviews(industry: string, reviewsText: string): Promise<ReviewAnalysisResult> {
  const response = await fetch('/api/ai/review-analyzer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ industry, reviewsText }),
  });
  if (!response.ok) {
    throw new Error(`Failed to analyze reviews (${response.statusText})`);
  }
  return response.json();
}

export async function sendAssistantMessage(messages: { role: string; content: string }[]): Promise<{
  content: string;
  showCta?: boolean;
  suggestedPrompts?: string[];
  isDemo?: boolean;
}> {
  const response = await fetch('/api/ai/business-assistant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  if (!response.ok) {
    throw new Error(`Assistant request failed (${response.statusText})`);
  }
  return response.json();
}

export async function scanBusinessOpportunity(input: BusinessScanInput): Promise<BusinessScanResult> {
  const response = await fetch('/api/ai/business-scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error(`Failed to scan business opportunity (${response.statusText})`);
  }
  return response.json();
}

export async function submitLead(leadData: {
  name: string;
  businessName?: string;
  email: string;
  phone?: string;
  industry?: string;
  website?: string;
  problem: string;
  preferredContact: 'WhatsApp' | 'Email' | 'Phone Call';
}): Promise<{
  success: boolean;
  message: string;
  lead: LeadRecord;
  notification: {
    emailSubject: string;
    ownerWhatsAppUrl: string;
  };
}> {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Submission failed' }));
    throw new Error(err.error || 'Failed to submit business problem');
  }
  return response.json();
}

export async function adminLogin(password: string): Promise<{ success: boolean; token?: string; error?: string }> {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  return response.json();
}

export async function fetchAdminLeads(token: string): Promise<{ leads: LeadRecord[] }> {
  const response = await fetch('/api/leads', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-admin-password': 'growthlab2025',
    },
  });
  if (!response.ok) {
    throw new Error('Unauthorized or failed to fetch leads');
  }
  return response.json();
}

export async function updateLeadStatus(token: string, id: string, status?: string, notes?: string): Promise<{ success: boolean; lead: LeadRecord }> {
  const response = await fetch(`/api/leads/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'x-admin-password': 'growthlab2025',
    },
    body: JSON.stringify({ status, notes }),
  });
  if (!response.ok) {
    throw new Error('Failed to update lead');
  }
  return response.json();
}

export async function deleteLead(token: string, id: string): Promise<{ success: boolean }> {
  const response = await fetch(`/api/leads/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-admin-password': 'growthlab2025',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete lead');
  }
  return response.json();
}
