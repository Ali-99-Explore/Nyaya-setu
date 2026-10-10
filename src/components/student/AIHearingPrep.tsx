import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_MOOT_SCENARIO } from '../../data/mockData';
import {
  Sparkles,
  Scale,
  Send,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface AIHearingPrepProps {
  onBack?: () => void;
}

export const AIHearingPrep: React.FC<AIHearingPrepProps> = ({ onBack }) => {
  const { addToast } = useApp();

  const [scenario, setScenario] = useState(MOCK_MOOT_SCENARIO);
  const [currentStep, setCurrentStep] = useState<number>(1); // 1: argument, 2: judge query & rebuttal, 3: rubric feedback
  const [argumentText, setArgumentText] = useState(
    'My Lords, the respondent accepted monthly rental payments of Rs. 65,000/- for 14 continuous months via UPI. Under Section 106 of the Transfer of Property Act, acceptance of rent and delivery of possession creates a valid monthly tenancy by implication of law. Hence, summary dispossession via a 3-day WhatsApp message violates statutory due process.'
  );

  const [activeQueryIndex, setActiveQueryIndex] = useState(0);
  const [rebuttalText, setRebuttalText] = useState(
    'May it please the Court, as held by the Hon’ble Supreme Court in Ram Kumar Das v. Jagdish Chandra Deo (AIR 1952 SC 23), an unregistered lease exceeding one year does not create a yearly lease, but if the lessee enters into possession with lessor consent and pays rent, the tenancy is presumed to be month-to-month under Section 106 TPA. Therefore, a mandatory 15-day notice is indispensable.'
  );

  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setCurrentStep(3);
      addToast('Moot argument rubric evaluation generated', 'success');
    }, 700);
  };

  const handleReset = () => {
    setCurrentStep(1);
    addToast('Reset practice room', 'info');
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
              AI Hearing Preparation (Moot Room)
            </h2>
            <p className="text-[11px] text-slate-500">
              Simulated bench questions & oral advocacy feedback
            </p>
          </div>
        </div>

        <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
          Simulation Room
        </span>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="px-4 py-2 bg-amber-50 border-b border-amber-200/70 text-amber-900 text-xs flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-[#D96B27] shrink-0" />
        <span>
          <strong>Simulated Moot Courtroom:</strong> Designed for law student training in appellate submissions and statutory rebuttals.
        </span>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* Scenario Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#168C88] uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded">
              Moot Proposition: {scenario.area}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Session #4</span>
          </div>

          <h3 className="text-sm font-bold text-[#142B4A]">
            {scenario.title}
          </h3>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900 block mb-1">Factual Matrix:</span>
            {scenario.facts}
          </div>
        </div>

        {/* STEP 1: Enter Main Oral Argument */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#142B4A] uppercase tracking-wider">
                Step 1: Formulate Your Primary Submission
              </span>
              <span className="text-[10px] text-slate-400">Counsel for Petitioner</span>
            </div>

            <textarea
              rows={4}
              value={argumentText}
              onChange={(e) => setArgumentText(e.target.value)}
              placeholder="State your opening argument, citing governing statutes and landmark precedents..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono-legal leading-relaxed outline-hidden focus:ring-1 focus:ring-[#168C88]"
            />

            <button
              onClick={() => setCurrentStep(2)}
              className="w-full py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Submit Argument & Face Bench Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Simulated Judicial Query & Rebuttal */}
        {currentStep === 2 && (
          <div className="space-y-4">
            {/* Judicial Question Card */}
            <div className="bg-amber-50/80 rounded-2xl border-2 border-amber-300 p-4 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-900" />
                <span className="text-xs font-bold text-amber-900 uppercase">
                  Simulated Judicial Query from the Bench
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-slate-900 font-serif-legal italic leading-relaxed">
                "{scenario.simulatedJudgeQueries[activeQueryIndex].question}"
              </div>

              <p className="text-[11px] text-amber-800">
                <strong>Judge's Concern:</strong> {scenario.simulatedJudgeQueries[activeQueryIndex].context}
              </p>
            </div>

            {/* Rebuttal Input */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#142B4A] uppercase tracking-wider block">
                Step 2: Counsel's Responsive Rebuttal
              </span>

              <textarea
                rows={5}
                value={rebuttalText}
                onChange={(e) => setRebuttalText(e.target.value)}
                placeholder="Address the Court's query directly, distinguishing adverse case laws..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono-legal leading-relaxed outline-hidden focus:ring-1 focus:ring-[#168C88]"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Back
                </button>
                <button
                  onClick={handleEvaluate}
                  disabled={isEvaluating}
                  className="flex-1 py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-[#D96B27]" />
                  <span>{isEvaluating ? 'Evaluating Advocacy Rubric...' : 'Evaluate Performance Rubric'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Evaluation Rubric Feedback */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl border-2 border-[#168C88]/30 p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-[#142B4A]">
                  Oral Advocacy Performance Rubric
                </h3>
              </div>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800"
                title="Practice again"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Rubric Breakdown */}
            <div className="space-y-3 text-xs">
              {/* Clarity & Courtroom Demeanor */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-[#142B4A]">
                  <span>1. Structural Clarity & Courtroom Etiquette</span>
                  <span className="text-emerald-700 font-mono-legal font-bold">Excellent (9/10)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Proper honorifics ("My Lords", "May it please the Court") and clean syllogistic structure.
                </p>
              </div>

              {/* Statutory Citation Accuracy */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-[#142B4A]">
                  <span>2. Statutory Analysis & Benchmark Accuracy</span>
                  <span className="text-[#168C88] font-mono-legal font-bold">Strong (8.5/10)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Correctly identified Section 106 Transfer of Property Act and distinguished monthly tenancies created by acceptance of rent.
                </p>
              </div>

              {/* Judicial Challenge Handling */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-[#142B4A]">
                  <span>3. Rebuttal to Judicial Question</span>
                  <span className="text-[#D96B27] font-mono-legal font-bold">Proficient (8/10)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Accurately applied the ratio of Ram Kumar Das (1952 SC 23). Suggestion: Also cite the 3-day notice inadequacy under Section 106(4).
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#168C88] text-white text-xs font-bold transition-colors"
            >
              Start New Moot Round
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
