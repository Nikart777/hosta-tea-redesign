"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {

  // Placeholder для содержимого корзины
  const cartItem = {
    name: "Чай ORGANIC Краснодарский крупнолистовой",
    price: 950,
    qty: 1,
  };
  const subtotal = cartItem.price * cartItem.qty;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Задник (Overlay) */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Панель Корзины (Drawer) */}
          <motion.div
            className="fixed right-0 top-0 z-[70] h-screen w-full max-w-sm bg-stone-50 p-6 shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Заголовок и Кнопка закрытия */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h2 className="font-serif text-xl font-medium text-jade-dark">Ваш заказ</h2>
              <button onClick={onClose} className="text-stone-700 hover:text-terracotta transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Контент корзины */}
            <div className="flex-grow py-6 overflow-y-auto">
              {/* Пример товара */}
              <div className="flex items-center gap-4 border-b border-stone-100 pb-4 mb-4">
                <ShoppingBag size={32} className="text-jade-dark" />
                <div className="flex-grow">
                  <p className="font-sans text-sm font-medium text-stone-900">{cartItem.name}</p>
                  <p className="text-xs text-stone-500">Количество: {cartItem.qty}</p>
                </div>
                <p className="font-serif text-sm font-semibold text-terracotta">{subtotal} ₽</p>
              </div>
              
              <p className="text-center text-stone-500 mt-10">
                {/* Если корзина пуста, можно вывести это */}
                Ваша корзина пока пуста.
              </p>
            </div>

            {/* Итог и Кнопка Купить (Sticky на дне) */}
            <div className="mt-auto pt-4 border-t border-stone-200">
              <div className="flex justify-between font-bold text-lg mb-4 text-jade-dark">
                <span>Итого:</span>
                <span>{subtotal} ₽</span>
              </div>
              <Link 
                href="/checkout" 
                className="block w-full rounded-full bg-jade text-white text-center py-3 font-semibold transition-colors hover:bg-jade-dark active:scale-[0.99]"
                onClick={onClose} // Закрываем при переходе
              >
                Оформить заказ
              </Link>
              <button 
                onClick={onClose} 
                className="mt-2 block w-full text-sm text-stone-500 hover:text-stone-900 transition-colors"
              >
                Продолжить покупки
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}