import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  User as UserIcon,
  Sprout,
  ShieldAlert,
  ArrowRight,
  Lock,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { useStore } from '@/store';
import type { UserRole } from '@/types';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRegisterInitial = location.pathname.includes('register');

  const [isRegister, setIsRegister] = useState(isRegisterInitial);
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');

  const { setUserRole, setUser } = useStore();

  const handleQuickDemoLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'customer') navigate('/dashboard/customer');
    else if (role === 'farmer') navigate('/dashboard/farmer');
    else if (role === 'admin') navigate('/dashboard/admin');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (isRegister) {
      setUser({
        id: `user_${Date.now()}`,
        name: fullName || 'New Eco Citizen',
        email,
        role: selectedRole,
        city: city || 'Bengaluru',
      });
    } else {
      setUserRole(selectedRole);
    }

    if (selectedRole === 'customer') navigate('/dashboard/customer');
    else if (selectedRole === 'farmer') navigate('/dashboard/farmer');
    else if (selectedRole === 'admin') navigate('/dashboard/admin');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 rounded-3xl bg-forest-dark border border-golden-yellow/30 p-8 sm:p-10 shadow-gold-lg">
        {/* Brand header */}
        <div className="text-center space-y-3">
          <BrandLogo size="lg" className="mx-auto" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
            {isRegister ? 'Join the Green Mission' : 'Environmental Portal Access'}
          </h2>
          <p className="text-xs text-ivory-dark">
            Simulate role-based access for Citizens, Farmers, and Administrators
          </p>
        </div>

        {/* 1-Click Role Switcher Quick Access */}
        <div className="space-y-2.5 pt-2">
          <span className="text-[11px] font-mono text-golden-yellow uppercase block font-bold text-center">
            ⚡ 1-Click Instant Demo Portals
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('customer')}
              className="p-2.5 rounded-xl bg-forest-deeper border border-emerald/30 hover:border-golden-yellow text-center transition-all group"
            >
              <UserIcon className="w-4 h-4 text-leaf-light mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-[11px] font-bold text-ivory">Customer</div>
              <div className="text-[9px] text-ivory-muted">Citizen view</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('farmer')}
              className="p-2.5 rounded-xl bg-forest-deeper border border-emerald/30 hover:border-golden-yellow text-center transition-all group"
            >
              <Sprout className="w-4 h-4 text-golden-yellow mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-[11px] font-bold text-ivory">Farmer</div>
              <div className="text-[9px] text-ivory-muted">Grower view</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2.5 rounded-xl bg-forest-deeper border border-emerald/30 hover:border-golden-yellow text-center transition-all group"
            >
              <ShieldAlert className="w-4 h-4 text-river-light mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-[11px] font-bold text-ivory">Admin</div>
              <div className="text-[9px] text-ivory-muted">Directorate</div>
            </button>
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-emerald/20" />
          <span className="flex-shrink mx-3 text-xs text-ivory-muted uppercase font-mono">
            Or Standard Form
          </span>
          <div className="flex-grow border-t border-emerald/20" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role selector if registering */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-ivory">Choose Role to Simulate:</label>
            <div className="grid grid-cols-3 gap-2">
              {(['customer', 'farmer', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`py-1.5 px-2 text-center rounded-lg text-xs font-semibold capitalize border ${
                    selectedRole === r
                      ? 'bg-golden-yellow text-forest-dark border-golden-yellow font-bold'
                      : 'bg-forest-deeper text-ivory border-emerald/20'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {isRegister && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-ivory">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aditi Sen"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-field text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ivory">City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bengaluru, Pune, Delhi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="input-field text-xs"
                />
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-ivory">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field text-xs pl-9"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-ivory">Password (Demo)</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-ivory-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field text-xs pl-9"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full text-xs py-3 flex items-center justify-center gap-2 shadow-gold"
          >
            <span>{isRegister ? 'Create Simulated Account' : 'Sign in to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-golden-yellow hover:underline"
          >
            {isRegister
              ? 'Already registered? Switch to Demo Login'
              : "Don't have an account? Create demo profile"}
          </button>
        </div>

        <div className="p-3 rounded-xl bg-forest-deeper/80 border border-emerald/20 text-center text-[11px] text-ivory-muted">
          <ShieldCheck className="w-3.5 h-3.5 text-golden-yellow mx-auto mb-1" />
          <span>Demo Experience: No real credentials or server sessions stored.</span>
        </div>
      </div>
    </div>
  );
};
