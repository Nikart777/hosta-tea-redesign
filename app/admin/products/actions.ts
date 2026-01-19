'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function updateProductTitle(id: string, title: string) {
    try {
        await prisma.product.update({
            where: { id },
            data: { title },
        });
        revalidatePath('/admin/products');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to update title' };
    }
}

export async function updateVariantPrice(id: number, price: number) {
    try {
        await prisma.productVariant.update({
            where: { id },
            data: { price },
        });
        revalidatePath('/admin/products');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to update price' };
    }
}

export async function toggleVariantStock(id: number, inStock: boolean) {
    try {
        await prisma.productVariant.update({
            where: { id },
            data: { inStock },
        });
        revalidatePath('/admin/products');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to update stock' };
    }
}
