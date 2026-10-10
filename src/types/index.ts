export type UserRole = 'citizen' | 'lawyer' | 'student';

export type LanguageCode = 'en' | 'te' | 'hi';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  district: string;
  avatar?: string;
  // Lawyer specific
  barCouncilNumber?: string;
  verifiedStatus?: 'verified' | 'pending' | 'unverified';
  practiceAreas?: string[];
  // Student specific
  college?: string;
  course?: string;
  yearOfStudy?: string;
  studentId?: string;
}

export interface StructuredLegalResponse {
  plainExplanation: string;
  nextSteps: string[];
  documentChecklist: string[];
  legalConcepts: { term: string; explanation: string }[];
  sourceReferences: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  structuredData?: StructuredLegalResponse;
}

export interface ImportantDate {
  label: string;
  date: string;
  significance: string;
}

export interface RightObligation {
  party: string;
  rights: string[];
  obligations: string[];
}

export interface LegalProvision {
  act: string;
  section: string;
  description: string;
}

export interface NextStep {
  step: string;
  priority: 'Immediate' | 'Within 7 Days' | 'Within 15 Days';
  timeline: string;
}

export interface EvidenceItem {
  item: string;
  description: string;
  recommended: boolean;
}

export interface DocumentAnalysisResult {
  id: string;
  title: string;
  documentType: string;
  uploadDate: string;
  originalText: string;
  summary: string;
  importantDates: ImportantDate[];
  rightsAndObligations: RightObligation[];
  relevantProvisions: LegalProvision[];
  suggestedNextSteps: NextStep[];
  evidenceChecklist: EvidenceItem[];
  draftResponse: string;
  isSimulated: boolean;
}

export interface LawyerProfile {
  id: string;
  name: string;
  title: string;
  barCouncilNo: string;
  experienceYears: number;
  practiceAreas: string[];
  languages: string[];
  education: string;
  location: string;
  consultationModes: string[];
  feeDisplay: string;
  bio: string;
  verifiedStatus: 'verified' | 'pending';
}

export interface ConsultationRequest {
  id: string;
  lawyerId: string;
  lawyerName: string;
  clientName: string;
  clientPhone: string;
  reason: string;
  practiceArea: string;
  consultationMethod: 'In-person' | 'Video consultation' | 'Phone call';
  preferredDate: string;
  sharedItems: {
    name: boolean;
    phone: boolean;
    document: boolean;
    facts: boolean;
  };
  consentGranted: boolean;
  status: 'pending' | 'accepted' | 'declined' | 'info_requested';
  createdAt: string;
  notes?: string;
}

export interface CaseHearingTimeline {
  id: string;
  date: string;
  stage: string;
  business: string;
  nextDate?: string;
  orderSummary?: string;
}

export interface CaseRecord {
  id: string;
  caseNumber: string;
  title: string;
  court: string;
  judge: string;
  courtroom: string;
  petitioner: string;
  respondent: string;
  stage: string;
  nextHearingDate: string;
  status: 'Active' | 'Disposed' | 'Adjourned' | 'Order Reserved';
  timeline: CaseHearingTimeline[];
  documents: { name: string; date: string; size: string }[];
  lawyerNotes?: string;
  isFictionalDemo: boolean;
}

export interface LawArticle {
  id: string;
  category: string;
  title: string;
  summary: string;
  plainExplanation: string;
  relevantSections: { act: string; section: string; text: string }[];
  practicalExample: string;
  nextSteps: string[];
  sourceInfo: string;
  readingTimeMinutes: number;
  bookmarked?: boolean;
}

export interface JudgmentBrief {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  bench: string;
  subject: string;
  quickBrief: string;
  facts: string[];
  issues: string[];
  argumentsPetitioner: string[];
  argumentsRespondent: string[];
  legalProvisions: string[];
  ratioDecidendi: string;
  obiterDicta?: string;
  finalOrder: string;
  bookmarked?: boolean;
  isFictionalDemo?: boolean;
}

export interface StudentNote {
  id: string;
  title: string;
  folder: string;
  tags: string[];
  content: string;
  lastModified: string;
}

export interface StudentStudySession {
  judgmentId: string;
  caseTitle: string;
  applicableSections: string;
  observations: string;
  importantPrinciples: string;
  examNotes: string;
  lastUpdated: string;
}

export interface EBook {
  id: string;
  title: string;
  author: string;
  subject: string;
  totalPages: number;
  coverBg: string;
  readingStatus: 'Not Started' | 'In Progress' | 'Completed';
  sampleChapters: { chapterNumber: number; title: string; excerpt: string }[];
}

export interface MootScenario {
  id: string;
  title: string;
  area: string;
  facts: string;
  legalIssues: string[];
  simulatedJudgeQueries: {
    question: string;
    context: string;
    rubricCriteria: string;
  }[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'hearing' | 'consultation' | 'analysis' | 'academic' | 'system';
  read: boolean;
  targetRole?: UserRole;
}
