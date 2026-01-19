import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import ProductPageClient from './ProductPageClient';

const prisma = new PrismaClient();

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.product.findUnique({
    where: { slug },
    include: { variants: true },
  });

  if (!post) notFound();

  // Parse JSON fields
  const product = {
    ...post,
    images: JSON.parse(post.images),
    brewing: JSON.parse(post.brewing),
    characteristics: JSON.parse(post.characteristics),
  };

  return <ProductPageClient product={product} />;
}
