'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// --- ДАННЫЕ ---
const slides = [
  {
    id: 1,
    year: "1947",
    title: "Корни истории",
    description: "Всё началось в послевоенные годы. Именно тогда, в туманных ущельях Мацесты, были заложены первые семена, давшие жизнь самым северным чайным кустам в мире.",
    img: "https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04981.jpg?q=80&w=2574&auto=format&fit=crop",
    alt: "Старые чайные плантации"
  },
  {
    id: 2,
    year: "43°",
    title: "Северная широта",
    description: "Уникальный климат. Зимой снег укрывает кусты, убивая вредителей. Это позволяет нам полностью отказаться от химии. Только природа, мороз и солнце.",
    img: "https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04858-1.jpg?q=80&w=2574&auto=format&fit=crop",
    alt: "Чай под снегом или в тумане"
  },
  {
    id: 3,
    year: "3",
    title: "Верхних листа",
    description: "Мы не используем машины. Только чуткие руки наших чаеводов собирают флеши — почку и два верхних листочка. Именно в них сосредоточен весь вкус и польза.",
    img: "https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04832.jpg?q=80&w=2521&auto=format&fit=crop",
    alt: "Ручной сбор чая"
  }
];

// --- DESKTOP КОМПОНЕНТЫ (Sticky Scroll) ---
const DesktopSlide = ({ data, index, progress, range }: { data: typeof slides[0], index: number, progress: MotionValue<number>, range: number[] }) => {
  const opacity = useTransform(progress, range, [0, 1, 0]);
  const scale = useTransform(progress, range, [0.95, 1, 1.05]);
  const xText = useTransform(progress, range, [50, 0, -50]);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center p-20 w-full h-full"
      style={{ opacity, zIndex: index }}
    >
      <div className="container mx-auto grid grid-cols-2 gap-12 items-center">
        <div className="relative h-[60vh] w-full overflow-hidden rounded-sm shadow-2xl shadow-black/50 group border border-white/10 will-change-transform">
          <motion.div style={{ scale }} className="w-full h-full">
            <img src={data.img} alt={data.alt} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-hosta-dark/90 via-transparent to-transparent opacity-80" />
          </motion.div>
          <div className="absolute inset-4 border border-white/20 z-10 pointer-events-none" />
        </div>

        <motion.div style={{ x: xText }} className="text-white z-20 pl-10 relative flex flex-col justify-center will-change-transform">
          <span className="text-[12rem] font-playfair font-bold text-white/5 absolute -top-20 -left-10 select-none z-0 leading-none">{data.year}</span>
          <h2 className="text-6xl font-playfair font-bold mb-8 text-hosta-gold relative z-10 leading-tight">{data.title}</h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-hosta-gold to-transparent mb-8" />
          <p className="text-xl text-gray-300 font-light leading-relaxed relative z-10 font-inter">{data.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- MOBILE КОМПОНЕНТЫ (Vertical Timeline) ---
const MobileSlide = ({ data, index }: { data: typeof slides[0], index: number }) => {
  return (
    <div className="relative py-16 pl-8 border-l border-white/10 ml-4 last:border-0">
      {/* Точка на таймлайне */}
      <div className="absolute left-[-5px] top-16 w-2.5 h-2.5 rounded-full bg-hosta-gold shadow-[0_0_10px_rgba(207,161,86,0.8)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-6xl font-playfair font-bold text-white/10 block mb-[-20px] select-none">{data.year}</span>
        
        <div className="relative h-[250px] w-full rounded-sm overflow-hidden mb-6 border border-white/10">
          <img src={data.img} alt={data.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-hosta-dark via-transparent to-transparent opacity-60" />
        </div>

        <h3 className="text-3xl font-playfair font-bold text-hosta-gold mb-4">{data.title}</h3>
        <p className="text-gray-400 font-light leading-relaxed text-sm">{data.description}</p>
      </motion.div>
    </div>
  );
};

// Падающий лист (для десктопа)
const FallingLeaf = ({ delay, xPos }: { delay: number, xPos: string }) => (
  <motion.div
    className="absolute top-[-10%] w-12 h-12 opacity-40 z-30 pointer-events-none"
    style={{ left: xPos }}
    animate={{ y: ['0vh', '100vh'], rotate: [0, 360], x: [0, 30, -30, 0] }}
    transition={{ duration: 15, repeat: Infinity, delay: delay, ease: "linear" }}
  >
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-hosta-gold drop-shadow-lg">
      <path d="M12 2C8 2 4 6 4 12C4 18 10 22 12 22C14 22 20 18 20 12C20 6 16 2 12 2ZM12 20C11 20 6 17 6 12C6 8 8 5 12 4V20Z" />
    </svg>
  </motion.div>
);

export default function Scrollytelling() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <>
      {/* ========================================
        MOBILE VERSION (Visible on small screens)
        Simple Vertical Timeline
        ========================================
      */}
      <section className="bg-hosta-dark py-20 px-4 md:hidden overflow-hidden relative">
        {/* Фон */}
        <div className="absolute inset-0 bg-radial-gradient from-hosta-green/10 to-hosta-dark pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
        
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-playfair text-white">Наша <span className="text-hosta-gold italic">История</span></h2>
          </div>
          
          <div className="pr-4">
            {slides.map((slide, index) => (
              <MobileSlide key={slide.id} data={slide} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
        DESKTOP VERSION (Hidden on mobile)
        Sticky Scrollytelling
        ========================================
      */}
      <section ref={containerRef} className="relative h-[300vh] bg-hosta-dark hidden md:block">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center w-full">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none will-change-transform" />
          <div className="absolute inset-0 bg-radial-gradient from-hosta-green/20 to-hosta-dark z-0" />

          <div className="relative w-full h-full">
              {slides.map((slide, index) => {
                const step = 1 / slides.length;
                const start = index * step;
                const end = start + step;
                return (
                    <DesktopSlide 
                      key={slide.id} 
                      data={slide} 
                      index={index} 
                      progress={scrollYProgress} 
                      range={[start, start + (step * 0.5), end]} 
                    />
                );
              })}
          </div>

          <FallingLeaf delay={0} xPos="10%" />
          <FallingLeaf delay={5} xPos="80%" />
          <FallingLeaf delay={2} xPos="40%" />
          
          <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[1px] h-64 bg-white/10">
            <motion.div 
              className="w-full bg-hosta-gold box-shadow-[0_0_10px_#cfa156]"
              style={{ height: useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]) }}
            />
          </div>
        </div>
      </section>
    </>
  );
}