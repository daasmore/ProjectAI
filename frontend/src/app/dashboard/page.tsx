"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Calendar, Users, Eye, Settings, LogOut, Heart, Trash2, Copy, Loader2 } from "lucide-react";
import Link from "next/link";

interface Wedding {
  id: string;
  slug: string;
  bride_name: string;
  groom_name: string;
  wedding_date: string;
  venue: string;
  template_id: string;
  created_at: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [weddings, setWeddings] = useState<Wedding[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("wedding_user");
    if (!userData) {
      router.push("/auth/login");
      return;
    }
    setUser(JSON.parse(userData));
    fetchWeddings();
  }, [router]);

  const fetchWeddings = async () => {
    try {
      const res = await fetch("/api/v1/weddings");
      const data = await res.json();
      if (data.weddings) setWeddings(data.weddings);
    } catch { /* ignore */ }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("wedding_token");
    localStorage.removeItem("wedding_user");
    router.push("/auth/login");
  };

  const handleCreateWedding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/v1/weddings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bride_name: formData.get("bride_name"),
          groom_name: formData.get("groom_name"),
          wedding_date: formData.get("wedding_date"),
          venue: formData.get("venue"),
          slug: `${String(formData.get("groom_name")).toLowerCase().replace(/\s+/g, "-")}-${String(formData.get("bride_name")).toLowerCase().replace(/\s+/g, "-")}-${Date.now().toString(36)}`,
        }),
      });
      const data = await res.json();
      if (data.success && data.wedding) {
        router.push(`/admin/${data.wedding.id}`);
      }
    } catch { /* ignore */ }
    setCreating(false);
  };

  const copyInviteLink = (slug: string) => {
    const url = `${window.location.origin}/invite/${slug}`;
    navigator.clipboard.writeText(url);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-neutral-800 text-lg">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-500">Halo, {user.name}</span>
            <button onClick={handleLogout} className="text-neutral-400 hover:text-neutral-600 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-serif font-light text-neutral-800">
            Selamat Datang, {user.name} 👋
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Kelola undangan pernikahan Anda di sini
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-serif text-neutral-700">Undangan Saya</h2>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white text-xs tracking-wider uppercase hover:bg-neutral-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Buat Undangan
          </button>
        </div>

        {/* Create Form */}
        {showCreate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-white border border-neutral-200 p-6 mb-6"
          >
            <h3 className="text-sm tracking-wider uppercase text-neutral-500 mb-4">Undangan Baru</h3>
            <form onSubmit={handleCreateWedding} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-neutral-500 mb-1 block">Nama Pengantin Wanita</label>
                <input name="bride_name" required className="w-full px-3 py-2 border border-neutral-200 text-sm" placeholder="Nama lengkap" />
              </div>
              <div>
                <label className="text-xs text-neutral-500 mb-1 block">Nama Pengantin Pria</label>
                <input name="groom_name" required className="w-full px-3 py-2 border border-neutral-200 text-sm" placeholder="Nama lengkap" />
              </div>
              <div>
                <label className="text-xs text-neutral-500 mb-1 block">Tanggal Pernikahan</label>
                <input name="wedding_date" type="date" required className="w-full px-3 py-2 border border-neutral-200 text-sm" />
              </div>
              <div>
                <label className="text-xs text-neutral-500 mb-1 block">Tempat / Venue</label>
                <input name="venue" required className="w-full px-3 py-2 border border-neutral-200 text-sm" placeholder="Nama gedung/lokasi" />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button type="submit" disabled={creating}
                  className="px-6 py-2 bg-neutral-800 text-white text-xs tracking-wider uppercase hover:bg-neutral-700 disabled:opacity-50 transition-colors">
                  {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Buat & Edit"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Wedding List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" />
          </div>
        ) : weddings.length === 0 ? (
          <div className="text-center py-16 bg-white border border-neutral-200">
            <Heart className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
            <p className="text-neutral-400 mb-4">Belum ada undangan. Buat undangan pertama Anda!</p>
            <button
              onClick={() => setShowCreate(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 text-white text-xs tracking-wider uppercase"
            >
              <Plus className="w-4 h-4" /> Buat Undangan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weddings.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-neutral-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-serif text-neutral-800">
                      {w.bride_name} & {w.groom_name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      {w.wedding_date ? new Date(w.wedding_date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "Belum ditentukan"}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-600">Aktif</span>
                </div>

                <p className="text-xs text-neutral-400 mb-4 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {w.venue || "Belum ditentukan"}
                </p>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/${w.id}`}
                    className="flex-1 px-3 py-2 bg-neutral-800 text-white text-xs text-center tracking-wider hover:bg-neutral-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Settings className="w-3 h-3" /> Edit
                  </Link>
                  <Link
                    href={`/invite/${w.slug}`}
                    className="flex-1 px-3 py-2 border border-neutral-200 text-neutral-600 text-xs text-center tracking-wider hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3" /> Preview
                  </Link>
                  <button
                    onClick={() => copyInviteLink(w.slug)}
                    className="px-3 py-2 border border-neutral-200 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 transition-colors"
                    title="Copy link"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
