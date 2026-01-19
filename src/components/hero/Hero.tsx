'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Leaf, MapPin } from 'lucide-react';

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

      {/* 1. ВИДЕО-ФОН (Чистый пейзаж) */}
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
          {/* Ссылка на пейзажное видео (чайные плантации/горы) */}
          <source src="https://hosta-tea.ru/wp-content/uploads/2023/02/tea_landscape.webm" type="video/webm" />
        </video>

        {/* Усиленные градиенты для максимальной читаемости */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a120a] via-transparent to-transparent opacity-90" />
      </motion.div>

      {/* 2. ОСНОВНОЙ КОНТЕНТ */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-between py-24 md:py-12">

        {/* Верхняя инфо-строка */}
        <div className="flex justify-between items-start pt-4 border-t border-white/10 mt-16 md:mt-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-2 text-white/60 text-[10px] uppercase tracking-widest font-bold"
          >
            <MapPin size={12} className="text-hosta-gold" />
            <span>Сочи • Кавказский заповедник</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hidden md:block text-right"
          >
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Основано в 1947</p>
            <p className="text-hosta-gold text-[10px] uppercase tracking-widest font-extrabold">Органический продукт</p>
          </motion.div>
        </div>

        {/* Центральная часть */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">

          {/* ЛЕВАЯ ЧАСТЬ: Типографика с исправленным кернингом */}
          <motion.div
            className="lg:col-span-8 relative"
            style={{ y: yText }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-[18vw] lg:text-[14rem] font-playfair font-black text-white leading-[0.8] tracking-[0.05em] mix-blend-overlay opacity-90 select-none"
              style={{ letterSpacing: '0.05em' }} // Исправляем "слипание" ст
            >
              ХОСТА
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-[2px] bg-hosta-gold mt-6 max-w-lg"
            />
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-2xl md:text-3xl font-playfair text-white mt-6 pl-2 font-medium"
            >
              Первый российский органический чай
            </motion.h2>
          </motion.div>

          {/* ПРАВАЯ ЧАСТЬ */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-sm shadow-2xl">
              <p className="text-gray-200 font-light leading-relaxed mb-8 text-sm md:text-base">
                Единственные плантации в России, сертифицированные «Органик».
                Уникальный северный климат Сочи дарит листу исключительную энергию и чистоту.
              </p>

              <div className="flex flex-col gap-4">
                <Link
                  href="/catalog"
                  className="w-full bg-hosta-gold text-hosta-dark py-4 px-6 font-bold uppercase tracking-widest hover:bg-white transition-all flex justify-between items-center group rounded-sm"
                >
                  <span>Перейти к выбору</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/about"
                  className="w-full border border-white/20 text-white py-4 px-6 font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex justify-between items-center group rounded-sm"
                >
                  <span>Наша история</span>
                  <Leaf size={18} className="text-hosta-gold opacity-50 group-hover:opacity-100 transition-all" />
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