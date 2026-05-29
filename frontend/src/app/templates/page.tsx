"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Loader2, Sparkles, Eye } from "lucide-react";
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
  is_premium: number;
}

const getWeddingId = () => {
  // Try URL param first
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("wedding_id");
    if (id) return id;
    // Try localStorage
    const saved = localStorage.getItem("wedding_id");
    if (saved) return saved;
  }
  return "";
};
const weddingId = getWeddingId();

const categoryLabels: Record<string, string> = {
  classic: "🎩 Classic",
  modern: "✨ Modern",
  nature: "🌿 Nature",
  romantic: "💕 Romantic",
  rustic: "🪵 Rustic",
  indonesia: "🇮🇩 Suku Indonesia",
};

const categoryOrder = ["indonesia", "classic", "modern", "nature", "romantic", "rustic"];

export default function TemplateGallery() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [currentTemplateId, setCurrentTemplateId] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch templates
    fetch("/api/v1/templates")
      .then((r) => r.json())
      .then((data) => {
        if (data.templates) setTemplates(data.templates);
      })
      .catch(() => setError("Gagal memuat template"))
      .finally(() => setLoading(false));

    // Fetch current wedding template
    fetch(`/api/v1/weddings/${weddingId}/config`)
      .then((r) => r.json())
      .then((data) => {
        if (data.wedding?.template_id) setCurrentTemplateId(data.wedding.template_id);
      })
      .catch(() => {});
  }, []);

  const filteredTemplates =
    activeCategory === "all"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  const categories = ["all", ...categoryOrder.filter((c) => templates.some((t) => t.category === c))];

  const handleSelectTemplate = async (templateId: string) => {
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
        localStorage.setItem("wedding_id", weddingId);
        setTimeout(() => setSaved(false), 2000);
      } else {
        setError(data.error || "Gagal menyimpan template");
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
            <Link href="/admin" className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </Link>
            <div>
              <h1 className="text-lg font-serif font-light text-neutral-800">Pilih Template</h1>
              <p className="text-xs text-neutral-400">Pilih desain undangan pernikahan Anda</p>
            </div>
          </div>
          {saved && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-green-600 text-sm">
              <Check className="w-4 h-4" /> Template disimpan
            </motion.div>
          )}
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-neutral-800 text-white"
                  : "bg-white text-neutral-500 hover:bg-neutral-100 border border-neutral-200"
              }`}
            >
              {cat === "all" ? "🎨 Semua" : categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded">{error}</div>
        </div>
      )}

      {/* Template Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3">
            <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" />
            <span className="text-neutral-400">Memuat template...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTemplates.map((tmpl, i) => (
                <TemplateCard
                  key={tmpl.id}
                  template={tmpl}
                  index={i}
                  isSelected={currentTemplateId === tmpl.id}
                  onSelect={() => handleSelectTemplate(tmpl.id)}
                  onPreview={() => setPreviewTemplate(tmpl)}
                  saving={saving}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <PreviewModal
            template={previewTemplate}
            isSelected={currentTemplateId === previewTemplate.id}
            onClose={() => setPreviewTemplate(null)}
            onSelect={() => {
              handleSelectTemplate(previewTemplate.id);
              setPreviewTemplate(null);
            }}
            saving={saving}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Template Card ─────────────────────────────────────────────────────────── */

function TemplateCard({
  template,
  index,
  isSelected,
  onSelect,
  onPreview,
  saving,
}: {
  template: Template;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
  saving: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`group relative bg-white border-2 transition-all cursor-pointer hover:shadow-lg ${
        isSelected ? "border-neutral-800 shadow-lg" : "border-neutral-100 hover:border-neutral-300"
      }`}
    >
      {/* Color Preview */}
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${template.primary_color}, ${template.secondary_color})` }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{ backgroundColor: template.accent_color }}
        />
        {/* Fake decorative elements */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div
            className="text-sm tracking-widest uppercase mb-1 opacity-80"
            style={{ color: template.secondary_color }}
          >
            The Wedding of
          </div>
          <div
            className="text-xl font-serif mb-1"
            style={{ color: template.primary_color, fontFamily: template.font_family }}
          >
            Bride & Groom
          </div>
          <div className="w-12 h-px my-2" style={{ backgroundColor: template.primary_color }} />
          <div className="text-xs opacity-60" style={{ color: template.secondary_color }}>
            Sabtu, 15 Maret 2026
          </div>
        </div>

        {/* Current badge */}
        {isSelected && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute top-3 right-3 bg-neutral-800 text-white text-xs px-3 py-1 flex items-center gap-1">
            <Check className="w-3 h-3" /> Aktif
          </motion.div>
        )}

        {/* Premium badge */}
        {template.is_premium ? (
          <div className="absolute top-3 left-3 bg-amber-400 text-amber-900 text-xs px-2 py-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Premium
          </div>
        ) : null}

        {/* Hover actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => { e.stopPropagation(); onPreview(); }}
            className="px-4 py-2 bg-white text-neutral-700 text-xs tracking-wider uppercase hover:bg-neutral-100 transition-colors flex items-center gap-2"
          >
            <Eye className="w-4 h-4" /> Preview
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-serif text-neutral-800">{template.name}</h3>
          {isSelected ? (
            <span className="text-xs text-neutral-400">Aktif</span>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onSelect(); }}
              disabled={saving}
              className="px-3 py-1.5 text-xs tracking-wider uppercase bg-neutral-800 text-white hover:bg-neutral-700 disabled:opacity-50 transition-colors"
            >
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : "Pilih"}
            </button>
          )}
        </div>
        <p className="text-xs text-neutral-400 line-clamp-2">{template.description}</p>
        {/* Color swatches */}
        <div className="flex gap-1.5 mt-3">
          <div className="w-5 h-5 rounded-full border border-neutral-200" style={{ backgroundColor: template.primary_color }} title="Primary" />
          <div className="w-5 h-5 rounded-full border border-neutral-200" style={{ backgroundColor: template.secondary_color }} title="Secondary" />
          <div className="w-5 h-5 rounded-full border border-neutral-200" style={{ backgroundColor: template.accent_color }} title="Accent" />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Preview Modal ─────────────────────────────────────────────────────────── */

function PreviewModal({
  template,
  isSelected,
  onClose,
  onSelect,
  saving,
}: {
  template: Template;
  isSelected: boolean;
  onClose: () => void;
  onSelect: () => void;
  saving: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Preview area */}
        <div
          className="h-64 sm:h-80 relative flex flex-col items-center justify-center p-8"
          style={{ background: `linear-gradient(135deg, ${template.accent_color} 0%, ${template.primary_color}22 100%)` }}
        >
          <div className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: template.secondary_color }}>
            The Wedding of
          </div>
          <div
            className="text-3xl sm:text-4xl font-serif mb-3 text-center"
            style={{ color: template.primary_color, fontFamily: template.font_family }}
          >
            Bride & Groom
          </div>
          <div className="w-16 h-px mb-3" style={{ backgroundColor: template.primary_color }} />
          <div className="text-xs tracking-wider uppercase opacity-60" style={{ color: template.secondary_color }}>
            Sabtu, 15 Maret 2026
          </div>
          <div className="absolute bottom-8 text-xs tracking-wider opacity-40" style={{ color: template.secondary_color }}>
            Jakarta, Indonesia
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-serif text-neutral-800">{template.name}</h2>
            {template.is_premium ? (
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Premium
              </span>
            ) : (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1">Gratis</span>
            )}
          </div>
          <p className="text-neutral-500 text-sm mb-4">{template.description}</p>

          {/* Color palette */}
          <div className="flex gap-3 mb-6">
            <div className="text-center">
              <div className="w-10 h-10 rounded border border-neutral-200 mb-1" style={{ backgroundColor: template.primary_color }} />
              <span className="text-[10px] text-neutral-400">Primary</span>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded border border-neutral-200 mb-1" style={{ backgroundColor: template.secondary_color }} />
              <span className="text-[10px] text-neutral-400">Secondary</span>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded border border-neutral-200 mb-1" style={{ backgroundColor: template.accent_color }} />
              <span className="text-[10px] text-neutral-400">Accent</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 rounded border border-neutral-200 mb-1 bg-white">
                <span className="text-xs" style={{ fontFamily: template.font_family }}>Aa</span>
              </div>
              <span className="text-[10px] text-neutral-400">Font</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-3 border border-neutral-200 text-neutral-600 text-sm tracking-wider hover:bg-neutral-50 transition-colors">
              Tutup
            </button>
            {isSelected ? (
              <div className="flex-1 px-4 py-3 bg-green-50 text-green-700 text-sm tracking-wider flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Template Aktif
              </div>
            ) : (
              <button onClick={onSelect} disabled={saving}
                className="flex-1 px-4 py-3 bg-neutral-800 text-white text-sm tracking-wider hover:bg-neutral-700 disabled:opacity-50 transition-colors">
                {saving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Pilih Template"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
