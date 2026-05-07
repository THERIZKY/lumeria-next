"use client";

import Image from "next/image";
import { CATEGORIES, formatRupiah } from "@/data/menu";
import { useMenuStore } from "@/store/menu";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useMounted } from "@/hooks/useMounted";

export default function MenuPage() {
  const menuItems = useMenuStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C8A97E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleAddToCart = (item: (typeof menuItems)[0]) => {
    addItem(item);
    toast.success(`${item.Name} ditambahkan ke keranjang!`);
  };

  const filteredItems =
    activeCategory === "Semua"
      ? menuItems
      : menuItems.filter((item) => item.Category === activeCategory);

  const allCategories = ["Semua", ...CATEGORIES];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#222] to-[#1A1A1A]">
        <div className="container mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#C8A97E] text-sm uppercase tracking-[0.3em] mb-3"
          >
            Jelajahi Menu Kami
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-[var(--font-heading)] text-5xl md:text-6xl font-bold text-[#F5F0EB] mb-4"
          >
            Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#B8B0A6] text-lg max-w-xl mx-auto"
          >
            Pilih dari berbagai macam donat, piscok, rice bowl, dan minuman
            segar favorit kamu.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-[60px] z-30 bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#2A2A2A] py-4">
        <div className="container mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto no-scrollbar justify-center">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#C8A97E] text-[#1A1A1A]"
                    : "bg-[#222] text-[#B8B0A6] hover:bg-[#333] hover:text-[#F5F0EB]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-16 bg-[#1A1A1A] flex-grow">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.ID}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group bg-[#222222] rounded-2xl overflow-hidden border border-[#2A2A2A] hover:border-[#C8A97E]/30 transition-all duration-500"
                >
                  <div className="relative h-[220px] overflow-hidden">
                    <Image
                      src={item.Image}
                      alt={item.Name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#1A1A1A]/80 backdrop-blur-sm text-[#C8A97E] text-xs font-medium px-3 py-1 rounded-full">
                        {item.Category}
                      </span>
                    </div>
                    {item.Rating >= 4.7 && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-[#C8A97E] text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-full">
                          Popular
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-[var(--font-heading)] text-lg font-bold text-[#F5F0EB]">
                        {item.Name}
                      </h3>
                      <div className="flex items-center gap-1 text-[#C8A97E] text-sm">
                        <span>★</span>
                        <span>{item.Rating}</span>
                      </div>
                    </div>
                    <p className="text-[#B8B0A6] text-sm mb-4 leading-relaxed line-clamp-2">
                      {item.Description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#C8A97E] text-lg font-bold">
                        {formatRupiah(item.Price)}
                      </span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center gap-2 bg-[#C8A97E]/10 text-[#C8A97E] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#C8A97E] hover:text-[#1A1A1A] transition-all duration-300"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Tambah
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#B8B0A6] text-lg">
                Tidak ada menu di kategori ini.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
