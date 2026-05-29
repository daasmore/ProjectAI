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
  Phone,
  MessageSquare,
  X,
} from "lucide-react";
import { mockGuests, type Guest } from "@/lib/mock-data";
import WeddingNavbar from "@/components/WeddingNavbar";
import ScrollReveal from "@/components/ScrollReveal";

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
    totalAttending: guests
      .filter((g) => g.status === "confirmed")
      .reduce((sum, g) => sum + g.guestCount, 0),
  };

  const handleDelete = (id: string) => {
    setGuests(guests.filter((g) => g.id !== id));
  };

  const handleAddGuest = () => {
    if (!newGuest.name.trim()) return;
    const guest: Guest = {
      id: String(Date.now()),
      name: newGuest.name,
      phone: newGuest.phone,
      guestCount: newGuest.guestCount,
      status: "pending",
    };
    setGuests([guest, ...guests]);
    setNewGuest({ name: "", phone: "", guestCount: 1 });
    setShowAddForm(false);
  };

  const handleExportCSV = () => {
    const header = "Nama,Telepon,Status,Jumlah Tamu,Pesan,Tanggal Respon\n";
    const rows = guests
      .map(
        (g) =>
          `"${g.name}","${g.phone || ""}","${g.status}",${g.guestCount},"${g.message || ""}","${g.respondedAt || ""}"`
      )
      .join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "daftar-tamu-rsvp.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusConfig = {
    confirmed: {
      label: "Hadir",
      icon: <CheckCircle className="w-4 h-4" />,
      bg: "bg-green-100 text-green-700 border-green-200",
      dot: "bg-green-500",
    },
    declined: {
      label: "Tidak Hadir",
      icon: <XCircle className="w-4 h-4" />,
      bg: "bg-red-100 text-red-700 border-red-200",
      dot: "bg-red-500",
    },
    pending: {
      label: "Menunggu",
      icon: <Clock className="w-4 h-4" />,
      bg: "bg-amber-100 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    },
  };

  const statCards = [
    {
      label: "Total Tamu",
      value: stats.total,
      icon: <Users className="w-5 h-5" />,
      color: "from-sage-500 to-sage-600",
    },
    {
      label: "Konfirmasi Hadir",
      value: stats.confirmed,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Tidak Hadir",
      value: stats.declined,
      icon: <XCircle className="w-5 h-5" />,
      color: "from-red-500 to-red-600",
    },
    {
      label: "Menunggu",
      value: stats.pending,
      icon: <Clock className="w-5 h-5" />,
      color: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-cream-50 bg-wedding-pattern">
      <WeddingNavbar />

      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-sage-800 mb-2">
                Dashboard Tamu
              </h1>
              <p className="text-sage-500">
                Kelola daftar tamu dan pantau RSVP pernikahan Anda
              </p>
            </div>
          </ScrollReveal>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <div className="wedding-card">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}
                    >
                      {stat.icon}
                    </div>
                    <span className="text-2xl font-bold text-sage-800">{stat.value}</span>
                  </div>
                  <p className="text-sm text-sage-500">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Chart Bar */}
          <ScrollReveal>
            <div className="wedding-card mb-8">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-champagne-500" />
                <h3 className="font-semibold text-sage-800">Statistik Kehadiran</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Hadir", count: stats.confirmed, total: stats.total, color: "bg-green-500" },
                  { label: "Tidak Hadir", count: stats.declined, total: stats.total, color: "bg-red-500" },
                  { label: "Menunggu", count: stats.pending, total: stats.total, color: "bg-amber-500" },
                ].map((bar) => (
                  <div key={bar.label} className="flex items-center gap-4">
                    <span className="text-sm text-sage-600 w-24 shrink-0">{bar.label}</span>
                    <div className="flex-1 h-6 bg-sage-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${bar.total > 0 ? (bar.count / bar.total) * 100 : 0}%`,
                        }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`h-full ${bar.color} rounded-full`}
                      />
                    </div>
                    <span className="text-sm font-semibold text-sage-700 w-10 text-right">
                      {bar.count}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-champagne-100 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-sage-500" />
                  <span className="text-sage-600">
                    Total yang akan hadir:{" "}
                    <strong className="text-sage-800">{stats.totalAttending} orang</strong>
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Guest List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="wedding-card"
          >
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h3 className="font-semibold text-sage-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-champagne-500" />
                Daftar Tamu ({filteredGuests.length})
              </h3>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari tamu..."
                    className="pl-9 pr-4 py-2 text-sm border border-champagne-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-champagne-400 w-full sm:w-56"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-champagne-500 text-white text-sm rounded-xl hover:bg-champagne-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-champagne-200 text-sage-600 text-sm rounded-xl hover:bg-champagne-50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
              {(
                [
                  { key: "all", label: "Semua" },
                  { key: "confirmed", label: "Hadir" },
                  { key: "declined", label: "Tidak Hadir" },
                  { key: "pending", label: "Menunggu" },
                ] as const
              ).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-all duration-200 ${
                    filter === key
                      ? "bg-champagne-500 text-white shadow-md"
                      : "bg-white border border-champagne-200 text-sage-500 hover:bg-champagne-50"
                  }`}
                >
                  {label}
                  {key !== "all" && (
                    <span className="ml-1.5 text-xs opacity-70">
                      ({guests.filter((g) => g.status === key).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Add Guest Form */}
            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="bg-champagne-50/50 rounded-xl p-4 border border-champagne-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-sage-800 text-sm">Tambah Tamu Manual</h4>
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="p-1 hover:bg-champagne-100 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-sage-500" />
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={newGuest.name}
                        onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                        placeholder="Nama tamu"
                        className="wedding-input text-sm py-2.5"
                      />
                      <input
                        type="text"
                        value={newGuest.phone}
                        onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                        placeholder="No. telepon (opsional)"
                        className="wedding-input text-sm py-2.5"
                      />
                      <div className="flex gap-2">
                        <select
                          value={newGuest.guestCount}
                          onChange={(e) =>
                            setNewGuest({ ...newGuest, guestCount: Number(e.target.value) })
                          }
                          className="wedding-input text-sm py-2.5 flex-1"
                        >
                          {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>
                              {n} orang
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={handleAddGuest}
                          disabled={!newGuest.name.trim()}
                          className="wedding-btn-primary text-sm py-2.5 px-4 disabled:opacity-40"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Guest Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-champagne-200">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-sage-500 uppercase tracking-wider">
                      Tamu
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-sage-500 uppercase tracking-wider hidden sm:table-cell">
                      Telepon
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-sage-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-sage-500 uppercase tracking-wider hidden sm:table-cell">
                      Jumlah
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-sage-500 uppercase tracking-wider hidden md:table-cell">
                      Pesan
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-sage-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredGuests.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-sage-400">
                          <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
                          <p className="text-sm">Tidak ada tamu ditemukan</p>
                        </td>
                      </tr>
                    ) : (
                      filteredGuests.map((guest, index) => {
                        const config = statusConfig[guest.status];
                        return (
                          <motion.tr
                            key={guest.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                            className="border-b border-champagne-100 hover:bg-champagne-50/30 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-champagne-200 to-champagne-300 flex items-center justify-center shrink-0">
                                  <User className="w-4 h-4 text-sage-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-sage-800">{guest.name}</p>
                                  {guest.respondedAt && (
                                    <p className="text-xs text-sage-400">
                                      {new Date(guest.respondedAt).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell">
                              <div className="flex items-center gap-1.5 text-sm text-sage-500">
                                <Phone className="w-3.5 h-3.5 text-sage-400" />
                                {guest.phone || "-"}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.bg}`}
                              >
                                {config.icon}
                                <span className="hidden sm:inline">{config.label}</span>
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center hidden sm:table-cell">
                              <span className="text-sm text-sage-600 font-medium">
                                {guest.guestCount > 0 ? guest.guestCount : "-"}
                              </span>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <div className="flex items-center gap-1.5 text-sm text-sage-500 max-w-xs truncate">
                                <MessageSquare className="w-3.5 h-3.5 text-sage-400 shrink-0" />
                                <span className="truncate">{guest.message || "-"}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => handleDelete(guest.id)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                title="Hapus tamu"
                              >
                                <Trash2 className="w-4 h-4 text-sage-400 group-hover:text-red-500" />
                              </button>
                            </td>
                          </motion.tr>
                        );
                      })
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
