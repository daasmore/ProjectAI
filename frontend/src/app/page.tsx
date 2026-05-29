"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  MapPin,
  MessageSquare,
  BarChart3,
  Globe,
  Shield,

  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Undangan Elegan",
      desc: "Desain minimalist yang indah dan mudah dikustomisasi.",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "RSVP Online",
      desc: "Tamu langsung konfirmasi kehadiran dari undangan digital.",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Peta Interaktif",
      desc: "Google Maps untuk memudahkan tamu menemukan lokasi.",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "WhatsApp Blast",
      desc: "Kirim undangan ke ratusan nomor via WhatsApp.",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Dashboard Tamu",
      desc: "Kelola & pantau daftar tamu, statistik RSVP, export data.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Anti-Spam",
      desc: "Rate limiting & queue system agar tidak terblokir WA.",
    },
  ];

  const steps = [
    { num: "01", title: "Isi Data Mempelai", desc: "Nama, tanggal, lokasi, dan foto mempelai." },
    { num: "02", title: "Kustomisasi Tema", desc: "Pilih tema, warna, dan musik sesuai selera." },
    { num: "03", title: "Bagikan Undangan", desc: "Kirim via WhatsApp blast atau share link." },
    { num: "04", title: "Pantau RSVP", desc: "Kelola kehadiran tamu melalui dashboard." },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-neutral-400" />
              <span className="text-sm font-medium text-neutral-800 tracking-wider uppercase">Wedding<span className="text-neutral-400">Invite</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-neutral-500 hover:text-neutral-800 transition-colors text-xs tracking-wider uppercase">Beranda</Link>
              <Link href="/invite/sarah-ahmad" className="text-neutral-500 hover:text-neutral-800 transition-colors text-xs tracking-wider uppercase">Undangan</Link>
              <Link href="/dashboard" className="text-neutral-500 hover:text-neutral-800 transition-colors text-xs tracking-wider uppercase">Dashboard</Link>
            </div>
            <Link href="/invite/sarah-ahmad" className="text-xs tracking-wider uppercase text-neutral-500 hover:text-neutral-800 transition-colors border-b border-neutral-200 hover:border-neutral-400 pb-0.5">
              Lihat Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-8 h-px bg-neutral-200" />
              <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
              <div className="w-8 h-px bg-neutral-200" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-neutral-800 leading-tight mb-6"
          >
            Undangan Digital
            <br />
            yang <span className="italic">Berkesan</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-500 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Desain minimalist, RSVP online, dan integrasi WhatsApp.
            Gratis untuk memulai.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/invite/sarah-ahmad"
              className="wedding-btn-primary text-xs"
            >
              Lihat Demo Undangan
            </Link>
            <Link
              href="/dashboard"
              className="wedding-btn-secondary text-xs"
            >
              Dashboard
            </Link>
          </motion.div>

          {/* Preview Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20"
          >
            <div className="relative overflow-hidden border border-neutral-100">
              <div className="aspect-[16/9] bg-neutral-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"
                  alt="Wedding Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white text-left">
                  <p className="text-xl font-serif font-light">Sarah & Ahmad</p>
                  <p className="text-xs opacity-70 mt-1">15 Juli 2026</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-3">Fitur</p>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-neutral-800">
              Semua yang Anda Butuhkan
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white p-6 border border-neutral-100 hover:border-neutral-200 transition-colors"
              >
                <div className="w-8 h-8 flex items-center justify-center text-neutral-400 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-medium text-neutral-800 mb-1.5">{f.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-3">Cara Kerja</p>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-neutral-800">
              Hanya 4 Langkah
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-serif font-light text-neutral-200 mb-3">{s.num}</div>
                <h3 className="text-sm font-medium text-neutral-800 mb-1.5">{s.title}</h3>
                <p className="text-neutral-400 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-neutral-800">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Heart className="w-5 h-5 text-neutral-600 mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-white mb-4">
              Siap Membuat Undangan Anda?
            </h2>
            <p className="text-neutral-400 mb-8 text-sm">
              Mulai buat undangan pernikahan digital yang elegan hari ini.
            </p>
            <Link
              href="/invite/sarah-ahmad"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-neutral-800 text-xs tracking-wider uppercase hover:bg-neutral-100 transition-colors"
            >
              Lihat Demo Sekarang
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-neutral-400 text-[10px] tracking-[0.15em] uppercase">
            © {new Date().getFullYear()} WeddingInvite — Undangan Pernikahan Digital
          </p>
        </div>
      </footer>
    </div>
  );
}
