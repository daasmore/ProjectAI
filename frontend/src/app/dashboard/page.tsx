"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Plus,
  Search,
  Download,
  Trash2,
  User,
  X,
} from "lucide-react";
import { mockGuests, type Guest } from "@/lib/mock-data";
import WeddingNavbar from "@/components/WeddingNavbar";

type FilterStatus = "all" | "confirmed" | "declined" | "pending";

export default function DashboardPage() {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", phone: "", guestCount: 1 });

  const filteredGuests = guests.filter((g) => {
    const matchesFilter = filter === "all" || g.status === filter;
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: guests.length,
    confirmed: guests.filter((g) => g.status === "confirmed").length,
    declined: guests.filter((g) => g.status === "declined").length,
    pending: guests.filter((g) => g.status === "pending").length,
    totalAttending: guests.filter((g) => g.status === "confirmed").reduce((s, g) => s + g.guestCount, 0),
  };

  const handleDelete = (id: string) => setGuests(guests.filter((g) => g.id !== id));

  const handleAddGuest = () => {
    if (!newGuest.name.trim()) return;
    setGuests([{ id: String(Date.now()), name: newGuest.name, phone: newGuest.phone, guestCount: newGuest.guestCount, status: "pending" }, ...guests]);
    setNewGuest({ name: "", phone: "", guestCount: 1 });
    setShowAddForm(false);
  };

  const handleExportCSV = () => {
    const header = "Nama,Telepon,Status,Jumlah Tamu,Pesan,Tanggal Respon\n";
    const rows = guests.map((g) => `"${g.name}","${g.phone || ""}","${g.status}",${g.guestCount},"${g.message || ""}","${g.respondedAt || ""}"`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "daftar-tamu-rsvp.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const statusConfig: Record<string, { label: string; bg: string }> = {
    confirmed: { label: "Hadir", bg: "bg-neutral-800 text-white" },
    declined: { label: "Tidak Hadir", bg: "bg-neutral-200 text-neutral-600" },
    pending: { label: "Menunggu", bg: "bg-neutral-100 text-neutral-500" },
  };

  return (
    <div className="min-h-screen bg-white">
      <WeddingNavbar />
      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-neutral-800 mb-1">Dashboard Tamu</h1>
            <p className="text-neutral-400 text-sm">Kelola daftar tamu dan pantau RSVP pernikahan Anda</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {[
              { label: "Total Tamu", value: stats.total, icon: <Users className="w-4 h-4" /> },
              { label: "Konfirmasi Hadir", value: stats.confirmed, icon: <CheckCircle className="w-4 h-4" /> },
              { label: "Tidak Hadir", value: stats.declined, icon: <XCircle className="w-4 h-4" /> },
              { label: "Menunggu", value: stats.pending, icon: <Clock className="w-4 h-4" /> },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-neutral-50 p-4 border border-neutral-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-neutral-400">{s.icon}</div>
                  <span className="text-2xl font-serif font-light text-neutral-800">{s.value}</span>
                </div>
                <p className="text-xs text-neutral-400 tracking-wider uppercase">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-neutral-50 border border-neutral-100 p-5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-neutral-400" />
              <h3 className="text-xs tracking-wider uppercase text-neutral-400">Statistik Kehadiran</h3>
            </div>
            <div className="space-y-2">
              {[
                { label: "Hadir", count: stats.confirmed, total: stats.total, color: "bg-neutral-800" },
                { label: "Tidak Hadir", count: stats.declined, total: stats.total, color: "bg-neutral-300" },
                { label: "Menunggu", count: stats.pending, total: stats.total, color: "bg-neutral-200" },
              ].map((bar) => (
                <div key={bar.label} className="flex items-center gap-3">
                  <span className="text-xs text-neutral-500 w-20">{bar.label}</span>
                  <div className="flex-1 h-5 bg-neutral-100 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${bar.total > 0 ? (bar.count / bar.total) * 100 : 0}%` }} transition={{ duration: 0.6, delay: 0.2 }} className={`h-full ${bar.color}`} />
                  </div>
                  <span className="text-xs font-medium text-neutral-600 w-6 text-right">{bar.count}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-neutral-200 text-xs text-neutral-400">
              Total yang akan hadir: <strong className="text-neutral-700">{stats.totalAttending} orang</strong>
            </div>
          </div>

          {/* Guest List */}
          <div className="bg-neutral-50 border border-neutral-100">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-neutral-100">
              <h3 className="text-xs tracking-wider uppercase text-neutral-400 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                Daftar Tamu ({filteredGuests.length})
              </h3>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-300" />
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari tamu..." className="pl-8 pr-3 py-2 text-xs border border-neutral-200 bg-white focus:outline-none focus:border-neutral-400 w-full sm:w-48" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowAddForm(true)} className="inline-flex items-center gap-1 px-3 py-2 bg-neutral-800 text-white text-xs tracking-wider uppercase hover:bg-neutral-900 transition-colors">
                    <Plus className="w-3 h-3" /> Tambah
                  </button>
                  <button onClick={handleExportCSV} className="inline-flex items-center gap-1 px-3 py-2 bg-white border border-neutral-200 text-neutral-500 text-xs tracking-wider uppercase hover:bg-neutral-50 transition-colors">
                    <Download className="w-3 h-3" /> Export
                  </button>
                </div>
              </div>
            </div>

            {/* Filter */}
            <div className="flex gap-1 p-4 border-b border-neutral-100">
              {(["all", "confirmed", "declined", "pending"] as const).map((key) => (
                <button key={key} onClick={() => setFilter(key)} className={`px-3 py-1.5 text-[10px] tracking-wider uppercase transition-all duration-200 ${filter === key ? "bg-neutral-800 text-white" : "bg-white border border-neutral-200 text-neutral-400 hover:border-neutral-300"}`}>
                  {key === "all" ? "Semua" : key === "confirmed" ? "Hadir" : key === "declined" ? "Tidak Hadir" : "Menunggu"}
                </button>
              ))}
            </div>

            {/* Add Form */}
            <AnimatePresence>
              {showAddForm && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-neutral-100">
                  <div className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs tracking-wider uppercase text-neutral-500">Tambah Tamu Manual</h4>
                      <button onClick={() => setShowAddForm(false)} className="p-1 hover:bg-neutral-100"><X className="w-3.5 h-3.5 text-neutral-400" /></button>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <input type="text" value={newGuest.name} onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })} placeholder="Nama" className="px-3 py-2 text-xs border border-neutral-200 focus:outline-none focus:border-neutral-400" />
                      <input type="text" value={newGuest.phone} onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })} placeholder="Telepon (opsional)" className="px-3 py-2 text-xs border border-neutral-200 focus:outline-none focus:border-neutral-400" />
                      <div className="flex gap-2">
                        <input type="number" min={1} max={10} value={newGuest.guestCount} onChange={(e) => setNewGuest({ ...newGuest, guestCount: Number(e.target.value) })} className="w-20 px-3 py-2 text-xs border border-neutral-200 focus:outline-none focus:border-neutral-400" />
                        <button onClick={handleAddGuest} className="px-4 py-2 bg-neutral-800 text-white text-xs tracking-wider uppercase hover:bg-neutral-900 transition-colors">Tambah</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="text-left py-3 px-4 text-[10px] tracking-wider uppercase text-neutral-400">Nama</th>
                    <th className="text-left py-3 px-4 text-[10px] tracking-wider uppercase text-neutral-400 hidden sm:table-cell">Telepon</th>
                    <th className="text-left py-3 px-4 text-[10px] tracking-wider uppercase text-neutral-400">Status</th>
                    <th className="text-center py-3 px-4 text-[10px] tracking-wider uppercase text-neutral-400 hidden sm:table-cell">Jumlah</th>
                    <th className="text-left py-3 px-4 text-[10px] tracking-wider uppercase text-neutral-400 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuests.map((guest, i) => {
                    const config = statusConfig[guest.status];
                    return (
                      <motion.tr key={guest.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
                              <User className="w-3 h-3 text-neutral-400" />
                            </div>
                            <div>
                              <p className="text-sm text-neutral-700">{guest.name}</p>
                              {guest.respondedAt && <p className="text-[10px] text-neutral-300">{new Date(guest.respondedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-xs text-neutral-400 hidden sm:table-cell">{guest.phone || "-"}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2.5 py-1 text-[10px] tracking-wider uppercase ${config.bg}`}>{config.label}</span>
                        </td>
                        <td className="py-3 px-4 text-center text-xs text-neutral-500 hidden sm:table-cell">{guest.guestCount > 0 ? guest.guestCount : "-"}</td>
                        <td className="py-3 px-4 text-right">
                          <button onClick={() => handleDelete(guest.id)} className="p-1.5 hover:bg-neutral-100 transition-colors"><Trash2 className="w-3.5 h-3.5 text-neutral-300 hover:text-red-400" /></button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredGuests.length === 0 && (
                <div className="text-center py-12 text-neutral-300 text-sm">Tidak ada tamu ditemukan</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
