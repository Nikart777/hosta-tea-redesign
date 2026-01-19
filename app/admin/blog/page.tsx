import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { DeletePostButton } from './DeletePostButton';

const prisma = new PrismaClient();

export default async function AdminBlogPage() {
    const posts = await prisma.post.findMany({
        orderBy: { id: 'desc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-playfair font-bold text-hosta-dark">Управление блогом</h2>
                <Link
                    href="/admin/blog/new"
                    className="bg-hosta-gold text-hosta-dark px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-white hover:shadow-md transition-all"
                >
                    <Plus size={20} />
                    Новая статья
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                        <div className="h-48 overflow-hidden relative">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <Link
                                    href={`/admin/blog/${post.id}`}
                                    className="p-2 bg-white/90 rounded-full hover:text-hosta-gold transition-colors"
                                >
                                    <Edit2 size={16} />
                                </Link>
                                <DeletePostButton id={post.id} />
                            </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <div className="text-xs text-hosta-gold font-bold uppercase tracking-wider mb-2">
                                {post.category}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                                {post.title}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
                                {post.excerpt}
                            </p>
                            <div className="text-xs text-gray-400 border-t border-gray-100 pt-3">
                                {post.date}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
