import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/store';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const closeDrawer = useCallback(() => {
    setIsCartOpen(false);
    setOrderPlaced(false);
  }, [setIsCartOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeDrawer]);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderPlaced(true);
      clearCart();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart Drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-forest-dark border-l border-emerald/30 shadow-2xl flex flex-col text-ivory"
          >
            {/* Header */}
            <div className="p-5 border-b border-emerald/20 flex items-center justify-between bg-forest-deeper/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-golden-yellow/20 flex items-center justify-center text-golden-yellow">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-ivory">Eco-Cart</h3>
                  <p className="text-xs text-ivory-dark">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'} in your green bag
                  </p>
                </div>
              </div>

              <button
                onClick={closeDrawer}
                className="p-2 rounded-xl text-ivory-muted hover:text-golden-yellow hover:bg-forest-light/40 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {orderPlaced ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald/20 border border-emerald/40 flex items-center justify-center text-leaf-light">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-golden-yellow">
                    Order Request Received!
                  </h4>
                  <p className="text-sm text-ivory-dark max-w-xs mx-auto leading-relaxed">
                    Thank you for supporting Indian organic farmers and biodiversity conservation.
                  </p>
                  <div className="p-4 rounded-xl bg-forest-deeper/80 border border-golden-yellow/30 text-xs text-golden-yellow/90 space-y-1">
                    <p className="font-bold">✨ DEMO PLATFORM NOTICE</p>
                    <p>No financial transaction occurred. This simulated order is tracked in your customer dashboard.</p>
                  </div>
                  <div className="pt-2 flex flex-col gap-2">
                    <Link
                      to="/dashboard/customer"
                      onClick={closeDrawer}
                      className="btn-primary w-full text-center"
                    >
                      View in Customer Dashboard
                    </Link>
                    <button
                      onClick={() => setOrderPlaced(false)}
                      className="btn-secondary w-full"
                    >
                      Continue Browsing
                    </button>
                  </div>
                </div>
              ) : cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-forest-deeper flex items-center justify-center text-ivory-muted">
                    <ShoppingBag className="w-8 h-8 opacity-40" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-ivory">Your cart is empty</h4>
                  <p className="text-sm text-ivory-dark max-w-xs mx-auto">
                    Discover native seeds, organic farm manure, bird feeders, and clay water pots.
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <Link
                      to="/farmer-market"
                      onClick={closeDrawer}
                      className="btn-primary w-full text-center"
                    >
                      Browse Farmer Market
                    </Link>
                    <Link
                      to="/eco-store"
                      onClick={closeDrawer}
                      className="btn-secondary w-full text-center"
                    >
                      Visit Eco-Store
                    </Link>
                  </div>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-xl bg-forest-deeper/60 border border-emerald/20 flex gap-3 hover:border-emerald/40 transition-colors"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg object-cover bg-forest-dark shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h5 className="font-medium text-sm text-ivory line-clamp-1">
                            {item.product.name}
                          </h5>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-ivory-muted hover:text-red-400 p-1 transition-colors"
                            title="Remove item"
                            aria-label={`Remove ${item.product.name} from cart`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-leaf-light font-medium">
                          {item.product.seller.name} • {item.product.unit}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-bold text-golden-yellow text-sm">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>

                        <div className="flex items-center gap-2 bg-forest-dark border border-emerald/30 rounded-lg px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="text-ivory-dark hover:text-golden-yellow p-0.5"
                            aria-label={`Decrease quantity of ${item.product.name}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="text-ivory-dark hover:text-golden-yellow p-0.5"
                            aria-label={`Increase quantity of ${item.product.name}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {!orderPlaced && cart.length > 0 && (
              <div className="p-5 border-t border-emerald/20 bg-forest-deeper/90 space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-ivory-dark">
                    <span>Items Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-ivory-dark">
                    <span>Eco-Friendly Packing</span>
                    <span className="text-leaf-light font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-golden-yellow pt-2 border-t border-emerald/20">
                    <span>Estimated Total</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald/10 border border-emerald/30 flex items-center gap-2 text-xs text-ivory-dark">
                  <ShieldCheck className="w-4 h-4 text-leaf-light shrink-0" />
                  <span>100% Direct-to-Farmer & Artisan Fair Trade</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="btn-primary w-full py-3.5 shadow-gold-lg flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-forest-dark border-t-transparent rounded-full animate-spin" />
                      Simulating Checkout...
                    </span>
                  ) : (
                    <>
                      Proceed to Demo Checkout
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-ivory-muted/70">
                  Demo platform: No real payment collected. Orders are simulated in local state.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
