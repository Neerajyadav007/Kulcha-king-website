import React from 'react';
import ReactDOM from 'react-dom/client';
import MenuApp from './pages/MenuApp';
import { CartProvider } from './context/CartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <MenuApp />
    </CartProvider>
  </React.StrictMode>
);
