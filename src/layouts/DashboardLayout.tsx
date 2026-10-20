import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Sprout,
  ShieldAlert,
  Bell,
  Search,
  ChevronDown,
  User as UserIcon,
  Sun,
  Moon,
  LogOut,
  Menu,
  X,
  Layers,
  ShoppingBag,
  PackageCheck,
  CreditCard,
  Droplets,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { useStore } from '@/store';
import type { UserRole } from '@/types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  role: UserRole;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  role,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    currentUser,
    setUserRole,
    theme,
    toggleTheme,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
  } = useStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifPopoverOpen, setNotifPopoverOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifFilter, setNotifFilter] = useState<'all' | 'unread'>('unread');

  const unreadNotifications = notifications.filter(
    (n) => !n.read && (n.targetRole === role || n.targetRole === 'all')
  );

  const displayedNotifications = notifications
    .filter((n) => n.targetRole === role || n.targetRole === 'all')
    .filter((n) => (notifFilter === 'unread' ? !n.read : true));

  const handleRoleSwitch = (newRole: UserRole) => {
    setUserRole(newRole);
    if (newRole === 'customer') navigate('/dashboard/customer');
    else if (newRole === 'farmer') navigate('/dashboard/farmer');
    else if (newRole === 'admin') navigate('/dashboard/admin');
  };

  const navItemsByRole: Record<UserRole, { label: string; icon: React.ReactNode; to: string }[]> = {
    customer: [
      { label: 'Overview', icon: <LayoutDashboard className="w-4 h-4 shrink-0" />, to: '/dashboard/customer' },
      { label: 'My Green Roofs', icon: <Layers className="w-4 h-4 shrink-0" />, to: '/dashboard/customer#projects' },
      { label: 'Track Orders', icon: <ShoppingBag className="w-4 h-4 shrink-0" />, to: '/dashboard/customer#orders' },
      { label: 'My Eco-Impact', icon: <Droplets className="w-4 h-4 shrink-0" />, to: '/dashboard/customer#impact' },
      { label: 'Care Reminders', icon: <Calendar className="w-4 h-4 shrink-0" />, to: '/dashboard/customer#reminders' },
    ],
    farmer: [
      { label: 'Harvest Dashboard', icon: <LayoutDashboard className="w-4 h-4 shrink-0" />, to: '/dashboard/farmer' },
      { label: 'Inventory & Products', icon: <Sprout className="w-4 h-4 shrink-0" />, to: '/dashboard/farmer#inventory' },
      { label: 'Customer Orders', icon: <PackageCheck className="w-4 h-4 shrink-0" />, to: '/dashboard/farmer#orders' },
      { label: 'Sales & Payouts', icon: <CreditCard className="w-4 h-4 shrink-0" />, to: '/dashboard/farmer#payouts' },
    ],
    admin: [
      { label: 'Command Overview', icon: <LayoutDashboard className="w-4 h-4 shrink-0" />, to: '/dashboard/admin' },
      { label: 'Citizen & Farmer Users', icon: <UserIcon className="w-4 h-4 shrink-0" />, to: '/dashboard/admin#users' },
      { label: 'All Orders & Escrow', icon: <PackageCheck className="w-4 h-4 shrink-0" />, to: '/dashboard/admin#orders' },
      { label: 'Product Moderation', icon: <Sprout className="w-4 h-4 shrink-0" />, to: '/dashboard/admin#products' },
      { label: 'Farmer Payouts', icon: <CreditCard className="w-4 h-4 shrink-0" />, to: '/dashboard/admin#payouts' },
      { label: 'National Impact', icon: <TrendingUp className="w-4 h-4 shrink-0" />, to: '/dashboard/admin#analytics' },
    ],
  };

  const currentNav = navItemsByRole[role];

  // Accurate active item calculation based on location hash
  const isItemActive = (to: string) => {
    if (to.includes('#')) {
      return location.hash === `#${to.split('#')[1]}`;
    }
    return !location.hash || location.hash === '' || location.hash === '#';
  };

  const activeNavLabel = currentNav.find(item => isItemActive(item.to))?.label;

  return (
    <div className="min-h-screen bg-forest-deeper text-ivory flex">
      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden lg:flex flex-col bg-forest-dark border-r border-emerald/25 shrink-0 select-none transition-all duration-300 relative ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Area */}
        <div className={`p-4 border-b border-emerald/20 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!sidebarCollapsed ? (
            <BrandLogo size="md" />
          ) : (
            <Link to="/" title="HARIT Home" aria-label="HARIT Home">
              <img
                src="/images/haritLogo.png"
                alt="HARIT 3D ecological emblem of India"
                className="w-10 h-10 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              />
            </Link>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-1.5 rounded-lg text-ivory-muted hover:text-golden-yellow hover:bg-forest-deeper transition-colors ${
              sidebarCollapsed ? 'mt-2' : ''
            }`}
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Current Role Tag */}
        {!sidebarCollapsed && (
          <div className="px-5 py-3 border-b border-emerald/15 bg-forest-deeper/60">
            <div className="text-[10px] uppercase font-mono font-bold text-golden-yellow">
              CURRENT DASHBOARD
            </div>
            <div className="text-xs font-bold text-ivory flex items-center gap-1.5 mt-0.5">
              {role === 'customer' && <UserIcon className="w-3.5 h-3.5 text-leaf-light" />}
              {role === 'farmer' && <Sprout className="w-3.5 h-3.5 text-golden-yellow" />}
              {role === 'admin' && <ShieldAlert className="w-3.5 h-3.5 text-river-light" />}
              <span className="capitalize">{role} Environmental Portal</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {currentNav.map((item, idx) => {
            const active = isItemActive(item.to);
            return (
              <Link
                key={idx}
                to={item.to}
                title={sidebarCollapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  sidebarCollapsed ? 'justify-center px-2' : ''
                } ${
                  active
                    ? 'bg-golden-yellow text-forest-dark font-bold shadow-gold ring-1 ring-golden-yellow/50'
                    : 'text-ivory/80 hover:text-golden-yellow hover:bg-forest-deeper/80'
                }`}
              >
                {item.icon}
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Quick Portal Switcher */}
        {!sidebarCollapsed ? (
          <div className="p-4 border-t border-emerald/20 bg-forest-deeper/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-ivory-muted uppercase block">
                SWITCH PERSONA
              </span>
              <span className="text-[9px] text-golden-yellow font-mono font-bold">1-CLICK</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-[10px]">
              <button
                onClick={() => handleRoleSwitch('customer')}
                className={`py-1.5 rounded-lg border text-center transition-colors ${
                  role === 'customer'
                    ? 'bg-emerald/30 border-leaf-light text-leaf-light font-bold ring-1 ring-leaf-light/40'
                    : 'bg-forest-dark border-emerald/20 text-ivory-muted hover:text-ivory'
                }`}
              >
                Citizen
              </button>
              <button
                onClick={() => handleRoleSwitch('farmer')}
                className={`py-1.5 rounded-lg border text-center transition-colors ${
                  role === 'farmer'
                    ? 'bg-golden-yellow/30 border-golden-yellow text-golden-yellow font-bold ring-1 ring-golden-yellow/40'
                    : 'bg-forest-dark border-emerald/20 text-ivory-muted hover:text-ivory'
                }`}
              >
                Farmer
              </button>
              <button
                onClick={() => handleRoleSwitch('admin')}
                className={`py-1.5 rounded-lg border text-center transition-colors ${
                  role === 'admin'
                    ? 'bg-river-blue/30 border-river-light text-river-light font-bold ring-1 ring-river-blue/40'
                    : 'bg-forest-dark border-emerald/20 text-ivory-muted hover:text-ivory'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        ) : (
          <div className="p-2 border-t border-emerald/20 flex flex-col items-center gap-1.5">
            <button
              onClick={() => handleRoleSwitch('customer')}
              className={`p-2 rounded-lg border text-center transition-colors ${role === 'customer' ? 'bg-emerald/30 border-leaf-light text-leaf-light' : 'text-ivory-muted hover:text-ivory'}`}
              title="Citizen Portal"
            >
              <UserIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleRoleSwitch('farmer')}
              className={`p-2 rounded-lg border text-center transition-colors ${role === 'farmer' ? 'bg-golden-yellow/30 border-golden-yellow text-golden-yellow' : 'text-ivory-muted hover:text-ivory'}`}
              title="Farmer Portal"
            >
              <Sprout className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleRoleSwitch('admin')}
              className={`p-2 rounded-lg border text-center transition-colors ${role === 'admin' ? 'bg-river-blue/30 border-river-light text-river-light' : 'text-ivory-muted hover:text-ivory'}`}
              title="Admin Directorate"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Back Link */}
        <div className={`p-4 border-t border-emerald/20 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} text-xs`}>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-ivory-muted hover:text-golden-yellow transition-colors"
            title="Return to Public Website"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            {!sidebarCollapsed && <span>Return to Public Site</span>}
          </Link>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-forest-deeper/95 backdrop-blur-xl flex flex-col p-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-6 border-b border-emerald/20">
            <BrandLogo size="md" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-xl text-ivory hover:text-golden-yellow"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="py-4">
            <span className="text-xs text-golden-yellow font-bold uppercase font-mono mb-2 block">
              Quick Role Switch:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['customer', 'farmer', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    handleRoleSwitch(r);
                    setSidebarOpen(false);
                  }}
                  className={`py-2 text-center rounded-xl text-xs font-semibold capitalize border ${
                    role === r
                      ? 'bg-golden-yellow text-forest-dark border-golden-yellow font-bold'
                      : 'bg-forest-dark text-ivory border-emerald/30'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <nav className="py-6 space-y-2">
            {currentNav.map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-ivory hover:bg-forest-dark"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-emerald/20">
            <Link
              to="/"
              className="btn-secondary w-full text-center py-3 text-xs block"
            >
              Exit to Homepage
            </Link>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 bg-forest-dark/95 backdrop-blur-md border-b border-emerald/20 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-ivory hover:text-golden-yellow"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="text-[11px] font-mono text-ivory-muted flex items-center gap-1.5 flex-wrap">
                <Link to="/" className="hover:text-golden-yellow transition-colors">
                  HARIT
                </Link>
                <span>/</span>
                <span className="capitalize text-golden-yellow font-bold">
                  {role} Portal
                </span>
                {activeNavLabel && activeNavLabel !== 'Overview' && activeNavLabel !== 'Harvest Dashboard' && activeNavLabel !== 'Command Overview' && (
                  <>
                    <span>/</span>
                    <span className="text-leaf-light font-medium">{activeNavLabel}</span>
                  </>
                )}
              </div>
              <h1 className="font-serif font-bold text-lg sm:text-xl text-ivory">
                {title}
              </h1>
              {subtitle && (
                <p className="text-[11px] text-ivory-dark hidden md:block">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right Icons: Role Switcher, Search, Theme, Notifications, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Topbar Quick Persona Switcher */}
            <div className="hidden xl:flex items-center gap-1 bg-forest-deeper/90 p-1 rounded-xl border border-emerald/30 text-[11px]">
              <button
                onClick={() => handleRoleSwitch('customer')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  role === 'customer'
                    ? 'bg-emerald text-ivory font-bold shadow-sm ring-1 ring-leaf-light/50'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
                title="Switch to Citizen View"
              >
                Citizen
              </button>
              <button
                onClick={() => handleRoleSwitch('farmer')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  role === 'farmer'
                    ? 'bg-golden-yellow text-forest-dark font-bold shadow-gold'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
                title="Switch to Farmer Producer View"
              >
                Farmer
              </button>
              <button
                onClick={() => handleRoleSwitch('admin')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  role === 'admin'
                    ? 'bg-river-blue text-white font-bold shadow-sm ring-1 ring-river-light/50'
                    : 'text-ivory-muted hover:text-ivory'
                }`}
                title="Switch to Admin Directorate View"
              >
                Admin
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-ivory hover:text-golden-yellow hover:bg-forest-deeper transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light (Natural Cream)' : 'Dark (Forest Green)'} Mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-golden-yellow" /> : <Moon className="w-4 h-4 text-river-light" />}
            </button>

            {/* Search Input */}
            <div className="relative hidden md:block w-48 lg:w-60">
              <Search className="w-3.5 h-3.5 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search telemetry, orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field text-xs pl-8 pr-7 py-2 bg-forest-deeper/80"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ivory-muted hover:text-golden-yellow"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setNotifPopoverOpen(!notifPopoverOpen)}
                className="relative p-2 rounded-xl text-ivory hover:text-golden-yellow hover:bg-forest-deeper transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-golden-yellow text-forest-dark text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadNotifications.length}
                  </span>
                )}
              </button>

              {notifPopoverOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-forest-deeper border border-emerald/30 rounded-2xl shadow-2xl p-4 z-50 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald/20">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ivory">Notifications</span>
                      <div className="flex gap-1 text-[10px] bg-forest-dark px-1.5 py-0.5 rounded-lg border border-emerald/20">
                        <button
                          onClick={() => setNotifFilter('unread')}
                          className={`px-1.5 py-0.5 rounded ${notifFilter === 'unread' ? 'text-golden-yellow font-bold' : 'text-ivory-muted'}`}
                        >
                          Unread ({unreadNotifications.length})
                        </button>
                        <button
                          onClick={() => setNotifFilter('all')}
                          className={`px-1.5 py-0.5 rounded ${notifFilter === 'all' ? 'text-golden-yellow font-bold' : 'text-ivory-muted'}`}
                        >
                          All
                        </button>
                      </div>
                    </div>
                    {unreadNotifications.length > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-golden-yellow hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="py-2 space-y-2.5 max-h-72 overflow-y-auto">
                    {displayedNotifications.length === 0 ? (
                      <div className="p-4 text-center text-ivory-muted text-xs">
                        No {notifFilter === 'unread' ? 'unread' : ''} notifications.
                      </div>
                    ) : (
                      displayedNotifications.slice(0, 6).map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                            notif.read
                              ? 'bg-forest-dark/40 border-emerald/10 text-ivory-muted'
                              : 'bg-forest-dark border-golden-yellow/30 text-ivory'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-semibold text-golden-yellow">
                            <span>{notif.title}</span>
                            <span className="text-[10px] text-ivory-muted">{notif.time}</span>
                          </div>
                          <p className="text-xs text-ivory-dark mt-1 leading-relaxed">
                            {notif.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-forest-deeper/80 border border-emerald/30 hover:border-golden-yellow/40 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden bg-forest-dark shrink-0">
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-4 h-4 m-1.5 text-golden-yellow" />
                  )}
                </div>
                <span className="text-xs font-semibold text-ivory hidden sm:inline max-w-[100px] truncate">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3 h-3 text-ivory-muted" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-forest-deeper border border-emerald/30 rounded-2xl shadow-2xl p-2 z-50 text-xs">
                  <div className="p-3 border-b border-emerald/20">
                    <div className="font-bold text-ivory">{currentUser.name}</div>
                    <div className="text-[11px] text-ivory-muted">{currentUser.email}</div>
                    <div className="text-[10px] text-golden-yellow uppercase font-mono mt-1">
                      {role} Role
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 rounded-xl text-ivory hover:text-golden-yellow hover:bg-forest-dark flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Back to Public Website</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-8 space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
};
