"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Check, X, Users, MessageSquare, User } from "lucide-react";
import Confetti from "./Confetti";

const rsvpSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  guestCount: z.number().min(1, "Minimal 1 tamu").max(10, "Maksimal 10 tamu"),
  status: z.enum(["confirmed", "declined"]),
  message: z.string().max(500, "Pesan maksimal 500 karakter").optional(),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

interface RSVPFormProps {
  onSubmit?: (data: RSVPFormData) => Promise<void>;
}

export default function RSVPForm({ onSubmit }: RSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
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
    defaultValues: {
      guestCount: 1,
      status: "confirmed",
    },
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
      if (onSubmit) await onSubmit(data);
      setSubmittedData(data);
      setIsSubmitted(true);
      if (data.status === "confirmed") {
        setShowConfetti(true);
      }
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setShowConfetti(false);
    setSubmittedData(null);
    reset();
  };

  return (
    <>
      <Confetti active={showConfetti} />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-sage-700 mb-2">
                <User className="w-4 h-4 text-champagne-500" />
                Nama Lengkap
              </label>
              <input
                {...register("name")}
                className="wedding-input"
                placeholder="Masukkan nama lengkap"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Guest Count */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-sage-700 mb-2">
                <Users className="w-4 h-4 text-champagne-500" />
                Jumlah Tamu
              </label>
              <select
                {...register("guestCount", { valueAsNumber: true })}
                className="wedding-input"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Orang" : "Orang"}
                  </option>
                ))}
              </select>
              {errors.guestCount && (
                <p className="mt-1 text-xs text-red-500">{errors.guestCount.message}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-sage-700 mb-3 block">
                Konfirmasi Kehadiran
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setValue("status", "confirmed")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all duration-300 font-medium ${
                    status === "confirmed"
                      ? "border-green-400 bg-green-50 text-green-700 shadow-md"
                      : "border-champagne-200 bg-white text-sage-500 hover:border-champagne-300"
                  }`}
                >
                  <Check className="w-4 h-4" />
                  Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setValue("status", "declined")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all duration-300 font-medium ${
                    status === "declined"
                      ? "border-red-400 bg-red-50 text-red-700 shadow-md"
                      : "border-champagne-200 bg-white text-sage-500 hover:border-champagne-300"
                  }`}
                >
                  <X className="w-4 h-4" />
                  Tidak Hadir
                </button>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-sage-700 mb-2">
                <MessageSquare className="w-4 h-4 text-champagne-500" />
                Ucapan / Pesan <span className="text-sage-400">(opsional)</span>
              </label>
              <textarea
                {...register("message")}
                rows={3}
                className="wedding-input resize-none"
                placeholder="Tulis ucapan atau pesan untuk mempelai..."
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full wedding-btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-4 text-base"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Kirim RSVP
                </>
              )}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                submittedData?.status === "confirmed"
                  ? "bg-green-100"
                  : "bg-amber-100"
              }`}
            >
              {submittedData?.status === "confirmed" ? (
                <Check className="w-10 h-10 text-green-500" />
              ) : (
                <X className="w-10 h-10 text-amber-500" />
              )}
            </motion.div>
            <h3 className="text-xl font-serif font-semibold text-sage-800 mb-2">
              {submittedData?.status === "confirmed"
                ? "Terima Kasih! 🎉"
                : "Terima Kasih Telah Memberitahu"}
            </h3>
            <p className="text-sage-500 mb-6">
              {submittedData?.status === "confirmed"
                ? "Kami menantikan kehadiran Anda di hari bahagia kami."
                : "Kami berharap dapat bertemu Anda lain waktu."}
            </p>
            <button
              onClick={resetForm}
              className="text-champagne-600 hover:text-champagne-700 font-medium text-sm underline underline-offset-2"
            >
              Kirim RSVP lainnya
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
