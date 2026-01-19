'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function createPost(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const category = formData.get('category') as string;
    const date = formData.get('date') as string;
    const image = formData.get('image') as string;
    const keywordsStr = formData.get('keywords') as string;

    // Simple slug generation
    const slug = title.toLowerCase()
        .replace(/[^a-z0-9а-я\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    // Transliteration helper could be better, but simple is ok for MVP or let user edit slug
    // Ideally we let user edit slug. For now auto-generate is risky for Cyrillic.
    // Let's assume user provides slug or we use ID-based.
    // Actually, the seed data has English slugs. 
    // We'll generate a random suffix if needed or just use what we have.
    // Better: add a slug field to UI.

    const finalSlug = (formData.get('slug') as string) || slug + '-' + Date.now();
    const keywords = JSON.stringify(keywordsStr.split(',').map(k => k.trim()));

    await prisma.post.create({
        data: {
            title,
            slug: finalSlug,
            content,
            excerpt,
            category,
            date,
            image,
            keywords
        }
    });

    revalidatePath('/admin/blog');
    redirect('/admin/blog');
}

export async function updatePost(id: number, formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const category = formData.get('category') as string;
    const date = formData.get('date') as string;
    const image = formData.get('image') as string;
    const keywordsStr = formData.get('keywords') as string;

    const keywords = JSON.stringify(keywordsStr.split(',').map(k => k.trim()));

    await prisma.post.update({
        where: { id },
        data: {
            title,
            slug,
            content,
            excerpt,
            category,
            date,
            image,
            keywords
        }
    });

    revalidatePath('/admin/blog');
    redirect('/admin/blog');
}

export async function deletePost(id: number) {
    await prisma.post.delete({ where: { id } });
    revalidatePath('/admin/blog');
}
