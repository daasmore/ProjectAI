'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function WeddingPage() {
  const params = useParams();
  const slug = params.slug;
  const [wedding, setWedding] = useState<any>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://carrier-replication-adequate-actress.trycloudflare.com'}/api/weddings/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setWedding(data.data);
        }
      })
      .catch(() => {
        // Fallback to default data
        setWedding({
          groomName: 'Ahmad Rizky Pratama',
          brideName: 'Siti Nurhaliza',
          groomPhoto: 'https://picsum.photos/seed/groom/400/400',
          bridePhoto: 'https://picsum.photos/seed/bride/400/400',
          akadDate: '2026-07-15', akadTime: '08:00',
          akadVenue: 'Masjid Al-Azhar, Kebayoran Baru',
          akadAddress: 'Jl. Sisingamangaraja No.2, Kebayoran Baru, Jakarta Selatan',
          resepsiDate: '2026-07-15', resepsiTime: '11:00',
          resepsiVenue: 'The Pallas, Sudirman',
          resepsiAddress: 'Jl. Jend. Sudirman No.1, Jakarta Pusat',
          story: 'Pertama kali bertemu di kampus UI pada tahun 2018...',
          gallery: [
            'https://picsum.photos/seed/wed1/800/600',
            'https://picsum.photos/seed/wed2/800/600',
            'https://picsum.photos/seed/wed3/800/600',
            'https://picsum.photos/seed/wed4/800/600',
            'https://picsum.photos/seed/wed5/800/600',
            'https://picsum.photos/seed/wed6/800/600',
          ],
        });
      })
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    const target = new Date('2026-07-15T08:00:00');
    const timer = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-4xl"
        >
          💍
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-white">
      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative pt-16 pb-24 text-center overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeInUp} className="text-rose-400 text-sm tracking-widest mb-4">
          ~ THE WEDDING OF ~
        </motion.p>

        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-gray-900 mb-2">
          {wedding?.groomName?.split(' ')[0]}
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-3xl text-rose-500 mb-2">&</motion.p>
        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
          {wedding?.brideName?.split(' ')[0]}
        </motion.h1>

        <motion.div variants={scaleIn} className="flex justify-center gap-8 mb-12">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img src={wedding?.groomPhoto} alt="Groom" className="w-full h-full object-cover" />
          </div>
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img src={wedding?.bridePhoto} alt="Bride" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.p variants={fadeInUp} className="text-gray-500 text-lg mb-2">
          {wedding?.akadDate && new Date(wedding.akadDate).toLocaleDateString('id-ID', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })}
        </motion.p>
      </motion.section>

      {/* Countdown */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="max-w-4xl mx-auto px-4 py-16"
      >
        <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-center mb-10 text-gray-800">
          💕 Menghitung Hari
        </motion.h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { value: countdown.days, label: 'Hari' },
            { value: countdown.hours, label: 'Jam' },
            { value: countdown.minutes, label: 'Menit' },
            { value: countdown.seconds, label: 'Detik' },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-rose-100"
            >
              <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-1">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-gray-400 text-sm">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Events */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="max-w-4xl mx-auto px-4 py-16"
      >
        <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-center mb-12 text-gray-800">
          💒 Acara Pernikahan
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Akad */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-sm border border-rose-100">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center text-2xl mb-4">
              🕌
            </div>
            <h3 className="text-xl font-bold mb-2">Akad Nikah</h3>
            <p className="text-gray-500 mb-1">📅 {wedding?.akadDate}</p>
            <p className="text-gray-500 mb-1">🕐 {wedding?.akadTime} WIB</p>
            <p className="text-gray-500 mb-1">📍 {wedding?.akadVenue}</p>
            <p className="text-gray-400 text-sm">{wedding?.akadAddress}</p>
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding?.akadVenue || '')}`}
              target="_blank"
              className="inline-block mt-4 text-rose-600 hover:text-rose-700 text-sm font-semibold"
            >
              🗺️ Buka di Google Maps →
            </Link>
          </motion.div>
          {/* Resepsi */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-sm border border-rose-100">
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center text-2xl mb-4">
              🎉
            </div>
            <h3 className="text-xl font-bold mb-2">Resepsi</h3>
            <p className="text-gray-500 mb-1">📅 {wedding?.resepsiDate}</p>
            <p className="text-gray-500 mb-1">🕐 {wedding?.resepsiTime} WIB</p>
            <p className="text-gray-500 mb-1">📍 {wedding?.resepsiVenue}</p>
            <p className="text-gray-400 text-sm">{wedding?.resepsiAddress}</p>
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding?.resepsiVenue || '')}`}
              target="_blank"
              className="inline-block mt-4 text-rose-600 hover:text-rose-700 text-sm font-semibold"
            >
              🗺️ Buka di Google Maps →
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Story */}
      <section className="bg-rose-50 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-3xl mx-auto px-4 text-center"
        >
          <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-8 text-gray-800">
            💝 Love Story
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-600 leading-relaxed text-lg italic">
            &quot;{wedding?.story}&quot;
          </motion.p>
        </motion.div>
      </section>

      {/* Gallery */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="max-w-6xl mx-auto px-4 py-20"
      >
        <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-center mb-12 text-gray-800">
          📸 Gallery
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(wedding?.gallery || []).map((url: string, i: number) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-rose-100"
            >
              <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* RSVP CTA */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-500 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-2xl mx-auto px-4 text-center"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-white mb-4">
            Apakah Anda Akan Hadir?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-rose-100 mb-8 text-lg">
            Konfirmasi kehadiran Anda melalui form RSVP di bawah ini
          </motion.p>
          <motion.div variants={scaleIn}>
            <Link
              href={`/invitation/${slug}/rsvp`}
              className="bg-white text-rose-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-rose-50 transition-all hover:scale-105 shadow-lg inline-block"
            >
              ✉️ RSVP Sekarang
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xl">💒</span>
          <span className="font-bold">WeddBot</span>
        </div>
        <p className="text-gray-500 text-sm">Powered by Wedding Invitation SaaS</p>
      </footer>
    </div>
  );
}
