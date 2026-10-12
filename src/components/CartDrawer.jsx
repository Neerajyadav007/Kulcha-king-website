import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    itemCount,
    subtotal,
    discountAmount,
    coupon,
    applyCoupon,
    removeCoupon,
    gst,
    deliveryFee,
    grandTotal,
  } = useCart();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 499;
  const neededForFreeDelivery = freeDeliveryThreshold - subtotal;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          onClick={closeCart}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-6">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md surface-card border-l border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white flex flex-col shadow-2xl bg-white dark:bg-[#0b0e17]"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <h2 className="font-serif font-bold text-xl text-neutral-900 dark:text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-500" />
                  <span>Your Basket</span>
                </h2>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>

            {/* Free Delivery Bar */}
            {items.length > 0 && (
              <div className="px-6 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-amber-500/10 dark:bg-amber-500/10 text-xs">
                {neededForFreeDelivery > 0 ? (
                  <p className="text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Add <strong className="text-amber-600 dark:text-amber-400">₹{neededForFreeDelivery}</strong> more for Free Delivery in Jaipur.</span>
                  </p>
                ) : (
                  <p className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <span>✓ Unlocked Free Delivery across Jaipur!</span>
                  </p>
                )}
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-500">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-neutral-900 dark:text-white">Your basket is empty</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-xs leading-relaxed">
                    Choose from our freshly baked tandoori kulchas and buttery paranthas.
                  </p>
                  <a
                    href="menu.html"
                    onClick={closeCart}
                    className="btn-luxury mt-2"
                  >
                    <span>Browse Menu</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.itemKey}
                    className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 flex gap-4 items-center shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white truncate">{item.name}</h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300">
                        {item.selectedSpice} {item.extraButter && '• +Butter'}
                      </p>
                      <p className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                        ₹{item.unitPrice * item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-xl border border-neutral-300 dark:border-neutral-700 p-0.5 bg-white dark:bg-neutral-800">
                        <button
                          onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                          className="p-1 hover:text-amber-500 text-neutral-700 dark:text-neutral-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-neutral-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                          className="p-1 hover:text-amber-500 text-neutral-700 dark:text-neutral-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.itemKey)}
                        className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Single Action Button */}
            {items.length > 0 && (
              <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-[#0c0e17] space-y-4">
                {/* Promo Code Input */}
                <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500 mb-1.5">
                    <span>Have a Promo Code?</span>
                    {coupon && (
                      <button
                        onClick={removeCoupon}
                        className="text-red-500 text-[10px] font-bold hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {coupon ? (
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-xl border border-emerald-200 dark:border-emerald-800">
                      <span>✓ {coupon.code} Applied ({coupon.percent ? `${coupon.percent}% OFF` : 'Free Delivery'})</span>
                      <span className="text-[#FF6B00]">-₹{discountAmount}</span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Try FIRSTKULCHA"
                        className="flex-1 px-3 py-1.5 rounded-xl text-xs bg-neutral-100 dark:bg-neutral-900 border border-transparent focus:border-[#FF6B00] focus:outline-none uppercase font-bold"
                      />
                      <button
                        onClick={() => {
                          if (promoInput.trim()) {
                            applyCoupon(promoInput);
                            setPromoInput('');
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-neutral-900 dark:text-white">₹{subtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Discount ({coupon?.code})</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span className="font-bold text-neutral-900 dark:text-white">₹{gst}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      {deliveryFee === 0 ? <span className="text-emerald-500 font-bold">FREE</span> : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex justify-between text-base font-bold text-neutral-900 dark:text-white">
                    <span>Total Amount</span>
                    <span className="text-xl font-extrabold text-[#FF6B00]">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Exactly 1 primary action button */}
                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#FF6B00] hover:bg-[#E05E00] active:scale-98 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all"
                >
                  <span>Proceed to Checkout (₹{grandTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
      />
    </>
  );
}
