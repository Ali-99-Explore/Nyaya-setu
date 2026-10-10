import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  BookOpen,
  Search,
  Sparkles,
  FileEdit,
  BookMarked,
  ArrowRight,
  Clock,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

interface StudentDashboardProps {
  onNavigate: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { currentUser, studentNotes, bookmarkedJudgments } = useApp();

  const academicTools = [
    {
      id: 'study-room',
      title: 'Judgment Study Room',
      desc: 'Facts, issues, ratio decidendi & custom exam notes for landmark cases.',
      icon: BookOpen,
      color: 'bg-teal-50 text-[#168C88]',
      badge: 'Case Briefs'
    },
    {
      id: 'section-search',
      title: 'Statutory Section Search',
      desc: 'Instant lookup by section number, act name, or everyday legal query.',
      icon: Search,
      color: 'bg-blue-50 text-[#142B4A]',
      badge: 'BNSS & TPA'
    },
    {
      id: 'moot-court',
      title: 'AI Hearing Preparation',
      desc: 'Interactive moot court simulator: argue propositions and answer judge questions.',
      icon: Sparkles,
      color: 'bg-orange-50 text-[#D96B27]',
      badge: 'Moot Court'
    },
    {
      id: 'notes',
      title: 'My Academic Notes',
      desc: 'Organized law notes with folders, tags, Markdown preview, and autosave.',
      icon: FileEdit,
      color: 'bg-emerald-50 text-emerald-700',
      badge: `${studentNotes.length} Notes`
    },
    {
      id: 'ebooks',
      title: 'E-Book Law Library',
      desc: 'Curated constitutional, civil drafting, and consumer law textbooks.',
      icon: BookMarked,
      color: 'bg-purple-50 text-purple-700',
      badge: '3 Textbooks'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
      {/* Top Academic Banner */}
      <div className="p-4 sm:p-5 bg-[#142B4A] text-white space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <span>Law Scholar Portal</span>
              <span>·</span>
              <span className="text-[#168C88] font-semibold">{currentUser.course || '5-Year B.A. LL.B.'}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              {currentUser.name}
            </h1>
            <p className="text-[11px] text-white/60 mt-0.5">
              {currentUser.college || 'Osmania University College of Law, Hyderabad'} ({currentUser.yearOfStudy || '4th Year'})
            </p>
          </div>

          <div className="p-2 rounded-xl bg-white/10 border border-white/15 text-[#168C88] text-xs font-bold flex items-center gap-1">
            <GraduationCap className="w-4 h-4" />
            <span>Scholar</span>
          </div>
        </div>

        {/* Weekly Academic Stats Strip */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div
            onClick={() => onNavigate('study-room')}
            className="cursor-pointer p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
          >
            <span className="text-[9px] uppercase font-bold text-white/70 block">Judgments Read</span>
            <div className="text-lg font-bold font-mono-legal text-white mt-0.5">
              06 Cases
            </div>
          </div>

          <div
            onClick={() => onNavigate('notes')}
            className="cursor-pointer p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
          >
            <span className="text-[9px] uppercase font-bold text-white/70 block">Revision Notes</span>
            <div className="text-lg font-bold font-mono-legal text-white mt-0.5">
              {studentNotes.length} Files
            </div>
          </div>

          <div
            onClick={() => onNavigate('moot-court')}
            className="cursor-pointer p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
          >
            <span className="text-[9px] uppercase font-bold text-white/70 block">Moot Practice</span>
            <div className="text-lg font-bold font-mono-legal text-[#D96B27] mt-0.5">
              Active Prop
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* Quick Statutory Section Search Bar Banner */}
        <div
          onClick={() => onNavigate('section-search')}
          className="cursor-pointer p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#168C88] transition-all flex items-center justify-between gap-3 group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 text-[#142B4A]">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#142B4A] group-hover:text-[#168C88] transition-colors">
                Instant Section & Act Search
              </h3>
              <p className="text-[11px] text-slate-500">
                Lookup Sec 106 TPA, Sec 35 BNSS, Sec 138 NI Act or keywords
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
        </div>

        {/* Academic Tools Grid */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Academic Research Modules
            </h2>
            <span className="text-[10px] text-slate-400">Curriculum Tools</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {academicTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <div
                  key={tool.id}
                  onClick={() => onNavigate(tool.id)}
                  className="cursor-pointer p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#168C88] hover:shadow-sm transition-all flex flex-col justify-between space-y-2 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-xl ${tool.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {tool.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-[#142B4A] group-hover:text-[#168C88] transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                        {tool.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-[#168C88] border-t border-slate-100">
                    <span>Enter module</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
