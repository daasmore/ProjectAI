"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Calendar, Clock, MapPin, ExternalLink, Music, Pause,
  ChevronDown, MessageSquare,
} from "lucide-react";
import { mockCouple } from "@/lib/mock-data";
import RSVPForm from "@/components/RSVPForm";
import EthnicOrnament, { EthnicDivider } from "@/components/ethnic/Ornaments";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  const months = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
function formatTime(t: string) { return t; }

export default function InvitePage({ params }: { params: { slug: string } }) {
  const [couple, setCouple] = useState(mockCouple);
  const [loading, setLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTemplateId, setActiveTemplateId] = useState("");
  const [tpl, setTpl] = useState<{
    primary: string; secondary: string; accent: string; font: string; bodyFont: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const wRes = await fetch(`/api/v1/weddings/slug/${params.slug}`);
        const wData = await wRes.json();
        if (cancelled || !wData.id) { setLoading(false); return; }

        const res = await fetch(`/api/v1/weddings/${wData.id}/config`);
        const data = await res.json();
        if (cancelled) return;

        if (data.bride_name) {
          setCouple({
            ...mockCouple,
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
            heroImage: data.hero_image || mockCouple.heroImage,
            coupleImage: data.photo_url || mockCouple.coupleImage,
            bridePhoto: data.bride_photo || mockCouple.bridePhoto,
            groomPhoto: data.groom_photo || mockCouple.groomPhoto,
            gallery_1: data.gallery_1 || mockCouple.gallery_1,
            gallery_2: data.gallery_2 || mockCouple.gallery_2,
            gallery_3: data.gallery_3 || mockCouple.gallery_3,
            gallery_4: data.gallery_4 || mockCouple.gallery_4,
            gallery_5: data.gallery_5 || mockCouple.gallery_5,
            gallery_6: data.gallery_6 || mockCouple.gallery_6,
          });
        }

        if (data.template_id) {
          setActiveTemplateId(data.template_id);
          try {
            const tRes = await fetch(`/api/v1/templates/${data.template_id}`);
            const tData = await tRes.json();
            if (!cancelled && tData.template) {
              setTpl({
                primary: tData.template.primary_color,
                secondary: tData.template.secondary_color,
                accent: tData.template.accent_color,
                font: tData.template.font_family || "serif",
                bodyFont: tData.template.font_body || "sans-serif",
              });
            }
          } catch { /* */ }
        }
      } catch { /* */ }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: tpl?.accent || "#fff" }}>
      <div className="text-sm" style={{ color: tpl?.primary || "#d4d4d4" }}>Loading...</div>
    </div>;
  }

  // Template color shortcuts
  const P = tpl?.primary || "#1a1a1a";
  const S = tpl?.secondary || "#f5f5f5";
  const A = tpl?.accent || "#ffffff";
  const F = tpl?.font || "serif";
  const FB = tpl?.bodyFont || "sans-serif";

  // Helper: determine if a color is dark
  const isDark = (hex: string) => {
    const c = hex.replace("#", "");
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 140;
  };
  const Pdark = isDark(P);
  const Sdark = isDark(S);

  const weddingDate = new Date(couple.date);
  const daysLeft = Math.max(0, Math.ceil((weddingDate.getTime() - Date.now()) / 86400000));

  return (
    <div className="min-h-screen" style={{ background: A, fontFamily: FB }}>

      {/* ═══ OPENING COVER ═══ */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div key="cover" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: `linear-gradient(160deg, ${S} 0%, ${A} 50%, ${S} 100%)` }}>

            <EthnicOrnament templateId={activeTemplateId} />

            <div className="text-center px-8 max-w-md mx-auto relative z-20">
              <motion.div initial={{ width: 0 }} animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-px mx-auto mb-8" style={{ background: P }} />

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xs tracking-[0.35em] uppercase mb-6"
                style={{ color: `${P}88` }}>
                The Wedding Of
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}>
                <h1 className="text-4xl sm:text-5xl font-light leading-tight"
                  style={{ color: P, fontFamily: F }}>
                  {couple.brideName}
                </h1>
                <div className="flex items-center justify-center gap-4 my-4">
                  <div className="h-px w-8" style={{ background: `${P}44` }} />
                  <span className="text-lg italic" style={{ color: P }}>&</span>
                  <div className="h-px w-8" style={{ background: `${P}44` }} />
                </div>
                <h1 className="text-4xl sm:text-5xl font-light leading-tight"
                  style={{ color: P, fontFamily: F }}>
                  {couple.groomName}
                </h1>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }} className="my-8">
                <p className="text-sm tracking-wide" style={{ color: `${P}cc` }}>
                  {formatDate(couple.date)}
                </p>
                <p className="text-xs mt-2" style={{ color: `${P}88` }}>{couple.venue}</p>
              </motion.div>

              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                onClick={() => setIsOpened(true)}
                className="group inline-flex items-center gap-2 px-8 py-3 border text-sm tracking-wider uppercase transition-all duration-300"
                style={{ borderColor: `${P}44`, color: P }}
                onMouseEnter={e => { e.currentTarget.style.background = P; e.currentTarget.style.color = Pdark ? "#fff" : "#1a1a1a"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = P; }}>
                <Heart className="w-3.5 h-3.5" />
                Buka Undangan
              </motion.button>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }} className="mt-12">
                <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: `${P}44` }}>
                  With Love
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ MAIN CONTENT ═══ */}
      {isOpened && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>

          {/* Music Toggle */}
          <button onClick={() => setIsPlaying(!isPlaying)}
            className="fixed top-5 right-5 z-40 w-9 h-9 rounded-full border backdrop-blur-sm flex items-center justify-center transition-all"
            style={{ borderColor: `${P}22`, background: `${A}ee`, color: `${P}88` }}>
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Music className="w-3.5 h-3.5" />}
          </button>

          {/* ═══ HERO ═══ */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <img src={couple.heroImage} alt="Wedding" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{
                background: `linear-gradient(to bottom, ${P}33 0%, ${P}11 40%, ${P}66 100%)`
              }} />
            </div>
            <EthnicOrnament templateId={activeTemplateId} />
            <div className="relative z-20 text-center text-white px-8 max-w-2xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}>
                <p className="text-[10px] tracking-[0.4em] uppercase mb-8" style={{ color: `${P}88` }}>
                  The Wedding Of
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}>
                <h1 className="text-5xl sm:text-7xl font-light leading-tight"
                  style={{ fontFamily: F, color: A }}>
                  {couple.brideName}
                </h1>
                <div className="flex items-center justify-center gap-6 my-5">
                  <div className="h-px w-10" style={{ background: `${A}44` }} />
                  <Heart className="w-3.5 h-3.5" style={{ color: `${A}88` }} />
                  <div className="h-px w-10" style={{ background: `${A}44` }} />
                </div>
                <h1 className="text-5xl sm:text-7xl font-light leading-tight"
                  style={{ fontFamily: F, color: A }}>
                  {couple.groomName}
                </h1>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }} className="mt-10">
                <div className="w-12 h-px mx-auto mb-6" style={{ background: `${A}44` }} />
                <p className="text-xs tracking-[0.3em] uppercase" style={{ color: `${A}aa` }}>
                  {formatDate(couple.date)}
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }} className="mt-16">
                <ChevronDown className="w-5 h-5 mx-auto animate-bounce" style={{ color: `${A}66` }} />
              </motion.div>
            </div>
          </section>

          {/* ═══ QUOTE ═══ */}
          <section className="py-24 sm:py-32 px-6" style={{ background: S }}>
            <div className="max-w-xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="w-8 h-px mx-auto mb-10" style={{ background: `${P}33` }} />
                <blockquote className="text-base sm:text-lg leading-relaxed italic"
                  style={{ color: `${P}cc`, fontFamily: F }}>
                  &ldquo;{couple.quote}&rdquo;
                </blockquote>
                <p className="text-xs tracking-wider mt-6 uppercase" style={{ color: `${P}88` }}>
                  {couple.quoteSource}
                </p>
              </motion.div>
            </div>
          </section>

          <EthnicDivider templateId={activeTemplateId} />

          {/* ═══ COUPLE ═══ */}
          <section className="py-24 sm:py-32 px-6" style={{ background: A }}>
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} className="text-center mb-16">
                <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: `${P}66` }}>
                  Mempelai
                </p>
                <h2 className="text-2xl sm:text-3xl font-light"
                  style={{ color: P, fontFamily: F }}>
                  Yang Berbahagia
                </h2>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                {[{ name: couple.brideName, photo: couple.bridePhoto, parents: couple.brideParents, label: "Putri dari" },
                  { name: couple.groomName, photo: couple.groomPhoto, parents: couple.groomParents, label: "Putra dari" }
                ].map((person, idx) => (
                  <motion.div key={idx}
                    initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                    className="text-center">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8 rounded-full overflow-hidden"
                      style={{ border: `3px solid ${P}15` }}>
                      <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-light mb-1" style={{ color: P, fontFamily: F }}>
                      {person.name}
                    </h3>
                    <div className="w-6 h-px mx-auto my-4" style={{ background: `${P}22` }} />
                    <p className="text-xs tracking-wider uppercase mb-1" style={{ color: `${P}66` }}>
                      {person.label}
                    </p>
                    <p className="text-sm" style={{ color: `${P}99` }}>{person.parents}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <EthnicDivider templateId={activeTemplateId} />

          {/* ═══ EVENT DETAILS ═══ */}
          <section className="py-24 sm:py-32 px-6" style={{ background: S }}>
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} className="text-center mb-16">
                <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: `${P}66` }}>
                  Acara
                </p>
                <h2 className="text-2xl sm:text-3xl font-light"
                  style={{ color: P, fontFamily: F }}>
                  Detail Pernikahan
                </h2>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-8">
                {[{ title: "Akad Nikah", time: couple.akadTime },
                  { title: "Resepsi", time: couple.resepsiTime }
                ].map((evt, idx) => (
                  <motion.div key={idx}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-8 sm:p-10 text-center" style={{ background: A, border: `1px solid ${P}11` }}>
                    <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: `${P}88` }}>
                      {evt.title}
                    </p>
                    <div className="w-6 h-px mx-auto mb-6" style={{ background: `${P}33` }} />
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="w-3.5 h-3.5" style={{ color: `${P}66` }} />
                        <span className="text-sm" style={{ color: `${P}bb` }}>{formatDate(couple.date)}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-3.5 h-3.5" style={{ color: `${P}66` }} />
                        <span className="text-sm" style={{ color: `${P}bb` }}>{formatTime(evt.time)}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="w-3.5 h-3.5" style={{ color: `${P}66` }} />
                        <span className="text-sm" style={{ color: `${P}bb` }}>{couple.venue}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} className="mt-8 text-center">
                <p className="text-sm mb-4" style={{ color: `${P}99` }}>{couple.venueAddress}</p>
                <a href={couple.gmapsUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm transition-colors pb-0.5"
                  style={{ color: `${P}88`, borderBottom: `1px solid ${P}22` }}>
                  <MapPin className="w-3.5 h-3.5" /> Lihat di Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>
            </div>
          </section>

          <EthnicDivider templateId={activeTemplateId} />

          {/* ═══ COUNTDOWN ═══ */}
          <section className="py-24 sm:py-32 px-6" style={{ background: A }}>
            <div className="max-w-2xl mx-auto text-center">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }}>
                <p className="text-[10px] tracking-[0.4em] uppercase mb-10" style={{ color: `${P}66` }}>
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
                      <div className="text-3xl sm:text-5xl font-light"
                        style={{ color: P, fontFamily: F }}>
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] tracking-[0.2em] uppercase mt-2"
                        style={{ color: `${P}66` }}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <EthnicDivider templateId={activeTemplateId} />

          {/* ═══ GALLERY ═══ */}
          <section className="py-24 sm:py-32 px-6" style={{ background: S }}>
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} className="text-center mb-16">
                <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: `${P}66` }}>
                  Galeri
                </p>
                <h2 className="text-2xl sm:text-3xl font-light"
                  style={{ color: P, fontFamily: F }}>
                  Momen Kami
                </h2>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {[couple.gallery_1, couple.gallery_2, couple.gallery_3, couple.gallery_4, couple.gallery_5, couple.gallery_6]
                  .filter(Boolean).map((src, i) => (
                    <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="aspect-square overflow-hidden" style={{ border: `1px solid ${P}11` }}>
                      <img src={src} alt={`Gallery ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </motion.div>
                  ))}
              </div>
            </div>
          </section>

          <EthnicDivider templateId={activeTemplateId} />

          {/* ═══ RSVP ═══ */}
          <section className="py-24 sm:py-32 px-6" style={{ background: A }}>
            <div className="max-w-lg mx-auto">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} className="text-center mb-12">
                <MessageSquare className="w-5 h-5 mx-auto mb-4" style={{ color: `${P}44` }} />
                <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: `${P}66` }}>
                  Konfirmasi
                </p>
                <h2 className="text-2xl sm:text-3xl font-light"
                  style={{ color: P, fontFamily: F }}>
                  RSVP & Ucapan
                </h2>
                <p className="text-sm mt-3" style={{ color: `${P}88` }}>
                  Mohon konfirmasi kehadiran Anda
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="p-6 sm:p-10" style={{ background: S, border: `1px solid ${P}11` }}>
                <RSVPForm />
              </motion.div>
            </div>
          </section>

          {/* ═══ FOOTER ═══ */}
          <footer className="py-16 px-6 text-center relative overflow-hidden"
            style={{ background: P }}>
            <EthnicOrnament templateId={activeTemplateId} />
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} className="relative z-20">
              <Heart className="w-5 h-5 mx-auto mb-4" style={{ color: `${A}44` }} />
              <h3 className="text-xl font-light mb-1" style={{ color: A, fontFamily: F }}>
                {couple.brideName} & {couple.groomName}
              </h3>
              <p className="text-xs tracking-wider mb-6" style={{ color: `${A}66` }}>
                {formatDate(couple.date)}
              </p>
              <div className="w-8 h-px mx-auto mb-6" style={{ background: `${A}22` }} />
              <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: `${A}44` }}>
                Made with love
              </p>
            </motion.div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}
