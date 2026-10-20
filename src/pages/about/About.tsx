import React from 'react';
import {
  Sparkles,
  TreeDeciduous,
  Sprout,
  Bird,
  Award,
  Compass,
  Droplets,
  Target,
  CheckCircle2,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: <TreeDeciduous className="w-6 h-6 text-leaf-green" />,
      title: 'Urban Thermal Resiliency',
      description: 'Cooling Indian concrete urban heat islands through lightweight sedum blankets and intensive edible agro-roofs that lower indoor temperatures by up to 6°C.',
      stat: '-6°C Indoor Heat Reduction',
    },
    {
      icon: <Sprout className="w-6 h-6 text-golden-yellow" />,
      title: 'Direct Farmer Sovereignty',
      description: 'Dismantling middlemen exploitation by providing certified Indian organic growers direct, fair-trade access to conscious urban consumers.',
      stat: '100% Direct Remuneration',
    },
    {
      icon: <Bird className="w-6 h-6 text-river-light" />,
      title: 'Indigenous Biodiversity Revival',
      description: 'Creating nationwide safe havens for the endangered Indian House Sparrow (Gauraiya), pollinators, and bees through terracotta water pots and predator-safe nestboxes.',
      stat: '85,000+ Sparrow Nests',
    },
    {
      icon: <Compass className="w-6 h-6 text-emerald-light" />,
      title: 'Citizen Ecological Science',
      description: 'Empowering schools, housing societies, and terrace gardeners with open-source agronomy, seasonal planting calendars, and balcony biodiversity tracking.',
      stat: '46 Indian Cities Active',
    },
  ];

  const nationalTargets = [
    {
      target: '5,000,000 sq.ft',
      label: 'Urban Green Roof Canopies',
      subtext: 'Engineered cooling for RCC flat slabs across Tier 1 & 2 metros',
      icon: <TreeDeciduous className="w-5 h-5 text-leaf-green" />,
    },
    {
      target: '100,000+',
      label: 'Smallholder Organic Growers',
      subtext: 'Fair-trade Jaivik Bharat verification with 48hr direct payouts',
      icon: <Sprout className="w-5 h-5 text-golden-yellow" />,
    },
    {
      target: '2,000,000',
      label: 'Terracotta Water Pots (Jalpatra)',
      subtext: 'Pan-India balcony hydration network for native birds',
      icon: <Droplets className="w-5 h-5 text-river-blue" />,
    },
    {
      target: '500,000 Tons',
      label: 'Annual Urban CO₂ Offset',
      subtext: 'Living rooftop vegetative sinks and indigenous reforestation',
      icon: <Target className="w-5 h-5 text-amber-glow" />,
    },
  ];

  const emblemElements = [
    {
      title: 'Bharat Silhouette Contour',
      color: 'text-golden-yellow',
      borderColor: 'border-golden-yellow/40',
      desc: 'Extruded saffron and golden contour shaped in the iconic map of India, uniting all 28 states under a shared green vision.',
    },
    {
      title: 'The Annadata (Indian Farmer)',
      color: 'text-leaf-light',
      borderColor: 'border-leaf-green/40',
      desc: 'Standing with traditional turban and agricultural hoe, honoring the indigenous cultivators protecting India’s fertile soil.',
    },
    {
      title: 'Eco-House & Ashoka Chakra',
      color: 'text-golden-yellow',
      borderColor: 'border-golden-yellow/40',
      desc: 'Living vegetative roof combined with the Ashoka Chakra solar wheel, harmonizing timeless Indian heritage with clean energy.',
    },
    {
      title: 'Pavitra Nadi (River)',
      color: 'text-river-light',
      borderColor: 'border-river-blue/40',
      desc: 'Curving blue freshwater stream symbolizing river basin revival, rainwater harvesting, and life-giving balcony bird baths.',
    },
    {
      title: 'Surajmukhi (Sunflower)',
      color: 'text-amber-glow',
      borderColor: 'border-amber-500/40',
      desc: 'Blooming golden sunflower facing the morning light, driving pollinator corridors and micro-climate cooling.',
    },
    {
      title: 'Gauraiya & Chital Wildlife',
      color: 'text-ivory',
      borderColor: 'border-emerald/40',
      desc: 'The native Indian House Sparrow and spotted deer coexisting peacefully in restored urban and peri-urban landscapes.',
    },
  ];

  const milestones = [
    {
      year: '2022',
      title: 'The Rooftop Seed',
      desc: 'Agronomists and structural engineers test the first lightweight mineral substrate on 50 heat-scorched terraces in Bengaluru and Pune.',
    },
    {
      year: '2023',
      title: 'Direct Farmer Alliance',
      desc: '120 organic smallholders in Punjab and Maharashtra join forces to bypass middlemen and supply raw compost and heirloom seeds directly.',
    },
    {
      year: '2024',
      title: 'Pakshi Jalpatra Campaign',
      desc: 'Over 25,000 hand-thrown terracotta bird water pots distributed across Delhi NCR and Jaipur during severe summer heatwaves.',
    },
    {
      year: '2026',
      title: 'HARIT National Platform',
      desc: 'A unified digital ecosystem connecting urban citizens, green-roof engineers, organic farmers, and wildlife conservationists nationwide.',
    },
  ];

  const leadership = [
    {
      name: 'Dr. Vikramaditya Rao',
      role: 'National Advisory Director',
      background: 'Former Senior Advisor, Indian Council of Forestry Research & Education (ICFRE)',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Dr. Madhavan Krishnan',
      role: 'Lead Agronomist & Structural Botanist',
      background: 'Pioneer of lightweight mineral substrates for tropical RCC flat slabs',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Sunita Narayanan',
      role: 'Chief of Avian Ecology',
      background: '20+ years researching urban sparrow behavior with Bombay Natural History Society',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Sardar Balvinder Singh',
      role: 'Farmer Producer Alliance Chair',
      background: 'Third-generation organic farmer leading 600+ Punjab organic collectives',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="space-y-24 py-12 sm:py-16 overflow-hidden">
      {/* 1. HERO HEADER */}
      <section className="relative">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-deeper/90 border border-golden-yellow/40 text-xs font-semibold text-golden-yellow shadow-gold">
            <Sparkles className="w-3.5 h-3.5 text-golden-yellow" />
            <span>HARIT — THE STORY OF OUR MISSION</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-ivory tracking-tight max-w-4xl mx-auto leading-tight">
            India’s Mission for Urban Rewilding & Farmer Sovereignty
          </h1>

          <p className="text-base sm:text-lg text-ivory-dark max-w-2xl mx-auto leading-relaxed">
            HARIT was founded on a fundamental ecological principle: our concrete cities cannot remain blistering heat islands, and our organic farmers cannot remain underpaid while safeguarding the nation's soil and health.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-dark/80 border border-emerald/30 text-leaf-light">
              <ShieldCheck className="w-4 h-4 text-leaf-green" />
              <span>Jaivik Bharat Aligned</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-dark/80 border border-golden-yellow/30 text-golden-yellow">
              <Award className="w-4 h-4 text-golden-yellow" />
              <span>Aligned with IGBC Green Building Guidelines</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 2030 NATIONAL TARGETS STRIP */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#06321f] via-forest-deeper to-[#031c11] border border-golden-yellow/30 p-8 sm:p-10 shadow-sculpted">
            <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
              <span className="text-xs uppercase font-mono tracking-widest text-golden-yellow font-bold">
                NATIONAL VISION 2030
              </span>
              <h3 className="font-serif text-2xl font-bold text-ivory">
                Quantifiable Environmental Benchmarks
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {nationalTargets.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#042416]/80 border border-emerald/30 shadow-clay-extrusion space-y-2 text-center sm:text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-forest-deeper border border-golden-yellow/30 flex items-center justify-center mx-auto sm:mx-0 shadow-sm">
                    {item.icon}
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-black text-golden-yellow">
                    {item.target}
                  </div>
                  <div className="text-xs font-bold text-ivory">
                    {item.label}
                  </div>
                  <p className="text-[11px] text-ivory-dark leading-relaxed">
                    {item.subtext}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE BRAND EMBLEM & SACRED NATURE WORLD */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-sculpted p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Official Master Logo Pedestal */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-[#042416] rounded-3xl border border-golden-yellow/40 shadow-clay-extrusion text-center space-y-5">
              <div className="relative flex items-center justify-center py-2">
                <BrandLogo size="2xl" showWordmark={false} isLink={false} />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl font-black text-golden-yellow tracking-wide">
                  The Sacred Circle of Life
                </h3>
                <p className="text-xs text-ivory-dark">
                  Official Master Brand Emblem of HARIT
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-golden-yellow/15 border border-golden-yellow/40 text-[10px] text-golden-yellow font-mono font-bold mt-2">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Symbol of Indian Ecological Sovereignty</span>
                </div>
              </div>
            </div>

            {/* Right: Detailed Symbolism Grid */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="badge-emerald mb-1">Brand Identity Philosophy</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                  Every Sculpted Contour Echoes Our Sacred Earth
                </h2>
                <p className="text-xs sm:text-sm text-ivory-dark mt-2 leading-relaxed">
                  The HARIT master emblem was crafted as a 3D sculpted landscape rather than a flat logo, embodying our belief that real environmental transformation requires physical depth, organic materials, and human stewardship.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {emblemElements.map((el, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-forest-deeper/70 border border-emerald/25 space-y-1"
                  >
                    <h4 className={`font-serif font-bold text-xs ${el.color} flex items-center gap-1.5`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-golden-yellow" />
                      {el.title}
                    </h4>
                    <p className="text-[11px] text-ivory-dark leading-relaxed">
                      {el.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUR CORE PILLARS */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="badge-gold">Strategic Framework</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory">
              The Four Pillars of HARIT
            </h2>
            <p className="text-sm text-ivory-dark">
              How our integrated environmental ecosystem drives measurable, long-term impact across Indian landscapes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pill, i) => (
              <div
                key={i}
                className="card-3d p-8 space-y-4 hover:border-golden-yellow/50 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-forest-deeper border border-emerald/30 flex items-center justify-center shadow-nature">
                      {pill.icon}
                    </div>
                    <span className="badge-gold text-[10px] font-mono">
                      {pill.stat}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-ivory">
                    {pill.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ivory-dark leading-relaxed">
                    {pill.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MILESTONE JOURNEY TIMELINE */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="badge-river">Historical Trajectory</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory">
              The Journey of India's Green Mission
            </h2>
            <p className="text-sm text-ivory-dark">
              From an experimental rooftop laboratory in Karnataka to a nationwide citizen movement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-forest-dark border border-emerald/25 space-y-3 relative overflow-hidden group hover:border-golden-yellow/40 transition-colors"
              >
                <div className="text-xs font-mono font-bold text-golden-yellow flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Year {m.year}</span>
                </div>
                <h4 className="font-serif font-bold text-base text-ivory">
                  {m.title}
                </h4>
                <p className="text-xs text-ivory-dark leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LEADERSHIP & ADVISORY TEAM */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="badge-river">Eminent Advisory</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory">
              Guided by Scientists, Agronomists & Farmers
            </h2>
            <p className="text-sm text-ivory-dark">
              Our national steering council unites scientific rigor with grassroots agricultural wisdom.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-forest-dark border border-emerald/20 p-5 space-y-4 shadow-nature text-center group hover:border-golden-yellow/40 transition-colors"
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-golden-yellow/40 shadow-gold">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-ivory">
                    {leader.name}
                  </h4>
                  <p className="text-xs text-golden-yellow font-medium mt-0.5">
                    {leader.role}
                  </p>
                </div>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  {leader.background}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DEMO NOTICE & JOIN BANNER */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-dark via-forest-green to-forest-deeper border border-golden-yellow/40 p-8 sm:p-12 text-center space-y-5 shadow-gold-lg">
            <Award className="w-10 h-10 text-golden-yellow mx-auto" />
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ivory">
              Be Part of India's Green Transformation
            </h3>
            <p className="text-sm text-ivory-dark max-w-xl mx-auto leading-relaxed">
              Whether you are an apartment resident wanting to cool your roof, a citizen putting out water for birds, or an organic farmer seeking direct customers, HARIT is your platform.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link to="/green-roofs" className="btn-primary text-xs px-6 py-3">
                Explore Green Roofs
              </Link>
              <Link to="/contact" className="btn-secondary text-xs px-6 py-3">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
