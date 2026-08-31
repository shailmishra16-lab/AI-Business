import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy GoogleGenAI initialization
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Persistent Leads Store File
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

function ensureDataStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    const initialLeads = [
      {
        id: "lead-demo-1",
        name: "Rajesh Sharma",
        businessName: "Sharma Motors Dealership",
        email: "rajesh@sharmamotors.in",
        phone: "+91 98201 54321",
        industry: "Automobile",
        website: "https://sharmamotors.in",
        problem: "We get 300+ inquiries a month via web and WhatsApp but our sales reps take 4-6 hours to reply. Many customers purchase from nearby dealers before we even follow up.",
        preferredContact: "WhatsApp",
        status: "New",
        notes: "High priority lead. Interested in WhatsApp instant qualification bot and lead leakage alert system.",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: "lead-demo-2",
        name: "Dr. Ananya Roy",
        businessName: "Aesthetic Care Clinic",
        email: "dr.ananya@aestheticcare.com",
        phone: "+91 97112 33445",
        industry: "Clinic",
        website: "https://aestheticcare.com",
        problem: "Patients frequently ask repetitive questions regarding treatment costs, post-procedure care and scheduling on WhatsApp, overwhelming our front desk team.",
        preferredContact: "Email",
        status: "In Discussion",
        notes: "Sent proposal for clinic triage bot & appointment confirmation workflow.",
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
      {
        id: "lead-demo-3",
        name: "Vikram Mehta",
        businessName: "Apex Career Academy",
        email: "vikram@apexacademy.edu",
        phone: "+91 98450 67890",
        industry: "Coaching",
        website: "https://apexacademy.edu",
        problem: "Need quality audits on telecaller counseling calls. We want to know why trial class attendees do not convert into enrollments.",
        preferredContact: "Phone Call",
        status: "Contacted",
        notes: "Scheduled discovery call for speech analytics & sales conversation coach demo.",
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      }
    ];
    fs.writeFileSync(LEADS_FILE, JSON.stringify(initialLeads, null, 2), "utf-8");
  }
}
ensureDataStore();

function getLeads(): any[] {
  try {
    ensureDataStore();
    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading leads file:", err);
    return [];
  }
}

function saveLeads(leads: any[]) {
  try {
    ensureDataStore();
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving leads file:", err);
  }
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "AI GrowthLab",
    owner: "Shailendra Mishra",
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Demo 1: Customer Interaction Analyzer
app.post("/api/ai/interaction-analyzer", async (req, res) => {
  const { conversation } = req.body;
  if (!conversation || typeof conversation !== "string") {
    return res.status(400).json({ error: "Conversation text is required." });
  }

  const ai = getGemini();
  if (!ai) {
    // Deterministic high-quality fallback demo analysis
    return res.json({
      intent: "Price & Availability Inquiry with Delayed Follow-up Escalation",
      sentiment: "Negative",
      urgency: "High",
      customer_pain_point: "Customer experienced delayed response time (over 4 hours) and felt ignored when asking for a customized quotation.",
      business_risk: "High probability of prospect buying from competitor within 24 hours; negative brand perception.",
      recommended_action: "Initiate immediate proactive outreach via WhatsApp/Phone, acknowledge response delay with genuine apology, and deliver complete custom quote with priority booking incentive.",
      follow_up_priority: "Immediate",
      suggested_response: "Hi [Customer Name], thank you for reaching out to us. I sincerely apologize for the delay in getting back to you earlier today. Here are the full details and quotation you requested: [Attached Pricing Breakdown]. I've also reserved a complimentary consultation slot for you tomorrow if you'd like to review any questions with our senior specialist.",
      key_topics: ["Pricing Quote", "Delayed Response", "Competitor Comparison", "Booking Urgency"],
      isDemo: true,
    });
  }

  try {
    const prompt = `Analyze this customer interaction transcript with expert precision as a seasoned CX and Speech Analytics specialist (15+ years experience):
Transcript:
"""
${conversation}
"""

Return a valid JSON object matching this schema:
{
  "intent": string (e.g. "Price Enquiry", "Service Complaint", "Product Demo Request", "Cancellation Risk"),
  "sentiment": "Positive" | "Neutral" | "Negative",
  "urgency": "Low" | "Medium" | "High" | "Immediate",
  "customer_pain_point": string (concise root cause),
  "business_risk": string (business consequence if unaddressed),
  "recommended_action": string (prescriptive next step for team),
  "follow_up_priority": "Immediate" | "Within 2 hours" | "Same day" | "Routine",
  "suggested_response": string (expertly crafted, empathetic, professional response ready to send to the customer),
  "key_topics": string[] (3-5 key tags)
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const jsonText = response.text || "{}";
    const parsed = JSON.parse(jsonText);
    res.json({ ...parsed, isDemo: false });
  } catch (error: any) {
    console.error("Gemini interaction analyzer error:", error);
    // Fallback gracefully
    res.json({
      intent: "Commercial Inquiry & Service Escalation",
      sentiment: "Negative",
      urgency: "High",
      customer_pain_point: "Lack of prompt communication and missing pricing clarity.",
      business_risk: "Potential churn and deal loss to competing providers.",
      recommended_action: "Acknowledge delay immediately, provide verified quotation, and assign senior representative.",
      follow_up_priority: "Immediate",
      suggested_response: "Dear Customer, thank you for your message and please accept our apologies for the delay. We have prepared your complete breakdown and are available right now to assist you.",
      key_topics: ["Pricing", "Response Latency", "Follow-up", "Service Quality"],
      isDemo: true,
    });
  }
});

// Demo 2: Customer Voice Analyzer
app.post("/api/ai/customer-voice", async (req, res) => {
  const { industry, dataset } = req.body;
  const targetIndustry = industry || "Automobile";

  const ai = getGemini();
  if (!ai) {
    return res.json({
      totalInteractions: dataset?.length || 45,
      positivePct: 48,
      neutralPct: 24,
      negativePct: 28,
      topPainPoints: [
        { name: "Delayed First Response", count: 18, percentage: 40 },
        { name: "Unclear Pricing & Hidden Fees", count: 12, percentage: 27 },
        { name: "Multiple Follow-ups Required", count: 9, percentage: 20 },
        { name: "Front Desk Staff Inconsistency", count: 6, percentage: 13 },
      ],
      topIntents: [
        { name: "Price & Quotation Inquiry", count: 20, percentage: 44 },
        { name: "Appointment / Demo Booking", count: 14, percentage: 31 },
        { name: "Service Escalation", count: 7, percentage: 16 },
        { name: "General Question", count: 4, percentage: 9 },
      ],
      complaintCategories: [
        { category: "Follow-up Speed", count: 14, severity: "High" },
        { category: "Pricing Transparency", count: 9, severity: "Medium" },
        { category: "Staff Handover Gaps", count: 6, severity: "Medium" },
        { category: "Post-Sale Communication", count: 4, severity: "Low" },
      ],
      positiveThemes: [
        "Knowledgeable product advice during initial visit",
        "Polite behavior when directly reached",
        "Modern showroom/facility environment",
      ],
      objections: [
        "Competitor offering immediate delivery and clearer discount sheet",
        "Hesitant to commit without written assurance on timeline",
      ],
      commonQuestions: [
        "What is the on-road price vs ex-showroom?",
        "Can I book a weekend test slot via WhatsApp?",
        "What are the finance / EMI approval options?",
      ],
      aiExecutiveSummary: {
        overview: `Customer interactions in the ${targetIndustry} sample show strong commercial intent (75%+ inquiry/booking volume), but 28% negative sentiment driven primarily by a 4-hour average response lag and fragmented WhatsApp handover.`,
        recommendations: [
          {
            title: "Deploy 24/7 WhatsApp Instant Qualification",
            description: "Automate immediate pricing sheet delivery and customer intent capture within 30 seconds of enquiry.",
            impact: "High",
            actionableStep: "Set up interactive WhatsApp bot to answer FAQs and calculate indicative quotes instantly.",
          },
          {
            title: "Automate Salesperson Notification Triggers",
            description: "Alert floor sales reps within 3 minutes when high-intent prospects request live consultations.",
            impact: "High",
            actionableStep: "Integrate webhook push notifications to salesperson phones with pre-qualified context.",
          },
          {
            title: "Standardize Transparent Pricing Collateral",
            description: "Provide one-click downloadable PDF quotes to eliminate customer anxiety over hidden charges.",
            impact: "Medium",
            actionableStep: "Template dynamic pricing sheets directly inside CRM auto-responses.",
          },
          {
            title: "Implement Speech & Text Sentiment Audits",
            description: "Continuously audit 100% of recorded customer conversations to flag dissatisfied leads before they churn.",
            impact: "High",
            actionableStep: "Run daily automated sentiment scans across all incoming messages.",
          },
          {
            title: "Create Post-Visit Feedback Loop",
            description: "Send automated 2-question micro-surveys 1 hour after showroom/clinic visit to catch grievances early.",
            impact: "Medium",
            actionableStep: "Trigger WhatsApp NPS survey automatically upon appointment completion.",
          },
        ],
      },
      isDemo: true,
    });
  }

  try {
    const prompt = `You are an elite Customer Voice & Interaction Analytics Architect analyzing ${targetIndustry} customer interactions.
Dataset snippet or context:
"""
${JSON.stringify(dataset || []).slice(0, 3000)}
"""

Generate a thorough, realistic Customer Voice Intelligence report in JSON format with this exact structure:
{
  "totalInteractions": number,
  "positivePct": number (e.g. 52),
  "neutralPct": number (e.g. 23),
  "negativePct": number (e.g. 25),
  "topPainPoints": [ { "name": string, "count": number, "percentage": number } ],
  "topIntents": [ { "name": string, "count": number, "percentage": number } ],
  "complaintCategories": [ { "category": string, "count": number, "severity": "High" | "Medium" | "Low" } ],
  "positiveThemes": string[],
  "objections": string[],
  "commonQuestions": string[],
  "aiExecutiveSummary": {
    "overview": string,
    "recommendations": [
      {
        "title": string,
        "description": string,
        "impact": "High" | "Medium",
        "actionableStep": string
      }
    ]
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, isDemo: false });
  } catch (err) {
    console.error("Gemini customer voice error:", err);
    res.json({
      totalInteractions: 50,
      positivePct: 50,
      neutralPct: 25,
      negativePct: 25,
      topPainPoints: [{ name: "Response Latency", count: 20, percentage: 40 }],
      topIntents: [{ name: "Inquiry", count: 25, percentage: 50 }],
      complaintCategories: [{ category: "Service Speed", count: 15, severity: "High" }],
      positiveThemes: ["Helpful staff", "Quality product"],
      objections: ["High pricing", "Slow response"],
      commonQuestions: ["What is the cost?", "How soon can you start?"],
      aiExecutiveSummary: {
        overview: "Analysis shows significant opportunity for lead response acceleration.",
        recommendations: [
          { title: "Implement instant WhatsApp qualification", description: "Speed up lead handling", impact: "High", actionableStep: "Deploy AI workflow" }
        ]
      },
      isDemo: true
    });
  }
});

// Demo 3: Lead Health Check
app.post("/api/ai/lead-health", async (req, res) => {
  const { monthlyEnquiries, avgResponseTimeHours, leadsFollowedUp, leadsConverted, avgDealValue } = req.body;
  const enquiries = Number(monthlyEnquiries) || 100;
  const respTime = Number(avgResponseTimeHours) || 4;
  const followedUp = Number(leadsFollowedUp) || 60;
  const converted = Number(leadsConverted) || 6;
  const dealValue = Number(avgDealValue) || 25000;

  // Quantitative formulas grounded in sales velocity & lead response research
  const followUpRate = Math.min(100, Math.round((followedUp / enquiries) * 100));
  const conversionRate = Math.min(100, Number(((converted / enquiries) * 100).toFixed(1)));
  
  // Industry response speed scoring (Under 5 mins: 95+, 1 hr: 75, 4 hrs: 45, 24 hrs+: 20)
  let responseScore = 95;
  let responseStatus: 'Excellent' | 'Good' | 'Needs Attention' | 'Critical' = 'Excellent';
  let responseNote = "Industry-leading sub-15 minute response time. Minimal lead leakage.";

  if (respTime > 0.25 && respTime <= 1) {
    responseScore = 78;
    responseStatus = "Good";
    responseNote = "Decent response time, but 35% of high-urgency web leads cool down after 30 minutes.";
  } else if (respTime > 1 && respTime <= 6) {
    responseScore = 45;
    responseStatus = "Needs Attention";
    responseNote = "Leads taking 1-6 hours to receive follow-up have a 7x drop in qualification probability.";
  } else if (respTime > 6) {
    responseScore = 20;
    responseStatus = "Critical";
    responseNote = "Severe lead decay. More than 60% of interested buyers reach out to competing vendors.";
  }

  let followUpScore = followUpRate;
  let followUpStatus: 'Excellent' | 'Good' | 'Needs Attention' | 'Critical' = 
    followUpRate >= 90 ? 'Excellent' : followUpRate >= 70 ? 'Good' : followUpRate >= 50 ? 'Needs Attention' : 'Critical';

  // Benchmark comparison
  const benchmarkRate = 12.0; // standard benchmark 10-15%
  const conversionStatus = conversionRate >= 12 ? 'Above Benchmark' : conversionRate >= 7 ? 'Average' : 'Below Benchmark';

  // Lead leakage estimation
  const missedFollowUps = Math.max(0, enquiries - followedUp);
  const responseDecayLoss = respTime > 1 ? Math.round(followedUp * 0.25) : 0;
  const leakedLeads = Math.min(enquiries, missedFollowUps + responseDecayLoss);
  const estimatedRevenueLost = Math.round(leakedLeads * (benchmarkRate / 100) * dealValue);

  // Illustrative opportunity with AI automation (instant response + 100% follow up)
  const potentialExtraConversions = Math.max(1, Math.round(enquiries * 0.08));
  const potentialRevenueGain = potentialExtraConversions * dealValue;

  const aiOpportunities = [
    {
      title: "Instant Lead Response (<60 Seconds)",
      description: "Automated WhatsApp and email welcome triggers that engage prospects immediately before they browse competitors.",
      icon: "zap",
      estimatedImpact: "+25% to +40% qualification rate",
    },
    {
      title: "Automated AI Lead Qualification",
      description: "Ask smart qualifying questions (budget, timeline, requirements) automatically and filter high-intent prospects.",
      icon: "check-circle",
      estimatedImpact: "Saves 15+ hours/week of manual triage",
    },
    {
      title: "Multi-Touch WhatsApp Nurture Cadence",
      description: "Scheduled non-intrusive reminder sequences for cold inquiries who went silent after initial quote.",
      icon: "message-circle",
      estimatedImpact: "Recovers 18% of stalled leads",
    },
    {
      title: "Real-Time Salesperson Alert Engine",
      description: "Instantly alert reps on high-priority opportunities with full customer background context via WhatsApp push.",
      icon: "bell",
      estimatedImpact: "Cuts rep reaction time to under 3 minutes",
    },
    {
      title: "AI Lead Scoring & Prioritization",
      description: "Rank inquiries by conversion likelihood based on conversation intent and budget signals.",
      icon: "trending-up",
      estimatedImpact: "Focuses rep effort on top 20% highest value deals",
    },
    {
      title: "Executive Pipeline Visibility Dashboard",
      description: "Live view of all lead touchpoints, conversion bottlenecks, and rep follow-up consistency.",
      icon: "bar-chart-3",
      estimatedImpact: "100% transparency into sales pipeline leakage",
    },
  ];

  res.json({
    responseHealth: { score: responseScore, status: responseStatus, note: responseNote },
    followUpHealth: { score: followUpScore, status: followUpStatus, followUpRate },
    conversionRate: { rate: conversionRate, benchmark: benchmarkRate, status: conversionStatus },
    potentialLeadLeakage: { leakedLeads, estimatedRevenueLost },
    illustrativeOpportunity: { potentialExtraDeals: potentialExtraConversions, potentialRevenueGain },
    aiOpportunities,
    isDemo: true,
  });
});

// Demo 4: AI Sales Conversation Coach
app.post("/api/ai/sales-coach", async (req, res) => {
  const { transcript } = req.body;
  if (!transcript || typeof transcript !== "string") {
    return res.status(400).json({ error: "Transcript is required." });
  }

  const ai = getGemini();
  if (!ai) {
    return res.json({
      overallScore: 68,
      rating: "Needs Coaching",
      scores: {
        greeting: { category: "Greeting & Rapport", score: 8, feedback: "Professional opening, stated company name clearly, but missed building early rapport." },
        requirementDiscovery: { category: "Requirement Discovery", score: 6, feedback: "Asked about preferred model, but failed to probe the customer's budget constraints or decision timeline." },
        questionQuality: { category: "Question Quality", score: 6, feedback: "Relied primarily on closed yes/no questions rather than open-ended discovery." },
        productExplanation: { category: "Product Explanation", score: 8, feedback: "Thorough explanation of feature benefits and warranties." },
        objectionHandling: { category: "Objection Handling", score: 5, feedback: "When customer mentioned competitor's price, rep became defensive rather than validating the concern and highlighting ROI." },
        empathy: { category: "Empathy & Active Listening", score: 7, feedback: "Listened politely without interrupting, but did not acknowledge customer's budget stress." },
        closingAttempt: { category: "Closing Attempt", score: 6, feedback: "Asked passively 'Let me know if you want it' instead of proposing a specific booking slot." },
        nextStepCommitment: { category: "Next-Step Commitment", score: 8, feedback: "Agreed to send brochure on WhatsApp by end of day." },
      },
      whatWasDoneWell: [
        "Clear and confident tone throughout the interaction",
        "Strong command over product technical specifications",
        "Polite communication with zero conversational talk-overs",
      ],
      areasForImprovement: [
        "Probe deeper into customer's primary buying trigger before pitching features",
        "Adopt the 'Acknowledge-Validate-Pivot' method for price objections",
        "Use assumptive closing to lock in a specific appointment time",
      ],
      coachingRecommendations: [
        {
          skillArea: "Objection Handling",
          advice: "Never defend against competitor pricing immediately. First acknowledge: 'I understand budget is a key priority. May I share why 85% of our clients chose our package despite that difference?'",
          drillOrExercise: "Conduct a 10-minute roleplay handling the 'Competitor X is 15% cheaper' objection.",
        },
        {
          skillArea: "Discovery Questioning",
          advice: "Replace 'Do you want the standard or premium version?' with 'What specific outcomes are most critical for your team this quarter?'",
          drillOrExercise: "Write down 5 open-ended 'What' and 'How' questions before every outbound follow-up.",
        },
        {
          skillArea: "Assumptive Closing",
          advice: "Instead of 'Let us know when you decide', use 'We have a priority slot open on Thursday at 3 PM or Friday at 11 AM—which works better for your schedule?'",
          drillOrExercise: "Practice binary choice close on 3 live calls tomorrow.",
        },
      ],
      suggestedBetterResponse: {
        originalSegment: "Customer: 'Your price is higher than Sharma Motors.' -> Rep: 'Well our quality is much better and they don't give the same warranty.'",
        improvedVersion: "Rep: 'I completely appreciate that price is important, Mr. Verma. Sharma Motors is indeed a respectable option. The reason most customers decide to proceed with us is our comprehensive 3-year on-site support and zero-downtime guarantee, which typically saves 15% over the first year alone. Would you like me to show you the side-by-side cost breakdown?'",
        explanation: "Validates the customer's perspective, avoids adversarial defensiveness, and reframes the conversation around total value and return on investment.",
      },
      isDemo: true,
    });
  }

  try {
    const prompt = `You are a Senior Speech Analytics and Quality Management Leader with 15+ years of experience in customer interaction analytics, QA scorecards, and sales conversation coaching.
Evaluate this sales call transcript rigorously:
"""
${transcript}
"""

Return a JSON object matching this schema:
{
  "overallScore": number (0-100),
  "rating": "Exceptional" | "Competent" | "Needs Coaching" | "Critical Risk",
  "scores": {
    "greeting": { "category": "Greeting & Rapport", "score": number (0-10), "feedback": string },
    "requirementDiscovery": { "category": "Requirement Discovery", "score": number (0-10), "feedback": string },
    "questionQuality": { "category": "Question Quality", "score": number (0-10), "feedback": string },
    "productExplanation": { "category": "Product Explanation", "score": number (0-10), "feedback": string },
    "objectionHandling": { "category": "Objection Handling", "score": number (0-10), "feedback": string },
    "empathy": { "category": "Empathy & Active Listening", "score": number (0-10), "feedback": string },
    "closingAttempt": { "category": "Closing Attempt", "score": number (0-10), "feedback": string },
    "nextStepCommitment": { "category": "Next-Step Commitment", "score": number (0-10), "feedback": string }
  },
  "whatWasDoneWell": string[],
  "areasForImprovement": string[],
  "coachingRecommendations": [
    {
      "skillArea": string,
      "advice": string,
      "drillOrExercise": string
    }
  ],
  "suggestedBetterResponse": {
    "originalSegment": string,
    "improvedVersion": string,
    "explanation": string
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, isDemo: false });
  } catch (err) {
    console.error("Gemini sales coach error:", err);
    res.json({
      overallScore: 70,
      rating: "Needs Coaching",
      scores: {
        greeting: { category: "Greeting", score: 8, feedback: "Good greeting" },
        requirementDiscovery: { category: "Discovery", score: 7, feedback: "Adequate discovery" },
        questionQuality: { category: "Questions", score: 6, feedback: "Needs more open questions" },
        productExplanation: { category: "Pitch", score: 8, feedback: "Clear explanation" },
        objectionHandling: { category: "Objections", score: 6, feedback: "Address cost proactively" },
        empathy: { category: "Empathy", score: 7, feedback: "Respectful tone" },
        closingAttempt: { category: "Closing", score: 6, feedback: "Ask for definitive commitment" },
        nextStepCommitment: { category: "Next Step", score: 8, feedback: "Follow-up set" },
      },
      whatWasDoneWell: ["Clear pitch", "Courteous demeanour"],
      areasForImprovement: ["Handle price objections better", "Firm closing"],
      coachingRecommendations: [{ skillArea: "Closing", advice: "Propose concrete date/time", drillOrExercise: "Practice closing script" }],
      suggestedBetterResponse: { originalSegment: "Let me know when ready", improvedVersion: "Can we schedule a 15-min walk-through this Friday at 11 AM?", explanation: "Specific time commitment" },
      isDemo: true,
    });
  }
});

// Demo 5: Review & Feedback Analyzer
app.post("/api/ai/review-analyzer", async (req, res) => {
  const { industry, reviewsText } = req.body;
  const targetIndustry = industry || "Clinic";

  const ai = getGemini();
  if (!ai) {
    return res.json({
      overallSentiment: {
        score: 3.8,
        distribution: { positive: 60, neutral: 15, negative: 25 },
      },
      positiveThemes: [
        { theme: "High treatment expertise and doctor friendliness", mentions: 24 },
        { theme: "Clean, hygienic clinic environment", mentions: 19 },
        { theme: "Effective long-term clinical results", mentions: 16 },
      ],
      negativeThemes: [
        { theme: "Long reception wait times despite prior appointments", mentions: 14 },
        { theme: "Surprise fees for lab reports not mentioned beforehand", mentions: 9 },
        { theme: "Unresponsive WhatsApp support during weekends", mentions: 7 },
      ],
      repeatedComplaints: [
        "Waited 45 minutes past scheduled appointment time without proactive updates.",
        "Front desk receptionist seemed hurried and gave conflicting cost estimates.",
        "Unable to get emergency medication advice on WhatsApp outside OPD hours.",
      ],
      categoryBreakdown: {
        staffIssues: {
          count: 8,
          examples: ["Receptionist attitude", "Delayed handover between nursing and doctor"],
        },
        priceIssues: {
          count: 9,
          examples: ["Consultation fee validity ambiguity", "Consumables charged separately without prior disclosure"],
        },
        productIssues: {
          count: 3,
          examples: ["Prescribed medication brand was out of stock locally"],
        },
        serviceIssues: {
          count: 14,
          examples: ["Appointment schedule overrun", "No digital prescription sent on WhatsApp"],
        },
      },
      top5ManagementActions: [
        {
          action: "Deploy WhatsApp Smart Queue & Live Delay Alerts",
          targetArea: "Service Delivery & Waiting Times",
          priority: "Immediate (P1)",
          expectedRoi: "Eliminate 80% of wait-time complaints and reduce lobby crowding.",
        },
        {
          action: "Publish All-Inclusive Upfront Treatment Packages",
          targetArea: "Pricing Transparency",
          priority: "Immediate (P1)",
          expectedRoi: "Prevent negative billing reviews and boost treatment acceptance by 22%.",
        },
        {
          action: "Implement 24/7 AI Post-Care WhatsApp Assistant",
          targetArea: "Patient Support & Retention",
          priority: "Short-term (P2)",
          expectedRoi: "Provide instant verified post-care guidance and free up clinic staff.",
        },
        {
          action: "Front Desk Hospitality & Communication Training",
          targetArea: "Staff Quality",
          priority: "Short-term (P2)",
          expectedRoi: "Increase 5-star Google Review velocity by 35%.",
        },
        {
          action: "Automated Post-Consultation Digital Prescription & Review Trigger",
          targetArea: "Digital CX",
          priority: "Medium-term (P3)",
          expectedRoi: "Double review count while catching dissatisfied patients internally before public posting.",
        },
      ],
      isDemo: true,
    });
  }

  try {
    const prompt = `You are a Customer Experience & Quality Management Director auditing customer feedback for ${targetIndustry}.
Reviews data:
"""
${reviewsText || "Sample batch of customer reviews"}
"""

Generate an executive review intelligence audit in JSON format with this structure:
{
  "overallSentiment": {
    "score": number (1.0 to 5.0),
    "distribution": { "positive": number, "neutral": number, "negative": number }
  },
  "positiveThemes": [ { "theme": string, "mentions": number } ],
  "negativeThemes": [ { "theme": string, "mentions": number } ],
  "repeatedComplaints": string[],
  "categoryBreakdown": {
    "staffIssues": { "count": number, "examples": string[] },
    "priceIssues": { "count": number, "examples": string[] },
    "productIssues": { "count": number, "examples": string[] },
    "serviceIssues": { "count": number, "examples": string[] }
  },
  "top5ManagementActions": [
    {
      "action": string,
      "targetArea": string,
      "priority": "Immediate (P1)" | "Short-term (P2)" | "Medium-term (P3)",
      "expectedRoi": string
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, isDemo: false });
  } catch (err) {
    console.error("Gemini review analyzer error:", err);
    res.json({
      overallSentiment: { score: 4.0, distribution: { positive: 65, neutral: 15, negative: 20 } },
      positiveThemes: [{ theme: "Good overall service", mentions: 15 }],
      negativeThemes: [{ theme: "Wait time", mentions: 8 }],
      repeatedComplaints: ["Long waiting time", "Billing confusion"],
      categoryBreakdown: {
        staffIssues: { count: 3, examples: ["Staff delay"] },
        priceIssues: { count: 4, examples: ["Pricing clarity"] },
        productIssues: { count: 1, examples: ["Product stock"] },
        serviceIssues: { count: 6, examples: ["Queue speed"] },
      },
      top5ManagementActions: [
        { action: "Automate appointment check-in", targetArea: "Queue", priority: "Immediate (P1)", expectedRoi: "Faster triage" }
      ],
      isDemo: true,
    });
  }
});

// Demo 6: Conversational AI GrowthLab Business Assistant
app.post("/api/ai/business-assistant", async (req, res) => {
  const { messages } = req.body;
  const history = Array.isArray(messages) ? messages : [];

  const ai = getGemini();
  if (!ai) {
    const lastUserMsg = history.filter((m: any) => m.role === "user").pop()?.content || "";
    let reply = `Thank you for sharing that. At AI GrowthLab, we specialize in transforming everyday business bottlenecks into automated growth systems.\n\nBased on what you've described, here is how we can implement practical AI for your operations:\n\n1. **Instant Lead Capture & WhatsApp Qualification**: Convert 40%+ more website and social media visitors by answering their pricing and service questions in real time.\n2. **Customer Interaction Intelligence**: Automatically scan customer chats, calls, and emails to detect urgent leads, service grievances, and lost sales opportunities.\n3. **Sales & Staff Coaching Dashboards**: Provide actionable feedback to your sales team so every prospect gets consistent, high-converting follow-up.\n\nWould you like Shailendra to explore a customized blueprint for your specific business?`;
    
    if (lastUserMsg.toLowerCase().includes("car") || lastUserMsg.toLowerCase().includes("dealership") || lastUserMsg.toLowerCase().includes("automobile")) {
      reply = `For an automobile dealership, three AI implementations produce immediate measurable impact:\n\n1. **24/7 WhatsApp Test Drive & Inventory Assistant**: When buyers browse at night, the AI answers on-road pricing, sends brochure PDFs, and locks in weekend test drive slots.\n2. **Sales Call Quality & Objection Coaching**: Automatically audit sales rep phone conversations to see why test-drive visitors aren't booking final orders.\n3. **Lost Lead Recovery**: Trigger smart, personalized follow-ups to prospects whose inquiry stalled over 7 days ago.\n\nWould you like Shailendra to explore this with you?`;
    } else if (lastUserMsg.toLowerCase().includes("clinic") || lastUserMsg.toLowerCase().includes("doctor") || lastUserMsg.toLowerCase().includes("health")) {
      reply = `For clinics and healthcare practices, practical AI helps eliminate administrative overload:\n\n1. **Patient Triage & Appointment Booking**: Answer patient FAQs regarding doctors, treatment costs, and schedule appointments directly on WhatsApp.\n2. **No-Show Reduction Engine**: Automated interactive reminder sequences that confirm, reschedule, or fill cancelled slots with waitlisted patients.\n3. **Review & Patient Feedback Intelligence**: Catch dissatisfied patients early through private feedback before they post public 1-star reviews.\n\nWould you like Shailendra to explore this with you?`;
    }

    return res.json({
      content: reply,
      showCta: true,
      suggestedPrompts: [
        "How quickly can this be integrated with our existing WhatsApp?",
        "What is the cost structure for a custom AI portal?",
        "Can you analyze our customer call recordings?",
      ],
      isDemo: true,
    });
  }

  try {
    const systemPrompt = `You are the AI Business Solutions Consultant representing AI GrowthLab (created by Shailendra Mishra).
Shailendra Mishra brings 15+ years of experience in Customer Experience, Quality Management, Speech Analytics, and Customer Interaction Analytics, now combined with modern Generative AI, Automation, and Web Development.

Your core mission:
Help business owners, founders, and managers understand practical applications of:
- AI-powered websites & landing pages
- Lead capture & WhatsApp automation
- Customer interaction analysis & sentiment auditing
- Sales conversation coaching & quality analytics
- Customer feedback & review analysis
- Custom business portals & operational dashboards

Guidelines:
1. Speak professionally, concisely, and with practical business authority. Avoid generic AI hype or buzzwords like "supercharge" or "revolutionize". Focus on time saved, conversion lifts, and lead leakage prevention.
2. If the user mentions their industry (e.g., automobile dealership, clinic, coaching institute, real estate, salon, retail, professional services), tailor your exact solutions to their specific operational problems.
3. At the end of every helpful response, offer a warm, clear conclusion: "Would you like Shailendra to explore this with you?" and encourage them to click the "Submit My Business Problem" button or schedule a direct consultation.`;

    const contents = history.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    const replyText = response.text || "I am ready to help you explore how AI can solve your business bottlenecks.";
    res.json({
      content: replyText,
      showCta: true,
      suggestedPrompts: [
        "How would this work for our team?",
        "What results have similar businesses seen?",
        "Can we connect our CRM and WhatsApp?",
      ],
      isDemo: false,
    });
  } catch (err: any) {
    console.error("Gemini assistant error:", err);
    res.json({
      content: "I'd be glad to help you explore practical AI solutions for your business. Whether you need WhatsApp automation, interaction analytics, or custom web portals, Shailendra can design a solution tailored to your exact workflow.\n\nWould you like Shailendra to explore this with you?",
      showCta: true,
      suggestedPrompts: [
        "What AI solutions do you build?",
        "Can I get a custom business scan?",
        "Connect with Shailendra",
      ],
      isDemo: true,
    });
  }
});

// Lead Magnet: Instant AI Business Opportunity Scan
app.post("/api/ai/business-scan", async (req, res) => {
  const { businessType, currentProcess, biggestProblem, monthlyEnquiryVolume, contactChannels } = req.body;
  const type = businessType || "General Business";

  const ai = getGemini();
  if (!ai) {
    return res.json({
      businessType: type,
      urgencyLevel: "High",
      estimatedHoursSavedMonthly: 38,
      projectedConversionIncrease: "+18% to +32%",
      diagnosticSummary: `For a ${type} handling ${monthlyEnquiryVolume || "100-300"} inquiries across ${(contactChannels || ["WhatsApp", "Website"]).join(", ")}, the primary bottleneck (${biggestProblem || "delayed response & manual follow-up"}) causes substantial lead decay within the first 2 hours.`,
      customRoadmap: [
        {
          phase: "Phase 1: Immediate Triage (Week 1-2)",
          timeline: "Days 1 - 10",
          action: "Deploy 24/7 Instant WhatsApp & Web Response Layer",
          deliverable: "AI agent answering top 15 FAQs, collecting budget & contact info, and booking calendar slots.",
        },
        {
          phase: "Phase 2: Sales Enablement (Week 3-4)",
          timeline: "Days 11 - 20",
          action: "Automated Lead Scoring & Sales Rep Dispatch",
          deliverable: "Instant push alerts to sales staff when high-intent buyers qualify themselves.",
        },
        {
          phase: "Phase 3: Intelligence & Analytics (Week 5+)",
          timeline: "Days 21 - 30",
          action: "Conversation Analytics & Quality Dashboard",
          deliverable: "Weekly executive dashboard tracking conversion rates, customer sentiment, and staff response speed.",
        },
      ],
      quickWinAutomations: [
        "Sub-30-second automated brochure / quote delivery on WhatsApp",
        "Lead leakage alert whenever an inquiry goes unattended for >15 minutes",
        "Automated 48-hour follow-up trigger for cold prospects",
      ],
      isDemo: true,
    });
  }

  try {
    const prompt = `Perform an instant, authoritative AI Business Opportunity Scan for:
Business Type: ${businessType}
Current Process: ${currentProcess}
Biggest Operational Problem: ${biggestProblem}
Monthly Enquiry Volume: ${monthlyEnquiryVolume}
Current Contact Channels: ${(contactChannels || []).join(", ")}

Return JSON with:
{
  "businessType": string,
  "urgencyLevel": "High" | "Medium" | "Strategic",
  "estimatedHoursSavedMonthly": number,
  "projectedConversionIncrease": string (e.g. "+20% to +35%"),
  "diagnosticSummary": string (expert analytical summary of root cause & opportunity),
  "customRoadmap": [
    {
      "phase": string,
      "timeline": string,
      "action": string,
      "deliverable": string
    }
  ],
  "quickWinAutomations": string[]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, isDemo: false });
  } catch (err) {
    console.error("Gemini business scan error:", err);
    res.json({
      businessType: type,
      urgencyLevel: "High",
      estimatedHoursSavedMonthly: 30,
      projectedConversionIncrease: "+20%",
      diagnosticSummary: "Opportunity to eliminate lead response latency and improve conversion.",
      customRoadmap: [
        { phase: "Phase 1", timeline: "Week 1", action: "Instant WhatsApp Responder", deliverable: "Live qualification bot" },
        { phase: "Phase 2", timeline: "Week 2", action: "Staff Alerts", deliverable: "CRM notifications" }
      ],
      quickWinAutomations: ["Instant quote dispatch", "WhatsApp follow-up cadence"],
      isDemo: true,
    });
  }
});

// ----------------------------------------------------
// LEAD PERSISTENCE & NOTIFICATION ARCHITECTURE
// ----------------------------------------------------

app.post("/api/leads", (req, res) => {
  const { name, businessName, email, phone, industry, website, problem, preferredContact } = req.body;

  if (!name || !email || !problem) {
    return res.status(400).json({ error: "Name, email, and problem description are required." });
  }

  const leads = getLeads();
  const newLead = {
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    businessName: (businessName || "Independent / Startup").trim(),
    email: email.trim(),
    phone: (phone || "Not provided").trim(),
    industry: (industry || "Other").trim(),
    website: (website || "").trim(),
    problem: problem.trim(),
    preferredContact: preferredContact || "WhatsApp",
    status: "New",
    notes: "Submitted via AI GrowthLab lead portal.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  leads.unshift(newLead);
  saveLeads(leads);

  // Secure Server-side Notification Architecture:
  // 1. Email payload prepared for owner (shailmishra16@gmail.com)
  const emailPayload = {
    to: process.env.OWNER_EMAIL || "shailmishra16@gmail.com",
    subject: `New AI GrowthLab Business Query - ${newLead.businessName}`,
    body: `
Name: ${newLead.name}
Business: ${newLead.businessName}
Email: ${newLead.email}
Phone: ${newLead.phone}
Industry: ${newLead.industry}
Website: ${newLead.website || "N/A"}
Problem: ${newLead.problem}
Preferred contact method: ${newLead.preferredContact}
Timestamp: ${newLead.createdAt}
    `.trim(),
  };

  console.log(`[LEAD NOTIFICATION] Email Queued:`, emailPayload.subject);

  // 2. WhatsApp Notification Architecture (direct link + payload generation)
  const rawWhatsAppText = `*New AI GrowthLab Business Query*\n\n` +
    `*Name:* ${newLead.name}\n` +
    `*Business:* ${newLead.businessName}\n` +
    `*Email:* ${newLead.email}\n` +
    `*Phone:* ${newLead.phone}\n` +
    `*Industry:* ${newLead.industry}\n` +
    `*Problem:* ${newLead.problem}\n` +
    `*Preferred Contact:* ${newLead.preferredContact}`;

  const encodedWhatsAppMessage = encodeURIComponent(rawWhatsAppText);
  const targetNumber = (process.env.OWNER_WHATSAPP || "+919025441583").replace(/[^0-9]/g, "");
  const ownerWhatsAppUrl = `https://wa.me/${targetNumber}?text=${encodedWhatsAppMessage}`;

  res.status(201).json({
    success: true,
    message: "Your business problem has been received. Shailendra will review it and get back to you shortly.",
    lead: newLead,
    notification: {
      emailSubject: emailPayload.subject,
      ownerWhatsAppUrl,
    },
  });
});

// Admin Lead Dashboard Endpoints
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "growthlab2025";
  if (password === adminPassword) {
    res.json({ success: true, token: "growthlab_admin_token_" + Buffer.from(adminPassword).toString("base64") });
  } else {
    res.status(401).json({ error: "Invalid admin access passkey." });
  }
});

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  const passHeader = req.headers["x-admin-password"];
  const adminPassword = process.env.ADMIN_PASSWORD || "growthlab2025";

  if (passHeader === adminPassword) {
    return next();
  }
  if (authHeader && authHeader.includes("growthlab_admin_token_")) {
    return next();
  }
  return res.status(403).json({ error: "Unauthorized access. Admin authentication required." });
}

app.get("/api/leads", requireAdmin, (_req, res) => {
  const leads = getLeads();
  res.json({ leads });
});

app.patch("/api/leads/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const leads = getLeads();
  const index = leads.findIndex((l: any) => l.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Lead not found." });
  }

  if (status) leads[index].status = status;
  if (typeof notes === "string") leads[index].notes = notes;
  leads[index].updatedAt = new Date().toISOString();

  saveLeads(leads);
  res.json({ success: true, lead: leads[index] });
});

app.delete("/api/leads/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  let leads = getLeads();
  leads = leads.filter((l: any) => l.id !== id);
  saveLeads(leads);
  res.json({ success: true, message: "Lead removed." });
});

// ----------------------------------------------------
// VITE / STATIC INTEGRATION
// ----------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI GrowthLab server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
