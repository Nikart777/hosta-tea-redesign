'use client';

import Link from 'next/link';
import { Instagram, Send, Facebook, Youtube, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    catalog: [
      { name: 'Черный чай', href: '/catalog?category=black' },
      { name: 'Зеленый чай', href: '/catalog?category=green' },
      { name: 'Красный чай', href: '/catalog?category=red' },
      { name: 'Желтый чай', href: '/catalog?category=yellow' },
      { name: 'ГАБА - чай', href: '/catalog?category=gaba' },
      { name: 'Ассорти (Наборы)', href: '/catalog?category=mix' },
    ],
    company: [
      { name: 'О плантации', href: '/about' },
      { name: 'Экскурсии', href: '/excursions' },
      { name: 'Блог', href: '/blog' },
      { name: 'Контакты', href: '/contacts' },
      { name: 'Акционерам', href: '/shareholders' }, // Перенесли сюда
    ],
    help: [
      { name: 'Оплата и доставка', href: '/delivery' }, // Перенесли сюда
      { name: 'Возврат товара', href: '/returns' },
      { name: 'Публичная оферта', href: '/offer' },
      { name: 'Политика конфиденциальности', href: '/privacy' },
    ]
  };

  return (
    <footer className="relative bg-[#050805] text-white overflow-hidden pt-20">
      
      {/* Текстура */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Логотип */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="text-3xl font-bold font-playfair tracking-wider group-hover:text-hosta-gold transition-colors duration-500">
                ХОСТА<span className="text-white/30 group-hover:text-hosta-gold/50">ЧАЙ</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 block mt-2 group-hover:text-hosta-gold/60 transition-colors">
                Душа северных гор • 1947
              </span>
            </Link>
            
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light">
              Экологически чистый чай, выращенный в зоне рискованного земледелия. Закаленный морозом и согретый южным солнцем.
            </p>

            <div className="flex gap-4 pt-4">
              {[Instagram, Facebook, Youtube, Send].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-hosta-dark hover:bg-hosta-gold transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Ссылки */}
          <div className="lg:col-span-2">
            <h4 className="text-hosta-gold text-xs uppercase tracking-widest font-bold mb-6">Коллекция</h4>
            <ul className="space-y-3">
              {footerLinks.catalog.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors block hover:translate-x-1 duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-hosta-gold text-xs uppercase tracking-widest font-bold mb-6">О нас</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors block hover:translate-x-1 duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-hosta-gold text-xs uppercase tracking-widest font-bold mb-6">Клиентам</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors block hover:translate-x-1 duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

           {/* Контакты / Подписка */}
           <div className="lg:col-span-2">
             <h4 className="text-hosta-gold text-xs uppercase tracking-widest font-bold mb-6">Контакты</h4>
             <div className="space-y-4 text-sm text-white/60">
                <p>г. Сочи, с. Калиновое Озеро, ул. Центральная 10</p>
                <a href="tel:+78622659835" className="block hover:text-white transition-colors">+7 (862) 265 98 35</a>
                <a href="mailto:hosta-chai@mail.ru" className="block hover:text-white transition-colors">hosta-chai@mail.ru</a>
             </div>
           </div>
        </div>

        {/* --- КНОПКА РАЗРАБОТЧИКА (ART-VISION) --- */}
        <div className="flex justify-center mb-8">
           <a 
             href="https://art-vision.online" 
             target="_blank" 
             rel="noopener noreferrer"
             className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-hosta-gold/50 transition-all duration-500 overflow-hidden"
           >
              {/* Фоновый блик */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-hosta-gold/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <span className="relative text-[10px] uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">
                Site by <span className="font-bold text-white group-hover:text-hosta-gold">ART-VISION</span>
              </span>
              <ExternalLink size={12} className="relative text-white/40 group-hover:text-hosta-gold transition-colors" />
           </a>
        </div>
      </div>

      {/* Копирайт */}
      <div className="border-t border-white/5 bg-[#020302] relative z-10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-white/20 uppercase tracking-widest">
            © {currentYear} АО «Хоста-чай»
          </p>
          <div className="flex gap-6">
             <Link href="/privacy" className="text-[10px] text-white/20 hover:text-white/60 uppercase tracking-widest transition-colors">
               Конфиденциальность
             </Link>
             <Link href="/offer" className="text-[10px] text-white/20 hover:text-white/60 uppercase tracking-widest transition-colors">
               Оферта
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}