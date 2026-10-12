// src/components/OrdersModal.jsx
// Orders modal showing order status and quick actions

import React from 'react';
import { motion } from 'framer-motion';
import { X, Clock, Bike, Phone, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OrdersModal({ isOpen, onClose }) {
  const { items, grandTotal, openCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-white dark:bg-[#11131c] rounded-3xl overflow-hidden shadow-2xl text-neutral-900 dark:text-white border border-[#EAEAEA] dark:border-neutral-800 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EAEAEA] dark:border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-xl text-neutral-900 dark:text-white">
              Orders &amp; Live Kitchen
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Mansarovar Sector 7, Jaipur Express Hub
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors"
            aria-label="Close orders modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Live Kitchen Status Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center font-bold text-lg shadow">
              🔥
            </div>
            <div>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                Clay Tandoor is Fired Up!
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                Current prep time: 12-15 mins • Delivery time: 25-35 mins
              </p>
            </div>
          </div>

          {/* Current Tray Overview */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-[#FF6B00]" />
                <span>Current Tray</span>
              </span>
              <span className="text-xs font-bold text-[#FF6B00]">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {items.length > 0 ? (
              <div className="space-y-2 mt-2">
                <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1">
                  {items.map((it) => (
                    <div
                      key={it.itemKey}
                      className="flex items-center justify-between text-xs py-1 border-b border-neutral-200/50 dark:border-neutral-700/50 last:border-0"
                    >
                      <span className="text-neutral-800 dark:text-neutral-200 truncate">
                        {it.name} (x{it.quantity})
                      </span>
                      <span className="font-bold text-neutral-900 dark:text-white shrink-0">
                        ₹{it.unitPrice * it.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between font-bold text-xs">
                  <span>Total Amount</span>
                  <span className="text-[#FF6B00] text-sm">₹{grandTotal}</span>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    openCart();
                  }}
                  className="w-full mt-2 py-2 px-3 rounded-xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <span>Complete Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <p className="text-xs text-neutral-500 py-3 text-center">
                No active items in tray. Choose any kulcha from the menu to start!
              </p>
            )}
          </div>

          {/* Quick Contact & Helplines */}
          <div className="space-y-2 pt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Need Instant Help with an Order?
            </p>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://wa.me/919358790020?text=Hi%20Kulcha%20King,%20I%20have%20an%20order%20query"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+919358790020"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold text-xs hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
