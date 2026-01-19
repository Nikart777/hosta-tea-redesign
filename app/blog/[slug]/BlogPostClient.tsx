'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, Share2, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Post = {
    id: number;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    image: string;
    date: string;
    category: string;
    keywords: string[];
};

type Product = {
    id: string;
    title: string;
    slug: string;
    teaType: string | null;
    images: string[];
    variants: { price: number }[];
};

export default function BlogPostClient({ post, relatedProducts }: { post: Post, relatedProducts: Product[] }) {

    return (
        <article className="min-h-screen bg-white">
            {/* Cinematic Header */}
            <header className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-hosta-dark">
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8 }}
                    transition={{ duration: 1.5 }}
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-24">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-hosta-gold text-xs font-bold uppercase tracking-widest mb-6 hover:gap-3 transition-all"
                            >
                                <ArrowLeft size={16} />
                                Назад в журнал
                            </Link>

                            <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                                <span className="bg-hosta-gold text-white px-3 py-1 rounded-full">{post.category}</span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    {post.date}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-playfair font-black text-gray-900 leading-[1.1]">
                                {post.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 md:py-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Article Body */}
                    <div className="lg:col-span-8">
                        <div className="prose prose-lg max-w-none break-words prose-headings:font-playfair prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:font-light prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-900">
                            <ReactMarkdown>
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        {/* Tags & Actions */}
                        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
                            <div className="flex flex-wrap gap-2">
                                {post.keywords.map(tag => (
                                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-gray-100 px-3 py-1.5 rounded-lg">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <button className="p-3 rounded-full border border-gray-100 text-gray-400 hover:text-hosta-gold transition-colors">
                                    <Share2 size={20} />
                                </button>
                                <button className="p-3 rounded-full border border-gray-100 text-gray-400 hover:text-hosta-gold transition-colors">
                                    <Bookmark size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Related Products */}
                    <aside className="lg:col-span-4 space-y-12">
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-playfair font-bold text-gray-900 mb-6">Попробуйте наш чай</h3>
                            <div className="space-y-6">
                                {relatedProducts.map(product => (
                                    <Link key={product.id} href={`/catalog/${product.slug}`} className="flex gap-4 group">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white border border-gray-100">
                                            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-hosta-gold transition-colors leading-snug mb-1">
                                                {product.title}
                                            </h4>
                                            <p className="text-xs text-gray-400">{product.teaType}</p>
                                            <p className="text-sm font-bold text-hosta-dark mt-1">{product.variants[0].price} ₽</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <Link
                                href="/catalog"
                                className="block w-full text-center mt-8 py-4 bg-hosta-dark text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-hosta-gold transition-all"
                            >
                                Перейти в каталог
                            </Link>
                        </div>

                        {/* Newsletter Mini */}
                        <div className="bg-hosta-dark p-8 rounded-3xl text-white sticky top-[600px]">
                            <h3 className="text-xl font-playfair font-bold mb-4 italic">Культура чая в вашей почте</h3>
                            <p className="text-sm text-white/60 mb-6 font-light">Подпишитесь на уведомления о новых урожаях и закрытых дегустациях.</p>
                            <input
                                type="email"
                                placeholder="Ваш e-mail"
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:border-hosta-gold"
                            />
                            <button className="w-full py-3 bg-hosta-gold text-white rounded-xl text-[10px] font-bold uppercase tracking-widest">
                                Подписаться
                            </button>
                        </div>
                    </aside>

                </div>
            </div>
        </article>
    );
}
