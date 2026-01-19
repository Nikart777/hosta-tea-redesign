'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function updateOrderStatus(orderId: number, status: string) {
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { status },
        });
        revalidatePath('/admin/orders');
        return { success: true };
    } catch (error) {
        console.error('Failed to update status:', error);
        return { success: false, error: 'Failed to update' };
    }
}
