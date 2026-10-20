import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Sun,
  Bird,
  Compass,
  Sparkles,
} from 'lucide-react';

interface Hotspot {
  id: string;
  title: string;
  x: string; // percentage
  y: string; // percentage
  category: string;
  description: string;
  symbolism: string;
}

const LOGO_HOTSPOTS: Hotspot[] = [
  {
    id: 'bharat-silhouette',
    title: 'Bharat Silhouette Contour',
    x: '48%',
    y: '14%',
    category: 'National Geography',
    description: 'Extruded saffron and golden contour shaped in the iconic map of India.',
    symbolism: 'Unifying all 28 states and agro-climatic zones under a singular green mission.',
  },
  {
    id: 'farmer-annadata',
    title: 'The Annadata (Farmer)',
    x: '24%',
    y: '42%',
    category: 'Fair Agriculture',
    description: 'Sculpted farmer in traditional turban and attire holding an agricultural hoe.',
    symbolism: 'Direct economic empowerment for smallholder growers with zero middleman deductions.',
  },
  {
    id: 'solar-chakra-house',
    title: 'Eco-House & Solar Chakra',
    x: '62%',
    y: '45%',
    category: 'Living Architecture',
    description: 'Sustainable residence with vegetative green roof and Ashoka Chakra solar gable.',
    symbolism: 'Harmonizing ancient Indian dharma with modern urban green roofs and solar energy.',
  },
  {
    id: 'pavitra-nadi',
    title: 'Pavitra Nadi (River)',
    x: '50%',
    y: '68%',
    category: 'Water Conservation',
    description: 'Vibrant blue river channel flowing through verdant agricultural terraces.',
    symbolism: 'Rainwater harvesting, watershed restoration, and urban bird hydration (Jalpatra).',
  },
  {
    id: 'surajmukhi',
    title: 'Surajmukhi (Sunflower)',
    x: '76%',
    y: '32%',
    category: 'Biodiversity',
    description: 'Towering golden sunflower with radiating petals facing the sun.',
    symbolism: 'Urban pollinator sanctuaries, native flowering flora, and natural micro-cooling.',
  },
  {
    id: 'wildlife-chital',
    title: 'Gauraiya & Chital Wildlife',
    x: '28%',
    y: '72%',
    category: 'Species Revival',
    description: 'Indian spotted deer grazing peacefully beneath soaring native birds.',
    symbolism: 'Bringing back the Indian House Sparrow and wildlife co-existence in concrete cities.',
  },
];

export const HeroLandscape3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<'scene' | 'emblem'>('scene');
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // Mouse position values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D tilt
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Rotate transforms (disabled if user prefers reduced motion)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [9, -9]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-11, 11]);

  // Layer parallax translations
  const layer1X = useTransform(smoothX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-6, 6]);
  const layer1Y = useTransform(smoothY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-4, 4]);

  const layer2X = useTransform(smoothX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-14, 14]);
  const layer2Y = useTransform(smoothY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-10, 10]);

  const layer3X = useTransform(smoothX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-22, 22]);
  const layer3Y = useTransform(smoothY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-16, 16]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/11] rounded-3xl overflow-hidden border border-golden-yellow/40 shadow-sculpted bg-gradient-to-b from-[#052F1D] via-[#042416] to-[#02180E] perspective-1000 select-none group"
    >
      {/* View Switcher Controls (Top Bar) */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-auto">
        {/* Toggle Mode Pill */}
        <div className="inline-flex items-center p-1 rounded-full bg-forest-deeper/90 backdrop-blur-md border border-golden-yellow/40 shadow-lg">
          <button
            onClick={() => {
              setViewMode('scene');
              setActiveHotspot(null);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              viewMode === 'scene'
                ? 'bg-gradient-to-r from-golden-yellow to-golden-light text-forest-dark shadow-sm'
                : 'text-ivory-dark hover:text-golden-yellow'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3D Living World</span>
          </button>

          <button
            onClick={() => setViewMode('emblem')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              viewMode === 'emblem'
                ? 'bg-gradient-to-r from-golden-yellow to-golden-light text-forest-dark shadow-sm'
                : 'text-ivory-dark hover:text-golden-yellow'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Master Emblem</span>
          </button>
        </div>

        {/* Live Indicator */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-deeper/85 backdrop-blur-md border border-emerald/30 text-xs text-leaf-light font-medium shadow-md">
          <span className="w-2 h-2 rounded-full bg-leaf-green animate-ping" />
          <span>{viewMode === 'scene' ? 'Interactive 3D Depth' : 'Brand Source of Truth'}</span>
        </div>
      </div>

      {/* MODE 1: 3D LIVING WORLD SCENE */}
      {viewMode === 'scene' ? (
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="w-full h-full relative"
        >
          {/* Layer 1: Background Sky, Sun, and Distant Ridges */}
          <motion.div
            style={{ x: layer1X, y: layer1Y, translateZ: -60 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Top-left directional sunlight aura (echoes the lighting on the 3D logo) */}
            <div className="absolute -top-12 -left-12 w-96 h-96 rounded-full bg-gradient-to-br from-golden-yellow/25 via-saffron/15 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-emerald/20 blur-3xl pointer-events-none" />

            {/* Indian Solar Mandala & Surajmukhi Motif in Sky */}
            <div className="absolute top-10 right-10 w-28 h-28 sm:w-36 sm:h-36 opacity-85 animate-pulse-glow">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
                <defs>
                  <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFF3C4" />
                    <stop offset="60%" stopColor="#F2B52C" />
                    <stop offset="100%" stopColor="#D99B16" />
                  </radialGradient>
                </defs>
                {/* 16 Solar Rays */}
                {[...Array(16)].map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={50 + 44 * Math.cos((i * 22.5 * Math.PI) / 180)}
                    y2={50 + 44 * Math.sin((i * 22.5 * Math.PI) / 180)}
                    stroke="#F2B52C"
                    strokeWidth="1.8"
                    strokeDasharray="4 2.5"
                    opacity="0.6"
                  />
                ))}
                {/* Outer ring */}
                <circle cx="50" cy="50" r="22" stroke="#F8C85E" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                {/* Golden Center */}
                <circle cx="50" cy="50" r="17" fill="url(#sunCore)" />
                <circle cx="50" cy="50" r="10" fill="#84480A" opacity="0.85" />
                <circle cx="50" cy="50" r="5" fill="#F2B52C" />
              </svg>
            </div>

            {/* Distant Himalayan / Western Ghats Ridges */}
            <svg
              viewBox="0 0 900 450"
              preserveAspectRatio="none"
              className="absolute bottom-20 w-full h-56 opacity-45"
            >
              <path
                d="M0,260 Q160,150 360,230 T720,180 T900,240 L900,450 L0,450 Z"
                fill="#0A3C23"
              />
            </svg>
          </motion.div>

          {/* Layer 2: Bharat Map Contour, Emerald Terraces, Farmer & Eco-House */}
          <motion.div
            style={{ x: layer2X, y: layer2Y, translateZ: -10 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Sculpted India-Map Silhouette Bevel (Signature Brand Motif) */}
            <div className="absolute inset-x-8 sm:inset-x-12 bottom-6 top-16 opacity-30 flex items-center justify-center">
              <svg viewBox="0 0 400 460" className="h-full w-auto drop-shadow-[0_10px_25px_rgba(242,181,44,0.15)]">
                <defs>
                  <linearGradient id="bharatContour" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#176B43" />
                    <stop offset="100%" stopColor="#073D25" />
                  </linearGradient>
                </defs>
                {/* Sculpted stylized outline reminiscent of India map silhouette in the logo */}
                <path
                  d="M195,20 C220,25 240,45 250,65 C265,95 285,115 320,135 C350,150 360,180 340,210 C325,230 305,245 295,275 C285,305 270,340 250,375 C230,410 205,445 195,455 C185,445 160,410 140,375 C120,340 105,305 95,275 C85,245 65,230 50,210 C30,180 40,150 70,135 C105,115 125,95 140,65 C150,45 170,25 195,20 Z"
                  fill="url(#bharatContour)"
                  stroke="#F2B52C"
                  strokeWidth="3.5"
                  strokeDasharray="6 3"
                  opacity="0.4"
                />
              </svg>
            </div>

            {/* Layered Emerald Landscape Terraces */}
            <svg
              viewBox="0 0 900 500"
              preserveAspectRatio="none"
              className="absolute bottom-0 w-full h-72"
            >
              <defs>
                <linearGradient id="hillBack" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#176B43" />
                  <stop offset="100%" stopColor="#063721" />
                </linearGradient>
                <linearGradient id="hillMid" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8EBE3F" />
                  <stop offset="60%" stopColor="#176B43" />
                  <stop offset="100%" stopColor="#073D25" />
                </linearGradient>
              </defs>

              {/* Back Terraced Hill with Gold Rim Light */}
              <path
                d="M-50,240 Q180,110 440,200 T950,160 L950,500 L-50,500 Z"
                fill="url(#hillBack)"
                opacity="0.88"
              />
              {/* Golden rim line */}
              <path
                d="M-50,240 Q180,110 440,200 T950,160"
                stroke="#F2B52C"
                strokeWidth="1.5"
                fill="none"
                opacity="0.45"
              />

              {/* Front Terraced Hill */}
              <path
                d="M-50,300 Q220,180 530,270 T950,230 L950,500 L-50,500 Z"
                fill="url(#hillMid)"
                opacity="0.95"
              />
              <path
                d="M-50,300 Q220,180 530,270 T950,230"
                stroke="#A6D552"
                strokeWidth="1.8"
                fill="none"
                opacity="0.5"
              />
            </svg>

            {/* Sculpted Indian Farmer (Annadata) with Turban & Hoe - Echoing Official Logo */}
            <div className="absolute bottom-36 left-[18%] sm:left-[22%] w-16 sm:w-20 h-24 pointer-events-none">
              <svg viewBox="0 0 80 110" className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
                {/* Hoe/Khurpi over shoulder */}
                <line x1="28" y1="24" x2="68" y2="76" stroke="#D89A14" strokeWidth="4" strokeLinecap="round" />
                <path d="M22,20 L34,16 L38,24 L26,28 Z" fill="#84480A" stroke="#F2B52C" strokeWidth="1" />
                {/* Farmer Head with Traditional Indian Turban (Pagri) */}
                <ellipse cx="44" cy="24" rx="10" ry="8" fill="#F59E0B" />
                <path d="M36,22 Q44,14 52,22 Q54,28 44,28 Z" fill="#E67E22" stroke="#F8C85E" strokeWidth="1" />
                <circle cx="44" cy="30" r="6" fill="#F6F0DA" />
                {/* Kurta / Body in Emerald Green */}
                <path d="M34,36 L54,36 L58,74 L30,74 Z" fill="#176B43" stroke="#8EBE3F" strokeWidth="1" />
                {/* Dhoti / Legs */}
                <path d="M32,74 L42,106 L46,106 L44,74 L46,74 L52,106 L56,106 L56,74 Z" fill="#F6F0DA" />
              </svg>
            </div>

            {/* Indian Eco House with Living Green Roof and Ashoka Chakra Solar Wheel */}
            <div className="absolute bottom-32 left-[52%] sm:left-[56%] -translate-x-1/2 w-32 sm:w-40 h-32 pointer-events-none">
              <svg viewBox="0 0 160 140" className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
                {/* Terracotta/Ivory House Walls */}
                <polygon points="80,18 24,52 136,52" fill="#F6F0DA" stroke="#D89A14" strokeWidth="2" />
                {/* Vegetative Living Green Roof (Layered sedum) */}
                <polygon points="80,22 34,51 126,51" fill="#8EBE3F" />
                <path d="M40,48 Q80,36 120,48" stroke="#176B43" strokeWidth="3" fill="none" />

                {/* Ashoka Chakra Solar Wheel Motif on House Gable */}
                <circle cx="80" cy="38" r="9" fill="#F6F0DA" stroke="#2788E8" strokeWidth="1.5" />
                <circle cx="80" cy="38" r="3" fill="#2788E8" />
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1="80"
                    y1="38"
                    x2={80 + 7 * Math.cos((i * 30 * Math.PI) / 180)}
                    y2={38 + 7 * Math.sin((i * 30 * Math.PI) / 180)}
                    stroke="#2788E8"
                    strokeWidth="1"
                  />
                ))}

                {/* Building Base in Forest Green & Clay Brick */}
                <rect x="38" y="52" width="84" height="60" rx="3" fill="#052F1D" stroke="#176B43" strokeWidth="2" />
                {/* Warm illuminated windows */}
                <rect x="48" y="64" width="18" height="20" rx="3" fill="#F2B52C" stroke="#FFF3C4" strokeWidth="1" opacity="0.95" />
                <rect x="94" y="64" width="18" height="20" rx="3" fill="#F2B52C" stroke="#FFF3C4" strokeWidth="1" opacity="0.95" />
                {/* Wooden Door */}
                <rect x="72" y="74" width="16" height="38" rx="2" fill="#84480A" stroke="#F2B52C" strokeWidth="1" />
              </svg>
            </div>

            {/* Towering Surajmukhi (Sunflower) on the Right Ridge */}
            <div className="absolute bottom-32 right-12 sm:right-20 w-16 sm:w-20 h-28 pointer-events-none">
              <svg viewBox="0 0 70 120" className="w-full h-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.5)]">
                {/* Stem and leaves */}
                <path d="M35,120 Q36,70 35,46" stroke="#176B43" strokeWidth="5" strokeLinecap="round" />
                <path d="M35,80 Q20,70 18,85 Q26,92 35,82" fill="#8EBE3F" />
                <path d="M35,65 Q50,55 52,70 Q44,78 35,68" fill="#8EBE3F" />
                {/* Petals (Golden clay style) */}
                {[...Array(10)].map((_, i) => {
                  const angle = (i * 36 * Math.PI) / 180;
                  return (
                    <circle
                      key={i}
                      cx={35 + 14 * Math.cos(angle)}
                      cy={35 + 14 * Math.sin(angle)}
                      r="6"
                      fill="#F2B52C"
                      stroke="#F8C85E"
                      strokeWidth="0.8"
                    />
                  );
                })}
                {/* Sunflower center */}
                <circle cx="35" cy="35" r="11" fill="#78350F" stroke="#D97706" strokeWidth="1.5" />
                <circle cx="35" cy="35" r="5" fill="#451A03" />
              </svg>
            </div>

            {/* Native Indian Trees (Neem, Banyan, Pine) */}
            <div className="absolute bottom-30 left-6 sm:left-10 w-18 sm:w-24 h-26">
              <svg viewBox="0 0 90 110" className="w-full h-full drop-shadow-md">
                <path d="M45,110 L45,65 Q40,45 28,38" stroke="#052F1D" strokeWidth="5" strokeLinecap="round" />
                <circle cx="30" cy="38" r="22" fill="#176B43" />
                <circle cx="58" cy="42" r="18" fill="#8EBE3F" opacity="0.9" />
                <circle cx="44" cy="22" r="16" fill="#228B57" />
              </svg>
            </div>
          </motion.div>

          {/* Layer 3: Flowing Blue River (Pavitra Nadi), Grazing Chital Deer, and Book of Wisdom */}
          <motion.div
            style={{ x: layer3X, y: layer3Y, translateZ: 14 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Flowing Blue River Path */}
            <svg
              viewBox="0 0 900 450"
              preserveAspectRatio="none"
              className="absolute bottom-0 w-full h-44"
            >
              <defs>
                <linearGradient id="pavitraRiver" x1="0%" y1="0%" x2="100%" y2="80%">
                  <stop offset="0%" stopColor="#5AA5F0" />
                  <stop offset="40%" stopColor="#2788E8" />
                  <stop offset="80%" stopColor="#1864B2" />
                  <stop offset="100%" stopColor="#073D25" />
                </linearGradient>
              </defs>

              {/* S-curved river channel */}
              <path
                d="M260,190 C370,270 230,350 390,450 L480,450 C380,350 490,260 350,190 Z"
                fill="url(#pavitraRiver)"
                opacity="0.95"
              />
              {/* Dynamic water flow ripples */}
              <path
                d="M305,240 Q360,280 310,330"
                stroke="#F6F0DA"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="12 8"
                className="animate-river-flow"
                fill="none"
                opacity="0.65"
              />
              <path
                d="M350,325 Q415,375 375,415"
                stroke="#F6F0DA"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="14 10"
                className="animate-river-flow"
                fill="none"
                opacity="0.65"
              />
            </svg>

            {/* Indian Spotted Deer (Chital) Grazing Peacefully */}
            <div className="absolute bottom-12 left-[20%] sm:left-[25%] w-14 sm:w-16 h-14 pointer-events-none">
              <svg viewBox="0 0 60 50" className="w-full h-full drop-shadow-md">
                <path
                  d="M12,42 L14,28 Q18,22 28,24 L38,26 Q44,24 46,16 L48,16 Q52,14 50,10 Q48,12 46,14 L42,22 L36,36 L38,44 L34,44 L32,36 L24,36 L20,44 L16,44 L18,34 L12,42 Z"
                  fill="#F6F0DA"
                  opacity="0.95"
                />
                {/* Antlers / ears */}
                <line x1="47" y1="12" x2="44" y2="6" stroke="#F2B52C" strokeWidth="1.6" strokeLinecap="round" />
                <line x1="49" y1="12" x2="52" y2="7" stroke="#F2B52C" strokeWidth="1.6" strokeLinecap="round" />
                {/* Spots */}
                <circle cx="28" cy="28" r="1" fill="#D97706" />
                <circle cx="34" cy="30" r="1" fill="#D97706" />
              </svg>
            </div>

            {/* Book of Nature / Agronomy Scriptures (From Official Logo) */}
            <div className="absolute bottom-6 left-[48%] -translate-x-1/2 w-12 h-8 pointer-events-none">
              <svg viewBox="0 0 50 30" className="w-full h-full drop-shadow">
                <path d="M5,18 Q15,10 25,12 Q35,10 45,18 L43,26 Q35,18 25,20 Q15,18 7,26 Z" fill="#F6F0DA" stroke="#D89A14" strokeWidth="1" />
                <line x1="25" y1="12" x2="25" y2="20" stroke="#84480A" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Soaring Gauraiya Sparrow / Sunbird in Sky */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -8, 0], x: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-16 left-20 sm:left-32 w-11 h-7"
            >
              <svg viewBox="0 0 50 30" className="w-full h-full drop-shadow">
                <path
                  d="M8,18 Q20,4 28,15 Q36,4 48,18 Q32,13 8,18 Z"
                  fill="#F59E0B"
                  stroke="#FFF3C4"
                  strokeWidth="0.8"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Layer 4: Foreground Interactive Depth Cards */}
          <motion.div
            style={{ translateZ: 32 }}
            className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end pointer-events-none"
          >
            {/* Bottom 3 Clay Extrusion Pillars */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pointer-events-auto">
              <div className="p-2 sm:p-3 rounded-2xl bg-[#042316]/90 backdrop-blur-md border border-golden-yellow/30 shadow-clay-extrusion hover:border-golden-yellow/70 transition-all duration-200 group/pill">
                <div className="flex items-center justify-between text-leaf-light mb-0.5">
                  <Leaf className="w-3.5 h-3.5 text-leaf-green" />
                  <span className="text-[9px] font-mono text-golden-yellow font-bold uppercase tracking-wider">COOLING</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-ivory group-hover/pill:text-golden-yellow transition-colors">
                  -6°C Ambient
                </div>
                <div className="text-[10px] text-ivory-dark hidden sm:block truncate">
                  RCC Terrace Buffer
                </div>
              </div>

              <div className="p-2 sm:p-3 rounded-2xl bg-[#042316]/90 backdrop-blur-md border border-golden-yellow/30 shadow-clay-extrusion hover:border-golden-yellow/70 transition-all duration-200 group/pill">
                <div className="flex items-center justify-between text-golden-yellow mb-0.5">
                  <Sun className="w-3.5 h-3.5 text-golden-yellow" />
                  <span className="text-[9px] font-mono text-golden-yellow font-bold uppercase tracking-wider">FAIR TRADE</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-ivory group-hover/pill:text-golden-yellow transition-colors">
                  100% Direct
                </div>
                <div className="text-[10px] text-ivory-dark hidden sm:block truncate">
                  Organic Bharat Growers
                </div>
              </div>

              <div className="p-2 sm:p-3 rounded-2xl bg-[#042316]/90 backdrop-blur-md border border-golden-yellow/30 shadow-clay-extrusion hover:border-golden-yellow/70 transition-all duration-200 group/pill">
                <div className="flex items-center justify-between text-river-light mb-0.5">
                  <Bird className="w-3.5 h-3.5 text-river-blue" />
                  <span className="text-[9px] font-mono text-golden-yellow font-bold uppercase tracking-wider">REVIVAL</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-ivory group-hover/pill:text-golden-yellow transition-colors">
                  Gauraiya Oasis
                </div>
                <div className="text-[10px] text-ivory-dark hidden sm:block truncate">
                  Balcony Water Pots
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        /* MODE 2: MASTER 3D EMBLEM SHOWCASE (UNOBSTRUCTED BRAND ARTWORK) */
        <div className="w-full h-full relative flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#031d12] via-[#052b1b] to-[#02140c] select-none">
          {/* Subtle Pedestal Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-golden-yellow/15 via-emerald/10 to-transparent blur-2xl pointer-events-none" />

          {/* Central Official Master Emblem - Floating 3D Artwork */}
          <div className="relative w-44 sm:w-52 lg:w-60 aspect-square transition-transform duration-300 hover:scale-[1.03] flex items-center justify-center">
            <img
              src="/images/haritLogo.png"
              alt="HARIT 3D ecological emblem of India"
              className="w-full h-full object-contain filter drop-shadow-[0_14px_30px_rgba(0,0,0,0.65)] select-none pointer-events-none"
            />
          </div>

          {/* Two-Line Brand Identity Lockup */}
          <div className="text-center mt-2 mb-1 select-none">
            <span className="font-serif font-black text-xl sm:text-2xl lg:text-3xl bg-gradient-to-r from-ivory via-golden-yellow to-amber-300 bg-clip-text text-transparent tracking-[0.14em] block">
              HARIT
            </span>
            <span className="font-sans font-semibold text-[11px] sm:text-xs lg:text-sm text-leaf-light uppercase tracking-[0.20em] block mt-0.5 whitespace-nowrap">
              India's Green Mission
            </span>
          </div>

          {/* Symbolism Pills (Cleanly Placed Below the Emblem - Not On Top of It) */}
          <div className="mt-4 z-20 flex flex-wrap items-center justify-center gap-1.5 max-w-lg px-2">
            {LOGO_HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                type="button"
                onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all duration-200 border ${
                  activeHotspot?.id === spot.id
                    ? 'bg-golden-yellow text-forest-dark border-golden-yellow shadow-gold font-bold scale-105'
                    : 'bg-forest-deeper/80 text-ivory-dark border-emerald/30 hover:border-golden-yellow/50 hover:text-golden-yellow'
                }`}
              >
                {spot.title}
              </button>
            ))}
          </div>

          {/* Hotspot Drawer / Card Overlay */}
          <AnimatePresence>
            {activeHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-3 inset-x-3 sm:inset-x-6 p-4 rounded-2xl bg-forest-deeper/95 backdrop-blur-xl border border-golden-yellow/50 shadow-2xl z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-golden-yellow/20 text-golden-yellow border border-golden-yellow/30">
                      {activeHotspot.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-ivory">
                      {activeHotspot.title}
                    </h4>
                  </div>
                  <p className="text-xs text-ivory-dark">
                    {activeHotspot.description}
                  </p>
                  <p className="text-[11px] text-leaf-light font-medium italic">
                    "{activeHotspot.symbolism}"
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveHotspot(null)}
                  className="self-end sm:self-center px-3 py-1.5 rounded-lg bg-emerald/20 hover:bg-emerald/40 text-golden-yellow text-xs font-semibold shrink-0 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint Overlay for Emblem View */}
          {!activeHotspot && (
            <div className="mt-2 text-center text-[10px] text-ivory-muted/70 font-mono tracking-wide pointer-events-none">
              Artistic Brand Emblem • Select an element above to explore its ecological symbolism
            </div>
          )}
        </div>
      )}

      {/* Subtle overlay hint in Scene View */}
      {viewMode === 'scene' && (
        <div className="absolute bottom-2 right-4 text-[10px] text-ivory-muted/70 pointer-events-none hidden md:block">
          Move cursor to experience 3D sculpted depth
        </div>
      )}
    </div>
  );
};
