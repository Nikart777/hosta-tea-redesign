import { PrismaClient } from '@prisma/client';
import { OrdersTable } from './OrdersTable';

const prisma = new PrismaClient();

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-playfair font-bold text-hosta-dark">Управление заказами</h2>
                <div className="text-sm text-gray-500">Всего: {orders.length}</div>
            </div>

            <OrdersTable initialOrders={orders as any[]} />
        </div>
    );
}
