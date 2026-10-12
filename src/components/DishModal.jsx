// src/components/DishModal.jsx
// Premium Dish Customization Modal with rich add-ons

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Check, Star, Clock, ShieldCheck, Flame } from 'lucide-react';

export default function DishModal({ dish, isOpen, onClose }) {
  const { addToCart } = useCart();
  const [spice, setSpice] = useState('Medium');
  const [extraButter, setExtraButter] = useState(false);
  const [addLassiCombo, setAddLassiCombo] = useState(false);
  const [modalQty, setModalQty] = useState(1);

  if (!isOpen || !dish) return null;

  const butterCost = extraButter ? 25 : 0;
  const lassiCost = addLassiCombo ? 79 : 0;
  const unitPrice = dish.price + butterCost + lassiCost;
  const finalPrice = unitPrice * modalQty;

  const handleAdd = () => {
    for (let i = 0; i < modalQty; i++) {
      addToCart(dish, { spice, extraButter });
    }
    if (addLassiCombo) {
      addToCart({
        id: "k-05",
        name: "Royal Kulhad Malai Lassi (Combo Special)",
        price: 79,
        originalPrice: 89,
        quantity: "450 ml Earthen Kulhad",
        category: "beverages",
        image: "https://images.unsplash.com/photo-1571006682858-a458b8d22383?auto=format&fit=crop&w=600&q=80",
        isVeg: true,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg bg-white dark:bg-[#11131c] rounded-3xl overflow-hidden shadow-2xl text-neutral-900 dark:text-white border border-[#EAEAEA] dark:border-neutral-800 max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>

        {/* Dish Image */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden shrink-0">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Badges on image */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              {dish.badge && (
                <span className="px-2.5 py-1 rounded-md bg-[#FF6B00] font-bold text-xs uppercase tracking-tight shadow">
                  {dish.badge}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs font-semibold bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{dish.rating || 4.9}</span>
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{dish.prepTimeInMinutes || 12} mins prep</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-2xl text-neutral-900 dark:text-white">
                {dish.name}
              </h3>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-[#FF6B00]">₹{dish.price}</span>
                {dish.originalPrice && (
                  <span className="text-xs line-through text-neutral-400">₹{dish.originalPrice}</span>
                )}
              </div>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
              {dish.description}
            </p>

            <p className="text-xs text-[#2D8A4E] dark:text-emerald-400 font-semibold mt-1.5 flex items-center gap-1.5">
              <span>✦</span>
              <span>{dish.accompaniments || dish.servedWith || "Served with spicy Pindi Chole & Iced Onion Chutney"}</span>
            </p>
          </div>

          {/* Spice Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mb-2">
              Select Spice Level
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'Mild', label: 'Mild Spice', sub: 'Gentle warmth' },
                { id: 'Medium', label: 'Medium (Original)', sub: 'Authentic Punjabi' },
                { id: 'Spicy', label: 'Extra Spicy 🔥', sub: 'Desi green chili' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setSpice(lvl.id)}
                  className={`py-2 px-2.5 rounded-xl border text-left font-bold transition-all ${
                    spice === lvl.id
                      ? 'border-[#FF6B00] bg-[#FFF2E8] dark:bg-orange-950/40 text-[#FF6B00] ring-1 ring-[#FF6B00]'
                      : 'border-[#EAEAEA] dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                  }`}
                >
                  <p className="text-xs font-bold">{lvl.label}</p>
                  <p className="text-[10px] font-normal text-neutral-500 mt-0.5">{lvl.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons Section */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
              Customize &amp; Add-ons
            </label>

            {/* Extra Butter */}
            <button
              type="button"
              onClick={() => setExtraButter(!extraButter)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all ${
                extraButter
                  ? 'border-[#FF6B00] bg-[#FFF2E8] dark:bg-orange-950/40 text-[#FF6B00]'
                  : 'border-[#EAEAEA] dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border ${
                    extraButter ? 'bg-[#FF6B00] border-[#FF6B00] text-white' : 'border-neutral-400'
                  }`}
                >
                  {extraButter && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>Extra Churned White Butter (Desi Makhan Float)</span>
              </div>
              <span className="font-extrabold text-[#FF6B00]">+₹25</span>
            </button>

            {/* Add Sweet Lassi Combo */}
            <button
              type="button"
              onClick={() => setAddLassiCombo(!addLassiCombo)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all ${
                addLassiCombo
                  ? 'border-[#2D8A4E] bg-emerald-50 dark:bg-emerald-950/40 text-[#2D8A4E]'
                  : 'border-[#EAEAEA] dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border ${
                    addLassiCombo ? 'bg-[#2D8A4E] border-[#2D8A4E] text-white' : 'border-neutral-400'
                  }`}
                >
                  {addLassiCombo && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>Add Royal Kulhad Malai Lassi (450ml)</span>
              </div>
              <span className="font-extrabold text-[#2D8A4E]">+₹79 (Save ₹10)</span>
            </button>
          </div>

          {/* Quantity Controls & Action */}
          <div className="pt-2 flex items-center gap-4">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700">
              <button
                type="button"
                onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                className="w-7 h-7 rounded-lg bg-white dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-white hover:text-[#FF6B00] transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-extrabold text-sm w-4 text-center">{modalQty}</span>
              <button
                type="button"
                onClick={() => setModalQty(modalQty + 1)}
                className="w-7 h-7 rounded-lg bg-white dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-white hover:text-[#FF6B00] transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="flex-1 py-3 px-6 rounded-xl bg-[#FF6B00] hover:bg-[#E05E00] active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/25"
            >
              <span>Add to Basket • ₹{finalPrice}</span>
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
