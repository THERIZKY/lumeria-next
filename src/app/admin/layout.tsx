"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAdminStore } from "@/store/admin";
import { LayoutDashboard, UtensilsCrossed, Home, ShoppingBag, Settings, LogOut, Menu } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

const sidebarItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Kelola Menu", path: "/admin/menu", icon: UtensilsCrossed },
  { name: "Kelola Homepage", path: "/admin/homepage", icon: Home },
  { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { name: "Pengaturan", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, username, logout } = useAdminStore();
  const mounted = useMounted();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [mounted, isAuthenticated, pathname, router]);

  if (!mounted) return null;
  if (pathname === "/admin/login") return <>{children}</>;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#141414] border-r border-[#2A2A2A] flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-[#2A2A2A]">
          <Link href="/admin" className="font-[var(--font-heading)] text-xl font-bold text-[#C8A97E] tracking-wider">LUMERIA</Link>
          <p className="text-[#555] text-xs mt-1">Admin Panel</p>
        </div>
        <nav className="flex-grow p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? "bg-[#C8A97E]/10 text-[#C8A97E]" : "text-[#B8B0A6] hover:bg-[#222] hover:text-[#F5F0EB]"}`}>
                <Icon className="w-4 h-4" />{item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#2A2A2A]">
          <div className="flex items-center gap-3 px-4 py-2 mb-2">
            <div className="w-8 h-8 bg-[#C8A97E]/10 rounded-full flex items-center justify-center text-[#C8A97E] text-sm font-bold">{username.charAt(0).toUpperCase()}</div>
            <span className="text-[#F5F0EB] text-sm font-medium">{username}</span>
          </div>
          <button onClick={() => { logout(); router.push("/admin/login"); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all w-full">
            <LogOut className="w-4 h-4" />Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-grow flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#2A2A2A] px-6 py-4 flex items-center justify-between">
          <button className="lg:hidden text-[#F5F0EB]" onClick={() => setSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
          <div className="flex items-center gap-4 ml-auto">
            <Link href="/" className="text-[#B8B0A6] text-sm hover:text-[#C8A97E] transition-colors">← Kembali ke Website</Link>
          </div>
        </header>
        <main className="flex-grow p-6">{children}</main>
      </div>
    </div>
  );
}
