"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, ScrollReveal } from "@/components/motion/ScrollReveal";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

export default function GalleryPage() {
  const mounted = useMounted();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mounted) return;
    const fetchData = async () => {
      try {
        const [galleryRes, settingsRes] = await Promise.all([
          fetch("/api/gallery"),
          fetch("/api/settings")
        ]);
        const galleryData = await galleryRes.json();
        const settingsData = await settingsRes.json();
        
        setGalleryItems(galleryData);
        setSettings(settingsData);
      } catch (error) {
        console.error("Failed to fetch gallery data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [mounted]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C8A97E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
            {galleryItems.map((item) => (
              <StaggerItem key={item.id}>
                <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#222] border border-[#2A2A2A] cursor-pointer hover:border-[#C8A97E]/30 transition-all duration-500" onClick={() => setLightbox(item.src)}>
                  <Image src={item.src} alt={item.alt || item.caption} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <p className="text-[#F5F0EB] font-medium text-sm">{item.caption}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          {galleryItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#B8B0A6] text-lg">Belum ada foto di galeri.</p>
            </div>
          )}

          <ScrollReveal delay={0.3}>
            <p className="text-center mt-12 text-[#B8B0A6] text-sm italic">
              Temukan lebih banyak di <a href={`https://www.instagram.com/${settings.contactInstagram?.replace('@', '') || 'lumeriaaaa.id'}`} target="_blank" rel="noopener noreferrer" className="text-[#C8A97E] hover:text-[#E8D5B7]">Instagram</a>
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
