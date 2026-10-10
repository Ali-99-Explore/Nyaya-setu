import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  LanguageCode,
  UserProfile,
  DocumentAnalysisResult,
  CaseRecord,
  ConsultationRequest,
  LawArticle,
  JudgmentBrief,
  StudentNote,
  StudentStudySession,
  AppNotification
} from '../types';
import {
  SAMPLE_DOCUMENT_ANALYSIS,
  MOCK_CASES,
  LAW_LIBRARY_ARTICLES,
  MOCK_JUDGMENTS,
  MOCK_STUDENT_NOTES,
  INITIAL_CONSULTATION_REQUESTS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  // Tabs
  citizenTab: string;
  setCitizenTab: (tab: string) => void;
  lawyerTab: string;
  setLawyerTab: (tab: string) => void;
  studentTab: string;
  setStudentTab: (tab: string) => void;

  // View frame mode (mobile chassis vs fluid responsive)
  viewMode: 'mobile' | 'fluid';
  setViewMode: (mode: 'mobile' | 'fluid') => void;

  // Language
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;

  // User profiles
  currentUser: UserProfile;
  updateCurrentUser: (updates: Partial<UserProfile>) => void;
  simulatedBarUpload: (docName: string) => void;

  // Bookmarks
  bookmarkedArticles: string[];
  toggleBookmarkArticle: (id: string) => void;
  bookmarkedJudgments: string[];
  toggleBookmarkJudgment: (id: string) => void;

  // Document analysis
  currentDocAnalysis: DocumentAnalysisResult;
  updateDraftResponse: (draft: string) => void;
  resetDocAnalysis: () => void;
  setDocAnalysis: (doc: DocumentAnalysisResult) => void;

  // Cases
  cases: CaseRecord[];
  addCase: (newCase: Omit<CaseRecord, 'id'>) => void;
  updateCase: (updatedCase: CaseRecord) => void;
  deleteCase: (id: string) => void;

  // Consultation requests
  consultations: ConsultationRequest[];
  submitConsultationRequest: (req: Omit<ConsultationRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateConsultationStatus: (id: string, status: ConsultationRequest['status'], notes?: string) => void;

  // Student notes & study room
  studentNotes: StudentNote[];
  addStudentNote: (note: Omit<StudentNote, 'id' | 'lastModified'>) => void;
  updateStudentNote: (note: StudentNote) => void;
  deleteStudentNote: (id: string) => void;
  studySessions: Record<string, StudentStudySession>;
  updateStudySession: (judgmentId: string, updates: Partial<StudentStudySession>) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  unreadCount: number;

  // Toasts
  toasts: ToastItem[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Reset all prototype state
  resetAllDemoData: () => void;
}

const DEFAULT_CITIZEN_USER: UserProfile = {
  id: 'usr_citizen_1',
  name: 'K. Venkat Reddy',
  role: 'citizen',
  email: 'venkat.reddy@example.com',
  phone: '+91 98490 12345',
  district: 'Hyderabad'
};

const DEFAULT_LAWYER_USER: UserProfile = {
  id: 'usr_lawyer_1',
  name: 'Adv. K. Srinivas Rao',
  role: 'lawyer',
  email: 'adv.srinivas.rao@tsbar.example.in',
  phone: '+91 94401 56789',
  district: 'Hyderabad',
  barCouncilNumber: 'TS/1420/2011',
  verifiedStatus: 'verified',
  practiceAreas: ['Property & Tenancy', 'Civil Litigation', 'Land Title Disputes']
};

const DEFAULT_STUDENT_USER: UserProfile = {
  id: 'usr_student_1',
  name: 'Sravani Krishna',
  role: 'student',
  email: 'sravani.k@student.oulaw.example.in',
  phone: '+91 99890 43210',
  district: 'Hyderabad',
  college: 'Osmania University College of Law, Hyderabad',
  course: '5-Year B.A. LL.B. (Honours)',
  yearOfStudy: '4th Year',
  studentId: 'OU-LAW-2023-088'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('citizen');
  const [citizenTab, setCitizenTab] = useState<string>('home');
  const [lawyerTab, setLawyerTab] = useState<string>('dashboard');
  const [studentTab, setStudentTab] = useState<string>('dashboard');

  const [viewMode, setViewMode] = useState<'mobile' | 'fluid'>('mobile');
  const [language, setLanguage] = useState<LanguageCode>('en');

  const [citizenProfile, setCitizenProfile] = useState<UserProfile>(DEFAULT_CITIZEN_USER);
  const [lawyerProfile, setLawyerProfile] = useState<UserProfile>(DEFAULT_LAWYER_USER);
  const [studentProfile, setStudentProfile] = useState<UserProfile>(DEFAULT_STUDENT_USER);

  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>(['art_rental']);
  const [bookmarkedJudgments, setBookmarkedJudgments] = useState<string[]>(['judg_1']);

  const [currentDocAnalysis, setDocAnalysis] = useState<DocumentAnalysisResult>(SAMPLE_DOCUMENT_ANALYSIS);
  const [cases, setCases] = useState<CaseRecord[]>(MOCK_CASES);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>(INITIAL_CONSULTATION_REQUESTS);
  const [studentNotes, setStudentNotes] = useState<StudentNote[]>(MOCK_STUDENT_NOTES);

  const [studySessions, setStudySessions] = useState<Record<string, StudentStudySession>>({
    judg_1: {
      judgmentId: 'judg_1',
      caseTitle: 'P. Satyanarayana Murthy vs District Collector, Hyderabad',
      applicableSections: 'Article 300A, Sec 22-A Registration Act, Telangana Record of Rights Act 2020',
      observations: 'Emphasizes that digital administrative portals cannot override constitutional property protections without due notice.',
      importantPrinciples: 'Doctrine of Natural Justice in digital e-governance registries.',
      examNotes: 'Relevant for Administrative Law (Sem 6) and Constitutional Law (Sem 4). Cite for writ of mandamus against portal classification.',
      lastUpdated: '2026-10-09'
    }
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const currentUser =
    role === 'citizen' ? citizenProfile : role === 'lawyer' ? lawyerProfile : studentProfile;

  const updateCurrentUser = (updates: Partial<UserProfile>) => {
    if (role === 'citizen') {
      setCitizenProfile((prev) => ({ ...prev, ...updates }));
    } else if (role === 'lawyer') {
      setLawyerProfile((prev) => ({ ...prev, ...updates }));
    } else {
      setStudentProfile((prev) => ({ ...prev, ...updates }));
    }
    addToast('Profile updated successfully', 'success');
  };

  const simulatedBarUpload = (docName: string) => {
    setLawyerProfile((prev) => ({
      ...prev,
      verifiedStatus: 'pending'
    }));
    addToast(`Bar Certificate "${docName}" submitted for simulated verification`, 'info');
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    addToast(`Switched to ${newRole === 'citizen' ? 'Citizen' : newRole === 'lawyer' ? 'Advocate / Lawyer' : 'Law Student'} mode`, 'info');
  };

  const toggleBookmarkArticle = (id: string) => {
    setBookmarkedArticles((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      addToast(exists ? 'Article removed from bookmarks' : 'Article bookmarked', 'info');
      return next;
    });
  };

  const toggleBookmarkJudgment = (id: string) => {
    setBookmarkedJudgments((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      addToast(exists ? 'Judgment removed from bookmarks' : 'Judgment bookmarked', 'info');
      return next;
    });
  };

  const updateDraftResponse = (draft: string) => {
    setDocAnalysis((prev) => ({
      ...prev,
      draftResponse: draft
    }));
    addToast('Draft response saved locally', 'success');
  };

  const resetDocAnalysis = () => {
    setDocAnalysis(SAMPLE_DOCUMENT_ANALYSIS);
    addToast('Reset to original sample legal notice', 'info');
  };

  const addCase = (newCase: Omit<CaseRecord, 'id'>) => {
    const id = 'case_' + Date.now();
    const record: CaseRecord = { ...newCase, id };
    setCases((prev) => [record, ...prev]);
    addToast(`Case "${newCase.caseNumber}" added to dashboard`, 'success');
  };

  const updateCase = (updated: CaseRecord) => {
    setCases((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    addToast(`Case details updated`, 'success');
  };

  const deleteCase = (id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
    addToast('Case record deleted from prototype', 'info');
  };

  const submitConsultationRequest = (
    req: Omit<ConsultationRequest, 'id' | 'createdAt' | 'status'>
  ) => {
    const id = 'req_' + Date.now();
    const newRequest: ConsultationRequest = {
      ...req,
      id,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setConsultations((prev) => [newRequest, ...prev]);
    // Also notify lawyer
    const notif: AppNotification = {
      id: 'notif_' + Date.now(),
      title: 'New Consultation Request',
      message: `${req.clientName} requested consultation for ${req.practiceArea}`,
      timestamp: 'Just now',
      type: 'consultation',
      read: false,
      targetRole: 'lawyer'
    };
    setNotifications((prev) => [notif, ...prev]);
    addToast('Consultation request sent with explicit privacy consent', 'success');
  };

  const updateConsultationStatus = (
    id: string,
    status: ConsultationRequest['status'],
    notes?: string
  ) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status, notes: notes || c.notes } : c))
    );
    addToast(`Request marked as ${status.replace('_', ' ')}`, 'info');
  };

  const addStudentNote = (note: Omit<StudentNote, 'id' | 'lastModified'>) => {
    const id = 'note_' + Date.now();
    const newNote: StudentNote = {
      ...note,
      id,
      lastModified: new Date().toISOString().split('T')[0]
    };
    setStudentNotes((prev) => [newNote, ...prev]);
    addToast('Note created successfully', 'success');
  };

  const updateStudentNote = (note: StudentNote) => {
    setStudentNotes((prev) =>
      prev.map((n) =>
        n.id === note.id
          ? { ...note, lastModified: new Date().toISOString().split('T')[0] }
          : n
      )
    );
    addToast('Note updated', 'success');
  };

  const deleteStudentNote = (id: string) => {
    setStudentNotes((prev) => prev.filter((n) => n.id !== id));
    addToast('Note deleted', 'info');
  };

  const updateStudySession = (
    judgmentId: string,
    updates: Partial<StudentStudySession>
  ) => {
    setStudySessions((prev) => ({
      ...prev,
      [judgmentId]: {
        ...(prev[judgmentId] || {
          judgmentId,
          caseTitle: '',
          applicableSections: '',
          observations: '',
          importantPrinciples: '',
          examNotes: '',
          lastUpdated: ''
        }),
        ...updates,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    }));
    addToast('Study session autosaved', 'success');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter(
    (n) => !n.read && (!n.targetRole || n.targetRole === role)
  ).length;

  const resetAllDemoData = () => {
    setCases(MOCK_CASES);
    setDocAnalysis(SAMPLE_DOCUMENT_ANALYSIS);
    setConsultations(INITIAL_CONSULTATION_REQUESTS);
    setStudentNotes(MOCK_STUDENT_NOTES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCitizenProfile(DEFAULT_CITIZEN_USER);
    setLawyerProfile(DEFAULT_LAWYER_USER);
    setStudentProfile(DEFAULT_STUDENT_USER);
    addToast('All demo prototype data reset to initial state', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        citizenTab,
        setCitizenTab,
        lawyerTab,
        setLawyerTab,
        studentTab,
        setStudentTab,
        viewMode,
        setViewMode,
        language,
        setLanguage,
        currentUser,
        updateCurrentUser,
        simulatedBarUpload,
        bookmarkedArticles,
        toggleBookmarkArticle,
        bookmarkedJudgments,
        toggleBookmarkJudgment,
        currentDocAnalysis,
        updateDraftResponse,
        resetDocAnalysis,
        setDocAnalysis,
        cases,
        addCase,
        updateCase,
        deleteCase,
        consultations,
        submitConsultationRequest,
        updateConsultationStatus,
        studentNotes,
        addStudentNote,
        updateStudentNote,
        deleteStudentNote,
        studySessions,
        updateStudySession,
        notifications,
        markNotificationAsRead,
        unreadCount,
        toasts,
        addToast,
        removeToast,
        resetAllDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
