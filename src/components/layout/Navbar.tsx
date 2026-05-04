"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const getCartCount = useCartStore((state) => state.getItemCount);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Beranda", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Tentang Kami", path: "/about" },
    { name: "Galeri", path: "/gallery" },
    { name: "Kontak", path: "/contact" },
  ];

  return (
    <nav className="bg-[#3e2723] text-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center gap-6 md:gap-10 flex-wrap">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`font-bold transition-colors hover:text-[#e0b28e] ${
                pathname === item.path ? "text-[#e0b28e]" : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/cart"
            className={`font-bold flex items-center gap-2 transition-colors hover:text-[#e0b28e] ${
              pathname === "/cart" ? "text-[#e0b28e]" : "text-white"
            }`}
          >
            Keranjang
            {mounted && getCartCount() > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
