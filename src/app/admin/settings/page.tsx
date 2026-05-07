"use client";

import { useState, useEffect } from "react";
import { useMounted } from "@/hooks/useMounted";
import { Save } from "lucide-react";

interface SiteSettings {
  siteName: string;
  whatsappNumber: string;
  instagramUrl: string;
  address: string;
  phone: string;
  operationalHours: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Lumeria",
  whatsappNumber: "6288976183041",
  instagramUrl: "https://www.instagram.com/lumeriaaaa.id",
  address: "Jl. Daan Mogot KM 11, RT.12/RW.4, Kedaung Kali Angke, Cengkareng, Jakarta Barat",
  phone: "0895367044045",
  operationalHours: "08.00 - 17.00 WIB",
};

export default function AdminSettingsPage() {
  const mounted = useMounted();
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lumeria-settings");
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- loading initial data from localStorage
      try { setSettings(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setLoaded(true);
  }, []);

  if (!mounted || !loaded) return null;

  const handleSave = () => {
    localStorage.setItem("lumeria-settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields: { key: keyof SiteSettings; label: string; type?: string }[] = [
    { key: "siteName", label: "Nama Situs" },
    { key: "whatsappNumber", label: "Nomor WhatsApp (untuk checkout)" },
    { key: "instagramUrl", label: "URL Instagram" },
    { key: "address", label: "Alamat" },
    { key: "phone", label: "Nomor Telepon" },
    { key: "operationalHours", label: "Jam Operasional" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[#F5F0EB]">Pengaturan</h1>
        <button onClick={handleSave} className="flex items-center gap-2 bg-[#C8A97E] text-[#1A1A1A] px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#E8D5B7] transition-all">
          <Save className="w-4 h-4" />{saved ? "Tersimpan!" : "Simpan"}
        </button>
      </div>

      <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] p-6">
        <h2 className="font-[var(--font-heading)] text-lg font-bold text-[#F5F0EB] mb-6">Informasi Umum</h2>
        <div className="space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-[#B8B0A6] text-xs mb-1 block">{f.label}</label>
              <input
                value={settings[f.key]}
                onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E] transition-colors"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
