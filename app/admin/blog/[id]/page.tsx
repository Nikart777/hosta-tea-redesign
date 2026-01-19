import { PrismaClient } from '@prisma/client';
import PostForm from '../PostForm';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function EditPostPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) notFound();

    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) notFound();

    return <PostForm post={post} />;
}
