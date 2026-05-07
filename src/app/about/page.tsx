"use client";

import { motion } from "framer-motion";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/ScrollReveal";

const teamData = [
  {
    level: "Ketua",
    members: [{ name: "Shafwan Nanditama", nim: "103062400027" }],
  },
  {
    level: "Divisi Produksi",
    members: [
      { name: "Sultan Muhamad Andrila", nim: "103062400040" },
      { name: "Dede Rizki", nim: "103062400093" },
    ],
  },
  {
    level: "Divisi Keuangan",
    members: [
      { name: "Khalisa Rahima Zahra", nim: "103062430005" },
      { name: "Althaf Razanullaya Rizqi M.", nim: "103062400032" },
    ],
  },
  {
    level: "Divisi Packaging",
    members: [
      { name: "Rifki Fahrezi", nim: "103062400011" },
      { name: "Muhammad Rabbani Ahadiat", nim: "103062400067" },
    ],
  },
];

export default function AboutPage() {
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
            Mengenal Lebih Dekat
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-[var(--font-heading)] text-5xl md:text-6xl font-bold text-[#F5F0EB]"
          >
            Tentang Kami
          </motion.h1>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="bg-[#222] rounded-2xl p-8 md:p-12 border border-[#2A2A2A]">
                <h2 className="font-[var(--font-heading)] text-3xl font-bold text-[#C8A97E] mb-6 text-center">
                  Filosofi Kami
                </h2>
                <p className="text-[#B8B0A6] leading-relaxed text-lg text-justify">
                  Lumeria hadir dengan semangat menghadirkan makanan yang
                  sederhana namun penuh rasa dan kebahagiaan. Berdiri dengan
                  konsep kekinian, kami ingin menciptakan tempat di mana setiap
                  orang bisa menikmati camilan dan makanan favorit dengan
                  kualitas terbaik dan harga terjangkau. Kami percaya bahwa
                  makanan bukan hanya sekadar untuk mengenyangkan, tetapi juga
                  menjadi bagian dari momen berharga—baik saat santai, berkumpul
                  bersama teman, maupun menikmati waktu sendiri.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-20 bg-[#161616]">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[#C8A97E] text-sm uppercase tracking-[0.3em] mb-3">
                Arah & Tujuan
              </p>
              <h2 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-[#F5F0EB]">
                Visi dan Misi
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            staggerDelay={0.2}
          >
            <StaggerItem>
              <div className="bg-[#222] rounded-2xl p-8 border border-[#2A2A2A] h-full">
                <div className="w-12 h-12 bg-[#C8A97E]/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-[#C8A97E] text-xl">🎯</span>
                </div>
                <h3 className="font-[var(--font-heading)] text-2xl font-bold text-[#F5F0EB] mb-4">
                  Visi
                </h3>
                <p className="text-[#B8B0A6] leading-relaxed">
                  Menjadi brand kuliner kekinian yang dikenal luas karena cita
                  rasa lezat, kualitas konsisten, dan pengalaman pelanggan yang
                  menyenangkan.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-[#222] rounded-2xl p-8 border border-[#2A2A2A] h-full">
                <div className="w-12 h-12 bg-[#C8A97E]/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-[#C8A97E] text-xl">🚀</span>
                </div>
                <h3 className="font-[var(--font-heading)] text-2xl font-bold text-[#F5F0EB] mb-4">
                  Misi
                </h3>
                <ul className="text-[#B8B0A6] space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8A97E] mt-1">•</span>
                    Menyajikan produk berkualitas dengan rasa yang konsisten dan
                    harga terjangkau.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8A97E] mt-1">•</span>
                    Menciptakan pengalaman kuliner yang nyaman dan memuaskan.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8A97E] mt-1">•</span>
                    Terus berinovasi dalam menu makanan dan minuman.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8A97E] mt-1">•</span>
                    Mengutamakan kebersihan, kualitas bahan, dan pelayanan
                    terbaik.
                  </li>
                </ul>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[#C8A97E] text-sm uppercase tracking-[0.3em] mb-3">
                Di Balik Layar
              </p>
              <h2 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-[#F5F0EB]">
                Tim Kami
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-8">
            {teamData.map((group, i) => (
              <ScrollReveal key={group.level} delay={i * 0.1}>
                <div className="text-center">
                  <span className="inline-block bg-[#C8A97E]/10 text-[#C8A97E] text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-4 font-medium">
                    {group.level}
                  </span>
                  <div
                    className={`grid gap-4 justify-center ${
                      group.members.length === 1
                        ? "grid-cols-1 max-w-xs mx-auto"
                        : "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto"
                    }`}
                  >
                    {group.members.map((member) => (
                      <div
                        key={member.nim}
                        className="bg-[#222] rounded-xl p-6 border border-[#2A2A2A] hover:border-[#C8A97E]/30 transition-all duration-300"
                      >
                        <div className="w-14 h-14 bg-[#C8A97E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-[#C8A97E] font-bold text-lg">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <p className="font-semibold text-[#F5F0EB]">
                          {member.name}
                        </p>
                        <p className="text-[#B8B0A6] text-sm mt-1">
                          {member.nim}
                        </p>
                      </div>
                    ))}
                  </div>
                  {i < teamData.length - 1 && (
                    <div className="w-px h-8 bg-[#333] mx-auto mt-4" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
