import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  FileSearch,
  BookOpen,
  UserCheck,
  Briefcase,
  Languages,
  LifeBuoy,
  Bookmark,
  Calendar,
  AlertCircle,
  ArrowRight,
  Shield,
  Clock
} from 'lucide-react';

interface CitizenDashboardProps {
  onNavigate: (view: string) => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({ onNavigate }) => {
  const { currentUser, cases, currentDocAnalysis, bookmarkedArticles } = useApp();

  const nextHearingCase = cases.find((c) => c.status === 'Active');

  const featureCards = [
    {
      id: 'assistant',
      title: 'AI Legal Assistant',
      desc: 'Ask tenant, employment, consumer & notice questions with instant plain-language guidance.',
      icon: Sparkles,
      color: 'bg-teal-50 text-[#168C88]',
      badge: 'Interactive'
    },
    {
      id: 'documents',
      title: 'Understand a Document',
      desc: 'Scan or paste legal notices for structured breakdown, key dates, rights & response drafts.',
      icon: FileSearch,
      color: 'bg-orange-50 text-[#D96B27]',
      badge: 'Sample Preloaded'
    },
    {
      id: 'library',
      title: 'Nyaya Law Library',
      desc: 'Browse rights guides across rental, cybercrime, police inquiries, and legal aid in Telangana.',
      icon: BookOpen,
      color: 'bg-blue-50 text-[#142B4A]',
      badge: '9 Categories'
    },
    {
      id: 'lawyers',
      title: 'Find a Lawyer',
      desc: 'Connect with verified High Court & District Court advocates with privacy-controlled sharing.',
      icon: UserCheck,
      color: 'bg-emerald-50 text-emerald-700',
      badge: 'Consent Workflow'
    },
    {
      id: 'cases',
      title: 'Track My Case',
      desc: 'Monitor court hearing dates, cause lists, orders, and timelines across Telangana courts.',
      icon: Briefcase,
      color: 'bg-purple-50 text-purple-700',
      badge: `${cases.length} Tracked`
    },
    {
      id: 'translate',
      title: 'Translation Studio',
      desc: 'Side-by-side legal translations across English, Telugu (తెలుగు) & Hindi (हिंदी).',
      icon: Languages,
      color: 'bg-cyan-50 text-cyan-800',
      badge: '3 Languages'
    },
    {
      id: 'help',
      title: 'Legal Help & Aid',
      desc: 'Free legal aid schemes (TSSLSA & DLSA), eligibility rules under Section 12, and 24/7 helplines.',
      icon: LifeBuoy,
      color: 'bg-amber-50 text-amber-800',
      badge: 'Sec 12 Aid'
    },
    {
      id: 'library_saved',
      title: 'Saved Documents',
      desc: 'Quick access to your bookmarked legal articles, analysis reports, and drafted notices.',
      icon: Bookmark,
      color: 'bg-slate-100 text-slate-700',
      badge: `${bookmarkedArticles.length} Saved`
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
      {/* Hero Greeting Section */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-white to-[#FAF8F3] border-b border-[#142B4A]/10 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>Namaskaram</span>
              <span>·</span>
              <span className="text-[#168C88] font-bold">{currentUser.district}, Telangana</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-[#142B4A] mt-0.5 tracking-tight">
              {currentUser.name}
            </h1>
          </div>
          <div className="p-2 rounded-xl bg-teal-50 border border-teal-100 text-[#168C88] text-xs font-bold flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Open Access</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed max-w-lg">
          Welcome to your citizen legal portal. Understand your rights, decipher notices, and take informed next steps under Telangana state laws.
        </p>

        {/* Quick Action Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
          <button
            onClick={() => onNavigate('assistant')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold transition-all shadow-xs shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D96B27]" />
            <span>Ask AI Assistant</span>
          </button>
          <button
            onClick={() => onNavigate('documents')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-[#168C88] text-[#142B4A] text-xs font-bold transition-all shadow-xs shrink-0"
          >
            <FileSearch className="w-3.5 h-3.5 text-[#168C88]" />
            <span>Analyze Legal Notice</span>
          </button>
          <button
            onClick={() => onNavigate('lawyers')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-[#168C88] text-[#142B4A] text-xs font-bold transition-all shadow-xs shrink-0"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#142B4A]" />
            <span>Find Advocate</span>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* Recent Activity Alert Card */}
        {nextHearingCase && (
          <div
            onClick={() => onNavigate('cases')}
            className="cursor-pointer p-3.5 rounded-2xl bg-white border border-amber-200/90 shadow-xs hover:border-[#D96B27] transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] uppercase font-bold text-[#D96B27] bg-orange-50 px-2 py-0.5 rounded flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Upcoming Court Hearing</span>
              </span>
              <span className="font-mono-legal text-[11px] font-bold text-slate-700">
                {nextHearingCase.nextHearingDate}
              </span>
            </div>

            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold text-[#142B4A] group-hover:text-[#168C88] transition-colors">
                  {nextHearingCase.caseNumber} — {nextHearingCase.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {nextHearingCase.court} · {nextHearingCase.courtroom}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
            </div>
          </div>
        )}

        {/* Feature Cards Grid */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Legal Tools & Services
            </h2>
            <span className="text-[10px] text-slate-400">8 Services</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {featureCards.map((feat) => {
              const Icon = feat.icon;

              return (
                <div
                  key={feat.id}
                  onClick={() => {
                    if (feat.id === 'library_saved') {
                      onNavigate('library');
                    } else {
                      onNavigate(feat.id);
                    }
                  }}
                  className="cursor-pointer p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#168C88] hover:shadow-sm transition-all flex flex-col justify-between space-y-2 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-xl ${feat.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {feat.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-[#142B4A] group-hover:text-[#168C88] transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                        {feat.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-[#168C88] border-t border-slate-100">
                    <span>Open tool</span>
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
