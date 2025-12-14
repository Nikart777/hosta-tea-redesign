'use client';

import { useState, useEffect, use } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { products, ProductVariant } from '@/data/products';
import { 
  ArrowLeft, Minus, Plus, Thermometer, Clock, 
  Droplets, Leaf, Star
} from 'lucide-react';

// Полоска вкуса (Light Mode)
const TasteBar = ({ label, value, delay }: { label: string, value: number, delay: number }) => (
  <div className="mb-4 last:mb-0">
    <div className="flex justify-between text-xs uppercase tracking-widest text-gray-500 mb-1 font-semibold">
      <span>{label}</span>
      <span>{value}/100</span>
    </div>
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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
    if (!product) return notFound();
    return null; 
  }

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedVariant.weight}`,
      title: product.title,
      subtitle: `${product.subtitle} (${selectedVariant.weight})`,
      price: selectedVariant.price,
      image: product.images[0],
      quantity: quantity
    });
  };

  return (
    <div className="min-h-screen bg-hosta-mist text-gray-900 pt-32 pb-20 overflow-hidden relative">
      
      {/* Light Clean Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-white via-hosta-mist to-gray-100 pointer-events-none z-0" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Навигация */}
        <div className="mb-8">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-gray-400 hover:text-hosta-dark transition-colors text-sm uppercase tracking-widest font-bold group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            В каталог
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- ГАЛЕРЕЯ (Слева) --- */}
          <div className="lg:col-span-7 relative">
            <motion.div style={{ y: yImage }} className="sticky top-32">
              <div className="relative h-[50vh] lg:h-[70vh] w-full rounded-2xl overflow-hidden mb-6 bg-white shadow-sm border border-gray-100 group">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={product.images[activeImage]} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />

                {/* Badge */}
                <div className="absolute top-6 left-6 z-20">
                   <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md border border-gray-100 shadow-md flex items-center justify-center text-[10px] uppercase font-bold tracking-widest text-hosta-dark text-center leading-none p-1 rotate-[-15deg]">
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
                      className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all shadow-sm ${activeImage === idx ? 'border-hosta-gold opacity-100 ring-2 ring-hosta-gold/20' : 'border-white opacity-70 hover:opacity-100 hover:border-gray-300'}`}
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
              <div className="border-b border-gray-200 pb-6 mb-8">
                <span className="text-hosta-gold text-xs uppercase tracking-[0.2em] font-bold block mb-3">
                  {product.subtitle}
                </span>
                <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 leading-tight text-gray-900">
                  {product.title}
                </h1>
                
                {/* Динамическая цена */}
                <div className="flex items-end gap-3 mt-4">
                   <span className="text-4xl font-bold text-hosta-dark">{selectedVariant.price} ₽</span>
                   <span className="text-gray-400 mb-2 text-sm font-medium">/ {selectedVariant.weight}</span>
                </div>
              </div>

              {/* --- ВАЖНЫЕ ХАРАКТЕРИСТИКИ --- */}
              <div className="grid grid-cols-1 gap-2 mb-8 text-sm text-gray-600 font-medium pl-4 border-l-2 border-hosta-gold">
                <div><span className="text-gray-400 uppercase tracking-wider text-xs mr-2 font-bold">Тип:</span> {product.teaType}</div>
                <div><span className="text-gray-400 uppercase tracking-wider text-xs mr-2 font-bold">Вид чая:</span> {product.teaKind}</div>
                <div><span className="text-gray-400 uppercase tracking-wider text-xs mr-2 font-bold">Категория:</span> {product.teaGrade}</div>
              </div>

              {/* Описание */}
              <p className="text-gray-600 leading-relaxed mb-10 text-lg font-light">
                {product.description}
              </p>

              {/* --- ВЫБОР ВЕСА / УПАКОВКИ --- */}
              <div className="mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4 block">Выберите фасовку:</span>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setSelectedVariant(v); setQuantity(1); }}
                      className={`
                        px-6 py-3 rounded-lg border transition-all flex flex-col items-center min-w-[100px] shadow-sm
                        ${selectedVariant === v 
                          ? 'bg-hosta-dark text-white border-hosta-dark shadow-lg scale-105'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900 hover:shadow-md'}
                      `}
                    >
                      <span className="font-bold text-sm">{v.weight}</span>
                      {v.packaging && <span className="text-[10px] uppercase opacity-80 mt-1">{v.packaging}</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Профиль вкуса (White Card) */}
              {product.characteristics.length > 0 && (
                <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-gray-100">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-2">
                    <Star size={16} className="text-hosta-gold fill-hosta-gold" />
                    Профиль вкуса
                  </h3>
                  {product.characteristics.map((char, idx) => (
                    <TasteBar key={char.name} label={char.name} value={char.value} delay={idx * 0.1} />
                  ))}
                </div>
              )}

              {/* Инструкция (Bento style Light) */}
              <div className="grid grid-cols-2 gap-4 mb-24 lg:mb-10">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                  <div className="text-hosta-green mb-2"><Thermometer size={20} className="mx-auto"/></div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Температура</div>
                  <div className="font-bold text-gray-900">{product.brewing.temp}</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                  <div className="text-hosta-green mb-2"><Clock size={20} className="mx-auto"/></div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Время</div>
                  <div className="font-bold text-gray-900">{product.brewing.time}</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                  <div className="text-hosta-green mb-2"><Leaf size={20} className="mx-auto"/></div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Кол-во</div>
                  <div className="font-bold text-gray-900">{product.brewing.amount}</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                  <div className="text-hosta-green mb-2"><Droplets size={20} className="mx-auto"/></div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Вода</div>
                  <div className="font-bold text-gray-900">{product.brewing.volume}</div>
                </div>
              </div>

              {/* Кнопки покупки (Sticky on Mobile, Static on Desktop) */}
              <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] lg:static lg:bg-transparent lg:p-0 lg:border-0 lg:shadow-none z-30">
                <div className="flex gap-4 items-center max-w-lg mx-auto lg:mx-0">

                  {/* Счетчик */}
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg h-14 px-2">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-hosta-dark transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-10 text-center font-bold text-lg text-gray-900">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-hosta-dark transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* Кнопка купить */}
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-hosta-dark text-white h-14 rounded-lg font-bold uppercase tracking-widest hover:bg-hosta-green transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    <span>В корзину</span>
                    <span className="w-1 h-1 bg-white/30 rounded-full" />
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