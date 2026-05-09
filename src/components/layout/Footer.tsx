"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  const pathname = usePathname();

  // Don't show footer on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#141414] border-t border-[#2A2A2A]">
      <div className="container mx-auto px-6">
        {/* Pre-order banner */}
        <ScrollReveal>
          <div className="py-8 border-b border-[#2A2A2A] text-center">
            <p className="text-[#C8A97E] text-sm uppercase tracking-[0.3em] mb-2">
              Pre - Order Time
            </p>
            <p className="text-[#F5F0EB] text-lg font-medium tracking-wide">
              EVERY TUESDAY - FRIDAY
            </p>
          </div>
        </ScrollReveal>

        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <ScrollReveal delay={0}>
            <div>
              <h3 className="font-[var(--font-heading)] text-2xl font-bold text-[#C8A97E] mb-4 tracking-wider">
                LUMERIA
              </h3>
              <p className="text-[#B8B0A6] text-sm leading-relaxed max-w-xs">
                Donat lembut, piscok lumer, es lumut segar, dan rice bowl lezat.
                Sweetness in every bite.
              </p>
              <div className="flex gap-4 mt-6">
                <a
                  href="https://www.instagram.com/lumeriaaaa.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-[#B8B0A6] hover:text-[#C8A97E] hover:border-[#C8A97E] transition-all"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/6288976183041"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-[#B8B0A6] hover:text-[#C8A97E] hover:border-[#C8A97E] transition-all"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Page Links */}
          <ScrollReveal delay={0.1}>
            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] text-[#C8A97E] mb-4 font-semibold">
                Navigasi
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Beranda", path: "/" },
                  { name: "Menu", path: "/menu" },
                  { name: "Tentang Kami", path: "/about" },
                  { name: "Galeri", path: "/gallery" },
                  { name: "Kontak", path: "/contact" },
                ].map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className="text-[#B8B0A6] hover:text-[#C8A97E] transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={0.2}>
            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] text-[#C8A97E] mb-4 font-semibold">
                Hubungi Kami
              </h4>
              <div className="space-y-3 text-sm text-[#B8B0A6]">
                <p>Telkom University Jakarta Kampus 1</p>
                <p>Jl. Daan Mogot KM 11, Jakarta Barat</p>
                <p>Jam Operasional: 08.00 - 17.00</p>
                <p>
                  <a
                    href="https://wa.me/6288976183041"
                    className="hover:text-[#C8A97E] transition-colors"
                  >
                    088976183041
                  </a>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-[#2A2A2A] text-center">
          <p className="text-[#666] text-xs">
            © {new Date().getFullYear()} Lumeria. Semua Hak Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
