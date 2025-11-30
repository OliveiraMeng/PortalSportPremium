import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal Premium Sport | Exclusividade em Movimento",
  description: "Marketplace de veículos esportivos de alta performance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} bg-slate-950 text-slate-100 antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
