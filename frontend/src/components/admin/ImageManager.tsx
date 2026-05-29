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

  const [urlInputs, setUrlInputs] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    imageFields.forEach((f) => { init[f.key] = ""; });
    return init;
  });

  const setUrl = (key: string, val: string) => setUrls((p) => ({ ...p, [key]: val }));

  const handleUrlSubmit = (key: string) => {
    const url = urlInputs[key]?.trim();
    if (!url) return;
    setUrl(key, url);
    setUrlInputs((p) => ({ ...p, [key]: "" }));
  };

  const handleFileUpload = async (key: string, file: File) => {
    setUploading(key);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        try {
          const res = await fetch("/api/v1/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ base64, filename: file.name }),
          });
          if (res.ok) {
            const data = await res.json();
            setUrl(key, data.url);
          } else {
            // If upload fails, use a data URL fallback
            setUrl(key, base64);
          }
        } catch {
          // Network error fallback
          setUrl(key, URL.createObjectURL(file));
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
      <p className="text-neutral-400 text-sm mb-6">Masukkan URL gambar atau upload file dari komputer.</p>

      <div className="space-y-4">
        {imageFields.map((field) => (
          <div key={field.key} className="border border-neutral-100 p-4">
            <label className="text-xs tracking-wider uppercase text-neutral-500 mb-2 block">{field.label}</label>

            {/* Current image preview */}
            {urls[field.key] ? (
              <div className="mb-3 relative">
                <img
                  src={urls[field.key]}
                  alt={field.label}
                  className="w-full h-28 object-cover border border-neutral-100"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <button
                  onClick={() => setUrl(field.key, "")}
                  className="absolute top-1 right-1 p-1 bg-white/80 hover:bg-white text-neutral-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : null}

            {/* URL input */}
            <div className="flex gap-2 mb-2">
              <input
                value={urlInputs[field.key] || ""}
                onChange={(e) => setUrlInputs((p) => ({ ...p, [field.key]: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit(field.key)}
                className="wedding-input text-sm flex-1"
                placeholder={field.placeholder}
              />
              <button
                onClick={() => handleUrlSubmit(field.key)}
                className="px-3 py-2 border border-neutral-200 text-xs tracking-wider uppercase text-neutral-500 hover:bg-neutral-50 transition-colors flex items-center gap-1"
              >
                <Link className="w-3 h-3" /> Set
              </button>
            </div>

            {/* File upload */}
            <div className="flex items-center gap-2">
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
                className="px-3 py-2 border border-neutral-200 text-xs tracking-wider uppercase text-neutral-500 hover:bg-neutral-50 transition-colors flex items-center gap-1.5"
              >
                <Upload className="w-3 h-3" />
                Upload File
              </button>
              {uploading === field.key && <Loader2 className="w-4 h-4 text-neutral-300 animate-spin" />}
            </div>
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
