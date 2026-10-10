import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_JUDGMENTS } from '../../data/mockData';
import { JudgmentBrief } from '../../types';
import {
  Scale,
  Search,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  FileText,
  Save,
  Clock,
  Eye,
  CheckCircle2,
  Copy
} from 'lucide-react';

interface JudgmentExplorerProps {
  onBack?: () => void;
}

export const JudgmentExplorer: React.FC<JudgmentExplorerProps> = ({ onBack }) => {
  const { bookmarkedJudgments, toggleBookmarkJudgment, addToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('All Courts');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');

  const [activeJudgment, setActiveJudgment] = useState<JudgmentBrief | null>(null);
  const [readMode, setReadMode] = useState<'brief' | 'detailed'>('brief');
  const [researchNotes, setResearchNotes] = useState<Record<string, string>>({
    judg_1: 'Key precedent for setting aside unilateral Dharani portal prohibition flags. Must cite in WP/18920/2025.'
  });

  const courts = [
    'All Courts',
    'High Court for the State of Telangana',
    'Telangana State Consumer Disputes Redressal Commission'
  ];

  const subjects = [
    'All Subjects',
    'Property Law & Revenue Records',
    'Consumer Protection & Medical Negligence'
  ];

  const filteredJudgments = MOCK_JUDGMENTS.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.citation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.quickBrief.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourt =
      selectedCourt === 'All Courts' || j.court === selectedCourt;
    const matchesSub =
      selectedSubject === 'All Subjects' || j.subject === selectedSubject;

    return matchesSearch && matchesCourt && matchesSub;
  });

  const handleSaveNotes = (id: string, notes: string) => {
    setResearchNotes((prev) => ({ ...prev, [id]: notes }));
    addToast('Advocate research notes saved', 'success');
  };

  // In-app Reader Page
  if (activeJudgment) {
    const isBookmarked = bookmarkedJudgments.includes(activeJudgment.id);
    const currentNotes = researchNotes[activeJudgment.id] || '';

    return (
      <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
        {/* Top Header */}
        <div className="p-3.5 bg-white border-b border-slate-200 sticky top-0 z-20 flex items-center justify-between">
          <button
            onClick={() => setActiveJudgment(null)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#142B4A] hover:text-[#168C88]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Precedents</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Quick Brief vs Detailed Mode Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setReadMode('brief')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors ${
                  readMode === 'brief'
                    ? 'bg-white text-[#142B4A] shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                Quick Brief
              </button>
              <button
                onClick={() => setReadMode('detailed')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors ${
                  readMode === 'detailed'
                    ? 'bg-white text-[#142B4A] shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                Detailed Judgment
              </button>
            </div>

            <button
              onClick={() => toggleBookmarkJudgment(activeJudgment.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'border-[#D96B27] bg-[#D96B27]/10 text-[#D96B27]'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 max-w-2xl mx-auto w-full space-y-4">
          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5 shadow-xs">
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono-legal">
              <span className="font-bold text-[#168C88]">{activeJudgment.citation}</span>
              <span>·</span>
              <span>{activeJudgment.date}</span>
            </div>

            <h1 className="text-base sm:text-lg font-bold text-[#142B4A] leading-snug">
              {activeJudgment.title}
            </h1>

            <div className="text-xs text-slate-600 space-y-0.5 pt-1 border-t border-slate-100">
              <p><strong>Court:</strong> {activeJudgment.court}</p>
              <p><strong>Bench:</strong> {activeJudgment.bench}</p>
              <p><strong>Subject:</strong> {activeJudgment.subject}</p>
            </div>
          </div>

          {/* Quick Case Brief Box */}
          <div className="bg-teal-50/70 rounded-2xl border border-teal-200 p-4 space-y-2 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#168C88] bg-white px-2 py-0.5 rounded">
              Ratio Summary Brief
            </span>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              {activeJudgment.quickBrief}
            </p>
          </div>

          {/* DETAILED JUDGMENT SECTIONS */}
          {readMode === 'detailed' && (
            <div className="space-y-4">
              {/* 1. Facts */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 shadow-xs">
                <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
                  1. Essential Factual Matrix
                </h3>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 leading-relaxed">
                  {activeJudgment.facts.map((fact, idx) => (
                    <li key={idx}>{fact}</li>
                  ))}
                </ul>
              </div>

              {/* 2. Questions of Law / Issues */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 shadow-xs">
                <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
                  2. Points of Determination (Issues)
                </h3>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 leading-relaxed">
                  {activeJudgment.issues.map((issue, idx) => (
                    <li key={idx} className="font-medium text-[#142B4A]">{issue}</li>
                  ))}
                </ol>
              </div>

              {/* 3. Arguments */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
                <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
                  3. Submissions by Learned Counsel
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-[#142B4A] block">Petitioner Submissions:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                      {activeJudgment.argumentsPetitioner.map((arg, idx) => (
                        <li key={idx}>{arg}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-[#142B4A] block">Respondent / State Defense:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                      {activeJudgment.argumentsRespondent.map((arg, idx) => (
                        <li key={idx}>{arg}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4. Ratio Decidendi & Reasoning */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5 shadow-xs">
                <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
                  4. Judicial Reasoning & Ratio Decidendi
                </h3>
                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-slate-800 leading-relaxed font-serif-legal italic">
                  "{activeJudgment.ratioDecidendi}"
                </div>
                {activeJudgment.obiterDicta && (
                  <p className="text-[11px] text-slate-600 pt-1">
                    <strong>Obiter Dicta:</strong> {activeJudgment.obiterDicta}
                  </p>
                )}
              </div>

              {/* 5. Final Order */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 shadow-xs">
                <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider text-emerald-800">
                  5. Operative Directions & Final Order
                </h3>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {activeJudgment.finalOrder}
                </p>
              </div>
            </div>
          )}

          {/* ADVOCATE PERSONAL RESEARCH NOTES */}
          <div className="bg-white rounded-2xl border-2 border-[#168C88]/30 p-4 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
                My Case Research & Drafting Notes
              </span>
              <span className="text-[10px] text-slate-400">Private advocate diary</span>
            </div>

            <textarea
              rows={4}
              value={currentNotes}
              onChange={(e) =>
                setResearchNotes((prev) => ({
                  ...prev,
                  [activeJudgment.id]: e.target.value
                }))
              }
              placeholder="Record your strategy observations, counter arguments or paragraph citations to rely upon..."
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono-legal outline-hidden focus:ring-1 focus:ring-[#168C88]"
            />

            <button
              onClick={() => handleSaveNotes(activeJudgment.id, currentNotes)}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#142B4A] hover:bg-[#168C88] text-white rounded-xl text-xs font-bold transition-colors ml-auto"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Research Notes</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
      {/* Top Header */}
      <div className="p-3.5 bg-white border-b border-slate-200 sticky top-0 z-20 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack && (
              <button onClick={onBack} className="p-1 rounded text-slate-500">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-sm font-bold text-[#142B4A]">Judgment Explorer</h2>
              <p className="text-[11px] text-slate-500">
                High Court of Telangana & Supreme Court case law
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {filteredJudgments.length} Decisions
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by case title, citation (ALD, CPR), or ratio..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#142B4A] outline-hidden focus:ring-1 focus:ring-[#168C88]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCourt}
            onChange={(e) => setSelectedCourt(e.target.value)}
            className="flex-1 p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 truncate"
          >
            {courts.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Precedent Cards */}
      <div className="p-4 space-y-3.5 max-w-2xl mx-auto w-full">
        {filteredJudgments.map((j) => {
          const isBookmarked = bookmarkedJudgments.includes(j.id);

          return (
            <div
              key={j.id}
              onClick={() => setActiveJudgment(j)}
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
                  <p className="text-[11px] text-slate-500 mt-0.5">{j.court}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmarkJudgment(j.id);
                  }}
                  className="p-1 text-slate-400 hover:text-[#D96B27]"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-[#D96B27]" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-medium">
                {j.quickBrief}
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] font-medium text-[#168C88]">
                <span>Read Facts, Issues, Arguments & Orders</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
