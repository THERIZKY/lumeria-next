import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumeria — Sweetness in Every Bite",
  description:
    "Nikmati donat lembut, piscok lumer, es lumut segar, dan rice bowl lezat. Pesan sekarang!",
  keywords: ["lumeria", "donat", "piscok", "es lumut", "rice bowl", "makanan"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans bg-[#1A1A1A] text-[#F5F0EB] min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster
          position="bottom-center"
          richColors
          toastOptions={{
            style: {
              background: "#222222",
              border: "1px solid #333333",
              color: "#F5F0EB",
            },
          }}
        />
      </body>
    </html>
  );
}
