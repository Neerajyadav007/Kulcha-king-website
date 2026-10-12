import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'kulcha_king_cart_items_v1';
const THEME_KEY = 'kulcha_king_theme_v1';

export function CartProvider({ children }) {
  // Theme state: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved === 'light' ? 'light' : 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  // Apply theme to document root and body
  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.remove('dark', 'light');
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);

      if (document.body) {
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(theme);
        document.body.setAttribute('data-theme', theme);
      }

      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Synchronize state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  // Listen to cross-window / cross-tab storage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setItems(JSON.parse(e.newValue));
        } catch (err) {
          console.error(err);
        }
      }
      if (e.key === THEME_KEY && e.newValue) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((current) => (current && Date.now() - current.id >= 2400 ? null : current));
    }, 2500);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (product, options = {}) => {
    const spice = options.spice || 'Medium';
    const extraButter = options.extraButter || false;
    const itemKey = `${product.id}_${spice}_${extraButter ? 'butter' : 'std'}`;
    const priceWithAddons = product.price + (extraButter ? 25 : 0);

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((it) => it.itemKey === itemKey);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            ...product,
            itemKey,
            unitPrice: priceWithAddons,
            quantity: 1,
            selectedSpice: spice,
            extraButter,
          },
        ];
      }
    });

    showToast(`Added ${product.name} to your order!`);
  };

  // Favorites state
  const FAVORITES_KEY = 'kulcha_king_favorites_v1';
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : ['k-01', 'k-03', 'k-05'];
    } catch (e) {
      return ['k-01', 'k-03', 'k-05'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const isFav = prev.includes(id);
      if (isFav) {
        showToast('Removed from favorites', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to your favorites! ❤️', 'success');
        return [...prev, id];
      }
    });
  };

  const isFavorite = (id) => favorites.includes(id);

  // Coupon state
  const [coupon, setCoupon] = useState(null);

  const applyCoupon = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'FIRSTKULCHA' || cleanCode === 'KULCHAKING') {
      const percent = cleanCode === 'FIRSTKULCHA' ? 30 : 20;
      setCoupon({ code: cleanCode, percent });
      showToast(`Promo ${cleanCode} applied: ${percent}% OFF! 🎉`, 'success');
      return { success: true, message: `${percent}% discount applied!` };
    } else if (cleanCode === 'FREESHIP') {
      setCoupon({ code: cleanCode, freeDelivery: true });
      showToast('Free delivery coupon applied! 🛵', 'success');
      return { success: true, message: 'Free delivery applied!' };
    } else {
      showToast('Invalid coupon code. Try FIRSTKULCHA', 'error');
      return { success: false, message: 'Invalid coupon code' };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const updateQuantity = (itemKey, qty) => {
    if (qty <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.itemKey === itemKey ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (itemKey) => {
    setItems((prev) => prev.filter((item) => item.itemKey !== itemKey));
    showToast('Item removed from order', 'info');
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Calculate discount
  let discountAmount = 0;
  if (coupon && coupon.percent && subtotal > 0) {
    discountAmount = Math.round((subtotal * coupon.percent) / 100);
  }
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);

  const gst = Math.round(discountedSubtotal * 0.05); // 5% GST
  const deliveryFee =
    subtotal === 0 || subtotal >= 499 || (coupon && coupon.freeDelivery) ? 0 : 40;
  const grandTotal = discountedSubtotal + gst + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        theme,
        toggleTheme,
        items,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        subtotal,
        discountAmount,
        discountedSubtotal,
        coupon,
        applyCoupon,
        removeCoupon,
        gst,
        deliveryFee,
        grandTotal,
        favorites,
        toggleFavorite,
        isFavorite,
        toast,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
