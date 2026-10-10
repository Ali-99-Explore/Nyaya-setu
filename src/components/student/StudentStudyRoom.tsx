import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_JUDGMENTS } from '../../data/mockData';
import { JudgmentBrief } from '../../types';
import {
  BookOpen,
  Save,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  FileEdit,
  CheckCircle2,
  Scale,
  Sparkles,
  Search
} from 'lucide-react';

interface StudentStudyRoomProps {
  onBack?: () => void;
}

export const StudentStudyRoom: React.FC<StudentStudyRoomProps> = ({ onBack }) => {
  const {
    studySessions,
    updateStudySession,
    bookmarkedJudgments,
    toggleBookmarkJudgment,
    addToast
  } = useApp();

  const [activeJudgment, setActiveJudgment] = useState<JudgmentBrief | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Editable session state
  const [applicableSections, setApplicableSections] = useState('');
  const [observations, setObservations] = useState('');
  const [importantPrinciples, setImportantPrinciples] = useState('');
  const [examNotes, setExamNotes] = useState('');

  const openStudyCase = (j: JudgmentBrief) => {
    setActiveJudgment(j);
    const existing = studySessions[j.id];
    if (existing) {
      setApplicableSections(existing.applicableSections);
      setObservations(existing.observations);
      setImportantPrinciples(existing.importantPrinciples);
      setExamNotes(existing.examNotes);
    } else {
      setApplicableSections(j.legalProvisions.join(', '));
      setObservations('Landmark ruling on statutory boundaries of administrative e-governance portals.');
      setImportantPrinciples('Administrative action must satisfy natural justice principles before depriving property.');
      setExamNotes('Important for Constitutional Law Part III and Administrative Law exams.');
    }
  };

  const handleSaveSession = () => {
    if (!activeJudgment) return;
    updateStudySession(activeJudgment.id, {
      caseTitle: activeJudgment.title,
      applicableSections,
      observations,
      importantPrinciples,
      examNotes
    });
  };

  const filteredJudgments = MOCK_JUDGMENTS.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.citation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (activeJudgment) {
    const isBookmarked = bookmarkedJudgments.includes(activeJudgment.id);

    return (
      <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
        {/* Header */}
        <div className="p-3.5 bg-white border-b border-slate-200 sticky top-0 z-20 flex items-center justify-between">
          <button
            onClick={() => setActiveJudgment(null)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#142B4A] hover:text-[#168C88]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Case Syllabus</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmarkJudgment(activeJudgment.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'border-[#168C88] bg-[#168C88]/10 text-[#168C88]'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={handleSaveSession}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#142B4A] hover:bg-[#168C88] text-white rounded-xl text-xs font-bold transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Autosave Session</span>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 max-w-2xl mx-auto w-full space-y-4">
          {/* Case Banner */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-[10px] font-mono-legal text-slate-500">
              <span className="font-bold text-[#168C88]">{activeJudgment.citation}</span>
              <span>·</span>
              <span>{activeJudgment.date}</span>
            </div>
            <h1 className="text-base font-bold text-[#142B4A]">{activeJudgment.title}</h1>
            <p className="text-xs text-slate-500">
              {activeJudgment.court} · Bench: {activeJudgment.bench}
            </p>
          </div>

          {/* Facts & Issues */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
              1. Facts & Points of Law (Issues)
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-700 block mb-1">Key Facts:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {activeJudgment.facts.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-700 block mb-1">Substantial Issues:</span>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 font-medium">
                  {activeJudgment.issues.map((iss, i) => (
                    <li key={i}>{iss}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Reasoning & Ratio */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5 shadow-xs">
            <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
              2. Ratio Decidendi & Legal Principles
            </h3>
            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-950 font-serif-legal italic leading-relaxed">
              "{activeJudgment.ratioDecidendi}"
            </div>
            <p className="text-xs text-slate-700 font-medium pt-1">
              <strong>Operative Decision:</strong> {activeJudgment.finalOrder}
            </p>
          </div>

          {/* EDITABLE STUDENT OBSERVATIONS & EXAM FIELDS */}
          <div className="bg-white rounded-2xl border-2 border-[#168C88]/30 p-4 space-y-3.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#168C88] uppercase tracking-wider flex items-center gap-1.5">
                <FileEdit className="w-4 h-4" />
                <span>My Academic Study Observations & Notes</span>
              </span>
              <span className="text-[10px] text-slate-400">Autosaved locally</span>
            </div>

            {/* Field 1: Applicable Sections */}
            <div>
              <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                Applicable Statutory Sections & Acts
              </label>
              <input
                type="text"
                value={applicableSections}
                onChange={(e) => setApplicableSections(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono-legal"
                placeholder="e.g. Article 300A, Sec 22-A Registration Act"
              />
            </div>

            {/* Field 2: My Observations */}
            <div>
              <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                My Critical Observations
              </label>
              <textarea
                rows={3}
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                placeholder="Record personal critique, dissenting opinions, or practical Telangana impact..."
              />
            </div>

            {/* Field 3: Important Principles */}
            <div>
              <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                Important Principles & Maxims
              </label>
              <input
                type="text"
                value={importantPrinciples}
                onChange={(e) => setImportantPrinciples(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                placeholder="e.g. Audi alteram partem, Rule of Law"
              />
            </div>

            {/* Field 4: Exam Notes */}
            <div>
              <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                Exam Preparation & Semester Revision Notes
              </label>
              <textarea
                rows={3}
                value={examNotes}
                onChange={(e) => setExamNotes(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono-legal"
                placeholder="Summary points to write in LL.B semester exam answers..."
              />
            </div>

            <button
              onClick={handleSaveSession}
              className="w-full py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Study Session to Local Memory</span>
            </button>
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
              <h2 className="text-sm font-bold text-[#142B4A]">Judgment Study Room</h2>
              <p className="text-[11px] text-slate-500">
                Case study briefs with editable student notes
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {filteredJudgments.length} Landmark Judgments
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search judgments by case name, citation or subject..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#142B4A] outline-hidden focus:ring-1 focus:ring-[#168C88]"
          />
        </div>
      </div>

      {/* Case List */}
      <div className="p-4 space-y-3.5 max-w-2xl mx-auto w-full">
        {filteredJudgments.map((j) => (
          <div
            key={j.id}
            onClick={() => openStudyCase(j)}
            className="cursor-pointer bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:border-[#168C88] transition-all space-y-2.5 group"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono-legal font-bold text-[#168C88] bg-teal-50 px-2 py-0.5 rounded">
                    {j.citation}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono-legal">
                    {j.date}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#142B4A] mt-1 group-hover:text-[#168C88] transition-colors leading-snug">
                  {j.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{j.subject}</p>
              </div>

              <span className="text-[10px] font-bold text-[#168C88] bg-teal-50 px-2 py-0.5 rounded shrink-0">
                Study Case
              </span>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {j.quickBrief}
            </p>

            <div className="flex items-center justify-between pt-1 text-[11px] font-medium text-[#168C88] border-t border-slate-100">
              <span>Open Study Room & Notes Editor</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
