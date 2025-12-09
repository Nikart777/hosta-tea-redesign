'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';

// Данные категорий на основе твоего старого сайта
const categories = [
  {
    id: 'black',
    title: 'Черный чай',
    subtitle: 'Классика в каждом глотке',
    price: 'от 550 ₽',
    img: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=2574&auto=format&fit=crop', // Темный, насыщенный
    colSpan: 'md:col-span-2', // Занимает 2 колонки
    bgGradient: 'from-orange-900/80 to-hosta-dark'
  },
  {
    id: 'green',
    title: 'Зеленый чай',
    subtitle: 'Свежесть горного утра',
    price: 'от 580 ₽',
    img: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=2670&auto=format&fit=crop', // Зеленый лист
    colSpan: 'md:col-span-1 md:row-span-2', // Высокий блок
    bgGradient: 'from-green-800/80 to-hosta-dark'
  },
  {
    id: 'red',
    title: 'Красный чай',
    subtitle: 'Тонизирующий и яркий',
    price: 'от 600 ₽',
    img: 'https://images.unsplash.com/photo-1571934811356-5cc55449d0f4?q=80&w=2670&auto=format&fit=crop', // Красноватый оттенок
    colSpan: 'md:col-span-1',
    bgGradient: 'from-red-900/80 to-hosta-dark'
  },
  {
    id: 'yellow',
    title: 'Желтый чай',
    subtitle: 'Императорская редкость',
    price: 'от 600 ₽',
    img: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=2574&auto=format&fit=crop', // Золотистый
    colSpan: 'md:col-span-1',
    bgGradient: 'from-yellow-700/80 to-hosta-dark'
  },
  {
    id: 'sets',
    title: 'Подарочные наборы',
    subtitle: 'Лучшее из Сочи',
    price: 'от 1200 ₽',
    img: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=2574&auto=format&fit=crop', // Красивая упаковка
    colSpan: 'md:col-span-2', // Широкий блок снизу
    bgGradient: 'from-hosta-gold/60 to-hosta-dark'
  }
];

export default function BentoCatalog() {
  return (
    <section className="py-24 bg-hosta-mist relative z-10">
      <div className="container mx-auto px-4">
        
        {/* Заголовок секции */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-hosta-green uppercase tracking-[0.2em] text-sm font-bold block mb-2">
              Наш ассортимент
            </span>
            <h2 className="text-4xl md:text-6xl font-playfair text-hosta-dark leading-tight">
              Коллекция <br/> <span className="text-hosta-gold italic">Вкусов</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <Link 
              href="/catalog" 
              className="group flex items-center gap-2 text-hosta-dark font-medium uppercase tracking-widest text-sm hover:text-hosta-green transition-colors"
            >
              Весь каталог
              <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Сетка Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              className={`group relative rounded-sm overflow-hidden cursor-pointer ${cat.colSpan}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Ссылка на категорию */}
              <Link href={`/catalog/${cat.id}`} className="block h-full w-full">
                
                {/* Изображение с зумом при наведении */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <motion.img 
                    src={cat.img} 
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Градиентный оверлей */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.bgGradient} opacity-60 transition-opacity duration-500 group-hover:opacity-40`} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Контент внутри карточки */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  
                  {/* Цена (появляется при наведении) */}
                  <div className="absolute top-6 right-6 translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <span className="bg-white/90 backdrop-blur-md text-hosta-dark px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                       {cat.price}
                       <ShoppingBag size={14} />
                    </span>
                  </div>

                  <h3 className="text-3xl font-playfair font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {cat.title}
                  </h3>
                  
                  <div className="overflow-hidden">
                    <p className="text-white/80 font-light transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                      {cat.subtitle}
                    </p>
                  </div>

                  {/* Декоративная линия */}
                  <div className="absolute bottom-0 left-0 h-[4px] bg-hosta-gold w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Кнопка для мобильных */}
        <div className="mt-12 text-center md:hidden">
           <Link 
              href="/catalog" 
              className="inline-block px-8 py-4 bg-hosta-dark text-white uppercase tracking-widest font-bold text-sm"
            >
              Смотреть всё
            </Link>
        </div>

      </div>
    </section>
  );
}