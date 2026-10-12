// src/pages/MenuApp.jsx
// Kulcha King — Restaurant Website UI/UX Design as specified in menu-design.md

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuHeader from '../components/MenuHeader';
import MenuSidebar from '../components/MenuSidebar';
import { MenuItemCard } from '../components/ui/menu-item-card';
import DishModal from '../components/DishModal';
import ReviewsModal from '../components/ReviewsModal';
import OrdersModal from '../components/OrdersModal';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import Toast from '../components/Toast';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { MENU_CATEGORIES, MENU_ITEMS, PROMO_OFFERS } from '../data/menuData';
import {
  Sparkles,
  Flame,
  Zap,
  Wheat,
  Utensils,
  UtensilsCrossed,
  Coffee,
  Star,
  Clock,
  ShieldCheck,
  Bike,
  Heart,
  SlidersHorizontal,
  Check,
  ArrowRight,
  Play,
  ShoppingBag,
  CheckCircle2,
  ChevronRight,
  X,
  Plus,
} from 'lucide-react';

export default function MenuApp() {
  const {
    items,
    itemCount,
    subtotal,
    grandTotal,
    openCart,
    addToCart,
    updateQuantity,
    favorites,
    toggleFavorite,
    isFavorite,
    applyCoupon,
  } = useCart();

  // Navigation & Filter States
  const [activeNav, setActiveNav] = useState('menu');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBestseller, setFilterBestseller] = useState(false);
  const [filterTopRated, setFilterTopRated] = useState(false);
  const [filterUnder200, setFilterUnder200] = useState(false);
  const [filterFavoritesOnly, setFilterFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  // Modals
  const [selectedDish, setSelectedDish] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuSectionRef = useRef(null);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: MENU_ITEMS.length };
    MENU_CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = MENU_ITEMS.filter(
          (i) => i.category === cat.id || i.categoryGroup === cat.alias
        ).length;
      }
    });
    return counts;
  }, []);

  // Filtered and Sorted Menu Items
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      // Category filter
      const matchesCategory =
        activeCategory === 'all' ||
        dish.category === activeCategory ||
        (activeCategory === 'classic' && dish.categoryGroup === 'kulchas');

      // Search filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        dish.name.toLowerCase().includes(query) ||
        (dish.description && dish.description.toLowerCase().includes(query)) ||
        (dish.accompaniments && dish.accompaniments.toLowerCase().includes(query));

      // Quick pills filter
      const matchesBestseller = !filterBestseller || Boolean(dish.badge?.toLowerCase().includes('bestseller'));
      const matchesTopRated = !filterTopRated || (dish.rating && dish.rating >= 4.8);
      const matchesUnder200 = !filterUnder200 || dish.price <= 200;
      const matchesFavorites = !filterFavoritesOnly || favorites.includes(dish.id);

      return (
        matchesCategory &&
        matchesSearch &&
        matchesBestseller &&
        matchesTopRated &&
        matchesUnder200 &&
        matchesFavorites
      );
    }).sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // recommended order
    });
  }, [
    activeCategory,
    searchQuery,
    filterBestseller,
    filterTopRated,
    filterUnder200,
    filterFavoritesOnly,
    favorites,
    sortBy,
  ]);

  // Quantity helper
  const getDishQuantityInCart = (dishId) => {
    return items
      .filter((it) => it.id === dishId)
      .reduce((sum, it) => sum + it.quantity, 0);
  };

  const handleDecrementDish = (dishId) => {
    const matching = items.filter((it) => it.id === dishId);
    if (matching.length > 0) {
      const target = matching[matching.length - 1];
      updateQuantity(target.itemKey, target.quantity - 1);
    }
  };

  const handleScrollToMenu = () => {
    if (menuSectionRef.current) {
      menuSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectNav = (actionOrId) => {
    if (actionOrId === 'reviews') {
      setIsReviewsOpen(true);
    } else if (actionOrId === 'orders') {
      setIsOrdersOpen(true);
    } else if (actionOrId === 'offers') {
      setActiveNav('offers');
      const elem = document.getElementById('offers-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    } else if (actionOrId === 'categories') {
      setActiveNav('categories');
      const elem = document.getElementById('categories-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveNav(actionOrId);
    }
  };

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'classic':
        return <Flame className="w-5 h-5 text-[#2D8A4E]" />;
      case 'fusion':
        return <Sparkles className="w-5 h-5 text-[#FF6B00]" />;
      case 'crispy':
        return <Zap className="w-5 h-5 text-[#D97706]" />;
      case 'paranthas':
        return <Wheat className="w-5 h-5 text-[#EA580C]" />;
      case 'nukkad':
        return <Utensils className="w-5 h-5 text-[#DC2626]" />;
      case 'beverages':
        return <Coffee className="w-5 h-5 text-[#0284C7]" />;
      default:
        return <UtensilsCrossed className="w-5 h-5 text-[#FF6B00]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#090b10] text-[#1F1F1F] dark:text-white transition-colors selection:bg-[#FF6B00] selection:text-white flex flex-col font-sans">
      {/* ======================================================== */}
      {/* 1. TOP HEADER BAR (Height: 72px as per Section 4.B)       */}
      {/* ======================================================== */}
      <MenuHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        onOpenFavorites={() => {
          setFilterFavoritesOnly(!filterFavoritesOnly);
          handleScrollToMenu();
        }}
        onOpenOrders={() => setIsOrdersOpen(true)}
      />

      {/* Main Structural Wrapper: Fixed Sidebar + Scrollable Content */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* ======================================================== */}
        {/* 2. NAVIGATION SIDEBAR (Width: 240px as per Section 4.A)   */}
        {/* ======================================================== */}
        <MenuSidebar
          activeNav={activeNav}
          onSelectNav={handleSelectNav}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* ======================================================== */}
        {/* 3. MAIN APPLICATION STAGE (Warm Food App Dashboard)       */}
        {/* ======================================================== */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-8 sm:space-y-10">
          
          {/* ------------------------------------------------------ */}
          {/* A. HERO BANNER (Section 3 & 4.C Specification)         */}
          {/* ------------------------------------------------------ */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF8F0] via-[#FFF2E5] to-[#FFEEDD] dark:from-[#211611] dark:via-[#191310] dark:to-[#120f0d] border border-orange-200/60 dark:border-orange-950 p-6 sm:p-8 lg:p-10 shadow-sm">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Headlines & CTA */}
              <div className="lg:col-span-7 space-y-4">
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-orange-200 dark:border-orange-900 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF6B00]">
                    GOOD FOOD, GOOD MOOD
                  </span>
                </div>

                {/* Headline: 42px Bold as specified */}
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#1F1F1F] dark:text-white leading-[1.15]">
                  Crispy, Butter-Drenched <span className="text-[#FF6B00]">Kulchas</span> Delivered Hot.
                </h1>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
                  Authentic Amritsari clay tandoor culinary mastery. Loaded with fresh white makhan, spicy pindi choley, and slow-churned lassi in Mansarovar, Jaipur.
                </p>

                {/* CTA Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleScrollToMenu}
                    className="py-3 px-6 rounded-xl bg-[#FF6B00] hover:bg-[#E05E00] active:scale-95 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-all"
                  >
                    <span>Order Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleScrollToMenu}
                    className="py-3 px-5 rounded-full bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 active:scale-95 text-neutral-800 dark:text-white font-bold text-xs flex items-center gap-2 border border-[#EAEAEA] dark:border-neutral-700 shadow-sm transition-all"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#FFF2E8] dark:bg-orange-950/60 text-[#FF6B00] flex items-center justify-center">
                      <Play className="w-2.5 h-2.5 fill-[#FF6B00]" />
                    </div>
                    <span>Explore Menu</span>
                  </button>
                </div>

                {/* Social Proof: Avatar Stack + Rating */}
                <div
                  onClick={() => setIsReviewsOpen(true)}
                  className="pt-3 flex items-center gap-3 cursor-pointer group"
                  title="Click to view reviews"
                >
                  <div className="flex -space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                      alt="Foodie avatar"
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-800 object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                      alt="Foodie avatar"
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-800 object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"
                      alt="Foodie avatar"
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-800 object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <span>★ 4.9</span>
                      <span className="text-neutral-500 font-normal">/ 5.0</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-semibold group-hover:text-[#FF6B00] transition-colors">
                      10K+ Happy Foodies in Jaipur • See Reviews →
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Platter with Floating Badges */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800 group">
                  <img
                    src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
                    alt="Authentic Amritsari Butter-Loaded Kulcha Platter"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Caption on hero image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                      Signature Platter
                    </p>
                    <h3 className="font-extrabold text-base sm:text-lg">
                      Amritsari Aloo Kulcha + Pindi Choley
                    </h3>
                  </div>
                </div>

                {/* Floating Badge 1: 450°C Clay Tandoor */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -top-3 -right-2 sm:-right-4 px-3.5 py-2 rounded-2xl bg-white dark:bg-neutral-900 border border-orange-200 dark:border-orange-900/60 shadow-xl flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-sm font-bold">
                    🔥
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-neutral-400">Authentic</p>
                    <p className="text-xs font-black text-neutral-900 dark:text-white">450°C Clay Tandoor</p>
                  </div>
                </motion.div>

                {/* Floating Badge 2: Express Fresh 30 Mins */}
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-3 -left-2 sm:-left-4 px-3.5 py-2 rounded-2xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-emerald-900/60 shadow-xl flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-[#2D8A4E] flex items-center justify-center text-sm font-bold">
                    ⚡
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-neutral-400">Express Hot</p>
                    <p className="text-xs font-black text-neutral-900 dark:text-white">30 Min Delivery</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------ */}
          {/* B. FEATURE HIGHLIGHTS (Section 3 Architecture)         */}
          {/* ------------------------------------------------------ */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                icon: Bike,
                title: 'Express Fresh',
                desc: 'Delivered in 25-35 mins hot from tandoor',
                color: 'text-[#FF6B00]',
                bg: 'bg-orange-50 dark:bg-orange-950/30',
              },
              {
                icon: ShieldCheck,
                title: 'Authentic Recipes',
                desc: 'Centuries-old Amritsari secret spices',
                color: 'text-[#2D8A4E]',
                bg: 'bg-emerald-50 dark:bg-emerald-950/30',
              },
              {
                icon: Sparkles,
                title: '100% Desi Makhan',
                desc: 'Fresh churned white butter on every kulcha',
                color: 'text-[#D97706]',
                bg: 'bg-amber-50 dark:bg-amber-950/30',
              },
              {
                icon: CheckCircle2,
                title: '100% Pure Veg',
                desc: 'Strictly vegetarian & hygienic kitchen',
                color: 'text-[#0284C7]',
                bg: 'bg-sky-50 dark:bg-sky-950/30',
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm flex items-center gap-3 hover:border-orange-300 dark:hover:border-orange-900 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-neutral-900 dark:text-white">
                      {feature.title}
                    </h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </section>

          {/* ------------------------------------------------------ */}
          {/* C. EXPLORE BY CATEGORY (Section 4.D Specification)     */}
          {/* ------------------------------------------------------ */}
          <section id="categories-section" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1F1F1F] dark:text-white">
                  Explore by Category
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Select a category to filter your favorite North Indian delicacies
                </p>
              </div>

              {activeCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className="text-xs font-bold text-[#FF6B00] hover:underline"
                >
                  View All Categories ({MENU_ITEMS.length})
                </button>
              )}
            </div>

            {/* Category Cards with Soft Pastel Background Tints */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {MENU_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
                const isSelected = activeCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;

                return (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      handleScrollToMenu();
                    }}
                    style={{ backgroundColor: isSelected ? undefined : cat.colorBg }}
                    className={`rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:scale-[1.03] border ${
                      isSelected
                        ? 'border-[#FF6B00] ring-2 ring-[#FF6B00] bg-white dark:bg-[#181a24] shadow-md shadow-orange-500/10'
                        : 'border-[#EAEAEA] dark:border-neutral-800/80 dark:!bg-[#11131c] shadow-sm'
                    }`}
                  >
                    {/* Centered Circular Visual */}
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white dark:bg-neutral-800 shadow-md border-2 border-white dark:border-neutral-700 flex items-center justify-center p-1 my-1">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        getCategoryIcon(cat.id)
                      )}
                    </div>

                    <h3 className="font-extrabold text-xs sm:text-sm text-neutral-900 dark:text-white mt-2 leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-semibold mt-0.5">
                      {count} {count === 1 ? 'Delicacy' : 'Delicacies'}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ------------------------------------------------------ */}
          {/* D. POPULAR DISHES & MENU GRID (5-Column Responsive)    */}
          {/* ------------------------------------------------------ */}
          <section ref={menuSectionRef} id="menu" className="space-y-6 pt-2">
            {/* Filter & Sort Controls Bar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Quick Filter Badges */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {/* All Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setFilterFavoritesOnly(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeCategory === 'all' && !filterFavoritesOnly
                      ? 'bg-[#FF6B00] text-white shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                  }`}
                >
                  All ({MENU_ITEMS.length})
                </button>

                {/* Bestseller Filter */}
                <button
                  type="button"
                  onClick={() => setFilterBestseller(!filterBestseller)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                    filterBestseller
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                  }`}
                >
                  <Star className="w-3.5 h-3.5" />
                  <span>Bestsellers</span>
                  {filterBestseller && <Check className="w-3 h-3" />}
                </button>

                {/* Top Rated (4.8+) Filter */}
                <button
                  type="button"
                  onClick={() => setFilterTopRated(!filterTopRated)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                    filterTopRated
                      ? 'bg-[#FF6B00] text-white shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                  }`}
                >
                  <span>★ 4.8+ Rated</span>
                  {filterTopRated && <Check className="w-3 h-3" />}
                </button>

                {/* Under 200 Filter */}
                <button
                  type="button"
                  onClick={() => setFilterUnder200(!filterUnder200)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                    filterUnder200
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                  }`}
                >
                  <span>Under ₹200</span>
                  {filterUnder200 && <Check className="w-3 h-3" />}
                </button>

                {/* Favorites Filter */}
                <button
                  type="button"
                  onClick={() => setFilterFavoritesOnly(!filterFavoritesOnly)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                    filterFavoritesOnly
                      ? 'bg-red-500 text-white shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${filterFavoritesOnly ? 'fill-white' : 'text-red-500'}`} />
                  <span>Favorites ({favorites.length})</span>
                </button>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 self-end md:self-auto shrink-0 text-xs">
                <span className="text-neutral-500 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl px-3 py-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 focus:ring-1 focus:ring-[#FF6B00] outline-none"
                >
                  <option value="recommended">Chef Recommended</option>
                  <option value="rating">Highest Rated ★</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Results Title & Status */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1F1F1F] dark:text-white">
                  {filterFavoritesOnly
                    ? 'Your Saved Favorites'
                    : activeCategory === 'all'
                    ? 'Popular Dishes & Royal Menu'
                    : MENU_CATEGORIES.find((c) => c.id === activeCategory)?.name || 'Menu'}
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Showing <strong className="text-neutral-900 dark:text-white font-bold">{filteredDishes.length}</strong> authentic items
                </p>
              </div>

              {(searchQuery || filterBestseller || filterTopRated || filterUnder200 || filterFavoritesOnly) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                    setFilterBestseller(false);
                    setFilterTopRated(false);
                    setFilterUnder200(false);
                    setFilterFavoritesOnly(false);
                  }}
                  className="text-xs font-bold text-[#FF6B00] hover:underline"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* 5-Column Responsive Card Grid (Desktop ≥1280px: 5 cols, Tablet: 3 cols, Mobile: 1-2 cols) */}
            {filteredDishes.length === 0 ? (
              <div className="rounded-3xl p-12 text-center bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#FF6B00] flex items-center justify-center text-2xl">
                  🍽️
                </div>
                <h3 className="font-extrabold text-xl text-neutral-900 dark:text-white">
                  No delicacies match your filters
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
                  Try searching for another keyword or clear the filters to explore all 24 authentic delicacies.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                    setFilterBestseller(false);
                    setFilterTopRated(false);
                    setFilterUnder200(false);
                    setFilterFavoritesOnly(false);
                  }}
                  className="py-2.5 px-5 rounded-xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs"
                >
                  View All Delicacies
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5"
              >
                <AnimatePresence>
                  {filteredDishes.map((dish) => {
                    const dishQty = getDishQuantityInCart(dish.id);
                    const isFav = isFavorite(dish.id);

                    return (
                      <MenuItemCard
                        key={dish.id}
                        imageUrl={dish.image}
                        name={dish.name}
                        price={dish.price}
                        originalPrice={dish.originalPrice}
                        quantity={dish.quantity}
                        accompaniments={dish.accompaniments || dish.servedWith}
                        prepTimeInMinutes={dish.prepTimeInMinutes}
                        rating={dish.rating}
                        reviewsCount={dish.reviews_count}
                        badge={dish.badge}
                        badgeType={dish.badge_type}
                        cartQuantity={dishQty}
                        isFav={isFav}
                        onAdd={() => addToCart(dish)}
                        onIncrement={() => addToCart(dish)}
                        onDecrement={() => handleDecrementDish(dish.id)}
                        onToggleFav={() => toggleFavorite(dish.id)}
                        onCardClick={() => setSelectedDish(dish)}
                      />
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </section>

          {/* ------------------------------------------------------ */}
          {/* E. OFFER BANNERS (2-Column Grid as per Section 3 & 4)  */}
          {/* ------------------------------------------------------ */}
          <section id="offers-section" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1F1F1F] dark:text-white">
                  Exclusive Offers &amp; Family Combos
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Save extra on your feast with our chef-curated combo deals
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {PROMO_OFFERS.map((offer) => (
                <div
                  key={offer.id}
                  className={`p-6 rounded-3xl bg-gradient-to-br ${offer.bgClass} border ${offer.borderColor} shadow-sm flex flex-col justify-between relative overflow-hidden group`}
                >
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-tight ${offer.badgeColor}`}>
                        {offer.tag}
                      </span>
                      <span className="font-extrabold text-lg text-[#FF6B00]">
                        {offer.discount}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-xl text-neutral-900 dark:text-white">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {offer.description}
                    </p>
                  </div>

                  <div className="pt-6 flex items-center justify-between relative z-10 border-t border-black/5 dark:border-white/5 mt-4">
                    <div>
                      <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                        Promo Code
                      </span>
                      <span className="text-sm font-black font-mono tracking-wider text-[#FF6B00]">
                        {offer.code}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (offer.comboItem) {
                          addToCart(offer.comboItem);
                        } else {
                          applyCoupon(offer.code);
                        }
                      }}
                      className="py-2.5 px-5 rounded-xl bg-[#FF6B00] hover:bg-[#E05E00] active:scale-95 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-orange-500/20 transition-all"
                    >
                      <span>{offer.buttonText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* ======================================================== */}
      {/* 4. STICKY FLOATING CART BAR FOR MOBILE (< lg screens)     */}
      {/* ======================================================== */}
      {itemCount > 0 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="lg:hidden fixed bottom-4 left-0 right-0 z-40 px-4 max-w-lg mx-auto"
        >
          <div className="bg-[#10121a]/95 border border-[#FF6B00]/40 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00] text-white font-bold flex items-center justify-center shadow">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  {itemCount} {itemCount === 1 ? 'delicacy' : 'delicacies'} in Basket
                </p>
                <p className="text-xs text-[#FF6B00] font-black">
                  Total: ₹{grandTotal}
                </p>
              </div>
            </div>

            <button
              onClick={openCart}
              className="py-2 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <span>View Basket</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* 5. MODALS, DRAWERS & SYSTEM FEEDBACK                      */}
      {/* ======================================================== */}
      <CartDrawer />
      <Toast />

      {selectedDish && (
        <DishModal
          dish={selectedDish}
          isOpen={Boolean(selectedDish)}
          onClose={() => setSelectedDish(null)}
        />
      )}

      <ReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
