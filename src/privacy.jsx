import React from 'react';
import ReactDOM from 'react-dom/client';
import PrivacyApp from './pages/PrivacyApp';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <PrivacyApp />
    </CartProvider>
  </React.StrictMode>
);
