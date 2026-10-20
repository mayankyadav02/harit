import React, { useState } from 'react';
import {
  Layers,
  TrendingUp,
  Droplets,
  Bird,
  CheckCircle2,
  Clock,
  Check,
  ThermometerSnowflake,
  Wifi,
  BatteryCharging,
  Plus,
  X,
  Maximize2,
  ShieldCheck,
  Download,
  Activity,
} from 'lucide-react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { useStore } from '@/store';
import { Link } from 'react-router-dom';
import type { ProjectOrder } from '@/types';

export const CustomerDashboard: React.FC = () => {
  const { projects, currentUser, addCustomerProject } = useStore();

  // Telemetry Modal state
  const [selectedProjectForTelemetry, setSelectedProjectForTelemetry] = useState<ProjectOrder | null>(null);
  const [probeCalibrated, setProbeCalibrated] = useState(false);

  // Order Details Modal state
  const [selectedOrderModal, setSelectedOrderModal] = useState<any | null>(null);
  const [downloadInvoiceNotice, setDownloadInvoiceNotice] = useState(false);

  // New Project Modal state
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [newProjectArea, setNewProjectArea] = useState(500);
  const [newProjectService, setNewProjectService] = useState('Urban Rooftop Agro-Farm & Edible Haven');
  const [newProjectNotes, setNewProjectNotes] = useState('');

  // Photo Gallery Lightbox & Upload state
  const [selectedPhoto, setSelectedPhoto] = useState<{ title: string; date: string; img: string } | null>(null);
  const [uploadPhotoModalOpen, setUploadPhotoModalOpen] = useState(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoImg, setNewPhotoImg] = useState(
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80'
  );

  const [projectPhotos, setProjectPhotos] = useState([
    {
      title: 'Terrace Structural Prep & Root Barrier',
      date: '14 Sep 2026',
      img: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Lightweight Mineral Soil Substrate Layer',
      date: '28 Sep 2026',
      img: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Micro-Drip Manifold & Planting Beds',
      date: '10 Oct 2026',
      img: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Blooming Rooftop Jasmine & Desi Tomatoes',
      date: '16 Oct 2026',
      img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
    },
  ]);

  // Care Reminders
  const [reminders, setReminders] = useState([
    { id: 1, task: 'Refill terracotta balcony bird bath with fresh water', time: 'Today', done: false },
    { id: 2, task: 'Add 2 handfuls of Gir cow vermicompost to tomato planters', time: 'Tomorrow', done: false },
    { id: 3, task: 'Inspect micro-drip manifold timer batteries', time: 'This Weekend', done: true },
    { id: 4, task: 'Schedule quarterly monsoon drainage check with agronomist', time: 'Next Week', done: false },
  ]);
  const [newReminderText, setNewReminderText] = useState('');

  const toggleReminder = (id: number) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r))
    );
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderText.trim()) return;
    setReminders((prev) => [
      ...prev,
      {
        id: Date.now(),
        task: newReminderText.trim(),
        time: 'Pending',
        done: false,
      },
    ]);
    setNewReminderText('');
  };

  const handleUploadPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim()) return;
    setProjectPhotos((prev) => [
      {
        title: newPhotoTitle.trim(),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        img: newPhotoImg,
      },
      ...prev,
    ]);
    setUploadPhotoModalOpen(false);
    setNewPhotoTitle('');
  };

  const handleSimulateNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    const ratePerSqFt = newProjectService.includes('Agro-Farm') ? 340 : 180;
    const totalCost = newProjectArea * ratePerSqFt;

    addCustomerProject({
      title: `${currentUser.city || 'Bengaluru'} Terrace: ${newProjectService}`,
      clientName: currentUser.name,
      clientEmail: currentUser.email,
      city: currentUser.city || 'Bengaluru',
      roofAreaSqFt: newProjectArea,
      serviceType: newProjectService,
      status: 'Survey Scheduled',
      progressPercentage: 15,
      healthScore: 92,
      totalCost,
      paidAmount: Math.round(totalCost * 0.2),
      startDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      estimatedCompletion: 'In 45 Days',
      recentMilestone: 'Structural survey questionnaire submitted',
      nextStep: 'Engineer load-bearing site audit scheduled',
      soilMoisturePct: 70,
      tempReductionC: -4.5,
      irrigationStatus: 'Pending Drip Installation',
      sensorBatteryPct: 100,
    });

    setNewProjectModalOpen(false);
    setNewProjectNotes('');
  };

  // Sample orders for this customer
  const customerOrders = [
    {
      id: 'ord-cust-01',
      orderNumber: 'HR-ORD-9842',
      productName: 'Desi Cow Vermicompost (Khad) 10kg',
      productImg: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=160&q=80',
      quantity: 2,
      price: 380,
      totalAmount: 760,
      sellerName: 'Farmer Rameshwar Patil',
      sellerOrigin: 'Satara, Maharashtra',
      courier: 'Jaivik Green Express',
      trackingCode: 'JG-BLR-88319',
      status: 'In Transit',
      step: 3,
      date: '15 Oct 2026',
    },
    {
      id: 'ord-cust-02',
      orderNumber: 'HR-ORD-9820',
      productName: 'Terracotta Water Pot & Feeder Combo',
      productImg: 'https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=160&q=80',
      quantity: 1,
      price: 640,
      totalAmount: 640,
      sellerName: 'Mitti Shilp Artisans Collective',
      sellerOrigin: 'Jaipur, Rajasthan',
      courier: 'India Post Eco-Parcel',
      trackingCode: 'IP-BLR-40192',
      status: 'Delivered',
      step: 4,
      date: '02 Oct 2026',
    },
  ];

  return (
    <DashboardLayout
      title="Citizen Environmental Dashboard"
      subtitle="Track your terrace green roofs, farm harvest orders, and ecological contribution"
      role="customer"
    >
      {/* 1. DEMO DISCLAIMER & TELEMETRY LIVE BANNER */}
      <div className="rounded-2xl bg-forest-dark border border-emerald/30 p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs shadow-nature">
        <div className="flex items-center gap-2.5">
          <span className="badge-emerald text-[10px] shrink-0 font-bold">
            Simulated Telemetry
          </span>
          <p className="text-ivory-dark">
            Demonstration dashboard for citizen <strong className="text-ivory">{currentUser.name}</strong> ({currentUser.city || 'Bengaluru'}). Micro-climate readings and IoT sensor data are simulated for the HARIT prototype.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] text-golden-yellow">
          <Wifi className="w-3.5 h-3.5 text-leaf-light animate-pulse" />
          <span>IOT HUB: BLR-IND-981 • ONLINE</span>
        </div>
      </div>

      {/* 2. PERSONAL IMPACT SUMMARY CARDS */}
      <section id="impact" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-lg text-ivory">
            My Environmental Footprint
          </h2>
          <span className="text-[11px] font-mono text-golden-yellow">
            Residence: {currentUser.city || 'Bengaluru'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-2">
            <div className="flex items-center justify-between text-leaf-light">
              <span className="text-xs font-semibold text-ivory-dark uppercase font-mono">
                CO₂ Offset
              </span>
              <TrendingUp className="w-4 h-4 text-leaf-green" />
            </div>
            <div className="font-serif text-3xl font-extrabold text-golden-yellow">
              420 kg
            </div>
            <p className="text-[11px] text-ivory-muted">Yearly absorption by terrace canopy</p>
          </div>

          <div className="p-5 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-2">
            <div className="flex items-center justify-between text-river-light">
              <span className="text-xs font-semibold text-ivory-dark uppercase font-mono">
                Rain Retained
              </span>
              <Droplets className="w-4 h-4 text-river-blue" />
            </div>
            <div className="font-serif text-3xl font-extrabold text-golden-yellow">
              3,200 L
            </div>
            <p className="text-[11px] text-ivory-muted">Diverted from city storm drains</p>
          </div>

          <div className="p-5 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-2">
            <div className="flex items-center justify-between text-golden-yellow">
              <span className="text-xs font-semibold text-ivory-dark uppercase font-mono">
                Native Plants
              </span>
              <Layers className="w-4 h-4 text-golden-yellow" />
            </div>
            <div className="font-serif text-3xl font-extrabold text-golden-yellow">
              48 Stems
            </div>
            <p className="text-[11px] text-ivory-muted">Desi veggies & bird host flora</p>
          </div>

          <div className="p-5 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-2">
            <div className="flex items-center justify-between text-leaf-light">
              <span className="text-xs font-semibold text-ivory-dark uppercase font-mono">
                Bird Visits Logged
              </span>
              <Bird className="w-4 h-4 text-leaf-light" />
            </div>
            <div className="font-serif text-3xl font-extrabold text-golden-yellow">
              156 Visits
            </div>
            <p className="text-[11px] text-ivory-muted">Gauraiya sparrows & sunbirds</p>
          </div>
        </div>
      </section>

      {/* 3. MY ACTIVE GREEN ROOF PROJECTS */}
      <section id="projects" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-lg text-ivory">
              My Green Roof Installations ({projects.length})
            </h2>
            <p className="text-xs text-ivory-dark">
              Audited structural engineering, live sensor telemetry and milestone progress
            </p>
          </div>
          <button
            onClick={() => setNewProjectModalOpen(true)}
            className="btn-primary text-xs px-3.5 py-2 flex items-center gap-1.5 shadow-gold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Simulate Another Roof</span>
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="p-10 rounded-3xl bg-forest-dark border border-emerald/20 text-center space-y-3">
            <Layers className="w-10 h-10 text-ivory-muted mx-auto" />
            <h3 className="font-serif font-bold text-lg text-ivory">No Green Roof Projects Yet</h3>
            <p className="text-xs text-ivory-dark max-w-md mx-auto">
              Transform your RCC concrete terrace into a temperature-cooling living oasis with HARIT certified agronomists.
            </p>
            <Link to="/green-roofs#calculator" className="btn-primary text-xs inline-flex items-center gap-2 mt-2">
              Explore Green Roof Services
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-3xl bg-forest-dark border border-emerald/30 p-6 sm:p-8 shadow-nature space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald/20">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-golden-yellow font-bold">
                      {proj.serviceType}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory mt-0.5">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-ivory-dark">
                      Location: {proj.city} • Terrace Area: {proj.roofAreaSqFt} sq.ft • Started: {proj.startDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-ivory-muted block uppercase font-mono">
                        Health Score
                      </span>
                      <span className="font-bold text-leaf-light text-base">
                        {proj.healthScore} / 100
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                        proj.status === 'Active & Blooming'
                          ? 'bg-emerald/30 border-leaf-light text-leaf-light'
                          : 'bg-golden-yellow/20 border-golden-yellow text-golden-yellow'
                      }`}
                    >
                      {proj.status}
                    </span>
                  </div>
                </div>

                {/* Live Sensor Mini Pill Bar */}
                <div className="p-3.5 rounded-2xl bg-forest-deeper/80 border border-emerald/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1.5 text-leaf-light">
                      <Droplets className="w-3.5 h-3.5 text-river-blue" />
                      <span>Soil Moisture: <strong>{proj.soilMoisturePct || 72}% Optimal</strong></span>
                    </span>
                    <span className="flex items-center gap-1.5 text-golden-yellow">
                      <ThermometerSnowflake className="w-3.5 h-3.5" />
                      <span>Cooling Delta: <strong>{proj.tempReductionC || -5.4}°C Ambient</strong></span>
                    </span>
                    <span className="flex items-center gap-1.5 text-ivory-dark">
                      <Clock className="w-3.5 h-3.5 text-leaf-green" />
                      <span>Irrigation: <strong>{proj.irrigationStatus || 'Active • Micro-Drip Online'}</strong></span>
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProjectForTelemetry(proj);
                      setProbeCalibrated(false);
                    }}
                    className="text-xs font-bold text-golden-yellow hover:underline flex items-center gap-1 ml-auto"
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>View Telemetry & Sensor Log ➔</span>
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-ivory">Installation & Commissioning Progress</span>
                    <span className="text-golden-yellow font-mono">{proj.progressPercentage}% Complete</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-forest-deeper overflow-hidden border border-emerald/30">
                    <div
                      className="h-full bg-gradient-to-r from-leaf-green to-golden-yellow transition-all duration-500 rounded-full"
                      style={{ width: `${proj.progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-ivory-muted gap-1 pt-1">
                    <span>Recent: {proj.recentMilestone}</span>
                    <span className="text-golden-yellow font-medium">Next: {proj.nextStep}</span>
                  </div>
                </div>

                {/* Payment Milestones Visualizer */}
                <div className="p-4 rounded-2xl bg-forest-deeper/80 border border-emerald/20 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-ivory">Payment Milestones & Escrow:</span>
                    <span className="font-mono text-golden-yellow font-bold">
                      Paid: ₹{proj.paidAmount.toLocaleString('en-IN')} / ₹{proj.totalCost.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-forest-dark/90 border border-emerald/30 text-xs space-y-1">
                      <div className="flex items-center justify-between text-leaf-light font-bold">
                        <span>Milestone 1 (30%)</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <p className="text-[11px] text-ivory-dark">Structural Load Audit & Waterproofing</p>
                      <span className="text-[10px] text-leaf-light font-mono block">PAID & RELEASED</span>
                    </div>

                    <div
                      className={`p-3 rounded-xl border text-xs space-y-1 ${
                        proj.progressPercentage >= 60
                          ? 'bg-forest-dark/90 border-emerald/30'
                          : 'bg-forest-dark/40 border-emerald/15 opacity-70'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-golden-yellow">
                        <span>Milestone 2 (40%)</span>
                        {proj.progressPercentage >= 60 ? (
                          <CheckCircle2 className="w-4 h-4 text-leaf-light" />
                        ) : (
                          <Clock className="w-4 h-4 text-golden-yellow" />
                        )}
                      </div>
                      <p className="text-[11px] text-ivory-dark">Drainage & Lightweight Mineral Soil</p>
                      <span className="text-[10px] text-golden-yellow font-mono block">
                        {proj.progressPercentage >= 60 ? 'IN ESCROW' : 'SCHEDULED'}
                      </span>
                    </div>

                    <div
                      className={`p-3 rounded-xl border text-xs space-y-1 ${
                        proj.progressPercentage === 100
                          ? 'bg-forest-dark/90 border-emerald/30'
                          : 'bg-forest-dark/40 border-emerald/15 opacity-70'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-river-light">
                        <span>Milestone 3 (30%)</span>
                        {proj.progressPercentage === 100 ? (
                          <CheckCircle2 className="w-4 h-4 text-leaf-light" />
                        ) : (
                          <Clock className="w-4 h-4 text-ivory-muted" />
                        )}
                      </div>
                      <p className="text-[11px] text-ivory-dark">Planting, Drip Setup & Handover</p>
                      <span className="text-[10px] text-ivory-muted font-mono block">
                        {proj.progressPercentage === 100 ? 'FINAL RELEASED' : 'PENDING HANDOVER'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. ORDER TRACKING & REMINDERS (TWO COLUMNS) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Order Tracking */}
        <div id="orders" className="lg:col-span-7 rounded-3xl bg-forest-dark border border-emerald/30 p-6 sm:p-8 shadow-nature space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-ivory">
                Recent Eco-Store & Farm Orders
              </h3>
              <p className="text-xs text-ivory-dark">
                Traceable direct-from-grower harvest deliveries
              </p>
            </div>
            <Link to="/farmer-market" className="text-xs text-golden-yellow hover:underline">
              Shop Marketplace ➔
            </Link>
          </div>

          <div className="space-y-4">
            {customerOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 rounded-2xl bg-forest-deeper/80 border border-emerald/20 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-mono text-golden-yellow font-bold">{ord.orderNumber}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-leaf-light font-semibold">{ord.status}</span>
                    <span className="text-ivory-muted">• {ord.courier}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={ord.productImg}
                    alt={ord.productName}
                    className="w-12 h-12 rounded-xl object-cover bg-forest-dark shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-ivory truncate">
                      {ord.productName}
                    </h4>
                    <p className="text-xs text-ivory-dark">
                      Seller: {ord.sellerName} ({ord.sellerOrigin}) • ₹{ord.totalAmount}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedOrderModal(ord);
                      setDownloadInvoiceNotice(false);
                    }}
                    className="text-xs font-semibold text-golden-yellow hover:underline px-3 py-1.5 rounded-lg bg-forest-dark border border-emerald/30 shrink-0"
                  >
                    View Invoice & Details
                  </button>
                </div>

                {/* Stepper */}
                <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[10px]">
                  <div className="space-y-1">
                    <div className="w-6 h-6 rounded-full bg-leaf-green text-forest-dark flex items-center justify-center font-bold mx-auto">
                      ✓
                    </div>
                    <span className="text-ivory font-semibold block">Placed</span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-6 h-6 rounded-full bg-leaf-green text-forest-dark flex items-center justify-center font-bold mx-auto">
                      ✓
                    </div>
                    <span className="text-ivory font-semibold block">Sourced</span>
                  </div>
                  <div className="space-y-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mx-auto ${
                        ord.step >= 3
                          ? ord.step === 3
                            ? 'bg-golden-yellow text-forest-dark animate-pulse'
                            : 'bg-leaf-green text-forest-dark'
                          : 'bg-forest-dark border border-emerald/30 text-ivory-muted'
                      }`}
                    >
                      {ord.step > 3 ? '✓' : '3'}
                    </div>
                    <span
                      className={`block font-semibold ${
                        ord.step === 3 ? 'text-golden-yellow' : ord.step > 3 ? 'text-ivory' : 'text-ivory-muted'
                      }`}
                    >
                      In Transit
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mx-auto ${
                        ord.step === 4
                          ? 'bg-leaf-green text-forest-dark'
                          : 'bg-forest-dark border border-emerald/30 text-ivory-muted'
                      }`}
                    >
                      {ord.step === 4 ? '✓' : '4'}
                    </div>
                    <span
                      className={`block ${ord.step === 4 ? 'text-leaf-light font-bold' : 'text-ivory-muted'}`}
                    >
                      Delivered
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Upcoming Care Reminders */}
        <div id="reminders" className="lg:col-span-5 rounded-3xl bg-forest-dark border border-emerald/30 p-6 sm:p-8 shadow-nature space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-ivory">
              Terrace Care Reminders
            </h3>
            <span className="text-xs text-golden-yellow font-mono font-bold">
              {reminders.filter((r) => !r.done).length} Pending
            </span>
          </div>

          {/* Quick Add Reminder Form */}
          <form onSubmit={handleAddReminder} className="flex gap-2">
            <input
              type="text"
              placeholder="Add personal task (e.g. prune mint...)"
              value={newReminderText}
              onChange={(e) => setNewReminderText(e.target.value)}
              className="input-field text-xs py-2"
            />
            <button
              type="submit"
              className="btn-primary text-xs px-3 py-2 shrink-0 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>

          <div className="space-y-2.5 max-h-80 overflow-y-auto">
            {reminders.map((r) => (
              <div
                key={r.id}
                onClick={() => toggleReminder(r.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  r.done
                    ? 'bg-forest-deeper/40 border-emerald/10 opacity-60'
                    : 'bg-forest-deeper/80 border-emerald/25 hover:border-golden-yellow/40'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                    r.done
                      ? 'bg-leaf-green border-leaf-green text-forest-dark'
                      : 'border-emerald/40 bg-forest-dark'
                  }`}
                >
                  {r.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1">
                  <span
                    className={`text-xs block ${
                      r.done ? 'line-through text-ivory-muted' : 'text-ivory font-medium'
                    }`}
                  >
                    {r.task}
                  </span>
                  <span className="text-[10px] text-golden-yellow font-mono">
                    {r.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROJECT PHOTO GALLERY */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif font-bold text-lg text-ivory">
              Terrace Project Visual Logs ({projectPhotos.length})
            </h2>
            <p className="text-xs text-ivory-muted">
              Geo-tagged agronomy timeline & rooftop photo documentation
            </p>
          </div>
          <button
            onClick={() => setUploadPhotoModalOpen(true)}
            className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Progress Photo</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projectPhotos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setSelectedPhoto(photo)}
              className="rounded-2xl overflow-hidden bg-forest-dark border border-emerald/20 shadow-nature group cursor-pointer hover:border-golden-yellow/40 transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden bg-forest-deeper relative">
                <img
                  src={photo.img}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-forest-deeper/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 text-golden-yellow drop-shadow" />
                </div>
              </div>
              <div className="p-3.5 space-y-1">
                <h4 className="font-serif font-bold text-xs text-ivory line-clamp-1">
                  {photo.title}
                </h4>
                <span className="text-[10px] text-golden-yellow font-mono block">
                  {photo.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL 1: SENSOR TELEMETRY & AGRONOMY REPORT */}
      {selectedProjectForTelemetry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-forest-dark border border-golden-yellow/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl text-ivory space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProjectForTelemetry(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-ivory-muted hover:text-golden-yellow bg-forest-deeper"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="badge-gold">Live Telemetry Station</span>
              <h3 className="font-serif text-2xl font-bold text-ivory mt-1">
                {selectedProjectForTelemetry.title}
              </h3>
              <p className="text-xs text-ivory-dark mt-0.5">
                Terrace Node #IND-BLR-981 • Agronomist Assigned: Dr. Gayatri Varma
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-forest-deeper border border-emerald/25 space-y-1 text-center">
                <Droplets className="w-5 h-5 text-river-blue mx-auto" />
                <span className="text-[10px] text-ivory-muted block uppercase font-mono">Soil Moisture</span>
                <span className="font-serif font-bold text-lg text-leaf-light">
                  {probeCalibrated ? '74%' : `${selectedProjectForTelemetry.soilMoisturePct || 72}%`}
                </span>
                <span className="text-[9px] text-golden-yellow block font-semibold">Optimal Zone</span>
              </div>

              <div className="p-3.5 rounded-xl bg-forest-deeper border border-emerald/25 space-y-1 text-center">
                <ThermometerSnowflake className="w-5 h-5 text-leaf-light mx-auto" />
                <span className="text-[10px] text-ivory-muted block uppercase font-mono">Cooling Delta</span>
                <span className="font-serif font-bold text-lg text-golden-yellow">
                  {selectedProjectForTelemetry.tempReductionC || -5.4}°C
                </span>
                <span className="text-[9px] text-ivory-muted block">vs Street Tarmac</span>
              </div>

              <div className="p-3.5 rounded-xl bg-forest-deeper border border-emerald/25 space-y-1 text-center">
                <BatteryCharging className="w-5 h-5 text-golden-yellow mx-auto" />
                <span className="text-[10px] text-ivory-muted block uppercase font-mono">IoT Battery</span>
                <span className="font-serif font-bold text-lg text-leaf-light">
                  {selectedProjectForTelemetry.sensorBatteryPct || 96}%
                </span>
                <span className="text-[9px] text-leaf-light block">Solar Powered</span>
              </div>

              <div className="p-3.5 rounded-xl bg-forest-deeper border border-emerald/25 space-y-1 text-center">
                <ShieldCheck className="w-5 h-5 text-river-light mx-auto" />
                <span className="text-[10px] text-ivory-muted block uppercase font-mono">Membrane</span>
                <span className="font-serif font-bold text-lg text-river-light">100%</span>
                <span className="text-[9px] text-leaf-light block">Zero Seepage</span>
              </div>
            </div>

            {/* Agronomist Field Inspection Log */}
            <div className="p-4 rounded-2xl bg-forest-deeper/80 border border-emerald/20 space-y-2 text-xs">
              <span className="font-bold text-golden-yellow font-mono uppercase text-[10px]">
                Latest Agronomist Site Audit Note
              </span>
              <p className="text-ivory-dark leading-relaxed">
                "Root barrier ultrasound performed on 12 Oct 2026 confirms complete watertight integrity across all parapet joints. Organic vermicompost nutrient release rate is well-balanced. Earthworm activity logged at 45 worms / sq.meter. Micro-drip manifold emitters cleaned and pressure regulated."
              </p>
              <div className="pt-2 text-[10px] text-ivory-muted flex justify-between border-t border-emerald/15">
                <span>Inspector: S. Ramanathan, Senior Agro-Ecologist</span>
                <span>Next Scheduled Audit: 15 Nov 2026</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setProbeCalibrated(true)}
                className="btn-primary flex-1 text-xs py-3 flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4" />
                <span>{probeCalibrated ? 'Probe Calibrated ✓ (74% Moisture)' : 'Trigger Telemetry Re-Calibration'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ORDER DETAILS & TAX INVOICE */}
      {selectedOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-forest-dark border border-golden-yellow/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-ivory space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrderModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-ivory-muted hover:text-golden-yellow bg-forest-deeper"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="badge-gold">Demonstration Invoice</span>
                <h3 className="font-serif text-2xl font-bold text-ivory mt-1">
                  Order {selectedOrderModal.orderNumber}
                </h3>
                <p className="text-xs text-ivory-dark">
                  Placed on {selectedOrderModal.date} • Fair-trade verified
                </p>
              </div>
            </div>

            <div className="space-y-3 border-y border-emerald/20 py-4 text-xs">
              <div className="flex justify-between">
                <span className="text-ivory-muted">Producer / Seller:</span>
                <span className="font-semibold text-ivory">{selectedOrderModal.sellerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Dispatch Hub:</span>
                <span className="text-ivory">{selectedOrderModal.sellerOrigin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Logistics Partner:</span>
                <span className="text-leaf-light font-medium">{selectedOrderModal.courier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Courier Tracking Code:</span>
                <span className="font-mono text-golden-yellow">{selectedOrderModal.trackingCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Delivery Destination:</span>
                <span className="text-ivory">Indiranagar, Bengaluru, Karnataka</span>
              </div>
            </div>

            {/* Line items */}
            <div className="p-4 rounded-xl bg-forest-deeper border border-emerald/20 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-ivory pb-2 border-b border-emerald/15">
                <span>{selectedOrderModal.productName} × {selectedOrderModal.quantity}</span>
                <span className="font-mono text-golden-yellow">₹{selectedOrderModal.totalAmount}</span>
              </div>
              <div className="flex justify-between text-ivory-muted pt-1">
                <span>Zero-Carbon Delivery Fee:</span>
                <span className="text-leaf-light font-bold">₹0 (Free / Eco-Subsidized)</span>
              </div>
              <div className="flex justify-between font-bold text-base text-golden-yellow pt-2 border-t border-emerald/15">
                <span>Total Amount Paid:</span>
                <span className="font-mono">₹{selectedOrderModal.totalAmount}</span>
              </div>
            </div>

            {downloadInvoiceNotice && (
              <div className="p-3 rounded-xl bg-emerald/20 border border-emerald/40 text-leaf-light text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Simulated Tax Invoice PDF generated & downloaded in browser memory.</span>
              </div>
            )}

            <button
              onClick={() => setDownloadInvoiceNotice(true)}
              className="btn-primary w-full text-xs py-3 flex items-center justify-center gap-2 shadow-gold"
            >
              <Download className="w-4 h-4" />
              <span>Download Tax Invoice (PDF)</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: SIMULATE NEW GREEN ROOF PROJECT */}
      {newProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-forest-dark border border-golden-yellow/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-ivory space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setNewProjectModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-ivory-muted hover:text-golden-yellow bg-forest-deeper"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="badge-gold">Terrace Installation</span>
              <h3 className="font-serif text-2xl font-bold text-ivory mt-1">
                Simulate New Green Roof Project
              </h3>
              <p className="text-xs text-ivory-dark mt-1">
                Configure your terrace specifications to immediately add a new project to your personal dashboard.
              </p>
            </div>

            <form onSubmit={handleSimulateNewProject} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-ivory">Green Roof Service Type</label>
                <select
                  value={newProjectService}
                  onChange={(e) => setNewProjectService(e.target.value)}
                  className="input-field text-xs"
                >
                  <option value="Urban Rooftop Agro-Farm & Edible Haven">Urban Rooftop Agro-Farm (₹340/sq.ft)</option>
                  <option value="Sedum & Succulent Micro-Roof">Sedum & Succulent Micro-Roof (₹180/sq.ft)</option>
                  <option value="Bio-Shield Native Pollinator Sanctuary">Bio-Shield Pollinator Sanctuary (₹290/sq.ft)</option>
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="font-semibold text-ivory">Terrace Surface Area (Sq.Ft)</label>
                  <span className="font-mono text-golden-yellow font-bold">{newProjectArea} sq.ft</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="3000"
                  step="50"
                  value={newProjectArea}
                  onChange={(e) => setNewProjectArea(Number(e.target.value))}
                  className="w-full accent-golden-yellow cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-forest-deeper border border-emerald/20 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-ivory-muted">Estimated Total Cost:</span>
                  <span className="font-mono font-bold text-golden-yellow text-sm">
                    ₹{(newProjectArea * (newProjectService.includes('Agro-Farm') ? 340 : 180)).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-leaf-light">
                  <span>Initial 20% Escrow Milestone:</span>
                  <span className="font-mono">
                    ₹{Math.round((newProjectArea * (newProjectService.includes('Agro-Farm') ? 340 : 180)) * 0.2).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-ivory">Special Agronomy Requests / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Include native Indian tulsi and rainwater collection outlet"
                  value={newProjectNotes}
                  onChange={(e) => setNewProjectNotes(e.target.value)}
                  className="input-field text-xs"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full text-xs py-3.5 flex items-center justify-center gap-2 shadow-gold"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project to My Dashboard</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: PHOTO LIGHTBOX */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-forest-dark border border-emerald/30 rounded-3xl overflow-hidden shadow-2xl relative text-ivory">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-ivory-muted hover:text-golden-yellow bg-forest-deeper z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[60vh] overflow-hidden bg-forest-deeper">
              <img
                src={selectedPhoto.img}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-5 space-y-1">
              <span className="text-[10px] font-mono text-golden-yellow">{selectedPhoto.date}</span>
              <h3 className="font-serif text-lg font-bold text-ivory">{selectedPhoto.title}</h3>
              <p className="text-xs text-ivory-dark">
                Verified high-resolution inspection upload stored in local demonstration archive.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: UPLOAD PHOTO SIMULATOR */}
      {uploadPhotoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-forest-dark border border-golden-yellow/40 rounded-3xl max-w-md w-full p-6 shadow-2xl text-ivory space-y-5 relative">
            <button
              onClick={() => setUploadPhotoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-ivory-muted hover:text-golden-yellow bg-forest-deeper"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="badge-gold">Terrace Visuals</span>
              <h3 className="font-serif text-xl font-bold text-ivory mt-1">
                Upload Progress Photo
              </h3>
            </div>

            <form onSubmit={handleUploadPhoto} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-ivory">Photo Caption / Milestone Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. First harvest of organic cherry tomatoes"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  className="input-field text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-ivory">Demo Image URL</label>
                <input
                  type="text"
                  value={newPhotoImg}
                  onChange={(e) => setNewPhotoImg(e.target.value)}
                  className="input-field text-xs"
                />
              </div>

              <div className="aspect-video rounded-xl overflow-hidden bg-forest-deeper border border-emerald/20">
                <img
                  src={newPhotoImg}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full text-xs py-3 flex items-center justify-center gap-1.5 shadow-gold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save to Visual Logs</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
