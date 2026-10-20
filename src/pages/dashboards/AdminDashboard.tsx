import React, { useState } from 'react';
import {
  Sprout,
  Layers,
  CreditCard,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Check,
  Search,
  UserCheck,
  UserX,
  X,
  Star,
  Eye,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { useStore } from '@/store';
import type { FarmerSaleRecord } from '@/types';

export const AdminDashboard: React.FC = () => {
  const {
    conservationMetrics,
    farmerSales,
    campaigns,
    allUsers,
    toggleUserVerification,
    allProducts,
    updateFarmerProduct,
    approveFarmerPayoutBatch,
  } = useStore();

  // Analytics toggle
  const [analyticsMetric, setAnalyticsMetric] = useState<'canopy' | 'co2'>('canopy');

  // Payout state
  const [payoutResult, setPayoutResult] = useState<{ count: number; totalAmount: number } | null>(null);

  // User management state
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('all');

  // Order audit state
  const [orderSearch, setOrderSearch] = useState('');
  const [orderAuditFilter, setOrderAuditFilter] = useState<string>('all');
  const [inspectingOrder, setInspectingOrder] = useState<FarmerSaleRecord | null>(null);

  // Product catalog moderation state
  const [productSearch, setProductSearch] = useState('');
  const [productSourceFilter, setProductSourceFilter] = useState<'all' | 'farmer' | 'store'>('all');

  // Sample analytics data for Recharts
  const cityCanopyData = [
    { city: 'Bengaluru', canopySqFt: 185000, co2Tons: 440 },
    { city: 'Delhi NCR', canopySqFt: 342500, co2Tons: 820 },
    { city: 'Pune', canopySqFt: 145000, co2Tons: 350 },
    { city: 'Jaipur', canopySqFt: 98000, co2Tons: 230 },
    { city: 'Hyderabad', canopySqFt: 112000, co2Tons: 270 },
  ];

  // Batch Payout handler
  const handleApprovePayoutBatch = () => {
    const result = approveFarmerPayoutBatch();
    setPayoutResult(result);
    setTimeout(() => setPayoutResult(null), 6000);
  };

  // Filtered Users
  const filteredUsers = allUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      (u.city && u.city.toLowerCase().includes(userSearch.toLowerCase()));
    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  // Filtered Orders for Audit
  const filteredOrders = farmerSales.filter((sale) => {
    const matchesSearch =
      sale.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      sale.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      sale.productName.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderAuditFilter === 'all' || sale.status === orderAuditFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Products for Moderation
  const filteredProducts = allProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.seller.name.toLowerCase().includes(productSearch.toLowerCase());
    const matchesSource = productSourceFilter === 'all' || p.sourceType === productSourceFilter;
    return matchesSearch && matchesSource;
  });

  const pendingPayoutSales = farmerSales.filter((s) => s.payoutStatus !== 'Credited');
  const pendingPayoutTotal = pendingPayoutSales.reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <DashboardLayout
      title="National Directorate Command Center"
      subtitle="Executive environmental impact metrics, farmer escrow approvals, and platform governance"
      role="admin"
    >
      {/* 1. DEMO DISCLAIMER BANNER */}
      <div className="rounded-2xl bg-forest-dark border border-river-blue/40 p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs shadow-nature">
        <div className="flex items-center gap-2.5">
          <span className="badge-river text-[10px] shrink-0 font-bold">
            Executive Command Simulation
          </span>
          <p className="text-ivory-dark">
            National command console. Platform metrics, escrow releases, and community telemetry are simulated demonstration records for the HARIT prototype.
          </p>
        </div>
        <span className="text-[10px] font-mono text-river-light shrink-0 font-bold">
          NATIONAL DIRECTIVE #HARIT-2026-GOV
        </span>
      </div>

      {/* 2. HIGH LEVEL PLATFORM METRICS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-2">
          <div className="flex items-center justify-between text-golden-yellow">
            <span className="text-xs font-semibold text-ivory-dark uppercase font-mono">
              Total Platform GMV
            </span>
            <CreditCard className="w-4 h-4 text-golden-yellow" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-golden-yellow">
            ₹18.4 Lakhs
          </div>
          <p className="text-[11px] text-ivory-muted">Simulated cumulative Jaivik trade</p>
        </div>

        <div className="p-5 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-2">
          <div className="flex items-center justify-between text-leaf-light">
            <span className="text-xs font-semibold text-ivory-dark uppercase font-mono">
              Verified Farmers
            </span>
            <Sprout className="w-4 h-4 text-leaf-green" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-golden-yellow">
            342 Growers
          </div>
          <p className="text-[11px] text-ivory-muted">Across 14 Indian states</p>
        </div>

        <div className="p-5 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-2">
          <div className="flex items-center justify-between text-river-light">
            <span className="text-xs font-semibold text-ivory-dark uppercase font-mono">
              Green Roofs Built
            </span>
            <Layers className="w-4 h-4 text-river-blue" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-golden-yellow">
            89 Projects
          </div>
          <p className="text-[11px] text-ivory-muted">882,500 sq.ft living canopy</p>
        </div>

        <div className="p-5 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-2">
          <div className="flex items-center justify-between text-golden-yellow">
            <span className="text-xs font-semibold text-ivory-dark uppercase font-mono">
              Total Trees & Pots
            </span>
            <TrendingUp className="w-4 h-4 text-golden-yellow" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-golden-yellow">
            {(conservationMetrics.treesPlanted + conservationMetrics.waterPotsInstalled).toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-ivory-muted">Audited community contributions</p>
        </div>
      </section>

      {/* 3. RECHARTS CITY CANOPY ANALYTICS */}
      <section id="analytics" className="rounded-3xl bg-forest-dark border border-emerald/30 p-6 sm:p-8 shadow-nature space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-ivory">
              Urban Living Canopy & CO₂ Absorption by Metro
            </h3>
            <p className="text-xs text-ivory-dark">
              Audited rooftop and urban forest square footage across major Indian metropolitan areas
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-forest-deeper p-1 rounded-xl border border-emerald/20 text-xs">
              <button
                onClick={() => setAnalyticsMetric('canopy')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  analyticsMetric === 'canopy'
                    ? 'bg-golden-yellow text-forest-dark shadow-sm'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                Canopy (Sq.Ft)
              </button>
              <button
                onClick={() => setAnalyticsMetric('co2')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  analyticsMetric === 'co2'
                    ? 'bg-golden-yellow text-forest-dark shadow-sm'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                CO₂ Offset (Tons)
              </button>
            </div>
            <span className="badge-emerald text-xs hidden sm:inline">
              IGBC Telemetry
            </span>
          </div>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cityCanopyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#176B43" opacity={0.3} />
              <XAxis dataKey="city" stroke="#9EAC9C" fontSize={11} />
              <YAxis stroke="#9EAC9C" fontSize={11} tickFormatter={(v) => (analyticsMetric === 'canopy' ? `${v / 1000}k` : `${v}t`)} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#052F1D',
                  borderColor: '#176B43',
                  borderRadius: '12px',
                  color: '#F6F0DA',
                  fontSize: '12px',
                }}
                formatter={(value: any) => [
                  analyticsMetric === 'canopy'
                    ? `${Number(value).toLocaleString('en-IN')} sq.ft`
                    : `${Number(value)} Tons CO₂/yr`,
                  analyticsMetric === 'canopy' ? 'Living Green Canopy' : 'Carbon Absorption',
                ]}
              />
              <Bar
                dataKey={analyticsMetric === 'canopy' ? 'canopySqFt' : 'co2Tons'}
                fill={analyticsMetric === 'canopy' ? '#8EBE3F' : '#F2B52C'}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 4. FARMER PAYOUT REVIEW INTERFACE */}
      <section id="payouts" className="rounded-3xl bg-forest-dark border border-golden-yellow/30 p-6 sm:p-8 shadow-nature space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="badge-gold">
              Weekly Escrow Liquidation Desk
            </span>
            <h3 className="font-serif text-xl font-bold text-ivory mt-1">
              Farmer Payout Verification Batch #HR-WK-42
            </h3>
            <p className="text-xs text-ivory-dark">
              {pendingPayoutSales.length} grower orders have verified delivery receipts awaiting final escrow release sign-off.
            </p>
          </div>

          <button
            onClick={handleApprovePayoutBatch}
            disabled={pendingPayoutSales.length === 0}
            className="btn-primary text-xs px-5 py-3 flex items-center gap-2 shrink-0 disabled:opacity-40 shadow-gold"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {pendingPayoutSales.length > 0
                ? `Approve ₹${pendingPayoutTotal.toLocaleString('en-IN')} Batch Escrow Release`
                : 'All Farmer Escrows Settled ✓'}
            </span>
          </button>
        </div>

        {payoutResult && (
          <div className="p-4 rounded-xl bg-emerald/20 border border-emerald/40 text-leaf-light text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>
              Escrow Release Confirmed: {payoutResult.count} orders totaling ₹{payoutResult.totalAmount.toLocaleString('en-IN')} credited via RTGS/NEFT to grower accounts. Status updated in demo state.
            </span>
          </div>
        )}

        <div className="rounded-xl bg-forest-deeper/80 border border-emerald/20 p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] text-ivory-muted uppercase block font-mono">Gross Payable in Escrow</span>
            <span className="font-serif font-bold text-base text-golden-yellow">
              ₹{pendingPayoutTotal.toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-ivory-muted uppercase block font-mono">Platform Cut</span>
            <span className="font-serif font-bold text-base text-leaf-light">0% (Zero Fee)</span>
          </div>
          <div>
            <span className="text-[10px] text-ivory-muted uppercase block font-mono">TDS Compliance</span>
            <span className="font-serif font-bold text-base text-ivory">100% Tax Compliant</span>
          </div>
          <div>
            <span className="text-[10px] text-ivory-muted uppercase block font-mono">Fulfillment Verification</span>
            <span className="font-serif font-bold text-base text-leaf-light">Audited Receipts</span>
          </div>
        </div>
      </section>

      {/* 5. CITIZEN & FARMER USER DIRECTORY */}
      <section id="users" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-ivory">
              Citizen & Farmer User Directory ({filteredUsers.length})
            </h3>
            <p className="text-xs text-ivory-dark">
              Inspect KYC credentials, toggle organic producer accreditation, and manage platform roles
            </p>
          </div>

          <div className="flex bg-forest-dark p-1 rounded-xl border border-emerald/25 text-xs">
            {['all', 'customer', 'farmer', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => setUserRoleFilter(r)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors capitalize ${
                  userRoleFilter === r
                    ? 'bg-golden-yellow text-forest-dark font-bold'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                {r === 'all' ? 'All Personas' : r}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search users by name, email, or city..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="input-field text-xs pl-8 py-2 bg-forest-dark"
          />
        </div>

        <div className="rounded-2xl bg-forest-dark border border-emerald/30 overflow-hidden shadow-nature overflow-x-auto">
          <table className="w-full text-left text-xs text-ivory">
            <thead className="bg-forest-deeper/80 text-[11px] font-mono text-golden-yellow uppercase border-b border-emerald/20">
              <tr>
                <th className="p-4">User Details</th>
                <th className="p-4">Role</th>
                <th className="p-4">Location</th>
                <th className="p-4">Affiliation / Farm</th>
                <th className="p-4">KYC / Verification</th>
                <th className="p-4 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald/15">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-forest-deeper/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover bg-forest-deeper shrink-0 border border-emerald/30"
                    />
                    <div>
                      <div className="font-bold text-ivory">{user.name}</div>
                      <div className="text-[11px] text-ivory-muted">{user.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono capitalize font-bold border ${
                        user.role === 'farmer'
                          ? 'bg-golden-yellow/20 border-golden-yellow text-golden-yellow'
                          : user.role === 'customer'
                          ? 'bg-emerald/30 border-leaf-light text-leaf-light'
                          : 'bg-river-blue/30 border-river-light text-river-light'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-ivory-dark">
                    {user.city || 'National'}, {user.state || 'India'}
                  </td>
                  <td className="p-4 text-ivory-muted">
                    {user.farmName || user.organization || 'Independent Citizen'}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        user.verified
                          ? 'bg-emerald/30 border-leaf-light text-leaf-light'
                          : 'bg-amber-500/20 border-amber-400 text-amber-300'
                      }`}
                    >
                      {user.verified ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                      <span>{user.verified ? 'Verified & Audited' : 'Pending Audit'}</span>
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleUserVerification(user.id)}
                      className="px-2.5 py-1 rounded-lg bg-forest-deeper border border-emerald/30 hover:border-golden-yellow text-xs text-ivory transition-colors"
                      title="Toggle verification status"
                    >
                      {user.verified ? 'Revoke KYC' : 'Verify KYC ✓'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. ORDERS & DELIVERIES AUDIT TABLE */}
      <section id="orders" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-ivory">
              Platform Orders & Deliveries Audit ({filteredOrders.length})
            </h3>
            <p className="text-xs text-ivory-dark">
              Traceable farm-to-door delivery audit log with logistics telemetry
            </p>
          </div>

          <div className="flex bg-forest-dark p-1 rounded-xl border border-emerald/25 text-xs overflow-x-auto">
            {['all', 'Delivered', 'Dispatched', 'Packed', 'Harvest Pending'].map((st) => (
              <button
                key={st}
                onClick={() => setOrderAuditFilter(st)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  orderAuditFilter === st
                    ? 'bg-golden-yellow text-forest-dark font-bold'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                {st === 'all' ? 'All Deliveries' : st}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search orders by ID, customer name, or produce item..."
            value={orderSearch}
            onChange={(e) => setOrderSearch(e.target.value)}
            className="input-field text-xs pl-8 py-2 bg-forest-dark"
          />
        </div>

        <div className="rounded-2xl bg-forest-dark border border-emerald/30 overflow-hidden shadow-nature overflow-x-auto">
          <table className="w-full text-left text-xs text-ivory">
            <thead className="bg-forest-deeper/80 text-[11px] font-mono text-golden-yellow uppercase border-b border-emerald/20">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Item & Quantity</th>
                <th className="p-4">Gross Amount</th>
                <th className="p-4">Delivery Status</th>
                <th className="p-4">Escrow State</th>
                <th className="p-4">Logistics Telemetry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald/15">
              {filteredOrders.map((sale) => (
                <tr key={sale.id} className="hover:bg-forest-deeper/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-golden-yellow">
                    {sale.orderNumber}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-ivory">{sale.customerName}</div>
                    <div className="text-[11px] text-ivory-muted">{sale.customerCity}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-ivory">{sale.productName}</div>
                    <div className="text-[10px] text-ivory-muted">Qty: {sale.quantity}</div>
                  </td>
                  <td className="p-4 font-mono font-bold text-golden-yellow">
                    ₹{sale.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4">
                    <span className="badge-emerald text-[10px]">
                      {sale.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[11px]">
                    <span className={sale.payoutStatus === 'Credited' ? 'text-leaf-light font-bold' : 'text-golden-yellow'}>
                      {sale.payoutStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setInspectingOrder(sale)}
                      className="text-xs text-golden-yellow hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Audit Trail ➔</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. PRODUCT CATALOG MODERATION TABLE */}
      <section id="products" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-ivory">
              Product Catalog Moderation & Featuring ({filteredProducts.length})
            </h3>
            <p className="text-xs text-ivory-dark">
              Review marketplace listings, feature top organic producers on home feed
            </p>
          </div>

          <div className="flex bg-forest-dark p-1 rounded-xl border border-emerald/25 text-xs">
            {(['all', 'farmer', 'store'] as const).map((src) => (
              <button
                key={src}
                onClick={() => setProductSourceFilter(src)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors capitalize ${
                  productSourceFilter === src
                    ? 'bg-golden-yellow text-forest-dark font-bold'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                {src === 'all' ? 'All Items' : src === 'farmer' ? 'Farmer Direct' : 'Eco-Store'}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search catalog by title or producer name..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            className="input-field text-xs pl-8 py-2 bg-forest-dark"
          />
        </div>

        <div className="rounded-2xl bg-forest-dark border border-emerald/30 overflow-hidden shadow-nature overflow-x-auto">
          <table className="w-full text-left text-xs text-ivory">
            <thead className="bg-forest-deeper/80 text-[11px] font-mono text-golden-yellow uppercase border-b border-emerald/20">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Producer / Seller</th>
                <th className="p-4">Unit Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Organic Status</th>
                <th className="p-4 text-right">Featured Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald/15">
              {filteredProducts.slice(0, 8).map((p) => (
                <tr key={p.id} className="hover:bg-forest-deeper/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover bg-forest-deeper shrink-0"
                    />
                    <div>
                      <div className="font-bold text-ivory line-clamp-1">{p.name}</div>
                      <div className="text-[11px] text-ivory-muted">{p.category}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-ivory">{p.seller.name}</div>
                    <div className="text-[10px] text-ivory-muted">{p.seller.location}, {p.seller.state}</div>
                  </td>
                  <td className="p-4 font-mono font-bold text-golden-yellow">
                    ₹{p.price.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 font-mono">
                    {p.stockQuantity} units
                  </td>
                  <td className="p-4">
                    <span className="badge-emerald text-[10px]">
                      {p.seller.organicCertified ? 'Jaivik Certified' : 'Eco-Verified'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => updateFarmerProduct(p.id, { isFeatured: !p.isFeatured })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ml-auto border transition-colors ${
                        p.isFeatured
                          ? 'bg-golden-yellow text-forest-dark border-golden-yellow font-bold shadow-gold'
                          : 'bg-forest-deeper text-ivory-muted border-emerald/25 hover:text-golden-yellow'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${p.isFeatured ? 'fill-forest-dark' : ''}`} />
                      <span>{p.isFeatured ? 'Featured' : 'Feature'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. COMMUNITY CAMPAIGN GOVERNANCE */}
      <section className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-ivory">
          Active National Campaign Governance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-5 rounded-2xl bg-forest-dark border border-emerald/20 space-y-3 shadow-nature"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="badge-gold text-[10px]">{camp.category}</span>
                <span className="text-leaf-light font-mono font-bold">Active Directive</span>
              </div>
              <h4 className="font-serif font-bold text-base text-ivory">
                {camp.title}
              </h4>
              <p className="text-xs text-ivory-dark line-clamp-2">
                {camp.description}
              </p>
              <div className="pt-2 flex justify-between text-xs border-t border-emerald/20 text-ivory-muted">
                <span>Progress: {camp.currentCount.toLocaleString('en-IN')} / {camp.targetCount.toLocaleString('en-IN')} {camp.unit}</span>
                <span className="text-golden-yellow font-bold">
                  {Math.round((camp.currentCount / camp.targetCount) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL: ORDER AUDIT DETAIL */}
      {inspectingOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-forest-dark border border-golden-yellow/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-ivory space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInspectingOrder(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-ivory-muted hover:text-golden-yellow bg-forest-deeper"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="badge-gold">Audit Inspector Log</span>
              <h3 className="font-serif text-2xl font-bold text-ivory mt-1">
                Order {inspectingOrder.orderNumber}
              </h3>
              <p className="text-xs text-ivory-dark mt-0.5">
                Audited against National Directorate Fair-Trade Standard #HR-AUD-2026
              </p>
            </div>

            <div className="space-y-3 border-y border-emerald/20 py-4 text-xs">
              <div className="flex justify-between">
                <span className="text-ivory-muted">Citizen Buyer:</span>
                <span className="text-ivory font-semibold">{inspectingOrder.customerName} ({inspectingOrder.customerCity})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Harvest Item:</span>
                <span className="text-ivory">{inspectingOrder.productName} × {inspectingOrder.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Gross Transaction:</span>
                <span className="font-mono text-golden-yellow font-bold">₹{inspectingOrder.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Escrow Settlement Status:</span>
                <span className="text-leaf-light font-bold">{inspectingOrder.payoutStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Simulated UTR Hash:</span>
                <span className="font-mono text-golden-yellow">{inspectingOrder.utrNumber || 'PENDING LIQUIDATION'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Packaging Inspection:</span>
                <span className="text-leaf-light font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Passed Bio-Degradable Standard
                </span>
              </div>
            </div>

            <button
              onClick={() => setInspectingOrder(null)}
              className="btn-primary w-full text-xs py-3 shadow-gold"
            >
              Close Audit Record
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
