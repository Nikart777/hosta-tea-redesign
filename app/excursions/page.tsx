'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Camera, Coffee, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ExcursionsPage() {
  return (
    <div className="min-h-screen bg-[#0a120a] text-white">
      
      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src="https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04621-768x512.jpg" 
            alt="Экскурсии на плантации" 
            className="w-full h-full object-cover animate-slow-zoom"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-playfair font-bold mb-6"
          >
            Чайное <span className="text-hosta-gold italic">Путешествие</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/80 max-w-2xl mx-auto font-light"
          >
            Прикоснитесь к истории самого северного чая, прогуляйтесь по горным плантациям и проведите дегустацию с видом на Кавказский хребет.
          </motion.p>
        </div>
      </section>

      {/* ПРОГРАММА */}
      <section className="py-24 bg-[#0d160d] relative">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                  <span className="text-hosta-gold uppercase tracking-widest text-xs font-bold mb-4 block">Что вас ждет</span>
                  <h2 className="text-4xl font-playfair mb-10">Программа визита</h2>
                  
                  <div className="space-y-8">
                     <div className="flex gap-6 group">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-hosta-gold group-hover:text-hosta-dark transition-all">
                           <Camera size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-bold mb-2">Прогулка по плантациям</h3>
                           <p className="text-white/60 font-light">Уникальные фотосессии среди чайных кустов на фоне гор. Рассказ о выращивании и сборе.</p>
                        </div>
                     </div>

                     <div className="flex gap-6 group">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-hosta-gold group-hover:text-hosta-dark transition-all">
                           <Coffee size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-bold mb-2">Фабрика и Дегустация</h3>
                           <p className="text-white/60 font-light">Посещение производства (в сезон) и профессиональная дегустация наших лучших сортов: от зеленого до редкого желтого.</p>
                        </div>
                     </div>

                     <div className="flex gap-6 group">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-hosta-gold group-hover:text-hosta-dark transition-all">
                           <Users size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-bold mb-2">Мастер-классы</h3>
                           <p className="text-white/60 font-light">Попробуйте себя в роли титестера или создайте свой купаж (по предварительной записи).</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-white/5 p-10 rounded-sm border border-white/5 relative">
                  <h3 className="text-2xl font-playfair mb-6">Информация</h3>
                  <ul className="space-y-6 text-sm text-white/80 mb-10">
                     <li className="flex items-center gap-4">
                        <MapPin className="text-hosta-gold" />
                        <span>с. Калиновое Озеро, ул. Центральная 10</span>
                     </li>
                     <li className="flex items-center gap-4">
                        <Calendar className="text-hosta-gold" />
                        <span>Ежедневно: 10:00 — 18:00</span>
                     </li>
                  </ul>
                  
                  <div className="p-6 bg-hosta-gold/10 border border-hosta-gold/20 rounded-sm mb-8">
                     <p className="text-hosta-gold text-sm font-bold text-center">
                        Стоимость: от 500 ₽ / чел
                     </p>
                  </div>

                  <Link 
                     href="/contacts" 
                     className="w-full bg-hosta-gold text-hosta-dark py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2"
                  >
                     Записаться <ArrowRight size={18} />
                  </Link>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}