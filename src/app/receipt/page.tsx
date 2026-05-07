"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatRupiah } from "@/data/menu";
import { motion } from "framer-motion";
import { Printer, ArrowLeft } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

interface OrderData {
  orderID: string;
  customerName: string;
  paymentMethod: string;
  items: { Name: string; quantity: number; Price: number; topping?: string }[];
  totalAmount: number;
  orderTime: string;
}

function ReceiptContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [orderDetails, setOrderDetails] = useState<OrderData | null>(null);
  const mounted = useMounted();

  useEffect(() => {
    const stored = sessionStorage.getItem("checkoutDetails");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.order && parsed.order.orderID === orderId) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- loading order data from sessionStorage
          setOrderDetails(parsed.order);
        }
      } catch { /* ignore */ }
    }
  }, [orderId]);

  if (!mounted) return null;

  return (
    <div className="max-w-md mx-auto">
      {orderDetails ? (
        <div className="bg-white text-gray-800 rounded-2xl shadow-xl p-8 font-mono text-sm leading-relaxed mb-8" id="receipt-content">
          <div className="text-center mb-6 border-b border-dashed border-gray-300 pb-4">
            <h2 className="text-2xl font-bold text-[#3e2723] mb-2 font-sans">Lumeria</h2>
            <p className="text-gray-500 text-xs">Telkom University Jakarta Kampus 1</p>
            <p className="text-gray-500 text-xs">Jl. Daan Mogot KM 11, Jakarta Barat</p>
          </div>
          <div className="mb-6 space-y-2">
            {[
              ["ID Pesanan", orderDetails.orderID],
              ["Waktu", new Date(orderDetails.orderTime).toLocaleString("id-ID", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })],
              ["Pelanggan", orderDetails.customerName],
              ["Pembayaran", orderDetails.paymentMethod],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-gray-500">{k}:</span>
                <span className="font-bold">{v}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-b border-dashed border-gray-300 py-4 mb-6">
            <h4 className="text-center font-bold text-[#3e2723] mb-4 font-sans">Item Pesanan</h4>
            <div className="space-y-3">
              {orderDetails.items.map((item, i) => (
                <div key={i} className="flex justify-between border-b border-dotted border-gray-200 pb-2 last:border-0">
                  <div>
                    <span>{item.Name} ({item.quantity}x)</span>
                    {item.topping && <span className="text-xs text-gray-400 block">Topping: {item.topping}</span>}
                  </div>
                  <span className="whitespace-nowrap ml-4">{formatRupiah(item.Price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-right mb-6">
            <p className="text-lg font-bold text-[#3e2723] font-sans">Total: {formatRupiah(orderDetails.totalAmount)}</p>
          </div>
          <div className="text-center text-xs text-gray-400 italic space-y-1">
            <p>Terima Kasih Atas Pesanan Anda!</p>
            <p>Datang Kembali! 🙏</p>
          </div>
        </div>
      ) : (
        <div className="bg-[#222] p-8 rounded-2xl border border-[#2A2A2A] text-center">
          <p className="text-red-400 mb-4">Tidak ada detail pesanan untuk ID: {orderId || "?"}</p>
        </div>
      )}
      <div className="flex justify-center gap-4">
        <button onClick={() => window.print()} disabled={!orderDetails} className="flex items-center gap-2 bg-[#C8A97E] text-[#1A1A1A] px-6 py-3 rounded-xl font-semibold hover:bg-[#E8D5B7] transition-all print:hidden disabled:opacity-50">
          <Printer className="w-4 h-4" />Cetak Struk
        </button>
        <Link href="/menu" className="flex items-center gap-2 border-2 border-[#333] text-[#B8B0A6] px-6 py-3 rounded-xl font-semibold hover:border-[#C8A97E] hover:text-[#C8A97E] transition-all print:hidden">
          <ArrowLeft className="w-4 h-4" />Menu
        </Link>
      </div>
    </div>
  );
}

export default function ReceiptPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#222] to-[#1A1A1A]">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-[var(--font-heading)] text-5xl font-bold text-[#F5F0EB]">
            Struk Pesanan
          </motion.h1>
        </div>
      </section>
      <section className="py-12 bg-[#1A1A1A] flex-grow">
        <div className="container mx-auto px-6">
          <Suspense fallback={<div className="text-center text-[#B8B0A6]">Memuat...</div>}>
            <ReceiptContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
