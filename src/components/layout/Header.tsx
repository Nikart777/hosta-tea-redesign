'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartDrawer from './CartDrawer';
import { useCart } from '@/context/CartContext'; // Импорт

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Берем данные из контекста
  const { isOpen, openCart, closeCart, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
          isScrolled ? 'bg-hosta-dark/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="relative z-50 group">
            <div className="text-2xl font-bold font-playfair text-white tracking-wider group-hover:text-hosta-gold transition-colors">
              ХОСТА<span className="text-hosta-gold">ЧАЙ</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/80 block">Сочи • 1947</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-white/90 hover:text-hosta-gold text-sm uppercase tracking-widest font-medium transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-hosta-gold after:transition-all hover:after:w-full">
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
             <a href="tel:+78622659835" className="text-white hover:text-hosta-gold transition-colors flex items-center gap-2">
                <Phone size={18} />
                <span className="text-sm font-medium">+7 (862) 265 98 35</span>
             </a>
             
             {/* Кнопка использует openCart из контекста */}
             <button onClick={openCart} className="relative text-white hover:text-hosta-gold transition-colors group">
               <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
               <span className="absolute -top-1 -right-1 bg-hosta-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                 {cartCount}
               </span>
             </button>
          </div>

          <div className="flex items-center gap-4 md:hidden z-50">
            <button onClick={openCart} className="text-white relative">
               <ShoppingBag size={24} />
               <span className="absolute -top-1 -right-1 bg-hosta-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                 {cartCount}
               </span>
            </button>
            <button className="text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* CartDrawer теперь получает isOpen и onClose из контекста */}
      <CartDrawer isOpen={isOpen} onClose={closeCart} />
    </>
  );
}