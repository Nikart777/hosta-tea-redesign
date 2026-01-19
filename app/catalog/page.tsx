import { PrismaClient } from '@prisma/client';
import CatalogClient from './CatalogClient';

const prisma = new PrismaClient();

export default async function CatalogPage() {
  const rawProducts = await prisma.product.findMany({
    include: { variants: true },
  });

  const products = rawProducts.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    images: JSON.parse(p.images) as string[],
    variants: p.variants.map(v => ({
      id: v.id,
      weight: v.weight,
      price: v.price,
      packaging: v.packaging,
      inStock: v.inStock
    }))
  }));

  return <CatalogClient products={products} />;
}