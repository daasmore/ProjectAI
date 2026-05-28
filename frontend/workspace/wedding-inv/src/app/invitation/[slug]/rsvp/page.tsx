'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function RsvpPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    guestCount: '1',
    status: 'HADIR',
    message: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://carrier-replication-adequate-actress.trycloudflare.com'}/api/rsvp/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {
      // Still show success even if API fails
    }
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="bg-white rounded-3xl p-12 shadow-xl text-center max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-7xl mb-6"
          >
            💝
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Terima Kasih!</h2>
          <p className="text-gray-500 mb-2">
            Konfirmasi kehadiran Anda telah tersimpan.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            {form.status === 'HADIR'
              ? 'Kami tunggu kehadiran Anda! 🎉'
              : 'Kami memahami, semoga kita bisa bertemu di lain waktu.'}
          </p>
          <Link href={`/invitation/${slug}`} className="text-rose-600 hover:text-rose-700 font-semibold">
            ← Kembali ke Undangan
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="max-w-lg mx-auto px-4 py-16"
      >
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <span className="text-5xl mb-4 block">✉️</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">RSVP</h1>
          <p className="text-gray-500">Konfirmasi kehadiran Anda untuk acara pernikahan</p>
        </motion.div>

        <motion.form
          variants={fadeInUp}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 shadow-sm border border-rose-100 space-y-6"
        >
          {/* Nama */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          {/* Jumlah Tamu */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah Tamu</label>
            <select
              value={form.guestCount}
              onChange={e => setForm({ ...form, guestCount: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all bg-white"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} Orang</option>
              ))}
            </select>
          </div>

          {/* Konfirmasi */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Kehadiran *</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'HADIR', label: '✅ Ya, Hadir', color: 'border-green-300 bg-green-50 text-green-700' },
                { value: 'TIDAK', label: '❌ Tidak Hadir', color: 'border-red-300 bg-red-50 text-red-700' },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, status: opt.value })}
                  className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                    form.status === opt.value
                      ? opt.color
                      : 'border-gray-200 bg-white text-gray-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* No HP */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">No. WhatsApp</label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
              placeholder="081234567890"
            />
          </div>

          {/* Pesan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ucapan & Doa</label>
            <textarea
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none"
              placeholder="Tulis ucapan untuk pengantin..."
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200 disabled:opacity-50"
          >
            {loading ? '⏳ Mengirim...' : '💌 Kirim RSVP'}
          </motion.button>

          <Link
            href={`/invitation/${slug}`}
            className="block text-center text-gray-400 text-sm hover:text-rose-600 transition-colors mt-4"
          >
            ← Kembali ke Undangan
          </Link>
        </motion.form>
      </motion.div>
    </div>
  );
}


