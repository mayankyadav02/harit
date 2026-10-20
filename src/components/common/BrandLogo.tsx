import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export interface BrandLogoProps {
  logoSrc?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showTagline?: boolean;
  showWordmark?: boolean;
  isLink?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  logoSrc = '/images/haritLogo.png',
  size = 'md',
  showTagline = true,
  showWordmark = true,
  isLink = true,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  // Responsive emblem sizes with strict 1:1 aspect ratio
  const emblemSizes = {
    xs: 'h-7 w-7',
    sm: 'h-8 w-8',
    md: 'h-9 w-9 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-10 lg:w-10 xl:h-10 xl:w-10 2xl:h-11 2xl:w-11',
    lg: 'h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16',
    xl: 'h-16 w-16 sm:h-20 sm:w-20',
    '2xl': 'h-24 w-24 sm:h-28 sm:w-28',
  };

  // Line 1: HARIT typography scales
  const titleSizes = {
    xs: 'text-xs tracking-[0.08em]',
    sm: 'text-sm tracking-[0.08em]',
    md: 'text-sm sm:text-base md:text-base lg:text-lg 2xl:text-xl tracking-[0.10em] 2xl:tracking-[0.12em]',
    lg: 'text-xl sm:text-2xl lg:text-3xl tracking-[0.14em]',
    xl: 'text-3xl sm:text-4xl tracking-[0.16em]',
    '2xl': 'text-4xl sm:text-5xl tracking-[0.18em]',
  };

  // Line 2: India's Green Mission typography scales (single line, whitespace-nowrap)
  const taglineSizes = {
    xs: 'text-[7px] tracking-[0.08em] mt-0.5',
    sm: 'text-[7.5px] tracking-[0.09em] mt-0.5',
    md: 'text-[7.5px] sm:text-[8px] md:text-[8.5px] lg:text-[9px] 2xl:text-[10px] tracking-[0.10em] sm:tracking-[0.12em] 2xl:tracking-[0.16em] mt-0.5',
    lg: 'text-[10px] sm:text-xs lg:text-sm tracking-[0.18em] sm:tracking-[0.22em] mt-1 sm:mt-1.5',
    xl: 'text-xs sm:text-sm tracking-[0.22em] mt-1.5',
    '2xl': 'text-sm sm:text-base tracking-[0.24em] mt-2',
  };

  const gapSizes = {
    xs: 'gap-1.5',
    sm: 'gap-2',
    md: 'gap-2 sm:gap-2.5',
    lg: 'gap-3 sm:gap-3.5',
    xl: 'gap-4',
    '2xl': 'gap-5',
  };

  const emblem = (
    <div
      className={`relative ${emblemSizes[size]} aspect-square shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03]`}
      title="HARIT — India's Green Mission"
    >
      {!imageError ? (
        <img
          src={logoSrc}
          alt="HARIT 3D ecological emblem of India"
          className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
          onError={() => setImageError(true)}
        />
      ) : (
        /* Reserved Brand Emblem reflecting official identity elements */
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="skyGrad" cx="50%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#0a4d2e" />
              <stop offset="100%" stopColor="#042316" />
            </radialGradient>
            <linearGradient id="goldSunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF3C4" />
              <stop offset="40%" stopColor="#F2B52C" />
              <stop offset="100%" stopColor="#D99B16" />
            </linearGradient>
            <linearGradient id="hillGreenGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8EBE3F" />
              <stop offset="100%" stopColor="#176B43" />
            </linearGradient>
            <linearGradient id="hillGreenGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#176B43" />
              <stop offset="100%" stopColor="#073D25" />
            </linearGradient>
            <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#5AA5F0" />
              <stop offset="60%" stopColor="#2788E8" />
              <stop offset="100%" stopColor="#1864B2" />
            </linearGradient>
          </defs>

          {/* Deep Forest Background */}
          <rect width="100" height="100" rx="20" fill="url(#skyGrad)" />

          {/* Golden Sun & Sunflower Motif */}
          <circle cx="50" cy="34" r="16" fill="url(#goldSunGrad)" opacity="0.9" />
          <circle cx="50" cy="34" r="7" fill="#84480A" opacity="0.8" />
          {/* Sunflower petal dots */}
          <circle cx="50" cy="14" r="2.2" fill="#F2B52C" />
          <circle cx="64" cy="20" r="2.2" fill="#F2B52C" />
          <circle cx="70" cy="34" r="2.2" fill="#F2B52C" />
          <circle cx="64" cy="48" r="2.2" fill="#F2B52C" />
          <circle cx="36" cy="48" r="2.2" fill="#F2B52C" />
          <circle cx="30" cy="34" r="2.2" fill="#F2B52C" />
          <circle cx="36" cy="20" r="2.2" fill="#F2B52C" />

          {/* Birds in flight */}
          <path d="M 28 22 Q 32 19 36 23 Q 40 19 44 22 Q 36 21 28 22 Z" fill="#F6F0DA" opacity="0.9" />
          <path d="M 60 17 Q 63 15 66 18 Q 69 15 72 17 Q 66 16 60 17 Z" fill="#F6F0DA" opacity="0.75" />

          {/* Emerald sculpted landscape hills */}
          <path d="M -5 68 Q 25 46 60 62 Q 85 70 105 58 L 105 100 L -5 100 Z" fill="url(#hillGreenGrad1)" />
          <path d="M -5 80 Q 30 62 70 76 Q 90 82 105 72 L 105 100 L -5 100 Z" fill="url(#hillGreenGrad2)" />

          {/* Flowing blue river */}
          <path d="M 46 62 Q 54 74 38 88 Q 30 96 32 100 L 52 100 Q 56 94 62 82 Q 70 70 58 62 Z" fill="url(#riverGrad)" />

          {/* Eco House */}
          <polygon points="72,62 79,56 86,62" fill="#E7DCB9" />
          <rect x="73" y="62" width="12" height="10" fill="#052F1D" />
          <rect x="76" y="64" width="4" height="8" fill="#F2B52C" />

          {/* Trees */}
          <path d="M 18 64 Q 14 55 18 48 Q 22 55 18 64 Z" fill="#8EBE3F" />
          <circle cx="18" cy="52" r="5" fill="#8EBE3F" />
          <circle cx="23" cy="56" r="4" fill="#176B43" />

          {/* Deer Silhouette */}
          <path d="M 26 84 C 27 80 28 78 30 78 C 31 78 32 79 32 81 L 34 81 C 34 83 33 86 31 87 L 32 92 L 30 92 L 29 88 L 27 92 L 25 92 L 26 84 Z" fill="#F6F0DA" opacity="0.95" />
        </svg>
      )}
    </div>
  );

  // Exact two-line brand lockup:
  // Line 1: HARIT (only)
  // Line 2: India's Green Mission (only, single line, no wrap)
  const textContent = showWordmark ? (
    <div className="flex flex-col justify-center text-left leading-none shrink-0 min-w-0">
      <span
        className={`font-serif font-black ${titleSizes[size]} bg-gradient-to-r from-ivory via-golden-yellow to-amber-300 bg-clip-text text-transparent uppercase select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]`}
      >
        HARIT
      </span>
      {showTagline && (
        <span
          className={`font-sans font-semibold ${taglineSizes[size]} text-leaf-light/95 uppercase whitespace-nowrap select-none`}
        >
          India's Green Mission
        </span>
      )}
    </div>
  ) : null;

  const content = (
    <div className={`inline-flex items-center ${gapSizes[size]} group select-none ${className}`}>
      {emblem}
      {textContent}
    </div>
  );

  if (isLink) {
    return (
      <Link
        to="/"
        aria-label="HARIT — India's Green Mission Home"
        className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-golden-yellow rounded-xl"
      >
        {content}
      </Link>
    );
  }

  return content;
};
