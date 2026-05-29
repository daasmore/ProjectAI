"use client";

import { useState } from "react";
import { Save, Loader2, Quote } from "lucide-react";

interface Props {
  config: Record<string, unknown> | null;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  saving: boolean;
  updateConfig: (key: string, value: unknown) => void;
}

export default function QuoteEditor({ config, onSave, saving }: Props) {
  const [quote, setQuote] = useState(String(config?.quote || ""));
  const [quoteSource, setQuoteSource] = useState(String(config?.quote_source || ""));

  const presets = [
    {
      text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
      source: "QS. Ar-Rum: 21",
    },
    {
      text: "Dan segala sesuatu Kami ciptakan secara berpasangan agar kamu mengingat kebesaran Allah.",
      source: "QS. Az-Zariyat: 49",
    },
    {
      text: "Dan Dia menjadikan di antaraamu rasa kasih dan sayang.",
      source: "QS. Ar-Rum: 21",
    },
    {
      text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
      source: "Maya Angelou",
    },
    {
      text: "Two souls with but a single thought, two hearts that beat as one.",
      source: "Friedrich Halm",
    },
    {
      text: "Cinta bukan tentang berapa lama kamu mengenal seseorang, tetapi tentang siapa yang membuatmu tersenyum sejak kamu mengenalnya.",
      source: "Pribadi",
    },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setQuote(preset.text);
    setQuoteSource(preset.source);
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Quote className="w-4 h-4 text-neutral-400" />
        <h2 className="text-lg font-serif font-light text-neutral-800">Quote & Ucapan</h2>
      </div>

      {/* Presets */}
      <div className="mb-8">
        <label className="text-[10px] tracking-wider uppercase text-neutral-400 mb-3 block">Pilih Quote</label>
        <div className="space-y-2">
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => applyPreset(p)}
              className={`w-full text-left p-4 border transition-all duration-200 ${
                quote === p.text ? "border-neutral-800 bg-neutral-50" : "border-neutral-100 hover:border-neutral-200"
              }`}
            >
              <p className="text-sm text-neutral-600 italic font-serif leading-relaxed">&ldquo;{p.text}&rdquo;</p>
              <p className="text-[10px] tracking-wider uppercase text-neutral-400 mt-2">— {p.source}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom */}
      <div className="mb-8">
        <label className="text-[10px] tracking-wider uppercase text-neutral-400 mb-3 block">Atau Tulis Sendiri</label>
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className="wedding-input text-sm resize-none italic font-serif"
          rows={4}
          placeholder="Tulis quote atau ayat favorit..."
        />
        <div className="mt-3">
          <label className="text-[10px] tracking-wider uppercase text-neutral-400 mb-1.5 block">Sumber</label>
          <input
            value={quoteSource}
            onChange={(e) => setQuoteSource(e.target.value)}
            className="wedding-input text-sm"
            placeholder="QS. Ar-Rum: 21"
          />
        </div>
      </div>

      {/* Live preview */}
      <div className="mb-6 p-6 bg-neutral-50 border border-neutral-100 text-center">
        <div className="w-6 h-px bg-neutral-300 mx-auto mb-4" />
        <blockquote className="text-base text-neutral-600 italic font-serif leading-relaxed">
          &ldquo;{quote || "Quote akan tampil di sini..."}&rdquo;
        </blockquote>
        <p className="text-[10px] tracking-wider uppercase text-neutral-400 mt-3">
          {quoteSource || "Sumber"}
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onSave({ quote, quote_source: quoteSource })}
          disabled={saving}
          className="wedding-btn-primary text-xs tracking-widest disabled:opacity-50 flex items-center gap-2 px-6 py-3"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Simpan Quote
        </button>
      </div>
    </div>
  );
}
