export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#6d4c41] text-white py-10 text-center mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Lumeria - Tentang Kami</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="bg-white p-8 rounded-lg shadow-sm mb-12 text-justify">
          <h2 className="text-3xl font-bold text-center text-[#3e2723] mb-6">Filosofi Kami</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Lumeria hadir dengan semangat menghadirkan makanan yang sederhana namun penuh rasa dan kebahagiaan. Berdiri dengan konsep kekinian, kami ingin menciptakan tempat di mana setiap orang bisa menikmati camilan dan makanan favorit dengan kualitas terbaik dan harga terjangkau. Kami percaya bahwa makanan bukan hanya sekadar untuk mengenyangkan, tetapi juga menjadi bagian dari momen berharga—baik saat santai, berkumpul bersama teman, maupun menikmati waktu sendiri. Dengan bahan pilihan dan proses yang higienis, Lumeria selalu berkomitmen menyajikan donat lembut, piscok crispy, rice bowl lezat, dan minuman segar yang siap memanjakan lidah Anda.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-[#3e2723] mb-8">Misi dan Visi Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#fbf7f4] border border-[#e0b28e] rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-center text-[#3e2723] mb-4">Visi</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Menjadi brand kuliner kekinian yang dikenal luas karena cita rasa lezat, kualitas konsisten, dan pengalaman pelanggan yang menyenangkan.
              </p>
            </div>
            <div className="bg-[#fbf7f4] border border-[#e0b28e] rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-center text-[#3e2723] mb-4">Misi</h3>
              <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2">
                <li>Menyajikan produk berkualitas dengan rasa yang konsisten dan harga terjangkau.</li>
                <li>Menciptakan pengalaman kuliner yang nyaman dan memuaskan bagi pelanggan</li>
                <li>Terus berinovasi dalam menu makanan dan minuman</li>
                <li>Mengutamakan kebersihan, kualitas bahan, dan pelayanan terbaik</li>
                <li>Menjadi pilihan utama untuk camilan dan makanan sehari-hari</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tree Organization Structure - simplified for react */}
        <section className="bg-white p-8 rounded-lg shadow-sm text-center overflow-x-auto">
          <h2 className="text-3xl font-bold text-[#3e2723] mb-12">Tim Kami</h2>
          
          <div className="flex flex-col items-center min-w-[800px]">
            {/* Level 1 */}
            <div className="bg-[#e0b28e] text-[#3e2723] p-4 rounded shadow-md w-64 mb-8 relative">
              <span className="font-bold block">Ketua</span>
              Shafwan nanditama (103062400027)
              <div className="absolute w-0.5 h-8 bg-[#8d6e63] left-1/2 -bottom-8"></div>
            </div>

            <div className="w-[600px] h-0.5 bg-[#8d6e63] mb-8 relative">
              <div className="absolute w-0.5 h-8 bg-[#8d6e63] left-0 top-0"></div>
              <div className="absolute w-0.5 h-8 bg-[#8d6e63] right-0 top-0"></div>
            </div>

            {/* Level 2 */}
            <div className="flex justify-between w-[600px] mb-8 relative">
              <div className="bg-[#f5f5f5] text-[#333] p-4 rounded border border-[#ddd] shadow-sm w-64 relative">
                <span className="font-bold block">Divisi Produksi 1</span>
                Sultan Muhamad Andrila (103062400040)
                <div className="absolute w-0.5 h-8 bg-[#8d6e63] left-1/2 -bottom-8"></div>
              </div>
              <div className="bg-[#f5f5f5] text-[#333] p-4 rounded border border-[#ddd] shadow-sm w-64 relative">
                <span className="font-bold block">Divisi Produksi 2</span>
                Dede Rizki (103062400093)
                <div className="absolute w-0.5 h-8 bg-[#8d6e63] left-1/2 -bottom-8"></div>
              </div>
            </div>

            <div className="w-[600px] h-0.5 bg-[#8d6e63] mb-8 relative">
              <div className="absolute w-0.5 h-8 bg-[#8d6e63] left-0 top-0"></div>
              <div className="absolute w-0.5 h-8 bg-[#8d6e63] right-0 top-0"></div>
            </div>

            {/* Level 3 */}
            <div className="flex justify-between w-[600px] mb-8 relative">
              <div className="bg-[#f5f5f5] text-[#333] p-4 rounded border border-[#ddd] shadow-sm w-64 relative">
                <span className="font-bold block">Divisi Keuangan</span>
                Khalisa Rahima Zahra (103062430005)
                <div className="absolute w-0.5 h-8 bg-[#8d6e63] left-1/2 -bottom-8"></div>
              </div>
              <div className="bg-[#f5f5f5] text-[#333] p-4 rounded border border-[#ddd] shadow-sm w-64 relative">
                <span className="font-bold block">Divisi Keuangan</span>
                Althaf Razanullaya Rizqi Mulyawan (103062400032)
                <div className="absolute w-0.5 h-8 bg-[#8d6e63] left-1/2 -bottom-8"></div>
              </div>
            </div>

            <div className="w-[600px] h-0.5 bg-[#8d6e63] mb-8 relative">
              <div className="absolute w-0.5 h-8 bg-[#8d6e63] left-0 top-0"></div>
              <div className="absolute w-0.5 h-8 bg-[#8d6e63] right-0 top-0"></div>
            </div>

            {/* Level 4 */}
            <div className="flex justify-between w-[600px]">
              <div className="bg-[#f5f5f5] text-[#333] p-4 rounded border border-[#ddd] shadow-sm w-64">
                <span className="font-bold block">Divisi packaging</span>
                Rifki Fahrezi (103062400011)
              </div>
              <div className="bg-[#f5f5f5] text-[#333] p-4 rounded border border-[#ddd] shadow-sm w-64">
                <span className="font-bold block">Divisi packaging</span>
                Muhammad Rabbani Ahadiat (103062400067)
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
