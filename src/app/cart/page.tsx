"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { formatRupiah } from "@/data/menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotal = useCartStore((state) => state.getTotal);

  const [mounted, setMounted] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [status, setStatus] = useState("mahasiswa");
  const [nim, setNim] = useState("");
  const [kelas, setKelas] = useState("");
  const [pickupMethod, setPickupMethod] = useState("alamat");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showQris, setShowQris] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = () => {
    if (!customerName.trim()) {
      alert("Isi nama pelanggan");
      return;
    }
    if (!paymentMethod) {
      alert("Pilih metode pembayaran");
      return;
    }

    if (paymentMethod === "QRIS") {
      setShowQris(true);
    } else {
      processOrder();
    }
  };

  const processOrder = () => {
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const total = getTotal();

    const orderData = {
      orderID: orderId,
      customerName,
      paymentMethod,
      items: cartItems,
      totalAmount: total,
      orderTime: new Date().toISOString(),
    };

    // Save to sessionStorage for receipt page
    sessionStorage.setItem("checkoutDetails", JSON.stringify({ order: orderData }));

    // Send WhatsApp message
    const message = `Halo Admin Lumeria\n\nNama: ${customerName}\nPembayaran: ${paymentMethod}\nTotal: ${formatRupiah(total)}\n\nPesanan saya sudah dibayar.`;
    window.open(`https://wa.me/62895367044045?text=${encodeURIComponent(message)}`, "_blank");

    // Clear cart and redirect
    clearCart();
    router.push(`/receipt?order_id=${orderId}`);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5f2]">
      <header className="bg-[#6d4c41] text-white py-10 text-center mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Lumeria - Keranjang</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow max-w-4xl">
        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-xl text-gray-600 mb-6">Keranjang Anda kosong. Yuk pesan sekarang.</p>
            <Link href="/menu">
              <Button className="bg-[#8d6e63] hover:bg-[#795548] text-white">Lihat Menu</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Cart Items */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-[#3e2723]">Item Pesanan</h2>
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div key={item.ID} className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image src={item.Image} alt={item.Name} fill sizes="(max-width: 768px) 100vw, 80px" className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg">{item.Name}</h3>
                      <p className="text-gray-600">{formatRupiah(item.Price)}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap justify-end">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.ID, parseInt(e.target.value) || 1)}
                        className="w-20"
                      />
                      <span className="font-bold text-[#8d6e63] w-28 text-right">
                        {formatRupiah(item.Price * item.quantity)}
                      </span>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeItem(item.ID)}
                        className="bg-red-500 hover:bg-red-600 rounded-md"
                        title="Hapus"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-[#3e2723]">Informasi Pelanggan</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nama Pelanggan:</Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama Anda"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="status">Status:</Label>
                  <Select value={status} onValueChange={(v) => v && setStatus(v)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                      <SelectItem value="umum">Umum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {status === "mahasiswa" && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="nim">NIM:</Label>
                      <Input
                        id="nim"
                        placeholder="Isi NIM"
                        value={nim}
                        onChange={(e) => setNim(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="kelas">Kelas:</Label>
                      <Input
                        id="kelas"
                        placeholder="Isi kelas"
                        value={kelas}
                        onChange={(e) => setKelas(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Pickup */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-[#3e2723]">Pengambilan Pesanan</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="pickup">Pilih Metode:</Label>
                  <Select value={pickupMethod} onValueChange={(v) => v && setPickupMethod(v)}>
                    <SelectTrigger id="pickup">
                      <SelectValue placeholder="Pilih metode pengambilan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alamat">Tulis Alamat</SelectItem>
                      <SelectItem value="ambil">Ambil di Tempat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {pickupMethod === "alamat" ? (
                  <div className="grid gap-2">
                    <Label htmlFor="address">Alamat Lengkap:</Label>
                    <Textarea
                      id="address"
                      placeholder="Masukkan alamat lengkap"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                    />
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 border rounded-lg text-gray-700">
                    📍 Ambil di Tempat:<br /> 
                    Telkom University Jakarta Kampus 1<br /> 
                    Jl. Daan Mogot KM 11, Jakarta Barat
                  </div>
                )}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-[#3e2723]">Metode Pembayaran</h2>
              <div className="grid gap-2">
                <Label htmlFor="payment">Pilih Pembayaran:</Label>
                <Select value={paymentMethod} onValueChange={(v) => v && setPaymentMethod(v)}>
                  <SelectTrigger id="payment">
                    <SelectValue placeholder="-- Pilih Metode --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tunai">Tunai</SelectItem>
                    <SelectItem value="QRIS">QRIS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#3e2723] text-right">
              <p className="text-2xl font-bold mb-6 text-[#3e2723]">
                Total: {formatRupiah(getTotal())}
              </p>
              <Button 
                onClick={handleCheckout}
                className="bg-green-600 hover:bg-green-700 text-white text-lg py-6 px-8"
              >
                Lanjutkan ke Pembayaran
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* QRIS Modal */}
      {showQris && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999]">
          <div className="bg-white p-8 rounded-xl text-center w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6">Scan QRIS</h2>
            {/* Fallback box since we don't have the QRIS image yet */}
            <div className="w-64 h-64 bg-gray-200 mx-auto mb-8 flex items-center justify-center border-4 border-gray-300 rounded-lg">
              <p className="text-gray-500 font-bold">QRIS IMAGE HERE</p>
            </div>
            <Button 
              onClick={() => {
                setShowQris(false);
                processOrder();
              }}
              className="bg-green-600 hover:bg-green-700 text-white w-full py-6 text-lg"
            >
              Saya Sudah Bayar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
