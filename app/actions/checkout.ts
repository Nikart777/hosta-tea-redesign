'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type CreateOrderData = {
    customerFio: string;
    customerPhone: string;
    customerEmail: string;
    customerCity: string;
    deliveryAddress: string; // CDEK Note
    items: any[];
    totalPrice: number;
    promoCode?: string;
    discount?: number;
};

export async function createOrder(data: CreateOrderData) {
    try {
        const order = await prisma.order.create({
            data: {
                customerFio: data.customerFio,
                customerPhone: data.customerPhone,
                customerEmail: data.customerEmail,
                customerCity: data.customerCity,
                deliveryAddress: data.deliveryAddress,
                items: JSON.stringify(data.items),
                total: data.totalPrice - (data.discount || 0),
                promoCode: data.promoCode,
                discount: data.discount,
                status: 'new',
            },
        });

        return { success: true, orderId: order.id };
    } catch (error) {
        console.error('Failed to create order:', error);
        return { success: false, error: 'Ошибка при создании заказа' };
    }
}
