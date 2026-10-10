import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import Toast from '../components/Toast';
import { ArrowRight, Flame, Award, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export default function AboutApp() {
  const pillars = [
    { title: "Clay Tandoors", desc: "Charcoal coal firing at 400°C for signature flaky crunch and smoky aroma.", icon: Flame },
    { title: "Layered Dough", desc: "Hand-kneaded with pure desi ghee for delicate separation in every layer.", icon: Sparkles },
    { title: "White Makhan", desc: "Generously crowned with freshly churned butter from local dairy farms.", icon: Award },
    { title: "Pindi Choley", desc: "Slow-simmered overnight with 14 authentic Amritsari spices and tea leaves.", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar activePage="about" />

      {/* Hero with royal banner */}
      <section className="relative py-12 sm:py-16 border-b border-neutral-200 dark:border-neutral-800/80 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-3"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>About Us • In Jaipur Since 2010</span>
            </span>
            <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 dark:text-white leading-[1.12]">
              A True Taste of <span className="text-amber-500 dark:text-amber-400">Punjab!</span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-200 leading-relaxed font-normal">
              Bringing authentic tandoor culinary heritage from Majha to Mansarovar, Jaipur with zero shortcuts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story & Real Photos from live website */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Real About Images with hover animation */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800"
              >
                <img
                  src={RESTAURANT_INFO.images.aboutMain}
                  alt="About Kulcha King & Parantha Singh"
                  className="w-full h-72 sm:h-80 object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800"
              >
                <img
                  src={RESTAURANT_INFO.images.aboutInset}
                  alt="Delicious Punjabi Food"
                  className="w-full h-72 sm:h-80 object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>

            {/* Story Copy */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">
                The Heritage
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-white">
                Authentic Punjabi Flavors in Every Bite!
              </h2>
              <p className="text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed">
                <strong>Kulcha King &amp; Parantha Singh</strong> brings you a mouthwatering selection of crispy, buttery kulchas and flavorful paranthas, crafted to satisfy your cravings.
              </p>
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Indulge in our signature Amritsari Kulcha, Chur Chur Naan, and hearty Paranthas, each packed with authentic flavors. Complement your meal with delightful sides like Dal Makhni, Paneer Tikka, and our refreshing Pede Wali Lassi.
              </p>
              <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-2">
                <HeartHandshake className="w-4 h-4" />
                <span>Perfect for families and budget-friendly, we are your go-to spot for a delightful and affordable Punjabi meal.</span>
              </p>

              <div className="pt-3">
                <a
                  href="menu.html"
                  className="btn-luxury"
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars with Graphic Icons */}
      <section className="py-12 sm:py-16 border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-900/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">
              Standards of Excellence
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-white">
              The 4 Kitchen Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => {
              const IconComp = p.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="surface-card rounded-2xl p-6 space-y-3 shadow-sm border border-neutral-200 dark:border-neutral-800"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-white">{p.title}</h3>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </motion.div>
              );
            })}
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
