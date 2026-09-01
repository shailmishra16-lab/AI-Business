import { CaseStudy, IndustryType, CustomerVoiceItem } from '../types';

export const OWNER_INFO = {
  name: "Shailendra Mishra",
  email: "shailmishra16@gmail.com",
  phone: "+91 90254 41583",
  whatsappNumber: "+919025441583",
  whatsappLink: "https://wa.me/919025441583?text=Hi%20Shailendra%2C%20I%20visited%20AI%20GrowthLab%20and%20would%20like%20to%20discuss%20an%20AI%20solution%20for%20my%20business.",
  title: "Founder & AI Builder @ AI GrowthLab | Interaction Analytics, CX & Quality Transformation Leader",
  experienceYears: "15+",
  tagline: "Practical AI. Real Business Problems. Measurable Action.",
  profileImage: "/shailendra_mishra.jpg",
  bio: "With over 15 years of deep domain experience in Interaction Analytics, CX & Quality Transformation, and customer conversation intelligence, I combine battle-tested operational frameworks with modern generative AI and workflow automation to eliminate business friction and recover revenue.",
  skills: [
    "Interaction Analytics, CX & Quality Transformation",
    "Customer Conversation & Speech Analytics",
    "Generative AI & Prompt Architecture",
    "Root Cause Analysis & Gemba Kaizen",
    "Quality Management Systems (QMS)",
    "Power BI & Executive Dashboards",
    "WhatsApp Intake & Workflow Automation",
    "Sales Coaching & Quality Scorecards",
    "Omnichannel Customer Experience (CX) Architecture"
  ],
  journeyTimeline: [
    {
      period: "2011 – 2015",
      title: "Quality Management & Process Improvement",
      role: "Senior Executive – Quality & Process Excellence",
      description: "Implemented quality management systems (QMS), Root Cause Analysis (RCA), Gemba Kaizen methodologies, and end-to-end continuous process improvement across operational teams.",
      badge: "QMS & Kaizen"
    },
    {
      period: "2016 – 2020",
      title: "Customer Conversation & Quality Intelligence",
      role: "Quality Intelligence & Conversation Audit Specialist",
      description: "Conducted in-depth conversation audits, speech acoustics analysis, customer sentiment evaluation, and standardized agent scorecard frameworks across high-volume contact centers.",
      badge: "Speech & QA"
    },
    {
      period: "2021 – 2026",
      title: "CX Strategy & Quality Leadership",
      role: "CX Strategy & Quality Operations Leader",
      description: "Led omnichannel customer experience quality initiatives, root-cause defect elimination, customer sentiment indexing, and executive reporting along with real-time Power BI Dashboards.",
      badge: "CX Leadership"
    },
    {
      period: "2026 – Present",
      title: "Founder & AI Builder @ AI GrowthLab",
      role: "Founder & Principal AI Solutions Architect",
      description: "Architecting custom conversational bots, speech QA platforms, and automated revenue leakage recovery engines for mid-market businesses, dealerships, clinics, and education institutes.",
      badge: "AI GrowthLab"
    },
    {
      period: "2026 – Present",
      title: "Applied AI & Operational Automation",
      role: "Applied AI Systems Architect",
      description: "Architecting custom prompt pipelines, automated WhatsApp intake workflows, CRM integrations, and executive decision-support AI tools.",
      badge: "Applied AI"
    }
  ]
};

export const INTERACTION_PRESETS = [
  {
    id: "preset-delay",
    label: "Automobile: Price Inquiry with 5-Hour Delay",
    industry: "Automobile",
    text: `[10:15 AM] Customer: Hi, I'm looking for the on-road price for the Hyundai Creta SX (O) Turbo Petrol in Delhi. Can you also send the waiting period and finance EMI options?
[10:18 AM] Customer: Also, do you have a vehicle available for test drive this Saturday?
[03:45 PM] Dealership Rep: Hello sir, sorry for late reply. Creta is available. When do you want to visit showroom?
[03:49 PM] Customer: It took you almost 6 hours to respond. Another dealer already sent me the complete pricing PDF, EMI sheet, and booked my test drive for tomorrow morning. Why would I wait for you?`
  },
  {
    id: "preset-clinic",
    label: "Clinic: Post-Procedure Bleeding Concern",
    industry: "Clinic",
    text: `[08:30 PM] Patient: Hello, I had my dental extraction done at your clinic at 4 PM today. The gauze is soaked and there is continuous oozing of blood. Is this normal? Should I take another painkiller?
[08:32 PM] Patient: Please reply, I am getting worried.
[08:45 PM] Automated Bot: Thank you for messaging Dr. Roy's Dental Clinic. Our operating hours are 9 AM to 7 PM. We will get back to you during working hours.
[08:47 PM] Patient: This is an emergency! I was told WhatsApp is monitored for post-op questions. I am going to have to visit the ER if no one calls me.`
  },
  {
    id: "preset-coaching",
    label: "Coaching: Fee Refund & Course Confusion",
    industry: "Coaching",
    text: `[11:00 AM] Parent: Hello, my daughter attended the trial session for NEET Physics on Tuesday. We paid the token registration fee of ₹5,000.
[11:02 AM] Parent: The faculty who taught the demo class is not assigned to the regular batch schedule you sent yesterday.
[11:05 AM] Parent: We were promised Mr. Verma would teach the batch. If he is not teaching, we would like a full refund of our token deposit immediately as per the 7-day guarantee.`
  },
  {
    id: "preset-realestate",
    label: "Real Estate: High-Budget Penthouse Inquiry",
    industry: "Real Estate",
    text: `[02:15 PM] Buyer: Hi, I am interested in the 4BHK Penthouse in SkyHeights Phase 2. Budget is ₹4.5 Cr all-inclusive.
[02:16 PM] Buyer: Are floor plans and carpet area certifications available? I will be in town only on Sunday to finalize.
[02:18 PM] Buyer: Please have your senior relationship manager call me directly.`
  }
];

export const SALES_COACH_PRESETS = [
  {
    id: "sales-car",
    title: "Car Dealership Test Drive Follow-up Call",
    industry: "Automobile",
    transcript: `Rep: Good afternoon sir, calling from Grand City Motors. You visited yesterday for the SUV test drive right?
Customer: Yes, I took the test drive of the 1.5L Turbo model.
Rep: Okay great. So what did you decide? Are you booking today?
Customer: Well, the drive was good, but your quotation is around ₹85,000 higher than Sharma Motors for the identical variant with insurance.
Rep: Sir, Sharma Motors gives third-party insurance and our showroom gives 3 years zero-depreciation comprehensive. Our showroom is also the largest in the city.
Customer: Still, ₹85,000 is a big difference. I need to discuss with my family.
Rep: Sir if you book today I can give you free floor mats and a car perfume. But you have to pay token of ₹25,000 right now before price hike next week.
Customer: I told you I will discuss with my family first. Please don't rush me.
Rep: Okay sir, call me when you decide. Bye.`
  },
  {
    id: "sales-clinic",
    title: "Aesthetic Clinic Skin Consultation Call",
    industry: "Clinic",
    transcript: `Counselor: Hello Priya, this is Nisha from Radiance Skin Clinic. You submitted an enquiry on Instagram regarding laser pigmentation treatment.
Customer: Hi Nisha, yes. I have dark spots from sun damage and wanted to know the price.
Counselor: Laser pigmentation sessions start at ₹4,500 per sitting, and most patients need 4 to 6 sittings.
Customer: That’s quite expensive. Is there any guarantee it will clear the spots completely?
Counselor: We use FDA-approved US Q-switched lasers. Results vary depending on your skin type, which is why Dr. Mehta conducts an advanced 3D skin scan before treatment.
Customer: Does the consultation cost extra?
Counselor: The consultation and 3D scan are normally ₹1,500, but if you visit this week, we adjust that amount against your first session. We have an opening with Dr. Mehta tomorrow at 4:30 PM or Thursday at 11:30 AM. Which one suits your schedule better?
Customer: Tomorrow at 4:30 PM works.
Counselor: Wonderful! I have reserved that slot. I am sending you the location pin and pre-consultation guidelines on WhatsApp right now.`
  },
  {
    id: "sales-coaching",
    title: "EdTech UPSC Masterclass Counseling Call",
    industry: "Coaching",
    transcript: `Counselor: Hi Rohan, calling from IAS Achievers Hub. You registered for our upcoming 1-year General Studies Foundation batch.
Customer: Yes, I wanted to know the faculty lineup and class timings.
Counselor: Classes are 6 PM to 9 PM daily, with live mentors and weekly mock tests. The fee is ₹75,000 for the full year.
Customer: I am working full-time in an IT company, so I might miss some live sessions. Are recordings available?
Counselor: Yes, unlimited recordings on our portal.
Customer: What about doubt solving? If I study at 10 PM after work, who answers questions?
Counselor: You can post in the portal forum.
Customer: Okay, I will think about it.
Counselor: Okay Rohan, please let us know if you decide to join.`
  }
];

export const CUSTOMER_VOICE_DATASETS: Record<IndustryType, CustomerVoiceItem[]> = {
  Automobile: [
    { id: "1", channel: "WhatsApp", timestamp: "Today 10:14 AM", text: "Waiting period for Creta Diesel is 4 months? Other dealer promised delivery in 3 weeks.", sentiment: "Negative", intent: "Delivery Timeline", pain_point: "Long waiting period", category: "Inventory" },
    { id: "2", channel: "Web Chat", timestamp: "Today 11:30 AM", text: "Can I get a detailed quotation with EMI breakdown for 5 years with 20% down payment?", sentiment: "Positive", intent: "Quotation & Finance", pain_point: "None", category: "Sales" },
    { id: "3", channel: "Phone Call", timestamp: "Today 01:15 PM", text: "I left 3 messages for the sales rep since yesterday morning. Nobody called back.", sentiment: "Negative", intent: "Follow-up Complaint", pain_point: "Unresponsive sales reps", category: "Follow-up" },
    { id: "4", channel: "WhatsApp", timestamp: "Today 02:45 PM", text: "Test drive was smooth! Sales rep explained all ADAS features very clearly.", sentiment: "Positive", intent: "Test Drive Feedback", pain_point: "None", category: "Staff Quality" },
    { id: "5", channel: "Review", timestamp: "Yesterday", text: "Hidden charges added in final bill for Teflon coating without my approval.", sentiment: "Negative", intent: "Billing Dispute", pain_point: "Hidden accessory charges", category: "Pricing" },
    { id: "6", channel: "WhatsApp", timestamp: "Yesterday", text: "Do you accept exchange of 2018 Swift Dzire? What is the valuation process?", sentiment: "Neutral", intent: "Exchange Inquiry", pain_point: "Evaluation uncertainty", category: "Trade-in" },
    { id: "7", channel: "Web Chat", timestamp: "2 days ago", text: "Is test drive available at my doorstep in Indiranagar?", sentiment: "Neutral", intent: "Doorstep Test Drive", pain_point: "Convenience", category: "Service" }
  ],
  Clinic: [
    { id: "1", channel: "WhatsApp", timestamp: "Today 09:15 AM", text: "What is the fee for root canal treatment with ceramic crown?", sentiment: "Neutral", intent: "Cost Enquiry", pain_point: "Pricing transparency", category: "Pricing" },
    { id: "2", channel: "Review", timestamp: "Today 10:30 AM", text: "Waited 50 minutes despite taking appointment 3 days in advance.", sentiment: "Negative", intent: "Wait Time Complaint", pain_point: "Long waiting delay", category: "Queue Management" },
    { id: "3", channel: "WhatsApp", timestamp: "Today 02:10 PM", text: "Dr. Sharma's diagnosis was very accurate and relief within 24 hours. Highly recommended!", sentiment: "Positive", intent: "Appreciation", pain_point: "None", category: "Clinical Quality" },
    { id: "4", channel: "Phone Call", timestamp: "Yesterday", text: "Can you send the digital prescription and lab reports on WhatsApp? Front desk forgot to print.", sentiment: "Neutral", intent: "Document Request", pain_point: "Missing records", category: "Admin" },
    { id: "5", channel: "WhatsApp", timestamp: "Yesterday", text: "Is Saturday evening slot available for child vaccination?", sentiment: "Positive", intent: "Booking", pain_point: "None", category: "Scheduling" },
    { id: "6", channel: "Review", timestamp: "2 days ago", text: "Staff is polite, clinic is spotless clean, and parking was easy.", sentiment: "Positive", intent: "Experience Review", pain_point: "None", category: "Facility" }
  ],
  Coaching: [
    { id: "1", channel: "WhatsApp", timestamp: "Today 08:30 AM", text: "What is the scholarship test syllabus for 11th JEE batch?", sentiment: "Positive", intent: "Scholarship Inquiry", pain_point: "None", category: "Admissions" },
    { id: "2", channel: "Phone Call", timestamp: "Today 11:20 AM", text: "Telecaller promised morning batch, but orientation notice says 2 PM to 7 PM.", sentiment: "Negative", intent: "Batch Schedule Mismatch", pain_point: "Misleading counselor info", category: "Operations" },
    { id: "3", channel: "WhatsApp", timestamp: "Today 03:40 PM", text: "Study materials for Chemistry Vol 2 not delivered even after 3 weeks of enrollment.", sentiment: "Negative", intent: "Material Delay", pain_point: "Delayed dispatch", category: "Logistics" },
    { id: "4", channel: "Review", timestamp: "Yesterday", text: "Weekly doubt clearing sessions helped my score jump by 80 marks in mock test.", sentiment: "Positive", intent: "Result Feedback", pain_point: "None", category: "Academics" }
  ],
  "Real Estate": [
    { id: "1", channel: "WhatsApp", timestamp: "Today 10:00 AM", text: "Are there any RERA approved 3BHK flats ready to move in Whitefield under ₹1.8 Cr?", sentiment: "Positive", intent: "Property Search", pain_point: "RERA verification", category: "Sales" },
    { id: "2", channel: "Phone Call", timestamp: "Today 12:45 PM", text: "Agent cancelled site visit at the last minute after I drove 25 km.", sentiment: "Negative", intent: "Site Visit Cancellation", pain_point: "Agent unreliability", category: "Service" },
    { id: "3", channel: "Web Chat", timestamp: "Yesterday", text: "Can you send the master layout and payment plan PDF?", sentiment: "Neutral", intent: "Brochure Request", pain_point: "None", category: "Marketing" }
  ],
  Retail: [
    { id: "1", channel: "WhatsApp", timestamp: "Today 11:00 AM", text: "Do you have size UK 9 in the waterproof trekking boots in stock?", sentiment: "Neutral", intent: "Inventory Check", pain_point: "Stock check", category: "Inventory" },
    { id: "2", channel: "Review", timestamp: "Yesterday", text: "Return policy is complicated. They refused refund for defective zipper.", sentiment: "Negative", intent: "Return Dispute", pain_point: "Rigid return rules", category: "Policy" },
    { id: "3", channel: "WhatsApp", timestamp: "Yesterday", text: "Loved the anniversary discount and express delivery within 2 hours!", sentiment: "Positive", intent: "Appreciation", pain_point: "None", category: "Delivery" }
  ],
  Restaurant: [
    { id: "1", channel: "Review", timestamp: "Today 01:30 PM", text: "Food was delicious especially the wood-fired pizza, but table was not ready despite reservation.", sentiment: "Neutral", intent: "Table Delay", pain_point: "Reservation queue", category: "Operations" },
    { id: "2", channel: "WhatsApp", timestamp: "Today 04:15 PM", text: "Can we book a private dining section for 18 people this Friday with set menu?", sentiment: "Positive", intent: "Group Booking", pain_point: "None", category: "Events" }
  ],
  Salon: [
    { id: "1", channel: "WhatsApp", timestamp: "Today 10:30 AM", text: "What is the bridal makeup package price and does it include trial styling?", sentiment: "Positive", intent: "Package Inquiry", pain_point: "Package details", category: "Sales" },
    { id: "2", channel: "Review", timestamp: "Yesterday", text: "Stylist changed halfway through hair coloring without asking me.", sentiment: "Negative", intent: "Staff Inconsistency", pain_point: "Staff handover", category: "Service" }
  ],
  "Professional Services": [
    { id: "1", channel: "Web Chat", timestamp: "Today 02:00 PM", text: "Need GST audit and quarterly compliance filing for a private limited firm.", sentiment: "Positive", intent: "Service Proposal", pain_point: "Deadline compliance", category: "Sales" },
    { id: "2", channel: "Email", timestamp: "Yesterday", text: "Invoice sent has incorrect TDS deduction rate applied.", sentiment: "Negative", intent: "Billing Correction", pain_point: "Accounting error", category: "Billing" }
  ],
  Other: [
    { id: "1", channel: "WhatsApp", timestamp: "Today 11:15 AM", text: "How does AI GrowthLab help capture leads from Instagram ads?", sentiment: "Positive", intent: "Service Inquiry", pain_point: "Ad conversion drop", category: "AI Automation" },
    { id: "2", channel: "Web Chat", timestamp: "Yesterday", text: "Can you analyze our call recordings in Hindi and English mix?", sentiment: "Positive", intent: "Speech Analytics", pain_point: "Multilingual evaluation", category: "Speech Analytics" }
  ]
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-auto",
    industry: "Automobile Dealership",
    title: "Multi-Brand Dealership Lead Recovery & Response Automation",
    clientType: "3-Location Dealership Network (500+ monthly leads)",
    badge: "Demonstration project using sample data",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Modern Automobile Showroom",
    challenge: "Inquiries from CarDekho, Google Ads, and Facebook had an average first-response time of 4.5 hours. 42% of interested buyers purchased elsewhere or went cold before sales reps made first contact.",
    solution: "Built a 24/7 AI WhatsApp Intake System that responds in under 45 seconds, qualifies buyer intent (budget, model preference, exchange car), sends brochure PDFs, and pushes high-priority hot alerts to showroom sales executives.",
    results: [
      { metric: "<45 Sec", label: "Average Response Time (down from 4.5 hrs)" },
      { metric: "+38%", label: "Increase in Booked Test Drives" },
      { metric: "Zero", label: "Lost Night & Weekend Inquiries" }
    ],
    blueprintSteps: [
      "Real-time webhook capture from ad channels into central intake queue",
      "AI WhatsApp conversational bot answering variants, waiting periods, and pricing",
      "Instant calendar booking for doorstep or showroom test drive slots",
      "Speech analytics audit on recorded sales calls to coach reps on price objection handling"
    ],
    quote: "Accelerating our response from hours to seconds prevented our prospects from shopping at competing dealerships."
  },
  {
    id: "case-clinic",
    industry: "Clinic & Healthcare",
    title: "Specialty Clinic Patient Triage & No-Show Reduction",
    clientType: "Cosmetic & Dental Group Practice (1,200+ monthly patients)",
    badge: "Demonstration project using sample data",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
    imageAlt: "State of the art Medical Clinic",
    challenge: "Clinic receptionists spent 6+ hours daily answering repetitive pricing and pre-op queries on WhatsApp. Appointment no-show rate hovered at 26%, causing costly idle doctor hours.",
    solution: "Implemented an AI Patient Assistant on WhatsApp capable of answering treatment FAQs, providing transparent price ranges, handling appointment booking, and delivering a 3-touch interactive confirmation sequence.",
    results: [
      { metric: "-65%", label: "Reduction in Patient No-Show Rate" },
      { metric: "25 Hrs/Wk", label: "Saved for Clinic Reception Staff" },
      { metric: "+4.8★", label: "Average Google Review Rating" }
    ],
    blueprintSteps: [
      "Automated FAQ triage on treatment costs, downtime, and doctor credentials",
      "Smart WhatsApp slot confirmation with 1-click reschedule button",
      "Automated post-procedure care guidance and medication reminder delivery",
      "Private feedback loop to catch dissatisfied patients before public 1-star reviews"
    ],
    quote: "Our front desk is no longer buried in repetitive chats, and our doctor consultation slots stay consistently full."
  },
  {
    id: "case-coaching",
    industry: "Coaching & Education",
    title: "Coaching Institute Admission Counseling Quality Engine",
    clientType: "Competitive Exam Coaching Academy (800+ monthly leads)",
    badge: "Demonstration project using sample data",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Educational Institute Learning Center",
    challenge: "High ad spend was driving hundreds of trial class enrollments, but trial-to-paid conversion was low (8.5%). Management had no visibility into telecaller conversation quality or parent objections.",
    solution: "Deployed an AI Sales Conversation Coach and Speech Analytics pipeline that audits 100% of counselor calls, scoring discovery quality, fee explanation transparency, and objection handling.",
    results: [
      { metric: "+45%", label: "Trial-to-Paid Conversion Lift" },
      { metric: "100%", label: "Counseling Call Quality Auditing" },
      { metric: "+₹18 Lakh", label: "Additional Monthly Enrollment Value" }
    ],
    blueprintSteps: [
      "Automated transcription and multi-criteria QA scorecard evaluation",
      "Instant coaching feedback delivered to counselors after every call",
      "Identification of top parent objections (faculty concerns, batch timings, fee transparency)",
      "Automated WhatsApp parent follow-up sequence with student success stories"
    ],
    quote: "Moving from 5% sample QA audits to 100% automated AI call coaching transformed our admissions team's conversion velocity."
  }
];

export const INDUSTRY_SOLUTIONS_LIST = [
  {
    id: "auto",
    industry: "Automobile Dealerships",
    icon: "car",
    headline: "Never Lose a Car Buyer to Delayed Response",
    problems: [
      "Inquiries on web and WhatsApp wait 3 to 6 hours for salesperson callbacks",
      "Price shoppers leave for competing showrooms over minor quotation ambiguities",
      "Zero visibility into sales rep phone pitch quality and objection handling"
    ],
    aiOpportunities: [
      "Sub-60s WhatsApp Instant Qualification & Variant Brochure Delivery",
      "Automated Doorstep / Showroom Test Drive Slot Scheduler",
      "Sales Conversation Quality Audits & Objection Coaching",
      "Lost Lead Re-engagement Cadence at Day 3, 7, and 14"
    ],
    workflow: "Car Buyer submits form → AI WhatsApp instantly delivers brochure & calculates estimated EMI → Buyer picks test drive time → Sales rep receives instant alert with buyer preferences.",
    demoRoute: "/demos/lead-health"
  },
  {
    id: "clinic",
    industry: "Clinics & Healthcare",
    icon: "stethoscope",
    headline: "Streamline Patient Triage & Eliminate Expensive No-Shows",
    problems: [
      "Reception team overwhelmed by repetitive pricing, timing, and doctor queries",
      "20-30% patient appointment no-shows leaving costly doctor hours vacant",
      "Post-consultation complaints airing publicly on Google Reviews"
    ],
    aiOpportunities: [
      "24/7 WhatsApp Patient Triage & Appointment Scheduling",
      "Interactive 2-Way Confirmation & Smart Rescheduling Engine",
      "Automated Post-Procedure Care Instructions & Medicine Reminders",
      "Private Feedback Catchment System to Protect Online Reputation"
    ],
    workflow: "Patient inquires on WhatsApp → AI answers treatment FAQs & schedules OPD slot → System sends automated reminder with 1-click confirm → Post-visit review prompt triggers 2 hours later.",
    demoRoute: "/demos/review-analyzer"
  },
  {
    id: "coaching",
    industry: "Coaching & Education",
    icon: "graduation-cap",
    headline: "Boost Admission Conversion with Consistent Telecounseling",
    problems: [
      "Counselors struggle to handle parent objections around fees and faculty",
      "Trial class attendees drop off without structured multi-touch follow-up",
      "Management lacks time to audit counseling call quality manually"
    ],
    aiOpportunities: [
      "100% Automated Counseling Call Speech Analytics & Scoring",
      "Instant WhatsApp Scholarship Test & Syllabus Dispatch",
      "Personalized Video/Doc Nurture Sequence for Trial Attendees",
      "Parent Objection Trend Dashboard for Academic Directors"
    ],
    workflow: "Student registers for trial → Counselor receives AI-suggested pitch notes → Call is recorded & auto-scored → Parent receives instant WhatsApp summary with faculty credentials.",
    demoRoute: "/demos/sales-coach"
  },
  {
    id: "realestate",
    industry: "Real Estate Developers & Agencies",
    icon: "building",
    headline: "Filter Serious Property Buyers from Casual Browsers",
    problems: [
      "Hundreds of ad leads with fake phone numbers or unrealistic budgets",
      "Brokers waste weekend hours waiting for site visit cancellations",
      "Slow brochure delivery causes high-net-worth buyers to lose interest"
    ],
    aiOpportunities: [
      "Instant WhatsApp AI Qualification (Budget, Timeline, Funding Source)",
      "Automated Site Visit Scheduling with Calendar Invites & Route Pins",
      "Floor Plan & RERA Verification Document Auto-Delivery",
      "High-Value Lead Escalation directly to Senior Partners"
    ],
    workflow: "Ad Lead submitted → AI qualifies budget & location intent on WhatsApp in 30s → Verified buyer books Sunday site visit → Relationship manager receives hot lead dossier.",
    demoRoute: "/demos/customer-voice"
  },
  {
    id: "retail",
    industry: "Retail & E-Commerce",
    icon: "shopping-bag",
    headline: "Turn WhatsApp into Your Most Efficient Sales & Support Channel",
    problems: [
      "Customers abandon shopping carts when stock or delivery questions go unanswered",
      "Post-purchase return disputes escalate rapidly into chargebacks",
      "Manual order tracking inquiries overload support staff"
    ],
    aiOpportunities: [
      "Live Catalog Search & Size Availability Bot on WhatsApp",
      "Automated Order Tracking & Shipping Updates",
      "Self-Service Exchange / Return Verification Workflow",
      "Customer Review & Sentiment Intelligence Pipeline"
    ],
    workflow: "Customer asks about product on Instagram/WhatsApp → AI checks inventory & sends checkout link → Order confirmed → Tracking updates pushed automatically.",
    demoRoute: "/demos/interaction-analyzer"
  },
  {
    id: "restaurants",
    industry: "Restaurants & Cafes",
    icon: "utensils",
    headline: "Fill Tables & Protect Your 5-Star Reputation",
    problems: [
      "Phone lines busy during peak dining hours leading to lost group bookings",
      "Negative reviews over wait times and food consistency without early alert",
      "Zero customer database for repeat weekday promotions"
    ],
    aiOpportunities: [
      "24/7 WhatsApp Table Reservation & Party Booking Agent",
      "Live Menu & Dietary FAQ Assistance",
      "Instant Feedback Collection on Bill Generation",
      "Review Sentiment Analysis to Detect Kitchen/Service Inconsistencies"
    ],
    workflow: "Guest messages for weekend party → AI checks capacity & confirms booking → Bill generated → Guest receives WhatsApp feedback survey → 5-star guests directed to Google Reviews.",
    demoRoute: "/demos/review-analyzer"
  },
  {
    id: "salons",
    industry: "Salons, Spas & Wellness",
    icon: "sparkles",
    headline: "Keep Stylist Chairs Full & Retain High-Value Clients",
    problems: [
      "Last minute cancellations leaving expensive service bays vacant",
      "Clients forget to rebook recurring services (hair color, skin treatments)",
      "Unclear service packages causing billing disputes at checkout"
    ],
    aiOpportunities: [
      "WhatsApp Appointment Booking with Stylist Selection",
      "Automated Rebooking Reminders based on Past Treatment Intervals",
      "Transparent Bridal / Package Price Calculator",
      "Staff Service Quality & Client Retention Auditing"
    ],
    workflow: "Client books service via WhatsApp → Reminder sent 3 hours prior → 4 weeks post-visit, AI sends tailored rebooking prompt with loyalty incentive.",
    demoRoute: "/demos/lead-health"
  },
  {
    id: "services",
    industry: "Professional Services (CA, Legal, Agency)",
    icon: "briefcase",
    headline: "Pre-Qualify Inbound Clients & Automate Document Intake",
    problems: [
      "High-value partners spending billable hours answering basic pricing queries",
      "Unqualified prospects expecting free consulting without budget",
      "Manual chase for client tax and compliance documents"
    ],
    aiOpportunities: [
      "Inbound Client Scope & Budget Qualification Bot",
      "Automated Discovery Call Scheduling for Qualified Prospects",
      "Client Document Checklist & WhatsApp Upload Reminders",
      "Executive Case Update Summarizer"
    ],
    workflow: "Prospective client visits site → AI collects scope, revenue, and timeline → Pre-qualifies client → Books 20-min consultation on partner's calendar.",
    demoRoute: "/demos/business-assistant"
  },
  {
    id: "local",
    industry: "Local Businesses & Home Services",
    icon: "map-pin",
    headline: "Win Every Neighborhood Job with Immediate Response",
    problems: [
      "Owner is on-site working and cannot answer phone calls immediately",
      "Homeowners call 3 different vendors; the first to answer gets the job",
      "Manual paper billing and slow review collection"
    ],
    aiOpportunities: [
      "Instant Missed-Call-to-WhatsApp Text Back Auto-Responder",
      "Service Area & Problem Diagnosis Bot with Photo Upload",
      "Automated Estimate Dispatch & Job Booking",
      "Instant Google Review Request upon Job Completion"
    ],
    workflow: "Customer calls while owner is busy → System sends instant WhatsApp: 'Sorry I missed your call! How can I help?' → Customer shares problem → AI books technician visit.",
    demoRoute: "/demos/lead-health"
  }
];

export const SOLUTION_PILLARS = [
  {
    id: "build",
    tag: "BUILD",
    title: "AI-Powered Websites & Portals",
    description: "Modern, high-converting digital storefronts and internal tools built to engage visitors and capture structured business data.",
    features: [
      "Custom responsive web applications with interactive AI demos",
      "High-converting landing pages engineered for lead capture",
      "Internal team portals and client dashboards",
      "Secure backend architectures with server-side AI integrations"
    ],
    icon: "layout"
  },
  {
    id: "automate",
    tag: "AUTOMATE",
    title: "WhatsApp & Workflow Automation",
    description: "Eliminate manual lead follow-up delays with intelligent, multi-channel automated workflows that run 24/7.",
    features: [
      "Instant <60-second WhatsApp lead response & brochure delivery",
      "Two-way appointment booking and schedule confirmation",
      "Multi-touch re-engagement sequences for stalled leads",
      "Real-time salesperson push notifications with lead context"
    ],
    icon: "zap"
  },
  {
    id: "understand",
    tag: "UNDERSTAND",
    title: "Customer Interaction Intelligence",
    description: "Grounded in 15+ years of speech analytics and quality management to analyze 100% of customer touchpoints.",
    features: [
      "Omnichannel sentiment and customer urgency classification",
      "Root-cause pain point and complaint category identification",
      "Sales call transcription and quality scorecard auditing",
      "Review and feedback intelligence across public & private channels"
    ],
    icon: "bar-chart-2"
  },
  {
    id: "improve",
    tag: "IMPROVE",
    title: "Sales Coaching & CX Action",
    description: "Transform raw customer data into prescriptive executive actions and targeted sales representative coaching.",
    features: [
      "Individualized sales rep coaching recommendations and drill exercises",
      "Top 5 prioritized management action plans with expected ROI",
      "Lead leakage diagnostic meters and pipeline visibility",
      "Continuous customer experience benchmarking against industry peers"
    ],
    icon: "trending-up"
  }
];
