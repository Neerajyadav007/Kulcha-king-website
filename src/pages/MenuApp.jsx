import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import Toast from '../components/Toast';
import DishModal from '../components/DishModal';
import { useCart } from '../context/CartContext';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import {
  Search,
  ShoppingBag,
  Flame,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  UtensilsCrossed,
  Utensils,
  Coffee,
  Star,
  Bike,
  MessageCircle,
  Clock,
  ShieldCheck,
  Check,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { MenuItemCard } from '../components/ui/menu-item-card';

export default function MenuApp() {
  const {
    items,
    itemCount,
    subtotal,
    gst,
    deliveryFee,
    grandTotal,
    openCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [under200Only, setUnder200Only] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: MENU_ITEMS.length };
    MENU_CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = MENU_ITEMS.filter((i) => i.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filtered items based on category, search & quick toggles
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesBestseller = !bestsellerOnly || Boolean(item.badge);
      const matchesUnder200 = !under200Only || item.price <= 200;
      return matchesCategory && matchesSearch && matchesBestseller && matchesUnder200;
    });
  }, [activeCategory, searchQuery, bestsellerOnly, under200Only]);

  // Dish quantity in cart
  const getItemQuantity = (dishId) => {
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

  // WhatsApp order generator
  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    const itemsList = items
      .map(
        (i) =>
          `• ${i.name} (x${i.quantity}) - ₹${i.unitPrice * i.quantity} [${i.selectedSpice}${
            i.extraButter ? ', +Extra Makhan' : ''
          }]`
      )
      .join('\n');
    const msg = encodeURIComponent(
      `*New Order from Kulcha King Website*\n\n` +
        `*Delicacies:*\n${itemsList}\n\n` +
        `Subtotal: ₹${subtotal}\n` +
        `GST (5%): ₹${gst}\n` +
        `Delivery: ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}\n` +
        `*Grand Total: ₹${grandTotal}*\n\n` +
        `Please confirm my order and estimated delivery time to Jaipur!`
    );
    window.open(`https://wa.me/918949019457?text=${msg}`, '_blank');
  };

  const getCategoryIcon = (catId) => {
    switch (catId) {
      case 'kulchas':
        return <Flame className="w-4 h-4" />;
      case 'paranthas':
        return <Sparkles className="w-4 h-4" />;
      case 'nukkad':
        return <Utensils className="w-4 h-4" />;
      case 'beverages':
        return <Coffee className="w-4 h-4" />;
      default:
        return <UtensilsCrossed className="w-4 h-4" />;
    }
  };

  const activeCategoryObj = MENU_CATEGORIES.find((c) => c.id === activeCategory) || MENU_CATEGORIES[0];
  const freeDeliveryThreshold = 499;
  const neededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const deliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar activePage="menu" />

      {/* Hero Header with Royal Ambience */}
      <section className="relative py-8 sm:py-12 border-b border-neutral-200 dark:border-neutral-800/80 overflow-hidden bg-neutral-50/50 dark:bg-neutral-900/20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Authentic Amritsari Tandoor • 100% Pure Vegetarian</span>
            </span>
            <h1 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-white tracking-tight">
              Culinary Menu &amp; Ordering Studio<span className="text-amber-500">.</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto mt-2 leading-relaxed">
              Explore freshly rolled Kulchas baked in a traditional clay oven, slow-cooked Choley, and frothy Pede Wali Lassi in Mansarovar, Jaipur.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mobile Horizontal Category Rail (< lg) */}
      <div className="lg:hidden sticky top-[57px] sm:top-[61px] z-30 surface-card border-b border-neutral-200 dark:border-neutral-800/80 py-2.5 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] ?? 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-md border border-amber-400'
                      : 'border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-amber-500 dark:hover:border-amber-400 bg-white/70 dark:bg-neutral-900/60'
                  }`}
                >
                  {getCategoryIcon(cat.id)}
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/20 text-white' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Split Culinary Studio: 12-Column Responsive Layout */}
      <div className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================== */}
          {/* COLUMN 1: Vertical Category Navigation Rail (Desktop)     */}
          {/* ======================================================== */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6">
            {/* Category Selector Card */}
            <div className="surface-card rounded-3xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm bg-white dark:bg-[#0c0e17]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <h2 className="font-serif font-bold text-base text-neutral-900 dark:text-white">
                    Categories
                  </h2>
                </div>
                <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
                  {MENU_ITEMS.length} dishes
                </span>
              </div>

              <nav className="space-y-1.5" aria-label="Menu categories">
                {MENU_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const count = categoryCounts[cat.id] ?? 0;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      type="button"
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                        isActive
                          ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 translate-x-1'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 hover:text-amber-500 dark:hover:text-amber-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className={isActive ? 'text-white' : 'text-amber-500'}>
                          {getCategoryIcon(cat.id)}
                        </span>
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Filters */}
              <div className="mt-5 pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Quick Filters</span>
                </p>
                <div className="flex flex-col gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setBestsellerOnly(!bestsellerOnly)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      bestsellerOnly
                        ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Star className={`w-3.5 h-3.5 ${bestsellerOnly ? 'text-amber-500 fill-amber-500' : 'text-neutral-400'}`} />
                      <span>Bestsellers Only</span>
                    </span>
                    {bestsellerOnly && <Check className="w-3.5 h-3.5 text-amber-500" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setUnder200Only(!under200Only)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      under200Only
                        ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <span>Under ₹200 Delicacies</span>
                    {under200Only && <Check className="w-3.5 h-3.5 text-amber-500" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Culinary Heritage Badge */}
            <div className="rounded-3xl p-5 border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-amber-600/5 text-neutral-800 dark:text-neutral-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>The Kulcha King Promise</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Hand-kneaded dough, baked fresh in 450°C clay tandoor. Served with complimentary Amritsari Choley, Butter &amp; Pyaz Chutney.
              </p>
            </div>
          </aside>

          {/* ======================================================== */}
          {/* COLUMN 2: Culinary Dish Stage (Center 6 cols on Desktop)  */}
          {/* ======================================================== */}
          <main className="col-span-1 lg:col-span-6 space-y-6">
            {/* Search and Active Filter Bar */}
            <div className="surface-card rounded-2xl p-3 sm:p-4 border border-neutral-200 dark:border-neutral-800 shadow-sm bg-white dark:bg-[#0c0e17] flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Search Field */}
              <div className="relative w-full sm:flex-1">
                <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Kulchas, Paranthas, Lassi..."
                  className="w-full pl-10 pr-9 py-2 rounded-xl input-luxury text-xs text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-neutral-600 dark:text-neutral-400 font-medium shrink-0">
                <span>
                  Showing <strong className="text-neutral-900 dark:text-white font-bold">{filteredItems.length}</strong> items
                </span>
                {(bestsellerOnly || under200Only || searchQuery) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setBestsellerOnly(false);
                      setUnder200Only(false);
                    }}
                    className="text-[11px] text-amber-600 dark:text-amber-400 underline font-bold hover:opacity-80"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </div>

            {/* Menu Dish Cards Grid */}
            {filteredItems.length === 0 ? (
              <div className="surface-card rounded-3xl p-12 text-center border border-neutral-200 dark:border-neutral-800 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl text-neutral-900 dark:text-white">
                  No delicacies match your filter
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto">
                  Try adjusting your search query or reset the category filters to discover our full authentic menu.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                    setBestsellerOnly(false);
                    setUnder200Only(false);
                  }}
                  className="btn-luxury !py-2 !px-5 !text-xs mt-2"
                >
                  <span>View All {MENU_ITEMS.length} Delicacies</span>
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                <AnimatePresence>
                  {filteredItems.map((dish) => {
                    const dishQty = getItemQuantity(dish.id);
                    return (
                      <MenuItemCard
                        key={dish.id}
                        imageUrl={dish.image}
                        isVegetarian={dish.isVegetarian ?? true}
                        name={dish.name}
                        price={dish.price}
                        originalPrice={dish.originalPrice ?? Math.round(dish.price * 1.35)}
                        quantity={dish.quantity || 'Served with Choley & Makhan'}
                        prepTimeInMinutes={dish.prepTimeInMinutes || 15}
                        badge={dish.badge}
                        cartQuantity={dishQty}
                        onAdd={() => addToCart(dish)}
                        onIncrement={() => addToCart(dish)}
                        onDecrement={() => handleDecrementDish(dish.id)}
                        onClick={() => setSelectedDish(dish)}
                        className="cursor-pointer"
                      />
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </main>

          {/* ======================================================== */}
          {/* COLUMN 3: Live Sticky Order Receipt Panel (Desktop)      */}
          {/* ======================================================== */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-5">
            <div className="surface-card rounded-3xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-xl bg-white dark:bg-[#0c0e17] flex flex-col">
              {/* Receipt Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500 text-white font-bold shadow-md shadow-amber-500/20">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-white">
                      Your Feast
                    </h3>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      {itemCount} {itemCount === 1 ? 'delicacy' : 'delicacies'} selected
                    </p>
                  </div>
                </div>

                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="p-1.5 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title="Clear tray"
                    aria-label="Clear order"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Free Delivery Meter */}
              <div className="my-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                  <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400">
                    <Bike className="w-3.5 h-3.5 text-amber-500" />
                    <span>Jaipur Delivery</span>
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {neededForFreeDelivery > 0 ? `₹${subtotal} / ₹499` : 'UNLOCKED'}
                  </span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-amber-500 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${deliveryProgress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <p className="text-[10px] text-neutral-600 dark:text-neutral-300 mt-1.5 font-medium">
                  {neededForFreeDelivery > 0 ? (
                    <>Add <strong className="text-amber-600 dark:text-amber-400 font-bold">₹{neededForFreeDelivery}</strong> more for free delivery.</>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Free Delivery Unlocked across Jaipur!</span>
                  )}
                </p>
              </div>

              {/* Items List or Empty Tray */}
              {items.length === 0 ? (
                <div className="py-10 px-3 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800/80 mx-auto flex items-center justify-center text-neutral-400">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-neutral-900 dark:text-white">
                    Your tray is empty
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Click <strong>+ Add to Basket</strong> on any dish to begin your royal feast.
                  </p>
                  
                  {/* Quick Starter Recommendations */}
                  <div className="pt-2 flex flex-col gap-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Popular Starters
                    </p>
                    {MENU_ITEMS.slice(0, 2).map((fav) => (
                      <button
                        key={fav.id}
                        onClick={() => addToCart(fav)}
                        className="w-full text-left p-2 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-amber-500 text-[11px] flex items-center justify-between transition-colors"
                      >
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate">{fav.name}</span>
                        <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">+ ₹{fav.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="max-h-[260px] overflow-y-auto space-y-2.5 pr-1 py-1 no-scrollbar">
                    {items.map((item) => (
                      <div
                        key={item.itemKey}
                        className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 flex gap-2.5 items-center"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs text-neutral-900 dark:text-white truncate">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                            {item.selectedSpice} {item.extraButter && '• +Makhan'}
                          </p>
                          <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                            ₹{item.unitPrice * item.quantity}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <div className="flex items-center rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-0.5">
                            <button
                              onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                              className="p-1 hover:text-amber-500 text-neutral-700 dark:text-neutral-300"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="w-4 text-center text-[11px] font-bold text-neutral-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                              className="p-1 hover:text-amber-500 text-neutral-700 dark:text-neutral-300"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Receipt Breakdown */}
                  <div className="mt-3 pt-3 border-t border-dashed border-neutral-200 dark:border-neutral-800 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (5%)</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">₹{gst}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        {deliveryFee === 0 ? <span className="text-emerald-500 font-bold">FREE</span> : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-baseline font-bold text-neutral-900 dark:text-white">
                      <span className="text-sm font-bold">Total Amount</span>
                      <span className="text-lg font-serif font-black text-amber-600 dark:text-amber-400">
                        ₹{grandTotal}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => setIsCheckoutOpen(true)}
                      className="btn-luxury w-full !py-3 !text-xs justify-center shadow-lg"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleWhatsAppOrder}
                      className="w-full py-2 px-3 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Order via WhatsApp</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Quick Guarantees */}
            <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 text-[11px] text-neutral-500 dark:text-neutral-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Delivered hot in 30-40 mins in Mansarovar</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Piping-hot thermal food packaging</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Floating Bottom Cart Bar for Mobile & Tablet (< lg) */}
      {itemCount > 0 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="lg:hidden fixed bottom-4 left-0 right-0 z-30 px-4 max-w-md mx-auto"
        >
          <div className="bg-[#0b0e17]/95 border border-amber-500/40 backdrop-blur-md rounded-2xl p-3 shadow-2xl flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500 text-black font-bold">
                <ShoppingBag className="w-4 h-4 text-black" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{itemCount} {itemCount === 1 ? 'dish' : 'dishes'} in Basket</p>
                <p className="text-xs text-amber-400 font-serif font-bold">Total: ₹{grandTotal}</p>
              </div>
            </div>
            <button
              onClick={openCart}
              className="btn-luxury !py-2 !px-4 !text-xs !shadow-none"
            >
              <span>View Basket</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Modals & Cart */}
      <CartDrawer />
      <Toast />
      {selectedDish && (
        <DishModal
          dish={selectedDish}
          isOpen={!!selectedDish}
          onClose={() => setSelectedDish(null)}
        />
      )}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
      <Footer />
    </div>
  );
}
