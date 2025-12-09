'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

// Компонент для создания эффекта пара/тумана
const Steam = ({ className }: { className?: string }) => {
  const steamBlobs = Array.from({ length: 6 });

  return (
    <div className={`absolute inset-0 z-10 pointer-events-none overflow-hidden ${className}`}>
      {steamBlobs.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[-20%] bg-white/10 blur-[80px] rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            width: `${200 + Math.random() * 300}px`,
            height: `${200 + Math.random() * 300}px`,
          }}
          animate={{
            y: [0, -1000],
            opacity: [0, 0.3, 0], 
            scale: [1, 1.5],
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: 12 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Параллакс
  const yBackground = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  // Интерактив на движение мыши
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-hosta-dark"
    >
      
      {/* 1. ВИДЕО-ФОН */}
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
          
          {/* Фолбэк для старых браузеров (Safari < 14.1), которые не умеют в WebM */}
          <source src="https://hosta-tea.ru/wp-content/uploads/2023/02/chaj.mp4" type="video/mp4" />
        </video>
        
        {/* Сложная система затемнения для читаемости и атмосферы */}
        <div className="absolute inset-0 bg-black/40" /> {/* Базовое затемнение */}
        <div className="absolute inset-0 bg-gradient-to-b from-hosta-dark/70 via-transparent to-hosta-dark" /> {/* Виньетка сверху и снизу */}
        <div className="absolute inset-0 bg-hosta-gold/20 mix-blend-overlay" /> {/* Золотистый оттенок "заварки" */}
      </motion.div>

      {/* 2. ЭФФЕКТЫ: Пар и Пыль */}
      <Steam />
      
      {/* Текстура шума/пыли для киношности */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-30 mix-blend-screen">
         <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse" />
      </div>

      {/* 3. КОНТЕНТ */}
      <motion.div 
        className="relative z-20 container mx-auto px-4 text-center flex flex-col items-center"
        style={{ opacity: opacityText }}
      >
        
        {/* Декоративная линия */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="w-[1px] bg-gradient-to-b from-transparent via-hosta-gold to-transparent mb-6"
        />

        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8 relative"
        >
          <span className="text-white/90 text-xs md:text-sm uppercase tracking-[0.3em] font-medium py-2 px-6 border border-white/20 rounded-full backdrop-blur-md bg-white/5">
            Сочи • Мацестинская долина
          </span>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-8xl lg:text-[10rem] font-playfair font-bold text-white mb-2 leading-[0.85] tracking-tighter"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        >
          Хоста
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-hosta-gold to-amber-700">
            Чай
          </span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed font-inter mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Вкус, рожденный в горах. <br/>
          <span className="text-hosta-gold/90 italic font-serif">Единственный чай, который согревает душу.</span>
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <Link 
            href="/catalog" 
            className="group relative px-10 py-5 bg-hosta-gold text-hosta-dark font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-white hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10">Выбрать вкус</span>
          </Link>
          
          <Link 
            href="/excursions" 
            className="group flex items-center gap-3 text-white/80 hover:text-white uppercase tracking-widest text-sm transition-all"
          >
            <span className="border-b border-transparent group-hover:border-white pb-1 transition-all">Смотреть видео</span>
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white transition-all">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
            </div>
          </Link>
        </motion.div>

      </motion.div>

      {/* 4. Индикатор скролла */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 mix-blend-screen z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={24} strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
}