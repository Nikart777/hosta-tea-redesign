import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext"; // Импорт провайдера

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

export const metadata: Metadata = {
  title: "Хоста Чай | Купить чай от производителя в Сочи",
  description: "Органический Краснодарский чай. Ручной сбор.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <CartProvider>
          {/* Хедер внутри провайдера, чтобы иметь доступ к корзине */}
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer /> 
        </CartProvider>
      </body>
    </html>
  );
}