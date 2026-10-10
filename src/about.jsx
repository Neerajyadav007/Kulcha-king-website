import React from 'react';
import ReactDOM from 'react-dom/client';
import AboutApp from './pages/AboutApp';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <AboutApp />
    </CartProvider>
  </React.StrictMode>
);
