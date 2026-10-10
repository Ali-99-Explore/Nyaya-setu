import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Languages,
  ArrowRightLeft,
  Copy,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ChevronLeft
} from 'lucide-react';

interface TranslationStudioProps {
  onBack?: () => void;
}

export const TranslationStudio: React.FC<TranslationStudioProps> = ({ onBack }) => {
  const { addToast } = useApp();

  const [sourceLang, setSourceLang] = useState<'English' | 'Telugu' | 'Hindi'>('English');
  const [targetLang, setTargetLang] = useState<'Telugu' | 'English' | 'Hindi'>('Telugu');

  // Templates
  const templates = [
    {
      id: 'tenancy_reply',
      name: 'Tenancy Notice Rebuttal',
      en: `Under instructions from my client Sri K. Venkat Reddy, tenant of Flat No. 402, Sai Vihar Apartments, Jubilee Hills: All monthly maintenance payments have been transferred directly to the Association. My client holds a valid refundable security deposit of Rs. 1,14,000/- with your client. Any unilateral attempt to dispossess without court decree will invite injunctive proceedings.`,
      te: `నా క్లయింట్ శ్రీ కె. వెంకట్ రెడ్డి, జూబ్లీహిల్స్ సాయి విహార్ అపార్ట్‌మెంట్స్ ఫ్లాట్ నం. 402 అద్దెదారుడు ఇచ్చిన ఆదేశాల మేరకు: ప్రతినెలా నిర్వహణ ఛార్జీలు నేరుగా అసోసియేషన్‌కు చెల్లించబడ్డాయి. నా క్లయింట్‌కు సంబంధించిన రూ. 1,14,000/- సెక్యూరిటీ డిపాజిట్ మీ క్లయింట్ వద్ద ఉంది. చట్టబద్ధమైన కోర్టు ఉత్తర్వులు లేకుండా ఖాళీ చేయించడానికి ప్రయత్నిస్తే సివిల్ కోర్టులో ఇంజంక్షన్ దాఖలు చేయబడుతుంది.`,
      hi: `मेरे मुवक्किल श्री के. वेंकट रेड्डी, निवासी फ्लैट नं. 402, साई विहार अपार्टमेंट, जुबली हिल्स के निर्देशानुसार: सोसायटी रखरखाव शुल्क सीधे एसोसिएशन को दिया गया है। मेरे मुवक्किल की रु. 1,14,000/- की सुरक्षा राशि आपके मुवक्किल के पास जमा है। सक्षम न्यायालय के आदेश के बिना जबरन बेदखल करने पर सिविल न्यायालय में रोक हेतु याचिका दायर की जाएगी।`
    },
    {
      id: 'police_rep',
      name: 'Police Representation (Sec 35 BNSS)',
      en: `To the Station House Officer, Jubilee Hills Police Station: In compliance with Notice dated 06.10.2026 under Section 35 BNSS, I hereby enter appearance. The underlying transaction is purely civil in nature arising from a rental tenancy dispute. I am fully cooperating with the inquiry and submit bank receipts establishing bonafides.`,
      te: `స్టేషన్ హౌస్ ఆఫీసర్, జూబ్లీహిల్స్ పోలీస్ స్టేషన్ వారికి: సెక్షన్ 35 BNSS కింద అందిన నోటీసు ప్రకారం నేను విచారణకు హాజరవుతున్నాను. ఈ వివాదం పూర్తిగా అద్దె ఒప్పందానికి సంబంధించిన సివిల్ వివాదం. నేను దర్యాప్తుకు పూర్తిగా సహకరిస్తున్నాను మరియు నిజాయితీని నిరూపించే బ్యాంక్ రశీదులను సమర్పిస్తున్నాను.`,
      hi: `थाना प्रभारी, जुबली हिल्स पुलिस स्टेशन को: धारा 35 BNSS के नोटिस के अनुपालन में, मैं जांच हेतु उपस्थित हुआ हूँ। यह मामला विशुद्ध रूप से किराएदारी से जुड़ा दीवानी (सिविल) विवाद है। मैं जांच में पूरा सहयोग कर रहा हूँ और सभी बैंक साक्ष्य प्रस्तुत कर रहा हूँ।`
    },
    {
      id: 'consumer_rep',
      name: 'Consumer Grievance Letter',
      en: `To Customer Care Grievance Officer: The inverter purchased vide Invoice #4892 dated 10.08.2026 failed within 15 days. Despite multiple tickets, no replacement was provided, constituting gross deficiency of service under Consumer Protection Act 2019. Please refund Rs. 32,000/- within 7 days.`,
      te: `కస్టమర్ కేర్ గ్రీవెన్స్ ఆఫీసర్ గారికి: తేదీ 10.08.2026 న ఇన్వాయిస్ #4892 ద్వారా కొనుగోలు చేసిన ఇన్వర్టర్ 15 రోజుల్లోనే పాడైపోయింది. పలు ఫిర్యాదులు చేసినా రీప్లేస్‌మెంట్ ఇవ్వలేదు. ఇది వినియోగదారుల రక్షణ చట్టం 2019 ప్రకారం సేవా లోపం. 7 రోజుల్లో రూ. 32,000/- వాపసు చేయవలసిందిగా కోరుతున్నాను.`,
      hi: `उपभोक्ता शिकायत निवारण अधिकारी को: चालान #4892 दिनांक 10.08.2026 द्वारा खरीदा गया इन्वर्टर 15 दिनों में खराब हो गया। बार-बार अनुरोध पर भी प्रतिस्थापन नहीं दिया गया, जो उपभोक्ता संरक्षण अधिनियम 2019 के तहत सेवा में घोर कमी है। 7 दिनों में रु. 32,000/- वापस करें।`
    }
  ];

  const [activeTemplate, setActiveTemplate] = useState(templates[0]);
  const [sourceText, setSourceText] = useState(templates[0].en);

  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang as any);
    setTargetLang(temp as any);
  };

  const getTranslatedText = () => {
    if (targetLang === 'Telugu') {
      return activeTemplate.te;
    } else if (targetLang === 'Hindi') {
      return activeTemplate.hi;
    } else {
      return activeTemplate.en;
    }
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast('Text copied to clipboard', 'success');
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
              Legal Translation Studio
            </h2>
            <p className="text-[11px] text-slate-500">
              English · Telugu (తెలుగు) · Hindi (हिंदी)
            </p>
          </div>
        </div>

        <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
          Example Translations
        </span>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="px-4 py-2 bg-amber-50 border-b border-amber-200/70 text-amber-900 text-[11px] flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-[#D96B27] shrink-0" />
        <span>
          Example demonstration translations. For official High Court or registry filings, certified translations may be required.
        </span>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* Template Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 space-y-2 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Load Standard Telangana Legal Notice Template:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => {
                  setActiveTemplate(tpl);
                  setSourceText(sourceLang === 'English' ? tpl.en : sourceLang === 'Telugu' ? tpl.te : tpl.hi);
                }}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  activeTemplate.id === tpl.id
                    ? 'border-[#168C88] bg-teal-50/50 font-bold text-[#142B4A]'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="truncate">{tpl.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Language Controls Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3 flex items-center justify-between gap-2 shadow-xs">
          <div className="flex-1">
            <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
              Source Language
            </label>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value as any)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#142B4A]"
            >
              <option value="English">English</option>
              <option value="Telugu">Telugu (తెలుగు)</option>
              <option value="Hindi">Hindi (हिंदी)</option>
            </select>
          </div>

          <button
            onClick={swapLanguages}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#142B4A] transition-colors mt-4"
            title="Swap languages"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          <div className="flex-1">
            <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
              Target Language
            </label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value as any)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#142B4A]"
            >
              <option value="Telugu">Telugu (తెలుగు)</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>

        {/* Side-by-Side or Stacked Translation Workspaces */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Source Text Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3.5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#142B4A]">
                Original Text ({sourceLang})
              </span>
              <button
                onClick={() => copyText(sourceText)}
                className="p-1 text-slate-400 hover:text-slate-700"
                title="Copy source text"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <textarea
              rows={8}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 font-mono-legal leading-relaxed outline-hidden"
            />
          </div>

          {/* Translated Text Box */}
          <div className="bg-white rounded-2xl border border-[#168C88]/30 p-3.5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#168C88]">
                Demonstration Translation ({targetLang})
              </span>
              <button
                onClick={() => copyText(getTranslatedText())}
                className="p-1 text-slate-400 hover:text-[#168C88]"
                title="Copy translated text"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-2.5 bg-teal-50/40 rounded-xl border border-teal-100 text-xs text-slate-800 font-mono-legal leading-relaxed min-h-[170px] whitespace-pre-line">
              {getTranslatedText()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
