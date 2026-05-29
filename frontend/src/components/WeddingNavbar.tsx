"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export default function WeddingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-neutral-400" />
            <span className="text-sm font-medium text-neutral-800 tracking-wider uppercase">Wedding<span className="text-neutral-400">Invite</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-neutral-500 hover:text-neutral-800 transition-colors text-xs tracking-wider uppercase">Beranda</Link>
            <Link href="/invite/sarah-ahmad" className="text-neutral-500 hover:text-neutral-800 transition-colors text-xs tracking-wider uppercase">Undangan</Link>
            <Link href="/dashboard" className="text-neutral-500 hover:text-neutral-800 transition-colors text-xs tracking-wider uppercase">Dashboard</Link>
          </div>
          <Link href="/dashboard" className="text-xs tracking-wider uppercase text-neutral-500 hover:text-neutral-800 transition-colors border-b border-neutral-200 hover:border-neutral-400 pb-0.5">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
