import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LAW_LIBRARY_ARTICLES } from '../../data/mockData';
import { LawArticle } from '../../types';
import {
  Search,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  ChevronLeft,
  Share2,
  Clock,
  ArrowRight,
  Shield,
  FileText
} from 'lucide-react';

interface LawLibraryProps {
  onBack?: () => void;
}

export const LawLibrary: React.FC<LawLibraryProps> = ({ onBack }) => {
  const { bookmarkedArticles, toggleBookmarkArticle, addToast } = useApp();

  const categories = [
    'All Categories',
    'Rental and Housing',
    'Consumer Rights',
    'Wages and Employment',
    'Police Matters',
    'Cybercrime',
    'Legal Aid',
    'Family and Personal Matters',
    'Property and Documentation',
    'Women’s Rights'
  ];

  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<LawArticle | null>(null);

  const filteredArticles = LAW_LIBRARY_ARTICLES.filter((art) => {
    const matchesCat =
      selectedCategory === 'All Categories' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleShare = (art: LawArticle) => {
    navigator.clipboard.writeText(`Nyaya Setu Law Guide: ${art.title}`);
    addToast('Article link copied to clipboard', 'info');
  };

  // In-app Reader View
  if (activeArticle) {
    const isBookmarked = bookmarkedArticles.includes(activeArticle.id);

    return (
      <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
        {/* Reader Top Bar */}
        <div className="p-3.5 bg-white border-b border-slate-200 sticky top-0 z-20 flex items-center justify-between">
          <button
            onClick={() => setActiveArticle(null)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#142B4A] hover:text-[#168C88]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Library</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleShare(activeArticle)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              title="Share guide"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleBookmarkArticle(activeArticle.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'border-[#168C88] bg-[#168C88]/10 text-[#168C88]'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Bookmark article"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Reader Body */}
        <div className="p-4 sm:p-6 max-w-2xl mx-auto w-full space-y-5">
          {/* Metadata banner */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-[#168C88]">{activeArticle.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{activeArticle.readingTimeMinutes} min read</span>
              </span>
              <span>·</span>
              <span>Telangana State Scope</span>
            </div>

            <h1 className="text-lg sm:text-xl font-extrabold text-[#142B4A] leading-snug">
              {activeArticle.title}
            </h1>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {activeArticle.summary}
            </p>
          </div>

          {/* Demonstration disclaimer */}
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
            <strong>Demonstration legal content:</strong> For official court filings, verify current statutory notification numbers and High Court practice rules.
          </div>

          {/* 1. Plain-Language Explanation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 shadow-xs">
            <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
              1. Plain-Language Explanation
            </h3>
            <p className="text-xs text-slate-800 leading-relaxed">
              {activeArticle.plainExplanation}
            </p>
          </div>

          {/* 2. Statutory Provisions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
              2. Relevant Statutory Provisions
            </h3>
            <div className="space-y-2">
              {activeArticle.relevantSections.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#142B4A]">{sec.act}</span>
                    <span className="font-mono-legal text-[11px] font-bold text-[#168C88]">
                      {sec.section}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed italic">
                    "{sec.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Practical Example Case */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 shadow-xs">
            <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
              3. Practical Real-World Example
            </h3>
            <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100 text-xs text-slate-800 leading-relaxed">
              {activeArticle.practicalExample}
            </div>
          </div>

          {/* 4. Actionable Next Steps */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 shadow-xs">
            <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
              4. Recommended Next Steps
            </h3>
            <ul className="space-y-2 text-xs">
              {activeArticle.nextSteps.map((st, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <ArrowRight className="w-3.5 h-3.5 text-[#168C88] shrink-0 mt-0.5" />
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Source Reference */}
          <div className="p-3 bg-slate-100 rounded-xl text-[11px] text-slate-600 space-y-0.5">
            <span className="font-bold text-slate-700">Source Citations & Authority:</span>
            <p>{activeArticle.sourceInfo}</p>
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
          <div>
            <h2 className="text-sm font-bold text-[#142B4A]">Nyaya Law Library</h2>
            <p className="text-[11px] text-slate-500">
              Plain-language legal rights in Telangana
            </p>
          </div>
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {filteredArticles.length} guides
          </span>
        </div>

        {/* Search Field */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rights, rental laws, consumer complaints..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#142B4A] outline-hidden focus:ring-1 focus:ring-[#168C88]"
          />
        </div>

        {/* Horizontal Category Pill Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#142B4A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Article List */}
      <div className="p-4 space-y-3 max-w-2xl mx-auto w-full">
        {filteredArticles.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No legal guides found matching "{searchQuery}".
          </div>
        ) : (
          filteredArticles.map((art) => {
            const isBookmarked = bookmarkedArticles.includes(art.id);

            return (
              <div
                key={art.id}
                onClick={() => setActiveArticle(art)}
                className="cursor-pointer bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:border-[#168C88] hover:shadow-sm transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-semibold text-[#168C88]">{art.category}</span>
                    <span>·</span>
                    <span>{art.readingTimeMinutes} min read</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmarkArticle(art.id);
                    }}
                    className="p-1 text-slate-400 hover:text-[#168C88]"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-[#168C88]" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-[#142B4A] group-hover:text-[#168C88] transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>

                <div className="pt-2 flex items-center justify-between text-[11px] font-medium text-[#168C88] border-t border-slate-100">
                  <span>Read full legal guide</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
