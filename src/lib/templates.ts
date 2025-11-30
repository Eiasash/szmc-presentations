import { Slide, PresentationTheme } from './types';

export interface PresentationTemplate {
  id: string;
  name: string;
  description: string;
  category: 'medical' | 'business' | 'education' | 'general';
  icon: string;
  theme: PresentationTheme;
  slides: Omit<Slide, 'id'>[];
}

export const TEMPLATES: PresentationTemplate[] = [
  {
    id: 'medical-report',
    name: 'Medical Report',
    description: 'Patient case presentation with diagnosis and treatment plan',
    category: 'medical',
    icon: 'FirstAid',
    theme: 'medical-green',
    slides: [
      {
        title: 'Patient Case Presentation',
        content: 'Case #: [Enter Case Number]\nDate: [Enter Date]\nPresented by: [Your Name]',
      },
      {
        title: 'Patient Information',
        content: 'Age: [Enter Age]\nGender: [Enter Gender]\nMedical Record #: [Enter MRN]\nChief Complaint: [Enter primary concern]',
      },
      {
        title: 'History of Present Illness',
        content: 'Onset: [When symptoms began]\nDuration: [How long]\nSymptoms: [List main symptoms]\nProgression: [How symptoms have changed]',
      },
      {
        title: 'Physical Examination',
        content: 'Vital Signs:\n- BP: [Enter]\n- HR: [Enter]\n- Temp: [Enter]\n- RR: [Enter]\n\nGeneral: [Observations]\nSystemic Findings: [Key findings]',
      },
      {
        title: 'Diagnostic Findings',
        content: 'Laboratory Results:\n[List relevant lab values]\n\nImaging Studies:\n[Describe X-ray, CT, MRI findings]\n\nOther Tests:\n[Additional diagnostic results]',
      },
      {
        title: 'Diagnosis',
        content: 'Primary Diagnosis:\n[Enter diagnosis]\n\nDifferential Diagnoses:\n1. [Alternative diagnosis 1]\n2. [Alternative diagnosis 2]\n3. [Alternative diagnosis 3]',
      },
      {
        title: 'Treatment Plan',
        content: 'Immediate Management:\n[Acute interventions]\n\nMedications:\n[List prescriptions with dosages]\n\nProcedures:\n[Any planned procedures]',
      },
      {
        title: 'Follow-up & Prognosis',
        content: 'Follow-up Schedule:\n[Timeline for next visits]\n\nExpected Outcomes:\n[Prognosis and recovery timeline]\n\nPatient Education:\n[Key points discussed with patient]',
      },
    ],
  },
  {
    id: 'clinical-rounds',
    name: 'Clinical Rounds',
    description: 'Morning rounds presentation format for healthcare teams',
    category: 'medical',
    icon: 'Heartbeat',
    theme: 'medical-green',
    slides: [
      {
        title: 'Morning Rounds',
        content: 'Department: [Department Name]\nDate: [Today\'s Date]\nAttending: [Attending Physician]',
      },
      {
        title: 'Patient Overview',
        content: 'Name: [Patient Name/ID]\nAge/Gender: [Demographics]\nAdmission Date: [Date]\nDiagnosis: [Primary diagnosis]\nHospital Day: [Day #]',
      },
      {
        title: 'Overnight Events',
        content: 'Significant Events:\n[Any overnight incidents]\n\nVital Signs Trends:\n[Notable changes]\n\nInterventions:\n[Actions taken overnight]',
      },
      {
        title: 'Current Status',
        content: 'Subjective: [Patient\'s reported condition]\n\nObjective:\n- Vitals: [Latest readings]\n- Exam: [Physical findings]\n\nLabs: [Recent results]',
      },
      {
        title: 'Assessment & Plan',
        content: 'Assessment:\n[Current evaluation]\n\nPlan for Today:\n1. [Action item 1]\n2. [Action item 2]\n3. [Action item 3]\n\nDischarge Planning: [Target date and criteria]',
      },
    ],
  },
  {
    id: 'business-pitch',
    name: 'Business Pitch',
    description: 'Investor pitch deck for startups and new ventures',
    category: 'business',
    icon: 'ChartLineUp',
    theme: 'corporate-gray',
    slides: [
      {
        title: '[Your Company Name]',
        content: '[Tagline or value proposition]\n\nPresented by: [Your Name]\n[Your Title]',
      },
      {
        title: 'The Problem',
        content: '[Describe the problem you\'re solving]\n\n• Pain point 1\n• Pain point 2\n• Pain point 3\n\nMarket Size: [TAM/SAM/SOM figures]',
      },
      {
        title: 'The Solution',
        content: '[Your product or service]\n\nKey Features:\n• Feature 1: [Benefit]\n• Feature 2: [Benefit]\n• Feature 3: [Benefit]\n\nUnique Value: [What makes you different]',
      },
      {
        title: 'Market Opportunity',
        content: 'Total Addressable Market: [Amount]\nServiceable Market: [Amount]\nTarget Market: [Amount]\n\nGrowth Rate: [Percentage]\nMarket Trends: [Key trends supporting growth]',
      },
      {
        title: 'Business Model',
        content: 'Revenue Streams:\n• [Stream 1]\n• [Stream 2]\n• [Stream 3]\n\nPricing: [Pricing strategy]\nUnit Economics: [Key metrics]',
      },
      {
        title: 'Traction',
        content: 'Key Metrics:\n• Revenue: [Amount]\n• Customers: [Number]\n• Growth Rate: [Percentage]\n\nMilestones:\n✓ [Achievement 1]\n✓ [Achievement 2]\n✓ [Achievement 3]',
      },
      {
        title: 'Competition',
        content: 'Competitive Landscape:\n[Overview of competitors]\n\nOur Advantage:\n• [Differentiator 1]\n• [Differentiator 2]\n• [Differentiator 3]',
      },
      {
        title: 'Go-to-Market Strategy',
        content: 'Customer Acquisition:\n[How you\'ll reach customers]\n\nChannels:\n• [Channel 1]\n• [Channel 2]\n• [Channel 3]\n\nPartnerships: [Key partnerships]',
      },
      {
        title: 'Financial Projections',
        content: 'Year 1: [Revenue projection]\nYear 2: [Revenue projection]\nYear 3: [Revenue projection]\n\nBreak-even: [Timeline]\nKey Assumptions: [List main assumptions]',
      },
      {
        title: 'The Team',
        content: '[Founder/CEO Name] - [Background]\n[Co-founder/CTO Name] - [Background]\n[Key Team Member] - [Background]\n\nAdvisors:\n• [Advisor 1]\n• [Advisor 2]',
      },
      {
        title: 'The Ask',
        content: 'Raising: [Amount]\n\nUse of Funds:\n• [Category 1]: [Percentage]\n• [Category 2]: [Percentage]\n• [Category 3]: [Percentage]\n\nMilestones: [What this funding will achieve]',
      },
    ],
  },
  {
    id: 'quarterly-review',
    name: 'Quarterly Business Review',
    description: 'Company performance review and strategic update',
    category: 'business',
    icon: 'PresentationChart',
    theme: 'professional-blue',
    slides: [
      {
        title: 'Q[X] [Year] Business Review',
        content: '[Company Name]\n[Department/Division]\n\nPresented by: [Your Name]\n[Date]',
      },
      {
        title: 'Executive Summary',
        content: 'Key Highlights:\n• [Major achievement 1]\n• [Major achievement 2]\n• [Major achievement 3]\n\nOverall Performance: [Brief summary]',
      },
      {
        title: 'Financial Performance',
        content: 'Revenue: [Amount] ([vs target/previous quarter])\nProfit: [Amount] ([vs target/previous quarter])\nExpenses: [Amount] ([vs budget])\n\nKey Drivers:\n• [Driver 1]\n• [Driver 2]',
      },
      {
        title: 'Key Metrics',
        content: 'Metric 1: [Value] ([% change])\nMetric 2: [Value] ([% change])\nMetric 3: [Value] ([% change])\nMetric 4: [Value] ([% change])\n\nTrend Analysis: [Observations]',
      },
      {
        title: 'Strategic Initiatives',
        content: 'Initiative 1: [Name]\nStatus: [On track/Delayed/Complete]\nImpact: [Results or expected outcomes]\n\nInitiative 2: [Name]\nStatus: [On track/Delayed/Complete]\nImpact: [Results or expected outcomes]',
      },
      {
        title: 'Challenges & Risks',
        content: 'Current Challenges:\n• [Challenge 1]\n• [Challenge 2]\n• [Challenge 3]\n\nMitigation Plans:\n[How we\'re addressing these challenges]',
      },
      {
        title: 'Next Quarter Priorities',
        content: 'Q[X+1] Focus Areas:\n1. [Priority 1]\n2. [Priority 2]\n3. [Priority 3]\n\nTargets:\n• [Target 1]\n• [Target 2]\n• [Target 3]',
      },
      {
        title: 'Questions & Discussion',
        content: '[Open for team discussion and Q&A]',
      },
    ],
  },
  {
    id: 'project-proposal',
    name: 'Project Proposal',
    description: 'Project planning and approval presentation',
    category: 'business',
    icon: 'FolderOpen',
    theme: 'corporate-gray',
    slides: [
      {
        title: 'Project Proposal',
        content: '[Project Name]\n\nProposed by: [Your Name]\nDepartment: [Department]\nDate: [Date]',
      },
      {
        title: 'Project Overview',
        content: 'Objective:\n[What this project aims to achieve]\n\nScope:\n[What is included and excluded]\n\nExpected Duration: [Timeline]',
      },
      {
        title: 'Business Case',
        content: 'Problem Statement:\n[Issue being addressed]\n\nExpected Benefits:\n• [Benefit 1]\n• [Benefit 2]\n• [Benefit 3]\n\nROI: [Expected return on investment]',
      },
      {
        title: 'Project Approach',
        content: 'Methodology: [Approach being used]\n\nKey Phases:\n1. [Phase 1] - [Timeline]\n2. [Phase 2] - [Timeline]\n3. [Phase 3] - [Timeline]',
      },
      {
        title: 'Resources Required',
        content: 'Team Members:\n• [Role 1] - [FTE/Hours]\n• [Role 2] - [FTE/Hours]\n\nBudget: [Total amount]\n\nTools/Equipment:\n[List required resources]',
      },
      {
        title: 'Timeline & Milestones',
        content: 'Start Date: [Date]\nEnd Date: [Date]\n\nKey Milestones:\n• [Milestone 1] - [Date]\n• [Milestone 2] - [Date]\n• [Milestone 3] - [Date]',
      },
      {
        title: 'Risks & Dependencies',
        content: 'Risks:\n• [Risk 1] - [Mitigation]\n• [Risk 2] - [Mitigation]\n\nDependencies:\n• [Dependency 1]\n• [Dependency 2]',
      },
      {
        title: 'Next Steps & Approval',
        content: 'Immediate Actions:\n1. [Action 1]\n2. [Action 2]\n3. [Action 3]\n\nRequesting Approval To:\n[What you need approval for]',
      },
    ],
  },
  {
    id: 'research-findings',
    name: 'Research Findings',
    description: 'Academic or clinical research presentation',
    category: 'medical',
    icon: 'MagnifyingGlass',
    theme: 'professional-blue',
    slides: [
      {
        title: 'Research Presentation',
        content: '[Research Title]\n\nPrincipal Investigator: [Name]\nInstitution: [Institution Name]\nDate: [Date]',
      },
      {
        title: 'Background & Rationale',
        content: 'Current State of Knowledge:\n[What is already known]\n\nKnowledge Gap:\n[What is not known]\n\nWhy This Matters:\n[Significance of the research]',
      },
      {
        title: 'Research Question',
        content: 'Primary Research Question:\n[Main question being investigated]\n\nHypothesis:\n[Your hypothesis]\n\nSpecific Aims:\n• [Aim 1]\n• [Aim 2]\n• [Aim 3]',
      },
      {
        title: 'Methodology',
        content: 'Study Design: [Type of study]\n\nSample:\n• Size: [N]\n• Population: [Description]\n• Selection Criteria: [Criteria]\n\nData Collection: [Methods used]',
      },
      {
        title: 'Results - Overview',
        content: 'Participants:\n[Demographics and baseline characteristics]\n\nPrimary Outcome:\n[Main finding]\n\nStatistical Significance: [p-values, confidence intervals]',
      },
      {
        title: 'Key Findings',
        content: 'Finding 1:\n[Description and significance]\n\nFinding 2:\n[Description and significance]\n\nFinding 3:\n[Description and significance]',
      },
      {
        title: 'Discussion',
        content: 'Interpretation:\n[What the results mean]\n\nComparison with Literature:\n[How findings compare to existing research]\n\nLimitations:\n[Study limitations]',
      },
      {
        title: 'Conclusions & Implications',
        content: 'Conclusions:\n[Main takeaways]\n\nClinical/Practical Implications:\n[How this impacts practice]\n\nFuture Research:\n[What should be studied next]',
      },
      {
        title: 'Acknowledgments',
        content: 'Funding: [Grant sources]\n\nCollaborators:\n[Key contributors]\n\nThank you for your attention.\n\nQuestions?',
      },
    ],
  },
  {
    id: 'training-session',
    name: 'Training Session',
    description: 'Educational workshop or training presentation',
    category: 'education',
    icon: 'GraduationCap',
    theme: 'warm-orange',
    slides: [
      {
        title: 'Training Session',
        content: '[Training Topic]\n\nInstructor: [Your Name]\nDate: [Date]\nDuration: [Duration]',
      },
      {
        title: 'Learning Objectives',
        content: 'By the end of this session, you will be able to:\n\n1. [Objective 1]\n2. [Objective 2]\n3. [Objective 3]\n4. [Objective 4]',
      },
      {
        title: 'Agenda',
        content: '1. [Topic 1] - [Duration]\n2. [Topic 2] - [Duration]\n3. [Topic 3] - [Duration]\n4. Practice/Activity - [Duration]\n5. Q&A - [Duration]',
      },
      {
        title: 'Topic 1: [Name]',
        content: 'Key Concepts:\n• [Concept 1]\n• [Concept 2]\n• [Concept 3]\n\nWhy This Matters:\n[Relevance and importance]',
      },
      {
        title: 'Topic 2: [Name]',
        content: 'Key Concepts:\n• [Concept 1]\n• [Concept 2]\n• [Concept 3]\n\nWhy This Matters:\n[Relevance and importance]',
      },
      {
        title: 'Topic 3: [Name]',
        content: 'Key Concepts:\n• [Concept 1]\n• [Concept 2]\n• [Concept 3]\n\nWhy This Matters:\n[Relevance and importance]',
      },
      {
        title: 'Hands-On Activity',
        content: 'Exercise:\n[Description of practical activity]\n\nInstructions:\n1. [Step 1]\n2. [Step 2]\n3. [Step 3]\n\nTime: [Duration]',
      },
      {
        title: 'Key Takeaways',
        content: 'Remember:\n• [Key point 1]\n• [Key point 2]\n• [Key point 3]\n\nBest Practices:\n• [Practice 1]\n• [Practice 2]',
      },
      {
        title: 'Resources & Next Steps',
        content: 'Additional Resources:\n• [Resource 1]\n• [Resource 2]\n\nNext Steps:\n[What to do after this training]\n\nQuestions?',
      },
    ],
  },
  {
    id: 'team-meeting',
    name: 'Team Meeting',
    description: 'Regular team sync and status update',
    category: 'general',
    icon: 'Users',
    theme: 'professional-blue',
    slides: [
      {
        title: 'Team Meeting',
        content: '[Team Name]\n[Date]\n\nAgenda: [Brief overview]',
      },
      {
        title: 'Agenda',
        content: '1. Updates & Announcements\n2. Project Status Reviews\n3. Discussion Topics\n4. Action Items\n5. Q&A',
      },
      {
        title: 'Updates & Announcements',
        content: '• [Update 1]\n• [Update 2]\n• [Update 3]\n\nUpcoming Events:\n• [Event 1] - [Date]\n• [Event 2] - [Date]',
      },
      {
        title: 'Project Status: [Project Name]',
        content: 'Status: [On track/At risk/Delayed]\n\nCompleted This Week:\n• [Item 1]\n• [Item 2]\n\nPlanned for Next Week:\n• [Item 1]\n• [Item 2]',
      },
      {
        title: 'Discussion: [Topic]',
        content: 'Context:\n[Background information]\n\nQuestions to Address:\n• [Question 1]\n• [Question 2]\n\n[Open discussion]',
      },
      {
        title: 'Action Items',
        content: '• [Owner 1]: [Action item] - [Due date]\n• [Owner 2]: [Action item] - [Due date]\n• [Owner 3]: [Action item] - [Due date]',
      },
      {
        title: 'Next Meeting',
        content: 'Date: [Next meeting date]\nTime: [Time]\n\nTentative Topics:\n• [Topic 1]\n• [Topic 2]\n\nThank you!',
      },
    ],
  },
  {
    id: 'blank',
    name: 'Blank Presentation',
    description: 'Start from scratch with a single blank slide',
    category: 'general',
    icon: 'File',
    theme: 'professional-blue',
    slides: [
      {
        title: 'Welcome',
        content: 'Start editing your presentation here.',
      },
    ],
  },
];

export const getTemplatesByCategory = (category: PresentationTemplate['category']) => {
  return TEMPLATES.filter(t => t.category === category);
};

export const getTemplateById = (id: string) => {
  return TEMPLATES.find(t => t.id === id);
};

export const TEMPLATE_CATEGORIES = [
  { id: 'medical', name: 'Medical', icon: 'FirstAid' },
  { id: 'business', name: 'Business', icon: 'Briefcase' },
  { id: 'education', name: 'Education', icon: 'GraduationCap' },
  { id: 'general', name: 'General', icon: 'Files' },
] as const;
