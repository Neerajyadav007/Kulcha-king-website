// src/components/OwnerPortalModal.jsx
// Comprehensive Restaurant Kitchen & Owner Command Center

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Phone,
  MessageCircle,
  Clock,
  Bike,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  ShoppingBag,
  Flame,
  Search,
  Filter,
  Volume2,
  VolumeX,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import {
  getAllOrders,
  updateOrderStatus,
  getCustomerStatusWhatsAppUrl,
  OWNER_CONFIG,
} from '../lib/orderService';

export default function OwnerPortalModal({ isOpen, onClose }) {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const loadOrders = () => {
    setOrders(getAllOrders());
  };

  useEffect(() => {
    if (isOpen) {
      loadOrders();
    }
  }, [isOpen]);

  // Listen to new order events
  useEffect(() => {
    const handleNewOrder = (e) => {
      loadOrders();
      if (soundEnabled) {
        try {
          const audio = new Audio(
            'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'
          );
          audio.play().catch(() => {});
        } catch (err) {}
      }
    };

    window.addEventListener('kulcha_king_new_order', handleNewOrder);
    window.addEventListener('kulcha_king_order_updated', loadOrders);
    return () => {
      window.removeEventListener('kulcha_king_new_order', handleNewOrder);
      window.removeEventListener('kulcha_king_order_updated', loadOrders);
    };
  }, [soundEnabled]);

  if (!isOpen) return null;

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    loadOrders();
  };

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

  // Calculate Metrics
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const upiRevenue = orders
    .filter((o) => o.paymentMethod?.toLowerCase().includes('upi') && o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const activeOrdersCount = orders.filter(
    (o) => o.status === 'new' || o.status === 'preparing' || o.status === 'out_for_delivery'
  ).length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return {
          label: 'New Order',
          bg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300',
          dot: 'bg-amber-500',
        };
      case 'preparing':
        return {
          label: 'In Clay Tandoor 🔥',
          bg: 'bg-orange-100 text-[#FF6B00] dark:bg-orange-950/80 dark:text-orange-300 border-orange-300',
          dot: 'bg-[#FF6B00]',
        };
      case 'out_for_delivery':
        return {
          label: 'Out for Delivery 🛵',
          bg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300',
          dot: 'bg-blue-500',
        };
      case 'delivered':
        return {
          label: 'Delivered & Paid ✅',
          bg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300',
          dot: 'bg-emerald-500',
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          bg: 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300 border-red-300',
          dot: 'bg-red-500',
        };
      default:
        return {
          label: status,
          bg: 'bg-neutral-100 text-neutral-800',
          dot: 'bg-neutral-500',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-5xl bg-white dark:bg-[#10121a] rounded-3xl overflow-hidden shadow-2xl text-neutral-900 dark:text-white border border-[#EAEAEA] dark:border-neutral-800 max-h-[92vh] flex flex-col my-4"
      >
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-[#EAEAEA] dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-orange-50 via-white to-amber-50 dark:from-[#181310] dark:via-[#10121a] dark:to-[#181510]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
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
            </div>
            <div className="hidden sm:block h-8 w-px bg-neutral-200 dark:bg-neutral-800 mx-1" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#FF6B00] text-white">
                  Owner &amp; Kitchen Backend
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Live</span>
              </div>
              <h2 className="font-extrabold text-base sm:text-lg text-neutral-900 dark:text-white leading-tight mt-0.5">
                Kitchen Command Center &amp; Orders
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-bold flex items-center gap-1.5 hover:border-orange-400 transition-colors"
              title={soundEnabled ? 'Disable order chime' : 'Enable order chime'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#FF6B00]" />
                  <span className="hidden sm:inline">Chime On</span>
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
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-bold flex items-center gap-1.5 hover:border-orange-400 transition-colors"
              title="Refresh orders"
            >
              <RefreshCw className="w-4 h-4 text-neutral-500" />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors"
              aria-label="Close owner portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real-time Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-neutral-50 dark:bg-neutral-900/40 border-b border-[#EAEAEA] dark:border-neutral-800 text-xs">
          <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <span className="text-neutral-500 dark:text-neutral-400 text-[11px] block font-medium">
              Active In Kitchen
            </span>
            <span className="text-xl font-black text-[#FF6B00]">{activeOrdersCount} Orders</span>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <span className="text-neutral-500 dark:text-neutral-400 text-[11px] block font-medium">
              Today's Orders
            </span>
            <span className="text-xl font-black text-neutral-900 dark:text-white">
              {orders.length} Total
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <span className="text-neutral-500 dark:text-neutral-400 text-[11px] block font-medium">
              Total Revenue
            </span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
              ₹{totalRevenue}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <span className="text-neutral-500 dark:text-neutral-400 text-[11px] block font-medium">
              Owner WhatsApp Dispatch
            </span>
            <span className="text-xs font-bold text-[#FF6B00] truncate block">
              +91 {OWNER_CONFIG.primaryPhone.slice(2)}
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 border-b border-[#EAEAEA] dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#10121a]">
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
            {[
              { id: 'all', label: 'All Orders' },
              { id: 'new', label: '🟡 New' },
              { id: 'preparing', label: '🔥 In Tandoor' },
              { id: 'out_for_delivery', label: '🛵 Out for Delivery' },
              { id: 'delivered', label: '✅ Delivered' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  filterStatus === tab.id
                    ? 'bg-[#FF6B00] text-white shadow-sm'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, Name, Phone..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs border border-transparent focus:border-[#FF6B00] outline-none"
            />
          </div>
        </div>

        {/* Orders Feed */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto" />
              <h3 className="font-extrabold text-base text-neutral-700 dark:text-neutral-300">
                No orders found under this filter
              </h3>
              <p className="text-xs text-neutral-500">
                Incoming orders from the website appear here instantly in real-time.
              </p>
            </div>
          ) : (
            filteredOrders.map((ord) => {
              const badge = getStatusBadge(ord.status);
              return (
                <div
                  key={ord.orderId}
                  className="p-5 rounded-3xl border border-[#EAEAEA] dark:border-neutral-800 bg-white dark:bg-[#141622] shadow-md hover:shadow-lg transition-all space-y-4"
                >
                  {/* Order Top Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-black text-sm text-[#FF6B00] bg-orange-50 dark:bg-orange-950/50 px-2.5 py-1 rounded-lg border border-orange-200/60 dark:border-orange-900/60">
                        #{ord.orderId}
                      </span>
                      <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                        {ord.customerName}
                      </span>
                      <a
                        href={`tel:${ord.phone}`}
                        className="text-xs font-semibold text-neutral-500 hover:text-[#FF6B00] flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-[#FF6B00]" />
                        <span>{ord.phone}</span>
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${badge.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        <span>{badge.label}</span>
                      </span>

                      <span className="text-[11px] text-neutral-400 font-medium">
                        {ord.timeFormatted || new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  {/* Middle Section: Items & Delivery Address */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                    {/* Items List */}
                    <div className="md:col-span-7 space-y-2">
                      <p className="font-bold text-neutral-500 uppercase text-[10px] tracking-wider">
                        Dishes Ordered:
                      </p>
                      <div className="space-y-1.5 bg-neutral-50 dark:bg-neutral-900/50 p-3 rounded-2xl border border-neutral-100 dark:border-neutral-800">
                        {ord.items.map((it, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center text-xs font-medium py-0.5"
                          >
                            <span className="text-neutral-800 dark:text-neutral-200">
                              <strong className="text-[#FF6B00]">{it.quantity}x</strong> {it.name}
                              {it.selectedSpice && (
                                <span className="text-[10px] text-neutral-400 ml-1.5">
                                  [{it.selectedSpice}]
                                </span>
                              )}
                              {it.extraButter && (
                                <span className="text-[10px] text-amber-600 ml-1">
                                  [+Makhan]
                                </span>
                              )}
                            </span>
                            <span className="font-bold text-neutral-900 dark:text-white">
                              ₹{it.unitPrice * it.quantity}
                            </span>
                          </div>
                        ))}

                        {ord.instructions && (
                          <div className="mt-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-800 text-[11px] text-amber-700 dark:text-amber-400 italic">
                            Note: "{ord.instructions}"
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Customer & Address Details */}
                    <div className="md:col-span-5 space-y-2">
                      <p className="font-bold text-neutral-500 uppercase text-[10px] tracking-wider">
                        Delivery &amp; Payment Details:
                      </p>
                      <div className="bg-neutral-50 dark:bg-neutral-900/50 p-3 rounded-2xl border border-neutral-100 dark:border-neutral-800 space-y-2">
                        <div>
                          <span className="text-[10px] text-neutral-400 block">Delivery Address:</span>
                          <p className="font-medium text-neutral-800 dark:text-neutral-200 leading-snug">
                            {ord.address}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800 flex justify-between items-center">
                          <div>
                            <span className="text-[10px] text-neutral-400 block">Payment Method:</span>
                            <span className="font-bold text-neutral-900 dark:text-white">
                              {ord.paymentMethod}
                            </span>
                            {ord.utrNumber && (
                              <p className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                                UTR: {ord.utrNumber}
                              </p>
                            )}
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] text-neutral-400 block">Total Bill:</span>
                            <span className="font-black text-base text-[#FF6B00]">
                              ₹{ord.grandTotal}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Controls for Owner */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 dark:border-neutral-800/80">
                    {/* Status Changer Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-bold text-neutral-400 mr-1">Update Status:</span>

                      {ord.status !== 'preparing' && ord.status !== 'delivered' && (
                        <button
                          onClick={() => handleStatusChange(ord.orderId, 'preparing')}
                          className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-sm"
                        >
                          <Flame className="w-3.5 h-3.5" />
                          <span>Fire in Tandoor 🔥</span>
                        </button>
                      )}

                      {ord.status !== 'out_for_delivery' && ord.status !== 'delivered' && (
                        <button
                          onClick={() => handleStatusChange(ord.orderId, 'out_for_delivery')}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-sm"
                        >
                          <Bike className="w-3.5 h-3.5" />
                          <span>Send Delivery 🛵</span>
                        </button>
                      )}

                      {ord.status !== 'delivered' && (
                        <button
                          onClick={() => handleStatusChange(ord.orderId, 'delivered')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Delivered ✅</span>
                        </button>
                      )}
                    </div>

                    {/* Customer Communication Buttons */}
                    <div className="flex items-center gap-2">
                      <a
                        href={getCustomerStatusWhatsAppUrl(
                          ord,
                          ord.status === 'preparing'
                            ? 'Your kulchas are being baked fresh in our 450°C clay tandoor! 🔥'
                            : ord.status === 'out_for_delivery'
                            ? 'Our delivery rider is on the way to your address! 🛵'
                            : 'Your order has been safely delivered! Enjoy your royal meal! 👑'
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-100 transition-colors"
                        title="Send update to customer on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Update Customer via WA</span>
                      </a>

                      <a
                        href={`tel:${ord.phone}`}
                        className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs flex items-center gap-1.5 hover:bg-neutral-200 transition-colors"
                        title="Call Customer"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
}
