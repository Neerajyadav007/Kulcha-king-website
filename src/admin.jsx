import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminApp from './pages/AdminApp';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <AdminApp />
    </CartProvider>
  </React.StrictMode>
);
