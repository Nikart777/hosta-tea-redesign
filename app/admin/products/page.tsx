import { PrismaClient } from '@prisma/client';
import { ProductsList } from './ProductsList';

const prisma = new PrismaClient();

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        include: { variants: true },
        orderBy: { title: 'asc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-playfair font-bold text-hosta-dark">Управление товарами</h2>
                <div className="text-sm text-gray-500">{products.length} товаров</div>
            </div>

            <ProductsList initialProducts={products as any[]} />
        </div>
    );
}
