'use client';

import { Trash2 } from 'lucide-react';
import { deletePost } from './actions';

export function DeletePostButton({ id }: { id: number }) {
    const handleDelete = async () => {
        if (confirm('Вы уверены, что хотите удалить эту статью?')) {
            await deletePost(id);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="p-2 bg-white/90 rounded-full hover:text-red-500 transition-colors"
        >
            <Trash2 size={16} />
        </button>
    );
}
