import Hero from "@/components/hero/Hero";
import Scrollytelling from "@/components/content/Scrollytelling";
import BentoCatalog from "@/components/content/BentoCatalog";
import Journal from "@/components/content/Journal";
import ContactSection from "@/components/content/ContactSection";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Home() {
  const posts = await prisma.post.findMany({
    take: 3,
    orderBy: { id: 'desc' },
  });

  return (
    <div className="flex flex-col min-h-screen bg-hosta-dark">
      {/* 1. Кинематографичный Hero с видео */}
      <Hero />

      {/* 2. История бренда через скролл */}
      <Scrollytelling />

      {/* 3. Каталог в стиле Bento Grid (Светлая секция) */}
      <BentoCatalog />

      {/* 4. Блог / Журнал (Темная секция) */}
      <Journal posts={posts} />

      {/* 5. Форма обратной связи (Атмосферная) */}
      <ContactSection />
    </div>
  );
}