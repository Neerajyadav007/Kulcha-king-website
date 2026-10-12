// src/pages/RefundApp.jsx
// Cancellation & Refund Policy for Kulcha King & Parantha Singh

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import Toast from '../components/Toast';
import { RotateCcw, AlertTriangle, CheckCircle, Clock, ShieldCheck, HelpCircle } from 'lucide-react';

export default function RefundApp() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#090b10] text-[#1F1F1F] dark:text-white transition-colors">
      <Navbar activePage="refund" />

      {/* Header Banner */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-br from-[#FFF8F0] via-[#FFF2E5] to-[#FFEEDD] dark:from-[#1b1410] dark:to-[#0f0e13] border-b border-orange-200/60 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-neutral-800 text-[#FF6B00] text-xs font-bold uppercase tracking-wider border border-orange-200 dark:border-neutral-700 shadow-sm">
            <RotateCcw className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Customer Satisfaction &amp; Assurance</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F1F1F] dark:text-white tracking-tight">
            Cancellation &amp; Refund Policy
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Effective Date: October 2026 • Kulcha King &amp; Parantha Singh, Mansarovar, Jaipur
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        {/* Intro Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />
            <h2>Fresh Kitchen Guarantee</h2>
          </div>
          <p>
            Every order at <strong>Kulcha King &amp; Parantha Singh</strong> is hand-rolled and baked to order inside our authentic charcoal clay tandoor. Because food is prepared fresh exclusively for you, our cancellation and refund policies are structured to ensure both kitchen freshness and fair customer protection.
          </p>
        </div>

        {/* Section 1 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              1
            </span>
            <span>Order Cancellation Window</span>
          </h2>
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
            <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block text-sm">5-Minute Grace Window</strong>
              <p className="text-xs">
                You may cancel your order free of charge within <strong>5 minutes</strong> of placing it, or until our kitchen staff moves your order status to <em>"Fired in Tandoor"</em>.
              </p>
            </div>
          </div>
          <p>
            Once our tandoori masters have rolled the stuffed dough and placed it inside the live tandoor, the order cannot be cancelled as perishable food materials cannot be reused.
          </p>
        </div>

        {/* Section 2 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              2
            </span>
            <span>Eligible Grounds for Full or Partial Refunds</span>
          </h2>
          <p>We provide full refunds or immediate replacements under the following circumstances:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Wrong Item Delivered:</strong> You received an item different from your order token.</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Missing Platter Items:</strong> Choley, accompaniments, or beverages ordered were omitted from the bag.</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Transit Damage:</strong> Container crushed, seal broken, or spillage rendering the meal inedible.</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Non-Delivery:</strong> The delivery valet failed to arrive within 75 minutes of confirmation without valid communication.</span>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              3
            </span>
            <span>Non-Refundable Scenarios</span>
          </h2>
          <p>Refunds cannot be granted under the following circumstances:</p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
            <li>
              <strong>Incorrect Address / Unreachable Recipient:</strong> Delivery rider arrives at the customer's location but the customer fails to answer the phone or provide access within 10 minutes.
            </li>
            <li>
              <strong>Subjective Taste Variations:</strong> Minor taste variance or natural variations in Punjab spice levels when standard preparation was executed.
            </li>
            <li>
              <strong>Delayed Complaints:</strong> Reports received more than 30 minutes after confirmed delivery, where food temperature or freshness cannot be verified.
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              4
            </span>
            <span>Refund Processing Timeline &amp; Reversal</span>
          </h2>
          <div className="space-y-2">
            <p>
              Once your refund request is verified by our kitchen manager:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-600 dark:text-neutral-400">
              <li>
                <strong>UPI Payments:</strong> Refunds are credited directly to your paying UPI ID (Google Pay, PhonePe, Paytm, BHIM) within <strong>24 to 48 business hours</strong>.
              </li>
              <li>
                <strong>Cash on Delivery (COD):</strong> For COD orders, a direct UPI transfer or instant replacement dish will be coordinated directly by our manager.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 5 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              5
            </span>
            <span>How to Request a Cancellation or Refund</span>
          </h2>
          <p>
            Please contact our manager immediately with your <strong>Order ID</strong> (and photos if reporting transit damage):
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-neutral-900 dark:text-white">
            <a
              href="https://wa.me/919358790020?text=Hi%20Kulcha%20King,%20I%20have%20an%20issue%20with%20my%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
            >
              <span>💬 WhatsApp Manager: +91 93587 90020</span>
            </a>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              <span>✉️ Email: kulchakingsoranthasingh@gmail.com</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              <span>📍 79/113 Shipra Path, Mansarovar, Jaipur</span>
            </span>
          </div>
        </div>
      </main>

      <CartDrawer />
      <Toast />
      <Footer />
    </div>
  );
}
