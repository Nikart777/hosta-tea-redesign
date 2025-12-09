import Link from "next/link";
import { Phone, Mail, MapPin, Send, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-jade-dark text-stone-200 font-sans">
      {/* Верхняя часть: Призыв к действию / Подписка */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
          <div>
            <h3 className="font-serif text-2xl text-stone-50">Оставайтесь на связи</h3>
            <p className="mt-2 text-sm text-stone-400">Узнавайте о новых сортах и сборе урожая первыми.</p>
          </div>
          
          {/* Форма подписки (Визуальная) */}
          <div className="relative w-full max-w-md">
            <input 
              type="email" 
              placeholder="Ваш email" 
              className="w-full rounded-full bg-white/5 px-6 py-4 pr-14 text-sm text-stone-100 outline-none ring-1 ring-white/20 transition-all focus:bg-white/10 focus:ring-ochre"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-ochre p-2 text-white transition-transform hover:scale-105 active:scale-95">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Основная сетка ссылок */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* 1. Бренд */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <span className="font-serif text-3xl font-bold tracking-tight text-stone-50">
                HOSTA TEA
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-400">
              Самый северный органический чай в мире. Выращен в горах Сочи, собран с любовью, сохранен для вас.
            </p>
            <div className="flex gap-4">
              {/* Соцсети (заглушки) */}
              <a href="#" className="rounded-full bg-white/5 p-3 transition-colors hover:bg-ochre hover:text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.07 2H22V9.04C22 17.65 14.84 24.69 6.07 24.69H2V14.61C2 8.1 7.27 2.83 13.78 2.83H15.07V2ZM13.84 5.09C9.34 5.09 5.61 8.65 5.34 13.09H6.07C10.74 13.09 14.65 9.42 14.92 4.79H13.84V5.09ZM8.82 17.89C8.82 19.38 9.99 20.6 11.46 20.6C12.92 20.6 14.11 19.38 14.11 17.89C14.11 16.4 12.92 15.18 11.46 15.18C9.99 15.18 8.82 16.4 8.82 17.89Z" /></svg> {/* VK Icon simplified */}
              </a>
              <a href="#" className="rounded-full bg-white/5 p-3 transition-colors hover:bg-ochre hover:text-white">
                <Send size={20} className="-ml-0.5 mt-0.5" /> {/* Telegram */}
              </a>
            </div>
          </div>

          {/* 2. Каталог */}
          <div>
            <h4 className="mb-6 font-serif text-lg text-stone-50">Каталог</h4>
            <ul className="space-y-4 text-sm text-stone-400">
              <li>
                <Link href="/catalog/black" className="transition-colors hover:text-ochre">Черный чай</Link>
              </li>
              <li>
                <Link href="/catalog/green" className="transition-colors hover:text-ochre">Зеленый чай</Link>
              </li>
              <li>
                <Link href="/catalog/red" className="transition-colors hover:text-ochre">Красный чай</Link>
              </li>
              <li>
                <Link href="/catalog/yellow" className="transition-colors hover:text-ochre">Желтый чай</Link>
              </li>
              <li>
                <Link href="/catalog/sets" className="transition-colors hover:text-ochre">Подарочные наборы</Link>
              </li>
            </ul>
          </div>

          {/* 3. Компания */}
          <div>
            <h4 className="mb-6 font-serif text-lg text-stone-50">Покупателям</h4>
            <ul className="space-y-4 text-sm text-stone-400">
              <li>
                <Link href="/about" className="transition-colors hover:text-ochre">О нас</Link>
              </li>
              <li>
                <Link href="/delivery" className="transition-colors hover:text-ochre">Оплата и доставка</Link>
              </li>
              <li>
                <Link href="/excursions" className="flex items-center gap-2 transition-colors hover:text-ochre">
                  <span>Экскурсии</span>
                  <span className="rounded-full bg-ochre/20 px-1.5 py-0.5 text-[10px] text-ochre">Popular</span>
                </Link>
              </li>
              <li>
                <Link href="/policy" className="transition-colors hover:text-ochre">Политика конфиденциальности</Link>
              </li>
              <li>
                <Link href="/offer" className="transition-colors hover:text-ochre">Договор оферты</Link>
              </li>
            </ul>
          </div>

          {/* 4. Контакты */}
          <div>
            <h4 className="mb-6 font-serif text-lg text-stone-50">Контакты</h4>
            <ul className="space-y-6 text-sm text-stone-400">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-ochre" />
                <span>
                  Россия, 354389, г. Сочи,<br /> 
                  с. Калиновое Озеро,<br /> 
                  ул. Центральная 10
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0 text-ochre" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+78622659835" className="hover:text-white">+7 (862) 265 98 35</a>
                  <a href="tel:+79683000200" className="hover:text-white">+7 (968) 300 02 00</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 shrink-0 text-ochre" />
                <a href="mailto:hosta-chai@mail.ru" className="hover:text-white">hosta-chai@mail.ru</a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Копирайт */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-stone-500 md:flex-row">
          <p>© {currentYear} АО «Хоста-чай». Все права защищены.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-stone-300">Разработка дизайна</span>
          </div>
        </div>
      </div>
    </footer>
  );
}