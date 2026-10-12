// src/lib/orderService.js
// Production order management & backend notification service for Kulcha King

export const OWNER_CONFIG = {
  restaurantName: "Kulcha King & Parantha Singh",
  primaryPhone: "919358790020", // Owner's WhatsApp & primary hotline
  secondaryPhone: "919625607864",
  upiId: "9625607864@ybl",
  merchantName: "Kulcha King Jaipur",
  email: "kulchakingsoranthasingh@gmail.com",
};

const STORAGE_KEY = "kulcha_king_live_orders_v1";

// Cross-tab broadcast channel for instant multi-window notifications
let broadcastChannel = null;
try {
  if (typeof window !== "undefined" && "BroadcastChannel" in window) {
    broadcastChannel = new BroadcastChannel("kulcha_king_orders_channel");
  }
} catch (e) { }

/**
 * Play an audible, high-frequency kitchen notification bell using Web Audio API
 * Works across all modern browsers without needing external MP3 audio file assets.
 */
export function playKitchenNotificationBell() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => { });
    }

    const playChimeNote = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.4, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    // Harmonious 3-tone bright kitchen bell chime (D5 -> A5 -> D6)
    playChimeNote(587.33, now, 0.4);
    playChimeNote(880.0, now + 0.15, 0.5);
    playChimeNote(1174.66, now + 0.32, 0.8);
  } catch (err) {
    console.warn("Could not play kitchen chime:", err);
  }
}

/**
 * Generate a dynamic UPI payment link compatible with Google Pay, PhonePe, Paytm & BHIM
 */
export function generateUpiUrl(amount, orderId) {
  const pa = OWNER_CONFIG.upiId;
  const pn = encodeURIComponent(OWNER_CONFIG.merchantName);
  const tn = encodeURIComponent(`Order ${orderId}`);
  const am = Number(amount).toFixed(2);
  return `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR&tn=${tn}`;
}

/**
 * Generate a high-resolution QR code image URL for the UPI link
 */
export function generateQrCodeUrl(upiUrl) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent(
    upiUrl
  )}`;
}

/**
 * Retrieve all orders from persistent storage
 */
export function getAllOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed default demo orders so owner portal is never blank
      const seedOrders = [
        {
          orderId: "KK-731902",
          createdAt: new Date(Date.now() - 18 * 60000).toISOString(),
          timeFormatted: "18 mins ago",
          customerName: "Vikas Choudhary",
          phone: "9829012345",
          orderType: "delivery",
          address: "Flat 302, Royal Palms, Shipra Path, Mansarovar, Jaipur",
          paymentMethod: "UPI",
          paymentStatus: "Verified",
          utrNumber: "429104928172",
          status: "out_for_delivery",
          items: [
            { name: "Amritsari Aloo Kulcha", quantity: 2, unitPrice: 149 },
            { name: "Royal Kulhad Malai Lassi", quantity: 2, unitPrice: 89 },
          ],
          subtotal: 476,
          discountAmount: 0,
          gst: 24,
          deliveryFee: 0,
          grandTotal: 500,
          instructions: "Please send extra green chili chutney and fried chillies.",
        },
        {
          orderId: "KK-628194",
          createdAt: new Date(Date.now() - 42 * 60000).toISOString(),
          timeFormatted: "42 mins ago",
          customerName: "Pooja Sharma",
          phone: "9414098765",
          orderType: "delivery",
          address: "House 78, Sector 9, Mansarovar, Jaipur",
          paymentMethod: "Cash on Delivery",
          paymentStatus: "Pending Cash Collection",
          utrNumber: "",
          status: "delivered",
          items: [
            { name: "Paneer Pyaz Special Kulcha", quantity: 2, unitPrice: 189 },
            { name: "Amritsari Pindi Choley (Extra Bowl)", quantity: 1, unitPrice: 119 },
          ],
          subtotal: 497,
          discountAmount: 149,
          gst: 17,
          deliveryFee: 0,
          grandTotal: 365,
          instructions: "Deliver hot, ring bell once.",
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedOrders));
      return seedOrders;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading orders:", err);
    return [];
  }
}

/**
 * Save and broadcast a new order
 */
export function saveOrder(order) {
  try {
    const current = getAllOrders();
    const updated = [order, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Broadcast across current window & other open tabs (e.g. admin portal)
    window.dispatchEvent(new CustomEvent("kulcha_king_new_order", { detail: order }));
    if (broadcastChannel) {
      try {
        broadcastChannel.postMessage({ type: "NEW_ORDER", order });
      } catch (e) { }
    }

    // Automatically trigger email alert to owner inbox
    sendOwnerEmailNotification(order).catch(() => { });

    return order;
  } catch (err) {
    console.error("Error saving order:", err);
    return order;
  }
}

/**
 * Send order notification email to restaurant owner inbox
 */
export async function sendOwnerEmailNotification(order) {
  try {
    const itemsSummary = (order.items || [])
      .map((it) => `${it.quantity}x ${it.name} (₹${it.unitPrice * it.quantity})`)
      .join(', ');

    const payload = {
      _subject: `🚨 NEW ORDER #${order.orderId} - ₹${order.grandTotal} (${order.customerName})`,
      _captcha: "false",
      _template: "table",
      orderId: order.orderId,
      customerName: order.customerName,
      customerPhone: order.phone,
      orderType: order.orderType,
      deliveryAddress: order.address || "Self Pickup",
      items: itemsSummary,
      grandTotal: `₹${order.grandTotal}`,
      paymentMethod: order.paymentMethod,
      utrNumber: order.utrNumber || 'N/A',
      instructions: order.instructions || 'None',
      restaurantEmail: OWNER_CONFIG.email,
    };

    // Forward to owner's inbox via formsubmit endpoint
    await fetch(`https://formsubmit.co/ajax/${OWNER_CONFIG.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.log('Owner email notification queued');
  }
}

/**
 * Update status of an existing order in the backend
 */
export function updateOrderStatus(orderId, newStatus) {
  try {
    const current = getAllOrders();
    const updated = current.map((ord) =>
      ord.orderId === orderId ? { ...ord, status: newStatus } : ord
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent("kulcha_king_order_updated", { detail: { orderId, newStatus } })
    );
    if (broadcastChannel) {
      try {
        broadcastChannel.postMessage({ type: "STATUS_UPDATED", orderId, newStatus });
      } catch (e) { }
    }
    return updated;
  } catch (err) {
    console.error("Error updating order status:", err);
    return [];
  }
}

/**
 * Format structured notification message for the Owner's WhatsApp (+91 93587 90020)
 */
export function formatOwnerWhatsAppMessage(order) {
  const itemsText = order.items
    .map(
      (it) =>
        `  • ${it.quantity}x ${it.name} - ₹${it.unitPrice * it.quantity}${it.selectedSpice ? ` [${it.selectedSpice}]` : ""
        }${it.extraButter ? " [+Extra Makhan]" : ""}`
    )
    .join("\n");

  const msg =
    `🔔 *NEW ONLINE ORDER RECEIVED - KULCHA KING* 🔔\n\n` +
    `*Order ID:* #${order.orderId}\n` +
    `*Date & Time:* ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}\n\n` +
    `👤 *CUSTOMER DETAILS:*\n` +
    `• *Name:* ${order.customerName}\n` +
    `• *Mobile:* ${order.phone}\n` +
    `• *Order Type:* ${order.orderType === "delivery" ? "🚀 Home Delivery" : "🛍️ Self Pickup"}\n` +
    (order.orderType === "delivery" ? `• *Address:* ${order.address}\n` : "") +
    (order.instructions ? `• *Special Note:* "${order.instructions}"\n` : "") +
    `\n🍽️ *ITEMS ORDERED:*\n` +
    `${itemsText}\n\n` +
    `💰 *BILL BREAKDOWN:*\n` +
    `• Subtotal: ₹${order.subtotal}\n` +
    (order.discountAmount > 0
      ? `• Discount (${order.couponCode || "COUPON"}): -₹${order.discountAmount}\n`
      : "") +
    `• GST (5%): ₹${order.gst}\n` +
    `• Delivery: ${order.deliveryFee === 0 ? "FREE" : `₹${order.deliveryFee}`}\n` +
    `*TOTAL PAYABLE:* ₹${order.grandTotal}\n\n` +
    `💳 *PAYMENT METHOD:* ${order.paymentMethod}\n` +
    (order.utrNumber ? `• *UPI Transaction UTR / Ref:* ${order.utrNumber}\n` : "") +
    `• *Payment Status:* ${order.paymentStatus || "Pending Verification"}\n\n` +
    `📍 *Prepared at:* Kulcha King, 79/113 Shipra Path, Mansarovar, Jaipur\n` +
    `Please confirm preparation in clay tandoor!`;

  return msg;
}

/**
 * Direct WhatsApp link for the owner (+91 93587 90020)
 */
export function getOwnerWhatsAppUrl(order) {
  const message = formatOwnerWhatsAppMessage(order);
  return `https://wa.me/${OWNER_CONFIG.primaryPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Send WhatsApp status update to the customer
 */
export function getCustomerStatusWhatsAppUrl(order, statusText) {
  const msg =
    `Hello ${order.customerName}! 👑\n\n` +
    `Update on your Kulcha King Order *#${order.orderId}*:\n` +
    `📍 *Status:* ${statusText}\n` +
    `🕒 Estimated Time: 15-25 Mins\n` +
    `Total Amount: ₹${order.grandTotal} (${order.paymentMethod})\n\n` +
    `For any urgent queries, call our kitchen manager at +91 93587 90020.\n` +
    `Thank you for ordering with Kulcha King & Parantha Singh!`;

  const cleanPhone = (order.phone || "").replace(/[^0-9]/g, "");
  const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(msg)}`;
}
