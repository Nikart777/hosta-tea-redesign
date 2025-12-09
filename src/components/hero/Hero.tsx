"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Mountain, Leaf, HandHeart } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.9]);

  return (
    // ГЛАВНЫЙ КОНТЕЙНЕР HERO: Учитывает высоту хедера (80px) и использует flex для прижимания инфо-панели
    <div 
      ref={containerRef} 
      className="relative w-full overflow-hidden bg-stone-900 min-h-[calc(100dvh-80px)] flex flex-col"
    >
      {/* --- BACKGROUND LAYER --- */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: yBackground, scale: 1.1 }} 
        animate={{ scale: [1.1, 1.15] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <img
          src="https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04709-1.jpg"
          alt="Чайные плантации Хоста Чай"
          className="h-full w-full object-cover filter saturate-[1.1]"
        />
        
        <motion.div 
          style={{ opacity: opacityOverlay }}
          className="absolute inset-0 bg-gradient-to-b from-jade-dark/40 via-jade-dark/20 to-stone-900/90 mix-blend-multiply" 
        />
      </motion.div>

      {/* --- CONTENT LAYER: flex-grow заставляет контент заполнить всё пространство над инфо-панелью --- */}
      <div className="relative z-10 flex flex-grow flex-col items-center justify-center px-4 text-center pb-10">
        <motion.div 
          style={{ y: yText }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl"
        >
          {/* Badge */}
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2, duration: 0.8 }}
             className="inline-block mb-6"
          >
            <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-sans text-xs font-bold tracking-[0.2em] text-ochre uppercase shadow-lg">
              Est. 1947 • Сочи
            </span>
          </motion.div>

          {/* Заголовок */}
          <h1 className="font-serif text-5xl md:text-8xl lg:text-[8.5rem] text-stone-50 leading-[1.05] drop-shadow-2xl tracking-tight">
            Первый органический <br />
            <span className="italic bg-gradient-to-r from-stone-100 to-stone-400 bg-clip-text text-transparent">
              чай в России
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl font-sans text-lg md:text-xl font-light leading-relaxed text-stone-200 drop-shadow-md">
            Вкус, рожденный морем и солнцем. Ручной сбор в горах Сочи без пестицидов.
          </p>

          {/* Кнопки */}
          <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
            <button className="group relative overflow-hidden rounded-full bg-ochre px-10 py-4 font-sans text-base font-bold tracking-wide text-white transition-all hover:bg-ochre/90 hover:scale-105 shadow-xl shadow-ochre/20">
              <span className="relative z-10">Перейти в каталог</span>
            </button>
            
            <button className="group flex items-center gap-3 rounded-full border border-stone-50/30 px-8 py-4 font-sans text-sm font-semibold text-stone-50 backdrop-blur-md transition-all hover:bg-white/10">
              <span>О плантациях</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-jade-dark pl-0.5">
                 <Play size={10} fill="currentColor" />
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* --- ИНФО-ПАНЕЛЬ: Теперь она позиционируется ОТНОСИТЕЛЬНО, как последний flex-элемент --- */}
      <div className="relative z-20 border-t border-white/10 bg-jade-dark/40 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-6 md:py-8">
          <div className="grid grid-cols-1 gap-6 text-stone-100 md:grid-cols-3 md:gap-12">
            
            {/* Feature 1 */}
            <div className="flex items-center gap-4 justify-center md:justify-start opacity-80 hover:opacity-100 transition-opacity">
              <div className="p-2 rounded-full bg-white/10">
                <Mountain size={24} className="text-ochre" />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-wider text-stone-400">Высота</p>
                <p className="font-serif text-lg leading-none">500м над морем</p>
              </div>
            </div>

            {/* Feature 2 (Center) */}
            <div className="flex items-center gap-4 justify-center opacity-80 hover:opacity-100 transition-opacity md:border-x md:border-white/10 md:px-12">
              <div className="p-2 rounded-full bg-white/10">
                <Leaf size={24} className="text-jade-light" />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-wider text-stone-400">Качество</p>
                <p className="font-serif text-lg leading-none">100% Органика</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-4 justify-center md:justify-end opacity-80 hover:opacity-100 transition-opacity">
              <div className="p-2 rounded-full bg-white/10">
                <HandHeart size={24} className="text-terracotta" />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-wider text-stone-400">Сбор</p>
                <p className="font-serif text-lg leading-none">Только ручной</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}