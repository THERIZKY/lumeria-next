"use client";

import { useMenuStore } from "@/store/menu";
import { useOrdersStore } from "@/store/orders";
import { CATEGORIES } from "@/data/menu";
import { UtensilsCrossed, ShoppingBag, Tag, TrendingUp } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

export default function AdminDashboard() {
  const menuItems = useMenuStore((s) => s.items);
  const orders = useOrdersStore((s) => s.orders);
  const mounted = useMounted();
  if (!mounted) return null;

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const stats = [
    { label: "Total Menu", value: menuItems.length, icon: UtensilsCrossed, color: "#C8A97E" },
    { label: "Kategori", value: CATEGORIES.length, icon: Tag, color: "#7EC8A9" },
    { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "#A97EC8" },
    { label: "Total Revenue", value: `Rp ${totalRevenue.toLocaleString("id-ID")}`, icon: TrendingUp, color: "#C87E7E" },
  ];

  return (
    <div>
      <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[#F5F0EB] mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-[#222] rounded-2xl p-6 border border-[#2A2A2A]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-[#B8B0A6] text-xs uppercase tracking-wider">{s.label}</p>
                  <p className="text-[#F5F0EB] text-xl font-bold mt-1">{s.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-[#222] rounded-2xl border border-[#2A2A2A]">
        <div className="p-6 border-b border-[#2A2A2A]">
          <h2 className="font-[var(--font-heading)] text-xl font-bold text-[#F5F0EB]">Pesanan Terbaru</h2>
        </div>
        <div className="p-6">
          {orders.length === 0 ? (
            <p className="text-[#B8B0A6] text-center py-8">Belum ada pesanan.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#B8B0A6] border-b border-[#2A2A2A]">
                    <th className="text-left py-3 px-2">Order ID</th>
                    <th className="text-left py-3 px-2">Pelanggan</th>
                    <th className="text-left py-3 px-2">Total</th>
                    <th className="text-left py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.orderID} className="border-b border-[#2A2A2A] last:border-0">
                      <td className="py-3 px-2 text-[#C8A97E] font-mono">{o.orderID}</td>
                      <td className="py-3 px-2 text-[#F5F0EB]">{o.customerName}</td>
                      <td className="py-3 px-2 text-[#F5F0EB]">Rp {o.totalAmount.toLocaleString("id-ID")}</td>
                      <td className="py-3 px-2"><span className={`px-2 py-1 rounded-full text-xs font-medium ${o.status === "completed" ? "bg-green-500/10 text-green-400" : o.status === "cancelled" ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"}`}>{o.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
