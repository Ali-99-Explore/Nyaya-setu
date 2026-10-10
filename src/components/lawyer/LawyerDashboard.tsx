import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Calendar,
  MessageSquare,
  CheckSquare,
  Clock,
  Shield,
  ArrowRight,
  Plus,
  Scale,
  Lock,
  ChevronRight
} from 'lucide-react';

interface LawyerDashboardProps {
  onNavigate: (tab: string) => void;
}

export const LawyerDashboard: React.FC<LawyerDashboardProps> = ({ onNavigate }) => {
  const { currentUser, cases, consultations } = useApp();

  const pendingRequests = consultations.filter((c) => c.status === 'pending');
  const activeCases = cases.filter((c) => c.status === 'Active');

  const upcomingHearings = [
    {
      caseNo: 'WP/18920/2025',
      title: 'M/s Green Farms v. State (Dharani)',
      court: 'High Court Court Hall 4',
      date: '2026-10-18',
      causeListNo: 'Item #12',
      stage: 'Final Arguments'
    },
    {
      caseNo: 'OS/412/2025',
      title: 'Venkat Reddy v. Madhusudhan Rao',
      court: 'City Civil Court Hall 7',
      date: '2026-10-24',
      causeListNo: 'Item #04',
      stage: 'Issues Framing'
    },
    {
      caseNo: 'CC/108/2026',
      title: 'Sharma v. Star Health Insurance',
      court: 'Consumer Forum Bench 1',
      date: '2026-11-04',
      causeListNo: 'Item #19',
      stage: 'Evidence of Complainant'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
      {/* Top Professional Header */}
      <div className="p-4 sm:p-5 bg-[#142B4A] text-white space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <span>Senior Advocate Dashboard</span>
              <span>·</span>
              <span className="text-[#D96B27] font-semibold">High Court of Telangana</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              {currentUser.name}
            </h1>
            <span className="text-[10px] font-mono-legal text-white/60">
              Bar Enrolment: {currentUser.barCouncilNumber || 'TS/1420/2011'} · {currentUser.verifiedStatus === 'verified' ? 'Verified Member' : 'Pending Verification'}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-white/10 border border-white/15 text-[#D96B27] text-xs font-bold flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Advocate</span>
          </div>
        </div>

        {/* 4 Primary Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <div
            onClick={() => onNavigate('cases')}
            className="cursor-pointer p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
          >
            <div className="flex items-center justify-between text-white/70 text-[10px] uppercase font-bold">
              <span>Active Matters</span>
              <Briefcase className="w-3 h-3 text-[#168C88]" />
            </div>
            <div className="text-xl font-bold font-mono-legal text-white mt-1">
              {activeCases.length + 18}
            </div>
            <span className="text-[9px] text-[#168C88] font-medium">+2 this month</span>
          </div>

          <div
            onClick={() => onNavigate('calendar')}
            className="cursor-pointer p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
          >
            <div className="flex items-center justify-between text-white/70 text-[10px] uppercase font-bold">
              <span>Hearings This Week</span>
              <Calendar className="w-3 h-3 text-[#D96B27]" />
            </div>
            <div className="text-xl font-bold font-mono-legal text-white mt-1">
              05
            </div>
            <span className="text-[9px] text-[#D96B27] font-medium">Next on 18th Oct</span>
          </div>

          <div
            onClick={() => onNavigate('requests')}
            className="cursor-pointer p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
          >
            <div className="flex items-center justify-between text-white/70 text-[10px] uppercase font-bold">
              <span>Client Requests</span>
              <MessageSquare className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="text-xl font-bold font-mono-legal text-white mt-1">
              {pendingRequests.length}
            </div>
            <span className="text-[9px] text-emerald-300 font-medium">Consented only</span>
          </div>

          <div
            onClick={() => onNavigate('cases')}
            className="cursor-pointer p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
          >
            <div className="flex items-center justify-between text-white/70 text-[10px] uppercase font-bold">
              <span>Tasks & Filings</span>
              <CheckSquare className="w-3 h-3 text-amber-400" />
            </div>
            <div className="text-xl font-bold font-mono-legal text-white mt-1">
              04
            </div>
            <span className="text-[9px] text-amber-300 font-medium">Counters due</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* Cause List / Upcoming Hearings Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#D96B27]" />
              <span>Upcoming Hearings & Cause List</span>
            </h2>
            <button
              onClick={() => onNavigate('calendar')}
              className="text-[11px] font-bold text-[#168C88] hover:underline"
            >
              Full Calendar →
            </button>
          </div>

          <div className="space-y-2">
            {upcomingHearings.map((h, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-legal font-bold text-[#168C88] bg-teal-50 px-1.5 py-0.5 rounded text-[10px]">
                      {h.caseNo}
                    </span>
                    <span className="font-semibold text-[#142B4A]">{h.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {h.court} · Stage: <span className="font-semibold text-slate-700">{h.stage}</span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-[#D96B27] font-mono-legal">{h.date}</div>
                  <span className="text-[10px] text-slate-500 font-medium">{h.causeListNo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Client Requests Banner */}
        {pendingRequests.length > 0 && (
          <div
            onClick={() => onNavigate('requests')}
            className="cursor-pointer p-3.5 rounded-2xl bg-teal-50 border border-teal-200 shadow-xs flex items-center justify-between gap-3 hover:bg-teal-100/50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#168C88] text-white">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#142B4A]">
                  {pendingRequests.length} New Consultation Request Waiting
                </h3>
                <p className="text-[11px] text-slate-600">
                  From {pendingRequests[0].clientName} regarding {pendingRequests[0].practiceArea}.
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#168C88]" />
          </div>
        )}

        {/* Quick Advocate Tools Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onNavigate('cases')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 text-left hover:border-[#168C88] transition-colors shadow-xs group"
          >
            <div className="p-2 rounded-xl bg-slate-100 text-[#142B4A] w-fit mb-2">
              <Briefcase className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-[#142B4A] group-hover:text-[#168C88]">
              Manage Case Records
            </h4>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Parties, pleadings, orders & diary
            </p>
          </button>

          <button
            onClick={() => onNavigate('judgments')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 text-left hover:border-[#168C88] transition-colors shadow-xs group"
          >
            <div className="p-2 rounded-xl bg-orange-50 text-[#D96B27] w-fit mb-2">
              <Scale className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-[#142B4A] group-hover:text-[#D96B27]">
              Judgment Explorer
            </h4>
            <p className="text-[10px] text-slate-500 mt-0.5">
              High Court & SC precedents
            </p>
          </button>

          <button
            onClick={() => onNavigate('notes')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 text-left hover:border-[#168C88] transition-colors shadow-xs group"
          >
            <div className="p-2 rounded-xl bg-teal-50 text-[#168C88] w-fit mb-2">
              <Lock className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-[#142B4A] group-hover:text-[#168C88]">
              Private Case Vault
            </h4>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Confidential advocate notes
            </p>
          </button>

          <button
            onClick={() => onNavigate('calendar')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 text-left hover:border-[#168C88] transition-colors shadow-xs group"
          >
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700 w-fit mb-2">
              <Calendar className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-[#142B4A] group-hover:text-purple-700">
              Courtroom Calendar
            </h4>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Day, Week & Month cause diary
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
