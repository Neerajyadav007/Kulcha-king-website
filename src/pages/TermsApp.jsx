// src/pages/TermsApp.jsx
// Terms & Conditions Page for Kulcha King & Parantha Singh

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import Toast from '../components/Toast';
import { ShieldCheck } from 'lucide-react';

export default function TermsApp() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#090b10] text-[#1F1F1F] dark:text-white transition-colors">
      <Navbar activePage="terms" />

      {/* Header Banner */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-br from-[#FFF8F0] via-[#FFF2E5] to-[#FFEEDD] dark:from-[#1b1410] dark:to-[#0f0e13] border-b border-orange-200/60 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-neutral-800 text-[#FF6B00] text-xs font-bold uppercase tracking-wider border border-orange-200 dark:border-neutral-700 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Legal &amp; Restaurant Policies</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F1F1F] dark:text-white tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Effective Date: October 2026 • Kulcha King &amp; Parantha Singh, Mansarovar, Jaipur
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        {/* Section 1 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              1
            </span>
            <span>Restaurant Identity &amp; Service Agreement</span>
          </h2>
          <p>
            Welcome to <strong>Kulcha King &amp; Parantha Singh</strong> ("we", "our", "us"). By accessing our website, placing an online order, or visiting our physical restaurant at <strong>79/113, Shipra Path, Mansarovar Sector 7, Jaipur, Rajasthan 302020</strong>, you agree to comply with and be bound by the following Terms and Conditions.
          </p>
        </div>

        {/* Section 2 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              2
            </span>
            <span>Food Orders, Pricing &amp; Taxes</span>
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Menu Pricing:</strong> All prices listed on our menu are in Indian Rupees (INR) and are inclusive of standard 5% Goods and Services Tax (GST).
            </li>
            <li>
              <strong>Accompaniments:</strong> Authentic Amritsari Kulcha platters are accompanied by complimentary slow-simmered Pindi Choley, White Makhan (Butter Float), and pickled onion chutney.
            </li>
            <li>
              <strong>Order Confirmation:</strong> An order is deemed confirmed once customer details, delivery location, and payment preference are submitted. Orders are transmitted directly to our kitchen manager for preparation in our live clay tandoor.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              3
            </span>
            <span>Delivery Radius, Timings &amp; Packaging</span>
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Delivery Coverage:</strong> We provide hot delivery throughout Mansarovar (Sectors 1 to 12), Shipra Path, and surrounding Jaipur areas.
            </li>
            <li>
              <strong>Operating Hours:</strong> Our clay tandoor operates fresh daily from <strong>1:30 PM to 10:30 PM</strong>.
            </li>
            <li>
              <strong>Estimated Delivery Time:</strong> Standard delivery time is approximately 25 to 35 minutes depending on traffic and order size.
            </li>
            <li>
              <strong>Thermal Packaging:</strong> Every order is packed in food-grade thermal containers to ensure our kulchas remain crispy and steaming hot upon arrival.
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              4
            </span>
            <span>Payment Modes &amp; Security</span>
          </h2>
          <p>
            We accept instant UPI payments (Google Pay, PhonePe, Paytm, BHIM) via our official restaurant UPI ID <code>9625607864@ybl</code> and Cash on Delivery (COD). Customers paying via UPI are advised to retain their 12-digit transaction UTR reference number.
          </p>
        </div>

        {/* Section 5 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              5
            </span>
            <span>100% Pure Vegetarian Assurance &amp; Hygiene</span>
          </h2>
          <p>
            Kulcha King &amp; Parantha Singh maintains a strictly <strong>100% Pure Vegetarian</strong> facility. We adhere to FSSAI food hygiene regulations, using fresh whole milk, authentic cottage cheese (paneer), and fresh farm vegetables daily.
          </p>
        </div>

        {/* Section 6 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#11131c] border border-[#EAEAEA] dark:border-neutral-800 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950 text-[#FF6B00] flex items-center justify-center text-xs font-black">
              6
            </span>
            <span>Customer Grievances &amp; Contact</span>
          </h2>
          <p>
            For any queries, order assistance, or catering inquiries, contact our kitchen manager:
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-neutral-900 dark:text-white">
            <span>📞 Primary Line: +91 93587 90020</span>
            <span>✉️ Email: kulchakingsoranthasingh@gmail.com</span>
            <span>📍 Address: 79/113 Shipra Path, Mansarovar Sector 7, Jaipur</span>
          </div>
        </div>
      </main>

      <CartDrawer />
      <Toast />
      <Footer />
    </div>
  );
}
