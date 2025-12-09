"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Eye, Heart, Leaf } from "lucide-react";

// --- ДАННЫЕ (можно расширять) ---
const PRODUCTS = [
  {
    id: 1,
    name: "Крупнолистовой Чёрный ORGANIC",
    type: "Черный",
    price: 850,
    size: "large" as const,
    image: "/images/tea_black.jpg",
    video:
      "https://videos.pexels.com/video-files/5969566/5969566-hd_1920_1080_25fps.mp4",
    effect: "Бодрит",
    notes: "Какао, сушёная чернослива, лёгкий дым",
  },
  {
    id: 2,
    name: "Императорский Жёлтый (50 г.)",
    type: "Желтый",
    price: 600,
    size: "small" as const,
    image: "/images/tea_yellow.jpg",
    effect: "Расслабляет",
    notes: "Мёд, печёное яблоко, сливочная текстура",
  },
  {
    id: 3,
    name: "Нежный Зеленый ORGANIC",
    type: "Зеленый",
    price: 900,
    size: "medium" as const,
    image: "/images/tea_green.jpg",
    effect: "Медитативный",
    notes: "Весенняя трава, жасмин, лёгкая свежесть",
  },
  {
    id: 4,
    name: "Красный (Тонизирующий) Чай",
    type: "Красный",
    price: 950,
    size: "small" as const,
    image: "/images/tea_red.jpg",
    effect: "Тонизирует",
    notes: "Ягоды, карамель, пряная сладость",
  },
  {
    id: 5,
    name: "Чайное Ассорти PREMIUM",
    type: "Ассорти",
    price: 1500,
    size: "small" as const,
    image: "/images/tea_assorti.jpg",
    effect: "Универсальный",
    notes: "Подборка купажей для разных настроений",
  },
] as const;

const FILTERS = ["Все", "Черный", "Зеленый", "Красный", "Желтый", "Ассорти"] as const;

type Product = (typeof PRODUCTS)[number];

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardClasses =
    product.size === "small"
      ? "col-span-full sm:col-span-1 h-[320px]"
      : product.size === "medium"
      ? "col-span-full sm:col-span-2 lg:col-span-1 h-[360px]"
      : "col-span-full sm:col-span-2 lg:col-span-2 h-[420px]";

  const typeColor =
    product.type === "Черный"
      ? "bg-stone-900 text-amber-50"
      : product.type === "Зеленый"
      ? "bg-jade-light text-jade-dark"
      : product.type === "Красный"
      ? "bg-terracotta text-white"
      : product.type === "Желтый"
      ? "bg-ochre text-stone-900"
      : "bg-stone-200 text-jade-dark";

  const effectColor =
    product.effect === "Бодрит" || product.effect === "Тонизирует"
      ? "text-emerald-900"
      : "text-stone-700";

  return (
    <motion.article
      className={`relative overflow-hidden rounded-2xl shadow-[0_18px_60px_rgba(15,23,42,0.16)] border border-white/70 bg-white/90 backdrop-blur-md group ${cardClasses}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Медиа слой */}
      <Link href={`/product/${product.id}`} className="absolute inset-0">
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover transition-all duration-700 ${
            isHovered ? "scale-105 brightness-105" : "scale-100"
          }`}
        />
        {product.size === "large" && product.video && (
          <video
            autoPlay
            loop
            muted
            playsInline
            src={product.video}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Градиент для читаемости */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-900/10 to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3)_0,_transparent_60%)]" />
      </Link>

      {/* Нижняя панель с информацией */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2 max-w-[75%]">
            <h3 className="font-serif text-lg md:text-xl text-amber-50 drop-shadow-sm">
              {product.name}
            </h3>

            <p className={`text-xs md:text-sm ${effectColor} text-amber-100/90`}>
              {product.effect} вкус · {product.notes}
            </p>

            <div className="inline-flex items-center gap-2">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] ${typeColor}`}
              >
                {product.type} чай
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="font-serif text-2xl md:text-3xl font-semibold text-amber-50 drop-shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
              {product.price} ₽
            </span>
            <span className="text-[11px] text-amber-100/80">
              50 г · 1–2 чая в день
            </span>
          </div>
        </div>
      </div>

      {/* Overlay с действиями */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ pointerEvents: isHovered ? "auto" : "none" }}
      >
        <div className="flex gap-4 bg-stone-950/35 px-4 py-3 rounded-full backdrop-blur-md border border-amber-50/30">
          <motion.button
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-ochre text-stone-900 hover:bg-amber-300 shadow-lg shadow-amber-300/60"
          >
            <ShoppingBag size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-white/95 text-stone-900 hover:bg-amber-50 shadow-lg shadow-stone-900/25"
          >
            <Eye size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-stone-900/90 text-rose-200 hover:bg-stone-900 shadow-lg shadow-rose-300/40"
          >
            <Heart size={20} />
          </motion.button>
        </div>
      </motion.div>
    </motion.article>
  );
};

export default function BentoCatalog() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("Все");

  const filteredProducts =
    activeFilter === "Все"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.type === activeFilter);

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20">
      {/* Атмосферный фон магазина */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-emerald-50/60 to-stone-50" />
        <div className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-amber-100/80 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute inset-x-10 top-24 h-[1px] bg-gradient-to-r from-transparent via-amber-200/80 to-transparent" />
      </div>

      {/* Верхний блок магазина */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 border border-emerald-100 backdrop-blur-md shadow-sm shadow-emerald-100/60">
            <Leaf className="h-4 w-4 text-emerald-700" />
            <span className="text-[11px] uppercase tracking-[0.24em] text-emerald-800">
              Hosta Tea · Онлайн магазин
            </span>
          </div>

          <h2 className="mt-5 font-serif text-3xl md:text-5xl text-emerald-950 tracking-tight">
            Атмосферный магазин высокогорного чая
          </h2>

          <p className="mt-4 text-sm md:text-base text-stone-700 max-w-xl leading-relaxed">
            Каждая позиция в каталоге собрана вручную на склонах Кавказа. 
            Выберите чай под состояние&nbsp− от бодрящего утра до медитативного вечера.
          </p>
        </div>

        <div className="lg:text-right space-y-3">
          <p className="text-xs md:text-sm text-stone-600">
            Заказывайте онлайн, а вкус горного воздуха уже заложен в каждом листе.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-full border border-emerald-700/80 px-5 py-2.5 text-xs md:text-sm font-semibold text-emerald-900 bg-white/80 hover:bg-emerald-50 transition-all"
          >
            Узнать о происхождении чая
          </Link>
        </div>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 font-sans">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all 
              ${
                activeFilter === filter
                  ? "bg-emerald-900 text-amber-50 shadow-md shadow-emerald-500/40"
                  : "bg-white/80 text-stone-700 border border-stone-200 hover:bg-emerald-50/80"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Сетка каталога */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Нижний CTA магазина */}
      <div className="text-center mt-14">
        <p className="text-sm text-stone-600 mb-4">
          В каталоге доступны подробные описания, способы заваривания и наборы для подарков.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-900 px-10 py-4 text-sm md:text-base font-semibold text-amber-50 shadow-xl shadow-emerald-500/40 hover:bg-emerald-800 transition-all"
        >
          Открыть полный каталог из {PRODUCTS.length} позиций
          <ShoppingBag size={18} />
        </Link>
      </div>
    </section>
  );
}
