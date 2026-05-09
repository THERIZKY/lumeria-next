"use client";

import { useState, useEffect } from "react";
import { UtensilsCrossed, ShoppingBag, Tag, TrendingUp } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

type Stats = {
  menuCount: number;
  categoryCount: number;
  orderCount: number;
  totalRevenue: number;
};

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  totalAmount: number;
  status: string;
};

export default function AdminDashboard() {
  const mounted = useMounted();
  const [stats, setStats] = useState<Stats>({ menuCount: 0, categoryCount: 0, orderCount: 0, totalRevenue: 0 });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mounted) return;
    
    const fetchDashboardData = async () => {
      try {
        const [menuRes, catRes, ordersRes] = await Promise.all([
          fetch("/api/menu"),
          fetch("/api/categories"),
          fetch("/api/orders")
        ]);
        
        const menuItems = await menuRes.json();
        const categories = await catRes.json();
        const orders = await ordersRes.json();
        
        const totalRevenue = orders.reduce((sum: number, o: any) => sum + o.totalAmount, 0);
        
        setStats({
          menuCount: menuItems.length || 0,
          categoryCount: categories.length || 0,
          orderCount: orders.length || 0,
          totalRevenue
        });
        
        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [mounted]);

  if (!mounted) return null;

  const statCards = [
    { label: "Total Menu", value: stats.menuCount, icon: UtensilsCrossed, color: "#C8A97E" },
    { label: "Kategori", value: stats.categoryCount, icon: Tag, color: "#7EC8A9" },
    { label: "Total Orders", value: stats.orderCount, icon: ShoppingBag, color: "#A97EC8" },
    { label: "Total Revenue", value: `Rp ${stats.totalRevenue.toLocaleString("id-ID")}`, icon: TrendingUp, color: "#C87E7E" },
  ];

  if (loading) {
    return <div className="text-[#C8A97E] text-center mt-20">Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[#F5F0EB] mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((s) => {
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
          {recentOrders.length === 0 ? (
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
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-b border-[#2A2A2A] last:border-0">
                      <td className="py-3 px-2 text-[#C8A97E] font-mono">{o.orderNumber}</td>
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
