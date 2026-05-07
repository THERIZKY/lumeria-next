"use client";

import { useState } from "react";
import { useMounted } from "@/hooks/useMounted";
import { useOrdersStore, type Order } from "@/store/orders";
import { formatRupiah } from "@/data/menu";
import { Trash2, Eye, X } from "lucide-react";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, removeOrder } = useOrdersStore();
  const mounted = useMounted();
  const [detail, setDetail] = useState<Order | null>(null);

  if (!mounted) return null;

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-400",
    processing: "bg-blue-500/10 text-blue-400",
    completed: "bg-green-500/10 text-green-400",
    cancelled: "bg-red-500/10 text-red-400",
  };

  return (
    <div>
      <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[#F5F0EB] mb-8">Kelola Orders</h1>

      <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] overflow-hidden">
        {orders.length === 0 ? (
          <p className="text-[#B8B0A6] text-center py-12">Belum ada pesanan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#B8B0A6] border-b border-[#2A2A2A] text-xs uppercase tracking-wider">
                  <th className="text-left py-4 px-4">Order ID</th>
                  <th className="text-left py-4 px-4">Pelanggan</th>
                  <th className="text-left py-4 px-4">Total</th>
                  <th className="text-left py-4 px-4">Pembayaran</th>
                  <th className="text-left py-4 px-4">Status</th>
                  <th className="text-left py-4 px-4">Waktu</th>
                  <th className="text-right py-4 px-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.orderID} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#2A2A2A]/50">
                    <td className="py-3 px-4 text-[#C8A97E] font-mono text-xs">{o.orderID}</td>
                    <td className="py-3 px-4 text-[#F5F0EB]">{o.customerName}</td>
                    <td className="py-3 px-4 text-[#F5F0EB]">{formatRupiah(o.totalAmount)}</td>
                    <td className="py-3 px-4 text-[#B8B0A6]">{o.paymentMethod}</td>
                    <td className="py-3 px-4">
                      <select value={o.status} onChange={(e) => updateOrderStatus(o.orderID, e.target.value as Order["status"])} className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColors[o.status] || ""} bg-transparent`}>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-[#B8B0A6] text-xs">{new Date(o.orderTime).toLocaleString("id-ID")}</td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => setDetail(o)} className="p-2 text-[#B8B0A6] hover:text-[#C8A97E]"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => removeOrder(o.orderID)} className="p-2 text-[#B8B0A6] hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {detail && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
              <h3 className="font-[var(--font-heading)] text-lg font-bold text-[#F5F0EB]">Detail Order</h3>
              <button onClick={() => setDetail(null)}><X className="w-5 h-5 text-[#B8B0A6]" /></button>
            </div>
            <div className="p-6 space-y-3 text-sm">
              <p><span className="text-[#B8B0A6]">ID:</span> <span className="text-[#C8A97E] font-mono">{detail.orderID}</span></p>
              <p><span className="text-[#B8B0A6]">Pelanggan:</span> <span className="text-[#F5F0EB]">{detail.customerName}</span></p>
              <p><span className="text-[#B8B0A6]">Pembayaran:</span> <span className="text-[#F5F0EB]">{detail.paymentMethod}</span></p>
              <div className="border-t border-[#2A2A2A] pt-3 mt-3">
                <p className="text-[#B8B0A6] mb-2">Items:</p>
                {detail.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-1">
                    <span className="text-[#F5F0EB]">{item.Name} x{item.quantity}</span>
                    <span className="text-[#C8A97E]">{formatRupiah(item.Price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2A2A2A] pt-3"><p className="flex justify-between font-bold"><span className="text-[#B8B0A6]">Total:</span><span className="text-[#C8A97E]">{formatRupiah(detail.totalAmount)}</span></p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
