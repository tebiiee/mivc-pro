import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "micv.pro - Crea tu CV profesional con IA",
  description: "Genera currículums vitae profesionales usando inteligencia artificial. Describe tu experiencia en lenguaje natural y obtén un CV listo para descargar en PDF.",
  keywords: ["CV", "currículum", "inteligencia artificial", "IA", "PDF", "trabajo", "empleo"],
  authors: [{ name: "micv.pro" }],
  openGraph: {
    title: "micv.pro - Crea tu CV profesional con IA",
    description: "Genera currículums vitae profesionales usando inteligencia artificial",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
