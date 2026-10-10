import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LifeBuoy,
  PhoneCall,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MapPin,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';

interface LegalHelpCentreProps {
  onBack?: () => void;
  onNavigateToLawyers?: () => void;
}

export const LegalHelpCentre: React.FC<LegalHelpCentreProps> = ({
  onBack,
  onNavigateToLawyers
}) => {
  const { addToast } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const emergencyHelplines = [
    {
      title: 'National Legal Aid Helpline',
      number: '15100',
      description: 'Toll-free 24/7 legal aid assistance by National Legal Services Authority (NALSA) & TSSLSA.',
      type: 'Toll Free'
    },
    {
      title: 'Cyber Financial Fraud Golden Hour',
      number: '1930',
      description: 'Dial within 2 hours of online transaction fraud to freeze beneficiary accounts.',
      type: 'Immediate Emergency'
    },
    {
      title: 'Women Helpline (Telangana)',
      number: '181 / 1091',
      description: 'Assistance for women facing domestic violence, harassment, or distress.',
      type: '24/7 Helpline'
    },
    {
      title: 'Elder Helpline (Senior Citizens)',
      number: '14567',
      description: 'Maintenance and welfare grievances under Senior Citizens Act.',
      type: 'Support'
    }
  ];

  const faqs = [
    {
      q: 'Am I eligible for completely free legal aid in Telangana?',
      a: 'Yes, under Section 12 of the Legal Services Authorities Act, 1987, the following persons are entitled to free legal aid irrespective of financial means: (1) Women and children, (2) Members of Scheduled Castes and Scheduled Tribes, (3) Industrial workmen, (4) Victims of human trafficking or mass disasters, (5) Persons in police custody or prison, and (6) General citizens having annual income below ₹3,00,000 in Telangana.'
    },
    {
      q: 'Do I need a lawyer to respond to a legal notice?',
      a: 'While you can legally send a response yourself, consulting an advocate ensures that inadvertent factual concessions are not made. The reply sets the legal foundation for any future civil or criminal trial.'
    },
    {
      q: 'Can a landlord cut off electricity or water to force me out?',
      a: 'No. Under Section 14 of the Telangana Buildings (Lease, Rent and Eviction) Control Act, cutting off essential amenities like water and electricity is an offence punishable with fine and summary restoration orders from the Rent Controller.'
    },
    {
      q: 'What is the fee to file a case in the Consumer Forum?',
      a: 'For claims up to ₹5,00,000 (5 Lakhs), there is ZERO court fee! For higher amounts up to ₹10 Lakhs, the nominal fee is only ₹200 to ₹400, payable via demand draft or online portal.'
    }
  ];

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
            <h2 className="text-sm font-bold text-[#142B4A]">Legal Help Centre</h2>
            <p className="text-[11px] text-slate-500">
              Telangana State Legal Services Authority (TSSLSA) & Aid
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* Reassuring Guidance Banner */}
        <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-[#168C88] text-xs">
            <LifeBuoy className="w-4 h-4" />
            <span>Justice Is Accessible to All Citizens</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            No citizen in Telangana should be denied justice due to lack of financial resources. The State Legal Services Authority and District Courts provide court-appointed advocates and waivers on court fees for eligible individuals.
          </p>
        </div>

        {/* Free Legal Aid Eligibility Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#168C88]" />
              <span>Section 12 Legal Aid Eligibility Criteria</span>
            </h3>
            <span className="text-[10px] font-semibold text-[#168C88] bg-teal-50 px-2 py-0.5 rounded">
              LSA Act 1987
            </span>
          </div>

          <p className="text-xs text-slate-600">
            You qualify for free court representation and exemption from judicial stamp duty if you belong to any of these categories:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {[
              'All Women and Children',
              'Members of SC / ST Communities',
              'Factory and Industrial Laborers',
              'Victims of Trafficking or Domestic Abuse',
              'Persons in Custody or Detention',
              'Annual Household Income < ₹3,00,000'
            ].map((crit, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-[11px] font-medium text-slate-700">{crit}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-100 rounded-xl text-xs space-y-1">
            <span className="font-bold text-[#142B4A] block">
              Where to Apply in Hyderabad:
            </span>
            <div className="text-[11px] text-slate-600 space-y-0.5">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>District Legal Services Authority (DLSA), City Civil Court Complex, Purani Haveli, Hyderabad.</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>High Court Legal Services Committee, High Court Buildings, Hyderabad - 500066.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Urgent Emergency Helplines */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
          <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-[#D96B27]" />
            <span>Statutory Helplines (Telangana & National)</span>
          </h3>

          <div className="space-y-2">
            {emergencyHelplines.map((hl, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-slate-200 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#142B4A]">{hl.title}</span>
                    <span className="text-[10px] font-semibold text-[#D96B27] bg-orange-50 px-1.5 py-0.2 rounded">
                      {hl.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{hl.description}</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(hl.number);
                    addToast(`Helpline ${hl.number} copied`, 'info');
                  }}
                  className="px-2.5 py-1.5 bg-[#142B4A] text-white rounded-lg font-mono-legal text-xs font-bold shrink-0 hover:bg-[#168C88] transition-colors"
                >
                  {hl.number}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
          <h3 className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
            Frequently Asked Legal Questions
          </h3>

          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-3 text-left font-semibold text-xs text-[#142B4A] flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-3 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
