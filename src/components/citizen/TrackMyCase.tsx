import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CaseRecord } from '../../types';
import {
  Briefcase,
  Calendar,
  Clock,
  Plus,
  Bell,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  X,
  FileText,
  MapPin,
  Scale
} from 'lucide-react';

interface TrackMyCaseProps {
  onBack?: () => void;
}

export const TrackMyCase: React.FC<TrackMyCaseProps> = ({ onBack }) => {
  const { cases, addCase, addToast } = useApp();

  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState<Record<string, boolean>>({
    case_1: true
  });

  // Add Case Form State
  const [caseNum, setCaseNum] = useState('');
  const [courtName, setCourtName] = useState('City Civil Court, Hyderabad');
  const [caseTitle, setCaseTitle] = useState('');
  const [petitioner, setPetitioner] = useState('');
  const [respondent, setRespondent] = useState('');
  const [nextDate, setNextDate] = useState('2026-11-15');

  const toggleReminder = (caseId: string, caseNo: string) => {
    setRemindersEnabled((prev) => {
      const active = !prev[caseId];
      addToast(
        active
          ? `Hearing reminder enabled for ${caseNo}`
          : `Reminder disabled for ${caseNo}`,
        'info'
      );
      return { ...prev, [caseId]: active };
    });
  };

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseNum.trim() || !caseTitle.trim()) return;

    addCase({
      caseNumber: caseNum.toUpperCase(),
      title: caseTitle,
      court: courtName,
      judge: 'Hon’ble District & Sessions Judge',
      courtroom: 'Court Hall No. 3',
      petitioner: petitioner || 'Citizen (Self)',
      respondent: respondent || 'Respondent Party',
      stage: 'Appearance & Written Statement',
      nextHearingDate: nextDate,
      status: 'Active',
      timeline: [
        {
          id: 'tl_new_' + Date.now(),
          date: new Date().toISOString().split('T')[0],
          stage: 'Case Tracked in Nyaya Setu',
          business: 'Initial record added to citizen diary. Summons verification pending.',
          nextDate: nextDate
        }
      ],
      documents: [],
      isFictionalDemo: true
    });

    setShowAddModal(false);
    setCaseNum('');
    setCaseTitle('');
  };

  // Detailed Case View Modal
  if (selectedCase) {
    const isRemind = remindersEnabled[selectedCase.id];

    return (
      <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
        {/* Top Header */}
        <div className="p-3.5 bg-white border-b border-slate-200 sticky top-0 z-20 flex items-center justify-between">
          <button
            onClick={() => setSelectedCase(null)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#142B4A] hover:text-[#168C88]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Case Directory</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleReminder(selectedCase.id, selectedCase.caseNumber)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                isRemind
                  ? 'border-[#D96B27] bg-[#D96B27]/10 text-[#D96B27]'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>{isRemind ? 'Reminder On' : 'Set Reminder'}</span>
            </button>
          </div>
        </div>

        {/* Detailed Case Body */}
        <div className="p-4 sm:p-6 max-w-2xl mx-auto w-full space-y-4">
          {/* Fictional Banner */}
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
            <strong>Fictional demonstration case data:</strong> Simulated court registry for Telangana judicial proceedings. Not connected to eCourts live server.
          </div>

          {/* Main Case Info Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono-legal font-bold uppercase tracking-wider text-[#168C88] bg-teal-50 px-2 py-0.5 rounded">
                  {selectedCase.caseNumber}
                </span>
                <h1 className="text-sm sm:text-base font-bold text-[#142B4A] mt-1.5">
                  {selectedCase.title}
                </h1>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                {selectedCase.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px]">Court & Bench:</span>
                <span className="font-semibold text-slate-700">{selectedCase.court}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Presiding Judge:</span>
                <span className="font-semibold text-slate-700">{selectedCase.judge}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Courtroom Number:</span>
                <span className="font-semibold text-slate-700">{selectedCase.courtroom}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Current Stage:</span>
                <span className="font-semibold text-[#D96B27]">{selectedCase.stage}</span>
              </div>
            </div>

            {/* Next Hearing Highlight */}
            <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D96B27]" />
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-800">
                    Next Hearing Date
                  </span>
                  <div className="text-xs font-bold text-[#142B4A]">
                    {selectedCase.nextHearingDate}
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-amber-900 font-medium">
                In Cause List Queue
              </span>
            </div>
          </div>

          {/* Chronological Hearing Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#168C88]" />
              <span>Chronological Hearing Proceedings</span>
            </h3>

            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 pl-7">
              {selectedCase.timeline.map((item, idx) => (
                <div key={item.id || idx} className="relative text-xs">
                  {/* Timeline dot */}
                  <div className="absolute -left-7 top-0.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#168C88]" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#142B4A]">{item.stage}</span>
                    <span className="text-[10px] font-mono-legal text-slate-400">{item.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    {item.business}
                  </p>
                  {item.orderSummary && (
                    <div className="mt-1.5 p-2 bg-slate-50 rounded-lg border border-slate-200 text-[10px] text-slate-700 italic">
                      {item.orderSummary}
                    </div>
                  )}
                  {item.nextDate && (
                    <span className="text-[10px] text-[#168C88] font-semibold mt-1 block">
                      Adjourned to: {item.nextDate}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Case Documents */}
          {selectedCase.documents.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 shadow-xs">
              <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
                Filed Pleadings & Exhibits ({selectedCase.documents.length})
              </h3>
              <div className="space-y-1.5">
                {selectedCase.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#168C88]" />
                      <span className="font-medium text-slate-700">{doc.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono-legal">
                      {doc.size}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
      {/* Top Header */}
      <div className="p-3.5 bg-white border-b border-slate-200 sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onBack && (
            <button onClick={onBack} className="p-1 rounded text-slate-500">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h2 className="text-sm font-bold text-[#142B4A]">Track My Cases</h2>
            <p className="text-[11px] text-slate-500">
              Telangana court proceedings diary
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Case</span>
        </button>
      </div>

      {/* Notice Banner */}
      <div className="px-4 py-2 bg-amber-50 border-b border-amber-200/70 text-[11px] text-amber-900 flex items-center justify-between">
        <span>Fictional sample court records. Realtime court sync simulated.</span>
        <span className="font-bold">{cases.length} Tracked</span>
      </div>

      {/* Cases List */}
      <div className="p-4 space-y-3.5 max-w-2xl mx-auto w-full">
        {cases.map((c) => {
          const isRemind = remindersEnabled[c.id];

          return (
            <div
              key={c.id}
              onClick={() => setSelectedCase(c)}
              className="cursor-pointer bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:border-[#168C88] transition-all space-y-3 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono-legal font-bold uppercase text-[#168C88] bg-teal-50 px-2 py-0.5 rounded">
                      {c.caseNumber}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {c.status}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#142B4A] mt-1 group-hover:text-[#168C88] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{c.court}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleReminder(c.id, c.caseNumber);
                  }}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isRemind
                      ? 'border-[#D96B27] bg-[#D96B27]/10 text-[#D96B27]'
                      : 'border-slate-200 text-slate-400 hover:text-slate-600'
                  }`}
                  title="Toggle hearing reminder"
                >
                  <Bell className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Hearing details snippet */}
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    Next Hearing
                  </span>
                  <div className="font-bold text-[#142B4A]">{c.nextHearingDate}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    Current Stage
                  </span>
                  <div className="font-semibold text-slate-700">{c.stage}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] font-medium text-[#168C88]">
                <span>View Full Timeline & Proceedings ({c.timeline.length} entries)</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD CASE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF8F3] rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-[#142B4A] text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Add Case to Diary</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCase} className="p-5 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                  Case Number (e.g. OS/412/2025)
                </label>
                <input
                  type="text"
                  required
                  placeholder="OS/123/2026 or CC/456/2026"
                  value={caseNum}
                  onChange={(e) => setCaseNum(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                  Court Name
                </label>
                <select
                  value={courtName}
                  onChange={(e) => setCourtName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                >
                  <option value="City Civil Court, Hyderabad">City Civil Court, Hyderabad</option>
                  <option value="High Court for the State of Telangana">High Court for the State of Telangana</option>
                  <option value="District Consumer Disputes Redressal Commission, Hyderabad">District Consumer Commission, Hyderabad</option>
                  <option value="District Court, Medchal-Malkajgiri">District Court, Medchal-Malkajgiri</option>
                  <option value="District Court, Warangal">District Court, Warangal</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                  Case Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sri Ravi Kumar vs M/s Builders"
                  value={caseTitle}
                  onChange={(e) => setCaseTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                    Petitioner Name
                  </label>
                  <input
                    type="text"
                    placeholder="Petitioner"
                    value={petitioner}
                    onChange={(e) => setPetitioner(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                    Next Hearing Date
                  </label>
                  <input
                    type="date"
                    value={nextDate}
                    onChange={(e) => setNextDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold transition-colors mt-2"
              >
                Track Case in Prototype
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
