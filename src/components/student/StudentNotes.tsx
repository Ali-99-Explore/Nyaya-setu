import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentNote } from '../../types';
import {
  FileEdit,
  Plus,
  Trash2,
  Folder,
  Tag,
  Search,
  ChevronLeft,
  Save,
  CheckCircle2,
  X,
  FileText
} from 'lucide-react';

interface StudentNotesProps {
  onBack?: () => void;
}

export const StudentNotes: React.FC<StudentNotesProps> = ({ onBack }) => {
  const { studentNotes, addStudentNote, updateStudentNote, deleteStudentNote, addToast } = useApp();

  const folders = ['All Folders', 'Criminal Procedure', 'Property Law', 'Constitutional Law', 'Contract Law'];

  const [selectedFolder, setSelectedFolder] = useState('All Folders');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNote, setActiveNote] = useState<StudentNote | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [folder, setFolder] = useState('Criminal Procedure');
  const [tagInput, setTagInput] = useState('');
  const [content, setContent] = useState('');

  const filteredNotes = studentNotes.filter((n) => {
    const matchesFolder = selectedFolder === 'All Folders' || n.folder === selectedFolder;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFolder && matchesSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addStudentNote({
      title,
      folder,
      tags: tags.length ? tags : ['Notes'],
      content
    });

    setShowAddModal(false);
    resetForm();
  };

  const handleUpdate = () => {
    if (!activeNote) return;
    updateStudentNote(activeNote);
    setIsEditing(false);
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setTagInput('');
  };

  // Note Detail & Edit Screen
  if (activeNote) {
    return (
      <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
        {/* Top Bar */}
        <div className="p-3.5 bg-white border-b border-slate-200 sticky top-0 z-20 flex items-center justify-between">
          <button
            onClick={() => {
              setActiveNote(null);
              setIsEditing(false);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#142B4A] hover:text-[#168C88]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>All Notes</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Autosaved</span>
            </span>

            {isEditing ? (
              <button
                onClick={handleUpdate}
                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                <Save className="w-3 h-3" />
                <span>Save</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#142B4A] hover:bg-[#168C88] text-white rounded-xl text-xs font-bold transition-colors"
              >
                <FileEdit className="w-3 h-3" />
                <span>Edit</span>
              </button>
            )}

            <button
              onClick={() => {
                deleteStudentNote(activeNote.id);
                setActiveNote(null);
              }}
              className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
              title="Delete note"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 max-w-2xl mx-auto w-full space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-[#168C88]">{activeNote.folder}</span>
              <span>·</span>
              <span className="font-mono-legal text-[10px]">{activeNote.lastModified}</span>
            </div>

            {isEditing ? (
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => setActiveNote({ ...activeNote, title: e.target.value })}
                className="w-full text-base font-bold text-[#142B4A] border-b border-slate-200 pb-1 outline-hidden"
              />
            ) : (
              <h1 className="text-base sm:text-lg font-bold text-[#142B4A]">
                {activeNote.title}
              </h1>
            )}

            <div className="flex flex-wrap gap-1 pt-1">
              {activeNote.tags.map((t, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono-legal"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Body Content */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            {isEditing ? (
              <textarea
                rows={14}
                value={activeNote.content}
                onChange={(e) => setActiveNote({ ...activeNote, content: e.target.value })}
                className="w-full p-2.5 font-mono-legal text-xs border border-slate-200 rounded-xl outline-hidden focus:ring-1 focus:ring-[#168C88]"
              />
            ) : (
              <div className="text-xs text-slate-800 leading-relaxed font-mono-legal whitespace-pre-line">
                {activeNote.content}
              </div>
            )}
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
              <h2 className="text-sm font-bold text-[#142B4A]">Academic Revision Notes</h2>
              <p className="text-[11px] text-slate-500">
                Law school syllabus notes with autosave
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
            <span>New Note</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by title, tag, or content..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#142B4A] outline-hidden focus:ring-1 focus:ring-[#168C88]"
          />
        </div>

        {/* Folder filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFolder(f)}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors shrink-0 ${
                selectedFolder === f
                  ? 'bg-[#142B4A] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Notes List */}
      <div className="p-4 space-y-3 max-w-2xl mx-auto w-full">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            onClick={() => {
              setActiveNote(note);
              setIsEditing(false);
            }}
            className="cursor-pointer bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:border-[#168C88] transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-[#168C88]">{note.folder}</span>
              <span className="font-mono-legal text-[10px]">{note.lastModified}</span>
            </div>

            <h3 className="text-xs sm:text-sm font-bold text-[#142B4A] group-hover:text-[#168C88] transition-colors">
              {note.title}
            </h3>

            <p className="text-[11px] text-slate-600 line-clamp-2 font-mono-legal leading-relaxed">
              {note.content.replace(/#/g, '')}
            </p>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <div className="flex flex-wrap gap-1">
                {note.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Autosaved</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ADD NOTE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF8F3] rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-[#142B4A] text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Create Academic Study Note</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                  Note Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Landmark Cases on Article 21"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                    Folder / Subject
                  </label>
                  <select
                    value={folder}
                    onChange={(e) => setFolder(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="Criminal Procedure">Criminal Procedure</option>
                    <option value="Property Law">Property Law</option>
                    <option value="Constitutional Law">Constitutional Law</option>
                    <option value="Contract Law">Contract Law</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BNSS, Sem 5, Bail"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                  Note Content (Markdown supported)
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Record summary points, statutory ingredients, case citations..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono-legal"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold transition-colors mt-2"
              >
                Save Note to Notebook
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
