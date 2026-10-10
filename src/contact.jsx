import React from 'react';
import ReactDOM from 'react-dom/client';
import ContactApp from './pages/ContactApp';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <ContactApp />
    </CartProvider>
  </React.StrictMode>
);
