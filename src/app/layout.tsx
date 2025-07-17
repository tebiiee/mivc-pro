import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BilingualProvider } from "../contexts/BilingualContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
        className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <BilingualProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </BilingualProvider>
      </body>
    </html>
  );
}
