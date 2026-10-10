import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wifi, Battery, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { viewMode } = useApp();

  if (viewMode === 'fluid') {
    return (
      <div className="w-full max-w-4xl mx-auto min-h-[calc(100vh-60px)] pb-16">
        {children}
      </div>
    );
  }

  return (
    <div className="py-4 md:py-6 flex justify-center items-start min-h-[calc(100vh-60px)] bg-slate-200/60 p-2 sm:p-4">
      {/* Phone chassis */}
      <div className="w-full max-w-[400px] bg-[#FAF8F3] rounded-[40px] shadow-2xl shadow-slate-900/25 border-[8px] border-[#142B4A] overflow-hidden flex flex-col relative transition-all duration-300 min-h-[820px] max-h-[890px]">
        {/* Dynamic Island / Top Camera Speaker Pill */}
        <div className="h-9 bg-[#FAF8F3] shrink-0 px-6 pt-2 flex items-center justify-between text-[#142B4A] select-none text-[12px] font-semibold tracking-tight border-b border-[#142B4A]/5">
          <span>12:30</span>
          {/* Speaker / Camera Notch */}
          <div className="w-24 h-4 bg-[#142B4A] rounded-full mx-auto -mt-1 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-950/80 mr-2 border border-slate-700/50" />
            <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex items-center gap-1.5 text-[#142B4A]">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Scrollable Mobile Viewport Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative">
          {children}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="h-4 bg-[#FAF8F3] shrink-0 flex items-center justify-center border-t border-[#142B4A]/5">
          <div className="w-28 h-1 bg-[#142B4A]/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};
