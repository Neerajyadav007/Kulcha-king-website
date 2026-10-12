// src/components/ReviewsModal.jsx
// Modal showing authentic customer testimonials & ratings

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/menuData';

export default function ReviewsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl bg-white dark:bg-[#11131c] rounded-3xl overflow-hidden shadow-2xl text-neutral-900 dark:text-white border border-[#EAEAEA] dark:border-neutral-800 flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EAEAEA] dark:border-neutral-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-500 font-bold text-lg">★ 4.9 / 5.0</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                (2,400+ Verified Jaipur Foodies)
              </span>
            </div>
            <h3 className="font-extrabold text-xl text-neutral-900 dark:text-white mt-1">
              Customer Reviews &amp; Love
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors"
            aria-label="Close reviews modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reviews List */}
        <div className="p-6 overflow-y-auto space-y-4">
          {CUSTOMER_REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                      {review.name}
                    </h4>
                    <p className="text-[11px] text-[#FF6B00] font-semibold">
                      Ordered: {review.dish}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed italic mt-1">
                "{review.comment}"
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60 text-[10px] text-neutral-500">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3 h-3" /> Verified Order in Jaipur
                </span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 border-t border-[#EAEAEA] dark:border-neutral-800 text-center text-xs text-neutral-500">
          Ranked #1 for Authentic Amritsari Kulcha in Mansarovar, Jaipur
        </div>
      </motion.div>
    </div>
  );
}
