import React from 'react';
import ReactDOM from 'react-dom/client';
import NotFoundApp from './pages/NotFoundApp';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <NotFoundApp />
    </CartProvider>
  </React.StrictMode>
);
