import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  X,
  Send,
  Check,
} from 'lucide-react';
import { useStore } from '@/store';
import type { Campaign } from '@/types';

export const Campaigns: React.FC = () => {
  const { campaigns, toggleJoinCampaign } = useStore();

  const [selectedCampaignForModal, setSelectedCampaignForModal] = useState<Campaign | null>(null);
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerCity, setVolunteerCity] = useState('');
  const [volunteerRole, setVolunteerRole] = useState('Balcony Host');
  const [volunteerSuccess, setVolunteerSuccess] = useState(false);
  const [rsvpdEvents, setRsvpdEvents] = useState<string[]>([]);

  const toggleRsvp = (eventTitle: string) => {
    setRsvpdEvents((prev) =>
      prev.includes(eventTitle)
        ? prev.filter((t) => t !== eventTitle)
        : [...prev, eventTitle]
    );
  };

  const handleJoinModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaignForModal) return;

    if (!selectedCampaignForModal.joined) {
      toggleJoinCampaign(selectedCampaignForModal.id);
    }

    setVolunteerSuccess(true);
    setTimeout(() => {
      setVolunteerSuccess(false);
      setSelectedCampaignForModal(null);
      setVolunteerName('');
      setVolunteerCity('');
    }, 2800);
  };

  const upcomingEvents = [
    {
      title: 'Bangalore Cubbon Park Gauraiya Nestbox Distribution',
      date: 'Saturday, 24 Oct 2026',
      time: '08:30 AM - 11:30 AM',
      location: 'Cubbon Park Bandstand, Bengaluru',
      type: 'Nestbox & Clay Water Pot Handout',
    },
    {
      title: 'Delhi Ridge Native Miyawaki Sapling Planting',
      date: 'Sunday, 01 Nov 2026',
      time: '07:00 AM - 10:00 AM',
      location: 'Northern Ridge Forest Buffer, New Delhi',
      type: '1,500 Native Trees Plantation Drive',
    },
    {
      title: 'Pune Rooftop Solar-Greening Community Workshop',
      date: 'Saturday, 07 Nov 2026',
      time: '04:00 PM - 06:30 PM',
      location: 'Aundh Citizen Center, Pune',
      type: 'Technical Slab Audit Q&A',
    },
  ];

  return (
    <div className="space-y-24 py-12 sm:py-16">
      {/* 1. HEADER */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-deeper/90 border border-golden-yellow/40 text-xs font-semibold text-golden-yellow shadow-gold">
            <Users className="w-3.5 h-3.5 text-golden-yellow" />
            <span>HARIT CITIZEN ALLIANCE — PAN-INDIA CONSERVATION MISSIONS</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-ivory tracking-tight max-w-4xl mx-auto leading-tight">
            Pan-India Citizen Action Campaigns
          </h1>

          <p className="text-base sm:text-lg text-ivory-dark max-w-2xl mx-auto leading-relaxed">
            Collaborate with thousands of urban citizens, residential welfare associations, and nature societies to scale green roofs, water bowls, and native forests across Indian cities.
          </p>
        </div>
      </section>

      {/* 2. CAMPAIGNS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {campaigns.map((camp) => {
            const percentage = Math.min(
              100,
              Math.round((camp.currentCount / camp.targetCount) * 100)
            );

            return (
              <div
                key={camp.id}
                className="card-3d flex flex-col justify-between overflow-hidden p-0 group"
              >
                <div>
                  {/* Image */}
                  <div className="aspect-[16/9] w-full overflow-hidden bg-forest-deeper relative">
                    <img
                      src={camp.image}
                      alt={camp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-transparent to-transparent opacity-80" />
                    <div className="absolute top-3 left-3">
                      <span className="badge-emerald text-[11px]">
                        {camp.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                      <span className="text-ivory-dark bg-forest-deeper/80 px-2.5 py-1 rounded-lg">
                        {camp.location}
                      </span>
                      <span className="text-golden-yellow font-bold">
                        Target: {camp.endDate}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-serif text-xl font-bold text-ivory group-hover:text-golden-yellow transition-colors">
                      {camp.title}
                    </h3>

                    <p className="text-xs text-ivory-dark leading-relaxed">
                      {camp.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-ivory font-bold">
                          {camp.currentCount.toLocaleString('en-IN')} {camp.unit}
                        </span>
                        <span className="text-golden-yellow font-mono">
                          {percentage}% Goal
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-forest-deeper overflow-hidden border border-emerald/30">
                        <div
                          className="h-full bg-gradient-to-r from-leaf-green to-golden-yellow transition-all duration-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-ivory-muted">
                        <span>Organized by {camp.organizer}</span>
                        <span>Goal: {camp.targetCount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1 pt-2">
                      <span className="text-[11px] font-bold text-golden-yellow uppercase block">
                        Verified Milestones:
                      </span>
                      {camp.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-ivory-dark">
                          <Check className="w-3.5 h-3.5 text-leaf-light shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 mt-2 flex items-center justify-between border-t border-emerald/20">
                  <span className="text-xs text-leaf-light font-medium">
                    {camp.joined ? '✓ You are a Green Champion' : 'Open for Volunteers'}
                  </span>

                  <button
                    onClick={() => {
                      if (camp.joined) {
                        toggleJoinCampaign(camp.id);
                      } else {
                        setSelectedCampaignForModal(camp);
                      }
                    }}
                    className={`text-xs px-4 py-2.5 rounded-xl font-bold transition-all ${
                      camp.joined
                        ? 'bg-emerald/30 border border-leaf-light text-leaf-light hover:bg-red-500/20 hover:text-red-300'
                        : 'btn-primary'
                    }`}
                  >
                    {camp.joined ? 'Leave Campaign' : 'Join as Green Champion'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. UPCOMING CITIZEN DISTRIBUTION & PLANTING DRIVES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="badge-river">On-Ground Drives</span>
          <h2 className="font-serif text-3xl font-bold text-ivory">
            Upcoming Weekend Field Events
          </h2>
          <p className="text-sm text-ivory-dark">
            Participate in free nestbox distribution drives and Miyawaki urban forest plantations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((evt, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-forest-dark border border-emerald/25 space-y-4 shadow-nature flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="badge-gold text-[10px]">{evt.type}</span>
                <h4 className="font-serif font-bold text-base text-ivory">
                  {evt.title}
                </h4>
                <div className="space-y-1.5 text-xs text-ivory-dark">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-golden-yellow" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-leaf-light" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald/20 flex items-center justify-between">
                <span className="text-[11px] text-ivory-muted">Free Public Admission</span>
                <button
                  onClick={() => toggleRsvp(evt.title)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                    rsvpdEvents.includes(evt.title)
                      ? 'bg-emerald/30 border border-leaf-light text-leaf-light'
                      : 'btn-outline-gold'
                  }`}
                >
                  {rsvpdEvents.includes(evt.title) ? '✓ Registered' : 'RSVP Free'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. JOIN CAMPAIGN VOLUNTEER MODAL */}
      {selectedCampaignForModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-forest-dark border border-golden-yellow/40 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-ivory space-y-6 relative">
            <button
              onClick={() => setSelectedCampaignForModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-ivory-muted hover:text-golden-yellow bg-forest-deeper"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="badge-gold">Green Champion Pledge</span>
              <h3 className="font-serif text-2xl font-bold text-ivory mt-1">
                Join {selectedCampaignForModal.title}
              </h3>
              <p className="text-xs text-ivory-dark mt-1">
                Your pledge helps us coordinate distribution points and verify habitat survival rates.
              </p>
            </div>

            {volunteerSuccess ? (
              <div className="p-4 rounded-xl bg-emerald/20 border border-emerald/40 text-leaf-light text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>You are now a registered Green Champion! The campaign counter has been updated.</span>
              </div>
            ) : (
              <form onSubmit={handleJoinModalSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sen"
                    value={volunteerName}
                    onChange={(e) => setVolunteerName(e.target.value)}
                    className="input-field text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">City / Ward *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Indiranagar, Bengaluru"
                    value={volunteerCity}
                    onChange={(e) => setVolunteerCity(e.target.value)}
                    className="input-field text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">How will you participate?</label>
                  <select
                    value={volunteerRole}
                    onChange={(e) => setVolunteerRole(e.target.value)}
                    className="input-field text-xs"
                  >
                    <option value="Balcony Host">Host a Balcony Water Bowl & Nestbox</option>
                    <option value="Society Coordinator">Coordinate with my Apartment RWA</option>
                    <option value="Weekend Volunteer">Volunteer at Weekend Distribution Drives</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-xs py-3 flex items-center justify-center gap-2 shadow-gold"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm Campaign Participation</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
