'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const features = [
  { icon: '📝', title: 'RSVP Online', desc: 'Tamu konfirmasi kehadiran langsung melalui link. Data terorganisir real-time.' },
  { icon: '🗺️', title: 'Peta Interaktif', desc: 'Google Maps / Open Street Maps multi-lokasi. Tamu bisa navigasi langsung ke venue.' },
  { icon: '💬', title: 'WhatsApp Blast', desc: 'Kirim undangan ke ratusan nomor sekaligus. Anti-spam dengan rate limiting & queue.' },
  { icon: '📊', title: 'Dashboard Admin', desc: 'Pantau statistik RSVP, response rate, dan status pengiriman WA real-time.' },
  { icon: '🎨', title: 'Template Elegant', desc: 'Berbagai tema undangan yang cantik dengan animasi smooth dan responsif.' },
  { icon: '🔒', title: 'Aman & Terpercaya', desc: 'Meta-approved message templates, rate limiting, dan monitoring pengiriman.' },
];

const steps = [
  { step: '1', title: 'Daftar & Buat Undangan', desc: 'Buat akun, isi detail pernikahanmu - nama, tanggal, lokasi, dan foto.' },
  { step: '2', title: 'Kustomisasi Template', desc: 'Pilih tema undangan, tambah gallery foto, dan sesuaikan pesan.' },
  { step: '3', title: 'Import Daftar Tamu', desc: 'Upload CSV atau input manual daftar tamu beserta nomor WhatsApp.' },
  { step: '4', title: 'Blast via WhatsApp', desc: 'Kirim undangan otomatis ke semua tamu. Semua ter-tracking.' },
  { step: '5', title: 'Pantau RSVP', desc: 'Tamu konfirmasi kehadiran via link. Dashboard real-time.' },
];

const testimonials = [
  { name: 'Rina & Andi', loc: 'Jakarta', text: 'Undangan digitalnya elegan banget! Semua tamu suka dan RSVP-nya otomatis. Sangat membantu!' },
  { name: 'Dewi & Budi', loc: 'Bandung', text: 'WhatsApp blast-nya sangat membantu. Gak perlu chat satu-satu lagi. Tinggal klik, semua undangan terkirim.' },
  { name: 'Siti & Ahmad', loc: 'Surabaya', text: 'Maps integration-nya keren. Tamu gak nyasar karena bisa langsung navigasi dari undangan.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💒</span>
            <span className="text-xl font-bold text-rose-600">WeddBot</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#fitur" className="hover:text-rose-600 transition-colors">Fitur</a>
            <a href="#cara-kerja" className="hover:text-rose-600 transition-colors">Cara Kerja</a>
            <a href="#testimoni" className="hover:text-rose-600 transition-colors">Testimoni</a>
            <Link href="/admin" className="bg-rose-600 text-white px-4 py-2 rounded-full hover:bg-rose-700 transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </motion.nav>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="max-w-6xl mx-auto px-4 pt-20 pb-32 text-center"
      >
        <motion.div variants={fadeIn} className="mb-6">
          <span className="text-6xl inline-block">💍</span>
        </motion.div>
        <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Undangan Digital
          <br />
          <span className="text-rose-600">Yang Berkesan</span>
        </motion.h1>
        <motion.p variants={fadeIn} className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Buat undangan pernikahan digital yang elegan dengan RSVP online,
          peta lokasi, dan blast WhatsApp otomatis. Semua dalam satu platform.
        </motion.p>
        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/invitation/ahmad-siti"
            className="bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-700 transition-all hover:scale-105 shadow-lg shadow-rose-200"
          >
            ✨ Lihat Sample Undangan
          </Link>
          <Link
            href="/admin"
            className="border-2 border-rose-300 text-rose-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-50 transition-all"
          >
            📊 Dashboard Admin
          </Link>
        </motion.div>
      </motion.section>

      <motion.section
        id="fitur"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="max-w-6xl mx-auto px-4 py-20"
      >
        <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-center mb-4">
          Fitur Unggulan
        </motion.h2>
        <motion.p variants={fadeIn} className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
          Semua yang kamu butuhkan untuk undangan pernikahan modern
        </motion.p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="bg-white rounded-2xl p-8 shadow-sm border border-rose-100 hover:shadow-lg hover:border-rose-200 transition-all"
            >
              <span className="text-4xl mb-4 block">{f.icon}</span>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-500">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section id="cara-kerja" className="bg-rose-50 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-4xl mx-auto px-4"
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-center mb-16">
            Cara Kerja
          </motion.h2>
          <div className="space-y-8">
            {steps.map((s, i) => (
              <motion.div key={i} variants={fadeIn} className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{s.title}</h3>
                  <p className="text-gray-600">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.section
        id="testimoni"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="max-w-6xl mx-auto px-4 py-20"
      >
        <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-center mb-16">
          Kata Mereka
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeIn} className="bg-white rounded-2xl p-8 shadow-sm border border-rose-100">
              <p className="text-gray-600 mb-4 italic">&ldquo;{t.text}&rdquo;</p>
              <p className="font-bold text-rose-600">{t.name}</p>
              <p className="text-sm text-gray-400">{t.loc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">💒</span>
            <span className="text-xl font-bold">WeddBot</span>
          </div>
          <p className="text-gray-400 mb-4">Platform Undangan Digital #1 di Indonesia</p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Tentang</a>
            <a href="#" className="hover:text-white transition-colors">Fitur</a>
            <a href="#" className="hover:text-white transition-colors">Harga</a>
            <a href="#" className="hover:text-white transition-colors">Kontak</a>
          </div>
          <p className="text-gray-600 text-sm mt-8">&copy; 2026 Wedding Invitation SaaS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
