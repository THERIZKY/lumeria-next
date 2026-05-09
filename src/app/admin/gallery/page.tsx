"use client";

import { useState, useEffect } from "react";
import { useMounted } from "@/hooks/useMounted";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface GalleryItem {
  id: string;
  src: string;
  caption: string;
  alt: string;
  sortOrder: number;
}

const emptyForm = { src: "", caption: "", alt: "", sortOrder: 0 };

export default function AdminGalleryPage() {
  const mounted = useMounted();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      toast.error("Gagal mengambil data galeri");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) fetchData();
  }, [mounted]);

  if (!mounted) return null;

  const handleEdit = (item: GalleryItem) => {
    setForm({
      src: item.src,
      caption: item.caption,
      alt: item.alt,
      sortOrder: item.sortOrder,
    });
    setPreview(item.src);
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
    if (!preview && !uploadFile && !form.src) {
      toast.error("Foto wajib diisi");
      return;
    }

    setUploading(true);
    try {
      let imageUrl = form.src;
      
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

      const payload = { ...form, src: imageUrl };

      const url = editing ? `/api/gallery/${editing}` : "/api/gallery";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");
      
      toast.success(editing ? "Galeri berhasil diupdate" : "Galeri berhasil ditambahkan");
      setShowForm(false);
      setEditing(null);
      setForm(emptyForm);
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
    if (!confirm("Apakah Anda yakin ingin menghapus galeri ini?")) return;
    
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus");
      toast.success("Galeri berhasil dihapus");
      fetchData();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus");
    }
  };

  if (loading) return <div className="text-[#C8A97E] text-center mt-20">Loading gallery...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[#F5F0EB]">Kelola Galeri</h1>
        <button onClick={() => { setForm(emptyForm); setPreview(""); setUploadFile(null); setEditing(null); setShowForm(true); }} className="flex items-center gap-2 bg-[#C8A97E] text-[#1A1A1A] px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#E8D5B7] transition-all">
          <Plus className="w-4 h-4" />Tambah Foto
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#222] rounded-2xl border border-[#2A2A2A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#B8B0A6] border-b border-[#2A2A2A] text-xs uppercase tracking-wider">
                <th className="text-left py-4 px-4">Foto</th>
                <th className="text-left py-4 px-4">Caption</th>
                <th className="text-left py-4 px-4">Alt Text</th>
                <th className="text-left py-4 px-4">Urutan</th>
                <th className="text-right py-4 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#2A2A2A]/50">
                  <td className="py-3 px-4">
                    {item.src ? (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#1A1A1A]"><Image src={item.src} alt={item.alt || item.caption} fill className="object-cover" sizes="64px" /></div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-[#555] text-xs">No img</div>
                    )}
                  </td>
                  <td className="py-3 px-4"><p className="text-[#F5F0EB] font-medium max-w-[200px] truncate">{item.caption || "-"}</p></td>
                  <td className="py-3 px-4"><p className="text-[#B8B0A6]">{item.alt || "-"}</p></td>
                  <td className="py-3 px-4 text-[#C8A97E]">{item.sortOrder}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => handleEdit(item)} className="p-2 text-[#B8B0A6] hover:text-[#C8A97E] transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-[#B8B0A6] hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={5} className="text-center py-8 text-[#B8B0A6]">Tidak ada foto ditemukan.</td></tr>
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
              <h3 className="font-[var(--font-heading)] text-lg font-bold text-[#F5F0EB]">{editing ? "Edit Foto" : "Tambah Foto"}</h3>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-[#B8B0A6]" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[#B8B0A6] text-xs mb-1 block">File Foto</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-[#B8B0A6] text-sm file:bg-[#C8A97E] file:text-[#1A1A1A] file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-semibold file:text-xs" />
                {preview && <div className="relative w-32 h-32 rounded-xl overflow-hidden mt-3"><Image src={preview} alt="Preview" fill className="object-cover" sizes="128px" /></div>}
              </div>
              <div><label className="text-[#B8B0A6] text-xs mb-1 block">Caption</label><input value={form.caption} onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))} placeholder="Keterangan singkat" className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" /></div>
              <div><label className="text-[#B8B0A6] text-xs mb-1 block">Alt Text (SEO)</label><input value={form.alt} onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))} placeholder="Deskripsi untuk screen reader" className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" /></div>
              <div><label className="text-[#B8B0A6] text-xs mb-1 block">Urutan (Sort Order)</label><input type="number" value={form.sortOrder} onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none focus:border-[#C8A97E]" /></div>
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
