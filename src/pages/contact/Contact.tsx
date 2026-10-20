import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  ChevronDown,
  Clock,
} from 'lucide-react';
import { useStore } from '@/store';

export const Contact: React.FC = () => {
  const { addEnquiry } = useStore();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    serviceInterest: 'Green Roof Consultation',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    addEnquiry({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || '+91 99999 00000',
      city: formData.city || 'National',
      serviceInterest: formData.serviceInterest,
      message: formData.message || 'Direct message submitted from Contact page.',
    });

    setSubmitted(true);
  };

  const offices = [
    {
      title: 'National Initiative Desk (North)',
      address: 'Environmental Directorate Block, Lodhi Institutional Area, New Delhi 110003',
      phone: '+91 (011) 2436-XXXX (Demo)',
      email: 'delhi.desk@haritmission.demo.in',
      hours: 'Mon - Fri: 9:00 AM - 6:00 PM',
    },
    {
      title: 'Southern Technical Center',
      address: 'Indiranagar Urban Ecology Hub, 100ft Road, Bengaluru, Karnataka 560038',
      phone: '+91 (080) 4125-XXXX (Demo)',
      email: 'bengaluru.hub@haritmission.demo.in',
      hours: 'Mon - Sat: 9:30 AM - 6:30 PM',
    },
    {
      title: 'Western Agronomy & Farmer Lab',
      address: 'Koregaon Park Agro-Sanctuary, North Main Road, Pune, Maharashtra 411001',
      phone: '+91 (020) 2615-XXXX (Demo)',
      email: 'pune.agronomy@haritmission.demo.in',
      hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    },
  ];

  const faqs = [
    {
      q: 'Will a green roof cause water leakage or dampness in my top-floor ceilings?',
      a: 'Never when installed according to HARIT standards. We install a dual-layer seamless elastomeric waterproofing membrane and heavy-duty root barrier before any soil or drainage layers are placed. Every project includes an ultrasonic leak test prior to handover.',
    },
    {
      q: 'How heavy is a green roof? Can standard Indian RCC slabs bear the weight?',
      a: 'Our Extensive Sedum Micro-Roof weighs only 60 to 85 kg/m²—well below standard Indian residential RCC slab live load ratings of 150 to 250 kg/m². For Intensive Agro-Farms, our certified structural engineer conducts an ultrasonic load audit before designing planter placement.',
    },
    {
      q: 'How are farmer products dispatched and packaged?',
      a: 'Farmer marketplace items are traceably packed at farm-gate collection points in certified breathable cotton bags and cardboard crates without single-use plastics. Jaivik Bharat escrow guarantees farmer payout upon safe delivery.',
    },
    {
      q: 'How high can I hang the Gauraiya sparrow nestbox?',
      a: 'Sparrows naturally nest between 8 to 14 feet above ground, but will readily occupy apartment balconies up to the 15th floor if provided with a steady supply of fresh water and small seeds like foxtail millet (Kangni).',
    },
  ];

  return (
    <div className="space-y-24 py-12 sm:py-16">
      {/* 1. HEADER */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-deeper/90 border border-golden-yellow/40 text-xs font-semibold text-golden-yellow shadow-gold">
            <Mail className="w-3.5 h-3.5 text-golden-yellow" />
            <span>HARIT INITIATIVE — NATIONAL SUPPORT & REGIONAL DEMO HUBS</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-ivory tracking-tight max-w-4xl mx-auto leading-tight">
            Connect with the HARIT Initiative
          </h1>

          <p className="text-base sm:text-lg text-ivory-dark max-w-2xl mx-auto leading-relaxed">
            Have questions regarding rooftop structural feasibility, organic farmer onboarding, or citizen bird conservation campaigns? Reach out to our regional agronomy centers.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-dark border border-golden-yellow/30 text-golden-yellow">
              <Phone className="w-4 h-4 text-golden-yellow" />
              <span>Demo Helpline: +91 (11) 2468-XXXX</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-dark border border-emerald/30 text-leaf-light">
              <Clock className="w-4 h-4 text-leaf-green" />
              <span>24-Hour Regional Response</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FORM & REGIONAL CENTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 rounded-3xl bg-forest-dark border border-emerald/30 p-8 sm:p-10 shadow-nature-lg space-y-6">
            <div>
              <span className="badge-emerald">Demonstration Desk</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory mt-1">
                Send an Enquiry (Simulation)
              </h3>
              <p className="text-xs text-ivory-dark mt-1">
                Submit your query to simulate our regional dispatch routing. All submissions record directly to local demo state.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald/20 border border-emerald/40 flex items-center justify-center text-leaf-light">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-golden-yellow">
                  Enquiry Successfully Dispatched!
                </h4>
                <p className="text-xs sm:text-sm text-ivory-dark max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. A case reference has been created and recorded in your local demo store state.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary text-xs px-6 py-2.5 mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-ivory">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alok Verma"
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
                      placeholder="e.g. alok@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-ivory">Phone (+91) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98110 12345"
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
                      placeholder="e.g. New Delhi, Bengaluru, Pune"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="input-field text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">Subject / Area of Interest</label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="input-field text-xs"
                  >
                    <option value="Green Roof Consultation">Residential Green Roof Consultation</option>
                    <option value="Commercial Biosolar Roof">Commercial Biosolar Rooftop Contract</option>
                    <option value="Farmer Producer Onboarding">Farmer Collective / Producer Onboarding</option>
                    <option value="Avian & Bird Conservation">Bird Nestbox & Hydration Drive Partnership</option>
                    <option value="Media & Academic Research">Media, Agronomy & Academic Research</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about your query, terrace dimensions, or society location..."
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
                  <span>Submit Demonstration Enquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Regional Hub Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-xl font-bold text-ivory pb-2">
              Regional Knowledge & Demonstration Hubs
            </h3>

            {offices.map((off, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-forest-dark border border-emerald/20 space-y-2.5 shadow-nature"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-golden-yellow">
                    {off.title}
                  </h4>
                  <span className="text-[10px] text-leaf-light font-mono bg-forest-deeper px-2 py-0.5 rounded">
                    Active Center
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-ivory-dark">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-golden-yellow shrink-0 mt-0.5" />
                    <span>{off.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-leaf-light shrink-0" />
                    <span>{off.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-river-light shrink-0" />
                    <span>{off.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-ivory-muted pt-1">
                    <Clock className="w-3 h-3 text-ivory-muted shrink-0" />
                    <span>{off.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="badge-gold">Clarifications & Standards</span>
          <h2 className="font-serif text-3xl font-bold text-ivory">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-ivory-dark">
            Everything you need to know about structural safety, water protection, and farmer trade.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl bg-forest-dark border border-emerald/25 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-base text-ivory hover:text-golden-yellow"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-golden-yellow shrink-0 transition-transform duration-300 ${
                    openFaqIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openFaqIndex === i && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-ivory-dark leading-relaxed border-t border-emerald/15 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
