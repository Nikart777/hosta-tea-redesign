import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';

const prisma = new PrismaClient();

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
        where: { slug },
    });

    if (!post) notFound();

    // Related products (random or latest 3)
    const rawProducts = await prisma.product.findMany({
        take: 3,
        include: { variants: true },
    });

    const relatedProducts = rawProducts.map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        teaType: p.teaType,
        images: JSON.parse(p.images) as string[],
        variants: p.variants.map(v => ({ price: v.price }))
    }));

    const parsedPost = {
        ...post,
        keywords: JSON.parse(post.keywords) as string[]
    };

    return <BlogPostClient post={parsedPost} relatedProducts={relatedProducts} />;
}
