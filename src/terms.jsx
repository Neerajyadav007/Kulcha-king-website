import React from 'react';
import ReactDOM from 'react-dom/client';
import TermsApp from './pages/TermsApp';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <TermsApp />
    </CartProvider>
  </React.StrictMode>
);
