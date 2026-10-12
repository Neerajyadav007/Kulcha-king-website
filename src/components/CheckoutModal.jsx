// src/components/CheckoutModal.jsx
// Complete checkout, dynamic UPI payment, and direct owner WhatsApp notification

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import {
  X,
  CheckCircle2,
  Bike,
  Store,
  ArrowRight,
  Share2,
  Sparkles,
  QrCode,
  Smartphone,
  Phone,
  MessageCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  saveOrder,
  generateUpiUrl,
  generateQrCodeUrl,
  getOwnerWhatsAppUrl,
  OWNER_CONFIG,
} from '../lib/orderService';

export default function CheckoutModal({ isOpen, onClose }) {
  const {
    items,
    subtotal,
    discountAmount,
    coupon,
    gst,
    deliveryFee,
    grandTotal,
    clearCart,
  } = useCart();

  const [orderType, setOrderType] = useState('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // default to UPI
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const calculatedDeliveryFee = orderType === 'pickup' ? 0 : deliveryFee;
  const discountedSub = Math.max(0, subtotal - (discountAmount || 0));
  const finalTotal = discountedSub + gst + calculatedDeliveryFee;

  // Generate dynamic UPI URL and QR Code
  const tempOrderId = `KK-${Math.floor(100000 + Math.random() * 900000)}`;
  const upiUrl = generateUpiUrl(finalTotal, confirmedOrder?.orderId || tempOrderId);
  const qrCodeUrl = generateQrCodeUrl(upiUrl);

  const handleCopyUpiId = () => {
    navigator.clipboard?.writeText(OWNER_CONFIG.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      setErrorMsg('Please enter your Jaipur delivery address');
      return;
    }

    const orderId = tempOrderId;
    const orderData = {
      orderId,
      createdAt: new Date().toISOString(),
      timeFormatted: 'Just now',
      orderType,
      customerName: customerName.trim(),
      phone: cleanPhone,
      address: orderType === 'delivery' ? address.trim() : 'Self Pickup at Mansarovar, Jaipur',
      instructions: notes.trim(),
      paymentMethod:
        paymentMethod === 'cod'
          ? orderType === 'delivery'
            ? 'Cash on Delivery (COD)'
            : 'Pay at Counter'
          : 'UPI QR Payment',
      paymentStatus:
        paymentMethod === 'upi' ? (utrNumber ? 'Paid (UTR Provided)' : 'UPI Pending Verification') : 'Cash on Delivery',
      utrNumber: utrNumber.trim(),
      items: [...items],
      subtotal,
      discountAmount: discountAmount || 0,
      couponCode: coupon?.code || '',
      gst,
      deliveryFee: calculatedDeliveryFee,
      grandTotal: finalTotal,
      estTime: orderType === 'delivery' ? '30 - 40 Mins' : '15 - 20 Mins',
      status: 'new',
    };

    // 1. Save to persistent order store
    saveOrder(orderData);
    setConfirmedOrder(orderData);
    setIsSubmitted(true);
    clearCart();

    // 2. Trigger celebratory confetti
    try {
      confetti({
        particleCount: 85,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF6B00', '#2D8A4E', '#ffffff'],
      });
    } catch (err) {}

    // 3. Dispatch order notification directly to the Owner's WhatsApp (+91 93587 90020)
    const ownerWhatsAppUrl = getOwnerWhatsAppUrl(orderData);
    try {
      window.open(ownerWhatsAppUrl, '_blank');
    } catch (e) {
      // Fallback
    }
  };

  const handleManualSendToOwner = () => {
    if (!confirmedOrder) return;
    const ownerWhatsAppUrl = getOwnerWhatsAppUrl(confirmedOrder);
    window.open(ownerWhatsAppUrl, '_blank');
  };

  const handleCloseAll = () => {
    setIsSubmitted(false);
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg bg-white dark:bg-[#11131c] rounded-3xl shadow-2xl p-6 sm:p-8 my-6 text-neutral-900 dark:text-white border border-[#EAEAEA] dark:border-neutral-800 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={handleCloseAll}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" strokeWidth={2.5} />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header with Restaurant Logo */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#EAEAEA] dark:border-neutral-800">
              <div className="flex flex-col items-center shrink-0">
                <img
                  src="/logo.png"
                  alt="Kulcha King & Parantha Singh"
                  className="h-11 w-auto object-contain"
                />
                <span className="text-[9px] font-black tracking-tight text-neutral-800 dark:text-neutral-200 mt-0.5 whitespace-nowrap">
                  Kulcha King
                </span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF6B00] block">
                  Online Ordering &amp; Checkout
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white leading-tight">
                  Complete Your Feast
                </h2>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Delivery vs Pickup Selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2">
                  Order Type
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      orderType === 'delivery'
                        ? 'border-[#FF6B00] bg-[#FFF2E8] dark:bg-orange-950/40 text-[#FF6B00] ring-1 ring-[#FF6B00]'
                        : 'border-[#EAEAEA] dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                    }`}
                  >
                    <Bike className="w-4 h-4 text-[#FF6B00]" />
                    <span>Home Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      orderType === 'pickup'
                        ? 'border-[#FF6B00] bg-[#FFF2E8] dark:bg-orange-950/40 text-[#FF6B00] ring-1 ring-[#FF6B00]'
                        : 'border-[#EAEAEA] dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                    }`}
                  >
                    <Store className="w-4 h-4 text-[#FF6B00]" />
                    <span>Self Pickup (Mansarovar)</span>
                  </button>
                </div>
              </div>

              {/* Customer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAEAEA] dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs font-medium text-neutral-900 dark:text-white focus:border-[#FF6B00] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit Mobile"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAEAEA] dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs font-medium text-neutral-900 dark:text-white focus:border-[#FF6B00] outline-none"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              {orderType === 'delivery' && (
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Jaipur Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat/House, Street, Mansarovar Sector or nearby Landmark"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAEAEA] dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs font-medium text-neutral-900 dark:text-white focus:border-[#FF6B00] outline-none"
                  />
                </div>
              )}

              {/* Kitchen Instructions */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Kitchen Notes (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Extra crispy, mild spicy, ring doorbell"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAEAEA] dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs font-medium text-neutral-900 dark:text-white focus:border-[#FF6B00] outline-none"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {/* UPI QR Payment */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#FF6B00] bg-[#FFF2E8] dark:bg-orange-950/40 text-neutral-900 dark:text-white ring-1 ring-[#FF6B00]'
                        : 'border-[#EAEAEA] dark:border-neutral-800 hover:border-neutral-300 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#FF6B00]">
                      <QrCode className="w-4 h-4" />
                      <span>Instant UPI QR</span>
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-0.5">GPay / PhonePe / Paytm</p>
                  </button>

                  {/* Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#FF6B00] bg-[#FFF2E8] dark:bg-orange-950/40 text-neutral-900 dark:text-white ring-1 ring-[#FF6B00]'
                        : 'border-[#EAEAEA] dark:border-neutral-800 hover:border-neutral-300 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <div className="font-bold text-xs text-neutral-900 dark:text-white">
                      {orderType === 'delivery' ? 'Cash on Delivery' : 'Pay on Pickup'}
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Pay cash when food arrives</p>
                  </button>
                </div>
              </div>

              {/* Dynamic UPI Payment Card when UPI is selected */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/60 to-orange-50/40 dark:from-neutral-900 dark:to-neutral-800/80 border border-orange-200 dark:border-neutral-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-[#FF6B00] block">
                        Official Restaurant UPI ID
                      </span>
                      <p className="font-mono font-bold text-xs text-neutral-900 dark:text-white">
                        {OWNER_CONFIG.upiId}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyUpiId}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-[11px] font-bold flex items-center gap-1 text-[#FF6B00] hover:bg-orange-50 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                    </button>
                  </div>

                  {/* QR Code on desktop & 1-tap mobile button */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-white p-1 border shadow-sm shrink-0">
                      <img
                        src={qrCodeUrl}
                        alt="Scan UPI QR Code to Pay"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 space-y-1.5 text-center sm:text-left">
                      <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                        Scan with GPay, PhonePe, or Paytm
                      </p>
                      <p className="text-[11px] text-neutral-500 leading-tight">
                        Amount to pay: <strong className="text-[#FF6B00]">₹{finalTotal}</strong>
                      </p>

                      <a
                        href={upiUrl}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FF6B00] hover:underline pt-0.5"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>Tap here to Pay on Mobile UPI App →</span>
                      </a>
                    </div>
                  </div>

                  {/* UTR Input */}
                  <div className="pt-2 border-t border-orange-200/50 dark:border-neutral-700">
                    <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      UPI Ref / UTR Number (Optional, for instant verification):
                    </label>
                    <input
                      type="text"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      placeholder="e.g. 429104829182"
                      className="w-full px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Price Breakdown Summary */}
              <div className="pt-3 border-t border-[#EAEAEA] dark:border-neutral-800 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-neutral-900 dark:text-white">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>Discount ({coupon?.code})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-bold text-neutral-900 dark:text-white">₹{gst}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-bold text-neutral-900 dark:text-white">
                    {calculatedDeliveryFee === 0 ? (
                      <span className="text-emerald-500 font-bold">FREE</span>
                    ) : (
                      `₹${calculatedDeliveryFee}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#EAEAEA] dark:border-neutral-800 flex justify-between items-baseline font-bold">
                  <span className="text-sm font-extrabold text-neutral-900 dark:text-white">
                    Total Payable
                  </span>
                  <span className="text-2xl font-black text-[#FF6B00]">₹{finalTotal}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#FF6B00] hover:bg-[#E05E00] active:scale-98 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all"
              >
                <span>Place Order &amp; Dispatch to Kitchen (₹{finalTotal})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-neutral-500 dark:text-neutral-400">
                🔒 Order is sent directly to the kitchen manager at +91 93587 90020 with real-time updates.
              </p>
            </form>
          </div>
        ) : (
          /* Order Confirmation View */
          <div className="text-center space-y-6 py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#2D8A4E] mx-auto flex items-center justify-center text-2xl shadow-sm">
              <CheckCircle2 className="w-9 h-9 text-[#2D8A4E]" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2D8A4E]">
                Order Dispatched to Kitchen!
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mt-1">
                Thank you, {confirmedOrder.customerName}! 👑
              </h2>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">
                Your order has been recorded and transmitted to the kitchen at Kulcha King.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="p-5 rounded-2xl border border-[#EAEAEA] dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 text-left text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-[#EAEAEA] dark:border-neutral-800">
                <div>
                  <span className="text-neutral-500 uppercase text-[10px]">Order ID</span>
                  <p className="font-mono font-bold text-sm text-[#FF6B00]">
                    #{confirmedOrder.orderId}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-neutral-500 uppercase text-[10px]">Estimated Delivery</span>
                  <p className="font-bold text-neutral-900 dark:text-white">
                    {confirmedOrder.estTime}
                  </p>
                </div>
              </div>

              {/* Items summary */}
              <div className="space-y-1">
                {confirmedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-neutral-800 dark:text-neutral-200">
                    <span>
                      {it.quantity}x {it.name}
                    </span>
                    <span className="font-bold">₹{it.unitPrice * it.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#EAEAEA] dark:border-neutral-800 flex justify-between font-bold text-sm">
                <span>Total Amount:</span>
                <span className="text-[#FF6B00] text-base">₹{confirmedOrder.grandTotal}</span>
              </div>
            </div>

            {/* Owner WhatsApp & Hotline Actions */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={handleManualSendToOwner}
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5C] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01] active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>Send Order to Owner on WhatsApp (+91 93587 90020)</span>
              </button>

              <a
                href="tel:+919358790020"
                className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:border-orange-500 text-neutral-800 dark:text-neutral-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#FF6B00]" />
                <span>Call Kitchen Manager (+91 93587 90020)</span>
              </a>

              <button
                type="button"
                onClick={handleCloseAll}
                className="w-full text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white pt-1"
              >
                Return to Menu
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
