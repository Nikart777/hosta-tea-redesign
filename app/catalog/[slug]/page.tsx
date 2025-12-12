'use client';

import { useState, useEffect, use } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { products, ProductVariant } from '@/data/products';
import { 
  ArrowLeft, Minus, Plus, Thermometer, Clock, 
  Droplets, Leaf, Star, Check 
} from 'lucide-react';

// Полоска вкуса
const TasteBar = ({ label, value, delay }: { label: string, value: number, delay: number }) => (
  <div className="mb-4">
    <div className="flex justify-between text-xs uppercase tracking-widest text-white/60 mb-1">
      <span>{label}</span>
      <span>{value}/100</span>
    </div>
    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        transition={{ duration: 1, delay }}
        className="h-full bg-hosta-gold rounded-full"
      />
    </div>
  </div>
);

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Разворачиваем параметры (Next.js 15+)
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const product = products.find(p => p.slug === slug);

  // Стейты
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  
  // Устанавливаем вариант по умолчанию при загрузке
  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // Скролл эффекты
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 200]);
  
  const { addToCart } = useCart();

  if (!product || !selectedVariant) {
    // В реальном приложении здесь лучше возвращать заглушку, пока useEffect не отработает
    if (!product) return notFound();
    return null; 
  }

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedVariant.weight}`, // Уникальный ID для корзины (товар + вес)
      title: product.title,
      subtitle: `${product.subtitle} (${selectedVariant.weight})`,
      price: selectedVariant.price,
      image: product.images[0],
      quantity: quantity
    });
  };

  return (
    <div className="min-h-screen bg-hosta-dark text-white pt-24 pb-20 overflow-hidden">
      
      {/* Фоновая атмосфера */}
      <div className={`fixed inset-0 bg-gradient-to-br ${product.moodColor} to-hosta-dark pointer-events-none z-0 transition-colors duration-1000`} />
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none z-0" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Навигация */}
        <div className="mb-8">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-white/40 hover:text-hosta-gold transition-colors text-sm uppercase tracking-widest font-bold">
            <ArrowLeft size={16} />
            В каталог
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- ГАЛЕРЕЯ (Слева) --- */}
          <div className="lg:col-span-7 relative">
            <motion.div style={{ y: yImage }} className="sticky top-32">
              <div className="relative h-[50vh] lg:h-[70vh] w-full rounded-sm overflow-hidden mb-4 bg-white/5 border border-white/5 group">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={product.images[activeImage]} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 z-20">
                   <div className="w-16 h-16 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center text-[10px] uppercase font-bold tracking-widest text-white text-center leading-none p-1 rotate-[-15deg]">
                     100%<br/>Natural
                   </div>
                </div>
              </div>

              {/* Миниатюры */}
              {product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden border transition-all ${activeImage === idx ? 'border-hosta-gold opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* --- ИНФОРМАЦИЯ (Справа) --- */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Заголовок */}
              <div className="border-b border-white/10 pb-6 mb-6">
                <span className="text-hosta-gold text-xs uppercase tracking-[0.2em] font-bold block mb-2">
                  {product.subtitle}
                </span>
                <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 leading-tight">
                  {product.title}
                </h1>
                
                {/* Динамическая цена */}
                <div className="flex items-end gap-4">
                   <span className="text-4xl font-bold text-white">{selectedVariant.price} ₽</span>
                   <span className="text-white/40 mb-2 text-sm">/ {selectedVariant.weight}</span>
                </div>
              </div>

              {/* --- ВАЖНЫЕ ХАРАКТЕРИСТИКИ (Новый блок) --- */}
              <div className="grid grid-cols-1 gap-2 mb-8 text-sm text-white/80 font-light border-l-2 border-hosta-gold pl-4 py-1">
                <div><span className="text-white/40 uppercase tracking-wider text-xs mr-2">Тип:</span> {product.teaType}</div>
                <div><span className="text-white/40 uppercase tracking-wider text-xs mr-2">Вид чая:</span> {product.teaKind}</div>
                <div><span className="text-white/40 uppercase tracking-wider text-xs mr-2">Категория:</span> {product.teaGrade}</div>
              </div>

              {/* Описание */}
              <p className="text-gray-300 font-light leading-relaxed mb-8">
                {product.description}
              </p>

              {/* --- ВЫБОР ВЕСА / УПАКОВКИ --- */}
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-white mb-3 block">Выберите фасовку:</span>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setSelectedVariant(v); setQuantity(1); }}
                      className={`
                        px-4 py-3 rounded-sm border transition-all flex flex-col items-center min-w-[80px]
                        ${selectedVariant === v 
                          ? 'bg-hosta-gold text-hosta-dark border-hosta-gold shadow-[0_0_15px_rgba(207,161,86,0.3)]' 
                          : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'}
                      `}
                    >
                      <span className="font-bold text-sm">{v.weight}</span>
                      {v.packaging && <span className="text-[10px] uppercase opacity-70">{v.packaging}</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Профиль вкуса */}
              {product.characteristics.length > 0 && (
                <div className="bg-white/5 rounded-sm p-6 mb-8 border border-white/5">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                    <Star size={16} className="text-hosta-gold" />
                    Профиль вкуса
                  </h3>
                  {product.characteristics.map((char, idx) => (
                    <TasteBar key={char.name} label={char.name} value={char.value} delay={idx * 0.1} />
                  ))}
                </div>
              )}

              {/* Инструкция (Bento style) */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                <div className="bg-white/5 p-3 rounded-sm border border-white/5 text-center">
                  <div className="text-hosta-gold mb-1"><Thermometer size={18} className="mx-auto"/></div>
                  <div className="text-[10px] text-white/40 uppercase">Температура</div>
                  <div className="font-bold text-sm">{product.brewing.temp}</div>
                </div>
                <div className="bg-white/5 p-3 rounded-sm border border-white/5 text-center">
                  <div className="text-hosta-gold mb-1"><Clock size={18} className="mx-auto"/></div>
                  <div className="text-[10px] text-white/40 uppercase">Время</div>
                  <div className="font-bold text-sm">{product.brewing.time}</div>
                </div>
                <div className="bg-white/5 p-3 rounded-sm border border-white/5 text-center">
                  <div className="text-hosta-gold mb-1"><Leaf size={18} className="mx-auto"/></div>
                  <div className="text-[10px] text-white/40 uppercase">Кол-во</div>
                  <div className="font-bold text-sm">{product.brewing.amount}</div>
                </div>
                <div className="bg-white/5 p-3 rounded-sm border border-white/5 text-center">
                  <div className="text-hosta-gold mb-1"><Droplets size={18} className="mx-auto"/></div>
                  <div className="text-[10px] text-white/40 uppercase">Вода</div>
                  <div className="font-bold text-sm">{product.brewing.volume}</div>
                </div>
              </div>

              {/* Кнопки покупки */}
              <div className="fixed bottom-0 left-0 right-0 bg-[#0a120a] p-4 border-t border-white/10 lg:static lg:bg-transparent lg:p-0 lg:border-0 z-30">
                <div className="flex gap-4 items-center max-w-lg mx-auto lg:mx-0">
                  <div className="flex items-center border border-white/20 rounded-sm h-14 px-2">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-full flex items-center justify-center text-white/60 hover:text-white"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-full flex items-center justify-center text-white/60 hover:text-white"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-hosta-gold text-hosta-dark h-14 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(207,161,86,0.3)] flex items-center justify-center gap-3"
                  >
                    <span>В корзину</span>
                    <span className="w-1 h-1 bg-hosta-dark rounded-full" />
                    <span>{selectedVariant.price * quantity} ₽</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}