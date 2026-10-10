import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useCart();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl glass-panel-glow border-saffron-500/40 text-cream-50 shadow-2xl transition-all animate-bounce">
      {toast.type === 'info' ? (
        <Info className="w-5 h-5 text-amber-400 shrink-0" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-saffron-500 shrink-0" />
      )}
      <p className="text-sm font-medium tracking-wide">{toast.message}</p>
    </div>
  );
}
