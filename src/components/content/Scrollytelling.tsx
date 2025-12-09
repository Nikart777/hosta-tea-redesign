'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// Данные для слайдов истории
const slides = [
  {
    id: 1,
    year: "1947",
    title: "Корни истории",
    description: "Всё началось в послевоенные годы. Именно тогда, в туманных ущельях Мацесты, были заложены первые семена, давшие жизнь самым северным чайным кустам в мире.",
    img: "https://images.unsplash.com/photo-1596504382607-422842418e69?q=80&w=2574&auto=format&fit=crop",
    alt: "Старые чайные плантации"
  },
  {
    id: 2,
    year: "43°",
    title: "Северная широта",
    description: "Уникальный климат. Зимой снег укрывает кусты, убивая вредителей. Это позволяет нам полностью отказаться от химии. Только природа, мороз и солнце.",
    img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=2574&auto=format&fit=crop",
    alt: "Чай под снегом или в тумане"
  },
  {
    id: 3,
    year: "3",
    title: "Верхних листа",
    description: "Мы не используем машины. Только чуткие руки наших чаеводов собирают флеши — почку и два верхних листочка. Именно в них сосредоточен весь вкус и польза.",
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=2521&auto=format&fit=crop",
    alt: "Ручной сбор чая"
  }
];

// Компонент одного слайда
const Slide = ({ data, index, progress, range }: { data: typeof slides[0], index: number, progress: MotionValue<number>, range: number[] }) => {
  // Оптимизация: используем более простые диапазоны значений
  const opacity = useTransform(progress, range, [0, 1, 0]);
  // Уменьшил масштаб с 1.2 до 1.05, чтобы меньше нагружать GPU при перерисовке
  const scale = useTransform(progress, range, [0.95, 1, 1.05]);
  // Уменьшил сдвиг по X, чтобы текст не "улетал" слишком быстро на узких экранах
  const xText = useTransform(progress, range, [30, 0, -30]);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center p-6 md:p-20 w-full h-full"
      style={{ 
        opacity, 
        // pointerEvents: 'none' отключает взаимодействие, когда слайд невидим, 
        // но здесь лучше просто управлять видимостью через opacity
        zIndex: index 
      }}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center h-full md:h-auto content-center">
        
        {/* Изображение (Левая часть) */}
        {/* will-change-transform сообщает браузеру заранее подготовить слой */}
        <div className="relative h-[35vh] md:h-[60vh] w-full overflow-hidden rounded-sm shadow-2xl shadow-black/50 group border border-white/10 order-2 md:order-1 will-change-transform">
          <motion.div style={{ scale }} className="w-full h-full">
            <img 
              src={data.img} 
              alt={data.alt} 
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
              loading="eager" // Важно для быстрой отрисовки при скролле
            />
            {/* Градиент поверх фото */}
            <div className="absolute inset-0 bg-gradient-to-t from-hosta-dark/90 via-transparent to-transparent opacity-80" />
          </motion.div>
          
          {/* Декоративная рамка */}
          <div className="absolute inset-4 border border-white/20 z-10 pointer-events-none" />
        </div>

        {/* Текст (Правая часть) */}
        <motion.div 
          style={{ x: xText }} 
          className="text-white z-20 md:pl-10 relative order-1 md:order-2 flex flex-col justify-center will-change-transform"
        >
          {/* Фоновая огромная цифра */}
          <span className="text-[6rem] md:text-[12rem] font-playfair font-bold text-white/5 absolute -top-10 md:-top-20 -left-4 md:-left-10 select-none z-0 leading-none">
            {data.year}
          </span>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 md:mb-8 text-hosta-gold relative z-10 leading-tight">
            {data.title}
          </h2>
          
          <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-hosta-gold to-transparent mb-4 md:mb-8" />
          
          <p className="text-base md:text-xl text-gray-300 font-light leading-relaxed relative z-10 font-inter line-clamp-4 md:line-clamp-none">
            {data.description}
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
};

// Падающий лист (декорация)
const FallingLeaf = ({ delay, xPos }: { delay: number, xPos: string }) => (
  <motion.div
    className="absolute top-[-10%] w-8 h-8 md:w-12 md:h-12 opacity-40 z-30 pointer-events-none"
    style={{ left: xPos }}
    animate={{ 
      y: ['0vh', '100vh'], // Используем vh вместо процентов для стабильности
      rotate: [0, 360],
      x: [0, 30, -30, 0]
    }}
    transition={{ 
      duration: 15, 
      repeat: Infinity, 
      delay: delay, 
      ease: "linear" 
    }}
  >
    {/* SVG Листика */}
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-hosta-gold drop-shadow-lg">
      <path d="M12 2C8 2 4 6 4 12C4 18 10 22 12 22C14 22 20 18 20 12C20 6 16 2 12 2ZM12 20C11 20 6 17 6 12C6 8 8 5 12 4V20Z" />
    </svg>
  </motion.div>
);

export default function Scrollytelling() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Отслеживаем скролл внутри этого контейнера
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    // Уменьшили общую высоту до 300vh, чтобы на мобильных не скроллить вечность
    <section ref={containerRef} className="relative h-[300vh] bg-hosta-dark">
      
      {/* Sticky Container */}
      {/* Используем h-[100dvh] для корректной работы на мобильных с плавающей адресной строкой */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden flex items-center w-full">
        
        {/* Фоновая текстура шума для киношности */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none will-change-transform" />
        
        {/* Градиентный фон */}
        <div className="absolute inset-0 bg-radial-gradient from-hosta-green/20 to-hosta-dark z-0" />

        {/* Слайды */}
        <div className="relative w-full h-full">
            {slides.map((slide, index) => {
            // Логика расчета времени показа слайда
            // Разбиваем 100% скролла на количество слайдов
            const step = 1 / slides.length;
            const start = index * step;
            const end = start + step;
            return (
                <Slide 
                key={slide.id} 
                data={slide} 
                index={index} 
                progress={scrollYProgress}
                range={[start, start + (step * 0.5), end]} 
                />
            );
            })}
        </div>

        {/* Падающие листья поверх всего */}
        <FallingLeaf delay={0} xPos="10%" />
        <FallingLeaf delay={5} xPos="80%" />
        <FallingLeaf delay={2} xPos="40%" />
        
        {/* Индикатор прогресса сбоку (только десктоп) */}
        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-[1px] h-40 md:h-64 bg-white/10 hidden md:block">
          <motion.div 
            className="w-full bg-hosta-gold box-shadow-[0_0_10px_#cfa156]"
            style={{ height: useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]) }}
          />
        </div>

      </div>
    </section>
  );
}