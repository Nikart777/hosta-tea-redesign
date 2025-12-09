'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Отслеживаем скролл для эффекта стекла
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          isScrolled 
            ? 'bg-hosta-dark/90 backdrop-blur-md py-3 shadow-lg' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Логотип */}
          <Link href="/" className="relative z-50 group">
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

          {/* Правая часть: Корзина и Телефон */}
          <div className="hidden md:flex items-center space-x-6">
             <a href="tel:+78622659835" className="text-white hover:text-hosta-gold transition-colors flex items-center gap-2">
                <Phone size={18} />
                <span className="text-sm font-medium">+7 (862) 265 98 35</span>
             </a>
             <button className="relative text-white hover:text-hosta-gold transition-colors">
               <ShoppingBag size={24} />
               <span className="absolute -top-1 -right-1 bg-hosta-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
             </button>
          </div>

          {/* Мобильная кнопка */}
          <button 
            className="md:hidden text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Мобильное меню (полноэкранное) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-hosta-dark z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-playfair text-white hover:text-hosta-gold"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}