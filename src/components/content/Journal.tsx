'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Calendar } from 'lucide-react';

const articles = [
  {
    id: 1,
    date: '12 Окт 2024',
    category: 'Гид по завариванию',
    title: 'Как раскрыть душу северного чая: секреты температуры',
    excerpt: 'Почему кипяток убивает вкус зеленого чая, и какая вода нужна для идеального "Императорского" настоя. Разбор от главного технолога.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=2564&auto=format&fit=crop', 
    slug: '/blog/brewing-secrets'
  },
  {
    id: 2,
    date: '28 Сен 2024',
    category: 'Наши плантации',
    title: 'Зима в горах: почему снег делает чай вкуснее',
    excerpt: 'Уникальный климат Сочи позволяет нам не использовать химию. Мороз убивает вредителей, а снег закаляет чайный куст.',
    image: 'https://images.unsplash.com/photo-1518182170546-0766ce6fec56?q=80&w=2574&auto=format&fit=crop',
    slug: '/blog/winter-tea'
  },
  {
    id: 3,
    date: '15 Авг 2024',
    category: 'Здоровье',
    title: 'Сила антиоксидантов: что в вашей чашке?',
    excerpt: 'Научный взгляд на пользу органического краснодарского чая. Как полифенолы влияют на иммунитет и молодость.',
    image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?q=80&w=2689&auto=format&fit=crop',
    slug: '/blog/health-benefits'
  }
];

export default function Journal() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-32 bg-hosta-dark relative overflow-hidden">
      
      {/* Фоновые декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -left-[10%] top-[20%] w-[40%] h-[40%] bg-hosta-green/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Заголовок секции */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-hosta-gold uppercase tracking-[0.3em] text-xs font-bold block mb-4">
              Блог и Новости
            </span>
            <h2 className="text-5xl md:text-7xl font-playfair text-white leading-none">
              Чайный <br/> <span className="text-white/20 italic">Журнал</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block pb-2"
          >
            <Link 
              href="/blog" 
              className="text-white hover:text-hosta-gold transition-colors border-b border-white/20 hover:border-hosta-gold pb-1 uppercase tracking-widest text-sm"
            >
              Все статьи
            </Link>
          </motion.div>
        </div>

        {/* Список статей */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <Link href={article.slug} className="block flex-grow">
                {/* Изображение */}
                <div className="relative h-[300px] md:h-[400px] mb-8 overflow-hidden rounded-sm">
                  <motion.img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Оверлей при наведении */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <ArrowUpRight className="text-white w-6 h-6" />
                    </div>
                  </div>
                  
                  {/* Дата поверх фото */}
                  <div className="absolute top-4 left-4 bg-hosta-dark/80 backdrop-blur-sm px-3 py-1 flex items-center gap-2 rounded-full border border-white/10">
                    <Calendar size={12} className="text-hosta-gold" />
                    <span className="text-white/80 text-[10px] uppercase tracking-wider font-bold">
                      {article.date}
                    </span>
                  </div>
                </div>

                {/* Текстовая часть */}
                <div className="flex flex-col flex-grow">
                  <span className="text-hosta-gold text-xs uppercase tracking-widest mb-3 font-medium">
                    {article.category}
                  </span>
                  
                  <h3 className="text-2xl font-playfair font-bold text-white mb-4 leading-tight group-hover:text-hosta-gold transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-400 font-light leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-white text-sm uppercase tracking-wider font-bold mt-auto group-hover:gap-4 transition-all">
                    Читать
                    <div className="h-[1px] w-8 bg-hosta-gold" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Мобильная кнопка */}
        <div className="mt-12 text-center md:hidden">
          <Link 
            href="/blog" 
            className="inline-block px-8 py-4 border border-white/20 text-white hover:bg-white hover:text-hosta-dark transition-all uppercase tracking-widest text-sm rounded-sm"
          >
            Больше историй
          </Link>
        </div>

      </div>
    </section>
  );
}