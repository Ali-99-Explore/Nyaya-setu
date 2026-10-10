import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_DOCUMENT_ANALYSIS } from '../../data/mockData';
import {
  Upload,
  Camera,
  FileText,
  Sparkles,
  CheckCircle2,
  Calendar,
  Shield,
  BookOpen,
  ArrowRight,
  ListChecks,
  Copy,
  RotateCcw,
  Save,
  Edit3,
  AlertCircle,
  Eye,
  ChevronLeft
} from 'lucide-react';

interface DocumentUnderstandingStudioProps {
  onBack: () => void;
  onConsultLawyer?: () => void;
}

export const DocumentUnderstandingStudio: React.FC<DocumentUnderstandingStudioProps> = ({
  onBack,
  onConsultLawyer
}) => {
  const { currentDocAnalysis, updateDraftResponse, resetDocAnalysis, addToast } = useApp();

  const [inputTab, setInputTab] = useState<'sample' | 'paste' | 'upload'>('sample');
  const [pastedText, setPastedText] = useState(SAMPLE_DOCUMENT_ANALYSIS.originalText);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0); // 0, 1, 2, 3
  const [showPreview, setShowPreview] = useState(true);

  // Draft state
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [draftContent, setDraftContent] = useState(currentDocAnalysis.draftResponse);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStep(1);

    setTimeout(() => {
      setAnalysisStep(2);
      setTimeout(() => {
        setAnalysisStep(3);
        setTimeout(() => {
          setIsAnalyzing(false);
          setAnalysisStep(0);
          addToast('Structured document analysis completed', 'success');
        }, 600);
      }, 700);
    }, 700);
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(draftContent);
    addToast('Draft response copied to clipboard', 'success');
  };

  const handleSaveDraft = () => {
    updateDraftResponse(draftContent);
    setIsEditingDraft(false);
  };

  const handleResetDraft = () => {
    resetDocAnalysis();
    setDraftContent(SAMPLE_DOCUMENT_ANALYSIS.draftResponse);
    setIsEditingDraft(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF8F3] overflow-y-auto">
      {/* Top Header */}
      <div className="p-3.5 bg-white border-b border-slate-200/80 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-[#142B4A]">
              Document Understanding Studio
            </h2>
            <p className="text-[11px] text-slate-500">Legal notice & contract breakdown</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            Simulated Analysis
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* Upload / Source Selection Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
              1. Choose Document Input
            </h3>
            <span className="text-[11px] text-[#168C88] font-medium">
              No private files uploaded to server
            </span>
          </div>

          {/* Segmented input modes */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => {
                setInputTab('sample');
                setPastedText(SAMPLE_DOCUMENT_ANALYSIS.originalText);
              }}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                inputTab === 'sample'
                  ? 'bg-white text-[#142B4A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sample Notice
            </button>
            <button
              onClick={() => setInputTab('paste')}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                inputTab === 'paste'
                  ? 'bg-white text-[#142B4A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Paste Text
            </button>
            <button
              onClick={() => setInputTab('upload')}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                inputTab === 'upload'
                  ? 'bg-white text-[#142B4A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              File / Camera
            </button>
          </div>

          {/* Sample Tab Preview */}
          {inputTab === 'sample' && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#142B4A]">
                  Preloaded: Advocate Eviction Notice (Jubilee Hills)
                </span>
                <span className="text-[10px] text-slate-500">Sec 106 TPA Demand</span>
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-3 font-mono-legal bg-white p-2 rounded border border-slate-200">
                {SAMPLE_DOCUMENT_ANALYSIS.originalText}
              </p>
            </div>
          )}

          {/* Paste Tab */}
          {inputTab === 'paste' && (
            <div>
              <textarea
                rows={4}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste the text of your legal notice, court order, or tenancy clause here..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#168C88] outline-hidden font-mono-legal"
              />
            </div>
          )}

          {/* Upload Tab */}
          {inputTab === 'upload' && (
            <div className="grid grid-cols-2 gap-2">
              <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer text-center">
                <Upload className="w-5 h-5 text-[#168C88] mb-1" />
                <span className="text-xs font-bold text-[#142B4A]">Upload PDF / Image</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Device storage</span>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg"
                  onChange={() => {
                    addToast('Document loaded into local prototype memory', 'info');
                    setInputTab('sample');
                  }}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => {
                  addToast('Camera capture simulated with sample legal notice', 'info');
                  setInputTab('sample');
                }}
                className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-center"
              >
                <Camera className="w-5 h-5 text-[#D96B27] mb-1" />
                <span className="text-xs font-bold text-[#142B4A]">Scan with Camera</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Quick photo capture</span>
              </button>
            </div>
          )}

          {/* Start / Re-run Analysis Button */}
          <button
            onClick={startAnalysis}
            disabled={isAnalyzing}
            className="w-full py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#D96B27]" />
            <span>{isAnalyzing ? 'Running Legal Clause Analysis...' : 'Run Document Analysis'}</span>
          </button>
        </div>

        {/* Animated Progress Indicator */}
        {isAnalyzing && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-bold text-[#142B4A]">
              <span>Analysis Progress</span>
              <span>Step {analysisStep} of 3</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#168C88] h-full transition-all duration-500 rounded-full"
                style={{ width: `${(analysisStep / 3) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-600 italic">
              {analysisStep === 1 && '1. Extracting statutory legal clauses & dispute background...'}
              {analysisStep === 2 && '2. Calculating deadlines & verifying Section 106 TPA compliance...'}
              {analysisStep === 3 && '3. Formulating reciprocal rights & drafting reply notice...'}
            </p>
          </div>
        )}

        {/* STRUCTURED RESULTS CONTAINER */}
        {!isAnalyzing && (
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
                2. Structured Breakdown & Findings
              </h3>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="text-[11px] font-semibold text-[#168C88] flex items-center gap-1 hover:underline"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showPreview ? 'Hide Raw Notice' : 'View Raw Notice'}</span>
              </button>
            </div>

            {/* Toggleable Raw Document Preview */}
            {showPreview && (
              <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-200/80 text-xs">
                <div className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Subject: {currentDocAnalysis.documentType}</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-amber-200/60 max-h-40 overflow-y-auto font-mono-legal text-[11px] text-slate-700 whitespace-pre-line">
                  {currentDocAnalysis.originalText}
                </div>
              </div>
            )}

            {/* A. Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#142B4A]">
                <FileText className="w-4 h-4 text-[#168C88]" />
                <span>Executive Summary</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {currentDocAnalysis.summary}
              </p>
            </div>

            {/* B. Important Dates */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#142B4A]">
                <Calendar className="w-4 h-4 text-[#D96B27]" />
                <span>Statutory & Contractual Deadlines</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {currentDocAnalysis.importantDates.map((d, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {d.label}
                      </span>
                      <div className="text-xs font-bold text-[#142B4A] mt-0.5">{d.date}</div>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-2 leading-tight">
                      {d.significance}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* C. Rights and Obligations */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#142B4A]">
                <Shield className="w-4 h-4 text-[#168C88]" />
                <span>Rights & Obligations Balance Sheet</span>
              </div>
              <div className="space-y-2.5">
                {currentDocAnalysis.rightsAndObligations.map((ro, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs font-bold text-[#142B4A] mb-2">{ro.party}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                        <span className="font-bold text-emerald-900 block mb-1">Entitled Rights:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-emerald-800">
                          {ro.rights.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-2 bg-amber-50 rounded-lg border border-amber-100">
                        <span className="font-bold text-amber-900 block mb-1">Legal Obligations:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-amber-800">
                          {ro.obligations.map((o, i) => (
                            <li key={i}>{o}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* D. Relevant Legal Provisions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#142B4A]">
                <BookOpen className="w-4 h-4 text-[#142B4A]" />
                <span>Applicable Statutory Acts & Sections</span>
              </div>
              <div className="space-y-2">
                {currentDocAnalysis.relevantProvisions.map((prov, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs"
                  >
                    <div className="px-2 py-1 rounded bg-[#142B4A]/10 text-[#142B4A] font-bold text-[10px] shrink-0">
                      {prov.section}
                    </div>
                    <div>
                      <div className="font-bold text-[#142B4A]">{prov.act}</div>
                      <p className="text-[11px] text-slate-600 mt-0.5">{prov.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* E. Suggested Next Steps */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#142B4A]">
                <ArrowRight className="w-4 h-4 text-[#D96B27]" />
                <span>Action Plan & Timeframes</span>
              </div>
              <div className="space-y-2">
                {currentDocAnalysis.suggestedNextSteps.map((st, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">{st.step}</div>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">{st.timeline}</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                        st.priority === 'Immediate'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {st.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* F. Evidence Checklist */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#142B4A]">
                <ListChecks className="w-4 h-4 text-[#168C88]" />
                <span>Defense Evidence Preparation Checklist</span>
              </div>
              <div className="space-y-2 text-xs">
                {currentDocAnalysis.evidenceChecklist.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl border border-slate-200 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#168C88] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#142B4A]">{ev.item}</div>
                      <p className="text-[11px] text-slate-600 mt-0.5">{ev.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* G. EDITABLE DRAFT-GENERATION WORKSPACE */}
            <div className="bg-white rounded-2xl border-2 border-[#168C88]/30 p-4 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#168C88] bg-[#168C88]/10 px-2 py-0.5 rounded">
                    Response Generator
                  </span>
                  <h4 className="text-xs font-bold text-[#142B4A] mt-1">
                    Editable Draft Reply Notice
                  </h4>
                </div>
                {/* Actions: Copy, Edit, Save, Reset */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleCopyDraft}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Copy response"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {isEditingDraft ? (
                    <button
                      onClick={handleSaveDraft}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors"
                    >
                      <Save className="w-3 h-3" />
                      <span>Save</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditingDraft(true)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#142B4A] text-white text-[11px] font-bold hover:bg-[#168C88] transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  )}
                  <button
                    onClick={handleResetDraft}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                    title="Reset to default draft"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Textarea or View */}
              {isEditingDraft ? (
                <textarea
                  rows={10}
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 font-mono-legal text-xs focus:ring-2 focus:ring-[#168C88] outline-hidden"
                />
              ) : (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono-legal text-[11px] text-slate-700 whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto">
                  {draftContent}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                <span>Save locally or forward to advocate</span>
                {onConsultLawyer && (
                  <button
                    onClick={onConsultLawyer}
                    className="font-bold text-[#168C88] hover:underline"
                  >
                    Attach to Lawyer Consultation Request →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
