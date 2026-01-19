'use client';

import { useState } from 'react';
import {
    Clipboard, Check, ChevronDown, ChevronUp, Package
} from 'lucide-react';
import { updateOrderStatus } from './actions';

type Order = {
    id: number;
    customerFio: string;
    customerPhone: string;
    customerEmail: string;
    customerCity: string;
    deliveryAddress: string;
    items: string; // JSON
    total: number;
    status: string;
    createdAt: string;
    promoCode?: string;
    discount?: number;
};

export function OrdersTable({ initialOrders }: { initialOrders: Order[] }) {
    const [orders, setOrders] = useState(initialOrders);

    const copyForCdek = (order: Order) => {
        const text = `
ФИО: ${order.customerFio}
Тел: ${order.customerPhone}
Email: ${order.customerEmail}
Город: ${order.customerCity}
ПВЗ: ${order.deliveryAddress}
    `.trim();

        navigator.clipboard.writeText(text);
        alert('Данные скопированы для СДЭК!');
    };

    const handleStatusChange = async (orderId: number, newStatus: string) => {
        // Optimistic update
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

        const result = await updateOrderStatus(orderId, newStatus);
        if (!result.success) {
            alert('Ошибка обновления статуса');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-medium">
                        <tr>
                            <th className="p-4">#</th>
                            <th className="p-4">Дата</th>
                            <th className="p-4">Клиент</th>
                            <th className="p-4">Сумма</th>
                            <th className="p-4">Статус</th>
                            <th className="p-4">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-bold text-gray-600">#{order.id}</td>
                                <td className="p-4 text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">{order.customerFio}</div>
                                    <div className="text-gray-400 text-xs">{order.customerPhone}</div>
                                    <div className="text-gray-400 text-xs">{order.customerCity}</div>
                                </td>
                                <td className="p-4 font-medium text-gray-900">
                                    {order.total} ₽
                                    {order.promoCode && (
                                        <div className="text-[10px] text-green-600 bg-green-50 px-1 rounded w-fit mt-1">
                                            {order.promoCode}
                                        </div>
                                    )}
                                </td>
                                <td className="p-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className={`px-2 py-1 rounded-full text-xs border bg-transparent cursor-pointer outline-none appearance-none ${order.status === 'new'
                                                ? 'bg-blue-50 text-blue-600 border-blue-100'
                                                : order.status === 'completed'
                                                    ? 'bg-green-50 text-green-600 border-green-100'
                                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}
                                    >
                                        <option value="new">Новый</option>
                                        <option value="processing">В работе</option>
                                        <option value="completed">Выполнен</option>
                                        <option value="cancelled">Отменен</option>
                                    </select>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => copyForCdek(order)}
                                            title="Копировать для СДЭК"
                                            className="p-2 hover:bg-hosta-gold/10 hover:text-hosta-gold rounded text-gray-400 transition-colors"
                                        >
                                            <Clipboard size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {orders.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                    Заказов пока нет
                </div>
            )}
        </div>
    );
}
