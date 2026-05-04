"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatRupiah } from "@/data/menu";
import { Button } from "@/components/ui/button";

function ReceiptContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedDetails = sessionStorage.getItem("checkoutDetails");
    if (storedDetails) {
      try {
        const parsed = JSON.parse(storedDetails);
        if (parsed.order && parsed.order.orderID === orderId) {
          setOrderDetails(parsed.order);
        }
      } catch (e) {
        console.error("Error parsing checkout details");
      }
    }
  }, [orderId]);

  if (!mounted) return null;

  return (
    <div className="max-w-md mx-auto">
      {orderDetails ? (
        <div className="bg-white border border-gray-200 shadow-sm p-8 font-mono text-sm leading-relaxed mb-8 rounded-lg" id="receipt-content">
          <div className="text-center mb-6 border-b border-dashed border-gray-400 pb-4">
            <h2 className="text-2xl font-bold text-[#3e2723] mb-2 font-sans">Kopi Asik</h2>
            <p className="text-gray-600">Jl. Halimun Raya No.2</p>
            <p className="text-gray-600">Jakarta Selatan, Indonesia</p>
            <p className="text-gray-600">Telp: +62 812-3456-7890</p>
          </div>

          <div className="mb-6 space-y-2">
            <div className="flex justify-between">
              <strong className="text-gray-600 font-normal">ID Pesanan:</strong>
              <span className="font-bold text-gray-900">{orderDetails.orderID}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-gray-600 font-normal">Waktu:</strong>
              <span className="font-bold text-gray-900">
                {new Date(orderDetails.orderTime).toLocaleString('id-ID', {
                  day: '2-digit', month: '2-digit', year: '2-digit',
                  hour: '2-digit', minute: '2-digit'
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <strong className="text-gray-600 font-normal">Pelanggan:</strong>
              <span className="font-bold text-gray-900">{orderDetails.customerName}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-gray-600 font-normal">Pembayaran:</strong>
              <span className="font-bold text-gray-900">{orderDetails.paymentMethod}</span>
            </div>
          </div>

          <div className="border-t border-b border-dashed border-gray-400 py-4 mb-6">
            <h4 className="text-center font-bold text-[#3e2723] mb-4 text-base font-sans">Item Pesanan:</h4>
            <div className="space-y-3">
              {orderDetails.items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between border-b border-dotted border-gray-200 pb-2 last:border-0">
                  <span>{item.Name} ({item.quantity}x)</span>
                  <span className="whitespace-nowrap ml-4">{formatRupiah(item.Price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-right mb-6">
            <p className="text-lg font-bold text-[#3e2723] font-sans">
              Total: {formatRupiah(orderDetails.totalAmount)}
            </p>
          </div>

          <div className="text-center text-xs text-gray-500 italic space-y-1">
            <p>Pemesanan berhasil diproses!</p>
            <p>Terima Kasih Atas Pesanan Anda!</p>
            <p>Datang Kembali!</p>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-red-500 mb-4">Tidak ada detail pesanan yang ditemukan untuk ID: {orderId || 'Tidak diketahui'}</p>
          <p>Silakan kembali ke halaman menu dan coba lagi.</p>
        </div>
      )}

      <div className="flex justify-center gap-4 flex-wrap">
        <Button 
          onClick={() => window.print()} 
          className="bg-[#8B4513] hover:bg-[#6a340f] text-white print:hidden"
          disabled={!orderDetails}
        >
          Cetak Struk
        </Button>
        <Link href="/menu" className="print:hidden">
          <Button className="bg-[#6d4c41] hover:bg-[#5d4037] text-white">
            Kembali ke Menu
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function ReceiptPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5f2]">
      <header className="bg-[#6d4c41] text-white py-10 text-center mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Struk Pesanan</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <Suspense fallback={<div className="text-center">Memuat struk pesanan...</div>}>
          <ReceiptContent />
        </Suspense>
      </main>
    </div>
  );
}
