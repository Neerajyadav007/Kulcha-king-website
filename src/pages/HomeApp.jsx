import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import Toast from '../components/Toast';
import DishModal from '../components/DishModal';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { MENU_ITEMS } from '../data/menuData';
import { ArrowRight, Star, Flame, Sparkles, Award, Clock, MapPin } from 'lucide-react';
import { MenuItemCard } from '../components/ui/menu-item-card';
import FAQs from '../components/ui/text-reveal-faqs';
import { Hero10 } from '../components/ui/hero-10';

export default function HomeApp() {
  const { addToCart, openCart } = useCart();
  const [selectedDish, setSelectedDish] = useState(null);

  // 4 top signature delicacies
  const signatureDishes = MENU_ITEMS.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar activePage="home" />

      {/* 1. HERO SECTION: Hero10 with 3D fanned cards and connected CTAs */}
      <Hero10
        title="Authentic Amritsari Kulchas"
        titleLine2Prefix="& Golden Desi Ghee"
        titleHighlight="Paranthas"
        description="Crispy, layered tandoori kulchas baked fresh at 400°C in traditional clay ovens, served with slow-simmered Pindi choley and freshly churned white makhan in Mansarovar, Jaipur."
        socialProof="⭐ Rated 4.9/5 by 10,000+ Happy Diners in Jaipur • 100% Pure Veg"
        images={[
          "https://kulchakingparanthasingh.com/images/demo/gallery/gallery-01.jpg",
          "https://kulchakingparanthasingh.com/images/demo/gallery/gallery-02.jpg",
          "https://kulchakingparanthasingh.com/images/demo/gallery/gallery-05.jpg",
        ]}
        imageAlts={[
          "Crispy Amritsari Kulcha with Choley",
          "Royal Paneer Tandoori Parantha",
          "Special Pede Wali Malai Lassi",
        ]}
        animation="subtle"
        primaryCTA={{
          ctaEnabled: true,
          text: "Order Online Menu",
          link: "menu.html",
          variant: "default",
          size: "default",
        }}
        secondaryCTA={{
          ctaEnabled: true,
          text: "Reserve a Table",
          link: "contact.html",
          variant: "outline",
          size: "default",
        }}
      />

      {/* 2. STATS BAR: Elevated Graphic Cards */}
      <section className="border-b border-neutral-200 dark:border-neutral-800/80 py-8 bg-neutral-100/60 dark:bg-neutral-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {RESTAURANT_INFO.stats.map((st, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-xl surface-card border border-neutral-200 dark:border-neutral-800/80 shadow-sm"
              >
                <p className="font-serif font-black text-2xl sm:text-3xl text-neutral-900 dark:text-white">{st.value}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mt-1">{st.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE DELICACIES: Styled with MenuItemCard */}
      <section className="py-14 sm:py-18">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">
              Hand-Crafted in Clay Tandoor
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-white">
              Signature Kulchas &amp; Paranthas
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              Served piping hot with freshly churned white butter, slow-simmered Amritsari choley, and tangy onion-imli chutney.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureDishes.map((dish) => (
              <MenuItemCard
                key={dish.id}
                imageUrl={dish.image}
                isVegetarian={dish.isVegetarian ?? true}
                name={dish.name}
                price={dish.price}
                originalPrice={dish.originalPrice ?? Math.round(dish.price * 1.35)}
                quantity={dish.quantity || "2 Pcs + Choley + Makhan"}
                prepTimeInMinutes={dish.prepTimeInMinutes || 15}
                badge={dish.badge}
                onAdd={() => addToCart(dish)}
                onClick={() => setSelectedDish(dish)}
                className="cursor-pointer"
              />
            ))}
          </div>

          {/* Action button */}
          <div className="text-center mt-10">
            <a
              href="menu.html"
              className="btn-luxury"
            >
              <span>View Full Menu &amp; Order</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. ABOUT SECTION: Real photos from live website */}
      <section className="py-14 sm:py-18 border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-900/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Real About Images from live website */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800 group">
                <img
                  src={RESTAURANT_INFO.images.aboutMain}
                  alt="About Kulcha King & Parantha Singh"
                  className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800 group">
                <img
                  src={RESTAURANT_INFO.images.aboutInset}
                  alt="Delicious Punjabi Food"
                  className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">
                The Royal Punjabi Kitchen
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-white">
                Authentic Punjabi Flavors in Every Bite!
              </h2>
              <p className="text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed">
                <strong>Kulcha King &amp; Parantha Singh</strong> brings you a mouthwatering selection of crispy, buttery kulchas and flavorful paranthas in Mansarovar, Jaipur.
              </p>
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed">
                Complement your meal with delightful sides like Dal Makhni, Paneer Tikka, and our refreshing Pede Wali Lassi. Perfect for families, foodies, and budget-friendly gatherings.
              </p>

              <div className="pt-2">
                <a
                  href="about.html"
                  className="btn-luxury"
                >
                  <span>Read Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS: Real Photos & Real Quotes */}
      <section className="py-14 sm:py-18">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">
              Diner Experiences
            </span>
            <h2 className="font-serif font-bold text-3xl text-neutral-900 dark:text-white">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESTAURANT_INFO.testimonials.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="surface-card rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-sm border border-neutral-200 dark:border-neutral-800"
              >
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-200 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-amber-500/30"
                  />
                  <div>
                    <p className="font-bold text-xs text-neutral-900 dark:text-white">{t.name}</p>
                    <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Verified Diner</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TEXT-REVEAL FAQS SECTION */}
      <FAQs />

      {/* 7. CALL TO ACTION: Royal Obsidian & Golden Glow */}
      <section className="py-14 sm:py-20 border-t border-neutral-200 dark:border-neutral-800 bg-[#0c0e17] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 to-transparent pointer-events-none"></div>
        <div className="max-w-2xl mx-auto px-4 space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">
            Doorstep Delivery &amp; Counter Pickup
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-white">
            Craving Authentic Punjabi Flavors?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
            Order online now for hot doorstep delivery or pickup in Mansarovar, Jaipur. Enjoy crispy Amritsari Kulchas with Choley and Lassi.
          </p>
          <div className="pt-3">
            <a
              href="menu.html"
              className="btn-luxury"
            >
              <span>Explore Menu &amp; Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Modals & Cart */}
      <CartDrawer />
      <Toast />
      {selectedDish && (
        <DishModal
          dish={selectedDish}
          isOpen={!!selectedDish}
          onClose={() => setSelectedDish(null)}
        />
      )}
      <Footer />
    </div>
  );
}
