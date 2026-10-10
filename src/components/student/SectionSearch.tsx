import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  Copy,
  ExternalLink,
  Shield,
  CheckCircle2
} from 'lucide-react';

interface SectionSearchProps {
  onBack?: () => void;
}

interface StatutoryResult {
  id: string;
  section: string;
  act: string;
  title: string;
  plainMeaning: string;
  statutoryText: string;
  landmarkCitation: string;
  telanganaNotes?: string;
  keywords: string[];
}

export const SectionSearch: React.FC<SectionSearchProps> = ({ onBack }) => {
  const { addToast } = useApp();

  const [query, setQuery] = useState('');

  const statutoryDatabase: StatutoryResult[] = [
    {
      id: 'sec_106_tpa',
      section: 'Section 106',
      act: 'Transfer of Property Act, 1882',
      title: 'Duration of Certain Leases in Absence of Written Contract',
      plainMeaning:
        'Governs how and when a tenancy can be terminated if the agreement is silent or expired. For residential or general monthly tenancies, the landlord or tenant must give at least 15 clear days notice expiring with the end of a month of tenancy.',
      statutoryText:
        'In the absence of a contract or local law or usage to the contrary, a lease of immovable property for agricultural or manufacturing purposes shall be deemed to be a lease from year to year, terminable, on the part of either lessor or lessee, by six months’ notice; and a lease of immovable property for any other purpose shall be deemed to be a lease from month to month, terminable, on the part of either lessor or lessee, by fifteen days’ notice.',
      landmarkCitation: 'Anthony v. K.C. Ittoop & Sons (2000) 6 SCC 394',
      telanganaNotes:
        'In Telangana, protected tenancies under the Rent Control Act 1960 supersede general Section 106 TPA rules for buildings within designated municipal limits.',
      keywords: ['106', 'tpa', 'transfer of property', 'notice', 'lease', 'eviction', 'tenancy', 'landlord', 'rent']
    },
    {
      id: 'sec_35_bnss',
      section: 'Section 35',
      act: 'Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023',
      title: 'Notice of Appearance Before Police Officer (formerly Sec 41A CrPC)',
      plainMeaning:
        'Prohibits immediate custodial arrest for criminal offences carrying a punishment of 7 years or less without prior written approval of a magistrate. The investigating police officer must issue a formal Notice of Appearance commanding attendance.',
      statutoryText:
        'The police officer shall, in all cases where the arrest of a person is not required under the provisions of sub-section (1) of section 35, issue a notice directing the person against whom a reasonable complaint has been made, or credible information has been received, to appear before him or at such other place as may be specified.',
      landmarkCitation: 'Arnesh Kumar v. State of Bihar (2014) 8 SCC 273 (binding principle affirmed)',
      telanganaNotes:
        'Telangana High Court strictly enforces departmental proceedings against police officers issuing mechanical notices without investigating records.',
      keywords: ['35', 'bnss', '41a', 'crpc', 'police notice', 'arrest', 'bail', 'summons', 'police', 'fir']
    },
    {
      id: 'sec_138_ni',
      section: 'Section 138',
      act: 'Negotiable Instruments Act, 1881',
      title: 'Dishonour of Cheque for Insufficiency of Funds',
      plainMeaning:
        'Makes issuing a dishonoured cheque a quasi-criminal offence punishable with up to 2 years imprisonment or twice the cheque amount. Requires a formal statutory demand notice to be sent within 30 days of receiving the memo of return from the bank.',
      statutoryText:
        'Where any cheque drawn by a person on an account maintained by him with a banker for payment of any amount of money to another person from out of that account for the discharge, in whole or in part, of any debt or other liability, is returned by the bank unpaid, either because of the amount of money standing to the credit of that account is insufficient...',
      landmarkCitation: 'Dashrath Rupsingh Rathod v. State of Maharashtra (2014) 9 SCC 129',
      telanganaNotes:
        'Metropolitan Magistrate Courts at Nampally and Secunderabad have designated special courts for expeditious cheque bounce disposal under Section 138.',
      keywords: ['138', 'ni act', 'cheque bounce', 'dishonour', 'bank', 'funds', 'debt', 'return memo']
    },
    {
      id: 'sec_2_11_cpa',
      section: 'Section 2(11)',
      act: 'Consumer Protection Act, 2019',
      title: 'Definition of Deficiency in Service',
      plainMeaning:
        'Defines what constitutes deficient service: any shortcoming, imperfection, inadequacy in quality, nature, or manner of performance that is required to be maintained by law or contract.',
      statutoryText:
        '“deficiency” means any fault, imperfection, shortcoming or inadequacy in the quality, nature and manner of performance which is required to be maintained by or under any law for the time being in force or has been undertaken to be performed by a person in pursuance of a contract or otherwise in relation to any service...',
      landmarkCitation: 'Indian Medical Association v. V.P. Shantha (1995) 6 SCC 651',
      telanganaNotes:
        'Widely cited in Hyderabad Consumer Forums for builder delays, medical negligence, and unauthorized online transaction failures.',
      keywords: ['2(11)', 'deficiency', 'consumer protection', 'cpa', 'service', 'defect', 'refund']
    },
    {
      id: 'sec_318_bns',
      section: 'Section 318',
      act: 'Bharatiya Nyaya Sanhita (BNS), 2023',
      title: 'Cheating and Dishonestly Inducing Delivery of Property (formerly Sec 420 IPC)',
      plainMeaning:
        'Covers fraudulent cheating, deceitful inducement, and cyber deception where a person dishonestly induces another to deliver any property or make alterations to valuable securities.',
      statutoryText:
        'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security... shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.',
      landmarkCitation: 'Hridaya Ranjan Prasad Verma v. State of Bihar (2000) 4 SCC 168',
      telanganaNotes:
        'Standard penal provision invoked by Telangana Cyber Crime Police for online UPI investment frauds and phishing.',
      keywords: ['318', 'bns', '420', 'ipc', 'cheating', 'fraud', 'deception', 'cybercrime']
    }
  ];

  const quickPills = [
    { label: 'Section 106 TPA', query: '106' },
    { label: 'Section 35 BNSS', query: '35' },
    { label: 'Section 138 NI Act', query: '138' },
    { label: 'Deficiency in Service', query: 'deficiency' },
    { label: 'Cheating (420 IPC / 318 BNS)', query: '318' }
  ];

  const results = statutoryDatabase.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.section.toLowerCase().includes(q) ||
      item.act.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.plainMeaning.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.includes(q))
    );
  });

  const copySection = (res: StatutoryResult) => {
    navigator.clipboard.writeText(`${res.section} ${res.act}: ${res.title}\n\n${res.statutoryText}`);
    addToast('Statutory text copied to clipboard', 'success');
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
              <h2 className="text-sm font-bold text-[#142B4A]">Statutory Section Search</h2>
              <p className="text-[11px] text-slate-500">
                Statutes, local amendments & plain meanings
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {results.length} Provisions
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type Section number (e.g. 106, 35, 138) or Act name..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#142B4A] outline-hidden focus:ring-1 focus:ring-[#168C88]"
          />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {quickPills.map((p) => (
            <button
              key={p.label}
              onClick={() => setQuery(p.query)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#168C88]/10 hover:text-[#168C88] text-slate-700 text-[11px] font-medium whitespace-nowrap transition-colors shrink-0"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notice Banner */}
      <div className="px-4 py-2 bg-amber-50 border-b border-amber-200/70 text-[11px] text-amber-900">
        <strong>Academic Demonstration Repository:</strong> Provides statutory extracts and plain language interpretations for law school research and moot court preparation.
      </div>

      {/* Results List */}
      <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        {results.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No sections found matching "{query}". Try "106", "35", "138", or "deficiency".
          </div>
        ) : (
          results.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-legal text-xs font-bold text-white bg-[#142B4A] px-2 py-0.5 rounded">
                      {res.section}
                    </span>
                    <span className="text-xs font-bold text-[#168C88]">
                      {res.act}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#142B4A] mt-1.5">
                    {res.title}
                  </h3>
                </div>

                <button
                  onClick={() => copySection(res)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  title="Copy statutory text"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Plain Meaning */}
              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 text-xs text-slate-800 leading-relaxed">
                <span className="font-bold text-[#168C88] block mb-0.5">
                  Plain-Language Concept:
                </span>
                {res.plainMeaning}
              </div>

              {/* Exact Statutory Text */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono-legal text-[11px] text-slate-700 leading-relaxed italic">
                <span className="font-sans font-bold text-slate-500 block not-italic mb-1 text-[10px] uppercase">
                  Bare Act Extract:
                </span>
                "{res.statutoryText}"
              </div>

              {/* Landmark Precedent & Local Notes */}
              <div className="text-[11px] space-y-1 pt-1 border-t border-slate-100">
                <div className="text-slate-600">
                  <strong className="text-slate-700">Landmark Precedent: </strong>
                  <span className="font-mono-legal text-[#D96B27]">{res.landmarkCitation}</span>
                </div>
                {res.telanganaNotes && (
                  <div className="text-slate-600">
                    <strong className="text-slate-700">Telangana Local Context: </strong>
                    <span>{res.telanganaNotes}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
