import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Sprout,
  Bird,
  Droplets,
  TreeDeciduous,
  ThermometerSnowflake,
  Sparkles,
  ShoppingBag,
  Star,
  CheckCircle2,
  Calendar,
  Layers,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { HeroLandscape3D } from '@/components/home/HeroLandscape3D';
import { useStore } from '@/store';
import {
  MOCK_SERVICES,
  MOCK_SPECIES,
  MOCK_ARTICLES,
} from '@/data/mockData';

export const Home: React.FC = () => {
  const {
    conservationMetrics,
    allProducts,
    addToCart,
    campaigns,
    toggleJoinCampaign,
    wishlist,
    toggleWishlist,
    addPledge,
  } = useStore();

  const [pledgePotted, setPledgePotted] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState(MOCK_SERVICES[0].id);

  // Filter preview products
  const farmerProductsPreview = allProducts
    .filter((p) => p.sourceType === 'farmer')
    .slice(0, 3);
  const ecoStorePreview = allProducts
    .filter((p) => p.sourceType === 'store')
    .slice(0, 3);

  const selectedService = MOCK_SERVICES.find((s) => s.id === activeServiceTab) || MOCK_SERVICES[0];

  const handleQuickWaterPotPledge = () => {
    addPledge({
      type: 'water_pot',
      count: 1,
      contributorName: 'Green Citizen',
      city: 'Delhi NCR',
      note: 'Balcony summer bird bowl pledged',
    });
    setPledgePotted(true);
    setTimeout(() => setPledgePotted(false), 3500);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-4">
        {/* Ambient background glow */}
        <div className="absolute top-10 left-1/3 -translate-x-1/2 w-[550px] h-[550px] bg-emerald/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-golden-yellow/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 space-y-6 text-center lg:text-left"
            >
              {/* Mission Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-deeper/90 border border-golden-yellow/40 text-xs font-semibold text-golden-yellow shadow-gold">
                <span className="w-2 h-2 rounded-full bg-leaf-green animate-pulse" />
                <span className="tracking-wide">HARIT — INDIA'S GREEN MISSION</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] text-ivory tracking-tight">
                Grow Greener.{' '}
                <span className="block mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-golden-yellow via-leaf-light to-amber-glow drop-shadow-[0_2px_10px_rgba(242,181,44,0.25)]">
                  Live Better.
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-ivory-dark max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                An integrated national ecosystem uniting urban green-roof engineering, verified smallholder organic farmers, and citizen-led bird habitat restoration across Indian cities.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/green-roofs"
                  className="btn-primary w-full sm:w-auto text-sm px-7 py-4 flex items-center justify-center gap-2 group shadow-gold"
                >
                  <span>Explore Green Roofs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/farmer-market"
                  className="btn-secondary w-full sm:w-auto text-sm px-6 py-4 flex items-center justify-center gap-2 border-golden-yellow/30"
                >
                  <Sprout className="w-4 h-4 text-golden-yellow" />
                  <span>Farmer Marketplace</span>
                </Link>
              </div>

              {/* Trust Indicators with Sculpted Badges */}
              <div className="pt-6 border-t border-emerald/20 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-ivory-dark">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald/20 border border-emerald/40 flex items-center justify-center text-leaf-light">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>Engineered Slab Load Assessment</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-golden-yellow/20 border border-golden-yellow/40 flex items-center justify-center text-golden-yellow">
                    <ThermometerSnowflake className="w-4 h-4" />
                  </div>
                  <span>Observed Up to 4-6°C Slab Surface Cooling</span>
                </div>
              </div>
            </motion.div>

            {/* Right: 3D Interactive Nature Artwork */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 relative"
            >
              <HeroLandscape3D />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ORGANIC TERRAIN TRANSITION 1 */}
      <div className="relative w-full h-8 -my-6 pointer-events-none opacity-40">
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-full fill-emerald/20">
          <path d="M0,20 Q300,40 600,10 T1200,30 L1200,40 L0,40 Z" />
        </svg>
      </div>

      {/* 2. DEMO IMPACT METRICS BANNER - SCULPTED 3D DISPLAY */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#06321f] via-forest-deeper to-[#031c11] border border-golden-yellow/30 p-8 sm:p-10 shadow-sculpted overflow-hidden">
            {/* Subtle Bharat Map Watermark Motif */}
            <div className="absolute -right-8 -bottom-12 w-80 h-96 opacity-10 pointer-events-none">
              <svg viewBox="0 0 400 460" className="w-full h-full fill-golden-yellow">
                <path d="M195,20 C220,25 240,45 250,65 C265,95 285,115 320,135 C350,150 360,180 340,210 C325,230 305,245 295,275 C285,305 270,340 250,375 C230,410 205,445 195,455 C185,445 160,410 140,375 C120,340 105,305 95,275 C85,245 65,230 50,210 C30,180 40,150 70,135 C105,115 125,95 140,65 C150,45 170,25 195,20 Z" />
              </svg>
            </div>

            {/* Top header & demo notice */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-golden-yellow/20 relative z-10">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-golden-yellow font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-golden-yellow" />
                  NATIONAL CONSERVATION PULSE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-ivory mt-1">
                  Collective Environmental Impact
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-golden-yellow/15 border border-golden-yellow/40 text-xs text-golden-yellow font-semibold self-start sm:self-auto backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-golden-yellow animate-ping" />
                <span>Live Demonstration Stream</span>
              </div>
            </div>

            {/* 4 Big Metrics Grid with Clay Extrusion Surfaces */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8 relative z-10">
              {/* Metric 1 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#042416]/80 border border-emerald/30 shadow-clay-extrusion space-y-1.5">
                <div className="flex items-center gap-2 text-leaf-light mb-1">
                  <TreeDeciduous className="w-5 h-5 text-leaf-green" />
                  <span className="text-[11px] uppercase font-bold text-ivory-dark tracking-wider">Trees Planted</span>
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-black text-golden-yellow drop-shadow-sm">
                  {conservationMetrics.treesPlanted.toLocaleString('en-IN')}+
                </div>
                <p className="text-xs text-ivory-muted leading-tight">Indigenous species across 46 Indian cities</p>
              </div>

              {/* Metric 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#042416]/80 border border-emerald/30 shadow-clay-extrusion space-y-1.5">
                <div className="flex items-center gap-2 text-golden-yellow mb-1">
                  <Droplets className="w-5 h-5 text-golden-yellow" />
                  <span className="text-[11px] uppercase font-bold text-ivory-dark tracking-wider">Jalpatra (Water)</span>
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-black text-golden-yellow drop-shadow-sm">
                  {conservationMetrics.waterPotsInstalled.toLocaleString('en-IN')}+
                </div>
                <p className="text-xs text-ivory-muted leading-tight">Hand-thrown terracotta bird waterers</p>
              </div>

              {/* Metric 3 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#042416]/80 border border-emerald/30 shadow-clay-extrusion space-y-1.5">
                <div className="flex items-center gap-2 text-river-light mb-1">
                  <Bird className="w-5 h-5 text-river-blue" />
                  <span className="text-[11px] uppercase font-bold text-ivory-dark tracking-wider">Sparrow Nests</span>
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-black text-golden-yellow drop-shadow-sm">
                  {conservationMetrics.feedersInstalled.toLocaleString('en-IN')}+
                </div>
                <p className="text-xs text-ivory-muted leading-tight">Safe homes for Gauraiya revival</p>
              </div>

              {/* Metric 4 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#042416]/80 border border-emerald/30 shadow-clay-extrusion space-y-1.5">
                <div className="flex items-center gap-2 text-leaf-light mb-1">
                  <ThermometerSnowflake className="w-5 h-5 text-leaf-light" />
                  <span className="text-[11px] uppercase font-bold text-ivory-dark tracking-wider">CO₂ Sink</span>
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-black text-golden-yellow drop-shadow-sm">
                  {conservationMetrics.carbonOffsetTons.toLocaleString('en-IN')} Tons
                </div>
                <p className="text-xs text-ivory-muted leading-tight">Yearly urban thermal & carbon sink</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORGANIC TERRAIN TRANSITION 2 */}
      <div className="relative w-full h-8 -my-6 pointer-events-none opacity-40">
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-full fill-emerald/20">
          <path d="M0,10 Q400,40 800,10 T1200,20 L1200,40 L0,40 Z" />
        </svg>
      </div>

      {/* 3. GREEN-ROOF SERVICES SHOWCASE */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="badge-emerald">
                <Layers className="w-3.5 h-3.5 text-leaf-light" />
                <span>Rooftop Ecological Engineering</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-ivory">
                Turn Scorching Terraces into Living Canopies
              </h2>
              <p className="text-sm sm:text-base text-ivory-dark">
                Engineered for Indian RCC slabs, extreme monsoon rain, and summer heatwaves. Choose the ideal green roof system for your residence, community, or commercial facility.
              </p>
            </div>

            <Link
              to="/green-roofs"
              className="btn-outline-gold self-start md:self-auto text-xs shrink-0"
            >
              <span>View All Systems & Pricing</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Interactive Service System Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-b border-emerald/20 pb-4">
            {MOCK_SERVICES.map((srv) => (
              <button
                key={srv.id}
                onClick={() => setActiveServiceTab(srv.id)}
                className={`p-3.5 rounded-xl text-left transition-all duration-200 border ${
                  activeServiceTab === srv.id
                    ? 'bg-emerald/20 border-golden-yellow text-golden-yellow shadow-gold'
                    : 'bg-forest-dark/40 border-emerald/20 text-ivory-dark hover:border-emerald/40'
                }`}
              >
                <div className="text-xs font-semibold uppercase font-mono tracking-wider mb-1">
                  ₹{srv.pricePerSqFt} / sq.ft
                </div>
                <div className="font-serif font-bold text-sm text-ivory line-clamp-1">
                  {srv.title}
                </div>
              </button>
            ))}
          </div>

          {/* Active Service Showcase Card */}
          <div className="rounded-3xl bg-forest-dark/80 border border-emerald/30 overflow-hidden shadow-nature-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-forest-deeper">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deeper via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="badge-gold mb-1">
                  {selectedService.coolingEffect}
                </span>
                <p className="text-xs text-ivory-dark font-medium">
                  {selectedService.weightLoad}
                </p>
              </div>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono text-leaf-light font-semibold uppercase">
                  {selectedService.idealFor}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory mt-1">
                  {selectedService.title}
                </h3>
                <p className="text-sm text-ivory-dark mt-2 leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedService.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-ivory-dark">
                    <CheckCircle2 className="w-4 h-4 text-leaf-light shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to={`/green-roofs?select=${selectedService.id}#calculator`}
                  className="btn-primary text-xs px-6 py-3"
                >
                  Calculate Cost for My Roof
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary text-xs px-5 py-3"
                >
                  Schedule Site Audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FARMER MARKETPLACE PREVIEW */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="badge-gold">
                <Sprout className="w-3.5 h-3.5 text-golden-yellow" />
                <span>Verified Direct-from-Farm Produce</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-ivory">
                Farmer Marketplace: Jaivik Bharat Harvest
              </h2>
              <p className="text-sm sm:text-base text-ivory-dark">
                100% traceably sourced from verified organic growers across Punjab, Maharashtra, Rajasthan, and Gujarat. Zero middlemen markups.
              </p>
            </div>

            <Link
              to="/farmer-market"
              className="btn-outline-gold self-start md:self-auto text-xs shrink-0"
            >
              <span>Explore All Farm Products</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {farmerProductsPreview.map((prod) => (
              <div
                key={prod.id}
                className="card-3d flex flex-col justify-between group"
              >
                <div>
                  {/* Image container */}
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-forest-deeper mb-4">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="badge-gold text-[10px] py-0.5 px-2">
                        {prod.seller.location}, {prod.seller.state}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className={`absolute top-2.5 right-2.5 p-2 rounded-lg backdrop-blur-md transition-colors ${
                        wishlist.includes(prod.id)
                          ? 'bg-golden-yellow text-forest-dark'
                          : 'bg-forest-deeper/70 text-ivory hover:text-golden-yellow'
                      }`}
                      title="Save to wishlist"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Farmer profile tag */}
                  <div className="flex items-center gap-1.5 text-xs text-leaf-light font-medium mb-1">
                    <Sprout className="w-3.5 h-3.5" />
                    <span>Farmer: {prod.seller.name}</span>
                  </div>

                  <h4 className="font-serif font-bold text-base text-ivory group-hover:text-golden-yellow transition-colors line-clamp-1">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-ivory-dark mt-1 line-clamp-2">
                    {prod.tagline}
                  </p>
                </div>

                {/* Price and Cart Action */}
                <div className="pt-5 mt-4 border-t border-emerald/20 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-ivory-muted block">{prod.unit}</span>
                    <span className="font-serif text-xl font-bold text-golden-yellow">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(prod, 1)}
                    className="btn-primary text-xs px-3.5 py-2 flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ECO-STORE CATEGORIES & PRODUCTS */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="badge-river">
                <Droplets className="w-3.5 h-3.5 text-river-light" />
                <span>Sustainable Urban Living</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-ivory">
                The Eco-Store: Balcony & Bird Essentials
              </h2>
              <p className="text-sm sm:text-base text-ivory-dark">
                Handcrafted unglazed terracotta bird baths, cedar sparrow nest boxes, Bokashi kitchen composters, and plastic-free garden tools.
              </p>
            </div>

            <Link
              to="/eco-store"
              className="btn-outline-gold self-start md:self-auto text-xs shrink-0"
            >
              <span>Visit Complete Eco-Store</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ecoStorePreview.map((prod) => (
              <div
                key={prod.id}
                className="card-3d flex flex-col justify-between group"
              >
                <div>
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-forest-deeper mb-4">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="badge-river text-[10px] py-0.5 px-2">
                        {prod.unit}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className={`absolute top-2.5 right-2.5 p-2 rounded-lg backdrop-blur-md transition-colors ${
                        wishlist.includes(prod.id)
                          ? 'bg-golden-yellow text-forest-dark'
                          : 'bg-forest-deeper/70 text-ivory hover:text-golden-yellow'
                      }`}
                      title="Save to wishlist"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-golden-yellow font-medium mb-1">
                    <Star className="w-3.5 h-3.5 fill-golden-yellow" />
                    <span>{prod.rating} ({prod.reviewsCount} reviews)</span>
                  </div>

                  <h4 className="font-serif font-bold text-base text-ivory group-hover:text-golden-yellow transition-colors line-clamp-1">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-ivory-dark mt-1 line-clamp-2">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-emerald/20 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-xl font-bold text-golden-yellow">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-xs text-ivory-muted line-through ml-2">
                        ₹{prod.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(prod, 1)}
                    className="btn-primary text-xs px-3.5 py-2 flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BIRD & BIODIVERSITY CONSERVATION SPOTLIGHT */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-b from-forest-dark to-forest-deeper border border-emerald/30 p-8 sm:p-12 shadow-nature-lg relative overflow-hidden">
            {/* Ambient pattern */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-golden-yellow/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="badge-emerald">
                  <Bird className="w-3.5 h-3.5 text-leaf-light" />
                  <span>Avian Rescue & Urban Rewilding</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory leading-tight">
                  Bring Back the Indian House Sparrow (Gauraiya)
                </h2>

                <p className="text-sm sm:text-base text-ivory-dark leading-relaxed">
                  Rapid glass urbanization and synthetic pesticide sprays wiped out 80% of urban sparrows. With a single terracotta water pot and a cedar nestbox, you can provide an oasis for native birds on your balcony.
                </p>

                {/* Interactive Instant Pledge Button */}
                <div className="p-5 rounded-2xl bg-forest-deeper border border-golden-yellow/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-golden-yellow">
                        Pledge a Balcony Water Pot Today
                      </h4>
                      <p className="text-xs text-ivory-dark">
                        Instantly updates live community counter in demo state.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-leaf-light font-bold">
                      FREE PLEDGE
                    </span>
                  </div>

                  {pledgePotted ? (
                    <div className="p-3 rounded-xl bg-emerald/20 border border-emerald/40 text-leaf-light text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Thank you! Your water pot pledge has been recorded in the national counter.</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleQuickWaterPotPledge}
                      className="btn-primary w-full text-xs py-3 flex items-center justify-center gap-2"
                    >
                      <Droplets className="w-4 h-4 text-forest-dark" />
                      <span>Click to Record 1 Hydration Pot Pledge</span>
                    </button>
                  )}
                </div>

                <Link
                  to="/conservation"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-golden-yellow hover:underline"
                >
                  <span>Explore All Species & Balcony Habitat Guides</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Right Column: Species Preview Grid */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_SPECIES.slice(0, 4).map((sp) => (
                  <div
                    key={sp.id}
                    className="p-4 rounded-2xl bg-forest-deeper/80 border border-emerald/20 hover:border-golden-yellow/40 transition-colors space-y-3"
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-forest-dark">
                      <img
                        src={sp.image}
                        alt={sp.commonName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-leaf-light block">
                        {sp.status}
                      </span>
                      <h4 className="font-bold text-sm text-ivory">{sp.commonName}</h4>
                      <p className="text-xs text-golden-yellow/90 font-medium">
                        {sp.regionalName}
                      </p>
                    </div>
                    <p className="text-xs text-ivory-dark line-clamp-2">
                      {sp.habitatTip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COMMUNITY CAMPAIGNS & CONTRIBUTION TRACKING */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="badge-gold">
                <Sparkles className="w-3.5 h-3.5 text-golden-yellow" />
                <span>Pan-India Citizen Drives</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-ivory">
                Active Community Conservation Missions
              </h2>
              <p className="text-sm sm:text-base text-ivory-dark">
                Join thousands of green citizens planting indigenous forests, installing rooftop solar shades, and creating water pot networks across Indian cities.
              </p>
            </div>

            <Link
              to="/campaigns"
              className="btn-outline-gold self-start md:self-auto text-xs shrink-0"
            >
              <span>View All Campaigns</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.slice(0, 2).map((camp) => {
              const percentage = Math.min(
                100,
                Math.round((camp.currentCount / camp.targetCount) * 100)
              );

              return (
                <div
                  key={camp.id}
                  className="rounded-2xl bg-forest-dark border border-emerald/25 p-6 shadow-nature space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-ivory-dark">
                      <span className="badge-emerald">{camp.category}</span>
                      <span>Ends: {camp.endDate}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-ivory">
                      {camp.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-ivory-dark leading-relaxed">
                      {camp.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-ivory font-bold">
                          {camp.currentCount.toLocaleString('en-IN')} {camp.unit}
                        </span>
                        <span className="text-golden-yellow font-bold">
                          {percentage}% Goal
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-forest-deeper overflow-hidden border border-emerald/30">
                        <div
                          className="h-full bg-gradient-to-r from-leaf-green to-golden-yellow transition-all duration-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="text-[11px] text-ivory-muted flex justify-between">
                        <span>Organized by {camp.organizer}</span>
                        <span>Target: {camp.targetCount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-emerald/20 flex items-center justify-between">
                    <span className="text-xs text-leaf-light font-medium">
                      Location: {camp.location}
                    </span>

                    <button
                      onClick={() => toggleJoinCampaign(camp.id)}
                      className={`text-xs px-4 py-2.5 rounded-xl font-bold transition-all ${
                        camp.joined
                          ? 'bg-emerald/30 border border-leaf-light text-leaf-light'
                          : 'btn-primary'
                      }`}
                    >
                      {camp.joined ? '✓ Joined as Green Champion' : 'Join Mission'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. ENVIRONMENTAL EDUCATION HIGHLIGHTS */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="badge-emerald">
                <Calendar className="w-3.5 h-3.5 text-leaf-light" />
                <span>Agronomy & Ecological Knowledge</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-ivory">
                Rooftop & Balcony Learning Guides
              </h2>
              <p className="text-sm sm:text-base text-ivory-dark">
                Free practical research and seasonal planting guides curated by agronomists, entomologists, and soil experts.
              </p>
            </div>

            <Link
              to="/education"
              className="btn-outline-gold self-start md:self-auto text-xs shrink-0"
            >
              <span>Explore All Guides</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_ARTICLES.slice(0, 3).map((art) => (
              <Link
                key={art.id}
                to={`/education?article=${art.id}`}
                className="card-3d flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-forest-deeper mb-4">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-leaf-light mb-1.5 font-medium">
                    <span>{art.categoryLabel}</span>
                    <span className="text-ivory-muted">{art.readTime}</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-ivory group-hover:text-golden-yellow transition-colors line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="text-xs text-ivory-dark mt-2 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-emerald/20 flex items-center justify-between text-xs text-golden-yellow font-semibold">
                  <span>By {art.author}</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS (IDENTIFIED AS SAMPLE CONTENT) */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="badge-gold">
              Voice of the Community
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-ivory">
              Stories from Citizens & Farmers
            </h2>
            <p className="text-xs text-golden-yellow/80 font-mono">
              [Demonstration Sample Testimonials]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="p-6 rounded-2xl bg-forest-dark border border-emerald/20 space-y-4">
              <div className="flex items-center gap-1 text-golden-yellow">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-golden-yellow" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-ivory-dark italic leading-relaxed">
                "Our top floor in Bengaluru was unbearable in April. Installing the Extensive Sedum Green Roof reduced indoor temperature by 5.5°C and halved our AC power bills."
              </p>
              <div className="pt-2 border-t border-emerald/20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald/30 flex items-center justify-center font-bold text-golden-yellow">
                  AS
                </div>
                <div>
                  <h5 className="font-bold text-xs text-ivory">Aditi Sen</h5>
                  <p className="text-[11px] text-ivory-muted">Resident Architect, Bengaluru</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 rounded-2xl bg-forest-dark border border-emerald/20 space-y-4">
              <div className="flex items-center gap-1 text-golden-yellow">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-golden-yellow" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-ivory-dark italic leading-relaxed">
                "As an organic wheat grower in Punjab, HARIT connects me directly to citizens in Delhi and Bengaluru. I receive fair remuneration within 48 hours without mandi deductions."
              </p>
              <div className="pt-2 border-t border-emerald/20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-golden-yellow/20 flex items-center justify-center font-bold text-golden-yellow">
                  BS
                </div>
                <div>
                  <h5 className="font-bold text-xs text-ivory">Sardar Balvinder Singh</h5>
                  <p className="text-[11px] text-ivory-muted">Malwa Heritage Farmer, Bathinda</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 rounded-2xl bg-forest-dark border border-emerald/20 space-y-4">
              <div className="flex items-center gap-1 text-golden-yellow">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-golden-yellow" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-ivory-dark italic leading-relaxed">
                "We mounted two Gauraiya nestboxes and a terracotta water bowl on our 14th floor balcony in Noida. Within 3 weeks, a sparrow couple laid eggs. It brings joy to our children daily."
              </p>
              <div className="pt-2 border-t border-emerald/20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-river-blue/20 flex items-center justify-center font-bold text-river-light">
                  RM
                </div>
                <div>
                  <h5 className="font-bold text-xs text-ivory">Rajeev & Meenakshi</h5>
                  <p className="text-[11px] text-ivory-muted">High-Rise Residents, Noida</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CALL TO ACTION BANNER */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-dark via-forest-green to-forest-deeper border border-golden-yellow/40 p-10 sm:p-14 text-center space-y-6 shadow-gold-lg relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="badge-gold">
                Join India's Green Mission
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory">
                Ready to Bring Living Greenery to Your Concrete Life?
              </h2>
              <p className="text-sm sm:text-base text-ivory-dark">
                Explore terrace load modeling in our calculator, pledge a summer bird water pot, or browse authentic organic produce directly from Indian growers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/green-roofs#calculator"
                className="btn-primary text-sm px-8 py-4 shadow-gold-lg"
              >
                Plan My Green Roof
              </Link>
              <Link
                to="/contact"
                className="btn-secondary text-sm px-7 py-4"
              >
                Contact Environmental Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
