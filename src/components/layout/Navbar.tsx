"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

export function Navbar() {
  const pathname = usePathname();
  const getCartCount = useCartStore((state) => state.getItemCount);
  const mounted = useMounted();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show main navbar on admin pages
  if (pathname.startsWith("/admin")) return null;

  const navItems = [
    { name: "Beranda", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Tentang", path: "/about" },
    { name: "Galeri", path: "/gallery" },
    { name: "Kontak", path: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#1A1A1A]/95 backdrop-blur-md shadow-lg shadow-black/20 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="group">
              <span className="font-[var(--font-heading)] text-2xl font-bold tracking-wider text-[#C8A97E] group-hover:text-[#E8D5B7] transition-colors">
                LUMERIA
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative text-sm font-medium tracking-wide uppercase transition-colors hover:text-[#C8A97E] ${
                    pathname === item.path
                      ? "text-[#C8A97E]"
                      : "text-[#F5F0EB]/80"
                  }`}
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C8A97E]"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}

              {/* Cart */}
              <Link
                href="/cart"
                className={`relative flex items-center gap-2 text-sm font-medium tracking-wide uppercase transition-colors hover:text-[#C8A97E] ${
                  pathname === "/cart"
                    ? "text-[#C8A97E]"
                    : "text-[#F5F0EB]/80"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Keranjang</span>
                {mounted && getCartCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-3 bg-[#C8A97E] text-[#1A1A1A] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                  >
                    {getCartCount()}
                  </motion.span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#F5F0EB] p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#1A1A1A]/98 backdrop-blur-lg pt-20 md:hidden"
          >
            <div className="flex flex-col items-center gap-6 py-10">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`text-xl font-medium tracking-wide uppercase transition-colors ${
                      pathname === item.path
                        ? "text-[#C8A97E]"
                        : "text-[#F5F0EB]/80 hover:text-[#C8A97E]"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-xl font-medium tracking-wide uppercase text-[#F5F0EB]/80 hover:text-[#C8A97E] transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Keranjang
                  {mounted && getCartCount() > 0 && (
                    <span className="bg-[#C8A97E] text-[#1A1A1A] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
