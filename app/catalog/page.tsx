'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Filter, ShoppingBag, Eye, ArrowUpRight, Leaf } from 'lucide-react';

// --- ДАННЫЕ (MOCK DATA) ---
// В реальном проекте это придет из API или CMS
type Product = {
  id: string;
  title: string;
  type: 'black' | 'green' | 'red' | 'yellow' | 'mix';
  tags: string[];
  price: number;
  weight: string;
  image: string;
  description: string;
  moodColor: string; // Цвет фона при наведении
};

const products: Product[] = [
  {
    id: '1',
    title: 'Хоста Классик',
    type: 'black',
    tags: ['Бодрящий', 'Утренний', 'Классика'],
    price: 550,
    weight: '50 г',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=2574&auto=format&fit=crop',
    description: 'Крепкий, терпкий вкус с нотками сухофруктов. Идеальное начало дня.',
    moodColor: 'from-orange-950/40'
  },
  {
    id: '2',
    title: 'Мацестинский Туман',
    type: 'green',
    tags: ['Релакс', 'Здоровье', 'Мягкий'],
    price: 580,
    weight: '50 г',
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=2670&auto=format&fit=crop',
    description: 'Нежный травянистый аромат и сладкое послевкусие. Собран ранним утром.',
    moodColor: 'from-green-950/40'
  },
  {
    id: '3',
    title: 'Красный Дракон',
    type: 'red',
    tags: ['Согревающий', 'Гурманам', 'Вечерний'],
    price: 600,
    weight: '50 г',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc55449d0f4?q=80&w=2670&auto=format&fit=crop',
    description: 'Яркий янтарный настой с медовыми и хлебными нотами.',
    moodColor: 'from-red-950/40'
  },
  {
    id: '4',
    title: 'Императорский Желтый',
    type: 'yellow',
    tags: ['Редкость', 'Гурманам', 'Подарок'],
    price: 650,
    weight: '50 г',
    image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=2574&auto=format&fit=crop',
    description: 'Уникальная технология томления. Вкус копчения и цветов.',
    moodColor: 'from-yellow-900/30'
  },
  {
    id: '5',
    title: 'Альпийский Сбор',
    type: 'mix',
    tags: ['Здоровье', 'Без кофеина', 'Вечерний'],
    price: 450,
    weight: '40 г',
    image: 'https://images.unsplash.com/photo-1515696955266-4f67e13219a8?q=80&w=2670&auto=format&fit=crop',
    description: 'Травы с высокогорных лугов Красной Поляны.',
    moodColor: 'from-teal-950/40'
  },
  {
    id: '6',
    title: 'Сочи Премиум Сет',
    type: 'black',
    tags: ['Подарок', 'Набор', 'Классика'],
    price: 1200,
    weight: '3 x 50 г',
    image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=2574&auto=format&fit=crop',
    description: 'Лучший сувенир с побережья. Три топовых вкуса в одной коробке.',
    moodColor: 'from-hosta-gold/20'
  },
];

// Все уникальные теги для фильтра
const allTags = ['Все', 'Бодрящий', 'Релакс', 'Подарок', 'Гурманам', 'Здоровье'];

export default function CatalogPage() {
  const [activeTag, setActiveTag] = useState('Все');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Фильтрация
  const filteredProducts = useMemo(() => {
    if (activeTag === 'Все') return products;
    return products.filter(p => p.tags.includes(activeTag));
  }, [activeTag]);

  // Вычисляем текущий цвет фона на основе наведенного товара
  const currentBgGradient = useMemo(() => {
    if (!hoveredProduct) return 'from-hosta-dark'; // Дефолтный фон
    const product = products.find(p => p.id === hoveredProduct);
    return product ? product.moodColor : 'from-hosta-dark';
  }, [hoveredProduct]);

  return (
    <div className="min-h-screen bg-hosta-dark text-white pt-24 pb-20 relative transition-colors duration-1000">
      
      {/* --- АТМОСФЕРНЫЙ ФОН --- */}
      {/* Этот слой плавно меняет цвет в зависимости от наведенного товара */}
      <div 
        className={`fixed inset-0 bg-gradient-to-b ${currentBgGradient} to-hosta-dark transition-all duration-1000 ease-in-out z-0 pointer-events-none`}
      />
      {/* Текстура шума */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 z-0 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* --- ЗАГОЛОВОК --- */}
        <div className="mb-12 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-hosta-gold uppercase tracking-[0.2em] text-xs font-bold mb-4 border border-hosta-gold/30 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <Leaf size={14} />
            Магазин
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-4">
            Витрина <span className="text-white/20 italic">Вкусов</span>
          </h1>
          <p className="text-gray-400 max-w-xl text-lg font-light">
            Выберите чай под ваше настроение. От крепкого утреннего заряда до вечернего спокойствия гор.
          </p>
        </div>

        {/* --- ФИЛЬТРЫ (ТЕГИ) --- */}
        <div className="mb-16 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex items-center gap-4">
            <span className="text-white/40 mr-4">
              <Filter size={20} />
            </span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`
                  px-6 py-2 rounded-sm uppercase tracking-wider text-xs font-bold transition-all duration-300 border whitespace-nowrap
                  ${activeTag === tag 
                    ? 'bg-hosta-gold text-hosta-dark border-hosta-gold shadow-[0_0_15px_rgba(207,161,86,0.4)]' 
                    : 'bg-transparent text-white/60 border-white/10 hover:border-white hover:text-white'}
                `}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* --- СЕТКА ТОВАРОВ --- */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Карточка */}
                <Link href={`/catalog/${product.id}`} className="block">
                  
                  {/* Изображение */}
                  <div className="relative h-[400px] w-full overflow-hidden rounded-sm bg-white/5 mb-6">
                    {/* Бейджик типа чая */}
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      <span className="bg-hosta-dark/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1 border border-white/10 rounded-sm">
                        {product.type === 'black' ? 'Черный' : 
                         product.type === 'green' ? 'Зеленый' : 
                         product.type === 'red' ? 'Красный' : 
                         product.type === 'yellow' ? 'Желтый' : 'Сбор'}
                      </span>
                    </div>

                    <motion.img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                    
                    {/* Оверлей при наведении */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                    {/* Кнопка "Быстрый просмотр" (по центру) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-hosta-gold hover:border-hosta-gold hover:text-hosta-dark transition-all text-white transform scale-75 group-hover:scale-100">
                        <Eye size={24} />
                      </div>
                    </div>
                  </div>

                  {/* Информация */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-playfair font-bold text-white mb-2 group-hover:text-hosta-gold transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-white/50 text-sm font-light line-clamp-2 max-w-[250px] mb-3">
                        {product.description}
                      </p>
                      {/* Теги под описанием */}
                      <div className="flex gap-2">
                        {product.tags.slice(0, 2).map(t => (
                          <span key={t} className="text-[10px] text-hosta-gold/80 uppercase tracking-wider border border-hosta-gold/20 px-2 py-0.5 rounded-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Цена */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-white mb-1">
                        {product.price} ₽
                      </div>
                      <div className="text-xs text-white/40 uppercase tracking-widest">
                        {product.weight}
                      </div>
                    </div>
                  </div>

                </Link>

                {/* Кнопка "В корзину" (появляется снизу) */}
                <button className="absolute bottom-0 right-0 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[-120%] transition-all duration-300 bg-hosta-gold text-hosta-dark p-3 rounded-full shadow-lg z-30 hover:bg-white">
                  <ShoppingBag size={20} />
                </button>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Пустое состояние */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">В этой категории пока пусто. Попробуйте выбрать другой фильтр.</p>
          </div>
        )}

      </div>
    </div>
  );
}