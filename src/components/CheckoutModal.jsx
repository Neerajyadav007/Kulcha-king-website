import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { X, CheckCircle2, Bike, Store, ArrowRight, Share2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen, onClose }) {
  const { items, subtotal, gst, deliveryFee, grandTotal, clearCart } = useCart();

  const [orderType, setOrderType] = useState('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const calculatedDeliveryFee = orderType === 'pickup' ? 0 : deliveryFee;
  const finalTotal = subtotal + gst + calculatedDeliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      setErrorMsg('Please enter your Jaipur delivery address');
      return;
    }

    const orderId = `KK-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
      orderType,
      customerName,
      phone,
      address: orderType === 'delivery' ? address : 'Self Pickup at Mansarovar, Jaipur',
      notes,
      paymentMethod: paymentMethod === 'cod' ? (orderType === 'delivery' ? 'Cash on Delivery' : 'Pay at Counter') : 'UPI QR',
      items: [...items],
      subtotal,
      gst,
      deliveryFee: calculatedDeliveryFee,
      grandTotal: finalTotal,
      estTime: orderType === 'delivery' ? '35 - 45 Mins' : '15 - 20 Mins',
    };

    setConfirmedOrder(orderData);
    setIsSubmitted(true);
    clearCart();

    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#ffffff'],
      });
    } catch (err) {}
  };

  const handleWhatsAppShare = () => {
    if (!confirmedOrder) return;
    const itemsList = confirmedOrder.items
      .map((it) => `• ${it.quantity}x ${it.name} - ₹${it.unitPrice * it.quantity}`)
      .join('%0A');

    const msg = `*ORDER ${confirmedOrder.orderId} - KULCHA KING*%0A` +
      `*Customer:* ${confirmedOrder.customerName} (${confirmedOrder.phone})%0A` +
      `*Type:* ${confirmedOrder.orderType.toUpperCase()}%0A` +
      (confirmedOrder.orderType === 'delivery' ? `*Address:* ${confirmedOrder.address}%0A` : '') +
      `*Items:*%0A${itemsList}%0A` +
      `*Total:* ₹${confirmedOrder.grandTotal} (${confirmedOrder.paymentMethod})`;

    window.open(`https://wa.me/918949019457?text=${msg}`, '_blank');
  };

  const handleCloseAll = () => {
    setIsSubmitted(false);
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-lg surface-card rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800"
      >
        {/* Close Button */}
        <button
          onClick={handleCloseAll}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Checkout</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-white mt-1">
                Complete Your Order
              </h2>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Delivery vs Pickup */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2">
                  Order Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                      orderType === 'delivery'
                        ? 'border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400 shadow-sm'
                        : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>Home Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                      orderType === 'pickup'
                        ? 'border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400 shadow-sm'
                        : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Self Pickup</span>
                  </button>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl input-luxury text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit Mobile"
                    className="w-full px-4 py-3 rounded-xl input-luxury text-sm"
                  />
                </div>
              </div>

              {/* Address (for Delivery) */}
              {orderType === 'delivery' && (
                <div>
                  <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                    Jaipur Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House, Street, Mansarovar / Nearby Landmark"
                    className="w-full px-4 py-3 rounded-xl input-luxury text-sm"
                  />
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                  Kitchen Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Extra crispy, mild spicy"
                  className="w-full px-4 py-3 rounded-xl input-luxury text-sm"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400'
                        : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {orderType === 'delivery' ? 'Cash on Delivery (COD)' : 'Pay on Pickup'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-amber-500 bg-amber-500/15 text-amber-600 dark:text-amber-400'
                        : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    UPI QR Code
                  </button>
                </div>
              </div>

              {/* Total & Single Submit Button */}
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                <div>
                  <span className="text-xs text-neutral-600 dark:text-neutral-400 block">Total Payable</span>
                  <span className="text-2xl font-serif font-black text-amber-600 dark:text-amber-400">₹{finalTotal}</span>
                </div>

                <button
                  type="submit"
                  className="btn-luxury"
                >
                  <span>Confirm Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Receipt Screen */
          <div className="text-center space-y-6 py-2">
            <div className="w-14 h-14 rounded-full bg-amber-500/15 text-amber-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-amber-500" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Order Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-white mt-1">
                Thank you, {confirmedOrder.customerName}.
              </h2>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-1">
                Your order is being baked fresh in our clay tandoor.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 text-left text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400 uppercase text-[10px]">Order ID</span>
                  <p className="font-mono font-bold text-sm text-amber-600 dark:text-amber-400">{confirmedOrder.orderId}</p>
                </div>
                <div className="text-right">
                  <span className="text-neutral-500 dark:text-neutral-400 uppercase text-[10px]">Estimated Time</span>
                  <p className="font-bold text-neutral-900 dark:text-white">{confirmedOrder.estTime}</p>
                </div>
              </div>

              <div className="space-y-1">
                {confirmedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-neutral-800 dark:text-neutral-200">
                    <span>{it.quantity}x {it.name}</span>
                    <span className="font-bold">₹{it.unitPrice * it.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex justify-between font-bold text-sm text-neutral-900 dark:text-white">
                <span>Total Amount:</span>
                <span className="text-amber-600 dark:text-amber-400 font-serif font-bold text-base">₹{confirmedOrder.grandTotal}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleWhatsAppShare}
                className="btn-luxury w-full"
              >
                <Share2 className="w-4 h-4" />
                <span>Send Order to WhatsApp Kitchen</span>
              </button>

              <button
                onClick={handleCloseAll}
                className="w-full text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:underline pt-1"
              >
                Close &amp; Return to Menu
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
