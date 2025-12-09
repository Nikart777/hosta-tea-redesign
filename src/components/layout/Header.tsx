'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Phone, MapPin, Mail, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartDrawer from './CartDrawer';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { isOpen, openCart, closeCart, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Блокируем скролл страницы при открытом меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Каталог', href: '/catalog' },
    { name: 'Экскурсии', href: '/excursions' },
    { name: 'Оплата и доставка', href: '/delivery' },
    { name: 'О компании', href: '/about' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen // Если меню открыто, фон тоже темный
            ? 'bg-[#0a120a]/90 backdrop-blur-md py-3 shadow-lg' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Логотип */}
          <Link href="/" className="relative z-50 group" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="text-2xl font-bold font-playfair text-white tracking-wider group-hover:text-hosta-gold transition-colors">
              ХОСТА<span className="text-hosta-gold">ЧАЙ</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/80 block">Сочи • 1947</span>
          </Link>

          {/* Десктоп Меню */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-white/90 hover:text-hosta-gold text-sm uppercase tracking-widest font-medium transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-hosta-gold after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Правая часть: Корзина и Телефон (Десктоп) */}
          <div className="hidden md:flex items-center space-x-6">
             <a href="tel:+78622659835" className="text-white hover:text-hosta-gold transition-colors flex items-center gap-2">
                <Phone size={18} />
                <span className="text-sm font-medium">+7 (862) 265 98 35</span>
             </a>
             
             <button onClick={openCart} className="relative text-white hover:text-hosta-gold transition-colors group">
               <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
               {cartCount > 0 && (
                 <span className="absolute -top-1 -right-1 bg-hosta-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                   {cartCount}
                 </span>
               )}
             </button>
          </div>

          {/* МОБИЛЬНЫЕ КНОПКИ (Корзина + Гамбургер) */}
          <div className="flex items-center gap-5 md:hidden z-50">
            {/* Корзина на мобильном */}
            <button onClick={openCart} className="text-white relative">
               <ShoppingBag size={24} />
               {cartCount > 0 && (
                 <span className="absolute -top-1 -right-1 bg-hosta-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                   {cartCount}
                 </span>
               )}
            </button>
            
            {/* Кнопка Меню */}
            <button 
              className="text-white w-8 h-8 flex items-center justify-center focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* --- МОБИЛЬНОЕ МЕНЮ (ПОЛНОЭКРАННОЕ) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0a120a] z-40 flex flex-col md:hidden pt-28 px-6 pb-10 overflow-y-auto"
          >
            {/* Фоновая текстура для атмосферы */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
            
            {/* Навигация */}
            <nav className="flex flex-col space-y-6 mb-12 relative z-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-playfair font-bold text-white hover:text-hosta-gold transition-colors block"
                  >
                    {link.name}
                  </Link>
                  <div className="h-[1px] w-full bg-white/5 mt-4" />
                </motion.div>
              ))}
            </nav>

            {/* Контакты внизу меню (чтобы не было пусто) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto space-y-6 relative z-10"
            >
              <div className="flex items-center gap-4 text-white/60">
                <MapPin size={20} className="text-hosta-gold" />
                <span className="text-sm">Сочи, с. Калиновое Озеро, ул. Центральная 10</span>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <Phone size={20} className="text-hosta-gold" />
                <a href="tel:+78622659835" className="text-sm hover:text-white transition-colors">+7 (862) 265 98 35</a>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <Mail size={20} className="text-hosta-gold" />
                <a href="mailto:hosta-chai@mail.ru" className="text-sm hover:text-white transition-colors">hosta-chai@mail.ru</a>
              </div>

              {/* Соцсети */}
              <div className="flex gap-4 pt-4 border-t border-white/10 mt-6">
                 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:border-hosta-gold hover:text-hosta-gold transition-colors">
                   <Instagram size={18} />
                 </div>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isOpen} onClose={closeCart} />
    </>
  );
}