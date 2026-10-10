import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BridgeLogo } from '../common/BridgeLogo';
import { UserRole } from '../../types';
import { Users, Shield, GraduationCap, ArrowRight, CheckCircle2, Sparkles, Scale, BookOpen } from 'lucide-react';

interface WelcomeScreenProps {
  onDismiss: () => void;
  onOpenRoleSetup: (role: UserRole) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onDismiss,
  onOpenRoleSetup
}) => {
  const { setRole, addToast } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');
  const [loginMethod, setLoginMethod] = useState<'demo' | 'custom'>('demo');
  const [identifier, setIdentifier] = useState('9849012345');

  const handleLaunch = () => {
    setRole(selectedRole);
    addToast(`Welcome to Nyaya Setu! Exploring as ${selectedRole === 'citizen' ? 'Citizen' : selectedRole === 'lawyer' ? 'Advocate' : 'Law Student'}.`, 'success');
    onDismiss();
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-4 sm:p-6 bg-[#FAF8F3] text-[#142B4A]">
      {/* Top Bridge Brand Header */}
      <div className="pt-2 sm:pt-4 text-center flex flex-col items-center">
        {/* Animated Bridge Mark */}
        <div className="relative mb-3 group">
          <div className="absolute inset-0 bg-[#168C88]/15 blur-xl rounded-full transform scale-125" />
          <div className="relative p-3 rounded-2xl bg-white shadow-md border border-[#142B4A]/10">
            <BridgeLogo size="xl" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#168C88]/10 text-[#168C88] text-xs font-bold tracking-wide uppercase mb-2">
          <span>Telangana Legal Access Initiative</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight">
          Nyaya Setu
        </h1>
        <p className="text-xs sm:text-sm font-medium text-[#168C88] mt-1 max-w-sm">
          Understand Your Rights. Know Your Next Step.
        </p>
        <p className="text-[12px] text-slate-600 mt-2 max-w-md leading-relaxed">
          A modern legal empowerment platform connecting citizens, advocates, and law scholars across Hyderabad and Telangana.
        </p>
      </div>

      {/* 3 Selectable Role Cards */}
      <div className="my-5 space-y-3">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-bold uppercase tracking-wider text-slate-500">
            Choose Your Portal
          </span>
          <span className="text-[11px] text-[#168C88] font-semibold">
            Can switch anytime
          </span>
        </div>

        {/* Card 1: Citizen */}
        <div
          onClick={() => setSelectedRole('citizen')}
          className={`cursor-pointer p-3.5 sm:p-4 rounded-2xl border transition-all ${
            selectedRole === 'citizen'
              ? 'bg-white border-[#168C88] ring-2 ring-[#168C88]/20 shadow-md'
              : 'bg-white/70 border-slate-200 hover:bg-white'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-teal-50 text-[#168C88] shrink-0 mt-0.5">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-[#142B4A]">
                  Citizen Portal
                </h3>
                {selectedRole === 'citizen' && (
                  <span className="text-[10px] font-bold text-[#168C88] uppercase bg-[#168C88]/10 px-2 py-0.5 rounded">
                    Selected
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Understand legal notices, explore tenant & consumer rights, track court hearings, and consult legal aid without uploading identity documents.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Lawyer */}
        <div
          onClick={() => setSelectedRole('lawyer')}
          className={`cursor-pointer p-3.5 sm:p-4 rounded-2xl border transition-all ${
            selectedRole === 'lawyer'
              ? 'bg-white border-[#D96B27] ring-2 ring-[#D96B27]/20 shadow-md'
              : 'bg-white/70 border-slate-200 hover:bg-white'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-orange-50 text-[#D96B27] shrink-0 mt-0.5">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-[#142B4A]">
                  Advocate & Lawyer Portal
                </h3>
                {selectedRole === 'lawyer' && (
                  <span className="text-[10px] font-bold text-[#D96B27] uppercase bg-[#D96B27]/10 px-2 py-0.5 rounded">
                    Selected
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Manage court causes, hearings calendar, private client consultation requests with consent filters, and confidential case diary notes.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Law Student */}
        <div
          onClick={() => setSelectedRole('student')}
          className={`cursor-pointer p-3.5 sm:p-4 rounded-2xl border transition-all ${
            selectedRole === 'student'
              ? 'bg-white border-[#142B4A] ring-2 ring-[#142B4A]/20 shadow-md'
              : 'bg-white/70 border-slate-200 hover:bg-white'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-[#142B4A] shrink-0 mt-0.5">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-[#142B4A]">
                  Law Student Portal
                </h3>
                {selectedRole === 'student' && (
                  <span className="text-[10px] font-bold text-[#142B4A] uppercase bg-[#142B4A]/10 px-2 py-0.5 rounded">
                    Selected
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Structured judgment study room, statute section search, case summaries, law e-books, and interactive AI moot court oral argument practice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Quick-Login & Access Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#142B4A]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Interactive Prototype Mode</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium">Local State · No API Keys</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Mobile (+91) or Email address"
            className="flex-1 px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 text-[#142B4A] outline-hidden focus:ring-1 focus:ring-[#168C88]"
          />
          <button
            onClick={handleLaunch}
            className="px-4 py-2 bg-[#142B4A] hover:bg-[#168C88] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <span>Enter App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
          <button
            onClick={() => onOpenRoleSetup(selectedRole)}
            className="text-[#168C88] font-semibold hover:underline"
          >
            Custom Profile & Credentials
          </button>
          <span className="text-slate-400">Zero backend needed</span>
        </div>
      </div>
    </div>
  );
};
