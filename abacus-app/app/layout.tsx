import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Абакус - Интерактивное обучение счету",
  description: "Древнее искусство быстрого счета с помощью абакуса (соробана)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
