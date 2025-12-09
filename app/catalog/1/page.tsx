'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Thermometer, 
  Clock, 
  Droplets, 
  Wind, 
  Star,
  Leaf // Добавил недостающий импорт
} from 'lucide-react';

// --- MOCK DATA (Имитация данных товара) ---
// В реальности мы бы получали это по params.id
const product = {
  id: '1',
  title: 'Хоста Классик',
  subtitle: 'Черный чай ручного сбора',
  price: 550,
  weight: '50 г',
  description: 'Классический краснодарский чай с глубоким, насыщенным вкусом. В аромате отчетливо слышны ноты сухофруктов, меда и легкая дымка. Идеален для тех, кто ценит традиции и крепкий, бодрящий настой.',
  harvest: 'Май 2024',
  place: 'с. Калиновое Озеро, Сочи (500м над уровнем моря)',
  images: [
    'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=2574&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1565223011340-77a80b07e719?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=2574&auto=format&fit=crop'
  ],
  characteristics: [
    { name: 'Терпкость', value: 80 },
    { name: 'Сладость', value: 40 },
    { name: 'Аромат', value: 70 },
    { name: 'Послевкусие', value: 60 },
  ],
  brewing: {
    temp: '95°C',
    time: '3-5 мин',
    amount: '5-7 г',
    volume: '500 мл'
  }
};

// Компонент для диаграммы вкуса
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

export default function ProductPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { scrollY } = useScroll();
  
  // Параллакс эффект для изображения
  const yImage = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <div className="min-h-screen bg-hosta-dark text-white pt-24 pb-20">
      
      {/* Фоновая атмосфера */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-950/20 to-hosta-dark pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none z-0" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Хлебные крошки / Навигация */}
        <div className="mb-8">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-white/40 hover:text-hosta-gold transition-colors text-sm uppercase tracking-widest">
            <ArrowLeft size={16} />
            Назад в каталог
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- ЛЕВАЯ КОЛОНКА: Галерея (Sticky) --- */}
          <div className="lg:col-span-7 relative">
            <motion.div 
              style={{ y: yImage }}
              className="sticky top-32"
            >
              {/* Главное фото */}
              <div className="relative h-[50vh] lg:h-[70vh] w-full rounded-sm overflow-hidden mb-4 bg-white/5 border border-white/5">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  src={product.images[activeImage]} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Бейджик "Органик" */}
                <div className="absolute top-6 left-6 z-20">
                   <div className="w-16 h-16 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center text-[10px] uppercase font-bold tracking-widest text-white text-center leading-none p-1 rotate-[-15deg]">
                     100%<br/>Organic
                   </div>
                </div>
              </div>

              {/* Миниатюры */}
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 h-24 flex-shrink-0 rounded-sm overflow-hidden border transition-all ${activeImage === idx ? 'border-hosta-gold opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* --- ПРАВАЯ КОЛОНКА: Информация --- */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Заголовок и Цена */}
              <div className="border-b border-white/10 pb-8 mb-8">
                <span className="text-hosta-gold text-xs uppercase tracking-[0.2em] font-bold block mb-2">
                  {product.subtitle}
                </span>
                <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 leading-tight">
                  {product.title}
                </h1>
                <div className="flex items-end gap-4">
                   <span className="text-3xl font-bold text-white">{product.price} ₽</span>
                   <span className="text-white/40 mb-1 text-sm">{product.weight}</span>
                </div>
              </div>

              {/* Описание */}
              <p className="text-gray-300 font-light leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Характеристики (Диаграмма вкуса) */}
              <div className="bg-white/5 rounded-sm p-6 mb-8 border border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                  <Star size={16} className="text-hosta-gold" />
                  Профиль вкуса
                </h3>
                {product.characteristics.map((char, idx) => (
                  <TasteBar key={char.name} label={char.name} value={char.value} delay={idx * 0.1} />
                ))}
              </div>

              {/* Инструкция по завариванию */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-white/5 p-4 rounded-sm border border-white/5 text-center group hover:border-hosta-gold/30 transition-colors">
                  <Thermometer className="mx-auto mb-2 text-hosta-gold" size={20} />
                  <div className="text-xs text-white/40 uppercase mb-1">Температура</div>
                  <div className="font-bold">{product.brewing.temp}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-sm border border-white/5 text-center group hover:border-hosta-gold/30 transition-colors">
                  <Clock className="mx-auto mb-2 text-hosta-gold" size={20} />
                  <div className="text-xs text-white/40 uppercase mb-1">Время</div>
                  <div className="font-bold">{product.brewing.time}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-sm border border-white/5 text-center group hover:border-hosta-gold/30 transition-colors">
                  <Leaf className="mx-auto mb-2 text-hosta-gold" size={20} />
                  <div className="text-xs text-white/40 uppercase mb-1">Количество</div>
                  <div className="font-bold">{product.brewing.amount}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-sm border border-white/5 text-center group hover:border-hosta-gold/30 transition-colors">
                  <Droplets className="mx-auto mb-2 text-hosta-gold" size={20} />
                  <div className="text-xs text-white/40 uppercase mb-1">Объем</div>
                  <div className="font-bold">{product.brewing.volume}</div>
                </div>
              </div>

              {/* Инфо о сборе */}
              <div className="flex items-start gap-3 text-xs text-white/40 mb-8 font-mono border-l-2 border-hosta-gold/30 pl-4">
                <div>
                   <p>Сбор: {product.harvest}</p>
                   <p>{product.place}</p>
                </div>
              </div>

              {/* Кнопки действий (Sticky bottom on mobile?) */}
              <div className="flex gap-4 items-center">
                {/* Счетчик */}
                <div className="flex items-center border border-white/20 rounded-sm h-14 px-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Купить */}
                <button className="flex-1 bg-hosta-gold text-hosta-dark h-14 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(207,161,86,0.3)] flex items-center justify-center gap-3">
                  <span>В корзину</span>
                  <span className="w-1 h-1 bg-hosta-dark rounded-full" />
                  <span>{product.price * quantity} ₽</span>
                </button>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}