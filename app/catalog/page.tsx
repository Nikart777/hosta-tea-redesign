'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Filter, Eye, Leaf } from 'lucide-react';
import { products } from '@/data/products';

// Категории для навигации
const categories = [
  { id: 'black', label: 'Черный чай' },
  { id: 'red', label: 'Красный чай' },
  { id: 'green', label: 'Зеленый чай' },
  { id: 'yellow', label: 'Желтый чай' },
  { id: 'gaba', label: 'ГАБА - чай' },
  { id: 'mix', label: 'Ассорти' },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  // По умолчанию 'black', если параметра нет
  const [activeCategory, setActiveCategory] = useState<string>('black');
  const [activeTag, setActiveTag] = useState<string>('Все');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Следим за изменением URL и обновляем категорию
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.some(c => c.id === categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  // 1. Фильтруем товары по категории
  const categoryProducts = useMemo(() => {
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // 2. Получаем уникальные теги для текущей категории
  const categoryTags = useMemo(() => {
    const tags = new Set<string>(['Все']);
    categoryProducts.forEach(p => p.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [categoryProducts]);

  // 3. Фильтруем товары по выбранному тегу
  const filteredProducts = useMemo(() => {
    if (activeTag === 'Все') return categoryProducts;
    return categoryProducts.filter(p => p.tags.includes(activeTag));
  }, [categoryProducts, activeTag]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setActiveTag('Все');
    // Можно добавить обновление URL, но для SPA это не обязательно, 
    // если не нужно сохранять историю при кликах внутри
  };

  const currentBgGradient = useMemo(() => {
    if (hoveredProduct) {
      const prod = products.find(p => p.id === hoveredProduct);
      return prod?.moodColor || 'from-hosta-dark';
    }
    switch (activeCategory) {
      case 'black': return 'from-orange-950/30';
      case 'green': return 'from-green-950/30';
      case 'red': return 'from-red-950/30';
      case 'yellow': return 'from-yellow-950/30';
      case 'white': return 'from-slate-800/30';
      case 'gaba': return 'from-purple-950/30';
      case 'mix': return 'from-amber-800/30';
      default: return 'from-hosta-dark';
    }
  }, [hoveredProduct, activeCategory]);

  return (
    <div className="min-h-screen bg-hosta-dark text-white pt-24 pb-20 relative transition-colors duration-1000">
      
      {/* АТМОСФЕРНЫЙ ФОН */}
      <div 
        className={`fixed inset-0 bg-gradient-to-b ${currentBgGradient} to-hosta-dark transition-all duration-1000 ease-in-out z-0 pointer-events-none`}
      />
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 z-0 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* --- ЗАГОЛОВОК --- */}
        <div className="mb-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-hosta-gold uppercase tracking-[0.2em] text-xs font-bold mb-4 border border-hosta-gold/30 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <Leaf size={14} />
            Каталог
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
            Выберите <span className="text-white/20 italic">Свой Чай</span>
          </h1>
        </div>

        {/* --- 1. КАТЕГОРИИ --- */}
        <div className="mb-12 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2 md:gap-4 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`
                  relative px-6 py-4 rounded-sm text-sm font-bold uppercase tracking-widest transition-all duration-300
                  ${activeCategory === cat.id 
                    ? 'text-white' 
                    : 'text-white/40 hover:text-white'}
                `}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.div 
                    layoutId="category-indicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-hosta-gold shadow-[0_0_10px_#cfa156]"
                  />
                )}
              </button>
            ))}
          </div>
          <div className="h-[1px] w-full bg-white/10 mt-[-1px]" />
        </div>

        {/* --- 2. ФИЛЬТРЫ --- */}
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <span className="text-white/40 mr-2 flex items-center gap-2 text-xs uppercase tracking-widest">
            <Filter size={14} />
            Фильтр:
          </span>
          {categoryTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`
                px-4 py-2 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all border
                ${activeTag === tag 
                  ? 'bg-hosta-gold text-hosta-dark border-hosta-gold' 
                  : 'bg-transparent text-white/60 border-white/10 hover:border-white hover:text-white'}
              `}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* --- 3. СЕТКА ТОВАРОВ --- */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link href={`/catalog/${product.slug}`} className="block">
                  
                  {/* Изображение */}
                  <div className="relative h-[400px] w-full overflow-hidden rounded-sm bg-white/5 mb-6 border border-white/5">
                    {/* Цена "От" */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-hosta-dark/80 backdrop-blur-md text-white font-bold text-sm px-3 py-1 border border-white/10 rounded-sm">
                        от {Math.min(...product.variants.map(v => v.price))} ₽
                      </span>
                    </div>

                    <motion.img 
                      src={product.images[0]} 
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />

                    {/* Кнопка просмотра */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-hosta-gold hover:border-hosta-gold hover:text-hosta-dark transition-all text-white transform scale-75 group-hover:scale-100">
                        <Eye size={24} />
                      </div>
                    </div>
                  </div>

                  {/* Инфо */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-playfair font-bold text-white mb-2 group-hover:text-hosta-gold transition-colors leading-snug">
                        {product.title}
                      </h3>
                      <p className="text-white/50 text-xs font-light mb-3 uppercase tracking-wider">
                        {product.subtitle}
                      </p>
                      {/* Теги */}
                      <div className="flex gap-2">
                        {product.tags.slice(0, 2).map(t => (
                          <span key={t} className="text-[9px] text-hosta-gold/80 uppercase tracking-wider border border-hosta-gold/20 px-2 py-0.5 rounded-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Если пусто */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-sm border border-white/5">
            <p className="text-white/40 text-lg font-playfair">В этой категории пока пусто.</p>
            <p className="text-white/20 text-sm mt-2">Попробуйте выбрать другую категорию.</p>
          </div>
        )}

      </div>
    </div>
  );
}

// Оборачиваем в Suspense для корректной работы useSearchParams
export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-hosta-dark" />}>
      <CatalogContent />
    </Suspense>
  );
}