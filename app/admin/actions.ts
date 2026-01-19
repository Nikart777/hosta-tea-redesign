'use server';

import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
    const password = formData.get('password') as string;
    const correctPassword = process.env.ADMIN_PASSWORD || 'hosta-secret';

    if (password === correctPassword) {
        // Generate JWT
        const secret = new TextEncoder().encode(correctPassword);
        const mockUser = { role: 'admin' };

        const token = await new SignJWT(mockUser)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(secret);

        // Set Cookie
        (await cookies()).set('admin_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        redirect('/admin/orders');
    } else {
        // Return error (handled in UI)
        return { error: 'Неверный пароль' };
    }
}

export async function logout() {
    (await cookies()).delete('admin_session');
    redirect('/admin/login');
}
