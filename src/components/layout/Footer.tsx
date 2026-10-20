import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Heart,
  Globe,
  Leaf,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-forest-deeper border-t border-emerald/30 text-ivory pt-16 pb-12 relative overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-golden-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald/20">
          {/* Brand info (2 columns wide) */}
          <div className="lg:col-span-2 space-y-5">
            <BrandLogo size="lg" />
            <p className="text-sm text-ivory-dark max-w-sm leading-relaxed">
              India's premier environmental platform bridging the gap between urban concrete landscapes, verified organic farmers, bird conservation, and sustainable rooftop ecosystems.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="block text-xs uppercase tracking-wider font-semibold text-golden-yellow mb-2">
                Subscribe to HARIT Green Dispatch
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald/20 border border-emerald/40 text-leaf-light text-xs font-medium">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Subscribed! Check your inbox for seasonal planting tips.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="input-field text-xs py-2.5 px-3.5"
                  />
                  <button
                    type="submit"
                    className="btn-primary text-xs px-4 py-2.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Join</span>
                  </button>
                </form>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-forest-dark/80 border border-emerald/30 text-[11px] text-leaf-light">
                <Leaf className="w-3 h-3 text-leaf-green" />
                <span>100% Native Species</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-forest-dark/80 border border-emerald/30 text-[11px] text-golden-yellow">
                <ShieldCheck className="w-3 h-3 text-golden-yellow" />
                <span>Jaivik Bharat Certified</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-forest-dark/80 border border-emerald/30 text-[11px] text-river-light">
                <Award className="w-3 h-3 text-river-blue" />
                <span>IGBC Aligned</span>
              </div>
            </div>
          </div>

          {/* Col 1: Solutions */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-golden-yellow tracking-wide">
              Green Roofs
            </h4>
            <ul className="space-y-2 text-xs text-ivory-dark">
              <li>
                <Link to="/green-roofs" className="hover:text-golden-yellow transition-colors">
                  Extensive Sedum Roofs
                </Link>
              </li>
              <li>
                <Link to="/green-roofs" className="hover:text-golden-yellow transition-colors">
                  Urban Rooftop Agro-Farms
                </Link>
              </li>
              <li>
                <Link to="/green-roofs" className="hover:text-golden-yellow transition-colors">
                  Pollinator Sanctuaries
                </Link>
              </li>
              <li>
                <Link to="/green-roofs" className="hover:text-golden-yellow transition-colors">
                  Commercial Biosolar Cool Roofs
                </Link>
              </li>
              <li>
                <Link to="/green-roofs#calculator" className="hover:text-golden-yellow transition-colors">
                  Rooftop Cost Calculator
                </Link>
              </li>
              <li>
                <Link to="/green-roofs#audit" className="hover:text-golden-yellow transition-colors">
                  Structural Load Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Marketplace & Conservation */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-golden-yellow tracking-wide">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs text-ivory-dark">
              <li>
                <Link to="/farmer-market" className="hover:text-golden-yellow transition-colors">
                  Direct Organic Farmers
                </Link>
              </li>
              <li>
                <Link to="/farmer-market" className="hover:text-golden-yellow transition-colors">
                  Desi Heirloom Seed Kits
                </Link>
              </li>
              <li>
                <Link to="/eco-store" className="hover:text-golden-yellow transition-colors">
                  Pakshi Jalpatra (Clay Water Pots)
                </Link>
              </li>
              <li>
                <Link to="/eco-store" className="hover:text-golden-yellow transition-colors">
                  Gauraiya Sparrow Nestboxes
                </Link>
              </li>
              <li>
                <Link to="/conservation" className="hover:text-golden-yellow transition-colors">
                  Urban Bird Conservation
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="hover:text-golden-yellow transition-colors">
                  Community Action Drives
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Knowledge & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-golden-yellow tracking-wide">
              Directorate & Hubs
            </h4>
            <div className="space-y-2.5 text-xs text-ivory-dark">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-golden-yellow shrink-0 mt-0.5" />
                <span>
                  National Initiative Desk: Environmental Research Block, Lodhi Institutional Area, New Delhi 110003
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-golden-yellow shrink-0" />
                <span>Demo Citizen Helpline: +91 (11) 2468-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-golden-yellow shrink-0" />
                <span>contact@haritmission.demo.in</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-golden-yellow hover:underline"
                >
                  <Globe className="w-3 h-3" />
                  <span>View All Regional Centers (Bengaluru, Pune, Jaipur)</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Demonstration Disclaimers */}
        <div className="pt-8 pb-4 text-xs text-ivory-muted/70 space-y-3 border-b border-emerald/15">
          <div className="p-3.5 rounded-xl bg-forest-dark/60 border border-golden-yellow/20 text-golden-yellow/90">
            <p className="font-semibold mb-0.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-golden-yellow" />
              <span>OFFICIAL DEMO NOTICE & ENVIRONMENTAL DISCLAIMER</span>
            </p>
            <p className="text-[11px] text-ivory-dark leading-relaxed">
              HARIT — India's Green Mission is presented here as a frontend design simulation. All farmer listings, project milestones, metrics, and checkout workflows utilize local sample demonstration data. No financial transactions, commercial contracts, or government affiliations are executed via this demo build.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-muted">
          <div className="flex items-center gap-1">
            <span>© {CURRENT_YEAR} HARIT — India's Green Mission. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 mx-0.5 inline" />
            <span>for Indian Biodiversity.</span>
          </div>

          <div className="flex items-center gap-5">
            <Link to="/about" className="hover:text-golden-yellow transition-colors">
              About Mission
            </Link>
            <Link to="/education" className="hover:text-golden-yellow transition-colors">
              Research & Agronomy
            </Link>
            <Link to="/contact" className="hover:text-golden-yellow transition-colors">
              Contact Us
            </Link>
            <Link to="/login" className="hover:text-golden-yellow transition-colors">
              Demo Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
