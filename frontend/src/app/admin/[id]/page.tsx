"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Loader2, CheckCircle, Eye, Copy } from "lucide-react";
import Link from "next/link";

const weddingId = "04bf40ea-153f-4378-a896-8889f56f9dce";

export default function AdminEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [config, setConfig] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/v1/weddings/${id}/config`)
      .then((r) => r.json())
      .then((data) => {
        if (data) setConfig(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`/api/v1/weddings/${id}/config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { /* ignore */ }
    setSaving(false);
  };

  const handleCopyLink = () => {
    const slug = config?.slug || "wedding";
    navigator.clipboard.writeText(`${window.location.origin}/invite/${slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </Link>
            <div>
              <h1 className="font-serif text-neutral-800">
                {config?.bride_name && config?.groom_name
                  ? `${config.bride_name} & ${config.groom_name}`
                  : "Edit Undangan"}
              </h1>
              <p className="text-xs text-neutral-400">ID: {id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {saved && (
              <span className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Tersimpan
              </span>
            )}
            <button onClick={handleCopyLink}
              className="px-3 py-2 border border-neutral-200 text-neutral-500 text-xs hover:bg-neutral-50 transition-colors flex items-center gap-1">
              <Copy className="w-3 h-3" /> Copy Link
            </button>
            <Link href={`/invite/${config?.slug || "wedding"}`}
              className="px-3 py-2 border border-neutral-200 text-neutral-500 text-xs hover:bg-neutral-50 transition-colors flex items-center gap-1">
              <Eye className="w-3 h-3" /> Preview
            </Link>
            <button onClick={handleSave} disabled={saving}
              className="px-4 py-2 bg-neutral-800 text-white text-xs tracking-wider uppercase hover:bg-neutral-700 disabled:opacity-50 transition-colors flex items-center gap-2">
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
              Simpan
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white border border-neutral-200 p-8 text-center">
          <h2 className="text-xl font-serif text-neutral-800 mb-2">Custom Editor</h2>
          <p className="text-neutral-400 text-sm mb-6">
            Editor lengkap akan ditambahkan di sini. Untuk sekarang, gunakan <Link href="/templates" className="text-neutral-800 underline">Template Gallery</Link> untuk mengganti template.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <Link href="/templates"
              className="px-4 py-3 bg-neutral-800 text-white text-xs tracking-wider uppercase hover:bg-neutral-700 transition-colors">
              🎨 Pilih Template
            </Link>
            <button
              onClick={() => {
                // Reset to default template
                fetch(`/api/v1/weddings/${id}/config`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ template_id: "tmpl_classic_gold" }),
                }).then(() => window.location.reload());
              }}
              className="px-4 py-3 border border-neutral-200 text-neutral-600 text-xs tracking-wider uppercase hover:bg-neutral-50 transition-colors">
              🔄 Reset Template
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
