"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Check, X, Users, MessageSquare, User } from "lucide-react";

const rsvpSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  guestCount: z.number().min(1, "Minimal 1 tamu").max(10, "Maksimal 10 tamu"),
  status: z.enum(["confirmed", "declined"]),
  message: z.string().max(500, "Maksimal 500 karakter").optional(),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

export default function RSVPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<RSVPFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guestCount: 1, status: "confirmed" },
  });

  const status = watch("status");

  const handleFormSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/v1/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wedding_id: "d840cc08-20ed-4014-b676-c2b3aae9c76a",
          guest_name: data.name,
          guest_count: data.guestCount,
          status: data.status === "confirmed" ? "confirmed" : "declined",
          message: data.message || "",
        }),
      });
      if (!res.ok) throw new Error("Gagal mengirim RSVP");
      setSubmittedData(data);
      setIsSubmitted(true);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && submittedData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${
          submittedData.status === "confirmed" ? "bg-neutral-100" : "bg-neutral-50"
        }`}>
          {submittedData.status === "confirmed" ? (
            <Check className="w-6 h-6 text-neutral-600" />
          ) : (
            <X className="w-6 h-6 text-neutral-400" />
          )}
        </div>
        <h3 className="text-lg font-serif font-light text-neutral-800 mb-2">
          {submittedData.status === "confirmed" ? "Terima Kasih!" : "Terima Kasih Telah Memberitahu"}
        </h3>
        <p className="text-neutral-400 text-sm mb-6">
          {submittedData.status === "confirmed"
            ? "Kami menantikan kehadiran Anda."
            : "Kami berharap bertemu Anda lain waktu."}
        </p>
        <button
          onClick={() => { setIsSubmitted(false); setSubmittedData(null); reset(); }}
          className="text-neutral-400 hover:text-neutral-600 text-xs tracking-wider uppercase border-b border-neutral-200 hover:border-neutral-400 pb-0.5 transition-colors"
        >
          Kirim RSVP lainnya
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <label className="flex items-center gap-2 text-xs tracking-wider uppercase text-neutral-400 mb-2">
          <User className="w-3 h-3" />
          Nama Lengkap
        </label>
        <input {...register("name")} className="wedding-input text-sm" placeholder="Masukkan nama" />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
      </div>

      {/* Guest Count */}
      <div>
        <label className="flex items-center gap-2 text-xs tracking-wider uppercase text-neutral-400 mb-2">
          <Users className="w-3 h-3" />
          Jumlah Tamu
        </label>
        <select {...register("guestCount", { valueAsNumber: true })} className="wedding-input text-sm">
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} Orang</option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="text-xs tracking-wider uppercase text-neutral-400 mb-3 block">Konfirmasi</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setValue("status", "confirmed")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm border transition-all duration-200 ${
              status === "confirmed"
                ? "border-neutral-800 bg-neutral-800 text-white"
                : "border-neutral-200 text-neutral-400 hover:border-neutral-300"
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            Hadir
          </button>
          <button
            type="button"
            onClick={() => setValue("status", "declined")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm border transition-all duration-200 ${
              status === "declined"
                ? "border-neutral-800 bg-neutral-800 text-white"
                : "border-neutral-200 text-neutral-400 hover:border-neutral-300"
            }`}
          >
            <X className="w-3.5 h-3.5" />
            Tidak Hadir
          </button>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="flex items-center gap-2 text-xs tracking-wider uppercase text-neutral-400 mb-2">
          <MessageSquare className="w-3 h-3" />
          Ucapan <span className="text-neutral-300 normal-case">(opsional)</span>
        </label>
        <textarea {...register("message")} rows={3} className="wedding-input text-sm resize-none" placeholder="Tulis ucapan untuk mempelai..." />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileTap={{ scale: 0.98 }}
        className="w-full wedding-btn-primary disabled:opacity-50 tracking-widest text-xs py-4"
      >
        {isSubmitting ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto" />
        ) : (
          <>
            <Send className="w-3.5 h-3.5 mr-2" />
            Kirim RSVP
          </>
        )}
      </motion.button>
    </form>
  );
}
