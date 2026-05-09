"use client";

import { useState, useEffect } from "react";
import { useMounted } from "@/hooks/useMounted";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { formatRupiah } from "@/data/menu";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CartPage() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const updateTopping = useCartStore((state) => state.updateTopping);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotal = useCartStore((state) => state.getTotal);

  const mounted = useMounted();
  const [customerName, setCustomerName] = useState("");
  const [status, setStatus] = useState("mahasiswa");
  const [nim, setNim] = useState("");
  const [kelas, setKelas] = useState("");
  const [pickupMethod, setPickupMethod] = useState("alamat");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showQris, setShowQris] = useState(false);
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mounted) {
      fetch("/api/settings")
        .then(res => res.json())
        .then(data => setSettings(data))
        .catch(err => console.error("Failed to load settings", err));
    }
  }, [mounted]);

  const handleCheckout = () => {
    if (!customerName.trim()) {
      toast.error("Isi nama pelanggan");
      return;
    }
    if (status === "mahasiswa" && (!nim.trim() || !kelas.trim())) {
      toast.error("Isi NIM dan Kelas");
      return;
    }
    if (pickupMethod === "alamat" && !address.trim()) {
      toast.error("Isi alamat pengiriman");
      return;
    }
    if (!paymentMethod) {
      toast.error("Pilih metode pembayaran");
      return;
    }
    if (paymentMethod === "QRIS" && settings.qrUrl) {
      setShowQris(true);
    } else {
      processOrder();
    }
  };

  const processOrder = async () => {
    setLoading(true);
    try {
      const payload = {
        customerName,
        customerStatus: status,
        nim: status === "mahasiswa" ? nim : null,
        kelas: status === "mahasiswa" ? kelas : null,
        pickupMethod,
        address: pickupMethod === "alamat" ? address : null,
        paymentMethod,
        totalAmount: getTotal(),
        items: cartItems.map(item => ({
          id: item.ID,
          name: item.Name,
          quantity: item.quantity,
          price: item.Price,
          topping: item.topping || null
        }))
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Gagal memproses pesanan");
      const order = await res.json();

      // Clear cart and redirect
      clearCart();
      router.push(`/receipt?order_id=${order.id}`);
      
      // WhatsApp notification
      const waNumber = settings.contactWhatsApp || "6288976183041";
      const message = `Halo Admin Lumeria\n\nOrder ID: ${order.orderNumber}\nNama: ${customerName}\nPembayaran: ${paymentMethod}\nTotal: ${formatRupiah(order.totalAmount)}\n\nPesanan saya sudah dibayar.`;
      window.open(
        `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`,
        "_blank",
      );
      
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat memproses pesanan");
    } finally {
      setLoading(false);
      setShowQris(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#222] to-[#1A1A1A]">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[var(--font-heading)] text-5xl md:text-6xl font-bold text-[#F5F0EB] mb-4"
          >
            Keranjang
          </motion.h1>
        </div>
      </section>

      <section className="py-12 bg-[#1A1A1A] flex-grow">
        <div className="container mx-auto px-6 max-w-4xl">
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingBag className="w-16 h-16 text-[#333] mx-auto mb-6" />
              <p className="text-[#B8B0A6] text-xl mb-8">
                Keranjang kamu masih kosong.
              </p>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-[#C8A97E] text-[#1A1A1A] px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#E8D5B7] transition-all"
              >
                Lihat Menu
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Cart Items */}
              <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] overflow-hidden">
                <div className="p-6 border-b border-[#2A2A2A]">
                  <h2 className="font-[var(--font-heading)] text-xl font-bold text-[#F5F0EB]">
                    Item Pesanan ({cartItems.length})
                  </h2>
                </div>
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.ID}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      className="flex items-center gap-4 p-6 border-b border-[#2A2A2A] last:border-0"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        {item.Image ? (
                          <Image src={item.Image} alt={item.Name} fill sizes="80px" className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center text-[#555] text-xs">No img</div>
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold text-[#F5F0EB] truncate">
                          {item.Name}
                        </h3>
                        <p className="text-[#C8A97E] text-sm font-medium">
                          {formatRupiah(item.Price)}
                        </p>
                        {item.Category !== "Rice Bowl" &&
                          item.Category !== "Minuman" && (
                            <div className="mt-2">
                              <Select
                                value={item.topping || "none"}
                                onValueChange={(v) =>
                                  updateTopping(item.ID, v === "none" ? "" : v!)
                                }
                              >
                                <SelectTrigger className="w-[160px] h-8 text-xs border-[#333] bg-[#1A1A1A] text-[#B8B0A6]">
                                  <SelectValue placeholder="Pilih Topping" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#222] border-[#333] text-[#F5F0EB]">
                                  <SelectItem value="none">Tanpa Topping</SelectItem>
                                  <SelectItem value="Tiramisu">Tiramisu</SelectItem>
                                  <SelectItem value="Coklat">Coklat</SelectItem>
                                  <SelectItem value="Strawberry">Strawberry</SelectItem>
                                  <SelectItem value="Taro">Taro</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center bg-[#1A1A1A] rounded-full border border-[#333]">
                          <button
                            onClick={() => updateQuantity(item.ID, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#B8B0A6] hover:text-[#C8A97E] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm text-[#F5F0EB] font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.ID, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#B8B0A6] hover:text-[#C8A97E] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-[#F5F0EB] font-bold w-24 text-right text-sm">
                          {formatRupiah(item.Price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.ID)}
                          className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Customer Info */}
              <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] p-6">
                <h2 className="font-[var(--font-heading)] text-xl font-bold text-[#F5F0EB] mb-6">
                  Informasi Pelanggan
                </h2>
                <div className="grid gap-4">
                  <div>
                    <label className="text-[#B8B0A6] text-sm mb-2 block">Nama Pelanggan</label>
                    <input
                      placeholder="Masukkan nama Anda"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] placeholder:text-[#555] focus:outline-none focus:border-[#C8A97E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[#B8B0A6] text-sm mb-2 block">Status</label>
                    <Select value={status} onValueChange={(v) => v && setStatus(v)}>
                      <SelectTrigger className="bg-[#1A1A1A] border-[#333] text-[#F5F0EB] rounded-xl h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#222] border-[#333] text-[#F5F0EB]">
                        <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                        <SelectItem value="umum">Umum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {status === "mahasiswa" && (
                    <>
                      <div>
                        <label className="text-[#B8B0A6] text-sm mb-2 block">NIM</label>
                        <input
                          placeholder="Isi NIM"
                          value={nim}
                          onChange={(e) => setNim(e.target.value)}
                          className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] placeholder:text-[#555] focus:outline-none focus:border-[#C8A97E] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[#B8B0A6] text-sm mb-2 block">Kelas</label>
                        <input
                          placeholder="Isi kelas"
                          value={kelas}
                          onChange={(e) => setKelas(e.target.value)}
                          className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] placeholder:text-[#555] focus:outline-none focus:border-[#C8A97E] transition-colors"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Pickup */}
              <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] p-6">
                <h2 className="font-[var(--font-heading)] text-xl font-bold text-[#F5F0EB] mb-6">
                  Pengambilan Pesanan
                </h2>
                <div className="grid gap-4">
                  <Select value={pickupMethod} onValueChange={(v) => v && setPickupMethod(v)}>
                    <SelectTrigger className="bg-[#1A1A1A] border-[#333] text-[#F5F0EB] rounded-xl h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#222] border-[#333] text-[#F5F0EB]">
                      <SelectItem value="alamat">Tulis Alamat</SelectItem>
                      <SelectItem value="ambil">Ambil di Tempat</SelectItem>
                    </SelectContent>
                  </Select>
                  {pickupMethod === "alamat" ? (
                    <textarea
                      placeholder="Masukkan alamat lengkap"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] placeholder:text-[#555] focus:outline-none focus:border-[#C8A97E] transition-colors resize-none"
                    />
                  ) : (
                    <div className="p-4 bg-[#1A1A1A] border border-[#333] rounded-xl text-[#B8B0A6] text-sm whitespace-pre-wrap">
                      📍 Ambil di Tempat:
                      <br />
                      {settings.storeAddress || "Telkom University Jakarta Kampus 1\nJl. Daan Mogot KM 11, Jakarta Barat"}
                    </div>
                  )}
                </div>
              </div>

              {/* Payment */}
              <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] p-6">
                <h2 className="font-[var(--font-heading)] text-xl font-bold text-[#F5F0EB] mb-6">
                  Metode Pembayaran
                </h2>
                <Select value={paymentMethod} onValueChange={(v) => v && setPaymentMethod(v)}>
                  <SelectTrigger className="bg-[#1A1A1A] border-[#333] text-[#F5F0EB] rounded-xl h-12">
                    <SelectValue placeholder="-- Pilih Metode --" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#222] border-[#333] text-[#F5F0EB]">
                    <SelectItem value="Tunai">Tunai</SelectItem>
                    <SelectItem value="QRIS">QRIS</SelectItem>
                  </SelectContent>
                </Select>
                {settings.bankAccount && (
                  <div className="mt-4 p-4 bg-[#1A1A1A] border border-[#333] rounded-xl text-[#B8B0A6] text-sm whitespace-pre-wrap">
                    💳 Info Rekening:
                    <br />
                    {settings.bankAccount}
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="bg-[#222] rounded-2xl border-t-2 border-[#C8A97E] p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#B8B0A6]">Total</span>
                  <span className="font-[var(--font-heading)] text-2xl font-bold text-[#C8A97E]">
                    {formatRupiah(getTotal())}
                  </span>
                </div>
                <button
                  disabled={loading}
                  onClick={handleCheckout}
                  className="flex justify-center items-center gap-2 w-full bg-[#C8A97E] text-[#1A1A1A] py-4 rounded-xl font-bold text-lg hover:bg-[#E8D5B7] transition-all duration-300 disabled:opacity-50"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {loading ? "Memproses..." : "Lanjutkan ke Pembayaran"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* QRIS Modal */}
      <AnimatePresence>
        {showQris && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[9999]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#222] p-8 rounded-2xl text-center w-full max-w-sm border border-[#333]"
            >
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[#F5F0EB] mb-6">
                Scan QRIS
              </h2>
              <div className="relative w-64 h-64 bg-[#1A1A1A] mx-auto mb-8 flex items-center justify-center border-2 border-[#333] rounded-xl overflow-hidden">
                {settings.qrUrl ? (
                  <Image src={settings.qrUrl} alt="QRIS" fill className="object-contain" />
                ) : (
                  <p className="text-[#555] font-bold text-sm">QRIS IMAGE</p>
                )}
              </div>
              <button
                disabled={loading}
                onClick={processOrder}
                className="flex justify-center items-center gap-2 w-full bg-[#C8A97E] text-[#1A1A1A] py-4 rounded-xl font-bold text-lg hover:bg-[#E8D5B7] transition-all disabled:opacity-50"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                Saya Sudah Bayar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
