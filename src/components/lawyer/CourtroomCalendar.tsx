import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Bell,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface CourtroomCalendarProps {
  onBack?: () => void;
}

export const CourtroomCalendar: React.FC<CourtroomCalendarProps> = ({ onBack }) => {
  const { cases, addToast } = useApp();

  const [calendarView, setCalendarView] = useState<'Day' | 'Week' | 'Month'>('Week');
  const [currentDateIndex, setCurrentDateIndex] = useState(0); // 0 = current week
  const [showAddHearingModal, setShowAddHearingModal] = useState(false);

  // Add hearing state
  const [newCaseNumber, setNewCaseNumber] = useState('WP/18920/2025');
  const [newHearingDate, setNewHearingDate] = useState('2026-10-18');
  const [newCourtHall, setNewCourtHall] = useState('Court Hall 4, High Court');
  const [newCauseNumber, setNewCauseNumber] = useState('Item #12');
  const [newPurpose, setNewPurpose] = useState('Final Arguments');

  const daysOfWeek = [
    { day: 'Mon', date: '12 Oct', hearingsCount: 1 },
    { day: 'Tue', date: '13 Oct', hearingsCount: 0 },
    { day: 'Wed', date: '14 Oct', hearingsCount: 2 },
    { day: 'Thu', date: '15 Oct', hearingsCount: 0 },
    { day: 'Fri', date: '16 Oct', hearingsCount: 1 },
    { day: 'Sat', date: '17 Oct', hearingsCount: 0, isWeekend: true },
    { day: 'Sun', date: '18 Oct', hearingsCount: 1, isWeekend: true }
  ];

  const calendarHearings = [
    {
      id: 'h_1',
      time: '10:30 AM',
      caseNo: 'WP/18920/2025',
      title: 'M/s Deccan Green Farms v. State (Dharani Survey)',
      court: 'High Court for the State of Telangana',
      bench: 'Hon’ble Justice C.V. Bhaskar Rao',
      courtroom: 'Court Hall 4',
      itemNo: 'Daily Cause List #12',
      stage: 'Final Arguments',
      reminder: true
    },
    {
      id: 'h_2',
      time: '11:45 AM',
      caseNo: 'OS/412/2025',
      title: 'K. Venkat Reddy v. P. Madhusudhan Rao',
      court: 'City Civil Court, Hyderabad',
      bench: 'Hon’ble V Senior Civil Judge',
      courtroom: 'Court Hall 7, Purani Haveli',
      itemNo: 'Motion List #04',
      stage: 'Written Statement & Issues',
      reminder: true
    },
    {
      id: 'h_3',
      time: '02:15 PM',
      caseNo: 'CC/108/2026',
      title: 'Ananya Sharma v. Star Health Insurance Ltd',
      court: 'District Consumer Disputes Redressal Commission-I',
      bench: 'President & Members, Bench 1',
      courtroom: 'Chandra Vihar Complex, M.J. Road',
      itemNo: 'Evidence List #19',
      stage: 'Evidence of Complainant',
      reminder: false
    }
  ];

  const handleAddHearing = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`Hearing added to cause diary for ${newHearingDate}`, 'success');
    setShowAddHearingModal(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
      {/* Top Bar */}
      <div className="p-3.5 bg-white border-b border-slate-200 sticky top-0 z-20 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack && (
              <button onClick={onBack} className="p-1 rounded text-slate-500">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-sm font-bold text-[#142B4A]">Courtroom Cause Calendar</h2>
              <p className="text-[11px] text-slate-500">Daily cause lists & hearing boards</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddHearingModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Hearing</span>
          </button>
        </div>

        {/* View Switcher & Date Controls */}
        <div className="flex items-center justify-between gap-2">
          {/* Day / Week / Month Segment */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            {(['Day', 'Week', 'Month'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setCalendarView(view)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  calendarView === view
                    ? 'bg-white text-[#142B4A] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentDateIndex((prev) => prev - 1)}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-[#142B4A] px-1 font-mono-legal">
              October 2026
            </span>
            <button
              onClick={() => setCurrentDateIndex((prev) => prev + 1)}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* Horizontal Week Strip */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs">
          <div className="grid grid-cols-7 gap-1 text-center">
            {daysOfWeek.map((d, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                  idx === 6
                    ? 'border-[#D96B27] bg-orange-50/50 font-bold'
                    : d.isWeekend
                    ? 'border-slate-100 bg-slate-50/50 text-slate-400'
                    : 'border-slate-200 bg-white hover:border-[#168C88]'
                }`}
              >
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{d.day}</span>
                <span className="text-xs font-bold text-[#142B4A] mt-0.5">{d.date.split(' ')[0]}</span>
                {d.hearingsCount > 0 ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D96B27] mt-1" />
                ) : (
                  <span className="w-1.5 h-1.5 mt-1" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hearings Cause Board */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-[#D96B27]" />
              <span>Cause Board for Selected Date</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">3 Listed Matters</span>
          </div>

          <div className="space-y-3">
            {calendarHearings.map((h) => (
              <div
                key={h.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 hover:border-[#168C88] transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono-legal text-[10px] font-bold text-[#168C88] bg-teal-50 px-2 py-0.5 rounded">
                        {h.caseNo}
                      </span>
                      <span className="font-mono-legal text-[10px] font-bold text-[#D96B27] bg-orange-50 px-2 py-0.5 rounded">
                        {h.itemNo}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#142B4A] mt-1">
                      {h.title}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold font-mono-legal text-[#142B4A] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{h.time}</span>
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{h.court} · {h.courtroom}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Bench: {h.bench}</p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <span className="text-slate-600">
                    Stage: <strong className="text-[#D96B27]">{h.stage}</strong>
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#168C88]">
                    <Bell className="w-3.5 h-3.5" />
                    <span>Court Master Reminder Set</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ADD HEARING MODAL */}
      {showAddHearingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF8F3] rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-[#142B4A] text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Add Hearing to Cause List</h3>
              <button
                onClick={() => setShowAddHearingModal(false)}
                className="p-1 rounded-full text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddHearing} className="p-5 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                  Case Number
                </label>
                <input
                  type="text"
                  value={newCaseNumber}
                  onChange={(e) => setNewCaseNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                    Hearing Date
                  </label>
                  <input
                    type="date"
                    value={newHearingDate}
                    onChange={(e) => setNewHearingDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                    Cause List Item #
                  </label>
                  <input
                    type="text"
                    value={newCauseNumber}
                    onChange={(e) => setNewCauseNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                  Court Hall & Bench
                </label>
                <input
                  type="text"
                  value={newCourtHall}
                  onChange={(e) => setNewCourtHall(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                  Hearing Purpose / Stage
                </label>
                <input
                  type="text"
                  value={newPurpose}
                  onChange={(e) => setNewPurpose(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold transition-colors mt-2"
              >
                Save Hearing in Diary
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
