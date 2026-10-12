// src/components/ui/menu-item-card.tsx
// Built to exact specifications in menu-design.md with premium interactivity

import * as React from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Heart, Clock, Star } from "lucide-react";

export interface MenuItemCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  isVegetarian?: boolean;
  name: string;
  price: number;
  originalPrice?: number;
  quantity?: string;
  accompaniments?: string;
  prepTimeInMinutes?: number;
  rating?: number;
  reviewsCount?: number;
  badge?: string;
  badgeType?: "success" | "primary" | "warning";
  cartQuantity?: number;
  isFav?: boolean;
  onAdd: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onToggleFav?: () => void;
  onCardClick?: () => void;
}

const MenuItemCard = React.forwardRef<HTMLDivElement, MenuItemCardProps>(
  (
    {
      className = "",
      imageUrl,
      isVegetarian = true,
      name,
      price,
      originalPrice,
      quantity,
      accompaniments = "Served with spicy Pindi Chole & Onion Chutney",
      prepTimeInMinutes = 15,
      rating = 4.9,
      reviewsCount = 120,
      badge,
      badgeType = "success",
      cartQuantity = 0,
      isFav = false,
      onAdd,
      onIncrement,
      onDecrement,
      onToggleFav,
      onCardClick,
      ...props
    },
    ref
  ) => {
    const savings = originalPrice && originalPrice > price ? originalPrice - price : 0;

    // Resolve badge style according to menu-design.md
    const getBadgeStyle = () => {
      if (!badge) return "";
      const lower = badge.toLowerCase();
      if (lower.includes("bestseller") || lower.includes("must try") || badgeType === "success") {
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60";
      }
      if (lower.includes("15%") || lower.includes("off") || badgeType === "warning") {
        return "bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60";
      }
      return "bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60";
    };

    return (
      <div
        ref={ref}
        onClick={onCardClick}
        className={`bg-white dark:bg-[#13151f] rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-neutral-800/80 hover:border-orange-200 dark:hover:border-orange-900/50 flex flex-col justify-between relative group cursor-pointer ${
          cartQuantity > 0 ? "ring-2 ring-[#FF6B00] shadow-orange-500/10" : ""
        } ${className}`}
        {...props}
      >
        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between w-full z-10">
          {/* Top Left Badge */}
          {badge ? (
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md tracking-tight ${getBadgeStyle()}`}>
              {badge}
            </span>
          ) : (
            <span className="text-[10px] font-medium text-gray-400 dark:text-neutral-500">
              {prepTimeInMinutes}m prep
            </span>
          )}

          {/* Top Right: Veg Indicator + Favorite Heart */}
          <div className="flex items-center gap-1.5 ml-auto">
            {/* 100% Pure Veg Icon */}
            <div
              className="w-4 h-4 border border-green-600 rounded flex items-center justify-center bg-white dark:bg-neutral-900"
              title="100% Pure Vegetarian"
              aria-label="Pure Vegetarian"
            >
              <div className="w-2 h-2 rounded-full bg-green-600" />
            </div>

            {/* Favorite Button */}
            {onToggleFav && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFav();
                }}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-50 dark:bg-neutral-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-gray-400 hover:text-red-500 transition-colors"
                title={isFav ? "Remove from favorites" : "Save to favorites"}
                aria-label="Toggle favorite"
              >
                <Heart
                  className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                    isFav ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>

        {/* Product Image Section */}
        <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-xl bg-amber-50/50 dark:bg-neutral-800/40 my-2.5 relative">
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {savings > 0 && (
            <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-amber-300 border border-amber-400/30">
              Save ₹{savings}
            </span>
          )}
        </div>

        {/* Dish Info */}
        <div className="mt-1 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold text-base leading-snug group-hover:text-[#FF6B00] transition-colors line-clamp-1">
              {name}
            </h3>
            <p className="text-gray-500 dark:text-neutral-400 text-xs mt-1 line-clamp-1 leading-relaxed">
              {accompaniments || quantity || "Served with spicy Pindi Chole & Onion Chutney"}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-400 dark:text-neutral-500">
            <span className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{rating.toFixed(1)}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span>{prepTimeInMinutes} mins</span>
            </span>
          </div>
        </div>

        {/* Price & Action Footer */}
        <div className="flex items-center justify-between mt-3.5 pt-2.5 border-t border-gray-100 dark:border-neutral-800/80">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-gray-900 dark:text-white">₹{price}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-gray-400 dark:text-neutral-500 line-through font-medium">
                ₹{originalPrice}
              </span>
            )}
          </div>

          {/* Action button */}
          {cartQuantity > 0 ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#FF6B00] text-white font-bold text-xs shadow-md shadow-orange-500/20"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDecrement) onDecrement();
                }}
                className="w-5 h-5 flex items-center justify-center rounded-lg bg-[#E05E00] hover:bg-[#c45200] active:scale-90 text-white font-black text-xs transition-transform"
                aria-label={`Decrease ${name} quantity`}
              >
                <Minus className="w-3 h-3 stroke-[3]" />
              </button>
              <span className="min-w-[1rem] text-center font-black text-xs text-white">
                {cartQuantity}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onIncrement) onIncrement();
                  else onAdd();
                }}
                className="w-5 h-5 flex items-center justify-center rounded-lg bg-[#E05E00] hover:bg-[#c45200] active:scale-90 text-white font-black text-xs transition-transform"
                aria-label={`Increase ${name} quantity`}
              >
                <Plus className="w-3 h-3 stroke-[3]" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              className="bg-[#FF6B00] hover:bg-[#E05E00] active:scale-95 text-white p-2.5 rounded-xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center group-hover:shadow-lg"
              title={`Add ${name} to order`}
              aria-label={`Add ${name} to order`}
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

MenuItemCard.displayName = "MenuItemCard";

export { MenuItemCard };
export default MenuItemCard;
