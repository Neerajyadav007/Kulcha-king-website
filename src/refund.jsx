import React from 'react';
import ReactDOM from 'react-dom/client';
import RefundApp from './pages/RefundApp';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <RefundApp />
    </CartProvider>
  </React.StrictMode>
);
