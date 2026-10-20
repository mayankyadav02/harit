import React, { useState, useEffect } from 'react';
import {
  Bird,
  Droplets,
  TreeDeciduous,
  CheckCircle2,
  MapPin,
  Send,
  Sparkles,
  Heart,
  Shield,
  Layers,
  Calendar,
  X,
  ExternalLink,
  ChevronRight,
  Sun,
  CloudRain,
  Snowflake,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';
import { useStore } from '@/store';
import { MOCK_SPECIES } from '@/data/mockData';
import {
  CONSERVATION_CATEGORIES,
  CONSERVATION_INITIATIVES,
  type ConservationInitiative,
} from '@/data/conservationData';
import { Link } from 'react-router-dom';

export const Conservation: React.FC = () => {
  const { conservationMetrics, pledges, addPledge } = useStore();

  // Category Filtering
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Detail Modal State
  const [selectedInitiative, setSelectedInitiative] = useState<ConservationInitiative | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<'guide' | 'seasonal' | 'checklist' | 'materials'>('guide');

  // Contribution Form State
  const [formType, setFormType] = useState<'water_pot' | 'tree' | 'feeder'>('water_pot');
  const [formCount, setFormCount] = useState<number>(1);
  const [contributorName, setContributorName] = useState('');
  const [city, setCity] = useState('');
  const [note, setNote] = useState('');
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedInitiative) {
        setSelectedInitiative(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedInitiative]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedInitiative) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedInitiative]);

  const filteredInitiatives =
    selectedCategory === 'all'
      ? CONSERVATION_INITIATIVES
      : CONSERVATION_INITIATIVES.filter((item) => item.category === selectedCategory);

  const handleSubmitPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contributorName.trim() || !city.trim()) return;

    addPledge({
      type: formType,
      count: formCount,
      contributorName: contributorName.trim(),
      city: city.trim(),
      note: note.trim() || undefined,
    });

    setPledgeSubmitted(true);
    setContributorName('');
    setCity('');
    setNote('');
    setFormCount(1);
    setTimeout(() => setPledgeSubmitted(false), 5000);
  };

  const handleOpenModal = (initiative: ConservationInitiative, initialTab: 'guide' | 'seasonal' | 'checklist' | 'materials' = 'guide') => {
    setSelectedInitiative(initiative);
    setModalActiveTab(initialTab);
  };

  const handleTakeActionFromModal = () => {
    setSelectedInitiative(null);
    const formElement = document.getElementById('pledge-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-24 py-12 sm:py-16">
      {/* 1. HEADER & MISSION HERO */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-deeper/90 border border-golden-yellow/40 text-xs font-semibold text-golden-yellow shadow-gold">
            <Heart className="w-3.5 h-3.5 text-coral-red fill-coral-red/30" />
            <span>HARIT ANIMAL WELFARE & HABITAT RESTORATION MISSION</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-ivory tracking-tight max-w-4xl mx-auto leading-tight">
            Indian Fauna Care, Avian Revival & Water Networks
          </h1>

          <p className="text-base sm:text-lg text-ivory-dark max-w-3xl mx-auto leading-relaxed">
            Protecting community street cattle from blistering heatwaves, revitalizing the endangered Indian House Sparrow (Gauraiya), safeguarding forest buffer wildlife corridors, and installing community water and fodder stations across India.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a href="#initiatives" className="btn-primary text-xs px-6 py-3 shadow-gold">
              Explore 4 Conservation Pillars
            </a>
            <a href="#pledge-form" className="btn-secondary text-xs px-6 py-3">
              Record Citizen Contribution
            </a>
            <Link to="/eco-store" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-forest-deeper/80 border border-emerald/30 text-xs font-semibold text-ivory hover:text-golden-yellow hover:border-golden-yellow/50 transition-colors">
              <span>Acquire Terracotta Water Pots</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Demonstration Notice */}
          <div className="inline-block mt-4 px-4 py-1.5 rounded-full bg-forest-dark/70 border border-emerald/20 text-[11px] text-ivory-muted">
            <span className="text-golden-yellow font-bold">Transparent Demonstration:</span> All initiatives, guidance protocols, and metric counters represent interactive community educational blueprints.
          </div>
        </div>
      </section>

      {/* 2. LIVE IMPACT COUNTER STRIP - SCULPTED 3D */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#06321f] via-forest-deeper to-[#031c11] border border-golden-yellow/30 p-6 sm:p-10 shadow-sculpted space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-golden-yellow/20">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-golden-yellow flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-golden-yellow animate-ping" />
                CITIZEN ACTION PULSE • LIVE STATE METRICS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-ivory mt-0.5">
                Subcontinent Conservation Tracker
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-golden-yellow/15 border border-golden-yellow/40 text-xs text-golden-yellow font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Community Updates</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
            {/* Stat 1: Water Pots */}
            <div className="p-5 rounded-2xl bg-[#042416]/80 border border-emerald/30 shadow-clay-extrusion space-y-2">
              <div className="flex items-center gap-2 text-golden-yellow">
                <Droplets className="w-5 h-5 text-golden-yellow" />
                <span className="text-xs font-bold uppercase tracking-wider text-ivory-dark">
                  Pakshi Jalpatra Pots
                </span>
              </div>
              <div className="font-serif text-3xl font-black text-golden-yellow drop-shadow-sm">
                {conservationMetrics.waterPotsInstalled.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-ivory-muted leading-tight">
                Unglazed terracotta hydration bowls placed across balconies & trees
              </p>
            </div>

            {/* Stat 2: Trees Planted */}
            <div className="p-5 rounded-2xl bg-[#042416]/80 border border-emerald/30 shadow-clay-extrusion space-y-2">
              <div className="flex items-center gap-2 text-leaf-light">
                <TreeDeciduous className="w-5 h-5 text-leaf-green" />
                <span className="text-xs font-bold uppercase tracking-wider text-ivory-dark">
                  Native Trees Planted
                </span>
              </div>
              <div className="font-serif text-3xl font-black text-golden-yellow drop-shadow-sm">
                {conservationMetrics.treesPlanted.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-ivory-muted leading-tight">
                Neem, Peepal, Banyan & Jamun saplings providing canopy shade
              </p>
            </div>

            {/* Stat 3: Community Cattle Points */}
            <div className="p-5 rounded-2xl bg-[#042416]/80 border border-emerald/30 shadow-clay-extrusion space-y-2">
              <div className="flex items-center gap-2 text-river-light">
                <Shield className="w-5 h-5 text-river-blue" />
                <span className="text-xs font-bold uppercase tracking-wider text-ivory-dark">
                  Cattle Troughs & Shelters
                </span>
              </div>
              <div className="font-serif text-3xl font-black text-golden-yellow drop-shadow-sm">
                3,420
              </div>
              <p className="text-xs text-ivory-muted leading-tight">
                Continuous cemented troughs & thatched resting havens
              </p>
            </div>

            {/* Stat 4: Green Fodder Banks */}
            <div className="p-5 rounded-2xl bg-[#042416]/80 border border-emerald/30 shadow-clay-extrusion space-y-2">
              <div className="flex items-center gap-2 text-golden-yellow">
                <Layers className="w-5 h-5 text-golden-yellow" />
                <span className="text-xs font-bold uppercase tracking-wider text-ivory-dark">
                  Green Fodder Deployed
                </span>
              </div>
              <div className="font-serif text-3xl font-black text-golden-yellow drop-shadow-sm">
                48,500 <span className="text-sm font-sans font-bold text-ivory-dark">kg</span>
              </div>
              <p className="text-xs text-ivory-muted leading-tight">
                Super Napier, Sorghum silage & emergency seasonal rations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR CONSERVATION PILLARS (FILTER TABS & INITIATIVES GRID) */}
      <section id="initiatives" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="badge-gold">Four Essential Pillars</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-ivory">
            Comprehensive Ecological Stewardship
          </h2>
          <p className="text-sm text-ivory-dark">
            Filter through our four core conservation categories to explore dedicated programs, technical blueprints, and step-by-step community action guides.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CONSERVATION_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-golden-yellow text-forest-dark border-golden-yellow shadow-gold scale-105'
                    : 'bg-forest-dark text-ivory border-emerald/30 hover:border-golden-yellow/50 hover:bg-forest-deeper'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    isSelected
                      ? 'bg-forest-dark text-golden-yellow'
                      : 'bg-forest-deeper text-ivory-muted border border-emerald/20'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {filteredInitiatives.map((item) => {
            const categoryBadgeColor =
              item.category === 'domestic'
                ? 'bg-golden-yellow/20 text-golden-yellow border-golden-yellow/40'
                : item.category === 'birds'
                ? 'bg-river-blue/20 text-river-light border-river-blue/40'
                : item.category === 'wildlife'
                ? 'bg-emerald/20 text-leaf-light border-emerald/40'
                : 'bg-golden-yellow/15 text-ivory border-golden-yellow/30';

            return (
              <div
                key={item.id}
                className="card-3d group flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald/30 bg-forest-dark/95 shadow-nature hover:border-golden-yellow/50 transition-all duration-300"
              >
                <div>
                  {/* Image Container with Zoom */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-forest-deeper">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deeper via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${categoryBadgeColor}`}>
                        {item.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-forest-deeper/90 border border-golden-yellow/40 text-golden-yellow shadow-sm">
                        {item.statsBadge}
                      </span>
                    </div>

                    {/* Urgency / Season Callout */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="text-[11px] font-semibold text-golden-yellow/90 bg-forest-deeper/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-golden-yellow/20 inline-block">
                        {item.urgencyOrImpact}
                      </p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory group-hover:text-golden-yellow transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-golden-yellow font-medium mt-1 leading-snug">
                        {item.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-ivory-dark leading-relaxed">
                      {item.description}
                    </p>

                    {/* Material Preview Pills */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ivory-muted font-bold block">
                        Recommended Local Materials:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.recommendedMaterials.slice(0, 3).map((mat, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2.5 py-0.5 rounded-md bg-forest-deeper border border-emerald/20 text-ivory-dark"
                          >
                            {mat}
                          </span>
                        ))}
                        {item.recommendedMaterials.length > 3 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-forest-deeper/50 text-ivory-muted font-mono">
                            +{item.recommendedMaterials.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 pt-0 flex flex-col sm:flex-row items-center gap-3 border-t border-emerald/15 mt-2">
                  <button
                    onClick={() => handleOpenModal(item, 'guide')}
                    className="btn-primary w-full sm:w-auto flex-1 text-xs py-2.5 flex items-center justify-center gap-1.5 shadow-gold"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Explore Step-by-Step Guide</span>
                  </button>
                  <button
                    onClick={() => handleOpenModal(item, 'checklist')}
                    className="btn-secondary w-full sm:w-auto text-xs py-2.5 flex items-center justify-center gap-1.5"
                  >
                    <span>Dos & Don'ts</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. DETAIL MODAL (ACCESSIBLE & COMPREHENSIVE) */}
      {selectedInitiative && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-initiative-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedInitiative(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-forest-dark border border-golden-yellow/40 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-ivory"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-emerald/20 flex items-start justify-between gap-4 bg-forest-deeper/90">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="badge-emerald text-[10px]">
                    {selectedInitiative.categoryLabel}
                  </span>
                  <span className="text-[10px] font-mono text-golden-yellow font-bold">
                    {selectedInitiative.statsBadge}
                  </span>
                </div>
                <h2 id="modal-initiative-title" className="font-serif text-2xl sm:text-3xl font-extrabold text-ivory leading-tight">
                  {selectedInitiative.title}
                </h2>
                <p className="text-xs text-golden-yellow font-medium">
                  {selectedInitiative.subtitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedInitiative(null)}
                aria-label="Close modal"
                className="p-2 rounded-full bg-forest-dark hover:bg-forest-light text-ivory-dark hover:text-golden-yellow transition-colors shrink-0 border border-emerald/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Nav Tabs */}
            <div className="flex items-center border-b border-emerald/20 bg-[#042416] px-4 overflow-x-auto gap-2">
              {[
                { id: 'guide', label: 'Step-by-Step Action Guide' },
                { id: 'seasonal', label: 'Seasonal & Heatwave Care' },
                { id: 'checklist', label: 'Dos & Don\'ts Checklist' },
                { id: 'materials', label: 'Materials & Equipment' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setModalActiveTab(tab.id as any)}
                  className={`py-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                    modalActiveTab === tab.id
                      ? 'border-golden-yellow text-golden-yellow'
                      : 'border-transparent text-ivory-muted hover:text-ivory'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body Scrollable */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-ivory-dark leading-relaxed">
              {/* Featured Image & Why It Matters */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-forest-deeper p-4 rounded-2xl border border-emerald/20">
                <div className="sm:col-span-4 rounded-xl overflow-hidden aspect-[4/3]">
                  <img
                    src={selectedInitiative.image}
                    alt={selectedInitiative.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:col-span-8 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-golden-yellow font-bold block">
                    Ecological Impact & Relevance:
                  </span>
                  <p className="text-xs text-ivory leading-relaxed">
                    {selectedInitiative.whyItMatters}
                  </p>
                  <p className="text-[11px] text-ivory-muted italic">
                    {selectedInitiative.urgencyOrImpact}
                  </p>
                </div>
              </div>

              {/* TAB 1: ACTION GUIDE */}
              {modalActiveTab === 'guide' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-serif font-bold text-ivory flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-golden-yellow" />
                    <span>Four-Step Implementation Guide</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedInitiative.actionGuide.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-forest-deeper/80 border border-emerald/25 space-y-1.5"
                      >
                        <div className="flex items-center gap-2 text-golden-yellow font-mono font-bold text-xs">
                          <span className="px-1.5 py-0.5 rounded bg-golden-yellow/20 border border-golden-yellow/40">
                            {step.step}
                          </span>
                          <span>{step.title}</span>
                        </div>
                        <p className="text-xs text-ivory-dark leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: SEASONAL CARE */}
              {modalActiveTab === 'seasonal' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-serif font-bold text-ivory flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-river-light" />
                    <span>Indian Seasonal Care Protocols</span>
                  </h4>
                  <div className="space-y-3">
                    {selectedInitiative.seasonalCare.map((item, idx) => {
                      const icon =
                        idx === 0 ? (
                          <Sun className="w-4 h-4 text-golden-yellow" />
                        ) : idx === 1 ? (
                          <CloudRain className="w-4 h-4 text-river-light" />
                        ) : (
                          <Snowflake className="w-4 h-4 text-leaf-light" />
                        );
                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-forest-deeper/80 border border-emerald/20 flex gap-3.5 items-start"
                        >
                          <div className="mt-0.5 p-2 rounded-lg bg-forest-dark border border-emerald/25 shrink-0">
                            {icon}
                          </div>
                          <div className="space-y-1 flex-1">
                            <span className="text-xs font-bold text-ivory block">
                              {item.season}
                            </span>
                            <p className="text-xs text-ivory-dark leading-relaxed">
                              {item.instruction}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: DOS & DON'TS */}
              {modalActiveTab === 'checklist' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-serif font-bold text-ivory flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald" />
                    <span>Animal Welfare Standards & Safety Rules</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Dos */}
                    <div data-testid="checklist-dos" className="p-4 rounded-xl bg-emerald/10 border border-emerald/30 space-y-2">
                      <span className="text-xs font-bold text-leaf-light uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-leaf-green" />
                        Essential Practices (Dos)
                      </span>
                      <ul className="space-y-2 pt-1 text-xs text-ivory-dark">
                        {selectedInitiative.dosAndDonts.dos.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-leaf-green mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Don'ts */}
                    <div data-testid="checklist-donts" className="p-4 rounded-xl bg-coral-red/10 border border-coral-red/30 space-y-2">
                      <span className="text-xs font-bold text-coral-red uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-coral-red" />
                        Critical Hazards (Don'ts)
                      </span>
                      <ul className="space-y-2 pt-1 text-xs text-ivory-dark">
                        {selectedInitiative.dosAndDonts.donts.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-coral-red mt-0.5">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: RECOMMENDED MATERIALS */}
              {modalActiveTab === 'materials' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-serif font-bold text-ivory flex items-center gap-2">
                    <Layers className="w-4 h-4 text-golden-yellow" />
                    <span>Recommended Local & Eco-Friendly Materials</span>
                  </h4>
                  <div className="p-4 rounded-xl bg-forest-deeper/80 border border-emerald/20 space-y-3">
                    <p className="text-xs text-ivory-dark">
                      All recommended items prioritize vernacular, locally sourceable materials to eliminate toxic plastics and reduce carbon footprints:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {selectedInitiative.recommendedMaterials.map((mat, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-forest-dark border border-emerald/30 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 rounded-full bg-golden-yellow" />
                          <span className="text-xs text-ivory font-medium">{mat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Educational Disclaimer */}
              <div className="p-3.5 rounded-xl bg-forest-deeper/60 border border-golden-yellow/20 text-[11px] text-ivory-muted flex items-start gap-2">
                <span className="text-golden-yellow font-bold shrink-0">Note:</span>
                <span>
                  Guidelines compiled from Indian animal welfare and conservation science practices. In cases of wildlife distress or severe animal illness, always contact your local state Forest Department or certified veterinary officer.
                </span>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-emerald/20 bg-forest-deeper flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-ivory-muted text-center sm:text-left">
                Ready to contribute to this initiative in your locality?
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedInitiative(null)}
                  className="btn-secondary text-xs px-4 py-2.5 flex-1 sm:flex-initial"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleTakeActionFromModal}
                  className="btn-primary text-xs px-5 py-2.5 flex-1 sm:flex-initial flex items-center justify-center gap-2 shadow-gold"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log Citizen Action</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. INDIAN SPECIES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="badge-emerald">Fauna Identification Guide</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory">
            Our Urban Biodiversity Neighbors
          </h2>
          <p className="text-sm text-ivory-dark">
            Meet the native birds and pollinators who share Indian city skies, and learn how to welcome them to your terrace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_SPECIES.map((sp) => (
            <div
              key={sp.id}
              className="card-3d flex flex-col sm:flex-row gap-6 p-6 overflow-hidden rounded-3xl border border-emerald/25 bg-forest-dark/90 shadow-nature"
            >
              <div className="sm:w-48 aspect-square sm:aspect-auto rounded-2xl overflow-hidden bg-forest-deeper shrink-0">
                <img
                  src={sp.image}
                  alt={sp.commonName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-golden-yellow font-bold uppercase">
                      {sp.status}
                    </span>
                    <span className="text-[11px] text-ivory-muted italic">
                      {sp.scientificName}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-ivory mt-1">
                    {sp.commonName}
                  </h3>

                  <p className="text-xs text-golden-yellow font-medium">
                    Regional Names: {sp.regionalName}
                  </p>

                  <p className="text-xs text-ivory-dark mt-2 leading-relaxed">
                    {sp.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-forest-deeper/80 border border-emerald/20 text-xs">
                  <span className="text-leaf-light font-bold block mb-0.5">Balcony Habitat Tip:</span>
                  <p className="text-ivory-dark">{sp.habitatTip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE CONTRIBUTION TRACKER & PLEDGE LOGGER */}
      <section id="pledge-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Form */}
          <div className="lg:col-span-6 rounded-3xl bg-forest-dark border border-golden-yellow/40 p-6 sm:p-8 shadow-nature-lg space-y-6">
            <div>
              <span className="badge-gold">
                Citizen Contribution Logger
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory mt-1">
                Record Your Eco-Action
              </h3>
              <p className="text-xs text-ivory-dark mt-1">
                Did you plant a native tree, install a bird feeder, place a Pakshi Jalpatra clay pot, or establish a cattle water point? Log it here to update the live national count.
              </p>
            </div>

            {pledgeSubmitted && (
              <div data-testid="pledge-success" className="p-4 rounded-xl bg-emerald/20 border border-emerald/40 text-leaf-light text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Success! Your contribution has been recorded in the live national database.</span>
              </div>
            )}

            <form onSubmit={handleSubmitPledge} className="space-y-4">
              {/* Type Switcher */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-ivory">Action Type *</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'water_pot', label: 'Pakshi Jalpatra (Clay Pot)' },
                    { id: 'feeder', label: 'Bird Feeder / Nestbox' },
                    { id: 'tree', label: 'Native Habitat Tree' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormType(t.id as any)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                        formType === t.id
                          ? 'bg-golden-yellow text-forest-dark border-golden-yellow shadow-gold'
                          : 'bg-forest-deeper text-ivory border-emerald/20 hover:border-golden-yellow/40'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Count & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">Quantity *</label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={formCount}
                    onChange={(e) => setFormCount(Number(e.target.value))}
                    required
                    className="input-field text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma or Dr. Arvind Rao"
                    value={contributorName}
                    onChange={(e) => setContributorName(e.target.value)}
                    className="input-field text-xs"
                  />
                </div>
              </div>

              {/* City & Note */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-ivory">City / Neighborhood *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Indiranagar, Bengaluru or Malviya Nagar, Jaipur"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="input-field text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ivory">Balcony / Installation Note</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Placed a terracotta bowl with fresh water daily on 8th floor railing with pebbles for honeybees..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="input-field text-xs"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full text-xs py-3.5 flex items-center justify-center gap-2 shadow-gold"
              >
                <Send className="w-4 h-4" />
                <span>Submit Contribution to National Registry</span>
              </button>

              <div className="text-[11px] text-ivory-muted text-center pt-1">
                Interactive demonstration: Immediate local state update across national count.
              </div>
            </form>
          </div>

          {/* Right: Recent Contributions Feed */}
          <div className="lg:col-span-6 rounded-3xl bg-forest-dark border border-emerald/25 p-6 sm:p-8 shadow-nature space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-emerald/20">
              <h3 className="font-serif text-xl font-bold text-ivory">
                Recent Citizen Contributions
              </h3>
              <span className="text-xs font-mono text-golden-yellow font-bold">
                {pledges.length} Pledges Logged
              </span>
            </div>

            <div data-testid="pledge-feed" className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
              {pledges.map((plg) => {
                const typeIcon =
                  plg.type === 'tree' ? (
                    <TreeDeciduous className="w-4 h-4 text-leaf-green" />
                  ) : plg.type === 'feeder' ? (
                    <Bird className="w-4 h-4 text-river-light" />
                  ) : (
                    <Droplets className="w-4 h-4 text-golden-yellow" />
                  );

                const typeLabel =
                  plg.type === 'tree'
                    ? 'Native Trees'
                    : plg.type === 'feeder'
                    ? 'Bird Feeder'
                    : 'Pakshi Jalpatra (Water Pot)';

                return (
                  <div
                    key={plg.id}
                    data-testid="pledge-card"
                    className="p-4 rounded-xl bg-forest-deeper/70 border border-emerald/20 hover:border-emerald/40 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-bold text-ivory">
                        {typeIcon}
                        <span>
                          {plg.count}x {typeLabel}
                        </span>
                      </div>
                      <span className="text-ivory-muted text-[11px] font-mono">{plg.date}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-golden-yellow font-medium">
                      <span>{plg.contributorName}</span>
                      <span className="text-ivory-muted">•</span>
                      <span className="flex items-center gap-1 text-ivory-dark">
                        <MapPin className="w-3 h-3 text-leaf-light" />
                        {plg.city}
                      </span>
                    </div>

                    {plg.note && (
                      <p className="text-xs text-ivory-muted/90 italic pt-0.5">
                        "{plg.note}"
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
