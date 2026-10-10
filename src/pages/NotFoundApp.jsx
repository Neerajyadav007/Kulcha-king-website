import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import Toast from '../components/Toast';
import { NotFound as GhostNotFound } from '../components/ui/ghost-404-page';

export default function NotFoundApp() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground transition-colors duration-300">
      <Navbar activePage="" />

      <main className="flex-1 flex flex-col items-center justify-center py-6">
        <GhostNotFound />
      </main>

      <CartDrawer />
      <Toast />
      <Footer />
    </div>
  );
}
