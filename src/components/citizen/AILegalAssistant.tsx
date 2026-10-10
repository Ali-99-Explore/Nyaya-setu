import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AI_SAMPLE_RESPONSES } from '../../data/mockData';
import { ChatMessage, StructuredLegalResponse } from '../../types';
import {
  Send,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ListChecks,
  BookOpen,
  ArrowRight,
  Copy,
  ChevronLeft,
  FileSearch,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface AILegalAssistantProps {
  onBack: () => void;
  onNavigateToLawyers: () => void;
  onNavigateToDocs: () => void;
}

export const AILegalAssistant: React.FC<AILegalAssistantProps> = ({
  onBack,
  onNavigateToLawyers,
  onNavigateToDocs
}) => {
  const { addToast } = useApp();

  const suggestedQuestions = [
    { key: 'landlord_vacate', text: 'My landlord is asking me to vacate.' },
    { key: 'salary_unpaid', text: 'My salary has not been paid.' },
    { key: 'legal_notice', text: 'Help me understand this legal notice.' },
    { key: 'consumer_complaint', text: 'How can I file a consumer complaint?' },
    { key: 'police_notice', text: 'What should I do after receiving a police notice?' }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: 'Namaskaram! I am your Nyaya Setu legal assistant. Ask any question regarding Telangana tenancy laws, consumer rights, wages, or police notices.',
      timestamp: 'Just now',
      structuredData: AI_SAMPLE_RESPONSES['landlord_vacate']
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [checkedChecklist, setCheckedChecklist] = useState<Record<string, boolean>>({});

  const handleSelectSuggested = (key: string, label: string) => {
    const userMsg: ChatMessage = {
      id: 'msg_user_' + Date.now(),
      sender: 'user',
      text: label,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const data = AI_SAMPLE_RESPONSES[key] || AI_SAMPLE_RESPONSES['landlord_vacate'];
      const botMsg: ChatMessage = {
        id: 'msg_bot_' + Date.now(),
        sender: 'assistant',
        text: `Here is structured legal guidance regarding: "${label}"`,
        timestamp: 'Just now',
        structuredData: data
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');

    const userMsg: ChatMessage = {
      id: 'msg_user_' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Match keywords or fallback
    let matchKey = 'landlord_vacate';
    const lower = userText.toLowerCase();
    if (lower.includes('salary') || lower.includes('wages') || lower.includes('job') || lower.includes('employer')) {
      matchKey = 'salary_unpaid';
    } else if (lower.includes('notice') || lower.includes('letter') || lower.includes('reply')) {
      matchKey = 'legal_notice';
    } else if (lower.includes('consumer') || lower.includes('product') || lower.includes('defect') || lower.includes('fraud')) {
      matchKey = 'consumer_complaint';
    } else if (lower.includes('police') || lower.includes('fir') || lower.includes('station') || lower.includes('bail') || lower.includes('arrest')) {
      matchKey = 'police_notice';
    }

    setTimeout(() => {
      const data = AI_SAMPLE_RESPONSES[matchKey];
      const botMsg: ChatMessage = {
        id: 'msg_bot_' + Date.now(),
        sender: 'assistant',
        text: `Here is a plain-language analysis for your question.`,
        timestamp: 'Just now',
        structuredData: data
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast('Guidance summary copied to clipboard', 'success');
  };

  const toggleCheck = (item: string) => {
    setCheckedChecklist((prev) => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF8F3]">
      {/* Top Header */}
      <div className="p-3.5 bg-white border-b border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-[#142B4A] flex items-center gap-1.5">
              <span>AI Legal Assistant</span>
              <span className="text-[10px] font-semibold text-[#168C88] bg-[#168C88]/10 px-1.5 py-0.5 rounded">
                Telangana Guide
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">Conversational rights navigator</p>
          </div>
        </div>

        <button
          onClick={onNavigateToDocs}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-50 text-[#168C88] text-[11px] font-bold hover:bg-teal-100 transition-colors"
        >
          <FileSearch className="w-3.5 h-3.5" />
          <span>Analyze Doc</span>
        </button>
      </div>

      {/* PROMINENT MANDATORY NOTICE BANNER */}
      <div className="px-4 py-2 bg-amber-50 border-b border-amber-200/70 flex items-center gap-2.5 text-amber-900 text-xs">
        <ShieldAlert className="w-4 h-4 text-[#D96B27] shrink-0" />
        <span className="font-semibold tracking-wide">
          General guidance only, not legal advice.
        </span>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {m.sender === 'user' ? (
              <div className="max-w-[85%] bg-[#142B4A] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium shadow-xs">
                {m.text}
              </div>
            ) : (
              <div className="w-full max-w-[95%] bg-white rounded-2xl rounded-tl-xs border border-slate-200/90 shadow-sm p-4 space-y-3.5">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-[#142B4A]">
                    <Sparkles className="w-3.5 h-3.5 text-[#168C88]" />
                    <span>Plain-Language Legal Assessment</span>
                  </div>
                  {m.structuredData && (
                    <button
                      onClick={() => copyText(m.structuredData!.plainExplanation)}
                      className="text-slate-400 hover:text-slate-700 p-1"
                      title="Copy explanation"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Plain Explanation */}
                {m.structuredData ? (
                  <>
                    <p className="text-xs text-slate-800 leading-relaxed">
                      {m.structuredData.plainExplanation}
                    </p>

                    {/* Next Steps */}
                    <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-100 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#168C88]">
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>Recommended Immediate Next Steps:</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-700">
                        {m.structuredData.nextSteps.map((step, idx) => (
                          <li key={idx} className="leading-snug">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Document Checklist with interactive tick marks */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-[#142B4A]">
                        <div className="flex items-center gap-1.5">
                          <ListChecks className="w-3.5 h-3.5 text-[#D96B27]" />
                          <span>Required Evidence Checklist:</span>
                        </div>
                        <span className="text-[10px] text-slate-500">Tap to check</span>
                      </div>
                      <div className="space-y-1">
                        {m.structuredData.documentChecklist.map((doc, idx) => {
                          const isDone = checkedChecklist[doc];
                          return (
                            <div
                              key={idx}
                              onClick={() => toggleCheck(doc)}
                              className={`flex items-start gap-2 p-1.5 rounded-lg cursor-pointer text-[11px] transition-colors ${
                                isDone ? 'bg-emerald-50 text-emerald-900 font-medium' : 'hover:bg-slate-100 text-slate-700'
                              }`}
                            >
                              <div
                                className={`w-3.5 h-3.5 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                                  isDone
                                    ? 'bg-emerald-600 border-emerald-600 text-white'
                                    : 'border-slate-300 bg-white'
                                }`}
                              >
                                {isDone && <CheckCircle2 className="w-3 h-3" />}
                              </div>
                              <span className={isDone ? 'line-through text-slate-500' : ''}>
                                {doc}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Relevant Legal Concepts */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Governing Legal Concepts
                      </div>
                      <div className="space-y-1">
                        {m.structuredData.legalConcepts.map((c, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-lg bg-white border border-slate-200 text-[11px]"
                          >
                            <span className="font-bold text-[#142B4A]">{c.term}: </span>
                            <span className="text-slate-600">{c.explanation}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Statutory Source References */}
                    <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex flex-wrap items-center gap-1.5">
                      <span className="font-semibold text-slate-600">Statutory Sources:</span>
                      {m.structuredData.sourceReferences.map((s, idx) => (
                        <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Quick CTA to Lawyer consultation */}
                    <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                      <span className="text-[11px] text-slate-600">Need advocate representation?</span>
                      <button
                        onClick={onNavigateToLawyers}
                        className="px-3 py-1.5 rounded-lg bg-[#142B4A] text-white text-[11px] font-semibold hover:bg-[#168C88] transition-colors"
                      >
                        Find Telangana Lawyer
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-slate-700">{m.text}</p>
                )}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 max-w-[200px]">
            <Sparkles className="w-3.5 h-3.5 text-[#168C88] animate-spin" />
            <span>Analyzing legal principles...</span>
          </div>
        )}
      </div>

      {/* Suggested Questions Pill Scroller */}
      <div className="p-2.5 bg-white border-t border-slate-200/80">
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 px-1">
          Suggested Questions:
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {suggestedQuestions.map((q) => (
            <button
              key={q.key}
              onClick={() => handleSelectSuggested(q.key, q.text)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#168C88]/10 hover:text-[#168C88] text-slate-700 text-[11px] font-medium whitespace-nowrap transition-colors shrink-0"
            >
              {q.text}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendCustom} className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your legal question (e.g., notice response, rent)..."
            className="flex-1 px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 text-[#142B4A] outline-hidden focus:ring-1 focus:ring-[#168C88]"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-2 bg-[#142B4A] hover:bg-[#168C88] disabled:opacity-40 text-white rounded-xl transition-colors shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
