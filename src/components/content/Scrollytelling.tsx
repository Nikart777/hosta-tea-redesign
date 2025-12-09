"use client";

import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Leaf, Award, Compass } from "lucide-react";

type Align = "left" | "center" | "right";

type StoryStep = {
  headline: string;
  subtext: string;
  color: string;
  align: Align;
};

const StorySteps: StoryStep[] = [
  {
    headline: "Мы поднялись на 500 метров над уровнем моря. Только так.",
    subtext:
      "Там, где чистейший воздух и снежные вершины Кавказа защищают наш урожай от мира.",
    color: "text-ochre",
    align: "left",
  },
  {
    headline: "Холод - наш единственный пестицид.",
    subtext:
      "Зимние температуры смертельны для вредителей. Именно поэтому наш чай абсолютно органический.",
    color: "text-jade-light",
    align: "center",
  },
  {
    headline: "Традиция, начатая в 1947 году, не подлежит изменению.",
    subtext:
      "Мы единственное предприятие, сохранившее рецептуру и ручной сбор, чтобы предложить вам не купажированный чай высшего сорта.",
    color: "text-terracotta",
    align: "right",
  },
];

const totalSteps = StorySteps.length;
const sectionHeightFactor = totalSteps + 1.5;

interface StoryStepLayerProps {
  step: StoryStep;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function StoryStepLayer({
  step,
  index,
  total,
  scrollYProgress,
}: StoryStepLayerProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const exitStart = end - 0.15;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.1, exitStart, end],
    [0, 1, 1, 0]
  );

  const xShift = useTransform(
    scrollYProgress,
    [start, start + 0.1, end],
    [
      step.align === "left" ? -100 : step.align === "right" ? 100 : 0,
      0,
      step.align === "left" ? 80 : step.align === "right" ? -80 : 0,
    ]
  );

  const scale = useTransform(
    scrollYProgress,
    [start, start + 0.1, end],
    [0.96, 1, 0.96]
  );

  const alignment =
    step.align === "left"
      ? "justify-start md:items-start"
      : step.align === "right"
      ? "justify-end md:items-end"
      : "justify-center md:items-center";

  const textAlignment =
    step.align === "right"
      ? "md:text-right"
      : step.align === "center"
      ? "text-center md:text-center"
      : "md:text-left";

  const icon =
    index === 0 ? (
      <Leaf className="h-8 w-8 text-ochre" />
    ) : index === 1 ? (
      <Compass className="h-8 w-8 text-jade-light" />
    ) : (
      <Award className="h-8 w-8 text-terracotta" />
    );

  const glowColor =
    step.color === "text-ochre"
      ? "rgba(212,175,55,0.45)"
      : step.color === "text-jade-light"
      ? "rgba(74,122,98,0.4)"
      : "rgba(198,93,59,0.4)";

  return (
    <motion.div
      className={`absolute inset-0 flex items-center px-4 md:px-12 ${alignment}`}
      style={{ opacity, scale }}
    >
      <motion.div
        style={{ x: xShift }}
        className={`max-w-4xl md:max-w-3xl ${textAlignment}`}
      >
        <div className="inline-flex items-center gap-3 mb-5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-emerald-100 shadow-lg shadow-emerald-200/60">
          {icon}
          <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.25em] text-emerald-700">
            Hosta Tea · История вкуса
          </span>
        </div>

        <h3
          className={`font-serif text-3xl md:text-6xl xl:text-7xl font-light leading-none mb-6 drop-shadow-sm ${step.color}`}
          style={{
            textShadow: `0 0 22px ${glowColor}`,
          }}
        >
          {step.headline}
        </h3>

        <p className="font-sans text-base md:text-xl font-light text-stone-800 leading-relaxed md:leading-snug max-w-xl md:max-w-2xl mx-auto md:mx-0">
          {step.subtext}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Scrollytelling() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundMoveX = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const backgroundMoveY = useTransform(scrollYProgress, [0, 1], ["0%", "4%"]);

  // "Листья" и формы на фоне
  const leafDriftX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const leafDriftY = useTransform(scrollYProgress, [0, 1], ["6%", "-4%"]);

  const hillDriftX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const hillDriftY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const ctaOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.8, 0.95], [40, 0]);

  const progressHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      ref={containerRef}
      style={{ height: `${sectionHeightFactor * 100}vh` }}
      className="relative w-full bg-stone-50 text-stone-900"
    >
      {/* Sticky фон - один слой, внутри все анимации и CTA */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Основное фото гор, но светлее */}
        <motion.img
          src="https://images.unsplash.com/photo-1627435163155-0c7d5c9f5f0b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Туманные горы Сочи"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            x: backgroundMoveX,
            y: backgroundMoveY,
            scale: 1.06,
            filter:
              "brightness(0.95) contrast(1.03) saturate(1.02)",
          }}
        />

        {/* Светлый тематический градиент поверх фото */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/90 via-emerald-50/85 to-sky-50/90" />

        {/* Легкая виньетка для читаемости текста */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85)_0,_transparent_55%),radial-gradient(circle_at_bottom,_rgba(209,250,229,0.85)_0,_transparent_55%)]" />

        {/* Интерактивные формы - листья, холмы */}
        <motion.div
          className="pointer-events-none absolute -right-16 md:-right-24 top-1/4 h-40 w-40 md:h-56 md:w-56 rounded-[999px] border border-emerald-300/60 bg-emerald-100/50 blur-[1px] shadow-lg shadow-emerald-200/70"
          style={{ x: leafDriftX, y: leafDriftY }}
        />
        <motion.div
          className="pointer-events-none absolute -left-24 bottom-[-3rem] md:-left-32 md:bottom-[-4rem] h-44 w-72 md:h-56 md:w-[26rem] rounded-[50%] bg-gradient-to-r from-amber-100/90 via-emerald-50/90 to-white/0 shadow-[0_40px_120px_rgba(251,191,36,0.55)]"
          style={{ x: hillDriftX, y: hillDriftY }}
        />

        {/* Верхний бренд-бар */}
        <div className="absolute top-5 left-0 right-0 z-20 flex items-center justify-between px-5 md:px-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/85 border border-emerald-100 backdrop-blur-md shadow-sm shadow-emerald-100/80">
            <Leaf className="h-5 w-5 text-ochre" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.24em] uppercase text-emerald-800">
              Hosta Tea
            </span>
          </div>

          <span className="hidden md:inline-flex items-center gap-2 font-sans text-[10px] text-emerald-800/80 uppercase tracking-[0.24em]">
            <span className="h-[1px] w-10 bg-emerald-300/70" />
            Кавказский чай · Высокогорный терруар
          </span>
        </div>

        {/* Вертикальный прогресс по истории */}
        <div className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3">
          <span className="font-sans text-[9px] tracking-[0.28em] uppercase text-emerald-700/80">
            Путь истории
          </span>
          <div className="relative h-40 w-[2px] rounded-full bg-emerald-100 overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-ochre"
              style={{ height: progressHeight }}
            />
          </div>
        </div>

        {/* Слой с шагами сторителлинга */}
        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-6">
          {StorySteps.map((step, index) => (
            <StoryStepLayer
              key={index}
              step={step}
              index={index}
              total={totalSteps}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Финальный CTA каталога - живет строго в этом блоке */}
        <motion.div
          className="absolute inset-0 flex items-end md:items-center justify-center px-6 pb-16 md:pb-24"
          style={{
            opacity: ctaOpacity,
            y: ctaY,
          }}
        >
          <div className="max-w-xl w-full text-center pointer-events-auto">
            <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full bg-white/85 border border-emerald-100 backdrop-blur-md shadow-sm shadow-emerald-100/80">
              <Compass className="h-4 w-4 text-ochre" />
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.26em] text-emerald-800">
                Откройте терруар гор Сочи
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-4xl text-emerald-900 mb-4">
              Исследуйте вкусы гор Сочи.
            </h3>

            <p className="font-sans text-sm md:text-base text-stone-700 mb-6">
              Выберите чай, который несет в себе высоту, холод и ручной сбор - прямо из долин Хосты в вашу чашку.
            </p>

            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ochre px-10 py-4 font-sans text-sm md:text-base font-semibold text-white tracking-wide transition-all hover:bg-ochre/90 hover:-translate-y-[1px] shadow-xl shadow-amber-300/60"
            >
              В каталог Hosta Tea
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
