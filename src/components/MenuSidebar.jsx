// src/components/MenuSidebar.jsx
// Navigation Sidebar Component with official logo.png and Kitchen Portal access

import React from 'react';
import {
  Home,
  BookOpen,
  LayoutGrid,
  Tag,
  CalendarCheck,
  ShoppingBag,
  Star,
  Headphones,
  Flame,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function MenuSidebar({
  activeNav = 'menu',
  onSelectNav,
  mobileOpen = false,
  onCloseMobile,
}) {
  const { coupon, applyCoupon } = useCart();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: 'index.html' },
    { id: 'menu', label: 'Menu', icon: BookOpen, href: '#menu' },
    { id: 'categories', label: 'Categories', icon: LayoutGrid, href: '#categories' },
    { id: 'offers', label: 'Offers', icon: Tag, href: '#offers' },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag, action: 'orders' },
    { id: 'reviews', label: 'Reviews', icon: Star, action: 'reviews' },
    { id: 'reservations', label: 'Reservations', icon: CalendarCheck, href: 'contact.html' },
    { id: 'support', label: 'Support', icon: Headphones, href: 'contact.html' },
  ];

  const handleLinkClick = (item, e) => {
    if (item.action) {
      e.preventDefault();
      onSelectNav(item.action);
    } else if (item.href.startsWith('#')) {
      e.preventDefault();
      onSelectNav(item.id);
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (onCloseMobile) onCloseMobile();
  };

  const handleClaimDiscount = () => {
    applyCoupon('FIRSTKULCHA');
  };

  const sidebarContent = (
    <div className="w-[240px] h-full flex flex-col justify-between p-4 bg-white dark:bg-[#0e1017] border-r border-[#EAEAEA] dark:border-neutral-800/80 transition-colors">
      <div>
        {/* Brand Header with Official Logo */}
        <div className="flex items-center justify-between pb-4 mb-3 border-b border-[#EAEAEA] dark:border-neutral-800">
          <a href="index.html" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Kulcha King & Parantha Singh"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(245,158,11,0.2)]"
            />
            <div>
              <span className="font-extrabold text-sm tracking-tight text-neutral-900 dark:text-white leading-tight block">
                Kulcha King
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium block">
                &amp; Parantha Singh
              </span>
            </div>
          </a>

          {mobileOpen && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="space-y-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            const isKitchen = item.id === 'kitchen';

            return (
              <a
                key={item.id}
                href={item.href || '#'}
                onClick={(e) => handleLinkClick(item, e)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'border-l-4 border-[#FF6B00] bg-[#FFF2E8] dark:bg-[#FF6B00]/15 text-[#FF6B00] font-bold shadow-sm'
                    : isKitchen
                    ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-neutral-800/80'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive
                      ? 'text-[#FF6B00]'
                      : isKitchen
                      ? 'text-amber-500'
                      : 'text-neutral-400 dark:text-neutral-500'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Promo Card in Sidebar */}
      <div className="mt-4 pt-3 border-t border-[#EAEAEA] dark:border-neutral-800">
        <div className="relative overflow-hidden rounded-2xl p-3 bg-gradient-to-br from-[#FFF2E8] via-[#FFEADB] to-[#FFF8F0] dark:from-[#261810] dark:to-[#17120e] border border-orange-200 dark:border-orange-900/40 text-neutral-900 dark:text-white shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#FF6B00] text-white">
              Special Offer
            </span>
            <span className="text-sm">🔥</span>
          </div>

          <h4 className="font-extrabold text-xs text-neutral-900 dark:text-white leading-snug">
            30% OFF First Order
          </h4>
          <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5 leading-tight">
            Use code: <strong className="text-[#FF6B00]">FIRSTKULCHA</strong>
          </p>

          <button
            type="button"
            onClick={handleClaimDiscount}
            disabled={coupon?.code === 'FIRSTKULCHA'}
            className="w-full mt-2 py-1.5 px-3 rounded-xl bg-[#FF6B00] hover:bg-[#E05E00] active:scale-95 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-orange-500/20 disabled:opacity-80 disabled:pointer-events-none"
          >
            {coupon?.code === 'FIRSTKULCHA' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Coupon Applied!</span>
              </>
            ) : (
              <>
                <span>Apply Discount</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        <p className="text-[10px] text-center text-neutral-400 dark:text-neutral-500 mt-2.5 font-medium">
          Fresh from Clay Tandoor • 100% Veg
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-[240px] shrink-0 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto no-scrollbar z-30">
        {sidebarContent}
      </aside>

      {/* Mobile / Tablet Off-canvas Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />
          <div className="relative z-10 h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
