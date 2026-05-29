"use client";

import { useState, useRef } from "react";
import { Save, Loader2, Upload, Image, X, Link } from "lucide-react";

interface Props {
  config: Record<string, unknown> | null;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  saving: boolean;
  updateConfig: (key: string, value: unknown) => void;
}

interface ImageField {
  key: string;
  label: string;
  current: string;
  placeholder: string;
}

export default function ImageManager({ config, onSave, saving }: Props) {
  const [uploading, setUploading] = useState<string | null>(null);
  const [useUrl, setUseUrl] = useState<Record<string, boolean>>({});
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const imageFields: ImageField[] = [
    { key: "hero_image", label: "Gambar Cover / Hero", current: String(config?.hero_image || ""), placeholder: "https://images.unsplash.com/..." },
    { key: "bride_photo", label: "Foto Pengantin Wanita", current: String(config?.bride_photo || ""), placeholder: "https://images.unsplash.com/..." },
    { key: "groom_photo", label: "Foto Pengantin Pria", current: String(config?.groom_photo || ""), placeholder: "https://images.unsplash.com/..." },
    { key: "gallery_1", label: "Gallery 1", current: String(config?.gallery_1 || ""), placeholder: "https://images.unsplash.com/..." },
    { key: "gallery_2", label: "Gallery 2", current: String(config?.gallery_2 || ""), placeholder: "https://images.unsplash.com/..." },
    { key: "gallery_3", label: "Gallery 3", current: String(config?.gallery_3 || ""), placeholder: "https://images.unsplash.com/..." },
    { key: "gallery_4", label: "Gallery 4", current: String(config?.gallery_4 || ""), placeholder: "https://images.unsplash.com/..." },
    { key: "gallery_5", label: "Gallery 5", current: String(config?.gallery_5 || ""), placeholder: "https://images.unsplash.com/..." },
    { key: "gallery_6", label: "Gallery 6", current: String(config?.gallery_6 || ""), placeholder: "https://images.unsplash.com/..." },
  ];

  const [urls, setUrls] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    imageFields.forEach((f) => { initial[f.key] = f.current; });
    return initial;
  });

  const setUrl = (key: string, val: string) => setUrls((p) => ({ ...p, [key]: val }));

  const handleFileUpload = async (key: string, file: File) => {
    setUploading(key);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        const res = await fetch("/api/v1/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64, filename: file.name }),
        });
        if (res.ok) {
          const data = await res.json();
          setUrl(key, data.url);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(null);
    }
  };

  const handleSave = () => {
    const data: Record<string, string> = {};
    imageFields.forEach((f) => {
      if (urls[f.key]) data[f.key] = urls[f.key];
    });
    onSave(data);
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-2">
        <Image className="w-4 h-4 text-neutral-400" />
        <h2 className="text-lg font-serif font-light text-neutral-800">Kelola Gambar</h2>
      </div>
      <p className="text-neutral-400 text-sm mb-6">Upload foto atau masukkan URL gambar. Klik &quot;Simpan Semua&quot; setelah selesai.</p>

      <div className="space-y-4">
        {imageFields.map((field) => (
          <div key={field.key} className="border border-neutral-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs tracking-wider uppercase text-neutral-500">{field.label}</label>
              <div className="flex gap-1">
                <button
                  onClick={() => setUseUrl((p) => ({ ...p, [field.key]: false }))}
                  className={`px-2 py-1 text-[10px] tracking-wider uppercase border ${!useUrl[field.key] ? "bg-neutral-800 text-white border-neutral-800" : "border-neutral-200 text-neutral-400"}`}
                >
                  <Upload className="w-3 h-3 inline mr-1" />Upload
                </button>
                <button
                  onClick={() => setUseUrl((p) => ({ ...p, [field.key]: true }))}
                  className={`px-2 py-1 text-[10px] tracking-wider uppercase border ${useUrl[field.key] ? "bg-neutral-800 text-white border-neutral-800" : "border-neutral-200 text-neutral-400"}`}
                >
                  <Link className="w-3 h-3 inline mr-1" />URL
                </button>
              </div>
            </div>

            {useUrl[field.key] ? (
              <input
                value={urls[field.key] || ""}
                onChange={(e) => setUrl(field.key, e.target.value)}
                className="wedding-input text-sm"
                placeholder={field.placeholder}
              />
            ) : (
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => { fileRefs.current[field.key] = el; }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(field.key, file);
                  }}
                  className="hidden"
                />
                <button
                  onClick={() => fileRefs.current[field.key]?.click()}
                  className="px-4 py-2.5 border border-neutral-200 text-xs tracking-wider uppercase text-neutral-500 hover:bg-neutral-50 transition-colors flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Pilih File
                </button>
                {uploading === field.key && <Loader2 className="w-4 h-4 text-neutral-300 animate-spin" />}
              </div>
            )}

            {/* Preview */}
            {urls[field.key] && (
              <div className="mt-3 relative">
                <img
                  src={urls[field.key]}
                  alt={field.label}
                  className="w-full h-32 object-cover border border-neutral-100"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <button
                  onClick={() => setUrl(field.key, "")}
                  className="absolute top-1 right-1 p-1 bg-white/80 hover:bg-white text-neutral-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="wedding-btn-primary text-xs tracking-widest disabled:opacity-50 flex items-center gap-2 px-6 py-3"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Simpan Semua Gambar
        </button>
      </div>
    </div>
  );
}
