"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MapPin, Phone, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("success");
    e.currentTarget.reset();
    setTimeout(() => setFormStatus("idle"), 5000);
  };

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
            Hubungi Kami
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-[var(--font-heading)] text-5xl md:text-6xl font-bold text-[#F5F0EB]"
          >
            Kontak
          </motion.h1>
        </div>
      </section>

      <section className="py-16 bg-[#1A1A1A] flex-grow">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Contact Info */}
            <ScrollReveal delay={0}>
              <div className="bg-[#222] rounded-2xl p-8 border border-[#2A2A2A] h-full">
                <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[#F5F0EB] mb-8">
                  Informasi Kontak
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#C8A97E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-[#C8A97E]" />
                    </div>
                    <div>
                      <p className="text-[#F5F0EB] font-medium mb-1">Alamat</p>
                      <p className="text-[#B8B0A6] text-sm leading-relaxed">
                        Jl. Daan Mogot No.KM. 11 1, RT.12/RW.4, Kedaung Kali
                        Angke, Kecamatan Cengkareng, Kota Jakarta Barat
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#C8A97E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-[#C8A97E]" />
                    </div>
                    <div>
                      <p className="text-[#F5F0EB] font-medium mb-1">Telepon</p>
                      <a
                        href="https://wa.me/6288976183041"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C8A97E] text-sm hover:text-[#E8D5B7] transition-colors"
                      >
                        088976183041
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#C8A97E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      {/*<Instagram className="w-4 h-4 text-[#C8A97E]" />*/}
                    </div>
                    <div>
                      <p className="text-[#F5F0EB] font-medium mb-1">
                        Instagram
                      </p>
                      <a
                        href="https://www.instagram.com/lumeriaaaa.id"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C8A97E] text-sm hover:text-[#E8D5B7] transition-colors"
                      >
                        @lumeriaaaa.id
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#C8A97E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-[#C8A97E]" />
                    </div>
                    <div>
                      <p className="text-[#F5F0EB] font-medium mb-1">
                        Jam Operasional
                      </p>
                      <p className="text-[#B8B0A6] text-sm">
                        08.00 - 17.00 WIB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={0.1}>
              <div className="bg-[#222] rounded-2xl p-8 border border-[#2A2A2A] h-full">
                <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[#F5F0EB] mb-8">
                  Kirim Pesan
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[#B8B0A6] text-sm mb-2 block">
                      Nama Lengkap
                    </label>
                    <input
                      name="name"
                      required
                      placeholder="Masukkan nama Anda"
                      className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] placeholder:text-[#555] focus:outline-none focus:border-[#C8A97E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[#B8B0A6] text-sm mb-2 block">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Masukkan email Anda"
                      className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] placeholder:text-[#555] focus:outline-none focus:border-[#C8A97E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[#B8B0A6] text-sm mb-2 block">
                      Subjek
                    </label>
                    <input
                      name="subject"
                      placeholder="Subjek pesan Anda"
                      className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] placeholder:text-[#555] focus:outline-none focus:border-[#C8A97E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[#B8B0A6] text-sm mb-2 block">
                      Pesan
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      placeholder="Tulis pesan Anda di sini..."
                      className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] placeholder:text-[#555] focus:outline-none focus:border-[#C8A97E] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#C8A97E] text-[#1A1A1A] px-8 py-3 rounded-xl font-semibold hover:bg-[#E8D5B7] transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Kirim Pesan
                  </button>

                  {formStatus === "success" && (
                    <p className="text-green-400 text-sm mt-2">
                      ✓ Pesan Anda berhasil dikirim!
                    </p>
                  )}
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Map */}
          <ScrollReveal>
            <div className="bg-[#222] rounded-2xl overflow-hidden border border-[#2A2A2A]">
              <div className="p-6 border-b border-[#2A2A2A]">
                <h2 className="font-[var(--font-heading)] text-xl font-bold text-[#F5F0EB]">
                  📍 Lokasi Kami
                </h2>
              </div>
              <div className="w-full h-[400px]">
                <iframe
                  src="https://maps.google.com/maps?q=Telkom%20University%20Jakarta%20Kampus%201&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
