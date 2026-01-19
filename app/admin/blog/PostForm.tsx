'use client';

import { createPost, updatePost } from './actions';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

type Post = {
    id?: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    image: string;
    date: string;
    category: string;
    keywords: string; // JSON string in DB, but we parse it or keep as string for input?
    // In DB it is string. In form we treat as comma-separated string for simplicity
};

export default function PostForm({ post }: { post?: Post }) {
    // Parse keywords from JSON string if existing
    const initialKeywords = post?.keywords
        ? (Array.isArray(JSON.parse(post.keywords)) ? JSON.parse(post.keywords).join(', ') : post.keywords)
        : '';

    const handleSubmit = async (formData: FormData) => {
        if (post?.id) {
            await updatePost(post.id, formData);
        } else {
            await createPost(formData);
        }
    };

    return (
        <form action={handleSubmit} className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/blog" className="p-2 rounded hover:bg-gray-200">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold font-playfair">
                    {post ? 'Редактировать статью' : 'Новая статья'}
                </h1>
                <button
                    type="submit"
                    className="ml-auto bg-hosta-gold text-hosta-dark px-6 py-2 rounded font-bold flex items-center gap-2 hover:bg-white hover:shadow transition-all"
                >
                    <Save size={20} />
                    Сохранить
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500">Заголовок</label>
                        <input
                            name="title"
                            defaultValue={post?.title}
                            required
                            className="w-full text-2xl font-bold bg-transparent border-b border-gray-200 focus:border-hosta-gold outline-none py-2"
                            placeholder="Введите заголовок..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500">Содержание (Markdown)</label>
                        <textarea
                            name="content"
                            defaultValue={post?.content}
                            required
                            rows={20}
                            className="w-full bg-white p-4 rounded border border-gray-200 focus:border-hosta-gold outline-none font-mono text-sm leading-relaxed"
                            placeholder="# Заголовок..."
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded border border-gray-100 shadow-sm space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500">Slug (URL)</label>
                            <input
                                name="slug"
                                defaultValue={post?.slug}
                                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm"
                                placeholder="auto-generated"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500">Категория</label>
                            <input
                                name="category"
                                defaultValue={post?.category}
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500">Дата</label>
                            <input
                                name="date"
                                defaultValue={post?.date}
                                placeholder="15 Янв 2026"
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500">URL Изображения</label>
                            <input
                                name="image"
                                defaultValue={post?.image}
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500">Краткое описание</label>
                            <textarea
                                name="excerpt"
                                defaultValue={post?.excerpt}
                                rows={4}
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500">Ключевые слова (через запятую)</label>
                            <input
                                name="keywords"
                                defaultValue={initialKeywords}
                                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm"
                                placeholder="чай, здоровье, польза..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
