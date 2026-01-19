'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Filter, Eye, Leaf, Plus, Minus } from 'lucide-react';

// Types matching the transformed Prisma data
type Variant = {
    id: number;
    weight: string;
    price: number;
    packaging: string | null;
    inStock: boolean;
};

type Product = {
    id: string;
    title: string;
    slug: string;
    category: string;
    images: string[];
    variants: Variant[];
};

// Категории для навигации
const categories = [
    { id: 'black', label: 'Черный чай' },
    { id: 'green', label: 'Зеленый чай' },
    { id: 'red', label: 'Красный чай' },
    { id: 'yellow', label: 'Желтый чай' },
    { id: 'gaba', label: 'Габа' },
    { id: 'gifts', label: 'Подарки' },
];

function CatalogContent({ products }: { products: Product[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryParam = searchParams.get('category');
    const activeCategory = (categoryParam && categories.some(c => c.id === categoryParam))
        ? categoryParam
        : 'black';

    const categoryProducts = useMemo(() => {
        return products.filter(p => p.category === activeCategory);
    }, [products, activeCategory]);

    const handleCategoryChange = (catId: string) => {
        if (catId === activeCategory) return;
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('category', catId);
        router.push(`/catalog?${newParams.toString()}`, { scroll: false });
    };

    // Компонент карточки "Выбора Листа" (Catalog Grid)
    const LeafProductCard = ({ product }: { product: Product }) => {
        const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
        const [activeImage, setActiveImage] = useState(product.images[0]);

        // Логика смены фото при клике на фасовку (такая же как в ProductPage)
        const handleVariantClick = (e: React.MouseEvent, v: Variant) => {
            e.preventDefault();
            setSelectedVariant(v);

            const pkg = v.packaging?.toLowerCase() || '';
            if (product.images.length > 1) {
                let targetIndex = -1;
                if (pkg.includes('тубус')) {
                    targetIndex = product.images.findIndex(img => img.toLowerCase().includes('wa0016'));
                } else if (pkg.includes('дерево')) {
                    targetIndex = product.images.findIndex(img => img.toLowerCase().includes('wood') || img.toLowerCase().includes('41-3'));
                }

                if (targetIndex !== -1) {
                    setActiveImage(product.images[targetIndex]);
                } else {
                    setActiveImage(product.images[1] || product.images[0]);
                }
            }
        };

        return (
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col group h-full"
            >
                <Link href={`/catalog/${product.slug}`} className="relative h-64 mb-6 overflow-hidden rounded-xl bg-gray-50 block">
                    <motion.img
                        key={activeImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        src={activeImage}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm text-hosta-dark font-bold text-xs px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                            {selectedVariant.price} ₽
                        </span>
                    </div>
                </Link>

                <div className="flex-grow mb-6 px-1">
                    <h3 className="text-lg font-playfair font-bold text-gray-900 leading-snug mb-2 group-hover:text-hosta-gold transition-colors">
                        {product.title}
                    </h3>

                    {/* ВЫБОР ФАСОВКИ ВНУТРИ КАРТОЧКИ */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {product.variants.map((v, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => handleVariantClick(e, v)}
                                className={`
                  px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-tighter transition-all border
                  ${selectedVariant.id === v.id
                                        ? 'bg-hosta-dark text-white border-hosta-dark'
                                        : 'bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-200'}
                   ${!v.inStock ? 'opacity-50' : ''} 
                `}
                                title={!v.inStock ? 'Нет в наличии' : ''}
                            >
                                {v.weight}{v.packaging ? ` (${v.packaging})` : ''}
                            </button>
                        ))}
                    </div>
                </div>

                <Link
                    href={`/catalog/${product.slug}`}
                    className="w-full bg-hosta-dark text-white h-11 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-hosta-gold hover:text-white transition-all shadow-sm flex items-center justify-center"
                >
                    Подробнее
                </Link>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-hosta-mist text-gray-900 pt-32 pb-20 relative transition-colors duration-500">

            <div className="fixed inset-0 bg-gradient-to-b from-white to-hosta-mist pointer-events-none z-0" />

            <div className="container mx-auto px-4 relative z-10">

                {/* ЗАГОЛОВОК */}
                <div className="mb-14 text-center">
                    <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4 text-gray-900">
                        Краснодарский <span className="text-hosta-gold italic">Ручной Сбор</span>
                    </h1>
                    <div className="h-0.5 w-24 bg-hosta-gold mx-auto mb-6" />
                    <p className="text-gray-400 text-[10px] uppercase tracking-[0.5em] font-bold">Выберите тип чайного листа</p>
                </div>

                {/* ОСНОВНЫЕ КАТЕГОРИИ */}
                <div className="mb-12 overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex justify-center items-center gap-6 md:gap-12 min-w-max border-b border-gray-100 pb-4">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`
                  relative px-2 pb-2 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300
                  ${activeCategory === cat.id ? 'text-hosta-dark' : 'text-gray-300 hover:text-gray-500'}
                `}
                            >
                                {cat.label}
                                {activeCategory === cat.id && (
                                    <motion.div layoutId="cat-underline" className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-hosta-gold" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* СЕТКА (ВЫБОР ПО ЛИСТУ) */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    <AnimatePresence mode='popLayout'>
                        {categoryProducts.map((product) => (
                            <LeafProductCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {categoryProducts.length === 0 && (
                    <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-gray-200">
                        <p className="text-gray-300 font-playfair italic">В этой секции пока нет товаров.</p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default function CatalogClient({ products }: { products: Product[] }) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-hosta-mist" />}>
            <CatalogContent products={products} />
        </Suspense>
    );
}
