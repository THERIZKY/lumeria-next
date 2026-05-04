"use client";

import Link from "next/link";
import Image from "next/image";
import { MENU_ITEMS } from "@/data/menu";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";

export default function Home() {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = async (item: any) => {
    await new Promise(resolve => setTimeout(resolve, 150));
    addItem(item);
    toast.success(`${item.Name} telah ditambahkan ke keranjang!`, {
      description: "Lihat keranjang untuk melakukan pembayaran.",
    });
  };
  const featuredItems = MENU_ITEMS.filter((item) =>
    ["donat-box", "es-lumut-original", "piscok-box"].includes(item.ID)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="relative h-[400px] flex items-center justify-center flex-col text-center text-white p-5 overflow-hidden">
        <div 
          className="absolute inset-0 bg-black/50 z-10"
        />
        <div 
          className="absolute inset-0 bg-[url('/img/donat_bg.png')] bg-cover bg-center"
        />
        <div className="relative z-20 max-w-3xl">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-md">Selamat Datang di Lumeria!</h1>
          <p className="text-xl mb-8 drop-shadow-sm">
            Nikmati donat lembut, piscok lumer, es lumut segar, dan rice bowl lezat dalam satu tempat.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 flex-grow flex flex-col gap-10">
        {/* Promo Section */}
        <section className="bg-[#ffe0b2] text-[#3e2723] p-8 rounded-lg text-center shadow-sm">
          <h2 className="text-3xl font-bold mb-4">Promo Spesial Bulan Ini!</h2>
          <p className="mb-6 text-lg">
            Promo Spesial Lumeria! Nikmati kelezatan Donat, Piscok, Es Lumut & Rice Bowl dengan harga terbaik hari ini!
          </p>
          <Link href="/menu">
            <Button className="bg-[#6d4c41] hover:bg-[#5d4037] text-white">
              Cek Promonya
            </Button>
          </Link>
        </section>

        {/* About Preview */}
        <section className="bg-white p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#3e2723]">Tentang Kami</h2>
          <p className="mb-6 max-w-3xl mx-auto text-gray-700">
            Lumeria hadir menyajikan berbagai pilihan makanan dan minuman favorit seperti donat lembut, piscok lumer, es lumut segar, dan rice bowl kekinian dengan cita rasa terbaik untuk menemani harimu.
          </p>
          <Link href="/about">
            <Button className="bg-[#8d6e63] hover:bg-[#795548] text-white">
              Pelajari Lebih Lanjut
            </Button>
          </Link>
        </section>

        {/* Featured Menu */}
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-3xl font-bold mb-8 text-[#3e2723] text-center">Menu Pilihan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <div key={item.ID} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform hover:-translate-y-1">
                <div className="relative h-[200px] w-full border-b border-gray-100">
                  <Image
                    src={item.Image}
                    alt={item.Name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.Name}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">{item.Description}</p>
                  <div className="text-yellow-400 mb-4 text-lg">
                    {"★".repeat(Math.floor(item.Rating))}
                    {"☆".repeat(5 - Math.floor(item.Rating))}
                    <span className="text-gray-500 text-sm ml-2">({item.Rating})</span>
                  </div>
                  <span className="text-xl font-bold text-[#5C3D2E] mb-4">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.Price)}
                  </span>
                  <Button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-[#CCA47D] hover:bg-[#B5936E] text-white"
                  >
                    Tambah ke Keranjang
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
