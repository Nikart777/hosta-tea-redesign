import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Шрифты
const inter = Inter({ 
  subsets: ["cyrillic", "latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({ 
  subsets: ["cyrillic", "latin"],
  variable: "--font-playfair",
  display: "swap",
});

// SEO оптимизация на основе старого сайта
export const metadata: Metadata = {
  title: "Хоста Чай | Купить чай от производителя в Сочи",
  description: "Hosta Tea - Ваш выбор настоящего чая в Краснодаре. Широкий ассортимент, высокое качество, доставка по России и СНГ. Органический чай без пестицидов.",
  keywords: ["чай", "Сочи", "Краснодарский чай", "органический чай", "Хоста чай", "купить чай"],
  openGraph: {
    title: "Купить чай от производителя в Сочи с доставкой по России и СНГ",
    description: "Hosta Tea - Ваш выбор настоящего чая. Широкий ассортимент, высокое качество.",
    url: "https://hosta-tea.ru/",
    siteName: "hosta-tea.ru",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "https://hosta-tea.ru/wp-content/uploads/2023/02/free-icon-save-energy-5729466.png", // Лучше потом заменить на качественное фото
        width: 512,
        height: 512,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        {/* Хедер будет поверх контента (absolute/fixed) для киношного эффекта */}
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        {/* Футер пока заглушкой, сделаем позже */}
        <Footer /> 
      </body>
    </html>
  );
}