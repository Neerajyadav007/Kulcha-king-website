import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export default function Navbar({ activePage = 'home' }) {
  const { itemCount, openCart, theme, toggleTheme } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', href: 'index.html' },
    { id: 'menu', label: 'Menu & Order', href: 'menu.html' },
    { id: 'about', label: 'Our Story', href: 'about.html' },
    { id: 'contact', label: 'Reserve Table', href: 'contact.html' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-white/90 dark:bg-[#08090d]/90 backdrop-blur-md py-2.5 border-b border-amber-500/30 shadow-md shadow-black/5 dark:shadow-black/50'
            : 'bg-white/75 dark:bg-[#08090d]/80 backdrop-blur-md py-3 sm:py-3.5 border-b border-neutral-200/60 dark:border-white/10'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo with golden warmth */}
            <a
              href="index.html"
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="Kulcha King & Parantha Singh Home"
            >
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Kulcha King & Parantha Singh"
                  className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(245,158,11,0.25)]"
                />
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`text-xs lg:text-sm tracking-wide font-medium transition-all px-3.5 py-1.5 rounded-full ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold border border-amber-500/40 shadow-sm dark:shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                        : 'text-neutral-800 dark:text-neutral-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Right Quick Actions: Theme Toggle + Basket */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                type="button"
                className="p-2 rounded-full border border-border bg-card text-foreground hover:text-primary hover:border-primary/50 transition-all"
                aria-label="Toggle Theme"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-primary" strokeWidth={2} />
                ) : (
                  <Moon className="w-4 h-4 text-primary" strokeWidth={2} />
                )}
              </button>

              {/* Basket / Order Button */}
              <button
                onClick={openCart}
                type="button"
                className="btn-luxury !py-2 !px-3.5 sm:!px-4 !text-xs !shadow-md group flex items-center gap-2"
                aria-label="View Order Basket"
              >
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" strokeWidth={2} />
                <span>Basket</span>
                <span className="ml-0.5 px-2 py-0.5 rounded-full bg-black/40 text-white font-bold text-[11px] border border-white/20">
                  {itemCount}
                </span>
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="md:hidden p-2 rounded-lg text-foreground hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border px-6 py-6 space-y-4 shadow-2xl animate-fade-in mt-2">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-semibold tracking-wide flex items-center justify-between p-2.5 rounded-xl transition-all ${
                      isActive
                        ? 'bg-primary/15 text-primary font-bold border border-primary/30'
                        : 'text-foreground hover:text-primary hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="text-[10px] bg-primary/20 text-primary uppercase font-bold px-2 py-0.5 rounded-full border border-primary/40">
                        Active
                      </span>
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-border space-y-3">
              <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>100% Pure Veg Amritsari Cuisine in Mansarovar, Jaipur</span>
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
