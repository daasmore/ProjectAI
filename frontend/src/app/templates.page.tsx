"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Loader2, Heart, Calendar, Clock, MapPin, ChevronDown, MessageSquare } from "lucide-react";
import Link from "next/link";

interface Template {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  font_family: string;
  body_font?: string;
  is_premium: number;
}

const getWeddingId = () => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("wedding_id");
    if (id) return id;
    const saved = localStorage.getItem("wedding_id");
    if (saved) return saved;
  }
  return "";
};

const categoryLabels: Record<string, string> = {
  classic: "🎩 Classic",
  modern: "✨ Modern",
  nature: "🌿 Nature",
  romantic: "💕 Romantic",
  rustic: "🪵 Rustic",
  indonesia: "🇮🇩 Suku Indonesia",
};
const categoryOrder = ["indonesia", "classic", "modern", "nature", "romantic", "rustic"];

/* ═══════════════════════════════════════════════════════════════════════════ 
   FULL INVITATION PREVIEW — Renders the actual invitation with this template
   ═══════════════════════════════════════════════════════════════════════════ */
function FullInvitePreview({ template, onClose, onSelect, saving }: {
  template: Template;
  onClose: () => void;
  onSelect: () => void;
  saving: boolean;
}) {
  const P = template.primary_color;
  const S = template.secondary_color;
  const A = template.accent_color;
  const FF = template.font_family || "serif";
  const FB = template.body_font || "sans-serif";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/70 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen py-8 px-4 flex flex-col items-center justify-start" onClick={e => e.stopPropagation()}>
        {/* Top bar */}
        <div className="w-full max-w-lg flex items-center justify-between mb-4 sticky top-0 z-10">
          <button onClick={onClose} className="px-4 py-2 bg-white/90 backdrop-blur text-neutral-700 text-xs tracking-wider uppercase">
            ← Kembali
          </button>
          <button
            onClick={onSelect}
            disabled={saving}
            className="px-6 py-2 text-white text-xs tracking-wider uppercase disabled:opacity-50 transition-opacity"
            style={{ backgroundColor: P }}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Pilih Template Ini"}
          </button>
        </div>

        {/* ═══ THE FULL INVITATION ═══ */}
        <div className="w-full max-w-lg bg-white shadow-2xl overflow-hidden" style={{ fontFamily: FB }}>

          {/* COVER */}
          <div className="relative min-h-[420px] flex items-center justify-center"
            style={{ background: `linear-gradient(160deg, ${S} 0%, ${A} 50%, ${S} 100%)` }}>
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `radial-gradient(${P} 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }} />
            <div className="text-center px-8 relative z-10">
              <div className="w-10 h-px mx-auto mb-6" style={{ background: P }} />
              <p className="text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: `${P}88` }}>
                The Wedding Of
              </p>
              <h1 className="text-3xl font-light leading-tight" style={{ color: P, fontFamily: FF }}>
                Nama Mempelai Wanita
              </h1>
              <div className="flex items-center justify-center gap-3 my-3">
                <div className="h-px w-6" style={{ background: `${P}44` }} />
                <span className="text-base italic" style={{ color: P }}>&</span>
                <div className="h-px w-6" style={{ background: `${P}44` }} />
              </div>
              <h1 className="text-3xl font-light leading-tight" style={{ color: P, fontFamily: FF }}>
                Nama Mempelai Pria
              </h1>
              <p className="text-xs mt-6 tracking-wide" style={{ color: `${P}cc` }}>
                Sabtu, 15 Maret 2027
              </p>
              <p className="text-[10px] mt-1" style={{ color: `${P}66` }}>
                Gedung Pernikahan, Jakarta
              </p>
              <div className="mt-8">
                <span className="inline-flex items-center gap-2 px-6 py-2.5 border text-[10px] tracking-wider uppercase"
                  style={{ borderColor: `${P}44`, color: P }}>
                  <Heart className="w-3 h-3" /> Buka Undangan
                </span>
              </div>
            </div>
          </div>

          {/* QUOTE */}
          <div className="py-16 px-8 text-center" style={{ background: S }}>
            <div className="w-6 h-px mx-auto mb-6" style={{ background: `${P}33` }} />
            <blockquote className="text-sm leading-relaxed italic" style={{ color: `${P}cc`, fontFamily: FF }}>
              &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antarasimu rasa kasih sayang.&rdquo;
            </blockquote>
            <p className="text-[10px] tracking-wider mt-4 uppercase" style={{ color: `${P}66` }}>
              — QS. Ar-Rum : 21
            </p>
          </div>

          {/* COUPLE */}
          <div className="py-16 px-8" style={{ background: A }}>
            <div className="text-center mb-10">
              <p className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: `${P}66` }}>
                Yang Berbahagia
              </p>
              <h2 className="text-xl font-light" style={{ color: P, fontFamily: FF }}>
                Mempelai
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[{ name: "Nama Wanita", label: "Putri dari" }, { name: "Nama Pria", label: "Putra dari" }].map((p, i) => (
                <div key={i} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-lg font-light"
                    style={{ background: `${P}10`, color: P, fontFamily: FF }}>
                    {p.name.charAt(0)}
                  </div>
                  <h3 className="text-base font-light mb-1" style={{ color: P, fontFamily: FF }}>{p.name}</h3>
                  <p className="text-[9px] tracking-wider uppercase" style={{ color: `${P}55` }}>{p.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* EVENTS */}
          <div className="py-16 px-8" style={{ background: S }}>
            <div className="text-center mb-10">
              <p className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: `${P}66` }}>
                Acara
              </p>
              <h2 className="text-xl font-light" style={{ color: P, fontFamily: FF }}>
                Detail Pernikahan
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ title: "Akad Nikah", time: "09:00 WIB" }, { title: "Resepsi", time: "11:00 WIB" }].map((evt, i) => (
                <div key={i} className="p-6 text-center" style={{ background: A, border: `1px solid ${P}11` }}>
                  <p className="text-[9px] tracking-[0.2em] uppercase mb-3" style={{ color: `${P}88` }}>{evt.title}</p>
                  <div className="w-4 h-px mx-auto mb-3" style={{ background: `${P}22` }} />
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-1.5">
                      <Calendar className="w-3 h-3" style={{ color: `${P}55` }} />
                      <span className="text-[10px]" style={{ color: `${P}aa` }}>15 Maret 2027</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                      <Clock className="w-3 h-3" style={{ color: `${P}55` }} />
                      <span className="text-[10px]" style={{ color: `${P}aa` }}>{evt.time}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                      <MapPin className="w-3 h-3" style={{ color: `${P}55` }} />
                      <span className="text-[10px]" style={{ color: `${P}aa` }}>Gedung, Jakarta</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COUNTDOWN */}
          <div className="py-12 px-8 text-center" style={{ background: A }}>
            <p className="text-[9px] tracking-[0.3em] uppercase mb-6" style={{ color: `${P}66` }}>
              Menghitung Hari
            </p>
            <div className="flex items-center justify-center gap-6">
              {[{ v: "120", l: "Hari" }, { v: "08", l: "Jam" }, { v: "30", l: "Menit" }, { v: "45", l: "Detik" }].map((c, i) => (
                <div key={i}>
                  <div className="text-2xl font-light" style={{ color: P, fontFamily: FF }}>{c.v}</div>
                  <div className="text-[8px] tracking-wider uppercase mt-1" style={{ color: `${P}55` }}>{c.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* GALLERY */}
          <div className="py-12 px-8" style={{ background: S }}>
            <div className="text-center mb-8">
              <p className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: `${P}66` }}>Galeri</p>
              <h2 className="text-xl font-light" style={{ color: P, fontFamily: FF }}>Momen Kami</h2>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className="aspect-square" style={{ background: `${P}15`, border: `1px solid ${P}11` }}>
                  <div className="w-full h-full flex items-center justify-center" style={{ color: `${P}33` }}>
                    <Heart className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RSVP */}
          <div className="py-12 px-8" style={{ background: A }}>
            <div className="text-center mb-6">
              <MessageSquare className="w-4 h-4 mx-auto mb-2" style={{ color: `${P}44` }} />
              <p className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: `${P}66` }}>RSVP</p>
              <h2 className="text-xl font-light" style={{ color: P, fontFamily: FF }}>Konfirmasi Kehadiran</h2>
            </div>
            <div className="p-4" style={{ background: S, border: `1px solid ${P}11` }}>
              <div className="space-y-3">
                <div className="h-8 w-full" style={{ background: `${P}0a`, border: `1px solid ${P}15` }} />
                <div className="h-8 w-full" style={{ background: `${P}0a`, border: `1px solid ${P}15` }} />
                <div className="h-20 w-full" style={{ background: `${P}0a`, border: `1px solid ${P}15` }} />
                <div className="h-8 w-full flex items-center justify-center text-[10px] tracking-wider uppercase"
                  style={{ background: P, color: A }}>
                  Kirim RSVP
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="py-12 px-6 text-center" style={{ background: P }}>
            <Heart className="w-4 h-4 mx-auto mb-3" style={{ color: `${A}44` }} />
            <h3 className="text-base font-light mb-1" style={{ color: A, fontFamily: FF }}>
              Nama Wanita & Nama Pria
            </h3>
            <p className="text-[9px] tracking-wider mb-4" style={{ color: `${A}66` }}>
              15 Maret 2027
            </p>
            <div className="w-6 h-px mx-auto mb-4" style={{ background: `${A}22` }} />
            <p className="text-[8px] tracking-[0.2em] uppercase" style={{ color: `${A}44` }}>
              Made with love
            </p>
          </div>

        </div>
        {/* End of full invitation preview */}

        {/* bottom spacer for scroll */}
        <div className="h-8 flex-shrink-0" />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ 
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function TemplateGallery() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [currentTemplateId, setCurrentTemplateId] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [weddingId, setWeddingId] = useState("");
  const [weddingSlug, setWeddingSlug] = useState("");

  useEffect(() => {
    setWeddingId(getWeddingId());
    fetch("/api/v1/templates")
      .then(r => r.json())
      .then(data => {
        if (data.templates) setTemplates(data.templates);
      })
      .catch(() => setError("Gagal memuat template"))
      .finally(() => setLoading(false));
  }, []);

  // After templates loaded, fetch current wedding's template
  useEffect(() => {
    if (!weddingId) return;
    fetch(`/api/v1/weddings/${weddingId}/config`)
      .then(r => r.json())
      .then(data => {
        if (data.template_id) setCurrentTemplateId(data.template_id);
      })
      .catch(() => {});
  }, [weddingId]);

  const filtered = activeCategory === "all"
    ? templates
    : templates.filter(t => t.category === activeCategory);

  const categories = ["all", ...categoryOrder.filter(c => templates.some(t => t.category === c))];

  const handleSelect = async (templateId: string) => {
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await fetch(`/api/v1/templates/assign-template/${weddingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template_id: templateId }),
      });
      const data = await res.json();
      if (data.success) {
        setCurrentTemplateId(templateId);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(data.error || "Gagal menyimpan");
      }
    } catch {
      setError("Gagal menyimpan template");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={weddingId ? `/admin?wedding_id=${weddingId}` : "/admin"}
              className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </Link>
            <div>
              <h1 className="text-lg font-serif font-light text-neutral-800">Pilih Template</h1>
              <p className="text-xs text-neutral-400">Preview undangan sebelum memilih</p>
            </div>
          </div>
          {saved && weddingSlug && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-green-600 text-sm">
                <Check className="w-4 h-4" /> Template disimpan!
              </span>
              <a href={`/invite/${weddingSlug}`} target="_blank"
                className="px-4 py-1.5 bg-neutral-800 text-white text-xs tracking-wider uppercase hover:bg-neutral-700 transition-colors">
                👁 Lihat Undangan
              </a>
            </motion.div>
          )}
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-neutral-800 text-white"
                  : "bg-white text-neutral-500 hover:bg-neutral-100 border border-neutral-200"
              }`}>
              {cat === "all" ? "🎨 Semua" : categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {!weddingId && (
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <div className="bg-amber-50 text-amber-700 text-sm px-4 py-3 rounded">
            ⚠️ Tidak ada undangan yang dipilih. Silakan buat undangan terlebih dahulu di Dashboard.
          </div>
        </div>
      )}
      {error && (
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded">{error}</div>
        </div>
      )}

      {/* Grid — horizontal scroll cards */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3">
            <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" />
            <span className="text-neutral-400">Memuat template...</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((tmpl, i) => {
              const isActive = currentTemplateId === tmpl.id;
              return (
                <motion.div
                  key={tmpl.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`relative bg-white border-2 cursor-pointer transition-all hover:shadow-lg ${
                    isActive ? "border-neutral-800 shadow-md" : "border-neutral-100 hover:border-neutral-300"
                  }`}
                  onClick={() => setPreviewTemplate(tmpl)}
                >
                  {/* Thumbnail — mini invitation */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0" style={{ background: tmpl.secondary_color }} />
                    <div className="absolute inset-0" style={{
                      background: `linear-gradient(180deg, ${tmpl.primary_color}22 0%, ${tmpl.primary_color}00 100%)`
                    }} />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: tmpl.accent_color, opacity: 0.95 }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
                      <div className="w-5 h-px mb-2" style={{ backgroundColor: tmpl.primary_color }} />
                      <div className="text-[8px] tracking-[0.15em] uppercase mb-1.5"
                        style={{ color: `${tmpl.primary_color}88` }}>
                        The Wedding of
                      </div>
                      <div className="text-sm font-serif leading-tight"
                        style={{ color: tmpl.primary_color, fontFamily: tmpl.font_family }}>
                        Bride & Groom
                      </div>
                      <div className="w-4 h-px my-1" style={{ backgroundColor: tmpl.primary_color, opacity: 0.3 }} />
                      <div className="text-[7px] tracking-wider" style={{ color: `${tmpl.secondary_color}cc` }}>
                        15 Maret 2027
                      </div>
                    </div>

                    {isActive && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="absolute top-2 right-2 bg-neutral-800 text-white text-[9px] px-2 py-0.5 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Aktif
                      </motion.div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                      <span className="bg-white text-neutral-700 text-[10px] tracking-wider uppercase px-4 py-2">
                        Preview
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="text-xs font-serif text-neutral-800 mb-0.5">{tmpl.name}</h3>
                    <p className="text-[10px] text-neutral-400 line-clamp-1">{tmpl.description}</p>
                    <div className="flex gap-1 mt-2">
                      <div className="w-3.5 h-3.5 rounded-full border border-neutral-200" style={{ backgroundColor: tmpl.primary_color }} />
                      <div className="w-3.5 h-3.5 rounded-full border border-neutral-200" style={{ backgroundColor: tmpl.secondary_color }} />
                      <div className="w-3.5 h-3.5 rounded-full border border-neutral-200" style={{ backgroundColor: tmpl.accent_color }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Hint */}
        {!loading && (
          <div className="mt-8 text-center">
            <p className="text-xs text-neutral-400">
              💡 Klik template untuk <strong>preview undangan lengkap</strong>, lalu klik &quot;Pilih Template Ini&quot; untuk menerapkan
            </p>
          </div>
        )}
      </main>

      {/* Full Invite Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <FullInvitePreview
            template={previewTemplate}
            onClose={() => setPreviewTemplate(null)}
            onSelect={() => {
              handleSelect(previewTemplate.id);
              // Keep preview open briefly to show success, then user clicks "Lihat Undangan" from header
            }}
            saving={saving}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
