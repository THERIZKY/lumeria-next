"use client";

import { useState, useEffect } from "react";
import { useMounted } from "@/hooks/useMounted";
import Image from "next/image";
import { formatRupiah } from "@/data/menu";
import { Plus, Pencil, Trash2, X, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  category?: Category;
  rating: number;
  isActive: boolean;
}

const emptyForm = { name: "", description: "", price: 0, image: "", categoryId: "", rating: 4.5, isActive: true };

export default function AdminMenuPage() {
  const mounted = useMounted();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState("Semua");
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const fetchData = async () => {
    try {
      const [menuRes, catRes] = await Promise.all([
        fetch("/api/menu"),
        fetch("/api/categories")
      ]);
      const menuData = await menuRes.json();
      const catData = await catRes.json();
      setItems(menuData);
      setCategories(catData);
      if (catData.length > 0) {
        setForm(prev => ({ ...prev, categoryId: catData[0].id }));
      }
    } catch (error) {
      toast.error("Gagal mengambil data menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) fetchData();
  }, [mounted]);

  if (!mounted) return null;

  const filtered = filter === "Semua" 
    ? items 
    : items.filter((i) => i.category?.name === filter);

  const handleEdit = (item: MenuItem) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      categoryId: item.categoryId,
      rating: item.rating,
      isActive: item.isActive,
    });
    setPreview(item.image);
    setUploadFile(null);
    setEditing(item.id); 
    setShowForm(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form.name || !form.categoryId) {
      toast.error("Nama dan Kategori wajib diisi");
      return;
    }

    setUploading(true);
    try {
      let imageUrl = form.image;
      
      // Upload image if a new file is selected
      if (uploadFile) {
        const formData = new FormData();
        formData.append("file", uploadFile);
        
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        
        if (!uploadRes.ok) throw new Error("Gagal mengupload gambar");
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      const payload = { ...form, image: imageUrl };

      const url = editing ? `/api/menu/${editing}` : "/api/menu";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");
      
      toast.success(editing ? "Menu berhasil diupdate" : "Menu berhasil ditambahkan");
      setShowForm(false);
      setEditing(null);
      setForm({ ...emptyForm, categoryId: categories[0]?.id || "" });
      setPreview("");
      setUploadFile(null);
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus menu ini?")) return;
    
    try {
      const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus");
      toast.success("Menu berhasil dihapus");
      fetchData();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus");
    }
  };

  if (loading) return <div className="text-[#C8A97E] text-center mt-20">Loading menu...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[#F5F0EB]">Kelola Menu</h1>
        <button onClick={() => { setForm({ ...emptyForm, categoryId: categories[0]?.id || "" }); setPreview(""); setUploadFile(null); setEditing(null); setShowForm(true); }} className="flex items-center gap-2 bg-[#C8A97E] text-[#1A1A1A] px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#E8D5B7] transition-all">
          <Plus className="w-4 h-4" />Tambah Menu
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
        <button onClick={() => setFilter("Semua")} className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${filter === "Semua" ? "bg-[#C8A97E] text-[#1A1A1A]" : "bg-[#222] text-[#B8B0A6] hover:bg-[#333]"}`}>Semua</button>
        {categories.map((c) => (
          <button key={c.id} onClick={() => setFilter(c.name)} className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${filter === c.name ? "bg-[#C8A97E] text-[#1A1A1A]" : "bg-[#222] text-[#B8B0A6] hover:bg-[#333]"}`}>{c.name}</button>
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
                <th className="text-left py-4 px-4">Status</th>
                <th className="text-right py-4 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#2A2A2A]/50">
                  <td className="py-3 px-4">
                    {item.image ? (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#1A1A1A]"><Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" /></div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-[#555] text-xs">No img</div>
                    )}
                  </td>
                  <td className="py-3 px-4"><p className="text-[#F5F0EB] font-medium">{item.name}</p><p className="text-[#555] text-xs truncate max-w-[200px]">{item.description}</p></td>
                  <td className="py-3 px-4"><span className="bg-[#C8A97E]/10 text-[#C8A97E] px-2 py-1 rounded-full text-xs">{item.category?.name}</span></td>
                  <td className="py-3 px-4 text-[#F5F0EB]">{formatRupiah(item.price)}</td>
                  <td className="py-3 px-4 text-[#C8A97E]">{item.isActive ? 'Aktif' : 'Nonaktif'}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => handleEdit(item)} className="p-2 text-[#B8B0A6] hover:text-[#C8A97E] transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-[#B8B0A6] hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-[#B8B0A6]">Tidak ada menu ditemukan.</td></tr>
              )}
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
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-[#B8B0A6]" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="text-[#B8B0A6] text-xs mb-1 block">Nama</label><input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" /></div>
              <div><label className="text-[#B8B0A6] text-xs mb-1 block">Deskripsi</label><textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E] resize-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[#B8B0A6] text-xs mb-1 block">Harga (Rp)</label><input type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" /></div>
                <div><label className="text-[#B8B0A6] text-xs mb-1 block">Rating</label><input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#B8B0A6] text-xs mb-1 block">Kategori</label>
                  <select value={form.categoryId} onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]">
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[#B8B0A6] text-xs mb-1 block">Status</label>
                  <select value={form.isActive ? "true" : "false"} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.value === "true" }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]">
                    <option value="true">Aktif</option>
                    <option value="false">Nonaktif</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[#B8B0A6] text-xs mb-1 block">Foto</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-[#B8B0A6] text-sm file:bg-[#C8A97E] file:text-[#1A1A1A] file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-semibold file:text-xs" />
                {preview && <div className="relative w-20 h-20 rounded-xl overflow-hidden mt-3"><Image src={preview} alt="Preview" fill className="object-cover" sizes="80px" /></div>}
              </div>
            </div>
            <div className="p-6 border-t border-[#2A2A2A]">
              <button disabled={uploading} onClick={handleSave} className="flex items-center gap-2 bg-[#C8A97E] text-[#1A1A1A] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#E8D5B7] transition-all w-full justify-center disabled:opacity-50">
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {uploading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
