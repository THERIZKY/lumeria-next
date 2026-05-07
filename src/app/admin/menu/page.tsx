"use client";

import { useState } from "react";
import { useMounted } from "@/hooks/useMounted";
import Image from "next/image";
import { useMenuStore } from "@/store/menu";
import { CATEGORIES, formatRupiah } from "@/data/menu";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface FormData {
  ID: string; Name: string; Description: string; Price: number; Image: string; Category: string; Rating: number;
}

const emptyForm: FormData = { ID: "", Name: "", Description: "", Price: 0, Image: "", Category: "Donat", Rating: 4.5 };

export default function AdminMenuPage() {
  const { items, addItem, updateItem, removeItem } = useMenuStore();
  const mounted = useMounted();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [filter, setFilter] = useState("Semua");

  if (!mounted) return null;

  const filtered = filter === "Semua" ? items : items.filter((i) => i.Category === filter);

  const handleEdit = (item: typeof items[0]) => {
    setForm({ ...item }); setEditing(item.ID); setShowForm(true);
  };

  const handleSave = () => {
    if (!form.Name || !form.ID) return;
    if (editing) {
      updateItem(editing, form);
    } else {
      addItem(form);
    }
    setShowForm(false); setEditing(null); setForm(emptyForm);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm((f) => ({ ...f, Image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[#F5F0EB]">Kelola Menu</h1>
        <button onClick={() => { setForm({ ...emptyForm, ID: `item-${Date.now()}` }); setEditing(null); setShowForm(true); }} className="flex items-center gap-2 bg-[#C8A97E] text-[#1A1A1A] px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#E8D5B7] transition-all">
          <Plus className="w-4 h-4" />Tambah Menu
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
        {["Semua", ...CATEGORIES].map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${filter === c ? "bg-[#C8A97E] text-[#1A1A1A]" : "bg-[#222] text-[#B8B0A6] hover:bg-[#333]"}`}>{c}</button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#B8B0A6] border-b border-[#2A2A2A] text-xs uppercase tracking-wider">
                <th className="text-left py-4 px-4">Foto</th>
                <th className="text-left py-4 px-4">Nama</th>
                <th className="text-left py-4 px-4">Kategori</th>
                <th className="text-left py-4 px-4">Harga</th>
                <th className="text-left py-4 px-4">Rating</th>
                <th className="text-right py-4 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.ID} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#2A2A2A]/50">
                  <td className="py-3 px-4"><div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#1A1A1A]"><Image src={item.Image} alt={item.Name} fill className="object-cover" sizes="48px" /></div></td>
                  <td className="py-3 px-4"><p className="text-[#F5F0EB] font-medium">{item.Name}</p><p className="text-[#555] text-xs truncate max-w-[200px]">{item.Description}</p></td>
                  <td className="py-3 px-4"><span className="bg-[#C8A97E]/10 text-[#C8A97E] px-2 py-1 rounded-full text-xs">{item.Category}</span></td>
                  <td className="py-3 px-4 text-[#F5F0EB]">{formatRupiah(item.Price)}</td>
                  <td className="py-3 px-4 text-[#C8A97E]">★ {item.Rating}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => handleEdit(item)} className="p-2 text-[#B8B0A6] hover:text-[#C8A97E] transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => removeItem(item.ID)} className="p-2 text-[#B8B0A6] hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
              <h3 className="font-[var(--font-heading)] text-lg font-bold text-[#F5F0EB]">{editing ? "Edit Menu" : "Tambah Menu"}</h3>
              <button onClick={() => { setShowForm(false); setEditing(null); }}><X className="w-5 h-5 text-[#B8B0A6]" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="text-[#B8B0A6] text-xs mb-1 block">Nama</label><input value={form.Name} onChange={(e) => setForm((f) => ({ ...f, Name: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" /></div>
              <div><label className="text-[#B8B0A6] text-xs mb-1 block">Deskripsi</label><textarea value={form.Description} onChange={(e) => setForm((f) => ({ ...f, Description: e.target.value }))} rows={3} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E] resize-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[#B8B0A6] text-xs mb-1 block">Harga (Rp)</label><input type="number" value={form.Price} onChange={(e) => setForm((f) => ({ ...f, Price: Number(e.target.value) }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" /></div>
                <div><label className="text-[#B8B0A6] text-xs mb-1 block">Rating</label><input type="number" step="0.1" min="0" max="5" value={form.Rating} onChange={(e) => setForm((f) => ({ ...f, Rating: Number(e.target.value) }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" /></div>
              </div>
              <div><label className="text-[#B8B0A6] text-xs mb-1 block">Kategori</label><select value={form.Category} onChange={(e) => setForm((f) => ({ ...f, Category: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]">{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
              <div>
                <label className="text-[#B8B0A6] text-xs mb-1 block">Foto</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-[#B8B0A6] text-sm file:bg-[#C8A97E] file:text-[#1A1A1A] file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-semibold file:text-xs" />
                {form.Image && <div className="relative w-20 h-20 rounded-xl overflow-hidden mt-3"><Image src={form.Image} alt="Preview" fill className="object-cover" sizes="80px" /></div>}
              </div>
            </div>
            <div className="p-6 border-t border-[#2A2A2A]">
              <button onClick={handleSave} className="flex items-center gap-2 bg-[#C8A97E] text-[#1A1A1A] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#E8D5B7] transition-all w-full justify-center"><Save className="w-4 h-4" />Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
