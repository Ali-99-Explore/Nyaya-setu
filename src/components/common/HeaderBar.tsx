import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BridgeLogo } from './BridgeLogo';
import { Bell, Smartphone, Monitor, ChevronDown, Check, User, Shield, GraduationCap, Users } from 'lucide-react';
import { UserRole, LanguageCode } from '../../types';

interface HeaderBarProps {
  onOpenNotifications: () => void;
  onOpenRoleOnboarding: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onOpenNotifications,
  onOpenRoleOnboarding
}) => {
  const {
    role,
    setRole,
    language,
    setLanguage,
    viewMode,
    setViewMode,
    unreadCount,
    currentUser
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const roleLabels: Record<UserRole, { label: string; desc: string; icon: React.ReactNode }> = {
    citizen: {
      label: 'Citizen View',
      desc: 'Understand rights & find aid',
      icon: <Users className="w-3.5 h-3.5 text-[#168C88]" />
    },
    lawyer: {
      label: 'Advocate View',
      desc: 'Manage cases & cause list',
      icon: <Shield className="w-3.5 h-3.5 text-[#D96B27]" />
    },
    student: {
      label: 'Law Student View',
      desc: 'Study judgments & moot court',
      icon: <GraduationCap className="w-3.5 h-3.5 text-[#142B4A]" />
    }
  };

  const languages: { code: LanguageCode; label: string; sub: string }[] = [
    { code: 'en', label: 'English', sub: 'EN' },
    { code: 'te', label: 'తెలుగు', sub: 'Telugu' },
    { code: 'hi', label: 'हिंदी', sub: 'Hindi' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#142B4A]/10 px-3.5 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2">
          <BridgeLogo size="sm" showText={true} />
        </div>

        {/* Zone 2: Role Switcher & Device controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Active Role Selector dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setRoleMenuOpen(!roleMenuOpen);
                setLangMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#142B4A]/15 shadow-xs text-xs font-semibold text-[#142B4A] hover:border-[#168C88] transition-colors"
              aria-label="Switch Role"
            >
              {roleLabels[role].icon}
              <span className="hidden sm:inline">{roleLabels[role].label}</span>
              <span className="sm:hidden text-[11px] font-bold">
                {role === 'citizen' ? 'Citizen' : role === 'lawyer' ? 'Lawyer' : 'Student'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Active Role Experience
                </div>
                {(['citizen', 'lawyer', 'student'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-start gap-2.5 px-3 py-2 text-left hover:bg-slate-50 transition-colors ${
                      role === r ? 'bg-[#168C88]/5 font-semibold text-[#142B4A]' : 'text-slate-600'
                    }`}
                  >
                    <div className="mt-0.5">{roleLabels[r].icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span>{roleLabels[r].label}</span>
                        {role === r && <Check className="w-3.5 h-3.5 text-[#168C88]" />}
                      </div>
                      <p className="text-[10px] text-slate-500 font-normal">{roleLabels[r].desc}</p>
                    </div>
                  </button>
                ))}

                <div className="border-t border-slate-100 mt-1 pt-1 px-2">
                  <button
                    onClick={() => {
                      setRoleMenuOpen(false);
                      onOpenRoleOnboarding();
                    }}
                    className="w-full text-center py-1.5 text-[11px] font-medium text-[#168C88] hover:underline"
                  >
                    View Role Verification / Onboarding Setup
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setRoleMenuOpen(false);
              }}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white border border-[#142B4A]/15 text-xs font-medium text-slate-700 hover:border-[#168C88] transition-colors"
              title="Change Language"
            >
              <span className="font-semibold text-[11px]">
                {language === 'en' ? 'EN' : language === 'te' ? 'తె' : 'हि'}
              </span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 text-xs">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-left hover:bg-slate-50 ${
                      language === l.code ? 'font-semibold text-[#168C88]' : 'text-slate-700'
                    }`}
                  >
                    <span>{l.label}</span>
                    {language === l.code && <Check className="w-3 h-3 text-[#168C88]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg bg-white border border-[#142B4A]/15 text-slate-700 hover:text-[#142B4A] hover:border-[#168C88] transition-colors"
            aria-label="Open notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D96B27] text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Device Frame Viewport Toggle (Mobile 390px vs Expanded responsive) */}
          <button
            onClick={() => setViewMode(viewMode === 'mobile' ? 'fluid' : 'mobile')}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              viewMode === 'mobile'
                ? 'bg-[#142B4A] text-white border-[#142B4A]'
                : 'bg-white text-slate-700 border-[#142B4A]/15 hover:border-[#168C88]'
            }`}
            title={viewMode === 'mobile' ? 'Switch to Fluid Desktop View' : 'Switch to 390px Mobile Frame'}
          >
            {viewMode === 'mobile' ? (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="text-[11px]">390px Frame</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span className="text-[11px]">Fluid View</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
