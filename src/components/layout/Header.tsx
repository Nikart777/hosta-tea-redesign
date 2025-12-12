'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Phone, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartDrawer from './CartDrawer';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // ИСПРАВЛЕНИЕ: Добавили closeCart в деструктуризацию
  const { isOpen, openCart, closeCart, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { name: 'О плантации', href: '/about' },
    { name: 'Экскурсии', href: '/excursions' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen 
            ? 'bg-[#0a120a]/90 backdrop-blur-md py-3 shadow-lg border-b border-white/5' 
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
          <nav className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-white/90 hover:text-hosta-gold text-xs uppercase tracking-[0.15em] font-bold transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-hosta-gold after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Правая часть */}
          <div className="hidden md:flex items-center space-x-8">
             <a href="tel:+78622659835" className="text-white/80 hover:text-hosta-gold transition-colors flex items-center gap-2 text-sm font-medium">
                <Phone size={16} />
                <span>+7 (862) 265 98 35</span>
             </a>
             
             <button onClick={openCart} className="relative text-white hover:text-hosta-gold transition-colors group p-2">
               <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
               {cartCount > 0 && (
                 <span className="absolute top-0 right-0 bg-hosta-gold text-hosta-dark text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                   {cartCount}
                 </span>
               )}
             </button>
          </div>

          {/* Мобильные кнопки */}
          <div className="flex items-center gap-5 md:hidden z-50">
            <button onClick={openCart} className="text-white relative">
               <ShoppingBag size={24} />
               {cartCount > 0 && (
                 <span className="absolute -top-1 -right-1 bg-hosta-gold text-hosta-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                   {cartCount}
                 </span>
               )}
            </button>
            
            <button 
              className="text-white w-8 h-8 flex items-center justify-center focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="relative w-6 h-6"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#0a120a] z-40 flex flex-col md:hidden pt-32 px-6 pb-10 overflow-y-auto"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
            
            <nav className="flex flex-col space-y-8 mb-12 relative z-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-playfair font-bold text-white hover:text-hosta-gold transition-colors block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto space-y-6 relative z-10"
            >
              <div className="flex gap-4">
                 <a href="https://instagram.com" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-hosta-gold hover:text-hosta-dark transition-all">
                   <Instagram size={20} />
                 </a>
                 <a href="tel:+78622659835" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-hosta-gold hover:text-hosta-dark transition-all">
                   <Phone size={20} />
                 </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isOpen} onClose={closeCart} />
    </>
  );
}