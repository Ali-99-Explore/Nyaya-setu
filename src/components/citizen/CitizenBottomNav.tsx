import React from 'react';
import { Home, Compass, Briefcase, User } from 'lucide-react';

interface CitizenBottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const CitizenBottomNav: React.FC<CitizenBottomNavProps> = ({
  currentTab,
  onSelectTab
}) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'library', label: 'Explore', icon: Compass },
    { id: 'cases', label: 'My Cases', icon: Briefcase },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#142B4A]/10 px-2 py-1.5 shadow-lg">
      <div className="grid grid-cols-4 items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            currentTab === tab.id ||
            (tab.id === 'library' && currentTab === 'library') ||
            (tab.id === 'cases' && (currentTab === 'cases' || currentTab === 'consultations'));

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors relative ${
                isActive ? 'text-[#168C88]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
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
