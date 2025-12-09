'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';

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
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=2521&auto=format&fit=crop", // Повтор фото из hero для связности, или другое макро
    alt: "Ручной сбор чая"
  }
];

// Компонент одного слайда
const Slide = ({ data, index, progress, range }: { data: typeof slides[0], index: number, progress: MotionValue<number>, range: number[] }) => {
  const opacity = useTransform(progress, range, [0, 1, 0]);
  const scale = useTransform(progress, range, [0.8, 1, 1.2]);
  const xText = useTransform(progress, range, [100, 0, -100]);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center p-6 md:p-20"
      style={{ opacity, pointerEvents: opacity.get() > 0.1 ? 'auto' : 'none' }}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Изображение (Левая часть) */}
        <div className="relative h-[40vh] md:h-[70vh] w-full overflow-hidden rounded-sm shadow-2xl shadow-black/50 group">
          <motion.div style={{ scale }} className="w-full h-full">
            <img 
              src={data.img} 
              alt={data.alt} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hosta-dark/80 to-transparent opacity-60" />
          </motion.div>
          
          {/* Декоративная рамка */}
          <div className="absolute inset-4 border border-white/20 z-10" />
        </div>

        {/* Текст (Правая часть) */}
        <motion.div style={{ x: xText }} className="text-white z-20 md:pl-10">
          <span className="text-[10rem] md:text-[12rem] font-playfair font-bold text-white/5 absolute -top-20 -left-10 select-none z-0 leading-none">
            {data.year}
          </span>
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 text-hosta-gold relative z-10">
            {data.title}
          </h2>
          <div className="w-24 h-[1px] bg-white/30 mb-8" />
          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed relative z-10">
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
      y: ['0vh', '120vh'], 
      rotate: [0, 360],
      x: [0, 50, -50, 0]
    }}
    transition={{ 
      duration: 15, 
      repeat: Infinity, 
      delay: delay, 
      ease: "linear" 
    }}
  >
    {/* SVG Листика */}
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-hosta-gold">
      <path d="M12 2C8 2 4 6 4 12C4 18 10 22 12 22C14 22 20 18 20 12C20 6 16 2 12 2ZM12 20C11 20 6 17 6 12C6 8 8 5 12 4V20Z" />
    </svg>
  </motion.div>
);

export default function Scrollytelling() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-hosta-dark">
      
      {/* Sticky Container - экран, который "залипает" */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        
        {/* Фоновый шум/текстура */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
        
        {/* Градиентный фон, меняющийся слегка */}
        <div className="absolute inset-0 bg-radial-gradient from-hosta-green/20 to-hosta-dark z-0" />

        {/* Слайды */}
        {slides.map((slide, index) => {
          // Рассчитываем, когда показывать каждый слайд
          // 0-0.33 (1 слайд), 0.33-0.66 (2 слайд), 0.66-1.0 (3 слайд)
          const start = index * 0.33;
          const end = start + 0.33;
          // Добавляем перекрытие для плавности
          return (
            <Slide 
              key={slide.id} 
              data={slide} 
              index={index} 
              progress={scrollYProgress}
              range={[start, start + 0.15, end]} 
            />
          );
        })}

        {/* Падающие листья поверх всего */}
        <FallingLeaf delay={0} xPos="10%" />
        <FallingLeaf delay={5} xPos="80%" />
        <FallingLeaf delay={2} xPos="40%" />
        
        {/* Прогресс бар сбоку */}
        <motion.div 
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-[2px] h-64 bg-white/10 overflow-hidden hidden md:block"
        >
          <motion.div 
            className="w-full bg-hosta-gold"
            style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          />
        </motion.div>

      </div>
    </section>
  );
}