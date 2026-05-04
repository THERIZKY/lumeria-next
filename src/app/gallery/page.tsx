"use client";

import Image from "next/image";

export default function GalleryPage() {
  const galleryItems = [
    { src: "/img/gallery1.jpg", caption: "Suasana Nyaman", alt: "Suasana Kedai" },
    { src: "/img/gallery2.jpg", caption: "Proses Peracikan Kopi", alt: "Barista Sedang Meracik" },
    { src: "/img/gallery3.jpg", caption: "Seni Latte", alt: "Latte Art" },
    { src: "/img/gallery4.jpg", caption: "Waktu Santai", alt: "Kopi dan Buku" },
    { src: "/img/gallery5.jpg", caption: "Desain Interior", alt: "Interior Kedai" },
    { src: "/img/gallery6.jpg", caption: "Tempat Berkumpul", alt: "Pertemuan Teman" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#6d4c41] text-white py-10 text-center mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Lumeria - Galeri</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-3xl font-bold text-center text-[#3e2723] mb-8">Momen-Momen Indah di Kopi Asik</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div key={index} className="relative group rounded-lg overflow-hidden shadow-md aspect-[4/3] bg-gray-100">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  // Use unoptimized or handle fallback if images don't exist
                  unoptimized={true}
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.caption}
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center mt-10 italic text-gray-500">
            Temukan lebih banyak momen kami di media sosial!
          </p>
        </section>
      </main>
    </div>
  );
}
