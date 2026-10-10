import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Shield,
  Bookmark,
  Bell,
  Languages,
  Sliders,
  RotateCcw,
  CheckCircle2,
  Lock,
  ChevronRight,
  LogOut,
  ChevronLeft,
  FileText
} from 'lucide-react';

interface CitizenProfileProps {
  onBack?: () => void;
  onNavigateToBookmarks?: () => void;
  onSwitchRole?: () => void;
}

export const CitizenProfile: React.FC<CitizenProfileProps> = ({
  onBack,
  onNavigateToBookmarks,
  onSwitchRole
}) => {
  const {
    currentUser,
    updateCurrentUser,
    language,
    setLanguage,
    bookmarkedArticles,
    consultations,
    resetAllDemoData,
    addToast
  } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [district, setDistrict] = useState(currentUser.district || 'Hyderabad');
  const [phone, setPhone] = useState(currentUser.phone);
  const [email, setEmail] = useState(currentUser.email);
  const [isEditing, setIsEditing] = useState(false);

  // Accessibility
  const [fontSize, setFontSize] = useState<'Standard' | 'Large' | 'Extra Large'>('Standard');
  const [highContrast, setHighContrast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({ name, district, phone, email });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
      {/* Header */}
      <div className="p-3.5 bg-white border-b border-slate-200 sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onBack && (
            <button onClick={onBack} className="p-1 rounded text-slate-500">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h2 className="text-sm font-bold text-[#142B4A]">Citizen Profile & Settings</h2>
            <p className="text-[11px] text-slate-500">Account, privacy, and preferences</p>
          </div>
        </div>

        <button
          onClick={() => {
            if (isEditing) {
              updateCurrentUser({ name, district, phone, email });
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
          className="text-xs font-bold text-[#168C88] hover:underline"
        >
          {isEditing ? 'Done' : 'Edit Profile'}
        </button>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* User Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#142B4A] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
              {currentUser.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-[#142B4A] truncate">
                {currentUser.name}
              </h3>
              <p className="text-[11px] text-slate-500">{currentUser.district}, Telangana</p>
              <span className="text-[10px] font-semibold text-[#168C88] bg-teal-50 px-2 py-0.5 rounded">
                Verified Citizen Session · No ID Upload Required
              </span>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-2 pt-2 border-t border-slate-100">
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-semibold">District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-semibold">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-semibold">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 block">Phone:</span>
                <span className="font-semibold text-slate-700">{currentUser.phone}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Email:</span>
                <span className="font-semibold text-slate-700 truncate block">
                  {currentUser.email}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Saved & Consultation Activity Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
            Saved Content & Consultation Status
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Bookmarked Guides</span>
              <div className="text-base font-bold text-[#142B4A] mt-0.5">
                {bookmarkedArticles.length} Articles
              </div>
              <span className="text-[10px] text-[#168C88] font-semibold mt-1 block">
                Saved in library
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Consultations Sent</span>
              <div className="text-base font-bold text-[#142B4A] mt-0.5">
                {consultations.length} Requests
              </div>
              <span className="text-[10px] text-[#D96B27] font-semibold mt-1 block">
                Tracked with privacy
              </span>
            </div>
          </div>
        </div>

        {/* Accessibility & Display Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#142B4A]">
            <Sliders className="w-4 h-4 text-[#168C88]" />
            <span>Accessibility & Visual Readability</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 font-medium">Text Display Size</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                {(['Standard', 'Large', 'Extra Large'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setFontSize(s);
                      addToast(`Display set to ${s}`, 'info');
                    }}
                    className={`px-2 py-1 text-[11px] rounded font-semibold transition-colors ${
                      fontSize === s ? 'bg-white shadow-xs text-[#142B4A]' : 'text-slate-500'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-slate-700 font-medium">High Contrast Mode</span>
              <button
                onClick={() => {
                  setHighContrast(!highContrast);
                  addToast(highContrast ? 'Standard contrast enabled' : 'High contrast active', 'info');
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg border transition-colors ${
                  highContrast
                    ? 'bg-[#142B4A] text-white border-[#142B4A]'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                {highContrast ? 'Enabled' : 'Off'}
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Prototype Reset Actions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#142B4A]">
            <Lock className="w-4 h-4 text-[#D96B27]" />
            <span>Privacy & Local Data</span>
          </div>

          <p className="text-[11px] text-slate-600 leading-relaxed">
            All documents, draft replies, and case notes are strictly stored in local state memory. No personal data is transmitted to external servers.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              onClick={resetAllDemoData}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Prototype Data</span>
            </button>

            {onSwitchRole && (
              <button
                onClick={onSwitchRole}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-semibold transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Switch Portal View</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
