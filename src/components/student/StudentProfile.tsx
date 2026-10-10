import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  BookOpen,
  FileEdit,
  RotateCcw,
  LogOut,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';

interface StudentProfileProps {
  onBack?: () => void;
  onSwitchRole?: () => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({
  onBack,
  onSwitchRole
}) => {
  const {
    currentUser,
    updateCurrentUser,
    studentNotes,
    studySessions,
    resetAllDemoData,
    addToast
  } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [college, setCollege] = useState(currentUser.college || 'Osmania University College of Law, Hyderabad');
  const [course, setCourse] = useState(currentUser.course || '5-Year B.A. LL.B.');
  const [yearOfStudy, setYearOfStudy] = useState(currentUser.yearOfStudy || '4th Year');
  const [studentId, setStudentId] = useState(currentUser.studentId || 'OU-LAW-2023-088');
  const [isEditing, setIsEditing] = useState(false);

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
            <h2 className="text-sm font-bold text-[#142B4A]">Law Scholar Profile</h2>
            <p className="text-[11px] text-slate-500">Academic affiliation & study logs</p>
          </div>
        </div>

        <button
          onClick={() => {
            if (isEditing) {
              updateCurrentUser({ name, college, course, yearOfStudy, studentId });
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
        {/* User Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#142B4A] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
              <GraduationCap className="w-6 h-6 text-[#168C88]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-[#142B4A] truncate">
                {currentUser.name}
              </h3>
              <p className="text-[11px] text-slate-500">{currentUser.college}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] font-semibold text-[#168C88] bg-teal-50 px-2 py-0.5 rounded">
                  {currentUser.course} · {currentUser.yearOfStudy}
                </span>
                <span className="text-[10px] font-mono-legal text-slate-400">
                  ID: {currentUser.studentId}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 block">Saved Revision Notes:</span>
              <span className="font-bold text-[#142B4A]">{studentNotes.length} Files</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Case Study Sessions:</span>
              <span className="font-bold text-[#142B4A]">
                {Object.keys(studySessions).length} Active Sessions
              </span>
            </div>
          </div>
        </div>

        {/* Prototype Reset Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
            Prototype Preferences & Switch
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
