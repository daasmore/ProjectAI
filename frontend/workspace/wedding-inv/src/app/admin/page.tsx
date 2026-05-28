'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const COLORS = ['#e11d48', '#f59e0b', '#6b7280'];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 52, hadir: 35, tidakHadir: 10, pending: 5, totalTamu: 89, responseRate: 86 });
  const [guests, setGuests] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'guests' | 'blast'>('overview');

  useEffect(() => {
    // Generate 52 dummy guests
    const names = [
      'Budi Santoso', 'Dewi Lestari', 'Rizky Maulana', 'Putri Wulandari', 'Agus Prasetyo',
      'Siti Nurhaliza', 'Andi Wijaya', 'Rina Marlina', 'Dedi Kurniawan', 'Maya Sari',
      'Fajar Nugroho', 'Lina Susanti', 'Hendra Gunawan', 'Nur Aini', 'Yoga Pratama',
      'Rahma Fitri', 'Bayu Aditya', 'Anisa Putri', 'Dimas Mahendra', 'Winda Kusuma',
      'Ilham Ramadhan', 'Fitri Handayani', 'Rizal Effendi', 'Novi Anggraini', 'Arief Budiman',
      'Citra Dewi', 'Wahyu Hidayat', 'Indah Permata', 'Bambang Suryadi', 'Ratna Sari',
      'Eko Prasetyo', 'Hana Safitri', 'Joko Widodo', 'Kartika Sari', 'Lukman Hakim',
      'Mega Puspita', 'Nanda Pratama', 'Olivia Putri', 'Pandu Wijaya', 'Qori Amalia',
      'Reza Firmansyah', 'Sari Rahmawati', 'Taufik Hidayat', 'Umi Kalsum', 'Vino Bastian',
      'Winda Lestari', 'Yuli Rahma', 'Zahra Maulina', 'Ahmad Dahlan', 'Bella Putri',
      'Cahyo Wibowo', 'Dian Permata',
    ];
    const msgs = [
      'Selamat ya! Semoga sakinah mawaddah warahmah 🤲',
      'Alhamdulillah, selamat menempuh hidup baru!',
      'Semoga bahagia selalu 💕',
      'Aamiin, selamat ya bro!',
      'Gak sabar datang ke pernikahannya!',
      'Semoga lancar sampai hari H!',
      'Seloga menjadi keluarga yang abadi.',
      'Alhamdulillah, akhirnya menikah juga!',
      'Semoga diberkahi.',
      'Selamat! Doa terbaik untuk kalian.',
    ];
    const statuses: ('HADIR' | 'TIDAK' | 'PENDING')[] = [
      ...Array(35).fill('HADIR'),
      ...Array(10).fill('TIDAK'),
      ...Array(5).fill('PENDING'),
    ];
    const phones = Array.from({ length: 50 }, (_, i) => `08${String(1234567890 + i).slice(0, 10)}`);

    const dummy = names.map((name, i) => ({
      id: i + 1,
      name,
      guestCount: statuses[i] === 'HADIR' ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 2) + 1,
      status: statuses[i],
      message: msgs[i % msgs.length],
      phone: phones[i],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    }));
    setGuests(dummy);
  }, []);

  const pieData = [
    { name: 'Hadir', value: stats.hadir },
    { name: 'Tidak Hadir', value: stats.tidakHadir },
    { name: 'Pending', value: stats.pending },
  ];

  const weeklyData = [
    { day: 'Min', hadir: 8, tidak: 2 },
    { day: 'Sen', hadir: 12, tidak: 1 },
    { day: 'Sel', hadir: 15, tidak: 3 },
    { day: 'Rab', hadir: 18, tidak: 4 },
    { day: 'Kam', hadir: 25, tidak: 6 },
    { day: 'Jum', hadir: 30, tidak: 8 },
    { day: 'Sab', hadir: 35, tidak: 10 },
  ];

  const blastLogs = guests.slice(0, 30).map((g, i) => ({
    id: i + 1,
    guestName: g.name,
    phone: g.phone,
    status: ['SENT', 'DELIVERED', 'DELIVERED', 'FAILED'][Math.floor(Math.random() * 4)],
    sentAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  }));

  const exportCSV = () => {
    const headers = 'Nama,Jumlah Tamu,Status,No HP,Tanggal\n';
    const rows = guests.map(g => `${g.name},${g.guestCount},${g.status},${g.phone},${g.createdAt}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'daftar-tamu-rsvp.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar + Main */}
      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-white border-r border-gray-100 min-h-screen p-6 hidden md:block sticky top-0 h-screen"
        >
          <div className="flex items-center gap-2 mb-10">
            <span className="text-2xl">💒</span>
            <span className="text-xl font-bold text-rose-600">WeddBot</span>
          </div>
          <nav className="space-y-2">
            {[
              { id: 'overview', icon: '📊', label: 'Overview' },
              { id: 'guests', icon: '👥', label: 'Daftar Tamu' },
              { id: 'blast', icon: '💬', label: 'WA Blast' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                  activeTab === item.id
                    ? 'bg-rose-50 text-rose-600 font-semibold'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="absolute bottom-6 left-6 right-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-rose-600 transition-colors">
              ← Kembali ke Home
            </Link>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between"
          >
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-400 text-sm">Ahmad & Siti — 15 Juli 2026</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportCSV}
                className="bg-rose-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-rose-700 transition-colors"
              >
                📥 Export CSV
              </button>
            </div>
          </motion.header>

          <div className="p-8">
            {/* Mobile Nav */}
            <div className="flex md:hidden gap-2 mb-6 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'guests', label: 'Tamu' },
                { id: 'blast', label: 'Blast' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap ${
                    activeTab === item.id ? 'bg-rose-600 text-white' : 'bg-white text-gray-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Total Tamu', value: stats.total, icon: '👥', color: 'bg-blue-50 text-blue-600' },
                    { label: 'Hadir', value: stats.hadir, icon: '✅', color: 'bg-green-50 text-green-600' },
                    { label: 'Tidak Hadir', value: stats.tidakHadir, icon: '❌', color: 'bg-red-50 text-red-600' },
                    { label: 'Response Rate', value: `${stats.responseRate}%`, icon: '📈', color: 'bg-amber-50 text-amber-600' },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      variants={fadeInUp}
                      className="bg-white rounded-2xl p-6 border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl">{s.icon}</span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">{s.value}</div>
                      <div className="text-sm text-gray-400 mt-1">{s.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">📊 Response Rate Mingguan</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="hadir" fill="#e11d48" radius={[8, 8, 0, 0]} name="Hadir" />
                        <Bar dataKey="tidak" fill="#6b7280" radius={[8, 8, 0, 0]} name="Tidak" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">🥧 Distribusi RSVP</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" label>
                          {pieData.map((_, i) => (
                            <Cell key={i} fill={COLORS[i]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === 'guests' && (
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800">👥 Daftar Tamu RSVP ({guests.length})</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Nama</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Jumlah</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Pesan</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Tanggal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {guests.map((g, i) => (
                          <motion.tr
                            key={g.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.02 }}
                            className="border-t border-gray-50 hover:bg-rose-50/30 transition-colors"
                          >
                            <td className="px-6 py-4 font-medium text-gray-900">{g.name}</td>
                            <td className="px-6 py-4 text-gray-600">{g.guestCount}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                g.status === 'HADIR' ? 'bg-green-100 text-green-700' :
                                g.status === 'TIDAK' ? 'bg-red-100 text-red-700' :
                                'bg-amber-100 text-amber-700'
                              }`}>
                                {g.status === 'HADIR' ? '✅ Hadir' : g.status === 'TIDAK' ? '❌ Tidak' : '⏳ Pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500 text-sm hidden md:table-cell max-w-xs truncate">{g.message}</td>
                            <td className="px-6 py-4 text-gray-400 text-sm hidden lg:table-cell">{g.createdAt}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'blast' && (
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Total Terkirim', value: 30, icon: '📤', prefix: '' },
                    { label: 'Delivered', value: 25, icon: '✅', prefix: '' },
                    { label: 'Failed', value: 3, icon: '❌', prefix: '' },
                    { label: 'Delivery Rate', value: '83%', icon: '📈', prefix: '' },
                  ].map((s, i) => (
                    <motion.div key={i} variants={fadeInUp} className="bg-white rounded-2xl p-6 border border-gray-100">
                      <span className="text-2xl mb-2 block">{s.icon}</span>
                      <div className="text-3xl font-bold text-gray-900">{s.value}</div>
                      <div className="text-sm text-gray-400 mt-1">{s.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800">💬 Log WhatsApp Blast</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Nama</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">No HP</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Waktu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blastLogs.map((b, i) => (
                          <motion.tr
                            key={b.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.02 }}
                            className="border-t border-gray-50 hover:bg-rose-50/30 transition-colors"
                          >
                            <td className="px-6 py-4 font-medium text-gray-900">{b.guestName}</td>
                            <td className="px-6 py-4 text-gray-600 font-mono text-sm">{b.phone}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                b.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                b.status === 'SENT' ? 'bg-blue-100 text-blue-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {b.status === 'DELIVERED' ? '✅ Delivered' : b.status === 'SENT' ? '📤 Sent' : '❌ Failed'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-400 text-sm hidden md:table-cell">
                              {new Date(b.sentAt).toLocaleString('id-ID')}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
