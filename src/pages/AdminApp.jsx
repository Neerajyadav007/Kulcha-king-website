// src/pages/AdminApp.jsx
// Protected Owner & Kitchen Command Center with PIN Authentication and Automated Customer WhatsApp Updates

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  KeyRound,
  ShieldCheck,
  Flame,
  Bike,
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  ShoppingBag,
  Volume2,
  VolumeX,
  RefreshCw,
  LogOut,
  Search,
  ArrowRight,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import {
  getAllOrders,
  updateOrderStatus,
  getCustomerStatusWhatsAppUrl,
  playKitchenNotificationBell,
  OWNER_CONFIG,
} from '../lib/orderService';

// Default Owner PIN (can also be customized)
const ADMIN_PIN = '2026';
const SESSION_KEY = 'kulcha_king_admin_session';

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Load orders
  const loadOrders = () => {
    setOrders(getAllOrders());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
      // Prompt for desktop notification permission if supported
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().catch(() => {});
      }
    }
  }, [isAuthenticated]);

  // Listen to live new order events across windows, tabs, and local dispatches
  useEffect(() => {
    if (!isAuthenticated) return;

    const triggerOrderAlert = (orderData) => {
      loadOrders();
      if (soundEnabled) {
        playKitchenNotificationBell();
      }
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
          navigator.vibrate([200, 100, 200, 100, 300]);
        } catch (e) {}
      }
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification('🚨 NEW KULCHA KING ORDER!', {
            body: `Order #${orderData?.orderId || ''} - ₹${orderData?.grandTotal || ''} (${orderData?.customerName || 'Customer'})`,
            icon: '/logo.png',
          });
        } catch (e) {}
      }
    };

    const handleLocalOrder = (e) => {
      triggerOrderAlert(e.detail);
    };

    const handleStorageChange = (e) => {
      if (e.key === 'kulcha_king_live_orders_v1') {
        loadOrders();
        if (soundEnabled) playKitchenNotificationBell();
      }
    };

    window.addEventListener('kulcha_king_new_order', handleLocalOrder);
    window.addEventListener('kulcha_king_order_updated', loadOrders);
    window.addEventListener('storage', handleStorageChange);

    // BroadcastChannel for instant inter-tab communication
    let bc = null;
    try {
      if ('BroadcastChannel' in window) {
        bc = new BroadcastChannel('kulcha_king_orders_channel');
        bc.onmessage = (msg) => {
          if (msg.data?.type === 'NEW_ORDER') {
            triggerOrderAlert(msg.data.order);
          } else if (msg.data?.type === 'STATUS_UPDATED') {
            loadOrders();
          }
        };
      }
    } catch (e) {}

    return () => {
      window.removeEventListener('kulcha_king_new_order', handleLocalOrder);
      window.removeEventListener('kulcha_king_order_updated', loadOrders);
      window.removeEventListener('storage', handleStorageChange);
      if (bc) {
        try {
          bc.close();
        } catch (e) {}
      }
    };
  }, [isAuthenticated, soundEnabled]);

  // Handle PIN Login
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid Passcode. Access restricted to restaurant owner/staff.');
      setPinInput('');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setPinInput('');
  };

  // Handle Status Update with Automatic Customer WhatsApp Dispatch
  const handleStatusChangeWithNotification = (order, newStatus) => {
    updateOrderStatus(order.orderId, newStatus);
    loadOrders();

    // Automatically generate WhatsApp message to the customer when owner updates status
    let statusMsg = '';
    if (newStatus === 'preparing') {
      statusMsg = `Your royal feast is accepted and is baking fresh in our 450°C clay tandoor! 🔥 (Est. 25 mins). Thank you! - Kulcha King`;
    } else if (newStatus === 'out_for_delivery') {
      statusMsg = `Our delivery rider has picked up your piping-hot kulchas and is on the way to ${order.address}! 🛵 (Est. 10-15 mins). - Kulcha King`;
    } else if (newStatus === 'delivered') {
      statusMsg = `Your order has been delivered! Enjoy your crispy butter-drenched feast! 👑 Please rate us 5-stars! - Kulcha King`;
    }

    if (statusMsg) {
      const customerUrl = getCustomerStatusWhatsAppUrl(order, statusMsg);
      window.open(customerUrl, '_blank');
    }
  };

  // If Not Authenticated: Show Secure PIN Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#090b10] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white dark:bg-[#11131c] rounded-3xl p-8 border border-[#EAEAEA] dark:border-neutral-800 shadow-2xl text-center space-y-6"
        >
          {/* Logo */}
          <div className="flex flex-col items-center">
            <img
              src="/logo.png"
              alt="Kulcha King & Parantha Singh"
              className="h-16 w-auto object-contain mb-1.5 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]"
            />
            <h2 className="font-black text-lg text-neutral-900 dark:text-white tracking-tight leading-tight">
              Kulcha King
            </h2>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold mb-2">
              &amp; Parantha Singh
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF6B00] bg-orange-50 dark:bg-orange-950/50 px-3 py-1 rounded-full border border-orange-200/60 dark:border-orange-900">
              Kitchen Command Center
            </span>
            <h1 className="text-xl font-extrabold text-neutral-900 dark:text-white mt-2">
              Owner &amp; Staff Login
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Protected portal. Enter your 4-digit security PIN to access live kitchen orders.
            </p>
          </div>

          {pinError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2 justify-center">
              <AlertCircle className="w-4 h-4" />
              <span>{pinError}</span>
            </div>
          )}

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="relative">
              <KeyRound className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Security PIN (e.g. 2026)"
                autoFocus
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-transparent focus:border-[#FF6B00] text-center font-mono text-lg font-bold tracking-widest text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#FF6B00] hover:bg-[#E05E00] active:scale-98 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Unlock Kitchen Portal</span>
            </button>
          </form>

          <div className="pt-2 border-t border-[#EAEAEA] dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
            <span>Owner PIN: Default 2026</span>
            <a
              href="menu.html"
              className="font-bold text-[#FF6B00] hover:underline flex items-center gap-1"
            >
              <span>Back to Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // Filter and search
  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = filterStatus === 'all' || ord.status === filterStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      ord.orderId.toLowerCase().includes(q) ||
      ord.customerName.toLowerCase().includes(q) ||
      ord.phone.includes(q);
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const activeOrdersCount = orders.filter(
    (o) => o.status === 'new' || o.status === 'preparing' || o.status === 'out_for_delivery'
  ).length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#090b10] text-[#1F1F1F] dark:text-white flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-[#0e1017] border-b border-[#EAEAEA] dark:border-neutral-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <a href="index.html" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Kulcha King & Parantha Singh"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="flex flex-col text-left">
              <span className="font-black text-sm sm:text-base tracking-tight text-neutral-900 dark:text-white leading-tight">
                Kulcha King
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold leading-none">
                &amp; Parantha Singh
              </span>
            </div>
          </a>
          <div className="hidden sm:block h-8 w-px bg-neutral-200 dark:bg-neutral-800 mx-1" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#FF6B00] text-white">
                Owner Dashboard
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Kitchen Live</span>
            </div>
            <h1 className="font-extrabold text-base sm:text-lg text-neutral-900 dark:text-white leading-tight mt-0.5">
              Live Order Management &amp; Dispatch
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 px-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold flex items-center gap-1.5 hover:border-orange-400 transition-colors"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-[#FF6B00]" />
                <span className="hidden sm:inline">Chime Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-neutral-400" />
                <span className="hidden sm:inline">Muted</span>
              </>
            )}
          </button>

          <button
            onClick={loadOrders}
            className="p-2 px-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold flex items-center gap-1.5 hover:border-orange-400 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-neutral-500" />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <a
            href="menu.html"
            target="_blank"
            rel="noreferrer"
            className="p-2 px-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold flex items-center gap-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customer Menu</span>
          </a>

          <button
            onClick={handleLogout}
            className="p-2 px-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-1.5 hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm">
            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium block">
              Active in Kitchen
            </span>
            <span className="text-2xl font-black text-[#FF6B00] mt-1 block">
              {activeOrdersCount} Orders
            </span>
          </div>

          <div className="p-4 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm">
            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium block">
              Total Today
            </span>
            <span className="text-2xl font-black text-neutral-900 dark:text-white mt-1 block">
              {orders.length} Orders
            </span>
          </div>

          <div className="p-4 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm">
            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium block">
              Revenue Generated
            </span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
              ₹{totalRevenue}
            </span>
          </div>

          <div className="p-4 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm">
            <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium block">
              Owner Phone &amp; WhatsApp
            </span>
            <span className="text-sm font-black text-[#FF6B00] mt-1.5 block font-mono">
              +91 {OWNER_CONFIG.primaryPhone.slice(2)}
            </span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
            {[
              { id: 'all', label: `All Orders (${orders.length})` },
              { id: 'new', label: '🟡 New' },
              { id: 'preparing', label: '🔥 In Tandoor' },
              { id: 'out_for_delivery', label: '🛵 Out for Delivery' },
              { id: 'delivered', label: '✅ Delivered' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3.5 py-2 rounded-2xl transition-all ${
                  filterStatus === tab.id
                    ? 'bg-[#FF6B00] text-white shadow-md shadow-orange-500/20'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, Name, Phone..."
              className="w-full pl-10 pr-3 py-2 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-xs border border-transparent focus:border-[#FF6B00] outline-none font-medium"
            />
          </div>
        </div>

        {/* Orders Cards List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="p-16 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto" />
              <h3 className="font-extrabold text-base text-neutral-700 dark:text-neutral-300">
                No orders found under this filter
              </h3>
              <p className="text-xs text-neutral-500">
                Any orders placed on the website will instantly appear here with audio notifications.
              </p>
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div
                key={ord.orderId}
                className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-md hover:shadow-xl transition-all space-y-4"
              >
                {/* Order Top Ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-sm text-[#FF6B00] bg-orange-50 dark:bg-orange-950/50 px-3 py-1 rounded-xl border border-orange-200 dark:border-orange-900/60">
                      #{ord.orderId}
                    </span>
                    <span className="font-extrabold text-sm text-neutral-900 dark:text-white">
                      {ord.customerName}
                    </span>
                    <a
                      href={`tel:${ord.phone}`}
                      className="text-xs font-bold text-neutral-500 hover:text-[#FF6B00] flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>{ord.phone}</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full border bg-orange-50 dark:bg-orange-950/40 text-[#FF6B00] border-orange-200">
                      Status: {ord.status.toUpperCase()}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium">
                      {ord.timeFormatted || new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Order Details & Items */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-xs">
                  {/* Items */}
                  <div className="lg:col-span-7 space-y-2">
                    <p className="font-bold text-neutral-400 uppercase text-[10px] tracking-wider">
                      Ordered Dishes &amp; Customization:
                    </p>
                    <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800 space-y-2">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs py-0.5">
                          <span className="text-neutral-800 dark:text-neutral-200 font-medium">
                            <strong className="text-[#FF6B00]">{it.quantity}x</strong> {it.name}
                            {it.selectedSpice && (
                              <span className="text-[10px] text-neutral-400 ml-1.5">
                                [{it.selectedSpice}]
                              </span>
                            )}
                            {it.extraButter && (
                              <span className="text-[10px] text-amber-600 font-bold ml-1">
                                [+Makhan]
                              </span>
                            )}
                          </span>
                          <span className="font-extrabold text-neutral-900 dark:text-white">
                            ₹{it.unitPrice * it.quantity}
                          </span>
                        </div>
                      ))}

                      {ord.instructions && (
                        <div className="mt-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-800 text-[11px] text-amber-700 dark:text-amber-400 italic font-semibold">
                          Customer Note: "{ord.instructions}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delivery & Payment Info */}
                  <div className="lg:col-span-5 space-y-2">
                    <p className="font-bold text-neutral-400 uppercase text-[10px] tracking-wider">
                      Delivery &amp; Payment Status:
                    </p>
                    <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800 space-y-2.5">
                      <div>
                        <span className="text-[10px] text-neutral-400 block font-semibold">
                          Delivery Address:
                        </span>
                        <p className="font-medium text-neutral-800 dark:text-neutral-200 mt-0.5 leading-snug">
                          {ord.address}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-neutral-400 block font-semibold">
                            Payment Mode:
                          </span>
                          <span className="font-bold text-neutral-900 dark:text-white">
                            {ord.paymentMethod}
                          </span>
                          {ord.utrNumber && (
                            <p className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                              UTR Ref: {ord.utrNumber}
                            </p>
                          )}
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-neutral-400 block font-semibold">
                            Total Bill:
                          </span>
                          <span className="text-xl font-black text-[#FF6B00]">
                            ₹{ord.grandTotal}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions Ribbon: Owner Status Transitions + Automated WhatsApp Dispatch */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-neutral-500 mr-1">Owner Action:</span>

                    {ord.status !== 'preparing' && ord.status !== 'delivered' && (
                      <button
                        onClick={() => handleStatusChangeWithNotification(ord, 'preparing')}
                        className="py-2 px-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#E05E00] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition-all active:scale-95"
                        title="Accept order and notify customer on WhatsApp"
                      >
                        <Flame className="w-3.5 h-3.5" />
                        <span>Accept &amp; Fire in Tandoor 🔥 (Notifies Customer via WA)</span>
                      </button>
                    )}

                    {ord.status !== 'out_for_delivery' && ord.status !== 'delivered' && (
                      <button
                        onClick={() => handleStatusChangeWithNotification(ord, 'out_for_delivery')}
                        className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                        title="Dispatch delivery rider and notify customer"
                      >
                        <Bike className="w-3.5 h-3.5" />
                        <span>Out for Delivery 🛵 (Notifies Customer via WA)</span>
                      </button>
                    )}

                    {ord.status !== 'delivered' && (
                      <button
                        onClick={() => handleStatusChangeWithNotification(ord, 'delivered')}
                        className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                        title="Mark order complete and delivered"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Delivered ✅</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${ord.phone}`}
                      className="py-2 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-white font-bold text-xs flex items-center gap-1.5 hover:bg-neutral-200 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>Call Customer</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
