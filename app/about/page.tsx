'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Leaf, Award, Sun, Snowflake, Droplets, Mountain, Sprout } from 'lucide-react';

const galleryImages = [
  "https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04709-768x512.jpg",
  "https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04911-1-768x512.jpg",
  "https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04915-1-768x512.jpg",
  "https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04832-768x512.jpg",
  "https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04947-768x512.jpg",
  "https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04981-768x512.jpg",
  "https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04621-768x512.jpg",
  "https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04665-768x512.jpg",
  "https://hosta-tea.ru/wp-content/uploads/2023/02/organicleaves-768x423.jpg"
];

const certificates = [
  "https://hosta-tea.ru/wp-content/uploads/2022/12/sertifikat-organik-1-pdf-725x1024-1.jpg",
  "https://hosta-tea.ru/wp-content/uploads/2022/12/sertifikat-organik-1-2-2-pdf-725x1024-1.jpg"
];

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center md:text-left">
    <div className="text-4xl md:text-5xl font-playfair font-bold text-hosta-gold mb-2">{value}</div>
    <div className="text-xs uppercase tracking-widest text-white/40">{label}</div>
  </div>
);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="bg-[#0a120a] text-white min-h-screen font-sans selection:bg-hosta-gold selection:text-hosta-dark overflow-hidden">
      
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-black/50 z-10" />
           <motion.img 
             initial={{ scale: 1.1 }}
             animate={{ scale: 1 }}
             transition={{ duration: 10, ease: "easeOut" }}
             src="https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04709-1.jpg" 
             alt="Плантации Хоста Чай" 
             className="w-full h-full object-cover"
           />
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-hosta-gold uppercase tracking-[0.4em] text-xs md:text-sm font-bold mb-6 block">
              Верхне-Хостинский чайный совхоз
            </span>
            <h1 className="text-5xl md:text-8xl font-playfair font-bold leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              Наследие <br/> <span className="italic font-serif text-hosta-gold">1947 года</span>
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Мы храним традиции одного из старейших предприятий отрасли, создавая чай в самом сердце Кавказского хребта.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[10px] uppercase tracking-widest">Листайте вниз</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* ОСТАЛЬНОЙ КОНТЕНТ */}
      <section className="py-32 relative bg-[#0a120a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <MapPin className="text-hosta-gold w-6 h-6" />
                <span className="uppercase tracking-widest text-xs font-bold text-white/60">Сочи • 43° с.ш.</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-playfair mb-8 leading-tight">
                101 гектар <br />
                <span className="text-white/30 italic">чистой природы</span>
              </h2>
              
              <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg border-l border-white/10 pl-6">
                <p>
                  Наши плантации расположены в уникальной экологической зоне в 17 км от моря, на водоразделе рек Западная и Восточная Хоста.
                </p>
                <p>
                  Здесь нет трасс и городской инфраструктуры. Только горный воздух, туманы и юго-восточные отроги хребта Алеко.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 border-t border-white/10 pt-12">
                 <StatItem value="101 га" label="Плантаций" />
                 <StatItem value="500 м" label="Над уровнем моря" />
                 <StatItem value="43°" label="Сев. широты" />
              </div>
            </motion.div>

            <div className="relative h-[600px] w-full rounded-sm overflow-hidden group border border-white/5">
               <motion.img 
                 style={{ y: yParallax }}
                 src="https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04665-768x512.jpg" 
                 alt="Вид на горы" 
                 className="w-full h-[120%] object-cover object-center"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a120a] via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* ОРГАНИК И ПРОИЗВОДСТВО */}
      <section className="py-24 bg-[#0d160d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
             <span className="text-hosta-gold uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Уникальный терруар</span>
             <h2 className="text-4xl md:text-6xl font-playfair mb-6 text-white">Самый северный <span className="italic text-white/30">в мире</span></h2>
             <p className="text-gray-400 font-light text-lg">
               Мы выращиваем чай в зоне рискованного земледелия. Это вызов, который природа превращает в наше главное преимущество.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-10 rounded-sm border border-white/5 hover:bg-white/10 transition-colors group relative overflow-hidden">
               <Snowflake size={32} className="text-hosta-gold mb-6" />
               <h3 className="text-2xl font-playfair font-bold mb-4">Зимняя закалка</h3>
               <p className="text-sm text-gray-400 leading-relaxed">
                 Снег и морозы зимой губительны для вредителей, но безопасны для спящих кустов. Благодаря этому мы полностью отказались от пестицидов.
               </p>
            </div>
            <div className="bg-white/5 p-10 rounded-sm border border-white/5 hover:bg-white/10 transition-colors group relative overflow-hidden">
               <Droplets size={32} className="text-hosta-gold mb-6" />
               <h3 className="text-2xl font-playfair font-bold mb-4">Влажность моря</h3>
               <p className="text-sm text-gray-400 leading-relaxed">
                 Близость Черного моря обеспечивает идеальный баланс осадков. Максимум влаги зимой и весной напитывает лист перед сбором.
               </p>
            </div>
            <div className="bg-white/5 p-10 rounded-sm border border-white/5 hover:bg-white/10 transition-colors group relative overflow-hidden">
               <Mountain size={32} className="text-hosta-gold mb-6" />
               <h3 className="text-2xl font-playfair font-bold mb-4">Плотный вкус</h3>
               <p className="text-sm text-gray-400 leading-relaxed">
                 Из-за долгого периода вегетации в прохладе, наш чай накапливает рекордное количество танинов и экстрактивных веществ.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* СЕРТИФИКАТЫ */}
      <section className="py-32 bg-white/5 border-y border-white/5 relative overflow-hidden">
         <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center justify-center p-4 border border-hosta-gold/30 rounded-full mb-8">
                <Award className="w-8 h-8 text-hosta-gold" />
            </div>
            <h2 className="text-4xl md:text-6xl font-playfair mb-6">Первый в России <br/><span className="text-hosta-gold italic">Органический</span></h2>
            <div className="max-w-2xl mx-auto mb-16 text-lg text-gray-400 leading-relaxed">
               <p>
                 В июле 2022 года наш чай официально подтвердил статус Organic. Мы соответствуем всем нормам ГОСТ 33980-2016.
               </p>
            </div>
            <div className="flex flex-wrap justify-center gap-12">
               {certificates.map((cert, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ scale: 1.05 }}
                    className="w-full max-w-[300px] bg-white p-2 rounded-sm shadow-2xl rotate-1 hover:rotate-0 transition-all duration-500"
                  >
                     <img src={cert} alt={`Сертификат ${idx + 1}`} className="w-full h-auto" />
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ГАЛЕРЕЯ */}
      <section className="py-24 overflow-hidden bg-[#0a120a]">
         <div className="container mx-auto px-4 mb-12 flex justify-between items-end">
            <h3 className="text-2xl font-playfair text-white">Жизнь на плантации</h3>
            <div className="w-24 h-[1px] bg-white/20 hidden md:block" />
         </div>
         <div className="relative w-full">
             <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a120a] to-transparent z-10" />
             <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a120a] to-transparent z-10" />
             <div className="flex gap-4 w-max animate-scroll-left hover:[animation-play-state:paused]">
                {[...galleryImages, ...galleryImages].map((img, i) => (
                   <div key={i} className="w-[300px] h-[200px] md:w-[450px] md:h-[300px] rounded-sm overflow-hidden flex-shrink-0 relative group grayscale-[30%] hover:grayscale-0 transition-all duration-500">
                      <img src={img} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                   </div>
                ))}
             </div>
         </div>
      </section>
    </div>
  );
}