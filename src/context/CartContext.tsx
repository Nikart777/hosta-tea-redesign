'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Тип товара в корзине
export type CartItem = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
};

// Тип контекста
type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  cartCount: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Восстановление корзины из localStorage (опционально)
  useEffect(() => {
    const saved = localStorage.getItem('hosta-cart');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  // Сохранение при изменении
  useEffect(() => {
    localStorage.setItem('hosta-cart', JSON.stringify(items));
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + (newItem.quantity || 1) } : i
        );
      }
      return [...prev, { ...newItem, quantity: newItem.quantity || 1 }];
    });
    openCart(); // Открываем корзину при добавлении
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === id) return { ...i, quantity: Math.max(1, i.quantity + delta) };
        return i;
      })
    );
  };

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};