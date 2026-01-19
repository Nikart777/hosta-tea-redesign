import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    // 1. Only protect /admin routes
    if (!request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.next();
    }

    // 2. Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
        return NextResponse.next();
    }

    // 3. Bypass auth in development (Local Testing)
    // User requested: "при локальном тестировании нужен допуск без авторизации"
    if (process.env.NODE_ENV === 'development') {
        return NextResponse.next();
    }

    const token = request.cookies.get('admin_session')?.value;
    const secret = new TextEncoder().encode(process.env.ADMIN_PASSWORD || 'hosta-secret');

    if (!token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
        await jwtVerify(token, secret);
        return NextResponse.next();
    } catch (err) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
}

export const config = {
    matcher: '/admin/:path*',
};
