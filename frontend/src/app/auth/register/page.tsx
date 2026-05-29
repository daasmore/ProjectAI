"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone, Loader2, Heart } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("wedding_token", data.token);
        localStorage.setItem("wedding_user", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        setError(data.error || "Registrasi gagal");
      }
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-800 rounded-full mb-4">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-serif text-neutral-800">Wedding Invitation</h1>
          <p className="text-neutral-400 text-sm mt-1">Buat akun untuk mulai membuat undangan</p>
        </div>

        {/* Form */}
        <div className="bg-white border border-neutral-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs tracking-wider uppercase text-neutral-500 mb-2 block">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                  placeholder="Nama lengkap Anda"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs tracking-wider uppercase text-neutral-500 mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                  placeholder="nama@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs tracking-wider uppercase text-neutral-500 mb-2 block">No. HP / WhatsApp</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                  placeholder="08123456789"
                />
              </div>
            </div>

            <div>
              <label className="text-xs tracking-wider uppercase text-neutral-500 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                  placeholder="Minimal 6 karakter"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-neutral-800 text-white text-sm tracking-wider uppercase hover:bg-neutral-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Daftar"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral-400 text-sm">
              Sudah punya akun?{" "}
              <Link href="/auth/login" className="text-neutral-800 hover:underline font-medium">
                Masuk
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-neutral-300 text-xs mt-6">
          <Link href="/" className="hover:text-neutral-500">← Kembali ke beranda</Link>
        </p>
      </div>
    </div>
  );
}
