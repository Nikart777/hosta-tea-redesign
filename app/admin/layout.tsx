'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useActionState } from 'react';
import { logout } from './actions';
import {
    LayoutDashboard, ShoppingBag, FileText, LogOut, Package
} from 'lucide-react';

const menuItems = [
    { icon: ShoppingBag, label: 'Заказы', href: '/admin/orders' },
    { icon: Package, label: 'Товары', href: '/admin/products' },
    { icon: FileText, label: 'Статьи', href: '/admin/blog' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // We can't verify auth here easily without leaking hydration, 
    // but middleware protects the route anyway.

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-hosta-dark text-white flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-playfair font-bold text-hosta-gold">Hosta Admin</h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${isActive
                                        ? 'bg-hosta-gold text-hosta-dark font-bold'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon size={20} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <form action={logout}>
                        <button className="flex items-center gap-3 px-4 py-3 w-full text-white/60 hover:text-red-400 hover:bg-white/5 rounded transition-colors">
                            <LogOut size={20} />
                            Выйти
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}
