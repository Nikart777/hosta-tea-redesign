import Hero from "@/components/hero/Hero";
import Scrollytelling from "@/components/content/Scrollytelling";
import BentoCatalog from "@/components/content/BentoCatalog"; // <-- Новый импорт

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Hero />
      
      {/* Блок Scrollytelling */}
      <Scrollytelling />

      {/* Блок Каталога (Bento Grid) */}
      <BentoCatalog />

      {/* Временная заглушка в конце */}
      <section className="h-40"></section>
    </main>
  );
}