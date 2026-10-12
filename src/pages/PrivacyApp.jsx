// src/pages/PrivacyApp.jsx
// Privacy Policy Page for Kulcha King & Parantha Singh

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import Toast from '../components/Toast';
import { Lock, Shield, Eye, Database, PhoneCall, CheckCircle2 } from 'lucide-react';

export default function PrivacyApp() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#090b10] text-[#1F1F1F] dark:text-white transition-colors">
      <Navbar activePage="privacy" />

      {/* Header Banner */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-br from-[#FFF8F0] via-[#FFF2E5] to-[#FFEEDD] dark:from-[#1b1410] dark:to-[#0f0e13] border-b border-orange-200/60 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-neutral-800 text-[#FF6B00] text-xs font-bold uppercase tracking-wider border border-orange-200 dark:border-neutral-700 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Data Protection &amp; Customer Security</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F1F1F] dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Effective Date: October 2026 • Kulcha King &amp; Parantha Singh, Mansarovar, Jaipur
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        {/* Intro */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
            <Shield className="w-5 h-5 text-[#FF6B00]" />
            <h2>Commitment to Customer Privacy</h2>
          </div>
          <p>
            At <strong>Kulcha King &amp; Parantha Singh</strong> ("we", "our", "us"), respecting your personal privacy is fundamental to our hospitality. This Privacy Policy outlines what information we collect when you order through our digital menu or visit our restaurant at <strong>79/113 Shipra Path, Mansarovar Sector 7, Jaipur</strong>, and how we protect it.
          </p>
        </div>

        {/* Section 1 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              1
            </span>
            <span>Information We Collect</span>
          </h2>
          <p>
            To prepare and fulfill your authentic Punjabi meal, we collect minimal and necessary information provided directly by you during checkout:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-600 dark:text-neutral-400">
            <li><strong>Contact Details:</strong> Your full name and active WhatsApp/mobile phone number.</li>
            <li><strong>Delivery Destination:</strong> Flat/house number, street address, area (e.g. Mansarovar Sector), and notable landmarks.</li>
            <li><strong>Order Specifications:</strong> Selected dishes, spice customization levels, butter preferences, beverage combos, and kitchen notes.</li>
            <li><strong>Payment Records:</strong> Mode of payment (UPI or COD) and customer-submitted 12-digit transaction UTR references for verification.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              2
            </span>
            <span>How We Use Your Data</span>
          </h2>
          <p>
            Your information is used strictly for operational fulfillment:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
              <span><strong>Kitchen Dispatch:</strong> Directing order tokens to our live clay tandoor chefs with exact culinary notes.</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
              <span><strong>Order Status Alerts:</strong> Sending real-time WhatsApp updates when the owner confirms and dispatches your order.</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
              <span><strong>Valet Routing:</strong> Helping delivery riders locate your doorstep swiftly across Mansarovar sectors.</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
              <span><strong>Customer Care:</strong> Resolving refund, cancellation, or culinary questions directly with our restaurant team.</span>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              3
            </span>
            <span>Zero Spam &amp; No Third-Party Data Selling</span>
          </h2>
          <p>
            We adhere to an absolute <strong>Zero Spam Policy</strong>. We do NOT sell, rent, lease, or distribute your phone number or email address to third-party telemarketers, data brokers, or advertising networks. You will never receive unsolicited spam calls or automated marketing blasts from outside entities as a result of ordering with us.
          </p>
        </div>

        {/* Section 4 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              4
            </span>
            <span>Payment Security &amp; Banking Credentials</span>
          </h2>
          <p>
            Kulcha King &amp; Parantha Singh does not store debit card numbers, credit card CVVs, or net banking passwords. Instant UPI payments are initiated via standard UPI intent links directly through your certified banking app (Google Pay, PhonePe, Paytm, BHIM) to our official account <code>9625607864@ybl</code>.
          </p>
        </div>

        {/* Section 5 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              5
            </span>
            <span>Local Storage &amp; Cookies</span>
          </h2>
          <p>
            Our web application uses standard browser local storage (<code>localStorage</code>) to store your preferred visual theme (Light/Dark mode) and active cart items so your order is not lost if you refresh your browser. No tracking cookies are used to monitor you across other websites.
          </p>
        </div>

        {/* Section 6 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              6
            </span>
            <span>Your Rights &amp; Privacy Officer Contact</span>
          </h2>
          <p>
            If you wish to request deletion of your order contact history, or if you have privacy inquiries, please contact our restaurant management:
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-neutral-900 dark:text-white">
            <span>📞 Direct Contact: +91 93587 90020</span>
            <span>✉️ Email: kulchakingsoranthasingh@gmail.com</span>
            <span>📍 Restaurant: 79/113 Shipra Path, Mansarovar Sector 7, Jaipur, Rajasthan 302020</span>
          </div>
        </div>
      </main>

      <CartDrawer />
      <Toast />
      <Footer />
    </div>
  );
}
