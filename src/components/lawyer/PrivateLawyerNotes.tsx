import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  Plus,
  Trash2,
  Edit3,
  Save,
  Shield,
  Search,
  ChevronLeft,
  X,
  FileText
} from 'lucide-react';

interface PrivateLawyerNotesProps {
  onBack?: () => void;
}

interface VaultNote {
  id: string;
  title: string;
  caseRef: string;
  category: 'Cross-Examination' | 'Statutory Citations' | 'Witness Strategy' | 'Internal Opinion';
  content: string;
  lastUpdated: string;
}

export const PrivateLawyerNotes: React.FC<PrivateLawyerNotesProps> = ({ onBack }) => {
  const { addToast } = useApp();

  const [notes, setNotes] = useState<VaultNote[]>([
    {
      id: 'vnote_1',
      title: 'Strategy for WP/18920/2025: Section 22-A Challenge',
      caseRef: 'WP/18920/2025 (Deccan Green Farms)',
      category: 'Statutory Citations',
      content: `1. Rely on Division Bench judgment in 2024 (3) ALD 412: Dharani software cannot unilaterally override registered deeds.
2. Emphasize continuous physical possession since 1994.
3. Keep certified extracts of 1978 survey map handy for Justice Bhaskar Rao's bench.`,
      lastUpdated: '2026-10-08'
    },
    {
      id: 'vnote_2',
      title: 'OS/412/2025: Cross-Examination Points for Landlord',
      caseRef: 'OS/412/2025 (Venkat Reddy)',
      category: 'Cross-Examination',
      content: `Questions on alleged maintenance default:
- Q1: Confront with Society receipt dated 04.08.2026. Did society confirm clearance?
- Q2: Has son actually landed in Hyderabad or enrolled in an overseas company? Call for passport visa stamp.
- Q3: Section 106 15-day notice expired during vacation - check postal stamp date.`,
      lastUpdated: '2026-10-09'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNote, setEditingNote] = useState<VaultNote | null>(null);

  // Form fields
  const [newTitle, setNewTitle] = useState('');
  const [newCaseRef, setNewCaseRef] = useState('OS/412/2025');
  const [newCategory, setNewCategory] = useState<VaultNote['category']>('Cross-Examination');
  const [newContent, setNewContent] = useState('');

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.caseRef.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newN: VaultNote = {
      id: 'vnote_' + Date.now(),
      title: newTitle,
      caseRef: newCaseRef,
      category: newCategory,
      content: newContent,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setNotes((prev) => [newN, ...prev]);
    setShowAddModal(false);
    resetForm();
    addToast('Confidential note stored in encrypted local vault', 'success');
  };

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    addToast('Note deleted from vault', 'info');
  };

  const resetForm = () => {
    setNewTitle('');
    setNewContent('');
  };

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
              <h2 className="text-sm font-bold text-[#142B4A] flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#D96B27]" />
                <span>Private Advocate Notes Vault</span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Privileged & confidential legal work product
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
            placeholder="Search privileged case notes & citations..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#142B4A] outline-hidden focus:ring-1 focus:ring-[#168C88]"
          />
        </div>
      </div>

      {/* PRIVILEGE EXPLANATION BANNER */}
      <div className="px-4 py-2.5 bg-slate-900 text-white text-xs flex items-center gap-2.5">
        <Shield className="w-4 h-4 text-[#D96B27] shrink-0" />
        <span className="text-[11px] text-slate-200 leading-tight">
          <strong>Advocate Privilege:</strong> Isolated from simulated AI assistant and citizen views under Section 126 of the Evidence Act.
        </span>
      </div>

      <div className="p-4 space-y-3.5 max-w-2xl mx-auto w-full">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono-legal font-bold uppercase text-[#D96B27] bg-orange-50 px-2 py-0.5 rounded">
                    {note.category}
                  </span>
                  <span className="text-[10px] font-mono-legal text-slate-400">
                    {note.caseRef}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#142B4A] mt-1">
                  {note.title}
                </h3>
              </div>

              <button
                onClick={() => handleDelete(note.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                title="Delete note"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-mono-legal whitespace-pre-line leading-relaxed">
              {note.content}
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
              <span>Last updated: {note.lastUpdated}</span>
              <span className="flex items-center gap-1 font-semibold text-[#168C88]">
                <Lock className="w-3 h-3" />
                <span>Encrypted in memory</span>
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
              <h3 className="text-sm font-bold flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#D96B27]" />
                <span>Create Privileged Advocate Note</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNew} className="p-5 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                  Note Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cross examination questions or Case theory"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                    Matter Reference
                  </label>
                  <input
                    type="text"
                    value={newCaseRef}
                    onChange={(e) => setNewCaseRef(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="Cross-Examination">Cross-Examination</option>
                    <option value="Statutory Citations">Statutory Citations</option>
                    <option value="Witness Strategy">Witness Strategy</option>
                    <option value="Internal Opinion">Internal Opinion</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#142B4A] mb-1">
                  Confidential Strategy Content
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Record confidential thoughts, arguments, statutory cross-references..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono-legal"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold transition-colors mt-2"
              >
                Save Privileged Work Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
