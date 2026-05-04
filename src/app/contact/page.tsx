"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission
    setStatus("success");
    e.currentTarget.reset();
    
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#6d4c41] text-white py-10 text-center mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Kontak Kami</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Info Section */}
          <section className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-[#3e2723] mb-6">Informasi Kontak</h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <strong className="block text-[#3e2723]">Alamat:</strong>
                Jl. Daan Mogot No.KM. 11 1, RT.12/RW.4, Kedaung Kali Angke, Kecamatan Cengkareng, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11710, Indonesia
              </p>
              <p>
                <strong className="block text-[#3e2723]">Telepon:</strong>
                <a href="https://wa.me/62895367044045?text=Halo%20saya%20ingin%20pesan" target="_blank" rel="noopener noreferrer" className="text-[#8d6e63] hover:underline">
                  0895367044045
                </a>
              </p>
              <p>
                <strong className="block text-[#3e2723]">Instagram:</strong>
                <a href="https://www.instagram.com/lumeriaaaa.id?igsh=aGNlbnRvZnE0MjRj" target="_blank" rel="noopener noreferrer" className="text-[#8d6e63] hover:underline">
                  Lumeria id
                </a>
              </p>
              <p>
                <strong className="block text-[#3e2723]">Jam Operasional:</strong>
                08.00 - 17.00
              </p>
            </div>
          </section>

          {/* Form Section */}
          <section className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-[#3e2723] mb-6">Kirim Pesan kepada Kami</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Lengkap:</Label>
                <Input id="name" name="name" required placeholder="Masukkan nama Anda" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Anda:</Label>
                <Input id="email" name="email" type="email" required placeholder="Masukkan email Anda" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subjek:</Label>
                <Input id="subject" name="subject" placeholder="Subjek pesan Anda" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Pesan Anda:</Label>
                <Textarea id="message" name="message" rows={5} required placeholder="Tulis pesan Anda di sini..." />
              </div>
              
              <Button type="submit" className="bg-[#8d6e63] hover:bg-[#795548] text-white px-8">
                Kirim Pesan
              </Button>

              {status === "success" && (
                <p className="text-green-600 text-sm mt-4">Pesan Anda berhasil dikirim!</p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-sm mt-4">Terjadi kesalahan jaringan atau server. Silakan coba lagi.</p>
              )}
            </form>
          </section>
        </div>

        {/* Map Section */}
        <section className="bg-white p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-2xl font-bold text-[#3e2723] mb-6">Lokasi Kami</h2>
          <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-md">
            <iframe 
              src="https://maps.google.com/maps?q=Telkom%20University%20Jakarta%20Kampus%201&z=17&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
}
