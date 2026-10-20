import React, { useState } from 'react';
import {
  Sprout,
  Plus,
  Trash2,
  Edit2,
  TrendingUp,
  PackageCheck,
  CreditCard,
  X,
  Search,
  CheckCircle2,
  Clock,
  Building2,
  Minus,
  Check,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { useStore } from '@/store';
import type { ProductCategory, Product, FarmerSaleRecord } from '@/types';

export const FarmerDashboard: React.FC = () => {
  const {
    allProducts,
    addFarmerProduct,
    updateFarmerProduct,
    updateProductStock,
    deleteFarmerProduct,
    farmerSales,
    updateFarmerSaleStatus,
    currentUser,
  } = useStore();

  // Search & Filter state
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [chartMetric, setChartMetric] = useState<'revenue' | 'orders'>('revenue');

  // Modals state
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [selectedOrderForInspect, setSelectedOrderForInspect] = useState<FarmerSaleRecord | null>(null);

  // New Product Form State
  const [newProductName, setNewProductName] = useState('');
  const [newProductTagline, setNewProductTagline] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<ProductCategory>('grains');
  const [newProductPrice, setNewProductPrice] = useState<number>(400);
  const [newProductUnit, setNewProductUnit] = useState('5 kg Bag');
  const [newProductStock, setNewProductStock] = useState<number>(50);
  const [newProductImage] = useState(
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'
  );

  // Edit Product Form State
  const [editName, setEditName] = useState('');
  const [editTagline, setEditTagline] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);
  const [editUnit, setEditUnit] = useState('');
  const [editCategory, setEditCategory] = useState<ProductCategory>('grains');

  // Open Edit Modal
  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setEditName(p.name);
    setEditTagline(p.tagline);
    setEditPrice(p.price);
    setEditStock(p.stockQuantity);
    setEditUnit(p.unit);
    setEditCategory(p.category);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateFarmerProduct(editingProduct.id, {
      name: editName.trim(),
      tagline: editTagline.trim(),
      price: editPrice,
      stockQuantity: editStock,
      inStock: editStock > 0,
      unit: editUnit.trim(),
      category: editCategory,
    });
    setEditingProduct(null);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteFarmerProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  const farmerProducts = allProducts.filter((p) => p.sourceType === 'farmer');

  // Filtered Products
  const filteredProducts = farmerProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.tagline.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Filtered Orders
  const filteredSales = farmerSales.filter((sale) => {
    if (orderFilter === 'all') return true;
    return sale.status === orderFilter;
  });

  // Recharts monthly sales data
  const monthlyRevenueData = [
    { month: 'May', revenue: 28400, orders: 19 },
    { month: 'Jun', revenue: 34200, orders: 24 },
    { month: 'Jul', revenue: 41800, orders: 31 },
    { month: 'Aug', revenue: 39500, orders: 28 },
    { month: 'Sep', revenue: 52100, orders: 38 },
    { month: 'Oct', revenue: 48500, orders: 35 },
  ];

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    addFarmerProduct({
      name: newProductName.trim(),
      tagline: newProductTagline.trim() || 'Organically cultivated heritage harvest',
      category: newProductCategory,
      price: newProductPrice,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      stockQuantity: newProductStock,
      unit: newProductUnit,
      seller: {
        id: currentUser.id,
        name: currentUser.name || 'Sardar Balvinder Singh',
        location: currentUser.city || 'Bathinda',
        state: currentUser.state || 'Punjab',
        organicCertified: true,
        rating: 4.95,
        badge: 'Verified Jaivik Producer',
      },
      image: newProductImage,
      description: 'Grown using natural desi cow vermicompost and indigenous seed strains.',
      ecoBenefits: ['Zero chemical pesticides', 'Preserves native heritage seeds'],
      sourceType: 'farmer',
      isFeatured: false,
    });

    setAddProductModalOpen(false);
    setNewProductName('');
    setNewProductTagline('');
  };

  return (
    <DashboardLayout
      title="Farmer Producer Dashboard"
      subtitle="Manage your organic harvest inventory, orders, and fair-trade earnings"
      role="farmer"
    >
      {/* 1. DEMO DISCLAIMER BANNER */}
      <div className="rounded-2xl bg-forest-dark border border-golden-yellow/30 p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs shadow-nature">
        <div className="flex items-center gap-2.5">
          <span className="badge-gold text-[10px] shrink-0 font-bold">
            Simulated Farm-Gate Escrow
          </span>
          <p className="text-ivory-dark">
            Demonstration dashboard for verified grower <strong className="text-ivory">{currentUser.name || 'Sardar Balvinder Singh'}</strong>. Direct urban subscriptions, stock updates, and escrow settlements are simulated. No actual bank transfers occur.
          </p>
        </div>
        <span className="text-[10px] font-mono text-golden-yellow shrink-0 font-bold">
          KYC AUDIT #HR-PB-4108 • VERIFIED
        </span>
      </div>

      {/* 2. TOP PRODUCER BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-forest-dark via-emerald-dark to-forest-dark border border-golden-yellow/30 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-nature">
        <div className="space-y-2">
          <span className="badge-gold">
            Certified Jaivik Producer #HR-PB-4108
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
            {currentUser.name || 'Sardar Balvinder Singh'}
          </h2>
          <p className="text-xs text-ivory-dark max-w-lg">
            {currentUser.farmName || 'Malwa Heritage Organic Sanctuary'}, {currentUser.city || 'Bathinda'}, {currentUser.state || 'Punjab'} • 12 Acres Regenerative Agro-Ecology
          </p>
        </div>

        <button
          onClick={() => setAddProductModalOpen(true)}
          className="btn-primary text-xs px-5 py-3 flex items-center gap-2 self-start md:self-auto shrink-0 shadow-gold"
        >
          <Plus className="w-4 h-4" />
          <span>List New Harvest Produce</span>
        </button>
      </div>

      {/* 3. REVENUE & HARVEST METRICS CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-2">
          <div className="flex items-center justify-between text-golden-yellow">
            <span className="text-xs font-semibold text-ivory-dark uppercase font-mono">
              Monthly Earnings
            </span>
            <CreditCard className="w-4 h-4 text-golden-yellow" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-golden-yellow">
            ₹48,500
          </div>
          <p className="text-[11px] text-ivory-muted">Current billing cycle (October)</p>
        </div>

        <div className="p-5 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-2">
          <div className="flex items-center justify-between text-leaf-light">
            <span className="text-xs font-semibold text-ivory-dark uppercase font-mono">
              Total Gross Sales
            </span>
            <TrendingUp className="w-4 h-4 text-leaf-green" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-golden-yellow">
            ₹3,42,000
          </div>
          <p className="text-[11px] text-ivory-muted">100% Direct bank transfer payout</p>
        </div>

        <div className="p-5 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-2">
          <div className="flex items-center justify-between text-river-light">
            <span className="text-xs font-semibold text-ivory-dark uppercase font-mono">
              Fulfilled Orders
            </span>
            <PackageCheck className="w-4 h-4 text-river-blue" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-golden-yellow">
            128 Orders
          </div>
          <p className="text-[11px] text-ivory-muted">Shipped to conscious urban citizens</p>
        </div>

        <div className="p-5 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-2">
          <div className="flex items-center justify-between text-golden-yellow">
            <span className="text-xs font-semibold text-ivory-dark uppercase font-mono">
              Active Produce
            </span>
            <Sprout className="w-4 h-4 text-golden-yellow" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-golden-yellow">
            {farmerProducts.length} Items
          </div>
          <p className="text-[11px] text-ivory-muted">Live in national marketplace</p>
        </div>
      </section>

      {/* 4. REVENUE RECHARTS GRAPH */}
      <section className="rounded-3xl bg-forest-dark border border-emerald/30 p-6 sm:p-8 shadow-nature space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-ivory">
              Harvest Sales & Direct-Farmer Revenue Trends
            </h3>
            <p className="text-xs text-ivory-dark">
              Demonstration monthly income from conscious urban households
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-forest-deeper p-1 rounded-xl border border-emerald/20 text-xs">
              <button
                onClick={() => setChartMetric('revenue')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  chartMetric === 'revenue'
                    ? 'bg-golden-yellow text-forest-dark shadow-sm'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                Revenue (₹)
              </button>
              <button
                onClick={() => setChartMetric('orders')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  chartMetric === 'orders'
                    ? 'bg-golden-yellow text-forest-dark shadow-sm'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                Orders Fulfilled
              </button>
            </div>
            <span className="hidden sm:inline text-xs font-mono text-golden-yellow bg-forest-deeper px-3 py-1.5 rounded-xl border border-emerald/20">
              Avg: ₹40,800/mo
            </span>
          </div>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            {chartMetric === 'revenue' ? (
              <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="farmRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F2B52C" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F2B52C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#176B43" opacity={0.3} />
                <XAxis dataKey="month" stroke="#9EAC9C" fontSize={11} />
                <YAxis stroke="#9EAC9C" fontSize={11} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#052F1D',
                    borderColor: '#176B43',
                    borderRadius: '12px',
                    color: '#F6F0DA',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Harvest Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#F2B52C"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#farmRevenue)"
                />
              </AreaChart>
            ) : (
              <BarChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#176B43" opacity={0.3} />
                <XAxis dataKey="month" stroke="#9EAC9C" fontSize={11} />
                <YAxis stroke="#9EAC9C" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#052F1D',
                    borderColor: '#176B43',
                    borderRadius: '12px',
                    color: '#F6F0DA',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`${value} Deliveries`, 'Orders']}
                />
                <Bar dataKey="orders" fill="#8EBE3F" radius={[6, 6, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </section>

      {/* 5. PRODUCT & INVENTORY MANAGEMENT TABLE */}
      <section id="inventory" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-ivory">
              Live Product Inventory ({filteredProducts.length})
            </h3>
            <p className="text-xs text-ivory-dark">
              Adjust stock quantities in real-time, edit pricing, or list new seasonal harvests.
            </p>
          </div>

          <button
            onClick={() => setAddProductModalOpen(true)}
            className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 self-start sm:self-auto shadow-gold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Produce Listing</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search produce by title or description..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              className="input-field text-xs pl-8 py-2 bg-forest-dark"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field text-xs py-2 sm:w-48 bg-forest-dark"
          >
            <option value="all">All Categories</option>
            <option value="grains">Heritage Grains</option>
            <option value="fertilizers">Cow Manure / Fertilizer</option>
            <option value="seeds">Desi Seeds</option>
            <option value="honey-herbs">Honey & Herbs</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-8 rounded-2xl bg-forest-dark border border-emerald/20 text-center space-y-2">
            <Sprout className="w-8 h-8 text-ivory-muted mx-auto" />
            <p className="text-sm font-semibold text-ivory">No produce found</p>
            <p className="text-xs text-ivory-dark">Try clearing your search query or category filter.</p>
          </div>
        ) : (
          <div className="rounded-2xl bg-forest-dark border border-emerald/30 overflow-hidden shadow-nature overflow-x-auto">
            <table className="w-full text-left text-xs text-ivory">
              <thead className="bg-forest-deeper/80 text-[11px] font-mono text-golden-yellow uppercase border-b border-emerald/20">
                <tr>
                  <th className="p-4">Produce Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Unit Price</th>
                  <th className="p-4">Stock Level & Quick Adjust</th>
                  <th className="p-4">Market Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald/15">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-forest-deeper/50 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover bg-forest-deeper shrink-0"
                      />
                      <div>
                        <div className="font-bold text-ivory line-clamp-1">{p.name}</div>
                        <div className="text-[11px] text-ivory-muted">{p.unit}</div>
                      </div>
                    </td>
                    <td className="p-4 capitalize text-ivory-dark">
                      {p.category.replace('-', ' ')}
                    </td>
                    <td className="p-4 font-mono font-bold text-golden-yellow">
                      ₹{p.price.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateProductStock(p.id, p.stockQuantity - 1)}
                          className="w-6 h-6 rounded-md bg-forest-deeper border border-emerald/30 flex items-center justify-center text-ivory-muted hover:text-golden-yellow hover:border-golden-yellow"
                          title="Decrease stock"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold w-8 text-center">
                          {p.stockQuantity}
                        </span>
                        <button
                          onClick={() => updateProductStock(p.id, p.stockQuantity + 1)}
                          className="w-6 h-6 rounded-md bg-forest-deeper border border-emerald/30 flex items-center justify-center text-ivory-muted hover:text-golden-yellow hover:border-golden-yellow"
                          title="Increase stock"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        {p.stockQuantity < 15 && (
                          <span className="text-[10px] text-red-400 font-mono ml-2 font-semibold">
                            Low Stock
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`badge-emerald text-[10px] ${p.stockQuantity === 0 ? 'bg-red-500/20 border-red-400 text-red-300' : ''}`}>
                        {p.stockQuantity > 0 ? 'Active in Market' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg text-ivory-muted hover:text-golden-yellow hover:bg-forest-deeper transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setProductToDelete(p)}
                          className="p-1.5 rounded-lg text-ivory-muted hover:text-red-400 hover:bg-forest-deeper transition-colors"
                          title="Remove product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 6. RECENT ORDERS WITH DISPATCH SWITCHER */}
      <section id="orders" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-ivory">
              Customer Orders & Dispatch Stepper ({filteredSales.length})
            </h3>
            <p className="text-xs text-ivory-dark">
              Click status button to advance fulfillment: Harvest Pending ➔ Packed ➔ Dispatched ➔ Delivered
            </p>
          </div>

          <div className="flex bg-forest-dark p-1 rounded-xl border border-emerald/25 text-xs overflow-x-auto">
            {['all', 'Harvest Pending', 'Packed', 'Dispatched', 'Delivered'].map((st) => (
              <button
                key={st}
                onClick={() => setOrderFilter(st)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  orderFilter === st
                    ? 'bg-golden-yellow text-forest-dark font-bold'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
              >
                {st === 'all' ? 'All Orders' : st}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-forest-dark border border-emerald/30 overflow-hidden shadow-nature overflow-x-auto">
          <table className="w-full text-left text-xs text-ivory">
            <thead className="bg-forest-deeper/80 text-[11px] font-mono text-golden-yellow uppercase border-b border-emerald/20">
              <tr>
                <th className="p-4">Order #</th>
                <th className="p-4">Customer & City</th>
                <th className="p-4">Item & Quantity</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Fulfillment Status</th>
                <th className="p-4">Escrow State</th>
                <th className="p-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald/15">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-forest-deeper/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-ivory">
                    {sale.orderNumber}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-ivory">{sale.customerName}</div>
                    <div className="text-[11px] text-ivory-muted">{sale.customerCity}</div>
                  </td>
                  <td className="p-4 text-ivory-dark">
                    {sale.productName} × {sale.quantity}
                  </td>
                  <td className="p-4 font-mono font-bold text-golden-yellow">
                    ₹{sale.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        const nextStatus: Record<string, any> = {
                          'Harvest Pending': 'Packed',
                          'Packed': 'Dispatched',
                          'Dispatched': 'Delivered',
                          'Delivered': 'Delivered',
                        };
                        updateFarmerSaleStatus(sale.id, nextStatus[sale.status]);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                        sale.status === 'Delivered'
                          ? 'bg-emerald/30 border-leaf-light text-leaf-light'
                          : sale.status === 'Dispatched'
                          ? 'bg-golden-yellow/20 border-golden-yellow text-golden-yellow'
                          : 'bg-forest-deeper border-emerald/30 text-ivory hover:border-golden-yellow'
                      }`}
                      title="Click to advance status"
                    >
                      {sale.status} ➔
                    </button>
                  </td>
                  <td className="p-4 font-mono text-[11px]">
                    <span
                      className={`px-2 py-0.5 rounded-full border ${
                        sale.payoutStatus === 'Credited'
                          ? 'bg-emerald/30 border-leaf-light text-leaf-light font-bold'
                          : 'bg-golden-yellow/20 border-golden-yellow text-golden-yellow'
                      }`}
                    >
                      {sale.payoutStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedOrderForInspect(sale)}
                      className="text-xs text-golden-yellow hover:underline font-semibold"
                    >
                      Inspect ➔
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. EARNINGS & ESCROW PAYOUT HISTORY SCREEN */}
      <section id="payouts" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-ivory">
              Direct Farmer Escrow Liquidation & Payout Ledger
            </h3>
            <p className="text-xs text-ivory-dark">
              100% fair-trade settlement directly to farmer bank accounts with zero platform commission cut.
            </p>
          </div>
          <span className="badge-gold text-xs self-start sm:self-auto">
            Weekly RTGS Batch Settlements
          </span>
        </div>

        {/* Bank Account Verification Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-2">
            <div className="flex items-center justify-between text-leaf-light">
              <span className="text-[10px] font-mono uppercase text-ivory-muted">Verified Bank Node</span>
              <Building2 className="w-4 h-4 text-golden-yellow" />
            </div>
            <div className="font-serif font-bold text-base text-ivory">State Bank of India</div>
            <div className="text-xs font-mono text-golden-yellow">A/C: ****4108 • IFSC: SBIN0001842</div>
            <span className="text-[10px] text-leaf-light block">Direct NEFT/RTGS Verified ✓</span>
          </div>

          <div className="p-5 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-2">
            <div className="flex items-center justify-between text-golden-yellow">
              <span className="text-[10px] font-mono uppercase text-ivory-muted">Pending in Escrow</span>
              <Clock className="w-4 h-4 text-golden-yellow" />
            </div>
            <div className="font-serif font-bold text-2xl text-golden-yellow">
              ₹
              {farmerSales
                .filter((s) => s.payoutStatus !== 'Credited')
                .reduce((acc, curr) => acc + curr.totalAmount, 0)
                .toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-ivory-muted">Released upon customer delivery confirmation</p>
          </div>

          <div className="p-5 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-2">
            <div className="flex items-center justify-between text-leaf-light">
              <span className="text-[10px] font-mono uppercase text-ivory-muted">Total Settled to Date</span>
              <CheckCircle2 className="w-4 h-4 text-leaf-green" />
            </div>
            <div className="font-serif font-bold text-2xl text-leaf-light">
              ₹2,93,500
            </div>
            <p className="text-[11px] text-ivory-muted">Cumulative verified farmer transfers</p>
          </div>
        </div>

        {/* Payout Records Table */}
        <div className="rounded-2xl bg-forest-dark border border-emerald/30 overflow-hidden shadow-nature overflow-x-auto">
          <table className="w-full text-left text-xs text-ivory">
            <thead className="bg-forest-deeper/80 text-[11px] font-mono text-golden-yellow uppercase border-b border-emerald/20">
              <tr>
                <th className="p-4">Settlement Date</th>
                <th className="p-4">Order ID & Item</th>
                <th className="p-4">Simulated UTR Reference</th>
                <th className="p-4">Settlement Amount</th>
                <th className="p-4">Destination Account</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald/15">
              {farmerSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-forest-deeper/50 transition-colors">
                  <td className="p-4 text-ivory-dark font-mono">
                    {sale.date}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-ivory">{sale.orderNumber}</div>
                    <div className="text-[11px] text-ivory-muted">{sale.productName}</div>
                  </td>
                  <td className="p-4 font-mono text-golden-yellow">
                    {sale.utrNumber || 'UTR-PENDING-RELEASE'}
                  </td>
                  <td className="p-4 font-mono font-bold text-golden-yellow">
                    ₹{sale.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-ivory-dark font-mono text-[11px]">
                    SBI Bathinda (****4108)
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        sale.payoutStatus === 'Credited'
                          ? 'bg-emerald/30 border-leaf-light text-leaf-light'
                          : 'bg-golden-yellow/20 border-golden-yellow text-golden-yellow'
                      }`}
                    >
                      {sale.payoutStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL 1: ADD PRODUCT */}
      {addProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-forest-dark border border-golden-yellow/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-ivory space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setAddProductModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-ivory-muted hover:text-golden-yellow bg-forest-deeper"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="badge-gold">Farmer Inventory</span>
              <h3 className="font-serif text-2xl font-bold text-ivory mt-1">
                List New Harvest Produce
              </h3>
              <p className="text-xs text-ivory-dark mt-1">
                Your listing will immediately appear in the live national marketplace.
              </p>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-ivory">Produce / Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Desi Cow Dung Compost (Khad)"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="input-field text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ivory">Short Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Aged organic manure for balcony vegetables"
                  value={newProductTagline}
                  onChange={(e) => setNewProductTagline(e.target.value)}
                  className="input-field text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">Category</label>
                  <select
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value as any)}
                    className="input-field text-xs"
                  >
                    <option value="fertilizers">Cow Manure / Fertilizer</option>
                    <option value="grains">Heritage Grains</option>
                    <option value="seeds">Desi Seeds</option>
                    <option value="honey-herbs">Honey & Herbs</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">Price in INR (₹) *</label>
                  <input
                    type="number"
                    required
                    min="50"
                    max="10000"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(Number(e.target.value))}
                    className="input-field text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">Unit Description</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 kg Bag or 2L Can"
                    value={newProductUnit}
                    onChange={(e) => setNewProductUnit(e.target.value)}
                    className="input-field text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">Quantity in Stock</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(Number(e.target.value))}
                    className="input-field text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full text-xs py-3.5 flex items-center justify-center gap-2 shadow-gold"
              >
                <Plus className="w-4 h-4" />
                <span>Publish to Marketplace</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-forest-dark border border-golden-yellow/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-ivory space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-ivory-muted hover:text-golden-yellow bg-forest-deeper"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="badge-gold">Update Produce</span>
              <h3 className="font-serif text-2xl font-bold text-ivory mt-1">
                Edit {editingProduct.name}
              </h3>
              <p className="text-xs text-ivory-dark mt-1">
                Modifications will immediately take effect in your live inventory.
              </p>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-ivory">Product Name *</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="input-field text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ivory">Tagline</label>
                <input
                  type="text"
                  value={editTagline}
                  onChange={(e) => setEditTagline(e.target.value)}
                  className="input-field text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as any)}
                    className="input-field text-xs"
                  >
                    <option value="fertilizers">Cow Manure / Fertilizer</option>
                    <option value="grains">Heritage Grains</option>
                    <option value="seeds">Desi Seeds</option>
                    <option value="honey-herbs">Honey & Herbs</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">Price in INR (₹) *</label>
                  <input
                    type="number"
                    required
                    min="50"
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    className="input-field text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">Unit Description</label>
                  <input
                    type="text"
                    required
                    value={editUnit}
                    onChange={(e) => setEditUnit(e.target.value)}
                    className="input-field text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ivory">Available Stock</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={editStock}
                    onChange={(e) => setEditStock(Number(e.target.value))}
                    className="input-field text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full text-xs py-3.5 flex items-center justify-center gap-2 shadow-gold"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Save Changes</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DELETE PRODUCT CONFIRMATION */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-forest-dark border border-red-500/40 rounded-3xl max-w-sm w-full p-6 text-ivory space-y-4">
            <h3 className="font-serif text-lg font-bold text-ivory">
              Remove Produce Listing?
            </h3>
            <p className="text-xs text-ivory-dark leading-relaxed">
              Are you sure you want to remove <strong className="text-ivory">{productToDelete.name}</strong> from the national marketplace?
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="btn-secondary flex-1 text-xs py-2.5"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="btn-primary flex-1 text-xs py-2.5 bg-red-700 hover:bg-red-600 border-red-500"
              >
                Confirm Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: ORDER INSPECTION MODAL */}
      {selectedOrderForInspect && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-forest-dark border border-golden-yellow/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-ivory space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrderForInspect(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-ivory-muted hover:text-golden-yellow bg-forest-deeper"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="badge-gold">Order Fulfillment Sheet</span>
              <h3 className="font-serif text-2xl font-bold text-ivory mt-1">
                Order {selectedOrderForInspect.orderNumber}
              </h3>
              <p className="text-xs text-ivory-dark mt-0.5">
                Received on {selectedOrderForInspect.date} • Jaivik Farm-to-Door Service
              </p>
            </div>

            <div className="space-y-3 border-y border-emerald/20 py-4 text-xs">
              <div className="flex justify-between">
                <span className="text-ivory-muted">Citizen Customer:</span>
                <span className="font-semibold text-ivory">{selectedOrderForInspect.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Destination City:</span>
                <span className="text-ivory">{selectedOrderForInspect.customerCity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Fulfillment Status:</span>
                <span className="text-leaf-light font-bold">{selectedOrderForInspect.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Designated Courier:</span>
                <span className="text-ivory">{selectedOrderForInspect.courierPartner || 'Jaivik Green Express'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Courier Tracking No:</span>
                <span className="font-mono text-golden-yellow">{selectedOrderForInspect.trackingNumber || 'PENDING DISPATCH'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-muted">Escrow Payout Status:</span>
                <span className="text-golden-yellow font-bold">{selectedOrderForInspect.payoutStatus}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-forest-deeper border border-emerald/20 space-y-2 text-xs">
              <span className="text-[10px] font-mono uppercase text-golden-yellow font-bold">
                Bio-Degradable Packaging Guidelines
              </span>
              <p className="text-ivory-dark leading-relaxed">
                Please pack this item using breathable jute packaging with the official HARIT QR traceability label attached. Avoid single-use plastic wraps. Hand over to Jaivik logistics pickup coordinator.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  const nextStatus: Record<string, any> = {
                    'Harvest Pending': 'Packed',
                    'Packed': 'Dispatched',
                    'Dispatched': 'Delivered',
                    'Delivered': 'Delivered',
                  };
                  updateFarmerSaleStatus(selectedOrderForInspect.id, nextStatus[selectedOrderForInspect.status]);
                  setSelectedOrderForInspect(null);
                }}
                className="btn-primary w-full text-xs py-3 flex items-center justify-center gap-2 shadow-gold"
              >
                <span>Advance Status to Next Phase ➔</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
