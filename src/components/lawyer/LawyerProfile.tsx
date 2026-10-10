import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Briefcase,
  MapPin,
  CheckCircle2,
  Clock,
  RotateCcw,
  LogOut,
  ChevronLeft,
  Upload,
  FileText
} from 'lucide-react';

interface LawyerProfileProps {
  onBack?: () => void;
  onSwitchRole?: () => void;
}

export const LawyerProfile: React.FC<LawyerProfileProps> = ({
  onBack,
  onSwitchRole
}) => {
  const { currentUser, updateCurrentUser, simulatedBarUpload, resetAllDemoData, addToast } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [barNo, setBarNo] = useState(currentUser.barCouncilNumber || 'TS/1420/2011');
  const [district, setDistrict] = useState(currentUser.district || 'Hyderabad');
  const [isEditing, setIsEditing] = useState(false);

  const handleSimulateReupload = () => {
    simulatedBarUpload('Bar_Council_Enrolment_Certificate_2026.pdf');
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
            <h2 className="text-sm font-bold text-[#142B4A]">Advocate Chamber Profile</h2>
            <p className="text-[11px] text-slate-500">Credentials & Bar Council status</p>
          </div>
        </div>

        <button
          onClick={() => {
            if (isEditing) {
              updateCurrentUser({ name, barCouncilNumber: barNo, district });
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
          className="text-xs font-bold text-[#168C88] hover:underline"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#142B4A] text-[#D96B27] flex items-center justify-center font-bold text-base shadow-xs shrink-0">
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
              <p className="text-[11px] text-slate-500 font-mono-legal">
                Reg: {currentUser.barCouncilNumber || 'TS/1420/2011'}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="flex items-center gap-1 text-[10px] font-bold text-[#168C88] bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                  <Shield className="w-3 h-3" />
                  <span>Bar Council of Telangana</span>
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Verified Member
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 block">Chambers:</span>
              <span className="font-semibold text-slate-700">
                High Court Complex, Hyderabad
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Phone / Chamber:</span>
              <span className="font-semibold text-slate-700">{currentUser.phone}</span>
            </div>
          </div>
        </div>

        {/* Verification Status Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#D96B27]" />
              <span>Simulated Bar Council Verification</span>
            </h3>
            <span className="text-[10px] font-mono-legal text-[#168C88] font-bold">
              Active Enrolment
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Advocates empanelled on Nyaya Setu are vetted against official Bar Council registers to guarantee authentic citizen consultations.
          </p>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#168C88]" />
              <span className="font-medium text-slate-700">
                Bar_Council_Enrolment_Certificate_TS.pdf
              </span>
            </div>
            <button
              onClick={handleSimulateReupload}
              className="text-[11px] font-bold text-[#168C88] hover:underline"
            >
              Re-upload Certificate
            </button>
          </div>
        </div>

        {/* Reset & Switch Role Actions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
            Prototype Session Controls
          </h3>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={resetAllDemoData}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Prototype Data</span>
            </button>

            {onSwitchRole && (
              <button
                onClick={onSwitchRole}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Switch Portal Experience</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
