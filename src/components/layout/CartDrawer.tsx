'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; // Импорт контекста

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // Забираем данные и методы из глобального мозга
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const freeShippingThreshold = 5000;
  const progress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);
  const remainingForFree = freeShippingThreshold - totalPrice;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#0a120a] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />

            <div className="p-6 md:p-8 border-b border-white/5 relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-playfair text-white font-bold flex items-center gap-3">
                  Корзина
                  <span className="text-sm font-inter font-normal text-white/40 bg-white/10 px-2 py-1 rounded-full">
                    {items.length}
                  </span>
                </h2>
                <button onClick={onClose} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                <div className="flex items-center gap-3 text-hosta-gold mb-3">
                   <Truck size={18} />
                   <span className="text-xs uppercase tracking-widest font-bold">
                     {remainingForFree > 0 
                       ? `До бесплатной доставки: ${remainingForFree} ₽` 
                       : 'Бесплатная доставка доступна!'}
                   </span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-hosta-gold rounded-full shadow-[0_0_10px_#cfa156]"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 relative z-10 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag size={48} className="mb-4 text-white" />
                  <p className="text-white">Ваша корзина пуста</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div layout key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-24 flex-shrink-0 bg-white/5 rounded-sm overflow-hidden border border-white/5">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-playfair font-bold text-lg leading-tight mb-1">{item.title}</h3>
                          <p className="text-white/40 text-xs uppercase tracking-wider">{item.subtitle}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-white/10 rounded-sm h-8 px-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-full flex items-center justify-center text-white/40 hover:text-white"><Minus size={14} /></button>
                          <span className="w-6 text-center text-sm text-white font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-full flex items-center justify-center text-white/40 hover:text-white"><Plus size={14} /></button>
                        </div>
                        <span className="text-white font-bold">{item.price * item.quantity} ₽</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-6 md:p-8 border-t border-white/10 bg-[#0a120a] relative z-20">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white/60 uppercase tracking-widest text-xs">Итого</span>
                <span className="text-3xl font-playfair font-bold text-hosta-gold">{totalPrice} ₽</span>
              </div>
              <Link href="/checkout" onClick={onClose} className="w-full bg-hosta-gold text-hosta-dark py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(207,161,86,0.3)] flex items-center justify-center gap-2 group">
                Оформить заказ <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-[10px] text-white/30 text-center mt-4">Налоги и доставка рассчитываются на следующем шаге</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}