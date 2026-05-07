"use client";

import { useState, useEffect } from "react";
import { useMounted } from "@/hooks/useMounted";
import { useHomepageStore } from "@/store/homepage";
import { useMenuStore } from "@/store/menu";
import { Save, RotateCcw, Plus, Trash2 } from "lucide-react";

export default function AdminHomepagePage() {
  const { content, updateContent, resetContent } = useHomepageStore();
  const menuItems = useMenuStore((s) => s.items);
  const mounted = useMounted();
  const [form, setForm] = useState(content);
  const [saved, setSaved] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing form with zustand store content
  useEffect(() => { setForm(content); }, [content]);
  if (!mounted) return null;

  const handleSave = () => {
    updateContent(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[#F5F0EB]">Kelola Homepage</h1>
        <div className="flex gap-3">
          <button onClick={() => { resetContent(); }} className="flex items-center gap-2 border border-[#333] text-[#B8B0A6] px-4 py-2 rounded-xl text-sm hover:border-[#C8A97E] hover:text-[#C8A97E] transition-all">
            <RotateCcw className="w-4 h-4" />Reset
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 bg-[#C8A97E] text-[#1A1A1A] px-5 py-2 rounded-xl font-semibold text-sm hover:bg-[#E8D5B7] transition-all">
            <Save className="w-4 h-4" />{saved ? "Tersimpan!" : "Simpan"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Hero */}
        <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] p-6">
          <h2 className="font-[var(--font-heading)] text-lg font-bold text-[#F5F0EB] mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div><label className="text-[#B8B0A6] text-xs mb-1 block">Judul Hero</label><input value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" /></div>
            <div><label className="text-[#B8B0A6] text-xs mb-1 block">Subjudul Hero</label><textarea value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} rows={2} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E] resize-none" /></div>
          </div>
        </div>

        {/* Marquee */}
        <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] p-6">
          <h2 className="font-[var(--font-heading)] text-lg font-bold text-[#F5F0EB] mb-4">Marquee Texts</h2>
          <div className="space-y-2">
            {form.marqueeTexts.map((t, i) => (
              <div key={i} className="flex gap-2">
                <input value={t} onChange={(e) => { const texts = [...form.marqueeTexts]; texts[i] = e.target.value; setForm({ ...form, marqueeTexts: texts }); }} className="flex-grow bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-2 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" />
                <button onClick={() => setForm({ ...form, marqueeTexts: form.marqueeTexts.filter((_, j) => j !== i) })} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <button onClick={() => setForm({ ...form, marqueeTexts: [...form.marqueeTexts, ""] })} className="flex items-center gap-2 text-[#C8A97E] text-sm hover:text-[#E8D5B7]"><Plus className="w-4 h-4" />Tambah teks</button>
          </div>
        </div>

        {/* Featured Items */}
        <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] p-6">
          <h2 className="font-[var(--font-heading)] text-lg font-bold text-[#F5F0EB] mb-4">Featured Items</h2>
          <div className="space-y-2">
            {form.featuredItemIds.map((id, i) => (
              <div key={i} className="flex gap-2">
                <select value={id} onChange={(e) => { const ids = [...form.featuredItemIds]; ids[i] = e.target.value; setForm({ ...form, featuredItemIds: ids }); }} className="flex-grow bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-2 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]">
                  {menuItems.map((m) => <option key={m.ID} value={m.ID}>{m.Name}</option>)}
                </select>
                <button onClick={() => setForm({ ...form, featuredItemIds: form.featuredItemIds.filter((_, j) => j !== i) })} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <button onClick={() => setForm({ ...form, featuredItemIds: [...form.featuredItemIds, menuItems[0]?.ID || ""] })} className="flex items-center gap-2 text-[#C8A97E] text-sm hover:text-[#E8D5B7]"><Plus className="w-4 h-4" />Tambah item</button>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] p-6">
          <h2 className="font-[var(--font-heading)] text-lg font-bold text-[#F5F0EB] mb-4">Testimonial</h2>
          <div className="space-y-4">
            {form.testimonials.map((t, i) => (
              <div key={t.id} className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333] space-y-2">
                <div className="flex justify-between"><span className="text-[#B8B0A6] text-xs">#{i + 1}</span><button onClick={() => setForm({ ...form, testimonials: form.testimonials.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-300"><Trash2 className="w-3 h-3" /></button></div>
                <textarea value={t.text} onChange={(e) => { const arr = [...form.testimonials]; arr[i] = { ...arr[i], text: e.target.value }; setForm({ ...form, testimonials: arr }); }} rows={2} placeholder="Testimonial" className="w-full bg-[#222] border border-[#333] rounded-lg px-3 py-2 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E] resize-none" />
                <div className="grid grid-cols-2 gap-2">
                  <input value={t.name} onChange={(e) => { const arr = [...form.testimonials]; arr[i] = { ...arr[i], name: e.target.value }; setForm({ ...form, testimonials: arr }); }} placeholder="Nama" className="bg-[#222] border border-[#333] rounded-lg px-3 py-2 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" />
                  <input value={t.role} onChange={(e) => { const arr = [...form.testimonials]; arr[i] = { ...arr[i], role: e.target.value }; setForm({ ...form, testimonials: arr }); }} placeholder="Role" className="bg-[#222] border border-[#333] rounded-lg px-3 py-2 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" />
                </div>
              </div>
            ))}
            <button onClick={() => setForm({ ...form, testimonials: [...form.testimonials, { id: Date.now().toString(), text: "", name: "", role: "" }] })} className="flex items-center gap-2 text-[#C8A97E] text-sm hover:text-[#E8D5B7]"><Plus className="w-4 h-4" />Tambah testimonial</button>
          </div>
        </div>

        {/* Pre-order */}
        <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] p-6">
          <h2 className="font-[var(--font-heading)] text-lg font-bold text-[#F5F0EB] mb-4">Pre-Order Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-[#B8B0A6] text-xs mb-1 block">Judul</label><input value={form.preOrderText} onChange={(e) => setForm({ ...form, preOrderText: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" /></div>
            <div><label className="text-[#B8B0A6] text-xs mb-1 block">Jadwal</label><input value={form.preOrderSchedule} onChange={(e) => setForm({ ...form, preOrderSchedule: e.target.value })} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
