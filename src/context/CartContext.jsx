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
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const deliveryFee = subtotal === 0 || subtotal >= 499 ? 0 : 40;
  const grandTotal = subtotal + gst + deliveryFee;

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
        gst,
        deliveryFee,
        grandTotal,
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
