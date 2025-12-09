'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function SuccessPage() {
  // Очищаем корзину, так как заказ оформлен
  // (В реальности лучше чистить только после подтверждения от API, но для UI сойдет)
  // Для этого нужно добавить метод clearCart в контекст, но пока просто покажем UI
  
  return (
    <div className="min-h-screen bg-hosta-dark text-white flex flex-col items-center justify-center p-4 text-center">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)]"
      >
        <CheckCircle size={48} className="text-white" />
      </motion.div>
      
      <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
        Оплата прошла успешно!
      </h1>
      <p className="text-gray-400 max-w-md mb-10 text-lg">
        Спасибо за заказ. Мы уже начали собирать ваш чай. 
        Письмо с деталями отправлено на почту.
      </p>
      
      <Link 
        href="/" 
        className="group flex items-center gap-2 text-hosta-gold uppercase tracking-widest font-bold hover:text-white transition-colors"
      >
        Вернуться на главную
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}