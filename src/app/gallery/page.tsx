"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, ScrollReveal } from "@/components/motion/ScrollReveal";
import { useState } from "react";
import { X } from "lucide-react";

const galleryItems = [
  { src: "/img/donat_box.png", caption: "Donat Box", alt: "Donat Box" },
  { src: "/img/es_lumut.png", caption: "Es Lumut Segar", alt: "Es Lumut" },
  { src: "/img/piscok_box.png", caption: "Piscok Box", alt: "Piscok Box" },
  { src: "/img/donat_coklat.png", caption: "Donat Coklat", alt: "Donat Coklat" },
  { src: "/img/rice_mentega.png", caption: "Rice Bowl Mentega", alt: "Rice Bowl" },
  { src: "/img/piscok_strawberry.png", caption: "Piscok Strawberry", alt: "Piscok" },
];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#222] to-[#1A1A1A]">
        <div className="container mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[#C8A97E] text-sm uppercase tracking-[0.3em] mb-3">
            Momen Kami
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-[var(--font-heading)] text-5xl md:text-6xl font-bold text-[#F5F0EB]">
            Galeri
          </motion.h1>
        </div>
      </section>

      <section className="py-16 bg-[#1A1A1A] flex-grow">
        <div className="container mx-auto px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {galleryItems.map((item, i) => (
              <StaggerItem key={i}>
                <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#222] border border-[#2A2A2A] cursor-pointer hover:border-[#C8A97E]/30 transition-all duration-500" onClick={() => setLightbox(item.src)}>
                  <Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <p className="text-[#F5F0EB] font-medium text-sm">{item.caption}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <ScrollReveal delay={0.3}>
            <p className="text-center mt-12 text-[#B8B0A6] text-sm italic">
              Temukan lebih banyak di <a href="https://www.instagram.com/lumeriaaaa.id" target="_blank" rel="noopener noreferrer" className="text-[#C8A97E] hover:text-[#E8D5B7]">Instagram</a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {lightbox && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/80 hover:text-white" onClick={() => setLightbox(null)}><X className="w-8 h-8" /></button>
          <div className="relative max-w-4xl max-h-[80vh] w-full aspect-[4/3]">
            <Image src={lightbox} alt="Gallery" fill className="object-contain" sizes="90vw" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
