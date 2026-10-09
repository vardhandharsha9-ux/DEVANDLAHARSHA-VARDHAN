import React from 'react';

interface SwastikLogoProps {
  variant?: 'primary' | 'header' | 'icon' | 'footer' | 'compact';
  theme?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

export const SwastikLogo: React.FC<SwastikLogoProps> = ({
  variant = 'header',
  theme,
  className = '',
  showTagline = false,
}) => {
  const isDark = theme === 'dark' || variant === 'footer';

  // SVG Emblem - Modern Travel & Tourism Compass & Horizon Wings
  const Emblem = ({ size = 36 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform hover:scale-105"
      aria-label="Swastik Travels Emblem"
    >
      <defs>
        <linearGradient id="swastikGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="50%" stopColor="#047857" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>
        <linearGradient id="swastikGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <filter id="swastikGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#059669" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Outer Rounded Emblem Container */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="12"
        fill="url(#swastikGradPrimary)"
        filter="url(#swastikGlow)"
      />

      {/* Inner Compass Orbit Ring */}
      <circle
        cx="24"
        cy="24"
        r="16"
        stroke="#a7f3d0"
        strokeWidth="1.5"
        strokeDasharray="2 3"
        opacity="0.6"
      />

      {/* Flight & Highway Corridor Path */}
      <path
        d="M12 32C15 22 23 16 34 14"
        stroke="url(#swastikGradGold)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Compass Star / North Arrow */}
      <path
        d="M24 10L27 21L38 24L27 27L24 38L21 27L10 24L21 21Z"
        fill="url(#swastikGradGold)"
      />
      <circle cx="24" cy="24" r="3" fill="#ffffff" />

      {/* Transit Horizon Wings */}
      <path
        d="M14 26C18 29 30 29 34 26"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );

  // Standalone Icon
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <Emblem size={38} />
      </div>
    );
  }

  // Header / Navbar Compact Logo
  if (variant === 'header' || variant === 'compact') {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none ${className}`}>
        <Emblem size={38} />
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-lg sm:text-xl font-black tracking-tight font-heading ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              SWASTIK
            </span>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
              TRAVELS
            </span>
          </div>
          <span
            className={`text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase ${
              isDark ? 'text-emerald-300' : 'text-emerald-700'
            }`}
          >
            Explore More. Travel Better.
          </span>
        </div>
      </div>
    );
  }

  // Footer Logo
  if (variant === 'footer') {
    return (
      <div className={`space-y-2 select-none ${className}`}>
        <div className="flex items-center gap-3">
          <Emblem size={42} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-heading">
                SWASTIK
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                TRAVELS
              </span>
            </div>
            <p className="text-[11px] text-emerald-300 font-semibold tracking-wide">
              Explore More. Travel Better.
            </p>
          </div>
        </div>
        {showTagline && (
          <p className="text-xs text-slate-300 max-w-sm leading-relaxed pt-1">
            Unified tourism, pilgrimage corridors, live GPS navigation, and smart ticket reservations across India.
          </p>
        )}
      </div>
    );
  }

  // Primary Full-Brand Logo (for Login, Landing hero, Splash)
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      <Emblem size={44} />
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`text-2xl sm:text-3xl font-black tracking-tight font-heading ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            SWASTIK
          </span>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest px-2 py-0.5 rounded bg-amber-400 text-slate-950 shadow-xs">
            TRAVELS
          </span>
        </div>
        <span
          className={`text-[11px] sm:text-xs font-bold tracking-wide ${
            isDark ? 'text-emerald-300' : 'text-emerald-700'
          }`}
        >
          Explore More. Travel Better.
        </span>
      </div>
    </div>
  );
};
