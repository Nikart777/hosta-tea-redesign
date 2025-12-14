'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTag, setActiveTag] = useState<string>('Все');

  const categoryParam = searchParams.get('category');
  const activeCategory = (categoryParam && categories.some(c => c.id === categoryParam))
    ? categoryParam
    : 'black';

  const categoryProducts = useMemo(() => {
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const categoryTags = useMemo(() => {
    const tags = new Set<string>(['Все']);
    categoryProducts.forEach(p => p.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    if (activeTag === 'Все') return categoryProducts;
    return categoryProducts.filter(p => p.tags.includes(activeTag));
  }, [categoryProducts, activeTag]);

  const handleCategoryChange = (catId: string) => {
    if (catId === activeCategory) return;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('category', catId);
    router.push(`/catalog?${newParams.toString()}`, { scroll: false });
    setActiveTag('Все');
  };

  return (
    <div className="min-h-screen bg-hosta-mist text-gray-900 pt-32 pb-20 relative transition-colors duration-500">
      
      {/* Light Clean Gradient Background */}
      <div 
        className="fixed inset-0 bg-gradient-to-b from-white to-hosta-mist pointer-events-none z-0"
      />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* --- ЗАГОЛОВОК --- */}
        <div className="mb-12 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-hosta-dark uppercase tracking-[0.2em] text-xs font-bold mb-4 border border-hosta-dark/10 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm"
          >
            <Leaf size={14} className="text-hosta-green"/>
            Каталог
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4 text-gray-900">
            Выберите <span className="text-hosta-gold italic">Свой Чай</span>
          </h1>
        </div>

        {/* --- 1. КАТЕГОРИИ --- */}
        <div className="mb-12 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2 md:gap-8 min-w-max border-b border-gray-200 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`
                  relative pb-2 text-sm font-bold uppercase tracking-widest transition-all duration-300
                  ${activeCategory === cat.id 
                    ? 'text-hosta-dark'
                    : 'text-gray-400 hover:text-gray-700'}
                `}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.div 
                    layoutId="category-indicator"
                    className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-hosta-dark"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* --- 2. ФИЛЬТРЫ --- */}
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <span className="text-gray-400 mr-2 flex items-center gap-2 text-xs uppercase tracking-widest">
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
                  ? 'bg-hosta-dark text-white border-hosta-dark shadow-md'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-800 shadow-sm'}
              `}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* --- 3. СЕТКА ТОВАРОВ (LIGHT CARDS) --- */}
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
              >
                <Link href={`/catalog/${product.slug}`} className="block h-full">
                  
                  {/* Карточка */}
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden h-full border border-gray-100 flex flex-col">
                    
                    {/* Изображение */}
                    <div className="relative h-[350px] overflow-hidden bg-gray-100">
                      {/* Цена "От" */}
                      <div className="absolute top-4 right-4 z-20">
                        <span className="bg-white/95 backdrop-blur-md text-gray-900 font-bold text-sm px-3 py-1.5 rounded-lg shadow-sm border border-gray-100">
                          от {Math.min(...product.variants.map(v => v.price))} ₽
                        </span>
                      </div>

                      <motion.img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      />

                      {/* Оверлей при наведении (легкий) */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

                      {/* Кнопка просмотра */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 bg-white shadow-lg rounded-full flex items-center justify-center text-hosta-dark hover:text-hosta-gold transform scale-75 group-hover:scale-100 transition-all">
                          <Eye size={22} />
                        </div>
                      </div>
                    </div>

                    {/* Инфо */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-auto">
                        <h3 className="text-xl font-playfair font-bold text-gray-900 mb-2 group-hover:text-hosta-gold transition-colors leading-snug">
                          {product.title}
                        </h3>
                        <p className="text-gray-500 text-xs font-medium mb-3 uppercase tracking-wider">
                          {product.subtitle}
                        </p>
                      </div>

                      {/* Теги */}
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                        {product.tags.slice(0, 3).map(t => (
                          <span key={t} className="text-[10px] font-bold text-hosta-gold/90 uppercase tracking-wider bg-hosta-gold/10 px-2 py-1 rounded-md">
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
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-lg font-playfair">В этой категории пока пусто.</p>
            <p className="text-gray-300 text-sm mt-2">Попробуйте выбрать другую категорию.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-hosta-mist" />}>
      <CatalogContent />
    </Suspense>
  );
}