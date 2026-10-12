import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { ArrowUpRight, Heart, Sparkles, MapPin, PhoneCall, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-amber-500/20 py-12 bg-[#090b12] text-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Real Logo info */}
          <div className="md:col-span-1 space-y-3">
            <a href="index.html" className="flex items-center gap-2.5 group" aria-label="Kulcha King Home">
              <img
                src="/logo.png"
                alt="Kulcha King & Parantha Singh"
                className="h-12 w-auto object-contain drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col text-left">
                <span className="font-black text-base text-white tracking-tight leading-tight group-hover:text-amber-400 transition-colors">
                  Kulcha King
                </span>
                <span className="text-[10px] text-amber-400 font-semibold tracking-wide">
                  &amp; Parantha Singh
                </span>
              </div>
            </a>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Authentic Amritsari clay-tandoor recipes baked fresh in Mansarovar, Jaipur since 2010.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-bold">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>100% Pure Vegetarian</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Navigation</p>
            <ul className="space-y-2 text-xs font-medium text-neutral-300">
              <li><a href="index.html" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="menu.html" className="hover:text-amber-400 transition-colors">Menu &amp; Ordering</a></li>
              <li><a href="about.html" className="hover:text-amber-400 transition-colors">Our Heritage</a></li>
              <li><a href="contact.html" className="hover:text-amber-400 transition-colors">Location &amp; Contact</a></li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Direct Contact</p>
            <div className="space-y-2 text-xs text-neutral-300">
              <div>
                <span className="text-neutral-500 block text-[10px]">Primary Line:</span>
                <a
                  href={`tel:${RESTAURANT_INFO.phones[0].number.replace(/\s+/g, '')}`}
                  className="font-bold hover:text-amber-400 transition-colors text-white"
                >
                  {RESTAURANT_INFO.phones[0].number}
                </a>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px]">Email:</span>
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="hover:text-amber-400 transition-colors font-medium break-all"
                >
                  {RESTAURANT_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Location & Hours */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Hours &amp; Location</p>
            <p className="text-xs text-neutral-300">
              {RESTAURANT_INFO.timings.days}: <strong className="text-white">{RESTAURANT_INFO.timings.hours}</strong>
            </p>
            <address className="not-italic text-xs text-neutral-400 leading-relaxed">
              {RESTAURANT_INFO.address.line1}, {RESTAURANT_INFO.address.city} 302020
            </address>
            <a
              href={RESTAURANT_INFO.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:underline pt-1"
            >
              <span>View on Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-neutral-800 text-xs text-neutral-400 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© {currentYear} Kulcha King &amp; Parantha Singh. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a href="terms.html" className="hover:text-amber-400 transition-colors">Terms</a>
            <a href="privacy.html" className="hover:text-amber-400 transition-colors">Privacy</a>
            <a href="refund.html" className="hover:text-amber-400 transition-colors">Refunds</a>
            <span className="text-neutral-700">•</span>
            <a href="admin.html" className="text-neutral-500 hover:text-neutral-300 transition-colors" title="Kitchen &amp; Owner Admin Access">Staff Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
