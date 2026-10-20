import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Menu,
  X,
  User as UserIcon,
  ChevronDown,
  LayoutDashboard,
  Sprout,
  ShieldAlert,
  Compass,
  Store,
  Sparkles,
  Info,
  BookOpen,
  Calendar,
  Phone,
  LogIn,
} from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { useStore } from '@/store';
import type { UserRole } from '@/types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { currentUser, setUserRole, cart, setIsCartOpen, wishlist } = useStore();
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Desktop Dropdown State: 'marketplace' | 'explore' | 'account' | null
  const [activeDropdown, setActiveDropdown] = useState<'marketplace' | 'explore' | 'account' | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track scroll position for sticky styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns & mobile menu on route change
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnter = (name: 'marketplace' | 'explore' | 'account') => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleTriggerClick = (name: 'marketplace' | 'explore' | 'account') => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    setActiveDropdown(null);
  };

  const getDashboardPath = () => {
    switch (currentUser.role) {
      case 'farmer':
        return '/dashboard/farmer';
      case 'admin':
        return '/dashboard/admin';
      case 'customer':
      default:
        return '/dashboard/customer';
    }
  };

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode; color: string; badge: string }> = {
    customer: {
      label: 'Citizen / Customer',
      icon: <UserIcon className="w-3.5 h-3.5" />,
      color: 'bg-emerald/20 text-leaf-light border-emerald/40',
      badge: 'Citizen',
    },
    farmer: {
      label: 'Verified Farmer',
      icon: <Sprout className="w-3.5 h-3.5" />,
      color: 'bg-golden-yellow/20 text-golden-yellow border-golden-yellow/40',
      badge: 'Farmer',
    },
    admin: {
      label: 'Platform Admin',
      icon: <ShieldAlert className="w-3.5 h-3.5" />,
      color: 'bg-river-blue/20 text-river-light border-river-blue/40',
      badge: 'Admin',
    },
  };

  // Check if any child route is active
  const isMarketplaceActive = location.pathname.startsWith('/farmer-market') || location.pathname.startsWith('/eco-store');
  const isExploreActive = ['/about', '/education', '/campaigns', '/contact'].some((p) => location.pathname.startsWith(p));
  const isAccountActive = location.pathname.startsWith('/dashboard') || location.pathname === '/login' || location.pathname === '/auth';

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-forest-deeper/90 border-b border-emerald/20 px-4 py-1 text-center text-xs text-ivory-dark flex items-center justify-center gap-2 select-none">
        <span className="w-2 h-2 rounded-full bg-golden-yellow animate-pulse" />
        <span className="font-medium">
          HARIT Mission: Empowering Indian green living, urban biodiversity & organic farmers
        </span>
        <span className="hidden md:inline text-golden-yellow/80 font-bold ml-1">
          • Demo Experience Only
        </span>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-forest-dark/95 backdrop-blur-md shadow-nature border-b border-emerald/25 py-2.5'
            : 'bg-forest-green/80 backdrop-blur-sm border-b border-emerald/15 py-3'
        }`}
      >
        <div ref={dropdownRef} className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 lg:gap-6">
          {/* 1. BRAND LOGO LOCKUP (Emblem Left, HARIT Line 1, India's Green Mission Line 2) */}
          <div className="shrink-0">
            <BrandLogo size="md" />
          </div>

          {/* 2. REFACTORED COMPACT DESKTOP NAVIGATION */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Main Navigation"
          >
            {/* Destination 1: Home */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-golden-yellow bg-forest-deeper/90 border border-golden-yellow/40 shadow-sm font-bold'
                    : 'text-ivory/85 hover:text-golden-yellow hover:bg-forest-dark/50'
                }`
              }
            >
              Home
            </NavLink>

            {/* Destination 2: Green Roofs */}
            <NavLink
              to="/green-roofs"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-golden-yellow bg-forest-deeper/90 border border-golden-yellow/40 shadow-sm font-bold'
                    : 'text-ivory/85 hover:text-golden-yellow hover:bg-forest-dark/50'
                }`
              }
            >
              Green Roofs
            </NavLink>

            {/* Destination 3: Marketplace Dropdown (Farmer Market & Eco-Store) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('marketplace')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleTriggerClick('marketplace')}
                aria-expanded={activeDropdown === 'marketplace'}
                aria-haspopup="true"
                aria-controls="marketplace-dropdown"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-golden-yellow ${
                  isMarketplaceActive || activeDropdown === 'marketplace'
                    ? 'text-golden-yellow bg-forest-deeper/90 border border-golden-yellow/40 shadow-sm font-bold'
                    : 'text-ivory/85 hover:text-golden-yellow hover:bg-forest-dark/50'
                }`}
              >
                <span>Marketplace</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'marketplace' ? 'rotate-180 text-golden-yellow' : 'opacity-70'
                  }`}
                />
              </button>

              {activeDropdown === 'marketplace' && (
                <div
                  id="marketplace-dropdown"
                  role="menu"
                  aria-label="Marketplace Destinations"
                  className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-forest-deeper border border-emerald/30 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl"
                >
                  <div className="px-3 py-2 border-b border-emerald/20">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-golden-yellow font-bold block">
                      Eco-Commerce & Harvest
                    </span>
                    <p className="text-[11px] text-ivory-dark mt-0.5">
                      Direct agricultural and sustainable living ecosystems
                    </p>
                  </div>

                  <div className="p-1 space-y-1">
                    <Link
                      to="/farmer-market"
                      role="menuitem"
                      onClick={() => setActiveDropdown(null)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                        location.pathname === '/farmer-market'
                          ? 'bg-forest-dark border border-golden-yellow/30 text-golden-yellow'
                          : 'hover:bg-forest-dark text-ivory hover:text-golden-yellow'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-golden-yellow/15 text-golden-yellow shrink-0 mt-0.5">
                        <Sprout className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <span>Organic Farmer Market</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-leaf-green/20 text-leaf-light font-mono">100% Direct</span>
                        </div>
                        <p className="text-[11px] text-ivory-muted leading-tight mt-0.5">
                          Fresh harvest & grains from verified smallholder Indian growers
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/eco-store"
                      role="menuitem"
                      onClick={() => setActiveDropdown(null)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                        location.pathname === '/eco-store'
                          ? 'bg-forest-dark border border-golden-yellow/30 text-golden-yellow'
                          : 'hover:bg-forest-dark text-ivory hover:text-golden-yellow'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-leaf-green/15 text-leaf-light shrink-0 mt-0.5">
                        <Store className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <span>Eco-Store Products</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-golden-yellow/20 text-golden-yellow font-mono">Sustainable</span>
                        </div>
                        <p className="text-[11px] text-ivory-muted leading-tight mt-0.5">
                          Clay Pakshi Jalpatra, nestboxes, heirloom seeds & organic compost
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Destination 4: Conservation */}
            <NavLink
              to="/conservation"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-golden-yellow bg-forest-deeper/90 border border-golden-yellow/40 shadow-sm font-bold'
                    : 'text-ivory/85 hover:text-golden-yellow hover:bg-forest-dark/50'
                }`
              }
            >
              Conservation
            </NavLink>

            {/* Dropdown: Explore (About, Education, Campaigns, Contact) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('explore')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleTriggerClick('explore')}
                aria-expanded={activeDropdown === 'explore'}
                aria-haspopup="true"
                aria-controls="explore-dropdown"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-golden-yellow ${
                  isExploreActive || activeDropdown === 'explore'
                    ? 'text-golden-yellow bg-forest-deeper/90 border border-golden-yellow/40 shadow-sm font-bold'
                    : 'text-ivory/85 hover:text-golden-yellow hover:bg-forest-dark/50'
                }`}
              >
                <Compass className="w-3.5 h-3.5 opacity-80" />
                <span>Explore</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'explore' ? 'rotate-180 text-golden-yellow' : 'opacity-70'
                  }`}
                />
              </button>

              {activeDropdown === 'explore' && (
                <div
                  id="explore-dropdown"
                  role="menu"
                  aria-label="Explore Pages"
                  className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-forest-deeper border border-emerald/30 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl"
                >
                  <div className="px-3 py-2 border-b border-emerald/20">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-golden-yellow font-bold block">
                      Platform Directory
                    </span>
                    <p className="text-[11px] text-ivory-dark mt-0.5">
                      Mission, ecological knowledge & public initiatives
                    </p>
                  </div>

                  <div className="p-1 space-y-1">
                    <Link
                      to="/about"
                      role="menuitem"
                      onClick={() => setActiveDropdown(null)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
                        location.pathname === '/about'
                          ? 'bg-forest-dark text-golden-yellow font-bold border border-emerald/30'
                          : 'text-ivory hover:text-golden-yellow hover:bg-forest-dark'
                      }`}
                    >
                      <Info className="w-3.5 h-3.5 text-leaf-light shrink-0" />
                      <div>
                        <span className="block font-semibold">About HARIT</span>
                        <span className="text-[10px] text-ivory-muted block leading-none">Mission, vision & 3D symbolism</span>
                      </div>
                    </Link>

                    <Link
                      to="/education"
                      role="menuitem"
                      onClick={() => setActiveDropdown(null)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
                        location.pathname === '/education'
                          ? 'bg-forest-dark text-golden-yellow font-bold border border-emerald/30'
                          : 'text-ivory hover:text-golden-yellow hover:bg-forest-dark'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5 text-golden-yellow shrink-0" />
                      <div>
                        <span className="block font-semibold">Education & Guides</span>
                        <span className="text-[10px] text-ivory-muted block leading-none">Gardening, botany & sparrow revival</span>
                      </div>
                    </Link>

                    <Link
                      to="/campaigns"
                      role="menuitem"
                      onClick={() => setActiveDropdown(null)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
                        location.pathname === '/campaigns'
                          ? 'bg-forest-dark text-golden-yellow font-bold border border-emerald/30'
                          : 'text-ivory hover:text-golden-yellow hover:bg-forest-dark'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5 text-river-light shrink-0" />
                      <div>
                        <span className="block font-semibold">Community Campaigns</span>
                        <span className="text-[10px] text-ivory-muted block leading-none">Tree drives & rooftop solar meets</span>
                      </div>
                    </Link>

                    <Link
                      to="/contact"
                      role="menuitem"
                      onClick={() => setActiveDropdown(null)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
                        location.pathname === '/contact'
                          ? 'bg-forest-dark text-golden-yellow font-bold border border-emerald/30'
                          : 'text-ivory hover:text-golden-yellow hover:bg-forest-dark'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5 text-leaf-light shrink-0" />
                      <div>
                        <span className="block font-semibold">Contact & Support</span>
                        <span className="text-[10px] text-ivory-muted block leading-none">Regional centers & site audits</span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* 3. RIGHT ACTION CONTROLS & ACCOUNT DROPDOWN */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Wishlist Link */}
            <Link
              to="/eco-store?wishlist=true"
              className="relative p-2 rounded-xl text-ivory-dark hover:text-golden-yellow hover:bg-forest-dark/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-golden-yellow"
              title="Saved Items"
              aria-label="Wishlist saved items"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-golden-yellow text-forest-dark text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl text-ivory-dark hover:text-golden-yellow hover:bg-forest-dark/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-golden-yellow"
              title="Open Eco-Cart"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalCartItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-leaf-green text-forest-deeper text-[10px] font-extrabold flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Account Menu Dropdown (Desktop / Tablet) */}
            <div
              className="relative hidden sm:block"
              onMouseEnter={() => handleMouseEnter('account')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleTriggerClick('account')}
                aria-expanded={activeDropdown === 'account'}
                aria-haspopup="true"
                aria-controls="account-dropdown"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-golden-yellow ${
                  isAccountActive || activeDropdown === 'account'
                    ? 'bg-golden-yellow/20 text-golden-yellow border-golden-yellow/50 shadow-gold'
                    : 'bg-forest-deeper/80 text-ivory border-emerald/30 hover:border-golden-yellow/40 hover:text-golden-yellow'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-golden-yellow animate-pulse" />
                <span className="max-w-[110px] truncate">{roleLabels[currentUser.role].badge} Portal</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'account' ? 'rotate-180 text-golden-yellow' : 'opacity-70'
                  }`}
                />
              </button>

              {activeDropdown === 'account' && (
                <div
                  id="account-dropdown"
                  role="menu"
                  aria-label="Account and Dashboard Options"
                  className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-forest-deeper border border-emerald/30 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl text-xs"
                >
                  {/* Account Header with Simulation Disclosure */}
                  <div className="p-3 border-b border-emerald/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase font-bold text-golden-yellow flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-golden-yellow" />
                        <span>Account & Portals</span>
                      </span>
                      <span className="text-[9px] bg-golden-yellow/20 text-golden-yellow font-bold px-1.5 py-0.5 rounded">
                        Frontend Demo
                      </span>
                    </div>
                    <p className="text-[11px] text-ivory-dark leading-tight">
                      Signed in as <strong className="text-ivory">{currentUser.name}</strong> ({roleLabels[currentUser.role].label})
                    </p>
                  </div>

                  {/* Destination Links */}
                  <div className="p-1 space-y-1">
                    <Link
                      to="/login"
                      role="menuitem"
                      onClick={() => setActiveDropdown(null)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                        location.pathname === '/login' || location.pathname === '/auth'
                          ? 'bg-forest-dark text-golden-yellow font-bold border border-emerald/30'
                          : 'text-ivory hover:text-golden-yellow hover:bg-forest-dark'
                      }`}
                    >
                      <LogIn className="w-3.5 h-3.5 text-golden-yellow shrink-0" />
                      <div>
                        <span className="font-semibold block">Demo Login & Role Switcher</span>
                        <span className="text-[10px] text-ivory-muted block leading-none">Simulate authentication credentials</span>
                      </div>
                    </Link>

                    <Link
                      to="/dashboard/customer"
                      role="menuitem"
                      onClick={() => setActiveDropdown(null)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                        location.pathname === '/dashboard/customer'
                          ? 'bg-forest-dark text-golden-yellow font-bold border border-emerald/30'
                          : 'text-ivory hover:text-golden-yellow hover:bg-forest-dark'
                      }`}
                    >
                      <UserIcon className="w-3.5 h-3.5 text-leaf-light shrink-0" />
                      <div>
                        <span className="font-semibold block">Citizen / Customer Dashboard</span>
                        <span className="text-[10px] text-ivory-muted block leading-none">Green roofs, orders & balcony impact</span>
                      </div>
                    </Link>

                    <Link
                      to="/dashboard/farmer"
                      role="menuitem"
                      onClick={() => setActiveDropdown(null)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                        location.pathname === '/dashboard/farmer'
                          ? 'bg-forest-dark text-golden-yellow font-bold border border-emerald/30'
                          : 'text-ivory hover:text-golden-yellow hover:bg-forest-dark'
                      }`}
                    >
                      <Sprout className="w-3.5 h-3.5 text-golden-yellow shrink-0" />
                      <div>
                        <span className="font-semibold block">Organic Farmer Dashboard</span>
                        <span className="text-[10px] text-ivory-muted block leading-none">Crop inventory, harvest & direct payouts</span>
                      </div>
                    </Link>

                    <Link
                      to="/dashboard/admin"
                      role="menuitem"
                      onClick={() => setActiveDropdown(null)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                        location.pathname === '/dashboard/admin'
                          ? 'bg-forest-dark text-golden-yellow font-bold border border-emerald/30'
                          : 'text-ivory hover:text-golden-yellow hover:bg-forest-dark'
                      }`}
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-river-light shrink-0" />
                      <div>
                        <span className="font-semibold block">Platform Admin Directorate</span>
                        <span className="text-[10px] text-ivory-muted block leading-none">National metrics, escrow & moderation</span>
                      </div>
                    </Link>
                  </div>

                  {/* 1-Click Role Simulation Switcher inside Dropdown */}
                  <div className="p-2.5 border-t border-emerald/20 bg-forest-dark/40 rounded-b-xl space-y-1.5 mt-1">
                    <span className="text-[10px] font-mono uppercase text-ivory-muted block font-semibold">
                      ⚡ 1-Click Persona Simulator:
                    </span>
                    <div className="grid grid-cols-3 gap-1">
                      {(['customer', 'farmer', 'admin'] as UserRole[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          role="menuitem"
                          aria-label={`Switch persona to ${r}`}
                          onClick={() => handleRoleChange(r)}
                          className={`py-1 px-1.5 text-center rounded-lg text-[10px] font-semibold capitalize border transition-all ${
                            currentUser.role === r
                              ? 'bg-golden-yellow text-forest-dark border-golden-yellow font-bold shadow-sm'
                              : 'bg-forest-deeper text-ivory-dark border-emerald/20 hover:text-ivory hover:border-emerald/40'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-ivory hover:text-golden-yellow hover:bg-forest-dark/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-golden-yellow"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* 4. COMPREHENSIVE RESPONSIVE MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-forest-deeper/95 backdrop-blur-xl flex flex-col p-6 overflow-y-auto border-b border-emerald/30 animate-in fade-in duration-200">
          {/* Drawer Top Header with Brand */}
          <div className="flex items-center justify-between pb-5 border-b border-emerald/20">
            <BrandLogo size="md" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl text-ivory hover:text-golden-yellow focus:outline-none"
              aria-label="Close Navigation Drawer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Role Simulator Strip */}
          <div className="py-4 border-b border-emerald/20 space-y-1.5">
            <span className="text-[10px] text-golden-yellow uppercase font-mono font-bold block">
              Simulate Persona (Demo):
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['customer', 'farmer', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleChange(r)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-semibold capitalize border ${
                    currentUser.role === r
                      ? 'bg-golden-yellow text-forest-dark border-golden-yellow font-bold shadow-gold'
                      : 'bg-forest-dark text-ivory border-emerald/30'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Drawer Nav Links Grouped */}
          <nav className="py-4 space-y-5">
            {/* Core Destinations */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-ivory-muted uppercase tracking-wider px-3 block font-bold">
                Main Destinations
              </span>
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-golden-yellow bg-forest-dark border-l-4 border-golden-yellow font-bold'
                      : 'text-ivory hover:text-golden-yellow hover:bg-forest-dark/50'
                  }`
                }
              >
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/green-roofs"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-golden-yellow bg-forest-dark border-l-4 border-golden-yellow font-bold'
                      : 'text-ivory hover:text-golden-yellow hover:bg-forest-dark/50'
                  }`
                }
              >
                <span>Green Roofs</span>
              </NavLink>
              <NavLink
                to="/conservation"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-golden-yellow bg-forest-dark border-l-4 border-golden-yellow font-bold'
                      : 'text-ivory hover:text-golden-yellow hover:bg-forest-dark/50'
                  }`
                }
              >
                <span>Conservation</span>
              </NavLink>
            </div>

            {/* Marketplace Destinations */}
            <div className="space-y-1 pt-2 border-t border-emerald/15">
              <span className="text-[10px] font-mono text-golden-yellow uppercase tracking-wider px-3 block font-bold">
                Marketplace
              </span>
              <NavLink
                to="/farmer-market"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-golden-yellow bg-forest-dark border-l-4 border-golden-yellow font-bold'
                      : 'text-ivory hover:text-golden-yellow hover:bg-forest-dark/50'
                  }`
                }
              >
                <Sprout className="w-4 h-4 text-leaf-light shrink-0" />
                <span>Organic Farmer Market</span>
              </NavLink>
              <NavLink
                to="/eco-store"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-golden-yellow bg-forest-dark border-l-4 border-golden-yellow font-bold'
                      : 'text-ivory hover:text-golden-yellow hover:bg-forest-dark/50'
                  }`
                }
              >
                <Store className="w-4 h-4 text-golden-yellow shrink-0" />
                <span>Eco-Store Products</span>
              </NavLink>
            </div>

            {/* Explore Destinations */}
            <div className="space-y-1 pt-2 border-t border-emerald/15">
              <span className="text-[10px] font-mono text-leaf-light uppercase tracking-wider px-3 block font-bold">
                Explore & Learn
              </span>
              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'text-golden-yellow bg-forest-dark font-bold' : 'text-ivory-dark hover:text-ivory'
                  }`
                }
              >
                <Info className="w-4 h-4 shrink-0 text-leaf-light" />
                <span>About HARIT</span>
              </NavLink>
              <NavLink
                to="/education"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'text-golden-yellow bg-forest-dark font-bold' : 'text-ivory-dark hover:text-ivory'
                  }`
                }
              >
                <BookOpen className="w-4 h-4 shrink-0 text-golden-yellow" />
                <span>Education & Guides</span>
              </NavLink>
              <NavLink
                to="/campaigns"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'text-golden-yellow bg-forest-dark font-bold' : 'text-ivory-dark hover:text-ivory'
                  }`
                }
              >
                <Calendar className="w-4 h-4 shrink-0 text-river-light" />
                <span>Community Campaigns</span>
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'text-golden-yellow bg-forest-dark font-bold' : 'text-ivory-dark hover:text-ivory'
                  }`
                }
              >
                <Phone className="w-4 h-4 shrink-0 text-leaf-light" />
                <span>Contact & Regional Hubs</span>
              </NavLink>
            </div>
          </nav>

          {/* Drawer Bottom Actions: Dashboards & Demo Auth */}
          <div className="mt-auto pt-6 border-t border-emerald/20 space-y-2.5">
            <Link
              to={getDashboardPath()}
              onClick={() => setMobileMenuOpen(false)}
              className="btn-secondary w-full text-center py-3 flex items-center justify-center gap-2 text-xs"
            >
              <LayoutDashboard className="w-4 h-4 text-golden-yellow" />
              <span>Go to {roleLabels[currentUser.role].label} Dashboard</span>
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full text-center py-3 text-xs"
            >
              Demo Authentication & Role Switcher
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
