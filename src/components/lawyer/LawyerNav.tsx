import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  MessageSquare,
  BookOpen,
  Lock,
  User
} from 'lucide-react';

interface LawyerNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const LawyerNav: React.FC<LawyerNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cases', label: 'Cases', icon: Briefcase },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'requests', label: 'Requests', icon: MessageSquare },
    { id: 'judgments', label: 'Judgments', icon: BookOpen },
    { id: 'notes', label: 'Vault', icon: Lock },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="sticky bottom-0 z-40 bg-[#142B4A] text-white border-t border-white/10 px-1 py-1.5 shadow-xl">
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
                  ? 'text-[#D96B27]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-[9px] tracking-tight mt-0.5 truncate max-w-full ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#D96B27] absolute bottom-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
