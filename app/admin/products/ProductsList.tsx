'use client';

import { useState } from 'react';
import {
    Check, X, ChevronDown, ChevronUp, Package, Edit2
} from 'lucide-react';
import { updateProductTitle, updateVariantPrice, toggleVariantStock } from './actions';

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
    variants: Variant[];
};

export function ProductsList({ initialProducts }: { initialProducts: Product[] }) {
    const [products, setProducts] = useState(initialProducts);
    const [expanded, setExpanded] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpanded(expanded === id ? null : id);
    };

    const handleTitleChange = async (id: string, newTitle: string) => {
        const original = products.find(p => p.id === id)?.title;
        setProducts(products.map(p => p.id === id ? { ...p, title: newTitle } : p));

        // Debounce or just wait for blur? Ideally blur.
        // For simplicity here we assume this is called onBlur or Enter.
        const result = await updateProductTitle(id, newTitle);
        if (!result.success && original) {
            setProducts(products.map(p => p.id === id ? { ...p, title: original } : p));
            alert('Error updating title');
        }
    };

    const handlePriceChange = async (productId: string, variantId: number, newPrice: number) => {
        setProducts(products.map(p => p.id === productId ? {
            ...p,
            variants: p.variants.map(v => v.id === variantId ? { ...v, price: newPrice } : v)
        } : p));

        await updateVariantPrice(variantId, newPrice);
    };

    const handleStockToggle = async (productId: string, variantId: number, currentStock: boolean) => {
        const newStock = !currentStock;
        setProducts(products.map(p => p.id === productId ? {
            ...p,
            variants: p.variants.map(v => v.id === variantId ? { ...v, inStock: newStock } : v)
        } : p));

        await toggleVariantStock(variantId, newStock);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
                {products.map((product) => (
                    <div key={product.id} className="group">
                        {/* Product Header Row */}
                        <div className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                            <button
                                onClick={() => toggleExpand(product.id)}
                                className="p-1 rounded hover:bg-black/5 text-gray-400"
                            >
                                {expanded === product.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            <div className="flex-1">
                                <input
                                    type="text"
                                    defaultValue={product.title}
                                    onBlur={(e) => handleTitleChange(product.id, e.target.value)}
                                    className="w-full bg-transparent border-none p-0 font-medium text-gray-900 focus:ring-0"
                                />
                            </div>

                            <div className="text-sm text-gray-400">
                                {product.variants.length} вариантов(а)
                            </div>
                        </div>

                        {/* Variants Expansion */}
                        {expanded === product.id && (
                            <div className="bg-gray-50/50 p-4 border-t border-gray-100 pl-12">
                                <div className="space-y-2">
                                    {product.variants.map(variant => (
                                        <div key={variant.id} className="flex items-center gap-4 bg-white p-2 rounded border border-gray-100 shadow-sm">
                                            <div className="w-24 text-sm font-bold text-gray-500">{variant.weight}</div>
                                            <div className="w-24 text-sm text-gray-400">{variant.packaging}</div>

                                            <div className="flex-1 flex items-center gap-2">
                                                <span className="text-sm text-gray-400">₽</span>
                                                <input
                                                    type="number"
                                                    defaultValue={variant.price}
                                                    onBlur={(e) => handlePriceChange(product.id, variant.id, parseInt(e.target.value))}
                                                    className="w-24 p-1 text-sm border border-gray-200 rounded text-right"
                                                />
                                            </div>

                                            <button
                                                onClick={() => handleStockToggle(product.id, variant.id, variant.inStock)}
                                                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${variant.inStock
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    }`}
                                            >
                                                {variant.inStock ? 'В наличии' : 'Нет в наличии'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
