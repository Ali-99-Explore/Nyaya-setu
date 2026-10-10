import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_LAWYERS, SAMPLE_DOCUMENT_ANALYSIS } from '../../data/mockData';
import { LawyerProfile } from '../../types';
import {
  Search,
  Filter,
  Shield,
  CheckCircle2,
  Calendar,
  Lock,
  FileText,
  MapPin,
  Languages,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  X,
  Phone,
  Video,
  UserCheck
} from 'lucide-react';

interface FindLawyerProps {
  onBack?: () => void;
  onViewConsultations?: () => void;
}

export const FindLawyer: React.FC<FindLawyerProps> = ({
  onBack,
  onViewConsultations
}) => {
  const {
    currentUser,
    submitConsultationRequest,
    currentDocAnalysis,
    addToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Selected lawyer modal
  const [selectedLawyer, setSelectedLawyer] = useState<LawyerProfile | null>(null);

  // Multi-step Consultation Request State
  // Steps: 1: reason & date, 2: documents, 3: consent permissions & approval, 4: confirmation
  const [consultStep, setConsultStep] = useState<number>(1);
  const [meetingReason, setMeetingReason] = useState(
    'Received a 15-day tenancy eviction notice from landlord in Jubilee Hills claiming unpaid maintenance.'
  );
  const [meetingMode, setMeetingMode] = useState<'In-person' | 'Video consultation' | 'Phone call'>('In-person');
  const [preferredDate, setPreferredDate] = useState('2026-10-18 11:00 AM');
  const [attachDocument, setAttachDocument] = useState(true);

  // Privacy Sharing Permissions
  const [shareName, setShareName] = useState(true);
  const [sharePhone, setSharePhone] = useState(true);
  const [shareDoc, setShareDoc] = useState(true);
  const [shareFacts, setShareFacts] = useState(true);
  const [consentApproved, setConsentApproved] = useState(false);

  const practiceAreas = [
    'All',
    'Property & Tenancy',
    'Civil Litigation',
    'Cybercrime & IT Law',
    'Employment Disputes',
    'Criminal Defense',
    'Family Law',
    'Consumer Rights'
  ];

  const locations = [
    'All',
    'High Court Chambers, Hyderabad',
    'HITEC City, Madhapur',
    'Nampally Criminal Courts',
    'City Civil Court, Purani Haveli',
    'Kukatpally & Medchal'
  ];

  const filteredLawyers = MOCK_LAWYERS.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.practiceAreas.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      l.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea =
      selectedPracticeArea === 'All' || l.practiceAreas.includes(selectedPracticeArea);
    const matchesLang =
      selectedLanguage === 'All' || l.languages.includes(selectedLanguage);
    const matchesLoc =
      selectedLocation === 'All' || l.location.includes(selectedLocation);

    return matchesSearch && matchesArea && matchesLang && matchesLoc;
  });

  const handleStartConsultation = (lawyer: LawyerProfile) => {
    setSelectedLawyer(lawyer);
    setConsultStep(1);
    setConsentApproved(false);
  };

  const handleFinalSubmit = () => {
    if (!consentApproved) {
      addToast('Please check the privacy consent agreement to proceed', 'warning');
      return;
    }

    if (!selectedLawyer) return;

    submitConsultationRequest({
      lawyerId: selectedLawyer.id,
      lawyerName: selectedLawyer.name,
      clientName: currentUser.name,
      clientPhone: currentUser.phone,
      reason: meetingReason,
      practiceArea: selectedLawyer.practiceAreas[0] || 'General Law',
      consultationMethod: meetingMode,
      preferredDate,
      sharedItems: {
        name: shareName,
        phone: sharePhone,
        document: attachDocument && shareDoc,
        facts: shareFacts
      },
      consentGranted: true,
      notes: attachDocument ? `Attached: ${currentDocAnalysis.title}` : undefined
    });

    setConsultStep(4);
  };

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
              <h2 className="text-sm font-bold text-[#142B4A]">
                Find a Verified Advocate
              </h2>
              <p className="text-[11px] text-slate-500">
                Bar Council of Telangana empanelled practitioners
              </p>
            </div>
          </div>
          {onViewConsultations && (
            <button
              onClick={onViewConsultations}
              className="text-[11px] font-bold text-[#168C88] hover:underline"
            >
              My Requests
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by advocate name, specialty, court location..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#142B4A] outline-hidden focus:ring-1 focus:ring-[#168C88]"
          />
        </div>

        {/* Horizontal filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {practiceAreas.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedPracticeArea(area)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors shrink-0 ${
                selectedPracticeArea === area
                  ? 'bg-[#142B4A] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Directory List */}
      <div className="p-4 space-y-3.5 max-w-2xl mx-auto w-full">
        {filteredLawyers.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No advocates found matching your filter criteria.
          </div>
        ) : (
          filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3 hover:border-[#168C88] transition-colors"
            >
              {/* Top Row: Name, Bar info, Verified Badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-[#142B4A]">{lawyer.name}</h3>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-[#168C88] bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded">
                      <Shield className="w-3 h-3" />
                      <span>TS Bar Verified</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{lawyer.title}</p>
                  <span className="text-[10px] text-slate-400 font-mono-legal">
                    Reg: {lawyer.barCouncilNo} · {lawyer.experienceYears} Years Bar Practice
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#142B4A] block">
                    {lawyer.feeDisplay.split('(')[0]}
                  </span>
                  <span className="text-[9px] text-slate-400">Direct initial consult</span>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-slate-600 leading-relaxed">{lawyer.bio}</p>

              {/* Practice Areas */}
              <div className="flex flex-wrap gap-1">
                {lawyer.practiceAreas.map((pa, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                  >
                    {pa}
                  </span>
                ))}
              </div>

              {/* Languages & Location */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1 truncate max-w-[60%]">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{lawyer.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lawyer.languages.join(', ')}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleStartConsultation(lawyer)}
                className="w-full py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Request Consultation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* MULTI-STEP CONSULTATION WORKFLOW MODAL */}
      {selectedLawyer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FAF8F3] rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 bg-[#142B4A] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#168C88] bg-white/10 px-2 py-0.5 rounded">
                  Privacy-First Consultation
                </span>
                <h3 className="text-sm font-bold text-white mt-1">
                  Connect with {selectedLawyer.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLawyer(null)}
                className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Bar */}
            {consultStep < 4 && (
              <div className="px-5 py-3 bg-white border-b border-slate-200 flex items-center justify-between text-[11px] font-bold">
                <span className={consultStep === 1 ? 'text-[#168C88]' : 'text-slate-400'}>
                  1. Matter Details
                </span>
                <span>→</span>
                <span className={consultStep === 2 ? 'text-[#168C88]' : 'text-slate-400'}>
                  2. Documents
                </span>
                <span>→</span>
                <span className={consultStep === 3 ? 'text-[#168C88]' : 'text-slate-400'}>
                  3. Explicit Consent
                </span>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              {/* STEP 1: Reason and Meeting mode */}
              {consultStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#142B4A] mb-1">
                      Reason for Legal Consultation
                    </label>
                    <textarea
                      rows={3}
                      value={meetingReason}
                      onChange={(e) => setMeetingReason(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#168C88] outline-hidden"
                      placeholder="Briefly state your dispute or question..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#142B4A] mb-1">
                      Preferred Consultation Mode
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { mode: 'In-person', icon: MapPin },
                        { mode: 'Video consultation', icon: Video },
                        { mode: 'Phone call', icon: Phone }
                      ].map((item) => (
                        <button
                          key={item.mode}
                          type="button"
                          onClick={() => setMeetingMode(item.mode as any)}
                          className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center justify-center text-center gap-1 transition-all ${
                            meetingMode === item.mode
                              ? 'bg-white border-[#168C88] ring-2 ring-[#168C88]/20 shadow-xs font-bold text-[#142B4A]'
                              : 'bg-white/60 border-slate-200 text-slate-600'
                          }`}
                        >
                          <item.icon className="w-4 h-4 text-[#168C88]" />
                          <span className="text-[11px]">{item.mode}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#142B4A] mb-1">
                      Preferred Date & Time Window
                    </label>
                    <input
                      type="text"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                      placeholder="e.g. 2026-10-18 11:00 AM"
                    />
                  </div>

                  <button
                    onClick={() => setConsultStep(2)}
                    className="w-full py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Proceed to Document Selection</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 2: Optional Document Attachment */}
              {consultStep === 2 && (
                <div className="space-y-4">
                  <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#142B4A]">
                        Attach Analyzed Legal Document
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={attachDocument}
                          onChange={(e) => setAttachDocument(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#168C88]"></div>
                      </label>
                    </div>

                    {attachDocument && (
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#168C88] shrink-0" />
                        <div className="min-w-0">
                          <div className="font-bold text-[#142B4A] truncate">
                            {currentDocAnalysis.title}
                          </div>
                          <span className="text-[10px] text-slate-500">
                            {currentDocAnalysis.documentType} · Draft response included
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => setConsultStep(1)}
                      className="px-4 py-2.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-semibold"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setConsultStep(3)}
                      className="flex-1 py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <span>Review Privacy Permissions</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Explicit Privacy Permissions & Consent */}
              {consultStep === 3 && (
                <div className="space-y-4">
                  {/* Privacy Guarantee Box */}
                  <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                      <Lock className="w-4 h-4" />
                      <span>Zero-Exposure Privacy Guarantee</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      Your identity and case notes remain completely private and confidential. Only the specific items selected below will be shared with {selectedLawyer.name}.
                    </p>
                  </div>

                  {/* Selective sharing checkboxes */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-3.5 space-y-2.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Select Data to Share with Advocate:
                    </span>

                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={shareName}
                        onChange={(e) => setShareName(e.target.checked)}
                        className="w-4 h-4 rounded text-[#168C88] focus:ring-[#168C88]"
                      />
                      <span>Client Full Name ({currentUser.name})</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sharePhone}
                        onChange={(e) => setSharePhone(e.target.checked)}
                        className="w-4 h-4 rounded text-[#168C88] focus:ring-[#168C88]"
                      />
                      <span>Contact Mobile Number ({currentUser.phone})</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={shareFacts}
                        onChange={(e) => setShareFacts(e.target.checked)}
                        className="w-4 h-4 rounded text-[#168C88] focus:ring-[#168C88]"
                      />
                      <span>Factual Dispute Description</span>
                    </label>

                    {attachDocument && (
                      <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={shareDoc}
                          onChange={(e) => setShareDoc(e.target.checked)}
                          className="w-4 h-4 rounded text-[#168C88] focus:ring-[#168C88]"
                        />
                        <span>Attached Legal Notice & Draft Reply</span>
                      </label>
                    )}
                  </div>

                  {/* MANDATORY EXPLICIT CONSENT APPROVAL */}
                  <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-300 space-y-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consentApproved}
                        onChange={(e) => setConsentApproved(e.target.checked)}
                        className="w-4 h-4 rounded text-[#D96B27] focus:ring-[#D96B27] mt-0.5"
                      />
                      <span className="text-xs font-semibold text-amber-900 leading-tight">
                        I explicitly consent to share the selected details with {selectedLawyer.name} for the purpose of seeking legal advice under simulated advocate confidentiality.
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => setConsultStep(2)}
                      className="px-4 py-2.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-semibold"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleFinalSubmit}
                      disabled={!consentApproved}
                      className="flex-1 py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] disabled:opacity-40 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Approve & Send Request</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Success Confirmation */}
              {consultStep === 4 && (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-[#142B4A]">
                    Consultation Request Submitted
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Your request has been forwarded to {selectedLawyer.name}. The advocate will review your consented details and schedule the meeting.
                  </p>
                  <div className="p-3 bg-slate-100 rounded-xl text-left text-xs space-y-1">
                    <div className="font-semibold text-slate-700">Status: Pending Advocate Acceptance</div>
                    <div className="text-[11px] text-slate-500">
                      Tracking ID: req_ts_{Date.now().toString().slice(-6)} · Visible in Advocate Portal
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLawyer(null)}
                    className="w-full py-2.5 rounded-xl bg-[#142B4A] text-white text-xs font-bold"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
