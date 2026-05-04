"use client";

import Image from "next/image";
import { MENU_ITEMS, CATEGORIES, formatRupiah } from "@/data/menu";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";

export default function MenuPage() {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = async (item: any) => {
    // Simulasi async process jika diperlukan
    await new Promise(resolve => setTimeout(resolve, 150)); 
    addItem(item);
    toast.success(`${item.Name} telah ditambahkan ke keranjang!`, {
      description: "Lihat keranjang untuk melakukan pembayaran.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#6d4c41] text-white py-10 text-center mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Lumeria - Menu</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        {CATEGORIES.map((category) => {
          const categoryItems = MENU_ITEMS.filter((item) => item.Category === category);
          
          if (categoryItems.length === 0) return null;

          return (
            <section key={category} className="mb-12">
              <h2 className="text-3xl font-bold text-center text-[#5C3D2E] mb-8 pb-2 border-b-2 border-[#CCA47D] inline-block relative left-1/2 -translate-x-1/2">
                {category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {categoryItems.map((item) => (
                  <div key={item.ID} className="bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-[0_6px_15px_rgba(0,0,0,0.12)]">
                    <div className="relative h-[200px] w-full border-b border-gray-100">
                      <Image
                        src={item.Image}
                        alt={item.Name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{item.Name}</h3>
                      <p className="text-gray-600 text-sm mb-4 flex-grow text-center leading-relaxed">
                        {item.Description}
                      </p>
                      
                      <div className="text-yellow-400 mb-4 text-xl text-center">
                        {"★".repeat(Math.floor(item.Rating))}
                        {item.Rating % 1 >= 0.5 ? "★" : "☆"}
                        {"☆".repeat(4 - Math.floor(item.Rating))}
                        <span className="text-gray-500 text-sm ml-2">({item.Rating})</span>
                      </div>
                      
                      <span className="text-2xl font-bold text-[#5C3D2E] mb-4 text-center block">
                        {formatRupiah(item.Price)}
                      </span>
                      
                      <Button 
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-[#CCA47D] hover:bg-[#B5936E] text-white py-6 text-lg transition-all hover:-translate-y-0.5"
                      >
                        Tambah ke Keranjang
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
