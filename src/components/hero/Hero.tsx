'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, MapPin } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Параллакс фона: движется медленнее скролла
  const yBackground = useTransform(scrollY, [0, 1000], [0, 200]);
  
  // Текст уходит вверх быстрее
  const yText = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#0a120a]"
    >
      
      {/* 1. ВИДЕО-ФОН (Чистый, без пара) */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: yBackground }}
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          poster="https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04709-1.jpg"
          className="w-full h-full object-cover scale-105" 
        >
          {/* Основной легкий файл */}
          <source src="https://medprogramcenter.com/wp-content/uploads/2025/12/tea.webm" type="video/webm" />
          {/* Фолбэк */}
          <source src="https://hosta-tea.ru/wp-content/uploads/2023/02/chaj.mp4" type="video/mp4" />
        </video>
        
        {/* Градиенты для читаемости текста, но прозрачнее чем раньше */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a120a] via-transparent to-transparent opacity-80" />
      </motion.div>

      {/* 2. ОСНОВНОЙ КОНТЕНТ */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-between py-24 md:py-12">
        
        {/* Верхняя инфо-строка */}
        <div className="flex justify-between items-start pt-4 border-t border-white/20 mt-16 md:mt-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest font-medium"
          >
            <MapPin size={14} className="text-hosta-gold" />
            <span>Сочи • 43°35' с.ш.</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hidden md:block text-right"
          >
            <p className="text-white/40 text-xs uppercase tracking-widest">Основано в 1947</p>
            <p className="text-hosta-gold text-xs uppercase tracking-widest font-bold">100% Organic</p>
          </motion.div>
        </div>

        {/* Центральная часть: Асимметричная верстка */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          
          {/* ЛЕВАЯ ЧАСТЬ: Гигантская типографика */}
          <motion.div 
            className="lg:col-span-8 relative"
            style={{ y: yText }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-[18vw] lg:text-[14rem] font-playfair font-black text-white leading-[0.8] tracking-tighter mix-blend-overlay opacity-90 select-none"
            >
              ХОСТА
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-[2px] bg-hosta-gold mt-4 max-w-md"
            />
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-2xl md:text-4xl font-playfair text-white mt-4 pl-2"
            >
              Душа северных гор
            </motion.h2>
          </motion.div>

          {/* ПРАВАЯ ЧАСТЬ: Стеклянная карточка с действиями */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-sm shadow-2xl">
              <p className="text-gray-200 font-light leading-relaxed mb-8 text-sm md:text-base">
                Единственный чай, выращенный в зоне рискованного земледелия. 
                Зимние морозы закаляют лист, делая его вкус уникально насыщенным и сладким без сахара.
              </p>

              <div className="flex flex-col gap-4">
                <Link 
                  href="/catalog" 
                  className="w-full bg-hosta-gold text-hosta-dark py-4 px-6 font-bold uppercase tracking-widest hover:bg-white transition-all flex justify-between items-center group rounded-sm"
                >
                  <span>Каталог вкусов</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  href="/excursions" 
                  className="w-full border border-white/20 text-white py-4 px-6 font-bold uppercase tracking-widest hover:bg-white/5 transition-all flex justify-between items-center group rounded-sm"
                >
                  <span>О плантации</span>
                  <Play size={18} className="fill-white/0 group-hover:fill-white transition-all" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Декоративная линия скролла справа */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 h-40 w-[1px] bg-white/10 hidden md:block">
        <motion.div 
          className="w-full bg-hosta-gold h-1/3"
          animate={{ y: [0, 80, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

    </section>
  );
}