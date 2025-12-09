'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { 
  ArrowLeft, CreditCard, ShieldCheck, Tag, Loader2, Check 
} from 'lucide-react';

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [isClient, setIsClient] = useState(false);
  
  // Состояние формы
  const [formData, setFormData] = useState({
    fio: '',
    city: '',
    phone: '',
    email: '',
    notes: ''
  });

  // Логика промокода
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoStatus, setPromoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Логика оплаты
  const [isProcessing, setIsProcessing] = useState(false);

  // Избегаем ошибок гидратации
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleApplyPromo = () => {
    if (!promoCode) return;
    setPromoStatus('loading');
    
    // Имитация проверки промокода
    setTimeout(() => {
      if (promoCode.toUpperCase() === 'HOSTA10') {
        setDiscount(totalPrice * 0.1); // 10% скидка
        setPromoStatus('success');
      } else {
        setPromoStatus('error');
        setDiscount(0);
      }
    }, 1000);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Здесь должна быть логика перенаправления на платежный шлюз (Сбер, Тинькофф, ЮКасса)
    setTimeout(() => {
      alert('Переход на страницу банка...');
      setIsProcessing(false);
    }, 1500);
  };

  if (!isClient) return null;

  // Если корзина пуста, показываем заглушку
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-hosta-dark text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-playfair mb-4">Ваша корзина пуста</h1>
        <p className="text-white/40 mb-8">Добавьте чай, чтобы оформить заказ.</p>
        <Link href="/catalog" className="px-8 py-3 bg-hosta-gold text-hosta-dark font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors">
          В каталог
        </Link>
      </div>
    );
  }

  const finalPrice = totalPrice - discount;

  return (
    <div className="min-h-screen bg-[#0a120a] text-white pt-28 pb-20">
      
      {/* Фоновая атмосфера */}
      <div className="fixed inset-0 bg-gradient-to-br from-hosta-green/10 to-[#0a120a] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none z-0" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Заголовок */}
        <div className="mb-10 flex items-center gap-4">
          <Link href="/catalog" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">Оформление заказа</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* --- ЛЕВАЯ КОЛОНКА: ФОРМА --- */}
          <div className="lg:col-span-7">
            <form id="checkout-form" onSubmit={handlePayment} className="space-y-8">
              
              {/* Секция: Личные данные */}
              <div className="bg-white/5 p-8 rounded-sm border border-white/5 backdrop-blur-sm">
                <h2 className="text-xl font-playfair text-hosta-gold mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full border border-hosta-gold flex items-center justify-center text-xs font-bold font-inter">1</span>
                  Контактные данные
                </h2>
                
                <div className="space-y-6">
                  {/* ФИО */}
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="fio"
                      required
                      value={formData.fio}
                      onChange={(e) => setFormData({...formData, fio: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-hosta-gold transition-colors placeholder-transparent peer"
                      placeholder="ФИО"
                    />
                    <label htmlFor="fio" className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-hosta-gold peer-valid:-top-2 peer-valid:text-xs peer-valid:text-white/60 cursor-text">
                      Фамилия Имя Отчество *
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Телефон */}
                    <div className="relative group">
                      <input 
                        type="tel" 
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-hosta-gold transition-colors placeholder-transparent peer"
                        placeholder="Телефон"
                      />
                      <label htmlFor="phone" className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-hosta-gold peer-valid:-top-2 peer-valid:text-xs peer-valid:text-white/60 cursor-text">
                        Телефон *
                      </label>
                    </div>

                    {/* Email */}
                    <div className="relative group">
                      <input 
                        type="email" 
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-hosta-gold transition-colors placeholder-transparent peer"
                        placeholder="Email"
                      />
                      <label htmlFor="email" className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-hosta-gold peer-valid:-top-2 peer-valid:text-xs peer-valid:text-white/60 cursor-text">
                        Email *
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Секция: Доставка */}
              <div className="bg-white/5 p-8 rounded-sm border border-white/5 backdrop-blur-sm">
                <h2 className="text-xl font-playfair text-hosta-gold mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full border border-hosta-gold flex items-center justify-center text-xs font-bold font-inter">2</span>
                  Адрес доставки
                </h2>
                
                <div className="space-y-6">
                  {/* Населенный пункт */}
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-hosta-gold transition-colors placeholder-transparent peer"
                      placeholder="Город"
                    />
                    <label htmlFor="city" className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-hosta-gold peer-valid:-top-2 peer-valid:text-xs peer-valid:text-white/60 cursor-text">
                      Населённый пункт *
                    </label>
                  </div>

                  {/* Примечание */}
                  <div className="relative group">
                    <textarea 
                      id="notes"
                      required // Как вы просили - обязательно
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-hosta-gold transition-colors placeholder-transparent peer resize-none"
                      placeholder="Примечание"
                    />
                    <label htmlFor="notes" className="absolute left-0 top-3 text-white/40 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-hosta-gold peer-valid:-top-2 peer-valid:text-xs peer-valid:text-white/60 cursor-text">
                      Примечание к заказу (обязательно) *
                    </label>
                  </div>
                </div>
              </div>

            </form>
          </div>

          {/* --- ПРАВАЯ КОЛОНКА: СВОДКА (STICKY) --- */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 bg-white/5 border border-white/10 rounded-sm p-8 backdrop-blur-md shadow-2xl">
              
              <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-6 pb-4 border-b border-white/10">
                Ваш заказ
              </h3>

              {/* Список товаров (компактный) */}
              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-white/10 rounded-sm overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-playfair font-bold text-white">{item.title}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider">{item.subtitle} x {item.quantity}</div>
                    </div>
                    <div className="text-sm font-bold text-hosta-gold">
                      {item.price * item.quantity} ₽
                    </div>
                  </div>
                ))}
              </div>

              {/* Промокод */}
              <div className="mb-8">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Промокод"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 px-4 py-2 text-sm text-white focus:border-hosta-gold outline-none rounded-sm uppercase placeholder:normal-case"
                  />
                  <button 
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={promoStatus === 'loading' || !promoCode}
                    className="bg-white/10 text-white px-4 py-2 rounded-sm hover:bg-hosta-gold hover:text-hosta-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {promoStatus === 'loading' ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
                  </button>
                </div>
                {promoStatus === 'success' && <p className="text-green-400 text-xs mt-2">Промокод применен!</p>}
                {promoStatus === 'error' && <p className="text-red-400 text-xs mt-2">Неверный промокод</p>}
              </div>

              {/* Итого */}
              <div className="space-y-3 border-t border-white/10 pt-6 mb-8">
                <div className="flex justify-between text-sm text-white/60">
                  <span>Сумма</span>
                  <span>{totalPrice} ₽</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-hosta-gold">
                    <span>Скидка</span>
                    <span>-{discount} ₽</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-white pt-2">
                  <span>Итого к оплате</span>
                  <span>{finalPrice} ₽</span>
                </div>
              </div>

              {/* Кнопка оплаты (ВНЕ ФОРМЫ, но триггерит форму через form="checkout-form") */}
              <button 
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full bg-hosta-gold text-hosta-dark py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(207,161,86,0.3)] flex items-center justify-center gap-3 mb-6 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Обработка...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} className="group-hover:scale-110 transition-transform" />
                    Оплатить картой
                  </>
                )}
              </button>

              {/* Дисклеймер */}
              <div className="text-[10px] text-white/30 leading-relaxed text-center">
                <div className="flex items-center justify-center gap-2 mb-2 text-white/40">
                  <ShieldCheck size={12} />
                  <span>Безопасная оплата картой банка</span>
                </div>
                <p>
                  Ваши личные данные будут использоваться для обработки ваших заказов, упрощения вашей работы с сайтом и для других целей, описанных в нашей <Link href="/privacy" className="underline hover:text-hosta-gold">политике конфиденциальности</Link>.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}