import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Layers,
  ThermometerSnowflake,
  CheckCircle2,
  Calculator,
  ArrowRight,
  Send,
  Check,
  Camera,
  Sparkles,
} from 'lucide-react';
import { MOCK_SERVICES } from '@/data/mockData';
import { useStore } from '@/store';

interface ShowcaseItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'agro-farm' | 'pollinator';
  categoryLabel: string;
  image: string;
  alt: string;
  specs: {
    depth: string;
    load: string;
    cooling: string;
    plants: string;
  };
  description: string;
  caption: string;
}

const ARCHITECTURAL_SHOWCASE: ShowcaseItem[] = [
  {
    id: 'res-01',
    title: 'Residential Villa Rooftop Oasis',
    category: 'residential',
    categoryLabel: 'Residential Terrace',
    image: '/images/green-roofs/residential-rooftop-garden.jpg',
    alt: 'Curated residential rooftop garden featuring shade pergolas, container planting, and native flora on RCC slab',
    specs: {
      depth: '120-150 mm substrate',
      load: '95-120 kg/m²',
      cooling: '4.5°C to 6.2°C surface delta',
      plants: 'Curry leaf, Tulsi, Sedum, Lemon grass'
    },
    description: 'Transforming hot residential concrete terraces into micro-cooling living sanctuaries with low-maintenance native vegetation, dual-membrane waterproofing, and rainwater retention.',
    caption: 'Illustrative Residential Showcase • High-density terrace greenery engineered for Indian urban residential slabs.'
  },
  {
    id: 'comm-01',
    title: 'Commercial Biosolar Cool Roof',
    category: 'commercial',
    categoryLabel: 'Commercial & Institutional',
    image: '/images/green-roofs/modern-commercial-green-roof.jpg',
    alt: 'Modern commercial architectural building with integrated vegetative cool roof and solar array',
    specs: {
      depth: '80-100 mm extensive',
      load: '65-85 kg/m²',
      cooling: '6.0°C to 8.0°C slab surface',
      plants: 'Sedum album, Portulaca, Aptenia cordifolia'
    },
    description: 'Extensive biosolar living roofs designed for corporate campuses. Plant transpiration cools surrounding air, raising rooftop photovoltaic solar panel efficiency by 8% to 12%.',
    caption: 'Illustrative Commercial Showcase • Biosolar synergy reducing corporate HVAC peak thermal demand.'
  },
  {
    id: 'agro-01',
    title: 'Urban Rooftop Agro-Farm',
    category: 'agro-farm',
    categoryLabel: 'Urban Agro-Farm',
    image: '/images/green-roofs/urban-rooftop-agro-farm.jpg',
    alt: 'Rooftop urban agriculture garden with sub-irrigated planter beds producing fresh organic vegetables',
    specs: {
      depth: '200-300 mm raised bed',
      load: '140-180 kg/m²',
      cooling: '5.0°C to 7.0°C room temp',
      plants: 'Heirloom tomatoes, brinjal, palak, chillies'
    },
    description: 'Sub-irrigated edible crop beds and lightweight coconut coir potting matrix allowing city dwellers to harvest fresh organic produce directly from their apartment rooftops.',
    caption: 'Illustrative Agro-Roof Showcase • Food security and hyper-local organic yield for residential societies.'
  },
  {
    id: 'dense-01',
    title: 'Dense Terrace Sanctuary & Micro-Forest',
    category: 'residential',
    categoryLabel: 'Residential Terrace',
    image: '/images/green-roofs/dense-terrace-sanctuary.jpg',
    alt: 'Lush terrace garden canopy with dense native shrubs and flowering perennials',
    specs: {
      depth: '150-220 mm layered',
      load: '110-145 kg/m²',
      cooling: '5.5°C to 7.2°C ambient delta',
      plants: 'Bougainvillea, Jasmine, Hibiscus, Ferns'
    },
    description: 'Layered botanical canopy creating a shaded thermal barrier that absorbs solar radiation while filtering urban airborne particulate dust (PM2.5).',
    caption: 'Illustrative Terrace Sanctuary • Multilayered native botanical canopy for extreme summer protection.'
  },
  {
    id: 'inst-01',
    title: 'Institutional Eco-Campus Living Canopy',
    category: 'commercial',
    categoryLabel: 'Commercial & Institutional',
    image: '/images/green-roofs/institutional-living-canopy.jpg',
    alt: 'Institutional building living canopy with extensive green roof cover and pedestrian access',
    specs: {
      depth: '100-140 mm extensive',
      load: '75-95 kg/m²',
      cooling: '4.8°C to 6.5°C ceiling delta',
      plants: 'Native sedums, wild grasses, Aloe vera'
    },
    description: 'Campus-scale living roofs engineered to capture up to 70% of stormwater runoff during intense monsoons while dramatically lowering the urban heat island effect.',
    caption: 'Illustrative Institutional Showcase • Stormwater mitigation and educational green infrastructure.'
  },
  {
    id: 'poll-01',
    title: 'Urban Pollinator & Sparrow Sanctuary',
    category: 'pollinator',
    categoryLabel: 'Pollinator Sanctuaries',
    image: '/images/green-roofs/pollinator-sedum-carpet.jpg',
    alt: 'Extensive flowering sedum carpet buzzing with native butterflies, bees, and sparrow hydration points',
    specs: {
      depth: '60-80 mm micro-layer',
      load: '55-75 kg/m²',
      cooling: '3.8°C to 5.2°C surface delta',
      plants: 'Portulaca grandiflora, Lantana, Marigold'
    },
    description: 'Ultra-lightweight drought-hardy sedum and wild flowering carpet integrated with terracotta Pakshi Jalpatra (bird water pots) to revive sparrow and pollinator populations.',
    caption: 'Illustrative Pollinator Showcase • Restoring urban biodiversity and supporting local wildlife corridors.'
  }
];

export const GreenRoofs: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSelected = searchParams.get('select') || MOCK_SERVICES[0].id;

  const { addEnquiry } = useStore();

  // Calculator State
  const [roofArea, setRoofArea] = useState<number>(500);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialSelected);
  const [selectedCity, setSelectedCity] = useState<string>('Bengaluru');

  // Showcase Gallery State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [featuredShowcaseId, setFeaturedShowcaseId] = useState<string>('res-01');

  // Before/After Case Study State
  const [caseStudyTab, setCaseStudyTab] = useState<'after' | 'before'>('after');

  // Enquiry Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Bengaluru',
    buildingType: 'Residential Villa',
    roofArea: '500',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const selectedService =
    MOCK_SERVICES.find((s) => s.id === selectedServiceId) || MOCK_SERVICES[0];

  // Calculations
  const estimatedCost = roofArea * selectedService.pricePerSqFt;
  const estimatedWaterSaved = Math.round(roofArea * 92); // Litres/year based on Indian monsoon avg
  const estimatedCo2Offset = Math.round(roofArea * 2.4); // kg/year
  const estimatedAcSaving = Math.round(roofArea * 28); // INR/year saved in electricity

  const filteredShowcase =
    selectedCategory === 'all'
      ? ARCHITECTURAL_SHOWCASE
      : ARCHITECTURAL_SHOWCASE.filter((item) => item.category === selectedCategory);

  const featuredItem =
    ARCHITECTURAL_SHOWCASE.find((item) => item.id === featuredShowcaseId) ||
    filteredShowcase[0] ||
    ARCHITECTURAL_SHOWCASE[0];

  const beforeAfterCaseStudy = {
    title: 'Indiranagar Urban Residential Terrace',
    subtitle: 'Demonstration Case Study • Indian RCC Villa Slab',
    area: '650 sq.ft Living Roof',
    city: 'Bengaluru, Karnataka',
    beforeImg: '/images/green-roofs/case-study-before-concrete.jpg',
    afterImg: '/images/green-roofs/case-study-after-living-roof.jpg',
    beforeAlt: 'Bare concrete roof slab exposed to harsh sun before green roof installation',
    afterAlt: 'Completed green roof with dense sedum, vegetable planters, and solar shade',
    beforeNote: 'Uninsulated RCC slab surface temperature exceeded 54°C during peak dry season, radiating heat into top-floor bedrooms.',
    afterNote: 'Engineered vegetative multi-layer shield reduced ceiling temperature by 5.8°C with zero water seepage after two monsoons.',
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;

    addEnquiry({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      buildingType: formData.buildingType,
      roofArea: `${formData.roofArea} sq.ft`,
      serviceInterest: selectedService.title,
      message: formData.message || 'Requested structural feasibility audit and cost quote.',
    });

    setFormSubmitted(true);
  };

  return (
    <div className="space-y-24 py-12 sm:py-16">
      {/* 1. HEADER */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-dark border border-golden-yellow/40 text-xs font-semibold text-golden-yellow shadow-gold">
            <Layers className="w-3.5 h-3.5" />
            <span>Engineered for Indian RCC Concrete Slabs</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ivory tracking-tight max-w-4xl mx-auto leading-tight">
            Comprehensive Green Roof Solutions
          </h1>

          <p className="text-base sm:text-lg text-ivory-dark max-w-2xl mx-auto leading-relaxed">
            From ultra-lightweight sedum blankets to high-yield edible agro-roofs and commercial biosolar envelopes. Turn barren heat islands into living, breathing assets.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a href="#calculator" className="btn-primary text-xs px-6 py-3">
              Open Cost & Cooling Calculator
            </a>
            <a href="#audit-form" className="btn-secondary text-xs px-6 py-3">
              Request Site Engineering Audit
            </a>
          </div>
        </div>
      </section>

      {/* 2. FOUR DETAILED SERVICE TIERS */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="badge-emerald">System Architectures</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory">
              Choose the Perfect System for Your Roof
            </h2>
            <p className="text-sm text-ivory-dark">
              Every system includes waterproofing root barriers, lightweight growth substrate, and precision micro-drip manifolds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="card-3d flex flex-col justify-between overflow-hidden p-0 group"
              >
                <div>
                  {/* Top Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-forest-deeper">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="badge-gold">
                        ₹{srv.pricePerSqFt} / sq.ft
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="badge-emerald text-[11px]">
                        {srv.coolingEffect}
                      </span>
                      <span className="text-ivory-muted bg-forest-deeper/80 px-2 py-0.5 rounded text-[10px]">
                        {srv.maintenanceLevel} Care
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-xs font-mono text-leaf-light font-semibold block">
                        {srv.idealFor}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-ivory mt-1">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-ivory-dark mt-2 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    {/* Weight & Drainage Specs */}
                    <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-forest-deeper/70 border border-emerald/20 text-xs">
                      <div>
                        <span className="text-ivory-muted text-[10px] block">Weight Load</span>
                        <span className="font-semibold text-ivory">{srv.weightLoad}</span>
                      </div>
                      <div>
                        <span className="text-ivory-muted text-[10px] block">Rain Retention</span>
                        <span className="font-semibold text-leaf-light">{srv.waterRetention}</span>
                      </div>
                    </div>

                    {/* Feature Bullets */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-xs font-bold text-golden-yellow block">Key Features:</span>
                      {srv.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-ivory-dark">
                          <Check className="w-3.5 h-3.5 text-golden-yellow shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 mt-4 border-t border-emerald/20 flex items-center justify-between">
                  <span className="text-xs text-ivory-muted">
                    Plants: {srv.suitablePlants.slice(0, 2).join(', ')}...
                  </span>
                  <a
                    href="#calculator"
                    onClick={() => setSelectedServiceId(srv.id)}
                    className="btn-primary text-xs px-4 py-2"
                  >
                    Calculate Cost
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE COMPARISONS MATRIX */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="badge-gold">Side-by-Side Comparison</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory">
              Green Roof Systems Technical Comparison
            </h2>
            <p className="text-sm text-ivory-dark">
              Compare structural load engineering, thermal insulation efficiency, and monsoon water retention.
            </p>
          </div>

          <div className="rounded-3xl bg-[#042416]/90 border border-golden-yellow/30 shadow-sculpted overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-ivory-dark border-collapse">
                <thead>
                  <tr className="bg-forest-deeper/90 border-b border-golden-yellow/20 text-golden-yellow uppercase font-mono tracking-wider text-[11px]">
                    <th className="py-4 px-5">System Architecture</th>
                    <th className="py-4 px-4">Slab Load</th>
                    <th className="py-4 px-4">Cooling Effect</th>
                    <th className="py-4 px-4">Water Retention</th>
                    <th className="py-4 px-4">Maintenance</th>
                    <th className="py-4 px-4">Cost / sq.ft</th>
                    <th className="py-4 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald/20">
                  {MOCK_SERVICES.map((srv) => (
                    <tr
                      key={srv.id}
                      className="hover:bg-forest-dark/60 transition-colors"
                    >
                      <td className="py-4 px-5 font-bold text-ivory">
                        <div className="font-serif text-sm text-ivory">{srv.title}</div>
                        <div className="text-[10px] text-leaf-light font-normal">{srv.idealFor}</div>
                      </td>
                      <td className="py-4 px-4 font-mono font-medium text-ivory">
                        {srv.weightLoad}
                      </td>
                      <td className="py-4 px-4">
                        <span className="badge-emerald text-[10px] py-0.5 px-2">
                          {srv.coolingEffect}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-river-light font-medium">
                        {srv.waterRetention}
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-ivory-muted text-[11px]">{srv.maintenanceLevel}</span>
                      </td>
                      <td className="py-4 px-4 font-serif font-bold text-golden-yellow text-sm">
                        ₹{srv.pricePerSqFt}
                      </td>
                      <td className="py-4 px-5 text-right">
                        <a
                          href="#calculator"
                          onClick={() => setSelectedServiceId(srv.id)}
                          className="btn-outline-gold text-[10px] py-1 px-3 inline-flex items-center gap-1"
                        >
                          Select
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-forest-deeper/80 border-t border-emerald/20 text-[11px] text-ivory-muted flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>* Systems are engineered with multi-layer root barriers and ultrasonic leak testing protocols. Estimates are demonstrative.</span>
              <a href="#audit-form" className="text-golden-yellow hover:underline font-semibold">
                Request On-Site Structural Slab Survey →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LIVING ARCHITECTURE: URBAN ROOFTOP SHOWCASE */}
      <section id="architectural-showcase" className="relative space-y-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-dark border border-golden-yellow/40 text-xs font-semibold text-golden-yellow shadow-gold">
              <Camera className="w-3.5 h-3.5 text-golden-yellow" />
              <span>Architectural Photography & Living Canopies</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory tracking-tight">
              Living Architecture: Rooftop Showcase
            </h2>
            <p className="text-sm sm:text-base text-ivory-dark leading-relaxed">
              Explore curated examples of residential terrace oases, institutional living canopies, and biosolar cool roofs engineered for Indian urban climates.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All Typologies' },
              { id: 'residential', label: 'Residential Terraces' },
              { id: 'commercial', label: 'Commercial & Institutional' },
              { id: 'agro-farm', label: 'Urban Agro-Farms' },
              { id: 'pollinator', label: 'Pollinator Sanctuaries' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                  selectedCategory === tab.id
                    ? 'bg-golden-yellow text-forest-dark border-golden-yellow font-bold shadow-gold'
                    : 'bg-forest-dark/80 text-ivory border-emerald/30 hover:border-golden-yellow/50 hover:text-golden-yellow'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Featured Editorial Card */}
          <div className="rounded-3xl bg-gradient-to-br from-[#06301d] via-forest-dark to-[#031c11] border border-golden-yellow/30 shadow-sculpted overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Featured Image */}
              <div className="lg:col-span-7 relative group overflow-hidden rounded-2xl bg-forest-deeper aspect-[16/10] border border-emerald/30 shadow-2xl">
                <img
                  src={featuredItem.image}
                  alt={featuredItem.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to high quality green roof photo if local path has issue
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-forest-deeper/90 backdrop-blur-md text-golden-yellow border border-golden-yellow/40 shadow-md">
                    Featured • {featuredItem.categoryLabel}
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-forest-deeper via-forest-deeper/80 to-transparent p-4 text-[11px] text-ivory-dark font-sans">
                  {featuredItem.caption}
                </div>
              </div>

              {/* Featured Details & Specifications */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-golden-yellow font-semibold uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Engineered Ecological Typology</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory mt-1">
                    {featuredItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ivory-dark mt-2 leading-relaxed">
                    {featuredItem.description}
                  </p>
                </div>

                {/* Technical Specs 2x2 Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-forest-deeper/70 border border-emerald/25 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-golden-yellow tracking-wider block">
                      Substrate Depth
                    </span>
                    <span className="text-xs font-bold text-ivory">
                      {featuredItem.specs.depth}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-forest-deeper/70 border border-emerald/25 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-golden-yellow tracking-wider block">
                      Structural Load
                    </span>
                    <span className="text-xs font-bold text-leaf-light">
                      {featuredItem.specs.load}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-forest-deeper/70 border border-emerald/25 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-golden-yellow tracking-wider block">
                      Thermal Delta
                    </span>
                    <span className="text-xs font-bold text-golden-yellow">
                      {featuredItem.specs.cooling}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-forest-deeper/70 border border-emerald/25 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-golden-yellow tracking-wider block">
                      Flora Palette
                    </span>
                    <span className="text-[11px] font-medium text-ivory truncate block">
                      {featuredItem.specs.plants}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href="#calculator"
                    className="btn-primary w-full sm:w-auto text-xs px-6 py-3 text-center flex items-center justify-center gap-2 shadow-gold"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Calculate for Your Slab</span>
                  </a>
                  <a
                    href="#audit-form"
                    className="btn-secondary w-full sm:w-auto text-xs px-5 py-3 text-center"
                  >
                    Request Site Survey
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Multi-Card Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredShowcase.map((item) => (
              <div
                key={item.id}
                onClick={() => setFeaturedShowcaseId(item.id)}
                className={`group cursor-pointer rounded-2xl overflow-hidden bg-forest-dark border transition-all duration-300 shadow-nature hover:-translate-y-1 ${
                  featuredItem.id === item.id
                    ? 'border-golden-yellow ring-2 ring-golden-yellow/30'
                    : 'border-emerald/25 hover:border-golden-yellow/60 hover:shadow-gold'
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-forest-deeper">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="badge-river text-[10px] py-0.5 px-2">
                      {item.categoryLabel}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-forest-deeper/80 backdrop-blur-sm text-golden-yellow text-[10px] font-semibold px-2 py-1 rounded-lg">
                    Click to Feature
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="font-serif font-bold text-base text-ivory group-hover:text-golden-yellow transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-ivory-dark line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-ivory-muted border-t border-emerald/20">
                    <span className="text-leaf-light font-medium">{item.specs.cooling}</span>
                    <span className="font-mono text-golden-yellow">{item.specs.load}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3B. PAIRED BEFORE & AFTER TRANSFORMATION CASE STUDY */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-forest-dark border border-emerald/30 p-6 sm:p-10 shadow-nature-lg space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="badge-river">Illustrative Transformation Study</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                Urban RCC Transformation: Before & After
              </h3>
              <p className="text-xs sm:text-sm text-ivory-dark leading-relaxed">
                Representative demonstration showing thermal barrier and ecological revival on standard Indian concrete roof slabs.
              </p>
            </div>

            {/* Before / After Toggle Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setCaseStudyTab('before')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  caseStudyTab === 'before'
                    ? 'bg-amber-700/80 text-white border border-amber-500 shadow-md scale-105'
                    : 'bg-forest-deeper text-ivory-dark border border-emerald/30 hover:text-ivory'
                }`}
              >
                ⚠ View Before (Scorched Concrete Slab)
              </button>
              <button
                type="button"
                onClick={() => setCaseStudyTab('after')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  caseStudyTab === 'after'
                    ? 'bg-golden-yellow text-forest-dark font-black shadow-gold scale-105'
                    : 'bg-forest-deeper text-ivory-dark border border-emerald/30 hover:text-ivory'
                }`}
              >
                ✓ View After (Living Green Roof)
              </button>
            </div>

            {/* Comparison Visual Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-forest-deeper border border-emerald/30 shadow-2xl">
                <img
                  src={caseStudyTab === 'after' ? beforeAfterCaseStudy.afterImg : beforeAfterCaseStudy.beforeImg}
                  alt={caseStudyTab === 'after' ? beforeAfterCaseStudy.afterAlt : beforeAfterCaseStudy.beforeAlt}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      caseStudyTab === 'after'
                        ? 'bg-leaf-green text-forest-dark shadow-md'
                        : 'bg-red-600 text-white shadow-md'
                    }`}
                  >
                    {caseStudyTab === 'after' ? '✓ Post-Transformation Living Canopy' : '⚠ Pre-Installation Concrete Slab'}
                  </span>
                </div>
              </div>

              {/* Case Study Metrics */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <span className="text-xs font-mono text-golden-yellow font-bold uppercase">
                    {beforeAfterCaseStudy.city}
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-ivory mt-1">
                    {beforeAfterCaseStudy.title}
                  </h4>
                  <p className="text-xs text-leaf-light font-medium mt-1">
                    {beforeAfterCaseStudy.subtitle} • {beforeAfterCaseStudy.area}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-forest-deeper/80 border border-emerald/20 space-y-2">
                  <div className="flex items-center gap-2 text-golden-yellow text-xs font-bold">
                    <ThermometerSnowflake className="w-4 h-4" />
                    <span>Thermal Performance Impact</span>
                  </div>
                  <p className="text-xs text-ivory-dark leading-relaxed">
                    {caseStudyTab === 'after' ? beforeAfterCaseStudy.afterNote : beforeAfterCaseStudy.beforeNote}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-ivory-dark">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-leaf-light shrink-0" />
                    <span>Ultrasonic leak testing confirmed 0 moisture dampness</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-leaf-light shrink-0" />
                    <span>Dual elastomeric root barrier installed before planting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-leaf-light shrink-0" />
                    <span>Drip irrigation calibrated to local evapotranspiration</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-forest-deeper/60 border border-golden-yellow/20 text-[11px] text-ivory-muted">
                  <strong>Notice:</strong> Demonstration case study showcasing representative Indian residential terrace performance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SAMPLE PROJECT JOURNEY (5 STEPS) */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="badge-gold">Seamless Execution</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory">
              Your 5-Step Green Roof Journey
            </h2>
            <p className="text-sm text-ivory-dark">
              From the initial structural ultrasonic testing to blooming rooftop handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Structural Load Feasibility',
                desc: 'Ultrasonic testing of RCC slab load capacity and rainwater drainage slope.',
              },
              {
                step: '02',
                title: 'Waterproofing & Root Barrier',
                desc: 'Specialized elastomeric membrane impervious to aggressive roots and pooling water.',
              },
              {
                step: '03',
                title: 'Lightweight Mineral Soil',
                desc: 'Engineered 1:1:1 featherlight substrate enriched with aged Gir cow vermicompost.',
              },
              {
                step: '04',
                title: 'Micro-Drip & IoT Sensors',
                desc: 'Automated solar timer manifold delivering targeted drops with zero wastage.',
              },
              {
                step: '05',
                title: 'Handover & Seasonal Care',
                desc: 'Quarterly agronomist visits, plant health scoring, and sparrow nestbox maintenance.',
              },
            ].map((st, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-forest-dark border border-emerald/20 space-y-3 relative overflow-hidden"
              >
                <div className="font-mono text-2xl font-extrabold text-golden-yellow/40">
                  {st.step}
                </div>
                <h4 className="font-serif font-bold text-sm text-ivory">
                  {st.title}
                </h4>
                <p className="text-xs text-ivory-dark leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE COST & COOLING CALCULATOR */}
      <section id="calculator" className="relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-forest-deeper via-forest-dark to-forest-deeper border border-golden-yellow/40 p-8 sm:p-12 shadow-gold-lg">
            <div className="flex items-center gap-2.5 mb-2">
              <Calculator className="w-5 h-5 text-golden-yellow" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-golden-yellow">
                Interactive Engineering Estimator
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory mb-2">
              Calculate Your Green Roof Cost & Impact
            </h2>
            <p className="text-xs text-ivory-dark mb-8 max-w-xl">
              Adjust your roof dimensions and choose your system to view realistic Indian rupee estimates, energy bill savings, and temperature reduction.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Inputs */}
              <div className="lg:col-span-7 space-y-6">
                {/* Area Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-ivory">Terrace / Slab Area:</span>
                    <span className="text-golden-yellow font-bold text-sm">
                      {roofArea.toLocaleString('en-IN')} sq.ft
                    </span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="5000"
                    step="50"
                    value={roofArea}
                    onChange={(e) => setRoofArea(Number(e.target.value))}
                    className="w-full accent-golden-yellow cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
                    <span>150 sq.ft (Small Terrace)</span>
                    <span>1,500 sq.ft</span>
                    <span>5,000 sq.ft (Commercial)</span>
                  </div>
                </div>

                {/* System Choice */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-ivory block">
                    Select Green Roof System:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {MOCK_SERVICES.map((srv) => (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => setSelectedServiceId(srv.id)}
                        className={`p-3 rounded-xl text-left border text-xs transition-all ${
                          selectedServiceId === srv.id
                            ? 'bg-golden-yellow text-forest-dark border-golden-yellow font-bold shadow-gold'
                            : 'bg-forest-deeper text-ivory border-emerald/30 hover:border-golden-yellow/40'
                        }`}
                      >
                        <div className="line-clamp-1">{srv.title}</div>
                        <div className={`text-[10px] ${selectedServiceId === srv.id ? 'text-forest-deeper' : 'text-golden-yellow'}`}>
                          ₹{srv.pricePerSqFt} / sq.ft
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* City Choice */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-ivory block">
                    City Climate Zone:
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="input-field text-xs py-2.5 bg-forest-deeper"
                  >
                    <option value="Bengaluru">Bengaluru (Moderate Tropical)</option>
                    <option value="Delhi NCR">Delhi NCR (Extreme Composite / Hot Summers)</option>
                    <option value="Mumbai">Mumbai (Coastal Humid)</option>
                    <option value="Pune">Pune (Semi-Arid Tropical)</option>
                    <option value="Jaipur">Jaipur (Hot Semi-Arid)</option>
                    <option value="Hyderabad">Hyderabad (Deccan Plateau)</option>
                    <option value="Chennai">Chennai (Warm Humid)</option>
                  </select>
                </div>
              </div>

              {/* Output Display Card */}
              <div className="lg:col-span-5 rounded-2xl bg-forest-deeper/90 border border-emerald/30 p-6 space-y-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-golden-yellow uppercase block mb-1">
                    ESTIMATED PROJECTION FOR {selectedCity.toUpperCase()}
                  </span>
                  <div className="text-3xl font-serif font-extrabold text-golden-yellow">
                    ₹{estimatedCost.toLocaleString('en-IN')}*
                  </div>
                  <p className="text-[11px] text-ivory-dark mt-0.5">
                    *Turnkey implementation including engineering audit, waterproofing & plants.
                  </p>
                </div>

                {/* Impact Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald/20">
                  <div className="p-3 rounded-xl bg-forest-dark/80 border border-emerald/20 space-y-1">
                    <span className="text-[10px] text-ivory-muted block">Indoor Cooling</span>
                    <span className="font-bold text-sm text-leaf-light">
                      {selectedService.coolingEffect.split(' ')[1] || '4°C - 6°C'} Drop
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-forest-dark/80 border border-emerald/20 space-y-1">
                    <span className="text-[10px] text-ivory-muted block">Power Bill Savings</span>
                    <span className="font-bold text-sm text-golden-yellow">
                      ~₹{estimatedAcSaving.toLocaleString('en-IN')} / yr
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-forest-dark/80 border border-emerald/20 space-y-1">
                    <span className="text-[10px] text-ivory-muted block">Rainwater Retained</span>
                    <span className="font-bold text-sm text-river-light">
                      {estimatedWaterSaved.toLocaleString('en-IN')} L / yr
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-forest-dark/80 border border-emerald/20 space-y-1">
                    <span className="text-[10px] text-ivory-muted block">CO₂ Absorbed</span>
                    <span className="font-bold text-sm text-leaf-light">
                      {estimatedCo2Offset} kg / yr
                    </span>
                  </div>
                </div>

                <a
                  href="#audit-form"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      roofArea: String(roofArea),
                      city: selectedCity,
                    }));
                  }}
                  className="btn-primary w-full text-xs py-3.5 flex items-center justify-center gap-2 shadow-gold"
                >
                  <span>Apply Estimation to Feasibility Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WORKING ENQUIRY FORM */}
      <section id="audit-form" className="relative scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-forest-dark border border-emerald/30 p-8 sm:p-12 shadow-nature-lg space-y-8">
            <div className="text-center space-y-2">
              <span className="badge-emerald">Demonstration Feasibility Survey</span>
              <h2 className="font-serif text-3xl font-bold text-ivory">
                Book a Rooftop Feasibility Audit
              </h2>
              <p className="text-xs sm:text-sm text-ivory-dark max-w-lg mx-auto">
                Simulate booking a structural engineering evaluation of terrace load capacity, water runoff, and solar exposure.
              </p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald/20 border border-emerald/40 flex items-center justify-center text-leaf-light">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-golden-yellow">
                  Audit Request Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-ivory-dark max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. An assigned regional agronomist for {formData.city} will contact you at <strong>{formData.phone}</strong> to coordinate the terrace site survey.
                </p>
                <div className="p-3.5 rounded-xl bg-forest-deeper/90 border border-golden-yellow/30 text-xs text-golden-yellow/90 max-w-sm mx-auto">
                  <span>Demo platform: Request successfully recorded in your session state.</span>
                </div>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="btn-secondary text-xs px-6 py-2.5 mt-2"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-ivory">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="input-field text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-ivory">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-ivory">Phone Number (+91) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-ivory">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bengaluru, Pune, Delhi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="input-field text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-ivory">Approx Roof Area (sq.ft)</label>
                    <input
                      type="number"
                      placeholder="e.g. 600"
                      value={formData.roofArea}
                      onChange={(e) => setFormData({ ...formData, roofArea: e.target.value })}
                      className="input-field text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">Building Type</label>
                  <select
                    value={formData.buildingType}
                    onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                    className="input-field text-xs"
                  >
                    <option value="Residential Villa">Residential Independent Villa</option>
                    <option value="Apartment Society Terrace">Apartment Society Common Terrace</option>
                    <option value="Commercial Office Building">Commercial Office Building</option>
                    <option value="Educational / Institutional Campus">Educational / Institutional Campus</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">Specific Requirements or Questions</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about existing waterproofing condition, direct sunlight hours, or desired vegetable types..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-xs py-3.5 flex items-center justify-center gap-2 shadow-gold"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Feasibility Audit Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
