'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import {
    ArrowLeft, Minus, Plus, Thermometer, Clock,
    Droplets, Leaf, Star
} from 'lucide-react';

// Types from DB
type Variant = {
    id: number;
    weight: string;
    price: number;
    packaging: string | null;
    inStock: boolean;
};

type Product = {
    id: string;
    slug: string;
    title: string;
    subtitle: string | null;
    description: string;
    teaType: string | null;
    teaGrade: string | null;
    images: string[];
    variants: Variant[];
    brewing: { temp: string; time: string; amount: string; volume: string };
    characteristics: { name: string; value: number }[];
};

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

export default function ProductPageClient({ product }: { product: Product }) {
    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

    useEffect(() => {
        if (product && product.variants.length > 0) {
            setSelectedVariant(product.variants[0]);
        }
    }, [product]);

    // Улучшенная логика смены фото при выборе варианта упаковки
    useEffect(() => {
        if (selectedVariant && product && product.images.length > 1) {
            const pkg = selectedVariant.packaging?.toLowerCase() || '';

            // 1. Пытаемся найти специфическое совпадение в названии файла
            let targetIndex = -1;

            if (pkg.includes('тубус')) {
                targetIndex = product.images.findIndex(img => img.toLowerCase().includes('wa0016'));
            } else if (pkg.includes('дерево')) {
                targetIndex = product.images.findIndex(img => img.toLowerCase().includes('wood') || img.toLowerCase().includes('41-3'));
            }

            // 2. Если специфическое не найдено или это другой тип (Крафт, Пакет), 
            // переключаемся на ПЕРВОЕ ФОТО УПАКОВКИ (обычно индекс 1), если сейчас выбрана плошка (индекс 0)
            if (targetIndex !== -1) {
                setActiveImage(targetIndex);
            } else {
                // По умолчанию для любой фасовки показываем фото в упаковке (индекс 1)
                // Но если картинок всего 2, то вариантов нет - всегда 1.
                if (product.images.length >= 2) {
                    // Если выбран "Пакет" или "Крафт" и у нас есть хотя бы 2 фото
                    setActiveImage(1);
                }
            }
        }
    }, [selectedVariant, product]);

    const { addToCart } = useCart();

    if (!product || !selectedVariant) {
        return null;
    }

    const handleAddToCart = () => {
        addToCart({
            id: `${product.id}-${selectedVariant.weight}`,
            title: product.title,
            subtitle: `${product.subtitle || ''} (${selectedVariant.weight})`,
            price: selectedVariant.price,
            image: product.images[activeImage] || product.images[0],
            quantity: quantity
        });
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 pt-24 pb-12 overflow-hidden relative">
            <div className="container mx-auto px-4 relative z-10 max-w-6xl">

                {/* Навигация */}
                <div className="mb-6">
                    <Link href="/catalog" className="inline-flex items-center gap-2 text-gray-400 hover:text-hosta-dark transition-colors text-xs uppercase tracking-widest font-bold group">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        К выбору листа
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                    {/* --- ГАЛЕРЕЯ (Компактная) --- */}
                    <div className="relative">
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
                            <motion.img
                                key={activeImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                src={product.images[activeImage]}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Миниатюры */}
                        {product.images.length > 1 && (
                            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-hosta-gold opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* --- ИНФОРМАЦИЯ (Bento-style Compact) --- */}
                    <div className="flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div>
                                <span className="text-hosta-gold text-[10px] uppercase tracking-[0.3em] font-bold block mb-2">
                                    {product.subtitle}
                                </span>
                                <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-2 leading-tight text-gray-900">
                                    {product.title}
                                </h1>
                                <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
                                    {product.teaType} • {product.teaGrade}
                                </p>
                            </div>

                            {/* Описание (Компактно) */}
                            <p className="text-gray-500 leading-relaxed text-sm font-light line-clamp-3 hover:line-clamp-none transition-all cursor-default">
                                {product.description}
                            </p>

                            {/* --- ВЫБОР ФАСОВКИ + ЦЕНА --- */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 block">Выберите вес и упаковку:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {product.variants.map((v, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => { setSelectedVariant(v); setQuantity(1); }}
                                                disabled={!v.inStock}
                                                className={`
                          px-4 py-2 rounded-lg border text-xs font-bold transition-all
                          ${selectedVariant?.id === v.id
                                                        ? 'bg-hosta-dark text-white border-hosta-dark shadow-md'
                                                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}
                          ${!v.inStock ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                                            >
                                                {v.weight}{v.packaging ? ` (${v.packaging})` : ''}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div className="flex items-end gap-1">
                                        <span className="text-3xl font-bold text-hosta-dark">{selectedVariant.price * quantity} ₽</span>
                                        {quantity > 1 && <span className="text-gray-400 text-[10px] mb-1.5 font-bold uppercase">({selectedVariant.price} ₽ шт.)</span>}
                                    </div>

                                    <div className="flex items-center bg-white border border-gray-200 rounded-lg h-10 px-1">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-hosta-dark"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-8 text-center font-bold text-sm text-gray-900">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-hosta-dark"
                                            disabled={!selectedVariant?.inStock}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={!selectedVariant?.inStock}
                                    className="w-full bg-hosta-dark text-white h-12 rounded-xl font-bold uppercase tracking-widest hover:bg-hosta-gold transition-all shadow-sm flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {selectedVariant?.inStock ? 'В корзину' : 'Нет в наличии'}
                                </button>
                            </div>

                            {/* Характеристики (Шкалы) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-900 mb-4 flex items-center gap-2">
                                        <Star size={12} className="text-hosta-gold fill-hosta-gold" />
                                        Профиль вкуса
                                    </h3>
                                    <div className="space-y-4">
                                        {product.characteristics.map((char, idx) => (
                                            <TasteBar key={char.name} label={char.name} value={char.value} delay={idx * 0.1} />
                                        ))}
                                    </div>
                                </div>

                                {/* Инструкция */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 text-center">
                                        <Thermometer size={14} className="mx-auto text-hosta-gold mb-1" />
                                        <div className="text-[8px] text-gray-400 uppercase font-black tracking-tighter">{product.brewing.temp}</div>
                                    </div>
                                    <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 text-center">
                                        <Clock size={14} className="mx-auto text-hosta-gold mb-1" />
                                        <div className="text-[8px] text-gray-400 uppercase font-black tracking-tighter">{product.brewing.time}</div>
                                    </div>
                                    <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 text-center">
                                        <Leaf size={14} className="mx-auto text-hosta-gold mb-1" />
                                        <div className="text-[8px] text-gray-400 uppercase font-black tracking-tighter">{product.brewing.amount}</div>
                                    </div>
                                    <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 text-center">
                                        <Droplets size={14} className="mx-auto text-hosta-gold mb-1" />
                                        <div className="text-[8px] text-gray-400 uppercase font-black tracking-tighter">{product.brewing.volume}</div>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}
