"use client";

import { useState } from "react";
import { Save, Loader2, Palette } from "lucide-react";

interface Props {
  config: Record<string, unknown> | null;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  saving: boolean;
  updateConfig: (key: string, value: unknown) => void;
}

const themes = [
  { id: "minimalist", label: "Minimalist", colors: { primary: "#1a1a1a", secondary: "#f5f5f5", accent: "#d4d4d4" } },
  { id: "classic", label: "Classic Gold", colors: { primary: "#7a5c3e", secondary: "#fdf8f0", accent: "#c9a96e" } },
  { id: "jungle", label: "Jungle Green", colors: { primary: "#2d4a3e", secondary: "#f0f5f2", accent: "#7a9e8b" } },
  { id: "dark", label: "Dark Elegant", colors: { primary: "#ffffff", secondary: "#111111", accent: "#333333" } },
  { id: "blush", label: "Blush Pink", colors: { primary: "#8b5e5e", secondary: "#fdf5f5", accent: "#d4a5a5" } },
  { id: "navy", label: "Navy Blue", colors: { primary: "#1e3a5f", secondary: "#f0f4f8", accent: "#5a8ab5" } },
];

const fonts = [
  { id: "serif", label: "Serif (Elegant)", value: "Georgia, 'Times New Roman', serif" },
  { id: "sans", label: "Sans-serif (Modern)", value: "'Helvetica Neue', Arial, sans-serif" },
  { id: "script", label: "Script", value: "'Brush Script MT', cursive" },
];

export default function ThemeEditor({ config, onSave, saving }: Props) {
  const [theme, setTheme] = useState(String(config?.theme || "minimalist"));
  const [fontFamily, setFontFamily] = useState(String(config?.font_family || "serif"));
  const [primaryColor, setPrimaryColor] = useState(String(config?.primary_color || "#1a1a1a"));
  const [secondaryColor, setSecondaryColor] = useState(String(config?.secondary_color || "#f5f5f5"));
  const [accentColor, setAccentColor] = useState(String(config?.accent_color || "#d4d4d4"));

  const applyTheme = (themeId: string) => {
    const t = themes.find((x) => x.id === themeId);
    if (t) {
      setTheme(themeId);
      setPrimaryColor(t.colors.primary);
      setSecondaryColor(t.colors.secondary);
      setAccentColor(t.colors.accent);
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Palette className="w-4 h-4 text-neutral-400" />
        <h2 className="text-lg font-serif font-light text-neutral-800">Tema & Layout</h2>
      </div>

      {/* Theme presets */}
      <div className="mb-8">
        <label className="text-[10px] tracking-wider uppercase text-neutral-400 mb-3 block">Pilih Tema</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => applyTheme(t.id)}
              className={`p-3 border text-left transition-all duration-200 ${
                theme === t.id ? "border-neutral-800 bg-neutral-50" : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="flex gap-1.5 mb-2">
                <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: t.colors.primary }} />
                <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: t.colors.secondary }} />
                <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: t.colors.accent }} />
              </div>
              <span className="text-xs text-neutral-700">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom colors */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="text-[10px] tracking-wider uppercase text-neutral-400 mb-1.5 block">Warna Utama</label>
          <div className="flex items-center gap-2">
            <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-8 h-8 border border-neutral-200 cursor-pointer" />
            <input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="wedding-input text-xs flex-1" />
          </div>
        </div>
        <div>
          <label className="text-[10px] tracking-wider uppercase text-neutral-400 mb-1.5 block">Warna Background</label>
          <div className="flex items-center gap-2">
            <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-8 h-8 border border-neutral-200 cursor-pointer" />
            <input value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="wedding-input text-xs flex-1" />
          </div>
        </div>
        <div>
          <label className="text-[10px] tracking-wider uppercase text-neutral-400 mb-1.5 block">Warna Aksen</label>
          <div className="flex items-center gap-2">
            <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-8 h-8 border border-neutral-200 cursor-pointer" />
            <input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="wedding-input text-xs flex-1" />
          </div>
        </div>
      </div>

      {/* Font */}
      <div className="mb-8">
        <label className="text-[10px] tracking-wider uppercase text-neutral-400 mb-3 block">Font</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {fonts.map((f) => (
            <button
              key={f.id}
              onClick={() => setFontFamily(f.id)}
              className={`p-3 border text-left transition-all duration-200 ${
                fontFamily === f.id ? "border-neutral-800 bg-neutral-50" : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <span className="text-sm text-neutral-700" style={{ fontFamily: f.value }}>{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="mb-6 p-6 border border-neutral-100" style={{ backgroundColor: secondaryColor, fontFamily: fonts.find(f => f.id === fontFamily)?.value }}>
        <p className="text-2xl font-serif mb-2" style={{ color: primaryColor }}>Sarah & Ahmad</p>
        <p className="text-sm" style={{ color: accentColor }}>15 Juli 2026 — Gedung Serbaguna</p>
        <div className="mt-3 w-12 h-0.5" style={{ backgroundColor: accentColor }} />
        <p className="mt-3 text-sm leading-relaxed" style={{ color: primaryColor, opacity: 0.7 }}>
          Preview tampilan dengan tema yang dipilih
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onSave({ theme, font_family: fontFamily, primary_color: primaryColor, secondary_color: secondaryColor, accent_color: accentColor })}
          disabled={saving}
          className="wedding-btn-primary text-xs tracking-widest disabled:opacity-50 flex items-center gap-2 px-6 py-3"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Simpan Tema
        </button>
      </div>
    </div>
  );
}
