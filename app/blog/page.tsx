import { PrismaClient } from '@prisma/client';
import Journal from '@/components/content/Journal';

const prisma = new PrismaClient();

export default async function BlogIndexPage() {
    const posts = await prisma.post.findMany({
        orderBy: { id: 'desc' },
    });

    // Reuse Journal styles but maybe with different container?
    // Journal component has specific "Home" styling (py-32, background).
    // For /blog page we might want a simple header and grid.
    // But for MVP, reusing Journal is fine.

    return (
        <div className='bg-hosta-dark min-h-screen pt-20'>
            <Journal posts={posts} />
        </div>
    );
}
