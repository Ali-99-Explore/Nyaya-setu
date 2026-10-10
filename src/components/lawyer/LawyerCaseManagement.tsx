import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CaseRecord } from '../../types';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  FileText,
  Lock,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Save,
  Search,
  Filter
} from 'lucide-react';

interface LawyerCaseManagementProps {
  onBack?: () => void;
}

export const LawyerCaseManagement: React.FC<LawyerCaseManagementProps> = ({ onBack }) => {
  const { cases, addCase, updateCase, deleteCase, addToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Form states for Add / Edit
  const [caseNo, setCaseNo] = useState('');
  const [title, setTitle] = useState('');
  const [court, setCourt] = useState('High Court for the State of Telangana');
  const [judge, setJudge] = useState('Hon’ble Justice C.V. Bhaskar Rao');
  const [courtroom, setCourtroom] = useState('Court Hall 4');
  const [petitioner, setPetitioner] = useState('');
  const [respondent, setRespondent] = useState('');
  const [stage, setStage] = useState('Written Statement & Counter');
  const [nextDate, setNextDate] = useState('2026-11-20');
  const [lawyerNotes, setLawyerNotes] = useState('');

  // Editing private note inside detail modal
  const [editingNotes, setEditingNotes] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  const filteredCases = cases.filter(
    (c) =>
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.court.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openEditModal = (c: CaseRecord) => {
    setSelectedCase(c);
    setCaseNo(c.caseNumber);
    setTitle(c.title);
    setCourt(c.court);
    setJudge(c.judge);
    setCourtroom(c.courtroom);
    setPetitioner(c.petitioner);
    setRespondent(c.respondent);
    setStage(c.stage);
    setNextDate(c.nextHearingDate);
    setLawyerNotes(c.lawyerNotes || '');
    setShowEditModal(true);
  };

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseNo.trim() || !title.trim()) return;

    addCase({
      caseNumber: caseNo.toUpperCase(),
      title,
      court,
      judge,
      courtroom,
      petitioner,
      respondent,
      stage,
      nextHearingDate: nextDate,
      status: 'Active',
      timeline: [
        {
          id: 'tl_' + Date.now(),
          date: new Date().toISOString().split('T')[0],
          stage: 'Suit Instituted / Brief Handed Over',
          business: 'Vakalatnama executed by client. Initial pleadings scrutinized.',
          nextDate: nextDate
        }
      ],
      documents: [
        { name: 'Initial_Brief.pdf', date: new Date().toISOString().split('T')[0], size: '1.2 MB' }
      ],
      lawyerNotes,
      isFictionalDemo: true
    });

    setShowAddModal(false);
    resetForm();
  };

  const handleUpdateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase) return;

    const updated: CaseRecord = {
      ...selectedCase,
      caseNumber: caseNo.toUpperCase(),
      title,
      court,
      judge,
      courtroom,
      petitioner,
      respondent,
      stage,
      nextHearingDate: nextDate,
      lawyerNotes
    };

    updateCase(updated);
    setSelectedCase(updated);
    setShowEditModal(false);
  };

  const handleDeleteCase = (id: string) => {
    if (confirm('Are you sure you want to delete this case record from your diary?')) {
      deleteCase(id);
      setSelectedCase(null);
    }
  };

  const resetForm = () => {
    setCaseNo('');
    setTitle('');
    setPetitioner('');
    setRespondent('');
    setLawyerNotes('');
  };

  // Detailed View
  if (selectedCase && !showEditModal) {
    return (
      <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
        {/* Header */}
        <div className="p-3.5 bg-white border-b border-slate-200 sticky top-0 z-20 flex items-center justify-between">
          <button
            onClick={() => setSelectedCase(null)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#142B4A] hover:text-[#168C88]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Case Portfolio</span>
          </button>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => openEditModal(selectedCase)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => handleDeleteCase(selectedCase.id)}
              className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold"
              title="Delete case record"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 max-w-2xl mx-auto w-full space-y-4">
          {/* Main Title Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono-legal font-bold uppercase text-[#168C88] bg-teal-50 px-2 py-0.5 rounded">
                  {selectedCase.caseNumber}
                </span>
                <h1 className="text-sm sm:text-base font-bold text-[#142B4A] mt-1.5">
                  {selectedCase.title}
                </h1>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {selectedCase.status}
              </span>
            </div>

            {/* Parties info */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Petitioner: </span>
                <span className="font-semibold text-slate-800">{selectedCase.petitioner}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Respondent: </span>
                <span className="font-semibold text-slate-800">{selectedCase.respondent}</span>
              </div>
            </div>

            {/* Bench details */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div>
                <span className="text-slate-400 block text-[10px]">Court:</span>
                <span className="font-medium text-slate-700">{selectedCase.court}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Bench / Judge:</span>
                <span className="font-medium text-slate-700">{selectedCase.judge}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Courtroom:</span>
                <span className="font-medium text-slate-700">{selectedCase.courtroom}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Current Stage:</span>
                <span className="font-bold text-[#D96B27]">{selectedCase.stage}</span>
              </div>
            </div>
          </div>

          {/* Confidential Private Lawyer Notes */}
          <div className="bg-white rounded-2xl border-2 border-[#142B4A]/20 p-4 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#142B4A]">
                <Lock className="w-4 h-4 text-[#D96B27]" />
                <span>Privileged & Confidential Work Product</span>
              </div>
              {editingNotes ? (
                <button
                  onClick={() => {
                    const updated = { ...selectedCase, lawyerNotes: noteContent };
                    updateCase(updated);
                    setSelectedCase(updated);
                    setEditingNotes(false);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold"
                >
                  <Save className="w-3 h-3" />
                  <span>Save</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setNoteContent(selectedCase.lawyerNotes || '');
                    setEditingNotes(true);
                  }}
                  className="text-[11px] font-bold text-[#168C88] hover:underline"
                >
                  Edit Notes
                </button>
              )}
            </div>

            <p className="text-[10px] text-slate-400 italic">
              Strict advocate-client privilege. Never shared with counterparties or public.
            </p>

            {editingNotes ? (
              <textarea
                rows={4}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-mono-legal"
              />
            ) : (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-mono-legal whitespace-pre-line">
                {selectedCase.lawyerNotes || 'No private case strategy notes entered yet. Tap Edit Notes to add citations & strategy.'}
              </div>
            )}
          </div>

          {/* Hearing History Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#168C88]" />
              <span>Hearing History & Cause Entries</span>
            </h3>

            <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 pl-7">
              {selectedCase.timeline.map((item, idx) => (
                <div key={idx} className="relative text-xs">
                  <div className="absolute -left-7 top-0.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#168C88]" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#142B4A]">{item.stage}</span>
                    <span className="text-[10px] font-mono-legal text-slate-400">{item.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{item.business}</p>
                  {item.orderSummary && (
                    <div className="mt-1 p-2 bg-slate-50 rounded border border-slate-200 text-[10px] text-slate-700 italic">
                      {item.orderSummary}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
      {/* Header */}
      <div className="p-3.5 bg-white border-b border-slate-200 sticky top-0 z-20 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack && (
              <button onClick={onBack} className="p-1 rounded text-slate-500">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-sm font-bold text-[#142B4A]">Case Management</h2>
              <p className="text-[11px] text-slate-500">
                Active litigation brief & courtroom records
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Brief</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by case number, client, or court..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#142B4A] outline-hidden focus:ring-1 focus:ring-[#168C88]"
          />
        </div>
      </div>

      {/* Cases List */}
      <div className="p-4 space-y-3.5 max-w-2xl mx-auto w-full">
        {filteredCases.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedCase(c)}
            className="cursor-pointer bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:border-[#168C88] transition-all space-y-2.5 group"
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

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Next Hearing
                </span>
                <span className="text-xs font-bold text-[#D96B27] font-mono-legal">
                  {c.nextHearingDate}
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs flex items-center justify-between text-slate-600">
              <span className="truncate">Stage: <strong>{c.stage}</strong></span>
              <span className="text-[10px] text-slate-400 shrink-0 font-mono-legal">
                {c.courtroom}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] font-medium text-[#168C88]">
              <span>View pleadings, timeline & confidential notes</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT MODAL */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FAF8F3] rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden my-auto">
            <div className="p-4 bg-[#142B4A] text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">
                {showAddModal ? 'Create New Case Record' : 'Edit Case Record'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                }}
                className="p-1 rounded-full text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={showAddModal ? handleCreateCase : handleUpdateCase}
              className="p-5 space-y-3"
            >
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                    Case Number
                  </label>
                  <input
                    type="text"
                    required
                    value={caseNo}
                    onChange={(e) => setCaseNo(e.target.value)}
                    placeholder="e.g. WP/1234/2026"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                    Courtroom / Bench
                  </label>
                  <input
                    type="text"
                    value={courtroom}
                    onChange={(e) => setCourtroom(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                  Case Cause Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Petitioner vs Respondent"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                    Petitioner
                  </label>
                  <input
                    type="text"
                    value={petitioner}
                    onChange={(e) => setPetitioner(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                    Respondent
                  </label>
                  <input
                    type="text"
                    value={respondent}
                    onChange={(e) => setRespondent(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                    Current Proceeding Stage
                  </label>
                  <input
                    type="text"
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
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

              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#D96B27]" />
                  <span>Confidential Advocate Strategy Notes</span>
                </label>
                <textarea
                  rows={3}
                  value={lawyerNotes}
                  onChange={(e) => setLawyerNotes(e.target.value)}
                  placeholder="Private citations, cross-examination points..."
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono-legal"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold transition-colors mt-2"
              >
                {showAddModal ? 'Save Case to Portfolio' : 'Update Record'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
