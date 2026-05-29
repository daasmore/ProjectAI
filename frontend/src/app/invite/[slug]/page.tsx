"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Music,
  Pause,
  ChevronDown,
  Users,
  MessageSquare,
  Quote,
} from "lucide-react";
import { mockCouple } from "@/lib/mock-data";
import Confetti from "@/components/Confetti";
import Countdown from "@/components/Countdown";
import FloatingParticles from "@/components/FloatingParticles";
import ScrollReveal from "@/components/ScrollReveal";
import RSVPForm from "@/components/RSVPForm";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export default function InvitePage() {
  const couple = mockCouple;
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setShowConfetti(true);
    // Scroll to content after opening
    setTimeout(() => {
      document.getElementById("invitation-content")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* ===== OPENING COVER ===== */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            key="cover"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0">
              <img
                src={couple.heroImage}
                alt="Wedding Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-sage-900/60 via-sage-900/50 to-sage-900/70" />
            </div>

            <FloatingParticles count={15} />

            <div className="relative z-10 text-center text-white px-6 max-w-lg mx-auto">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p className="text-sm tracking-[0.3em] uppercase text-champagne-300 mb-4">
                 The WeddingOf
                </p>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-5xl sm:text-7xl font-serif font-bold mb-2"
              >
                <span className="text-champagne-300">{couple.brideName}</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center justify-center gap-3 mb-2"
              >
                <div className="h-px w-12 bg-champagne-400/60" />
                <Heart className="w-4 h-4 text-champagne-400 fill-champagne-400" />
                <div className="h-px w-12 bg-champagne-400/60" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-5xl sm:text-7xl font-serif font-bold mb-6"
              >
                <span className="text-champagne-300">{couple.groomName}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-white/70 text-sm mb-2"
              >
                {formatDate(couple.date)}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="text-white/60 text-xs mb-8"
              >
                Kepada Yth. Bapak/Ibu/Saudara/i
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <motion.button
                  onClick={handleOpenInvitation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-champagne-500 to-gold-500 text-white font-medium rounded-full shadow-lg shadow-champagne-500/30 hover:shadow-xl transition-all"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  Buka Undangan
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MAIN CONTENT ===== */}
      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Confetti active={showConfetti} />

          {/* Music Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="fixed top-4 right-4 z-40 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-sage-600 hover:text-champagne-600 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Music className="w-4 h-4" />}
          </button>

          <div id="invitation-content">
            {/* Hero Image Section */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={couple.heroImage}
                  alt="Wedding Hero"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-sage-900/50 via-transparent to-sage-900/70" />
              </div>

              <FloatingParticles count={20} />

              <div className="relative z-10 text-center text-white px-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-sm tracking-[0.3em] uppercase text-champagne-300 mb-4"
                >
                 The WeddingOf
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-5xl sm:text-7xl font-serif font-bold mb-2"
                >
                  <span className="text-champagne-300">{couple.brideName}</span>
                  <span className="text-white/80 mx-3">&</span>
                  <span className="text-champagne-300">{couple.groomName}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-white/70 text-lg mt-4"
                >
                  {formatDate(couple.date)}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-8 animate-float"
                >
                  <ChevronDown className="w-6 h-6 text-white/60 mx-auto" />
                </motion.div>
              </div>
            </section>

            {/* Quote Section */}
            <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-cream-50 to-champagne-50/30">
              <div className="max-w-2xl mx-auto text-center">
                <ScrollReveal>
                  <Quote className="w-8 h-8 text-champagne-400 mx-auto mb-6" />
                  <blockquote className="text-lg sm:text-xl text-sage-700 leading-relaxed italic font-serif mb-4">
                    {couple.quote}
                  </blockquote>
                  <p className="text-champagne-600 font-medium text-sm">
                    {couple.quoteSource}
                  </p>
                </ScrollReveal>
              </div>
            </section>

            {/* Couple Profile Section */}
            <section className="py-20 px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-12">
                    <p className="text-sm tracking-[0.2em] uppercase text-champagne-500 mb-2">
                      Mempelai
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-800">
                      Yang Berbahagia
                    </h2>
                  </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  {/* Bride */}
                  <ScrollReveal direction="left">
                    <div className="text-center">
                      <div className="relative w-48 h-48 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-champagne-300 to-gold-400 animate-pulse-soft" />
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
                          alt={couple.brideName}
                          className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                        />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-sage-800 mb-1">
                        {couple.brideName}
                      </h3>
                      <p className="text-champagne-600 text-sm font-medium mb-2">
                        Putri dari
                      </p>
                      <p className="text-sage-500 text-sm">
                        {couple.brideParents}
                      </p>
                    </div>
                  </ScrollReveal>

                  {/* Groom */}
                  <ScrollReveal direction="right">
                    <div className="text-center">
                      <div className="relative w-48 h-48 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-champagne-300 to-gold-400 animate-pulse-soft" />
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                          alt={couple.groomName}
                          className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                        />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-sage-800 mb-1">
                        {couple.groomName}
                      </h3>
                      <p className="text-champagne-600 text-sm font-medium mb-2">
                        Putra dari
                      </p>
                      <p className="text-sage-500 text-sm">
                        {couple.groomParents}
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </section>

            {/* Countdown Section */}
            <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-sage-700 to-sage-800 relative overflow-hidden">
              <FloatingParticles count={10} />
              <div className="max-w-3xl mx-auto text-center relative z-10">
                <ScrollReveal>
                  <p className="text-sm tracking-[0.2em] uppercase text-champagne-400 mb-2">
                    Menghitung Hari
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-10">
                    Menuju Hari Bahagia
                  </h2>
                </ScrollReveal>

                <Countdown targetDate={couple.date} />
              </div>
            </section>

            {/* Event Details Section */}
            <section className="py-20 px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-12">
                    <p className="text-sm tracking-[0.2em] uppercase text-champagne-500 mb-2">
                      Acara Kami
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sage-800">
                      Detail Pernikahan
                    </h2>
                  </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Akad Nikah */}
                  <ScrollReveal direction="left">
                    <div className="wedding-card text-center hover:shadow-xl transition-shadow duration-300">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-champagne-200 to-champagne-300 flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-7 h-7 text-sage-700" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-sage-800 mb-4">
                        Akad Nikah
                      </h3>
                      <div className="space-y-2 text-sage-500 text-sm">
                        <p className="flex items-center justify-center gap-2">
                          <Calendar className="w-4 h-4 text-champagne-500" />
                          {formatDate(couple.date)}
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <Clock className="w-4 h-4 text-champagne-500" />
                          {couple.akadTime}
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <MapPin className="w-4 h-4 text-champagne-500" />
                          {couple.venue}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Resepsi */}
                  <ScrollReveal direction="right">
                    <div className="wedding-card text-center hover:shadow-xl transition-shadow duration-300">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-champagne-200 to-champagne-300 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-7 h-7 text-sage-700" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-sage-800 mb-4">
                        Resepsi
                      </h3>
                      <div className="space-y-2 text-sage-500 text-sm">
                        <p className="flex items-center justify-center gap-2">
                          <Calendar className="w-4 h-4 text-champagne-500" />
                          {formatDate(couple.date)}
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <Clock className="w-4 h-4 text-champagne-500" />
                          {couple.resepsiTime}
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <MapPin className="w-4 h-4 text-champagne-500" />
                          {couple.venue}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </section>

            {/* Maps Section */}
            <section className="py-20 px-4 sm:px-6 bg-champagne-50/30">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-10">
                    <p className="text-sm tracking-[0.2em] uppercase text-champagne-500 mb-2">
                      Lokasi
                    </p>
                    <h2 className="text-3xl font-serif font-bold text-sage-800">
                      Temukan Kami di Peta
                    </h2>
                    <p className="text-sage-500 text-sm mt-2">
                      {couple.venueAddress}
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal>
                  <div className="wedding-card overflow-hidden p-0">
                    <div className="aspect-[16/9] w-full">
                      <iframe
                        src={couple.gmapsEmbed}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Wedding Venue Map"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-champagne-500" />
                        <span className="text-sage-600 text-sm font-medium">
                          {couple.venue}
                        </span>
                      </div>
                      <a
                        href={couple.gmapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2 bg-sage-700 text-white rounded-full text-sm hover:bg-sage-800 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Buka di Google Maps
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </section>

            {/* Gallery Section */}
            <section className="py-20 px-4 sm:px-6">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-10">
                    <p className="text-sm tracking-[0.2em] uppercase text-champagne-500 mb-2">
                      Galeri
                    </p>
                    <h2 className="text-3xl font-serif font-bold text-sage-800">
                      Momen Kami
                    </h2>
                  </div>
                </ScrollReveal>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80",
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
                    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
                    "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80",
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
                    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80",
                  ].map((src, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                      <div className="relative overflow-hidden rounded-xl aspect-square group cursor-pointer">
                        <img
                          src={src}
                          alt={`Gallery ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-sage-900/0 group-hover:bg-sage-900/20 transition-all duration-300" />
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* RSVP Section */}
            <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-sage-700 to-sage-800 relative overflow-hidden">
              <FloatingParticles count={15} />
              <div className="max-w-xl mx-auto relative z-10">
                <ScrollReveal>
                  <div className="text-center mb-8">
                    <MessageSquare className="w-8 h-8 text-champagne-400 mx-auto mb-4" />
                    <p className="text-sm tracking-[0.2em] uppercase text-champagne-400 mb-2">
                      Konfirmasi
                    </p>
                    <h2 className="text-3xl font-serif font-bold text-white">
                      RSVP & Ucapan
                    </h2>
                    <p className="text-sage-300 text-sm mt-2">
                      Mohon konfirmasi kehadiran Anda
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl">
                    <RSVPForm />
                  </div>
                </ScrollReveal>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-4 sm:px-6 bg-sage-800 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <Heart className="w-8 h-8 text-champagne-400 fill-champagne-400 mx-auto mb-4 animate-pulse-soft" />
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  {couple.brideName} & {couple.groomName}
                </h3>
                <p className="text-sage-400 text-sm mb-2">
                  {formatDate(couple.date)}
                </p>
                <div className="w-16 h-px bg-champagne-400/40 mx-auto my-4" />
                <p className="text-sage-500 text-xs">
                  Made with love using WeddingInvite
                </p>
                <p className="text-sage-600 text-xs mt-1">
                  © {new Date().getFullYear()} WeddingInvite
                </p>
              </motion.div>
            </footer>
          </div>
        </motion.div>
      )}
    </div>
  );
}
