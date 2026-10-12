// src/components/MenuHeader.jsx
// Top Header Bar Component with original logo & Kitchen Portal button

import React from 'react';
import { Search, Heart, ShoppingBag, Sun, Moon, Menu, MapPin, X, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function MenuHeader({
  searchQuery,
  setSearchQuery,
  onOpenMobileSidebar,
  onOpenFavorites,
  onOpenOrders,
  onOpenOwnerPortal,
}) {
  const { itemCount, subtotal, openCart, favorites, theme, toggleTheme } = useCart();

  return (
    <header className="sticky top-0 z-40 h-[72px] bg-white dark:bg-[#0e1017] border-b border-[#EAEAEA] dark:border-neutral-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-colors">
      {/* Left: Mobile Hamburger + Brand Logo / Location Indicator */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Official Brand Logo */}
        <div className="flex items-center gap-2">
          <a
            href="index.html"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Kulcha King & Parantha Singh Home"
          >
            <img
              src="/logo.png"
              alt="Kulcha King & Parantha Singh"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(245,158,11,0.25)]"
            />
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-xs sm:text-sm tracking-tight text-neutral-900 dark:text-white leading-tight group-hover:text-[#FF6B00] transition-colors whitespace-nowrap">
                Kulcha King
              </span>
              <span className="text-[9px] sm:text-[10px] text-neutral-500 dark:text-neutral-400 font-medium leading-none whitespace-nowrap">
                &amp; Parantha Singh
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1.5 ml-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
            <span className="truncate max-w-[150px]">Mansarovar, Jaipur</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold ml-1">
              25-35 min
            </span>
          </div>
        </div>
      </div>

      {/* Center: Search Input Pill */}
      <div className="flex-1 max-w-xl mx-auto px-2">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish, kulcha, lassi, combos..."
            className="w-full h-11 pl-11 pr-10 rounded-full bg-[#F3F3F3] dark:bg-neutral-800/80 border border-transparent focus:border-[#FF6B00] focus:bg-white dark:focus:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right: Action Badges */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">

        {/* Favorites Badge */}
        <button
          type="button"
          onClick={onOpenFavorites}
          className="relative w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border border-[#EAEAEA] dark:border-neutral-700 shadow-sm hover:shadow-md flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:text-red-500 transition-all active:scale-95"
          title="View your saved favorites"
          aria-label="Favorites"
        >
          <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-red-500 fill-red-500/20' : ''}`} />
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
              {favorites.length}
            </span>
          )}
        </button>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border border-[#EAEAEA] dark:border-neutral-700 shadow-sm hover:shadow-md flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:text-[#FF6B00] transition-all active:scale-95"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-neutral-600" />
          )}
        </button>

        {/* Cart Action Badge */}
        <button
          type="button"
          onClick={openCart}
          className="relative flex items-center gap-2 h-10 px-3.5 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white shadow-md shadow-orange-500/20 active:scale-95 transition-all font-bold text-xs"
          aria-label="Open Cart"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="hidden sm:inline-block">Basket</span>
          {itemCount > 0 ? (
            <span className="px-1.5 py-0.5 rounded-full bg-white text-[#FF6B00] font-black text-[11px] shadow-sm ml-0.5">
              {itemCount}
            </span>
          ) : null}
          {subtotal > 0 && (
            <span className="hidden md:inline-block text-white/90 font-bold border-l border-white/30 pl-2">
              ₹{subtotal}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
