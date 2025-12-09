"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ShoppingBag, User, Menu } from "lucide-react";
import CartDrawer from "./CartDrawer";
import DesktopMenu from "./DesktopMenu"; // <-- Новый импорт

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // <-- Новое состояние для меню
  const { scrollY } = useScroll();

  // Отслеживаем вертикальный скролл
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Элементы навигации (Возвращаем)
  const navItems = [
    { name: "Каталог", href: "/catalog" },
    { name: "Оплата и доставка", href: "/delivery" },
    { name: "Экскурсии", href: "/excursions" },
    { name: "О компании", href: "/about" },
  ];

  // --- ДИНАМИЧЕСКИЕ КЛАССЫ ---
  
  const headerClasses = isScrolled
    ? "bg-jade-dark/80 backdrop-blur-md shadow-xl border-b border-white/10"
    : "bg-transparent shadow-none";

  const iconClasses = isScrolled
    ? "text-white"
    : "text-stone-900 drop-shadow-sm";

  const logoClasses = isScrolled
    ? "text-ochre"
    : "text-jade-dark drop-shadow-sm";

  const cartIndicatorColor = isScrolled ? "bg-terracotta" : "bg-ochre";

  return (
    <>
      <motion.header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${headerClasses}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          {/* Логотип */}
          <Link href="/" className={`z-20 font-serif text-2xl font-bold tracking-tight transition-colors duration-300 ${logoClasses}`}>
            HOSTA TEA
          </Link>

          {/* Иконки (Справа) */}
          <div className={`flex items-center gap-6 transition-colors duration-300 ${iconClasses}`}>
            
            {/* Кнопка Меню (Вызывает OverlayMenu) */}
            <button 
                onClick={() => setIsMenuOpen(true)}
                className="transition-colors hover:text-ochre"
                aria-label="Открыть меню"
            >
              <Menu size={24} />
            </button>
            
            <Link href="/account" className="hidden sm:block transition-colors hover:text-ochre">
              <User size={24} />
            </Link>

            {/* Кнопка Корзины */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative transition-colors hover:text-ochre"
              aria-label="Открыть корзину"
            >
              <ShoppingBag size={24} />
              <span className={`absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white ${cartIndicatorColor}`}>
                1
              </span>
            </button>
          </div>
        </div>
      </motion.header>
      
      {/* Боковые панели и меню */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <DesktopMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navItems={navItems} />
    </>
  );
}