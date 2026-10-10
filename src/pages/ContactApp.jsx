import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import Toast from '../components/Toast';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import {
  Calendar,
  Clock,
  Users,
  UtensilsCrossed,
  Sparkles,
  PhoneCall,
  MapPin,
  CheckCircle2,
  MessageSquare,
  Award,
  ShieldCheck,
  Flame,
  Car
} from 'lucide-react';

export default function ContactApp() {
  // Today's date as ISO string (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '4',
    date: todayStr,
    mealType: 'dinner', // 'lunch' | 'dinner'
    timeSlot: '08:30 PM',
    seatingArea: 'Royal Family AC Hall',
    occasion: 'Family Dining',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const lunchSlots = [
    '11:30 AM',
    '12:15 PM',
    '01:00 PM',
    '01:45 PM',
    '02:30 PM',
    '03:15 PM',
  ];

  const dinnerSlots = [
    '07:00 PM',
    '07:45 PM',
    '08:30 PM',
    '09:15 PM',
    '10:00 PM',
    '10:30 PM',
  ];

  const guestOptions = [
    { value: '1', label: '1 Person', desc: 'Solo Dine' },
    { value: '2', label: '2 Diners', desc: 'Couple / Duo' },
    { value: '4', label: '4 Diners', desc: 'Family' },
    { value: '6', label: '6 Diners', desc: 'Group' },
    { value: '8', label: '8 Diners', desc: 'Party' },
    { value: '12', label: '10+ Feast', desc: 'Grand Gathering' },
  ];

  const seatingOptions = [
    { id: 'Royal Family AC Hall', name: 'Royal Family AC Hall', desc: 'Cool, private family booths' },
    { id: 'Traditional Punjabi Baithak', name: 'Punjabi Baithak', desc: 'Vibrant tandoor ambience' },
    { id: 'Courtyard Garden Seating', name: 'Courtyard Garden', desc: 'Breezy evening open dining' },
  ];

  const occasionOptions = [
    'Family Dining',
    'Birthday Celebration',
    'Anniversary',
    'Casual Meetup',
    'Office / Business Lunch',
    'Special Punjabi Feast',
  ];

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Please provide your full name.');
      return false;
    }
    const cleanPhone = formData.phone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return false;
    }
    if (!formData.date) {
      setErrorMessage('Please select a reservation date.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleDirectSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate readable booking reference
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const ref = `KK-${randomCode}`;
    setBookingRef(ref);
    setSubmitted(true);
  };

  const handleWhatsAppBooking = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const message = `*ROYAL TABLE RESERVATION INQUIRY* 👑
------------------------------------
*Guest Name:* ${formData.name}
*Mobile Number:* ${formData.phone}
*Party Size:* ${formData.guests} Guests
*Date:* ${formData.date}
*Meal / Time:* ${formData.mealType.toUpperCase()} at ${formData.timeSlot}
*Seating Area:* ${formData.seatingArea}
*Occasion:* ${formData.occasion}
${formData.specialRequests ? `*Special Request:* ${formData.specialRequests}` : ''}
------------------------------------
Please confirm our reservation at Kulcha King & Parantha Singh Mansarovar, Jaipur!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918949019457?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar activePage="contact" />

      {/* Hero Banner with Royal Amritsari Styling */}
      <section className="relative py-10 sm:py-14 border-b border-neutral-200 dark:border-neutral-800/80 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-3"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Instant Confirmation • Zero Booking Fee • 100% Pure Veg</span>
            </span>

            <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 dark:text-white leading-[1.08]">
              Reserve Your <span className="text-amber-500 dark:text-amber-400">Royal Table</span>
            </h1>

            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-xl mx-auto">
              Experience authentic Amritsari clay tandoor heritage in Mansarovar, Jaipur. Reserve ahead to skip waiting and savor freshly baked kulchas the moment you sit down.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Reservation Section */}
      <section className="py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 7 Columns: Interactive Reservation Form */}
            <div className="lg:col-span-7">
              <div className="surface-card rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-xl">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4"
                  >
                    <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        Reservation Registered
                      </span>
                      <h3 className="font-serif font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white mt-1">
                        Table Reserved Successfully!
                      </h3>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 text-left text-xs space-y-2 max-w-md mx-auto">
                      <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-1.5">
                        <span className="text-neutral-500">Booking Reference:</span>
                        <strong className="text-amber-600 dark:text-amber-400 font-mono text-sm">{bookingRef}</strong>
                      </div>
                      <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-1.5">
                        <span className="text-neutral-500">Reserved For:</span>
                        <strong className="text-neutral-900 dark:text-white">{formData.name} ({formData.guests} Guests)</strong>
                      </div>
                      <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-1.5">
                        <span className="text-neutral-500">Date &amp; Time:</span>
                        <strong className="text-neutral-900 dark:text-white">{formData.date} at {formData.timeSlot}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Seating Area:</span>
                        <strong className="text-neutral-900 dark:text-white">{formData.seatingArea}</strong>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto">
                      Our kitchen host will reach out on <strong>{formData.phone}</strong> 15 minutes before your time slot.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-5 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-xs font-semibold hover:border-amber-500 transition-colors"
                      >
                        Book Another Table
                      </button>
                      <a
                        href="tel:+918949019457"
                        className="btn-luxury !py-2.5 !px-5 !text-xs flex items-center gap-2"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Call Kitchen Direct</span>
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <form className="space-y-6">
                    <div className="border-b border-neutral-200 dark:border-neutral-800/80 pb-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-1">
                        Table Booking Form
                      </span>
                      <h2 className="font-serif font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white">
                        Book Your Table in 30 Seconds
                      </h2>
                    </div>

                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
                        <span>⚠️</span>
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* 1. Party Size Selector */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-amber-500" />
                        <span>1. How many guests? *</span>
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {guestOptions.map((opt) => {
                          const isSelected = formData.guests === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setFormData({ ...formData, guests: opt.value })}
                              className={`p-2.5 rounded-xl text-center border transition-all ${
                                isSelected
                                  ? 'bg-amber-500 text-white font-bold border-amber-400 shadow-md scale-[1.02]'
                                  : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200 hover:border-amber-500/50'
                              }`}
                            >
                              <div className="text-xs font-bold">{opt.label}</div>
                              <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-amber-100' : 'text-neutral-500 dark:text-neutral-400'}`}>
                                {opt.desc}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Date & Meal Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-amber-500" />
                          <span>2. Date *</span>
                        </label>
                        <input
                          type="date"
                          required
                          min={todayStr}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl input-luxury text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <UtensilsCrossed className="w-3.5 h-3.5 text-amber-500" />
                          <span>3. Meal Session *</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                mealType: 'lunch',
                                timeSlot: lunchSlots[1],
                              })
                            }
                            className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                              formData.mealType === 'lunch'
                                ? 'bg-amber-500 text-white border-amber-400 shadow-sm'
                                : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200 hover:border-amber-500'
                            }`}
                          >
                            ☀️ Lunch (11:30 - 4 PM)
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                mealType: 'dinner',
                                timeSlot: dinnerSlots[2],
                              })
                            }
                            className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                              formData.mealType === 'dinner'
                                ? 'bg-amber-500 text-white border-amber-400 shadow-sm'
                                : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200 hover:border-amber-500'
                            }`}
                          >
                            🌙 Dinner (7 - 11 PM)
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 4. Time Slots */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>4. Preferred Time Slot *</span>
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {(formData.mealType === 'lunch' ? lunchSlots : dinnerSlots).map((slot) => {
                          const isSelected = formData.timeSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setFormData({ ...formData, timeSlot: slot })}
                              className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                                isSelected
                                  ? 'bg-amber-500 text-white border-amber-400 shadow-md scale-[1.02]'
                                  : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200 hover:border-amber-500'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 5. Seating Area Preference */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2">
                        5. Seating Preference
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {seatingOptions.map((seat) => {
                          const isSelected = formData.seatingArea === seat.id;
                          return (
                            <button
                              key={seat.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, seatingArea: seat.id })}
                              className={`p-3 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? 'bg-amber-500/10 border-amber-500 text-neutral-900 dark:text-white shadow-sm ring-1 ring-amber-500'
                                  : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 hover:border-amber-500/50'
                              }`}
                            >
                              <div className="text-xs font-bold">{seat.name}</div>
                              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                                {seat.desc}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 6. Guest Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-2.5 rounded-xl input-luxury text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-1.5">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="10-digit mobile number"
                          className="w-full px-4 py-2.5 rounded-xl input-luxury text-sm"
                        />
                      </div>
                    </div>

                    {/* 7. Occasion & Special Requests */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-1.5">
                          Occasion
                        </label>
                        <select
                          value={formData.occasion}
                          onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl input-luxury text-sm"
                        >
                          {occasionOptions.map((occ) => (
                            <option key={occ} value={occ}>
                              {occ}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-1.5">
                          Special Dietary Requests
                        </label>
                        <input
                          type="text"
                          value={formData.specialRequests}
                          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                          placeholder="e.g. High chair for baby, mild spice"
                          className="w-full px-4 py-2.5 rounded-xl input-luxury text-sm"
                        />
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={handleWhatsAppBooking}
                        className="py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Reserve via WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDirectSubmit}
                        className="btn-luxury w-full !py-3 !text-xs"
                      >
                        <span>Confirm Reservation</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-neutral-500 dark:text-neutral-400">
                      Need a large catering or custom hall reservation? Call kitchen directly at{' '}
                      <a href="tel:+918949019457" className="text-amber-600 dark:text-amber-400 font-bold underline">
                        +91 89490 19457
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Right 5 Columns: Kitchen Info & Perks */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Dining Perks */}
              <div className="surface-card rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-md space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">
                  The Kulcha King Promise
                </span>
                <h3 className="font-serif font-bold text-xl text-neutral-900 dark:text-white">
                  Why Diners Love Our Table Service
                </h3>

                <ul className="space-y-3.5 text-xs text-neutral-700 dark:text-neutral-300">
                  <li className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-neutral-900 dark:text-white block font-semibold">400°C Live Clay Tandoor</strong>
                      Your kulchas and paranthas are baked fresh to order for ultimate flaky crispness.
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-neutral-900 dark:text-white block font-semibold">White Makhan &amp; Pindi Choley</strong>
                      Every order includes complimentary slow-simmered choley, white makhan, and tangy chutney.
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-neutral-900 dark:text-white block font-semibold">100% Pure Vegetarian Kitchen</strong>
                      Prepared with highest hygiene standards in a clean, family-friendly kitchen.
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-neutral-900 dark:text-white block font-semibold">Ample Parking on Shipra Path</strong>
                      Hassle-free parking available right outside in Mansarovar Sector 7.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Kitchen Direct Contacts */}
              <div className="surface-card rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-md space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">
                      Direct Kitchen Helpline
                    </span>
                    <h4 className="font-serif font-bold text-lg text-neutral-900 dark:text-white">
                      Speak With Kitchen Manager
                    </h4>
                  </div>
                </div>

                <div className="space-y-2 pt-1 text-xs">
                  <a
                    href="tel:+918949019457"
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 hover:border-amber-500 transition-colors"
                  >
                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400 text-[10px] block">Primary Line:</span>
                      <strong className="text-sm font-bold text-neutral-900 dark:text-white">+91 89490 19457</strong>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                      Tap to Call
                    </span>
                  </a>

                  <a
                    href="tel:+918000405678"
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 hover:border-amber-500 transition-colors"
                  >
                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400 text-[10px] block">Secondary Line:</span>
                      <strong className="text-sm font-bold text-neutral-900 dark:text-white">+91 80004 05678</strong>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                      Tap to Call
                    </span>
                  </a>
                </div>
              </div>

              {/* Location & Timings */}
              <div className="surface-card rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-md space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">
                      Restaurant Location
                    </span>
                    <h4 className="font-serif font-bold text-lg text-neutral-900 dark:text-white">
                      Mansarovar Kitchen, Jaipur
                    </h4>
                  </div>
                </div>

                <address className="not-italic text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  79/113, Shipra Path, Sector 7, Mansarovar, Jaipur, Rajasthan 302020
                </address>

                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 dark:text-neutral-400">Hours: 10:00 AM – 11:00 PM</span>
                  <a
                    href={RESTAURANT_INFO.address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    Google Maps Directions &gt;
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Modals & Cart */}
      <CartDrawer />
      <Toast />
      <Footer />
    </div>
  );
}
