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
  ChevronRight,
  Stars,
} from "lucide-react";
import WeddingNavbar from "@/components/WeddingNavbar";
import WeddingFooter from "@/components/WeddingFooter";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingParticles from "@/components/FloatingParticles";

export default function LandingPage() {
  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Undangan Elegan",
      desc: "Template cantik dengan animasi mewah yang memukau tamu undangan.",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "RSVP Online",
      desc: "Tamu bisa konfirmasi kehadiran langsung dari undangan digital.",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Peta Interaktif",
      desc: "Google Maps embed untuk memudahkan tamu menemukan lokasi acara.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "WhatsApp Blast",
      desc: "Kirim undangan ke ratusan nomor sekaligus via WhatsApp.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Dashboard Tamu",
      desc: "Kelola & pantau daftar tamu, statistik RSVP, dan export data.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Anti-Spam",
      desc: "Rate limiting & queue system agar tidak terblokir WhatsApp.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Isi Data Mempelai",
      desc: "Masukkan nama, tanggal, lokasi, dan foto mempelai.",
    },
    {
      num: "02",
      title: "Kustomisasi Undangan",
      desc: "Pilih tema, warna, dan musik yang sesuai dengan selera Anda.",
    },
    {
      num: "03",
      title: "Bagikan Undangan",
      desc: "Kirim via WhatsApp blast atau share link undangan ke tamu.",
    },
    {
      num: "04",
      title: "Pantau RSVP",
      desc: "Kelola kehadiran tamu melalui dashboard yang informatif.",
    },
  ];

  const testimonials = [
    {
      name: "Rina & Fajar",
      text: "Undangan digitalnya sangat cantik! Tamu-tamu pada kagum dan semua RSVP bisa terpantau dengan mudah.",
      date: "April 2026",
    },
    {
      name: "Dita & Rama",
      text: "Fitur WhatsApp blast-nya sangat membantu. 200+ undangan terkirim dalam hitungan menit!",
      date: "Mei 2026",
    },
    {
      name: "Lestari & Budi",
      text: "Animasinya mewah seperti undangan beneran. Mempelai jadi lebih berkesan di mata tamu.",
      date: "Juni 2026",
    },
  ];

  return (
    <div className="min-h-screen">
      <WeddingNavbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <FloatingParticles count={25} />

        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-champagne-100/50 via-cream-50 to-cream-50 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champagne-100/80 border border-champagne-200 mb-8">
              <Sparkles className="w-4 h-4 text-champagne-500" />
              <span className="text-sm text-sage-600 font-medium">
                Undangan Pernikahan Digital Premium
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-sage-800 leading-tight mb-6"
          >
            Undangan yang{" "}
            <span className="text-gradient-gold">Berkesan</span>
            <br />
            untuk Hari yang{" "}
            <span className="text-gradient-gold">Spesial</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-sage-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Buat undangan pernikahan digital dengan animasi elegan,
            RSVP online, dan integrasi WhatsApp. Gratis untuk memulai!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/invite/sarah-ahmad"
              className="wedding-btn-primary text-base px-10 py-4 group"
            >
              Lihat Demo Undangan
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/dashboard"
              className="wedding-btn-secondary text-base px-10 py-4"
            >
              Dashboard
            </Link>
          </motion.div>

          {/* Wedding image preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-champagne-300/30 border border-champagne-200/60">
              <div className="aspect-[16/9] bg-gradient-to-br from-champagne-100 to-champagne-200 relative">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"
                  alt="Wedding Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-900/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <p className="text-2xl font-serif font-semibold">Sarah & Ahmad</p>
                  <p className="text-sm opacity-80">15 Juli 2026</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-800 mb-4">
                Fitur Lengkap untuk Pernikahan Sempurna
              </h2>
              <p className="text-sage-500 max-w-2xl mx-auto">
                Semua yang Anda butuhkan untuk membuat undangan pernikahan digital yang mengesankan.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <div className="wedding-card h-full hover:shadow-xl hover:shadow-champagne-200/40 transition-shadow duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-champagne-200 to-champagne-300 flex items-center justify-center text-sage-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-sage-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sage-500 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-champagne-50/50 to-cream-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-800 mb-4">
                Cara Kerjanya
              </h2>
              <p className="text-sage-500 max-w-2xl mx-auto">
                Hanya dalam 4 langkah, undangan pernikapan digital Anda siap dibagikan.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <ScrollReveal key={step.num} delay={index * 0.15}>
                <div className="text-center relative">
                  <div className="text-5xl font-serif font-bold text-champagne-200 mb-2">
                    {step.num}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-sage-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sage-500 text-sm">{step.desc}</p>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 text-champagne-300">
                      <ChevronRight className="w-8 h-8" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-800 mb-4">
                Apa Kata Mereka?
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <ScrollReveal key={t.name} delay={index * 0.15}>
                <div className="wedding-card h-full">
                  <Stars className="w-5 h-5 text-champagne-400 mb-3" />
                  <p className="text-sage-600 text-sm leading-relaxed mb-4 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-auto pt-4 border-t border-champagne-100">
                    <p className="font-serif font-semibold text-sage-800 text-sm">{t.name}</p>
                    <p className="text-xs text-sage-400">{t.date}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-sage-700 to-sage-800 relative overflow-hidden">
        <FloatingParticles count={10} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <ScrollReveal>
            <Heart className="w-10 h-10 text-champagne-400 fill-champagne-400 mx-auto mb-6 animate-float" />
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
              Siap Membuat Undangan Anda?
            </h2>
            <p className="text-sage-300 mb-8">
              Mulai buat undangan pernikahan digital yang elegan dan berkesan hari ini.
            </p>
            <Link
              href="/invite/sarah-ahmad"
              className="wedding-btn-primary text-base px-10 py-4"
            >
              Lihat Demo Sekarang
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <WeddingFooter />
    </div>
  );
}
