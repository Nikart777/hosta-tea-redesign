"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, CornerRightUp } from "lucide-react";

interface DesktopMenuProps {
  isOpen: boolean;
  onClose: () => void;
  // Мы передаем сюда контент, чтобы избежать дублирования в Header
  navItems: { name: string; href: string }[]; 
}

export default function DesktopMenu({ isOpen, onClose, navItems }: DesktopMenuProps) {

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-stone-50/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Кнопка закрытия, расположена справа вверху, как в хедере */}
          <button 
            onClick={onClose} 
            className="absolute right-6 top-6 p-2 text-jade-dark hover:text-terracotta z-50 transition-colors"
            aria-label="Закрыть меню"
          >
            <X size={32} />
          </button>

          <div className="text-center">
            <h2 className="font-serif text-3xl italic text-jade-dark mb-10">
              Навигация
            </h2>
            
            {/* Анимированный список ссылок */}
            <motion.ul
              className="space-y-4"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.05 }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ ease: "easeOut" }}
                >
                  <Link 
                    href={item.href} 
                    onClick={onClose} 
                    className="font-serif text-5xl font-medium text-stone-900 transition-colors hover:text-ochre block py-3"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            
            <div className="mt-16 flex items-center justify-center gap-3 font-sans text-sm text-stone-600">
                <CornerRightUp size={16} className="text-jade-dark" />
                <span>Органический чай из Сочи</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}