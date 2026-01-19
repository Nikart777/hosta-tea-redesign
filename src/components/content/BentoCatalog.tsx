'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

// Данные категорий
const categories = [
  {
    id: 'black',
    title: 'Черный',
    subtitle: 'Свежесть',
    description: 'Классический вкус',
    gradient: 'bg-gradient-to-br from-[#1a1a1a] to-[#3d2b1f]',
    colSpan: 'md:col-span-2',
    letter: 'Ч',
    textColor: 'text-[#efebe9]'
  },
  {
    id: 'green',
    title: 'Зеленый',
    subtitle: 'Аромат',
    description: 'Натуральный тонус',
    gradient: 'bg-gradient-to-br from-[#2d4a2d] to-[#4c6b4c]',
    colSpan: 'md:col-span-1 md:row-span-2',
    letter: 'З',
    textColor: 'text-[#f1f8e9]'
  },
  {
    id: 'red',
    title: 'Красный',
    subtitle: 'Редкость',
    description: 'Глубокий профиль',
    gradient: 'bg-gradient-to-br from-[#5c1c13] to-[#8a2e22]',
    colSpan: 'md:col-span-1',
    letter: 'К',
    textColor: 'text-[#ffebee]'
  },
  {
    id: 'yellow',
    title: 'Желтый',
    subtitle: 'Элитный',
    description: 'Уникальный сорт',
    gradient: 'bg-gradient-to-br from-[#cfa156] to-[#e6c28a]',
    colSpan: 'md:col-span-1',
    letter: 'Ж',
    textColor: 'text-[#3e2723]'
  },
  {
    id: 'gaba',
    title: 'ГАБА',
    subtitle: 'Тренд',
    description: 'Особая ферментация',
    gradient: 'bg-gradient-to-br from-[#3b1e54] to-[#5a3a7b]',
    colSpan: 'md:col-span-1',
    letter: 'Г',
    textColor: 'text-white'
  },
  {
    id: 'gifts',
    title: 'Подарки',
    subtitle: 'Наборы',
    description: 'Для особенных моментов',
    gradient: 'bg-gradient-to-br from-[#34495e] to-[#2c3e50]',
    colSpan: 'md:col-span-1',
    letter: 'П',
    textColor: 'text-white'
  }
];

export default function BentoCatalog() {
  return (
    <section className="py-24 bg-hosta-mist relative z-10">

      {/* Фон: еле заметная текстура бумаги на всей секции */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

      <div className="container mx-auto px-4 relative">

        {/* Заголовок */}
        <div className="mb-16 md:flex md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-hosta-gold font-serif italic text-lg block mb-2">
              Витрина
            </span>
            <h2 className="text-4xl md:text-6xl font-playfair font-medium text-[#2c1810] leading-none">
              Чайная <br /> <span className="italic opacity-60">Коллекция</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block pb-2"
          >
            <Link
              href="/catalog"
              className="text-[#2c1810] border-b border-[#2c1810]/30 hover:border-[#2c1810] transition-colors pb-1 text-sm uppercase tracking-widest"
            >
              Перейти в каталог
            </Link>
          </motion.div>
        </div>

        {/* Сетка Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[280px]">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              className={`relative rounded-[2rem] overflow-hidden cursor-pointer ${cat.colSpan} group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/catalog?category=${cat.id}`} className="block h-full w-full relative">

                {/* 1. Фон (Градиент) */}
                <div className={`absolute inset-0 ${cat.gradient} transition-transform duration-1000 ease-out group-hover:scale-105`} />

                {/* 2. Текстура шума (Grain) - создает эффект бумаги/керамики */}
                <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

                {/* 3. Декоративная Буквица (Крупная буква на фоне) */}
                <div className={`absolute -bottom-4 -right-2 text-[11rem] font-playfair font-black leading-none opacity-10 select-none transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2 ${cat.textColor}`}>
                  {cat.letter}
                </div>

                {/* 4. Контент */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">

                  {/* Верх: Субтитр и иконка перехода */}
                  <div className="flex justify-between items-start">
                    <span className={`text-xs font-bold uppercase tracking-[0.2em] opacity-70 ${cat.textColor}`}>
                      {cat.subtitle}
                    </span>

                    <div className={`w-8 h-8 rounded-full border border-current flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${cat.textColor}`}>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  {/* Низ: Заголовок */}
                  <div>
                    <h3 className={`text-3xl md:text-4xl font-playfair font-medium mb-2 ${cat.textColor}`}>
                      {cat.title}
                    </h3>
                    <p className={`text-sm font-serif italic opacity-80 ${cat.textColor}`}>
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Блик при наведении */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              </Link>
            </motion.div>
          ))}
        </div>

        {/* Кнопка для мобильных */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/catalog"
            className="inline-block px-8 py-3 border border-[#2c1810]/30 text-[#2c1810] uppercase tracking-widest text-xs font-bold rounded-full"
          >
            Смотреть всё
          </Link>
        </div>

      </div>
    </section>
  );
}