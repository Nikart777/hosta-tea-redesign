import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header"; // <-- Добавлен импорт Header

// Премиальный Serif для заголовков
const playfair = Playfair_Display({ 
  subsets: ["cyrillic", "latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Чистый Sans для текста
const manrope = Manrope({ 
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Хоста Чай | Органический чай из Сочи",
  description: "Самый северный органический чай в мире. Ручной сбор, вековые традиции.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${playfair.variable} ${manrope.variable} antialiased bg-stone-50 text-stone-900`}>
        {/* Обертка для реализации "Sticky Footer" */}
        <div className="flex min-h-screen flex-col">
          <Header /> {/* <-- Header добавлен здесь */}
          {/* Добавляем padding-top, равный высоте хедера, чтобы контент не наползал */}
          <main className="flex-grow pt-[80px]"> 
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}