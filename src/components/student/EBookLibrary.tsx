import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_EBOOKS } from '../../data/mockData';
import { EBook } from '../../types';
import {
  BookMarked,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Bookmark,
  Share2
} from 'lucide-react';

interface EBookLibraryProps {
  onBack?: () => void;
}

export const EBookLibrary: React.FC<EBookLibraryProps> = ({ onBack }) => {
  const { addToast } = useApp();

  const [activeBook, setActiveBook] = useState<EBook | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [fontSizePx, setFontSizePx] = useState(14);

  if (activeBook) {
    const chapter = activeBook.sampleChapters[activeChapterIndex] || activeBook.sampleChapters[0];

    return (
      <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
        {/* Reader Top Bar */}
        <div className="p-3.5 bg-white border-b border-slate-200 sticky top-0 z-20 flex items-center justify-between">
          <button
            onClick={() => setActiveBook(null)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#142B4A] hover:text-[#168C88]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Library</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSizePx((prev) => Math.max(12, prev - 1))}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold"
              title="Decrease font size"
            >
              A-
            </button>
            <span className="text-[11px] font-mono-legal text-slate-500">{fontSizePx}px</span>
            <button
              onClick={() => setFontSizePx((prev) => Math.min(20, prev + 1))}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold"
              title="Increase font size"
            >
              A+
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 max-w-2xl mx-auto w-full space-y-4">
          {/* Book Header */}
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-[#168C88] uppercase tracking-wider">
              {activeBook.subject} · Sample Chapter Excerpt
            </span>
            <h1 className="text-base sm:text-lg font-bold text-[#142B4A]">
              {activeBook.title}
            </h1>
            <p className="text-xs text-slate-500">By {activeBook.author}</p>
          </div>

          {/* Chapters Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {activeBook.sampleChapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => setActiveChapterIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeChapterIndex === idx
                    ? 'bg-[#142B4A] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Chapter {ch.chapterNumber}: {ch.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Reading Canvas */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#142B4A] border-b border-slate-100 pb-2">
              {chapter.title}
            </h2>

            <div
              className="font-serif-legal text-slate-800 leading-relaxed space-y-3"
              style={{ fontSize: `${fontSizePx}px` }}
            >
              <p>{chapter.excerpt}</p>
              <p className="text-slate-600 text-[13px] italic pt-2">
                [Academic study excerpt for educational review. Reproduced with permission for curriculum reference.]
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <h2 className="text-sm font-bold text-[#142B4A]">E-Book Law Library</h2>
            <p className="text-[11px] text-slate-500">
              Curated legal textbooks & commentaries
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {MOCK_EBOOKS.map((book) => (
            <div
              key={book.id}
              onClick={() => setActiveBook(book)}
              className="cursor-pointer bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-[#168C88] transition-all flex flex-col justify-between space-y-3 group"
            >
              {/* Simulated Book Spine Cover */}
              <div
                className={`h-36 rounded-xl ${book.coverBg} text-white p-3 flex flex-col justify-between shadow-inner`}
              >
                <span className="text-[9px] uppercase tracking-wider text-white/70 font-semibold">
                  {book.subject}
                </span>
                <h3 className="text-xs font-bold leading-snug line-clamp-3">
                  {book.title}
                </h3>
                <span className="text-[9px] text-white/60 truncate font-mono-legal">
                  {book.totalPages} Pages
                </span>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-slate-600 truncate">
                  {book.author}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                  <span>Status:</span>
                  <span className="font-semibold text-[#168C88]">{book.readingStatus}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-[#168C88] border-t border-slate-100">
                <span>Read Chapter</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
