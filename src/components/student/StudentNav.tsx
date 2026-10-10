import React from 'react';
import {
  GraduationCap,
  BookOpen,
  FileEdit,
  BookMarked,
  Sparkles,
  Search,
  User
} from 'lucide-react';

interface StudentNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const StudentNav: React.FC<StudentNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: GraduationCap },
    { id: 'study-room', label: 'Study Room', icon: BookOpen },
    { id: 'section-search', label: 'Sections', icon: Search },
    { id: 'notes', label: 'Notes', icon: FileEdit },
    { id: 'ebooks', label: 'E-Books', icon: BookMarked },
    { id: 'moot-court', label: 'Moot AI', icon: Sparkles },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#142B4A]/10 px-1 py-1.5 shadow-xl">
      <div className="grid grid-cols-7 items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`min-h-[44px] flex flex-col items-center justify-center py-1 transition-all relative ${
                isActive
                  ? 'text-[#168C88]'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-[9px] tracking-tight mt-0.5 truncate max-w-full ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#168C88] absolute bottom-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
