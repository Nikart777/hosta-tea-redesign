'use client';

import Link from 'next/link';
import { Instagram, Send, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Ссылки навигации
  const footerLinks = {
    catalog: [
      { name: 'Черный чай', href: '/catalog/black' },
      { name: 'Зеленый чай', href: '/catalog/green' },
      { name: 'Красный чай', href: '/catalog/red' },
      { name: 'Желтый чай', href: '/catalog/yellow' },
      { name: 'Подарочные наборы', href: '/catalog/sets' },
    ],
    company: [
      { name: 'История бренда', href: '/about' },
      { name: 'Плантации (Видео)', href: '/excursions' },
      { name: 'Блог', href: '/blog' },
      { name: 'Контакты', href: '/contacts' },
    ],
    help: [
      { name: 'Доставка и оплата', href: '/delivery' },
      { name: 'Возврат товара', href: '/returns' },
      { name: 'Публичная оферта', href: '/offer' },
      { name: 'Политика конфиденциальности', href: '/privacy' },
    ]
  };

  return (
    // Убрали border-t, чтобы переход был бесшовным
    <footer className="relative bg-[#050805] text-white overflow-hidden">
      
      {/* Декоративная текстура шума (еле заметная) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 pointer-events-none" />
      
      {/* Основной контент */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* 1. Логотип и Описание (4 колонки) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="text-2xl font-bold font-playfair tracking-wider group-hover:text-hosta-gold transition-colors duration-500">
                ХОСТА<span className="text-white/30 group-hover:text-hosta-gold/50">ЧАЙ</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 block mt-1 group-hover:text-hosta-gold/60 transition-colors">
                Сочи • 1947
              </span>
            </Link>
            
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light">
              Самый северный чай в мире. Выращен в горах Сочи, согрет южным солнцем и собран вручную, чтобы передать вам энергию Кавказской природы.
            </p>

            {/* Соцсети */}
            <div className="flex gap-4 pt-4">
              {[Instagram, Facebook, Youtube, Send].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-hosta-gold hover:border-hosta-gold transition-all duration-300 hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Навигация (Колонки по 2-3) */}
          <div className="lg:col-span-2">
            <h4 className="text-hosta-gold text-xs uppercase tracking-widest font-bold mb-6">Каталог</h4>
            <ul className="space-y-3">
              {footerLinks.catalog.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors block py-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-hosta-gold text-xs uppercase tracking-widest font-bold mb-6">Компания</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors block py-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-hosta-gold text-xs uppercase tracking-widest font-bold mb-6">Помощь</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors block py-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

           {/* 3. Подписка (2 колонки) */}
           <div className="lg:col-span-2">
             <h4 className="text-hosta-gold text-xs uppercase tracking-widest font-bold mb-6">Новости</h4>
             <p className="text-white/40 text-xs mb-4 leading-relaxed">
               Узнавайте о свежем сборе и акциях первыми.
             </p>
             <form className="space-y-3">
               <input 
                 type="email" 
                 placeholder="Email" 
                 className="w-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-hosta-gold transition-colors rounded-sm placeholder:text-white/20"
               />
               <button className="w-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest py-2 hover:bg-hosta-gold hover:text-hosta-dark transition-colors rounded-sm">
                 Подписаться
               </button>
             </form>
           </div>

        </div>
      </div>

      {/* Нижняя полоса */}
      <div className="border-t border-white/5 bg-[#020302]">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-white/20 uppercase tracking-widest">
            © {currentYear} АО «Хоста-чай». Все права защищены.
          </p>
          <p className="text-[10px] text-white/20 uppercase tracking-widest font-playfair italic">
            Сделано с душой в горах
          </p>
        </div>
      </div>
    </footer>
  );
}