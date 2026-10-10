/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { HeaderBar } from './components/common/HeaderBar';
import { MobileFrame } from './components/common/MobileFrame';
import { ToastContainer } from './components/common/ToastContainer';
import { NotificationsModal } from './components/common/NotificationsModal';
import { WelcomeScreen } from './components/onboarding/WelcomeScreen';
import { RoleOnboardingModal } from './components/onboarding/RoleOnboardingModal';

// Citizen Components
import { CitizenDashboard } from './components/citizen/CitizenDashboard';
import { AILegalAssistant } from './components/citizen/AILegalAssistant';
import { DocumentUnderstandingStudio } from './components/citizen/DocumentUnderstandingStudio';
import { LawLibrary } from './components/citizen/LawLibrary';
import { FindLawyer } from './components/citizen/FindLawyer';
import { TrackMyCase } from './components/citizen/TrackMyCase';
import { TranslationStudio } from './components/citizen/TranslationStudio';
import { LegalHelpCentre } from './components/citizen/LegalHelpCentre';
import { CitizenProfile } from './components/citizen/CitizenProfile';
import { CitizenBottomNav } from './components/citizen/CitizenBottomNav';

// Lawyer Components
import { LawyerDashboard } from './components/lawyer/LawyerDashboard';
import { LawyerCaseManagement } from './components/lawyer/LawyerCaseManagement';
import { CourtroomCalendar } from './components/lawyer/CourtroomCalendar';
import { ClientRequests } from './components/lawyer/ClientRequests';
import { JudgmentExplorer } from './components/lawyer/JudgmentExplorer';
import { PrivateLawyerNotes } from './components/lawyer/PrivateLawyerNotes';
import { LawyerProfile } from './components/lawyer/LawyerProfile';
import { LawyerNav } from './components/lawyer/LawyerNav';

// Student Components
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentStudyRoom } from './components/student/StudentStudyRoom';
import { SectionSearch } from './components/student/SectionSearch';
import { StudentNotes } from './components/student/StudentNotes';
import { EBookLibrary } from './components/student/EBookLibrary';
import { AIHearingPrep } from './components/student/AIHearingPrep';
import { StudentProfile } from './components/student/StudentProfile';
import { StudentNav } from './components/student/StudentNav';

import { UserRole } from './types';

const MainAppContent: React.FC = () => {
  const {
    role,
    setRole,
    citizenTab,
    setCitizenTab,
    lawyerTab,
    setLawyerTab,
    studentTab,
    setStudentTab
  } = useApp();

  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [showRoleOnboarding, setShowRoleOnboarding] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [onboardingTargetRole, setOnboardingTargetRole] = useState<UserRole>('citizen');

  const handleOpenRoleSetup = (targetRole: UserRole) => {
    setOnboardingTargetRole(targetRole);
    setShowRoleOnboarding(true);
  };

  // Render Citizen Content
  const renderCitizenContent = () => {
    switch (citizenTab) {
      case 'home':
        return <CitizenDashboard onNavigate={(tab) => setCitizenTab(tab)} />;
      case 'assistant':
        return (
          <AILegalAssistant
            onBack={() => setCitizenTab('home')}
            onNavigateToLawyers={() => setCitizenTab('lawyers')}
            onNavigateToDocs={() => setCitizenTab('documents')}
          />
        );
      case 'documents':
        return (
          <DocumentUnderstandingStudio
            onBack={() => setCitizenTab('home')}
            onConsultLawyer={() => setCitizenTab('lawyers')}
          />
        );
      case 'library':
        return <LawLibrary onBack={() => setCitizenTab('home')} />;
      case 'lawyers':
        return (
          <FindLawyer
            onBack={() => setCitizenTab('home')}
            onViewConsultations={() => setCitizenTab('profile')}
          />
        );
      case 'cases':
        return <TrackMyCase onBack={() => setCitizenTab('home')} />;
      case 'translate':
        return <TranslationStudio onBack={() => setCitizenTab('home')} />;
      case 'help':
        return (
          <LegalHelpCentre
            onBack={() => setCitizenTab('home')}
            onNavigateToLawyers={() => setCitizenTab('lawyers')}
          />
        );
      case 'profile':
        return (
          <CitizenProfile
            onBack={() => setCitizenTab('home')}
            onSwitchRole={() => setShowRoleOnboarding(true)}
          />
        );
      default:
        return <CitizenDashboard onNavigate={(tab) => setCitizenTab(tab)} />;
    }
  };

  // Render Lawyer Content
  const renderLawyerContent = () => {
    switch (lawyerTab) {
      case 'dashboard':
        return <LawyerDashboard onNavigate={(tab) => setLawyerTab(tab)} />;
      case 'cases':
        return <LawyerCaseManagement onBack={() => setLawyerTab('dashboard')} />;
      case 'calendar':
        return <CourtroomCalendar onBack={() => setLawyerTab('dashboard')} />;
      case 'requests':
        return <ClientRequests onBack={() => setLawyerTab('dashboard')} />;
      case 'judgments':
        return <JudgmentExplorer onBack={() => setLawyerTab('dashboard')} />;
      case 'notes':
        return <PrivateLawyerNotes onBack={() => setLawyerTab('dashboard')} />;
      case 'profile':
        return (
          <LawyerProfile
            onBack={() => setLawyerTab('dashboard')}
            onSwitchRole={() => setShowRoleOnboarding(true)}
          />
        );
      default:
        return <LawyerDashboard onNavigate={(tab) => setLawyerTab(tab)} />;
    }
  };

  // Render Student Content
  const renderStudentContent = () => {
    switch (studentTab) {
      case 'dashboard':
        return <StudentDashboard onNavigate={(tab) => setStudentTab(tab)} />;
      case 'study-room':
        return <StudentStudyRoom onBack={() => setStudentTab('dashboard')} />;
      case 'section-search':
        return <SectionSearch onBack={() => setStudentTab('dashboard')} />;
      case 'notes':
        return <StudentNotes onBack={() => setStudentTab('dashboard')} />;
      case 'ebooks':
        return <EBookLibrary onBack={() => setStudentTab('dashboard')} />;
      case 'moot-court':
        return <AIHearingPrep onBack={() => setStudentTab('dashboard')} />;
      case 'profile':
        return (
          <StudentProfile
            onBack={() => setStudentTab('dashboard')}
            onSwitchRole={() => setShowRoleOnboarding(true)}
          />
        );
      default:
        return <StudentDashboard onNavigate={(tab) => setStudentTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#142B4A] flex flex-col font-sans">
      {/* Top Application Header Bar */}
      <HeaderBar
        onOpenNotifications={() => setShowNotifications(true)}
        onOpenRoleOnboarding={() => setShowRoleOnboarding(true)}
      />

      {/* Main Experience Viewport */}
      <MobileFrame>
        {showWelcome ? (
          <WelcomeScreen
            onDismiss={() => setShowWelcome(false)}
            onOpenRoleSetup={(r) => {
              setShowWelcome(false);
              handleOpenRoleSetup(r);
            }}
          />
        ) : (
          <div className="flex flex-col flex-1 h-full min-h-0">
            {/* Active Role Content Body */}
            <div className="flex-1 overflow-hidden min-h-0">
              {role === 'citizen' && renderCitizenContent()}
              {role === 'lawyer' && renderLawyerContent()}
              {role === 'student' && renderStudentContent()}
            </div>

            {/* Bottom Nav specifically mapped to active role */}
            {role === 'citizen' && (
              <CitizenBottomNav
                currentTab={citizenTab}
                onSelectTab={(tab) => setCitizenTab(tab)}
              />
            )}
            {role === 'lawyer' && (
              <LawyerNav
                currentTab={lawyerTab}
                onSelectTab={(tab) => setLawyerTab(tab)}
              />
            )}
            {role === 'student' && (
              <StudentNav
                currentTab={studentTab}
                onSelectTab={(tab) => setStudentTab(tab)}
              />
            )}
          </div>
        )}
      </MobileFrame>

      {/* Role Setup & Verification Modal */}
      <RoleOnboardingModal
        isOpen={showRoleOnboarding}
        onClose={() => setShowRoleOnboarding(false)}
        initialRole={onboardingTargetRole}
      />

      {/* In-app Notifications Drawer / Modal */}
      <NotificationsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Floating Feedback Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
