'use client';

import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <section className="relative py-24 bg-[#0a120a] overflow-hidden">
      
      {/* ФОН */}
      <div className="absolute inset-0 z-0 opacity-20">
         <img 
            src="https://images.unsplash.com/photo-1628755673479-70233630d7be?q=80&w=2670&auto=format&fit=crop" 
            alt="Чайная церемония фон" 
            className="w-full h-full object-cover grayscale"
         />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a120a] via-[#0a120a]/90 to-transparent z-0" />
      
      {/* --- ДИЗАЙНЕРСКИЙ ПЕРЕХОД (НОВЫЙ БЛОК) --- */}
      {/* Этот градиент плавно уводит цвет секции в цвет футера (#050805) */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent via-[#050805]/60 to-[#050805] z-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* ЛЕВАЯ КОЛОНКА: Контакты */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-hosta-gold uppercase tracking-[0.3em] text-xs font-bold block mb-4">
              Связь с нами
            </span>
            <h2 className="text-4xl md:text-6xl font-playfair text-white mb-8 leading-tight">
              Напишите нам <br />
              <span className="text-white/30 italic">в горы</span>
            </h2>
            <p className="text-gray-400 font-light mb-12 max-w-md leading-relaxed">
              У вас есть вопросы о доставке, оптовых закупках или вы хотите записаться на экскурсию по нашим плантациям?
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 text-white group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-hosta-gold transition-colors">
                  <MapPin size={18} className="text-hosta-gold" />
                </div>
                <div>
                  <h4 className="uppercase tracking-widest text-xs font-bold text-white/50 mb-1">Адрес плантации</h4>
                  <p className="font-playfair text-lg leading-snug">
                    г. Сочи, с. Калиновое Озеро, <br/> ул. Центральная 10
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-white group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-hosta-gold transition-colors">
                  <Phone size={18} className="text-hosta-gold" />
                </div>
                <div>
                  <h4 className="uppercase tracking-widest text-xs font-bold text-white/50 mb-1">Телефон</h4>
                  <a href="tel:+78622659835" className="font-playfair text-lg hover:text-hosta-gold transition-colors">
                    +7 (862) 265 98 35
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 text-white group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-hosta-gold transition-colors">
                  <Mail size={18} className="text-hosta-gold" />
                </div>
                <div>
                  <h4 className="uppercase tracking-widest text-xs font-bold text-white/50 mb-1">Почта</h4>
                  <a href="mailto:hosta-chai@mail.ru" className="font-playfair text-lg hover:text-hosta-gold transition-colors">
                    hosta-chai@mail.ru
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ПРАВАЯ КОЛОНКА: Форма */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-sm border border-white/10 relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-hosta-gold/10 blur-[50px] rounded-full pointer-events-none" />

            {formState === 'success' ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-hosta-gold rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <Send className="text-hosta-dark" size={24} />
                </div>
                <h3 className="text-2xl font-playfair text-white mb-2">Письмо отправлено</h3>
                <p className="text-gray-400">Мы ответим вам в ближайшее время.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-8 text-hosta-gold uppercase tracking-widest text-xs hover:text-white transition-colors"
                >
                  Отправить еще
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative group">
                  <input 
                    type="text" 
                    required
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white outline-none focus:border-hosta-gold transition-colors placeholder-transparent peer"
                    placeholder="Ваше имя"
                    id="name"
                  />
                  <label 
                    htmlFor="name"
                    className="absolute left-0 top-4 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-hosta-gold peer-valid:-top-2 peer-valid:text-xs peer-valid:text-gray-400 cursor-text"
                  >
                    Ваше имя
                  </label>
                </div>

                <div className="relative group">
                  <input 
                    type="tel" 
                    required
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white outline-none focus:border-hosta-gold transition-colors placeholder-transparent peer"
                    placeholder="Телефон"
                    id="phone"
                  />
                  <label 
                    htmlFor="phone"
                    className="absolute left-0 top-4 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-hosta-gold peer-valid:-top-2 peer-valid:text-xs peer-valid:text-gray-400 cursor-text"
                  >
                    Телефон
                  </label>
                </div>

                <div className="relative group">
                  <textarea 
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white outline-none focus:border-hosta-gold transition-colors placeholder-transparent peer resize-none"
                    placeholder="Сообщение"
                    id="message"
                  />
                  <label 
                    htmlFor="message"
                    className="absolute left-0 top-4 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-hosta-gold peer-valid:-top-2 peer-valid:text-xs peer-valid:text-gray-400 cursor-text"
                  >
                    Сообщение
                  </label>
                </div>

                <button 
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full bg-hosta-gold text-hosta-dark font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4 group"
                >
                  {formState === 'submitting' ? 'Отправка...' : 'Отправить запрос'}
                  {!formState && <Send size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}