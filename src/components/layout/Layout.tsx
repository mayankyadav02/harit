import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '@/components/common/CartDrawer';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-forest-green text-ivory selection:bg-golden-yellow selection:text-forest-dark relative">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};
