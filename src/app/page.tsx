"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMenuStore } from "@/store/menu";
import { useHomepageStore } from "@/store/homepage";
import { useCartStore } from "@/store/cart";
import { formatRupiah } from "@/data/menu";
import { toast } from "sonner";
import { MarqueeText } from "@/components/motion/MarqueeText";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/ScrollReveal";
import { Leaf, Heart, Wallet, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { useMounted } from "@/hooks/useMounted";

const iconMap: Record<string, React.ReactNode> = {
  leaf: <Leaf className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  wallet: <Wallet className="w-6 h-6" />,
};

export default function Home() {
  const menuItems = useMenuStore((state) => state.items);
  const content = useHomepageStore((state) => state.content);
  const addItem = useCartStore((state) => state.addItem);
  const mounted = useMounted();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C8A97E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const featuredItems = menuItems.filter((item) =>
    content.featuredItemIds.includes(item.ID)
  );

  const handleAddToCart = (item: (typeof menuItems)[0]) => {
    addItem(item);
    toast.success(`${item.Name} ditambahkan ke keranjang!`);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={content.heroImage}
            alt="Lumeria Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-[#1A1A1A]/50 to-[#1A1A1A]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#C8A97E] text-sm uppercase tracking-[0.3em] mb-6"
          >
            Selamat Datang di Lumeria
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-[var(--font-heading)] text-5xl md:text-7xl lg:text-8xl font-bold text-[#F5F0EB] mb-6 leading-tight"
          >
            {content.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-[#B8B0A6] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {content.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link
              href="/menu"
              className="group inline-flex items-center gap-3 bg-[#C8A97E] text-[#1A1A1A] px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-[#E8D5B7] transition-all duration-300"
            >
              Explore our menu
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-[#C8A97E]/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-[#C8A97E] rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee */}
      <section className="py-6 bg-[#C8A97E] overflow-hidden">
        <MarqueeText
          texts={content.marqueeTexts}
          speed={25}
          separator="✦"
          className="text-[#1A1A1A] font-medium text-sm tracking-wide"
        />
      </section>

      {/* Featured Menu */}
      <section className="py-20 md:py-28 bg-[#1A1A1A]">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[#C8A97E] text-sm uppercase tracking-[0.3em] mb-3">
                Menu Pilihan
              </p>
              <h2 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-[#F5F0EB]">
                Produk Favorit Kami
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
            {featuredItems.map((item) => (
              <StaggerItem key={item.ID}>
                <div className="group bg-[#222222] rounded-2xl overflow-hidden border border-[#2A2A2A] hover:border-[#C8A97E]/30 transition-all duration-500">
                  <div className="relative h-[250px] overflow-hidden">
                    <Image
                      src={item.Image}
                      alt={item.Name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-[#C8A97E] text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-full uppercase">
                        Popular
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-[var(--font-heading)] text-xl font-bold text-[#F5F0EB] mb-2">
                      {item.Name}
                    </h3>
                    <p className="text-[#B8B0A6] text-sm mb-4 leading-relaxed line-clamp-2">
                      {item.Description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#C8A97E] text-xl font-bold">
                        {formatRupiah(item.Price)}
                      </span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-[#C8A97E]/10 text-[#C8A97E] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#C8A97E] hover:text-[#1A1A1A] transition-all duration-300"
                      >
                        + Keranjang
                      </button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-12">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-[#C8A97E] font-medium hover:text-[#E8D5B7] transition-colors text-sm uppercase tracking-wider"
              >
                Lihat semua menu
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-[#161616]">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[#C8A97E] text-sm uppercase tracking-[0.3em] mb-3">
                Testimoni
              </p>
              <h2 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-[#F5F0EB]">
                Apa Kata Mereka
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="relative bg-[#222222] rounded-2xl p-8 md:p-12 border border-[#2A2A2A]">
                <Quote className="w-10 h-10 text-[#C8A97E]/30 mb-6" />
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-[#F5F0EB] text-lg md:text-xl leading-relaxed mb-8 italic">
                    &ldquo;{content.testimonials[activeTestimonial]?.text}&rdquo;
                  </p>
                  <div>
                    <p className="text-[#C8A97E] font-semibold">
                      {content.testimonials[activeTestimonial]?.name}
                    </p>
                    <p className="text-[#B8B0A6] text-sm">
                      {content.testimonials[activeTestimonial]?.role}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-3 mt-8">
                {content.testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === activeTestimonial
                        ? "bg-[#C8A97E] scale-110"
                        : "bg-[#333] hover:bg-[#555]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 bg-[#1A1A1A]">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[#C8A97E] text-sm uppercase tracking-[0.3em] mb-3">
                Mengapa Lumeria
              </p>
              <h2 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-[#F5F0EB]">
                Lihat keunggulan kami
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {content.features.map((feature) => (
              <StaggerItem key={feature.id}>
                <div className="bg-[#222222] rounded-2xl p-8 border border-[#2A2A2A] hover:border-[#C8A97E]/30 transition-all duration-500 text-center group">
                  <div className="w-14 h-14 bg-[#C8A97E]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#C8A97E] group-hover:bg-[#C8A97E]/20 transition-colors">
                    {iconMap[feature.icon] || <Leaf className="w-6 h-6" />}
                  </div>
                  <h3 className="font-[var(--font-heading)] text-xl font-bold text-[#F5F0EB] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#B8B0A6] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#161616]">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[#C8A97E] text-sm uppercase tracking-[0.3em] mb-3">
                Tentang Kami
              </p>
              <h2 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-[#F5F0EB] mb-6">
                Lebih dari sekedar makanan
              </h2>
              <p className="text-[#B8B0A6] text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                Lumeria hadir menyajikan berbagai pilihan makanan dan minuman
                favorit dengan cita rasa terbaik untuk menemani harimu.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 border-2 border-[#C8A97E] text-[#C8A97E] px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-[#C8A97E] hover:text-[#1A1A1A] transition-all duration-300"
              >
                More about us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
