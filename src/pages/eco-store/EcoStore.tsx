import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  Star,
  CheckCircle2,
  X,
  Plus,
  Minus,
  Droplets,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '@/store';
import type { Product } from '@/types';

export const EcoStore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const showWishlistParam = searchParams.get('wishlist') === 'true';

  const { allProducts, addToCart, wishlist, toggleWishlist } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOnlyWishlist, setShowOnlyWishlist] = useState<boolean>(showWishlistParam);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProduct) {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct]);

  // All store products
  const storeProducts = allProducts.filter((p) => p.sourceType === 'store');

  const filteredProducts = storeProducts
    .filter((prod) => {
      const matchesSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || prod.category === selectedCategory;
      const isWishlistFiltered = showOnlyWishlist || showWishlistParam;
      const matchesWishlist = !isWishlistFiltered || wishlist.includes(prod.id);
      return matchesSearch && matchesCategory && matchesWishlist;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });

  const categories = [
    { id: 'all', label: 'All Sustainable Living' },
    { id: 'water-pots', label: 'Pakshi Jalpatra (Water Pots)' },
    { id: 'bird-care', label: 'Sparrow Nestboxes & Feeders' },
    { id: 'gardening-tools', label: 'Composters & Organic Tools' },
  ];

  const handleOpenModal = (prod: Product) => {
    setSelectedProduct(prod);
    setModalQuantity(1);
  };

  const handleAddToCartModal = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, modalQuantity);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="space-y-16 py-12 sm:py-16">
      {/* 1. HEADER */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-deeper/90 border border-golden-yellow/40 text-xs font-semibold text-golden-yellow shadow-gold">
            <Droplets className="w-3.5 h-3.5 text-river-light" />
            <span>HARIT ECO-STORE — PLASTIC-FREE ARTISANAL LIVING</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-ivory tracking-tight max-w-4xl mx-auto leading-tight">
            The HARIT Eco-Store & Bird Oasis
          </h1>

          <p className="text-base sm:text-lg text-ivory-dark max-w-2xl mx-auto leading-relaxed">
            Essential natural supplies for bird hydration, balcony sparrow nesting, odorless Bokashi kitchen composting, and organic terrace maintenance.
          </p>

          {/* Trust strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-dark border border-emerald/30 text-leaf-light">
              <ShieldCheck className="w-4 h-4 text-leaf-green" />
              <span>100% Biodegradable & Natural Clay</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-dark border border-river-blue/30 text-river-light">
              <Droplets className="w-4 h-4 text-river-blue" />
              <span>Bird Hydration Tested</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-dark border border-golden-yellow/30 text-golden-yellow">
              <Star className="w-4 h-4 text-golden-yellow" />
              <span>Zero Single-Use Plastic</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH TOOLBAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-6 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-ivory-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bird baths, sparrow nest boxes, Bokashi composter, neem spray..."
                className="input-field text-xs pl-10 py-2.5"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-muted hover:text-ivory"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Wishlist toggle */}
            <div className="md:col-span-3 flex items-center">
              <button
                type="button"
                onClick={() => {
                  const nextVal = !showOnlyWishlist;
                  setShowOnlyWishlist(nextVal);
                  setSearchParams(nextVal ? { wishlist: 'true' } : {});
                }}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                  showOnlyWishlist
                    ? 'bg-golden-yellow text-forest-dark border-golden-yellow font-bold shadow-gold'
                    : 'bg-forest-deeper text-ivory-dark border-emerald/30 hover:border-golden-yellow/40'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${showOnlyWishlist ? 'fill-forest-dark' : ''}`} />
                <span>Saved Wishlist ({wishlist.length})</span>
              </button>
            </div>

            {/* Sort */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="input-field text-xs py-2.5"
              >
                <option value="featured">Sort: Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald/20">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-golden-yellow text-forest-dark font-bold shadow-gold'
                    : 'bg-forest-deeper text-ivory-dark border border-emerald/20 hover:border-golden-yellow/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 text-xs text-ivory-dark">
          <span>
            Showing <strong className="text-golden-yellow">{filteredProducts.length}</strong> eco products
          </span>
          {showOnlyWishlist && (
            <span className="badge-gold">
              Filtering: Saved Wishlist Items Only
            </span>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-forest-dark border border-emerald/20 space-y-3">
            <Heart className="w-10 h-10 text-ivory-muted mx-auto opacity-50" />
            <h3 className="font-serif text-lg font-bold text-ivory">No items match your criteria</h3>
            <p className="text-xs text-ivory-dark max-w-xs mx-auto">
              {showOnlyWishlist
                ? 'Your wishlist is currently empty. Click the heart icon on any product to save it!'
                : 'Try adjusting your search query or selecting a different category.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setShowOnlyWishlist(false);
                setSearchParams({});
              }}
              className="btn-secondary text-xs px-4 py-2 mt-2"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="card-3d flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  <div
                    onClick={() => handleOpenModal(prod)}
                    className="relative rounded-xl overflow-hidden aspect-[16/10] bg-forest-deeper mb-4 cursor-pointer"
                  >
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
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod.id);
                      }}
                      className={`absolute top-2.5 right-2.5 p-2 rounded-lg backdrop-blur-md transition-colors ${
                        wishlist.includes(prod.id)
                          ? 'bg-golden-yellow text-forest-dark'
                          : 'bg-forest-deeper/70 text-ivory hover:text-golden-yellow'
                      }`}
                      title="Save to wishlist"
                      aria-label={wishlist.includes(prod.id) ? `Remove ${prod.name} from wishlist` : `Save ${prod.name} to wishlist`}
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-ivory-muted font-mono text-[10px]">
                      {prod.seller.name}
                    </span>
                    <span className="text-golden-yellow font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-golden-yellow" />
                      {prod.rating} ({prod.reviewsCount})
                    </span>
                  </div>

                  <h3
                    onClick={() => handleOpenModal(prod)}
                    className="font-serif font-bold text-base text-ivory group-hover:text-golden-yellow transition-colors line-clamp-1 cursor-pointer"
                  >
                    {prod.name}
                  </h3>

                  <p className="text-xs text-ivory-dark mt-1 line-clamp-2">
                    {prod.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-emerald/20 flex items-center justify-between">
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

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal(prod)}
                      className="p-2 rounded-xl bg-forest-deeper border border-emerald/30 text-ivory-dark hover:text-golden-yellow text-xs"
                      title="View details"
                      aria-label={`View details for ${prod.name}`}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="btn-primary text-xs px-3.5 py-2 flex items-center gap-1.5"
                      aria-label={`Add ${prod.name} to cart`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Product details for ${selectedProduct.name}`}
            className="bg-forest-dark border border-emerald/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-ivory space-y-6 max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-ivory-muted hover:text-golden-yellow bg-forest-deeper"
              aria-label="Close product details dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-forest-deeper">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="badge-river">
                  {selectedProduct.unit}
                </div>
                <h3 className="font-serif text-2xl font-bold text-ivory">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs text-ivory-dark">
                  {selectedProduct.tagline}
                </p>

                <div className="text-2xl font-serif font-extrabold text-golden-yellow">
                  ₹{selectedProduct.price.toLocaleString('en-IN')}{' '}
                  {selectedProduct.originalPrice && (
                    <span className="text-xs text-ivory-muted line-through font-sans font-normal ml-2">
                      ₹{selectedProduct.originalPrice}
                    </span>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-forest-deeper/80 border border-emerald/20 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-leaf-light font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Crafted by {selectedProduct.seller.name}</span>
                  </div>
                  <p className="text-ivory-dark">
                    Natural biodegradable materials designed for Indian weather conditions.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-emerald/20 text-xs text-ivory-dark">
              <p className="leading-relaxed">{selectedProduct.description}</p>
              <div className="space-y-1.5 pt-1">
                <strong className="text-golden-yellow block">Ecological Advantages:</strong>
                {selectedProduct.ecoBenefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-leaf-light shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-emerald/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 bg-forest-deeper border border-emerald/30 rounded-xl px-3 py-2">
                <button
                  onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                  className="text-ivory-dark hover:text-golden-yellow"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm text-ivory w-6 text-center">
                  {modalQuantity}
                </span>
                <button
                  onClick={() => setModalQuantity(modalQuantity + 1)}
                  className="text-ivory-dark hover:text-golden-yellow"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCartModal}
                className="btn-primary flex-1 text-xs py-3 flex items-center justify-center gap-2 shadow-gold"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart (₹{(selectedProduct.price * modalQuantity).toLocaleString('en-IN')})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
