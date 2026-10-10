import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { X, Plus, Check } from 'lucide-react';

export default function DishModal({ dish, isOpen, onClose }) {
  const { addToCart } = useCart();
  const [spice, setSpice] = useState('Medium');
  const [extraButter, setExtraButter] = useState(false);

  if (!isOpen || !dish) return null;

  const currentPrice = dish.price + (extraButter ? 25 : 0);

  const handleAdd = () => {
    addToCart(dish, { spice, extraButter });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md surface-card rounded-3xl overflow-hidden shadow-2xl text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
        >
          <X className="w-4 h-4" strokeWidth={2} />
        </button>

        {/* Dish Image */}
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {dish.badge}
            </span>
            <h3 className="font-serif font-bold text-2xl text-neutral-900 dark:text-white mt-0.5">
              {dish.name}
            </h3>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-2 leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Spice Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mb-2">
              Spice Level
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {['Mild', 'Medium', 'Spicy'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSpice(lvl)}
                  className={`py-2 px-2 rounded-xl border text-center font-bold transition-all ${
                    spice === lvl
                      ? 'border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Add-on Extra Butter */}
          <div>
            <button
              type="button"
              onClick={() => setExtraButter(!extraButter)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all ${
                extraButter
                  ? 'border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400'
                  : 'border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border ${
                    extraButter ? 'bg-amber-500 border-amber-500 text-white' : 'border-neutral-400'
                  }`}
                >
                  {extraButter && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>Extra Churned White Butter (Desi Makhan)</span>
              </div>
              <span>+₹25</span>
            </button>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              onClick={handleAdd}
              className="btn-luxury w-full !py-3"
            >
              <span>Add to Basket • ₹{currentPrice}</span>
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
