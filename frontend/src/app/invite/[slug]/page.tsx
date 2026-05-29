"use client";

import { useState, useEffect } from "react";
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
  MessageSquare,

} from "lucide-react";
import { mockCouple } from "@/lib/mock-data";
import RSVPForm from "@/components/RSVPForm";
import FloatingParticles from "@/components/FloatingParticles";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function formatTime(t: string) {
  return t;
}

export default function InvitePage() {
  const [couple, setCouple] = useState(mockCouple);
  const [loading, setLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch("/api/v1/weddings/04bf40ea-153f-4378-a896-8889f56f9dce/config")
      .then((r) => r.json())
      .then((data) => {
        if (data.bride_name) {
          setCouple({
            brideName: data.bride_name || mockCouple.brideName,
            groomName: data.groom_name || mockCouple.groomName,
            date: data.wedding_date || mockCouple.date,
            venue: data.venue || mockCouple.venue,
            venueAddress: data.venue_address || mockCouple.venueAddress,
            akadTime: data.akad_time || mockCouple.akadTime,
            resepsiTime: data.resepsi_time || mockCouple.resepsiTime,
            quote: data.quote || mockCouple.quote,
            quoteSource: data.quote_source || mockCouple.quoteSource,
            brideParents: data.bride_parents || mockCouple.brideParents,
            groomParents: data.groom_parents || mockCouple.groomParents,
            slug: mockCouple.slug,
            gmapsUrl: mockCouple.gmapsUrl,
            gmapsEmbed: mockCouple.gmapsEmbed,
            heroImage: data.hero_image || mockCouple.heroImage,
            coupleImage: data.photo_url || mockCouple.coupleImage,
          });
        }
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-neutral-300 text-sm">Loading...</div>
      </div>
    );
  }

  const weddingDate = new Date(couple.date);
  const now = new Date();
  const diff = weddingDate.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));

  return (
    <div className="min-h-screen bg-white">
      {/* ===== OPENING COVER ===== */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            key="cover"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          >
            <FloatingParticles count={15} />
            <div className="text-center px-8 max-w-md mx-auto">
              {/* Small decorative line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-px bg-neutral-300 mx-auto mb-8"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xs tracking-[0.35em] uppercase text-neutral-400 mb-6"
              >
                The Wedding Of
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h1 className="text-4xl sm:text-5xl font-serif font-light text-neutral-800 leading-tight">
                  {couple.brideName}
                </h1>
                <div className="flex items-center justify-center gap-4 my-4">
                  <div className="h-px w-8 bg-neutral-200" />
                  <span className="text-neutral-400 font-serif text-lg italic">&</span>
                  <div className="h-px w-8 bg-neutral-200" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-serif font-light text-neutral-800 leading-tight">
                  {couple.groomName}
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="my-8"
              >
                <p className="text-neutral-500 text-sm tracking-wide">
                  {formatDate(couple.date)}
                </p>
                <p className="text-neutral-400 text-xs mt-2">
                  {couple.venue}
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                onClick={() => setIsOpened(true)}
                className="group inline-flex items-center gap-2 px-8 py-3 border border-neutral-200 text-neutral-600 text-sm tracking-wider uppercase hover:bg-neutral-800 hover:text-white hover:border-neutral-800 transition-all duration-300 rounded-none"
              >
                <Heart className="w-3.5 h-3.5" />
                Buka Undangan
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="mt-12"
              >
                <p className="text-neutral-300 text-[10px] tracking-[0.2em] uppercase">
                  With Love
                </p>
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
          transition={{ duration: 0.6 }}
        >
          {/* Music Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="fixed top-5 right-5 z-40 w-9 h-9 rounded-full border border-neutral-200 bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:border-neutral-300 transition-all"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Music className="w-3.5 h-3.5" />}
          </button>

          {/* ===== HERO ===== */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
                alt="Wedding"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />
            </div>

            <div className="relative z-10 text-center text-white px-8 max-w-2xl mx-auto">
              <FloatingParticles count={20} />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/60 mb-8">
                  The Wedding Of
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <h1 className="text-5xl sm:text-7xl font-serif font-light leading-tight">
                  {couple.brideName}
                </h1>
                <div className="flex items-center justify-center gap-6 my-5">
                  <div className="h-px w-10 bg-white/30" />
                  <Heart className="w-3.5 h-3.5 text-white/50" />
                  <div className="h-px w-10 bg-white/30" />
                </div>
                <h1 className="text-5xl sm:text-7xl font-serif font-light leading-tight">
                  {couple.groomName}
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-10"
              >
                <div className="w-12 h-px bg-white/30 mx-auto mb-6" />
                <p className="text-white/60 text-xs tracking-[0.3em] uppercase">
                  {formatDate(couple.date)}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-16"
              >
                <ChevronDown className="w-5 h-5 text-white/40 mx-auto animate-bounce" />
              </motion.div>
            </div>
          </section>

          {/* ===== QUOTE ===== */}
          <section className="py-24 sm:py-32 px-6 bg-neutral-50">
            <div className="max-w-xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-8 h-px bg-neutral-300 mx-auto mb-10" />
                <blockquote className="text-base sm:text-lg text-neutral-600 leading-relaxed italic font-serif">
                  &ldquo;{couple.quote}&rdquo;
                </blockquote>
                <p className="text-neutral-400 text-xs tracking-wider mt-6 uppercase">
                  {couple.quoteSource}
                </p>
              </motion.div>
            </div>
          </section>

          {/* ===== COUPLE ===== */}
          <section className="py-24 sm:py-32 px-6">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-3">
                  Mempelai
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-light text-neutral-800">
                  Yang Berbahagia
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                {/* Bride */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8 rounded-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
                      alt={couple.brideName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-serif font-light text-neutral-800 mb-1">
                    {couple.brideName}
                  </h3>
                  <div className="w-6 h-px bg-neutral-200 mx-auto my-4" />
                  <p className="text-neutral-400 text-xs tracking-wider uppercase mb-1">
                    Putri dari
                  </p>
                  <p className="text-neutral-500 text-sm">
                    {couple.brideParents}
                  </p>
                </motion.div>

                {/* Groom */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8 rounded-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                      alt={couple.groomName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-serif font-light text-neutral-800 mb-1">
                    {couple.groomName}
                  </h3>
                  <div className="w-6 h-px bg-neutral-200 mx-auto my-4" />
                  <p className="text-neutral-400 text-xs tracking-wider uppercase mb-1">
                    Putra dari
                  </p>
                  <p className="text-neutral-500 text-sm">
                    {couple.groomParents}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ===== EVENT DETAILS ===== */}
          <section className="py-24 sm:py-32 px-6 bg-neutral-50">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-3">
                  Acara
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-light text-neutral-800">
                  Detail Pernikahan
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Akad */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-8 sm:p-10 text-center border border-neutral-100"
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
                    Akad Nikah
                  </p>
                  <div className="w-6 h-px bg-neutral-200 mx-auto mb-6" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-neutral-600">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-sm">{formatDate(couple.date)}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-neutral-600">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-sm">{formatTime(couple.akadTime)}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-neutral-600">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-sm">{couple.venue}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Resepsi */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white p-8 sm:p-10 text-center border border-neutral-100"
                >
                  <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
                    Resepsi
                  </p>
                  <div className="w-6 h-px bg-neutral-200 mx-auto mb-6" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-neutral-600">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-sm">{formatDate(couple.date)}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-neutral-600">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-sm">{formatTime(couple.resepsiTime)}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-neutral-600">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-sm">{couple.venue}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Venue Address */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-8 text-center"
              >
                <p className="text-neutral-500 text-sm mb-4">{couple.venueAddress}</p>
                <a
                  href={couple.gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-neutral-500 text-sm hover:text-neutral-800 transition-colors border-b border-neutral-200 hover:border-neutral-400 pb-0.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Lihat di Google Maps
                  <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>
            </div>
          </section>

          {/* ===== COUNTDOWN ===== */}
          <section className="py-24 sm:py-32 px-6">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-10">
                  Menghitung Hari
                </p>
                <div className="flex items-center justify-center gap-6 sm:gap-10">
                  {[
                    { value: daysLeft, label: "Hari" },
                    { value: 0, label: "Jam" },
                    { value: 0, label: "Menit" },
                    { value: 0, label: "Detik" },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl sm:text-5xl font-serif font-light text-neutral-800">
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-2">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ===== GALLERY ===== */}
          <section className="py-24 sm:py-32 px-6 bg-neutral-50">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-3">
                  Galeri
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-light text-neutral-800">
                  Momen Kami
                </h2>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {[
                  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80",
                  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
                  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
                  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80",
                  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
                  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80",
                ].map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="aspect-square overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== RSVP ===== */}
          <section className="py-24 sm:py-32 px-6">
            <div className="max-w-lg mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <MessageSquare className="w-5 h-5 text-neutral-300 mx-auto mb-4" />
                <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-3">
                  Konfirmasi
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-light text-neutral-800">
                  RSVP & Ucapan
                </h2>
                <p className="text-neutral-400 text-sm mt-3">
                  Mohon konfirmasi kehadiran Anda
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-neutral-50 p-6 sm:p-10 border border-neutral-100"
              >
                <RSVPForm />
              </motion.div>
            </div>
          </section>

          {/* ===== FOOTER ===== */}
          <footer className="py-16 px-6 bg-neutral-800 text-center relative overflow-hidden">
            <FloatingParticles count={10} />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Heart className="w-5 h-5 text-neutral-600 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-light text-white mb-1">
                {couple.brideName} & {couple.groomName}
              </h3>
              <p className="text-neutral-500 text-xs tracking-wider mb-6">
                {formatDate(couple.date)}
              </p>
              <div className="w-8 h-px bg-neutral-700 mx-auto mb-6" />
              <p className="text-neutral-600 text-[10px] tracking-[0.2em] uppercase">
                Made with love
              </p>
            </motion.div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}
