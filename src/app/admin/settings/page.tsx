"use client";

import { useState, useEffect } from "react";
import { useMounted } from "@/hooks/useMounted";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SiteSettings {
  contactWhatsApp: string;
  contactInstagram: string;
  storeAddress: string;
  storeHours: string;
  bankAccount: string;
  qrUrl: string;
}

const defaultSettings: SiteSettings = {
  contactWhatsApp: "",
  contactInstagram: "",
  storeAddress: "",
  storeHours: "",
  bankAccount: "",
  qrUrl: ""
};

export default function AdminSettingsPage() {
  const mounted = useMounted();
  const [form, setForm] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!mounted) return;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        
        setForm({
          contactWhatsApp: data.contactWhatsApp || "",
          contactInstagram: data.contactInstagram || "",
          storeAddress: data.storeAddress || "",
          storeHours: data.storeHours || "",
          bankAccount: data.bankAccount || "",
          qrUrl: data.qrUrl || ""
        });
      } catch (error) {
        toast.error("Gagal mengambil data pengaturan");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mounted]);

  if (!mounted) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");
      toast.success("Pengaturan berhasil disimpan");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-[#C8A97E] text-center mt-20">Loading settings...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[#F5F0EB]">Pengaturan Situs</h1>
        <button disabled={saving} onClick={handleSave} className="flex items-center gap-2 bg-[#C8A97E] text-[#1A1A1A] px-5 py-2 rounded-xl font-semibold text-sm hover:bg-[#E8D5B7] transition-all disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kontak */}
        <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] p-6 space-y-4">
          <h2 className="font-[var(--font-heading)] text-lg font-bold text-[#F5F0EB] border-b border-[#2A2A2A] pb-3">Kontak & Media Sosial</h2>
          <div><label className="text-[#B8B0A6] text-xs mb-1 block">Nomor WhatsApp (Admin)</label><input value={form.contactWhatsApp} onChange={(e) => setForm({ ...form, contactWhatsApp: e.target.value })} placeholder="628..." className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" /></div>
          <div><label className="text-[#B8B0A6] text-xs mb-1 block">Username Instagram</label><input value={form.contactInstagram} onChange={(e) => setForm({ ...form, contactInstagram: e.target.value })} placeholder="@lumeria.id" className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" /></div>
        </div>

        {/* Toko */}
        <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] p-6 space-y-4">
          <h2 className="font-[var(--font-heading)] text-lg font-bold text-[#F5F0EB] border-b border-[#2A2A2A] pb-3">Informasi Toko</h2>
          <div><label className="text-[#B8B0A6] text-xs mb-1 block">Alamat Pengambilan</label><textarea value={form.storeAddress} onChange={(e) => setForm({ ...form, storeAddress: e.target.value })} rows={2} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E] resize-none" /></div>
          <div><label className="text-[#B8B0A6] text-xs mb-1 block">Jam Operasional</label><input value={form.storeHours} onChange={(e) => setForm({ ...form, storeHours: e.target.value })} placeholder="Senin - Sabtu: 10.00 - 20.00" className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" /></div>
        </div>

        {/* Pembayaran */}
        <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] p-6 space-y-4 md:col-span-2">
          <h2 className="font-[var(--font-heading)] text-lg font-bold text-[#F5F0EB] border-b border-[#2A2A2A] pb-3">Info Pembayaran</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-[#B8B0A6] text-xs mb-1 block">Rekening Bank / e-Wallet</label><textarea value={form.bankAccount} onChange={(e) => setForm({ ...form, bankAccount: e.target.value })} rows={3} placeholder="BCA 123456789 a.n Lumeria&#10;GoPay 08123456789" className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E] resize-none" /></div>
            <div>
              <label className="text-[#B8B0A6] text-xs mb-1 block">URL QR Code (opsional)</label>
              <input value={form.qrUrl} onChange={(e) => setForm({ ...form, qrUrl: e.target.value })} placeholder="/img/qr-code.png" className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" />
              <p className="text-[#555] text-xs mt-2">Upload QR Code di kelola galeri lalu masukkan URL-nya ke sini, atau biarkan kosong jika tidak pakai QR.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
