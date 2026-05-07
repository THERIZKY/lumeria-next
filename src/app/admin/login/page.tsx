"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/store/admin";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAdminStore((state) => state.login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(username, password);
    if (success) {
      router.push("/admin");
    } else {
      setError("Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[#C8A97E] tracking-wider">LUMERIA</h1>
          <p className="text-[#B8B0A6] text-sm mt-2">Admin Panel</p>
        </div>
        <div className="bg-[#222] rounded-2xl p-8 border border-[#2A2A2A]">
          <h2 className="font-[var(--font-heading)] text-xl font-bold text-[#F5F0EB] mb-6 text-center">Login Admin</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[#B8B0A6] text-sm mb-2 block">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl pl-11 pr-4 py-3 text-[#F5F0EB] placeholder:text-[#555] focus:outline-none focus:border-[#C8A97E] transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-[#B8B0A6] text-sm mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl pl-11 pr-4 py-3 text-[#F5F0EB] placeholder:text-[#555] focus:outline-none focus:border-[#C8A97E] transition-colors" />
              </div>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-[#C8A97E] text-[#1A1A1A] py-3 rounded-xl font-bold hover:bg-[#E8D5B7] transition-all">Masuk</button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
