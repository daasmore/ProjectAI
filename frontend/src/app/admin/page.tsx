"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Users, Calendar, Clock, MapPin, Loader2, CheckCircle, Upload, Sparkles, Palette } from "lucide-react";
import MempelaiForm from "@/components/admin/MempelaiForm";
import ThemeEditor from "@/components/admin/ThemeEditor";
import ImageManager from "@/components/admin/ImageManager";
import QuoteEditor from "@/components/admin/QuoteEditor";
import LivePreview from "@/components/admin/LivePreview";

type Tab = "mempelai" | "tema" | "gambar" | "quote" | "template";

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "mempelai", label: "Data Mempelai", icon: <Users className="w-4 h-4" /> },
  { key: "tema", label: "Tema & Layout", icon: <Calendar className="w-4 h-4" /> },
  { key: "gambar", label: "Gambar", icon: <Upload className="w-4 h-4" /> },
  { key: "quote", label: "Quote", icon: <Clock className="w-4 h-4" /> },
  { key: "template", label: "Template", icon: <Sparkles className="w-4 h-4" /> },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("mempelai");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState<Record<string, unknown> | null>(null);
  const [previewKey, setPreviewKey] = useState(0);
  const [weddingId, setWeddingId] = useState("");

  // Load config on mount
  useEffect(() => {
    const id = localStorage.getItem("wedding_id");
    if (id) setWeddingId(id);
    setLoading(true);
    fetch(`/api/v1/weddings/${weddingId || "04bf40ea-153f-4378-a896-8889f56f9dce"}/config`)
      .then((r) => r.json())
      .then((data) => setConfig(data))
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (sectionData: Record<string, unknown>) => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/v1/weddings/${weddingId || "04bf40ea-153f-4378-a896-8889f56f9dce"}/config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionData),
      });
      if (!res.ok) throw new Error("Save failed");
      const result = await res.json();
      setConfig(result.wedding);
      setSaved(true);
      // Trigger preview refresh by updating a key
      setPreviewKey((k) => k + 1);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // silently fail for now
    } finally {
      setSaving(false);
    }
  };

  const updateConfig = (key: string, value: unknown) => {
    setConfig((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-neutral-300 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      {/* Left: Editor */}
      <div className="flex-1 min-w-0">
        {/* Tab navigation */}
        <div className="flex gap-1 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-200 border ${
                activeTab === tab.key
                  ? "bg-neutral-800 text-white border-neutral-800"
                  : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Save indicator */}
        {saved && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex items-center gap-2 text-green-600 text-sm bg-green-50 px-4 py-2 rounded-lg">
            <CheckCircle className="w-4 h-4" />
            Tersimpan! Tampilan undangan sudah diperbarui.
          </motion.div>
        )}

        {/* Tab content */}
        <div className="bg-white border border-neutral-100">
          {activeTab === "mempelai" && (
            <MempelaiForm
              config={config}
              onSave={handleSave}
              saving={saving}
              updateConfig={updateConfig}
            />
          )}
          {activeTab === "tema" && (
            <ThemeEditor
              config={config}
              onSave={handleSave}
              saving={saving}
              updateConfig={updateConfig}
            />
          )}
          {activeTab === "gambar" && (
            <ImageManager
              config={config}
              onSave={handleSave}
              saving={saving}
              updateConfig={updateConfig}
            />
          )}
          {activeTab === "quote" && (
            <QuoteEditor
              config={config}
              onSave={handleSave}
              saving={saving}
              updateConfig={updateConfig}
            />
          )}
          {activeTab === "template" && (
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-neutral-400" />
                <h2 className="text-lg font-serif font-light text-neutral-800">Pilih Template</h2>
              </div>
              <p className="text-neutral-400 text-sm mb-6">
                Pilih desain undangan yang sesuai dengan tema pernikahan Anda.
                Setiap template memiliki warna, font, dan gaya yang berbeda.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-700">
                  💡 Klik tombol di bawah untuk membuka gallery template.
                  Preview template akan ditampilkan sebelum Anda memilih.
                </p>
              </div>
              <Link
                href={`/templates?wedding_id=${weddingId}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 text-white text-xs tracking-wider uppercase hover:bg-neutral-700 transition-colors"
              >
                <Palette className="w-4 h-4" />
                Buka Gallery Template Lengkap
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Right: Live Preview (desktop only) */}
      <div className="hidden lg:block w-80 shrink-0">
        <LivePreview slug="bagus-pertiwi-2026" config={config} refreshKey={previewKey} />
      </div>
    </div>
  );
}
