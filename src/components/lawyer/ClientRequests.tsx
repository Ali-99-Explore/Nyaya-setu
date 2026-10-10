import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ConsultationRequest } from '../../types';
import {
  MessageSquare,
  Lock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Calendar,
  Phone,
  Video,
  MapPin,
  ChevronLeft,
  FileText,
  UserCheck
} from 'lucide-react';

interface ClientRequestsProps {
  onBack?: () => void;
}

export const ClientRequests: React.FC<ClientRequestsProps> = ({ onBack }) => {
  const { consultations, updateConsultationStatus, addToast } = useApp();

  const [activeRequest, setActiveRequest] = useState<ConsultationRequest | null>(null);
  const [responseNotes, setResponseNotes] = useState('');

  const handleAction = (id: string, status: ConsultationRequest['status']) => {
    updateConsultationStatus(id, status, responseNotes);
    setActiveRequest(null);
    setResponseNotes('');
  };

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
            <h2 className="text-sm font-bold text-[#142B4A]">
              Client Consultation Requests
            </h2>
            <p className="text-[11px] text-slate-500">
              Filtered by citizen privacy consent
            </p>
          </div>
        </div>
        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          {consultations.length} Inbound
        </span>
      </div>

      {/* Privacy Enforcement Notice */}
      <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
        <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
        <span>
          <strong>Zero-unauthorized disclosure:</strong> Only fields explicitly checked by the citizen in the consent stage are rendered below.
        </span>
      </div>

      <div className="p-4 space-y-3.5 max-w-2xl mx-auto w-full">
        {consultations.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No incoming consultation requests.
          </div>
        ) : (
          consultations.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3"
            >
              {/* Top status bar */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#142B4A]">
                      {req.sharedItems.name ? req.clientName : 'Citizen (Name Redacted by Consent)'}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        req.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'declined'
                          ? 'bg-rose-100 text-rose-800'
                          : req.status === 'info_requested'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-teal-100 text-[#168C88]'
                      }`}
                    >
                      {req.status.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono-legal">
                    Received: {req.createdAt} · Matter: {req.practiceArea}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-700 flex items-center gap-1 justify-end">
                    {req.consultationMethod === 'In-person' && <MapPin className="w-3.5 h-3.5 text-[#168C88]" />}
                    {req.consultationMethod === 'Video consultation' && <Video className="w-3.5 h-3.5 text-[#168C88]" />}
                    {req.consultationMethod === 'Phone call' && <Phone className="w-3.5 h-3.5 text-[#168C88]" />}
                    <span>{req.consultationMethod}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono-legal">
                    {req.preferredDate}
                  </span>
                </div>
              </div>

              {/* Consented reason */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Client Stated Dispute Reason:
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {req.sharedItems.facts ? req.reason : 'Detailed facts withheld by citizen.'}
                </p>
                {req.notes && req.sharedItems.document && (
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#168C88] pt-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{req.notes}</span>
                  </div>
                )}
              </div>

              {/* Consent Audit Checklist Badge */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                <span className="font-semibold text-slate-600">Consented:</span>
                <span className={req.sharedItems.name ? 'text-emerald-700 font-medium' : 'text-slate-400 line-through'}>
                  Name
                </span>
                <span>·</span>
                <span className={req.sharedItems.phone ? 'text-emerald-700 font-medium' : 'text-slate-400 line-through'}>
                  Phone ({req.sharedItems.phone ? req.clientPhone : 'Hidden'})
                </span>
                <span>·</span>
                <span className={req.sharedItems.document ? 'text-emerald-700 font-medium' : 'text-slate-400 line-through'}>
                  Legal Notice Document
                </span>
                <span>·</span>
                <span className={req.sharedItems.facts ? 'text-emerald-700 font-medium' : 'text-slate-400 line-through'}>
                  Fact Summary
                </span>
              </div>

              {/* Actions */}
              {req.status === 'pending' && (
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleAction(req.id, 'accepted')}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accept & Schedule</span>
                  </button>
                  <button
                    onClick={() => handleAction(req.id, 'info_requested')}
                    className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Request Info</span>
                  </button>
                  <button
                    onClick={() => handleAction(req.id, 'declined')}
                    className="px-3 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-xl text-xs font-bold transition-colors"
                  >
                    Decline
                  </button>
                </div>
              )}

              {req.status !== 'pending' && (
                <div className="p-2 bg-slate-100 rounded-lg text-[11px] text-slate-600">
                  {req.status === 'accepted' && 'Request accepted. Client notified with chamber address.'}
                  {req.status === 'declined' && 'Request declined politely.'}
                  {req.status === 'info_requested' && 'Additional documentary clarity requested from client.'}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
