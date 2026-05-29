"use client";

import { useState } from "react";
import { Save, Loader2, Heart, Calendar, Clock, MapPin } from "lucide-react";

interface Props {
  config: Record<string, unknown> | null;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  saving: boolean;
  updateConfig: (key: string, value: unknown) => void;
}

export default function MempelaiForm({ config, onSave, saving }: Props) {
  const [form, setForm] = useState({
    bride_name: String(config?.bride_name || ""),
    groom_name: String(config?.groom_name || ""),
    bride_parents: String(config?.bride_parents || ""),
    groom_parents: String(config?.groom_parents || ""),
    wedding_date: String(config?.wedding_date || ""),
    akad_time: String(config?.akad_time || ""),
    resepsi_time: String(config?.resepsi_time || ""),
    venue: String(config?.venue || ""),
    venue_address: String(config?.venue_address || ""),
    description: String(config?.description || ""),
  });

  const set = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-4 h-4 text-neutral-400" />
        <h2 className="text-lg font-serif font-light text-neutral-800">Data Mempelai</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Bride */}
        <div>
          <label className="text-[10px] tracking-wider uppercase text-neutral-400 mb-1.5 block">Nama Pengantin Wanita</label>
          <input value={form.bride_name} onChange={(e) => set("bride_name", e.target.value)} className="wedding-input text-sm" placeholder="Sarah Putri" />
        </div>
        {/* Groom */}
        <div>
          <label className="text-[10px] tracking-wider uppercase text-neutral-400 mb-1.5 block">Nama Pengantin Pria</label>
          <input value={form.groom_name} onChange={(e) => set("groom_name", e.target.value)} className="wedding-input text-sm" placeholder="Ahmad Rizky" />
        </div>

        {/* Bride Parents */}
        <div>
          <label className="text-[10px] tracking-wider uppercase text-neutral-400 mb-1.5 block">Orang Tua Wanita</label>
          <input value={form.bride_parents} onChange={(e) => set("bride_parents", e.target.value)} className="wedding-input text-sm" placeholder="Bapak ... & Ibu ..." />
        </div>
        {/* Groom Parents */}
        <div>
          <label className="text-[10px] tracking-wider uppercase text-neutral-400 mb-1.5 block">Orang Tua Pria</label>
          <input value={form.groom_parents} onChange={(e) => set("groom_parents", e.target.value)} className="wedding-input text-sm" placeholder="Bapak ... & Ibu ..." />
        </div>

        {/* Date */}
        <div>
          <label className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-neutral-400 mb-1.5">
            <Calendar className="w-3 h-3" /> Tanggal Pernikahan
          </label>
          <input type="date" value={form.wedding_date} onChange={(e) => set("wedding_date", e.target.value)} className="wedding-input text-sm" />
        </div>

        {/* Akad Time */}
        <div>
          <label className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-neutral-400 mb-1.5">
            <Clock className="w-3 h-3" /> Waktu Akad
          </label>
          <input value={form.akad_time} onChange={(e) => set("akad_time", e.target.value)} className="wedding-input text-sm" placeholder="08:00 WIB" />
        </div>

        {/* Resepsi Time */}
        <div>
          <label className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-neutral-400 mb-1.5">
            <Clock className="w-3 h-3" /> Waktu Resepsi
          </label>
          <input value={form.resepsi_time} onChange={(e) => set("resepsi_time", e.target.value)} className="wedding-input text-sm" placeholder="11:00 - 14:00 WIB" />
        </div>

        {/* Venue */}
        <div>
          <label className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-neutral-400 mb-1.5">
            <MapPin className="w-3 h-3" /> Venue
          </label>
          <input value={form.venue} onChange={(e) => set("venue", e.target.value)} className="wedding-input text-sm" placeholder="Gedung Serbaguna ..." />
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label className="text-[10px] tracking-wider uppercase text-neutral-400 mb-1.5 block">Alamat Venue</label>
          <textarea value={form.venue_address} onChange={(e) => set("venue_address", e.target.value)} className="wedding-input text-sm resize-none" rows={2} placeholder="Jl. ..., Kota ..." />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="text-[10px] tracking-wider uppercase text-neutral-400 mb-1.5 block">Deskripsi (opsional)</label>
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} className="wedding-input text-sm resize-none" rows={2} />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onSave(form)}
          disabled={saving}
          className="wedding-btn-primary text-xs tracking-widest disabled:opacity-50 flex items-center gap-2 px-6 py-3"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Simpan
        </button>
      </div>
    </div>
  );
}
