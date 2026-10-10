import React from 'react';

interface BridgeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  inverted?: boolean;
}

export const BridgeLogo: React.FC<BridgeLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  inverted = false
}) => {
  const sizeMap = {
    sm: { box: 28, text: 'text-base', subtext: 'text-[9px]' },
    md: { box: 36, text: 'text-lg', subtext: 'text-[10px]' },
    lg: { box: 48, text: 'text-2xl', subtext: 'text-xs' },
    xl: { box: 64, text: 'text-3xl', subtext: 'text-sm' }
  };

  const current = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Bridge of Justice SVG mark */}
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{ width: current.box, height: current.box }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Bridge Foundation Base */}
          <path
            d="M6 38H42"
            stroke={inverted ? '#FAF8F3' : '#142B4A'}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Suspension Pylons representing Twin Pillars of Law & Fairness */}
          <path
            d="M16 38V14M32 38V14"
            stroke={inverted ? '#FAF8F3' : '#142B4A'}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Arch Suspension Cable - The Connecting Bridge (Setu) */}
          <path
            d="M6 34C14 22 34 22 42 34"
            stroke="#168C88"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Scales of Justice Balance Beam atop the bridge */}
          <path
            d="M14 16H34"
            stroke="#D96B27"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Central Fulcrum Crown */}
          <circle
            cx="24"
            cy="12"
            r="3"
            fill="#D96B27"
          />
          {/* Left and Right suspended scale pans */}
          <path
            d="M14 16L11 23H17L14 16Z"
            fill="#168C88"
            opacity="0.85"
          />
          <path
            d="M34 16L31 23H37L34 16Z"
            fill="#168C88"
            opacity="0.85"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-extrabold tracking-tight ${current.text} ${
                inverted ? 'text-[#FAF8F3]' : 'text-[#142B4A]'
              }`}
            >
              Nyaya Setu
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-[#168C88] bg-[#168C88]/10 px-1.5 py-0.5 rounded">
              Telangana
            </span>
          </div>
          <span
            className={`${current.subtext} tracking-normal mt-0.5 ${
              inverted ? 'text-white/70' : 'text-[#142B4A]/60'
            }`}
          >
            Understand Rights · Know Next Steps
          </span>
        </div>
      )}
    </div>
  );
};
