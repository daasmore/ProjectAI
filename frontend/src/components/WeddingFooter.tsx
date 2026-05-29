"use client";

import { Heart } from "lucide-react";

export default function WeddingFooter() {
  return (
    <footer className="py-8 px-4 border-t border-neutral-100">
      <div className="max-w-5xl mx-auto text-center">
        <Heart className="w-4 h-4 text-neutral-300 mx-auto mb-4" />
        <p className="text-neutral-400 text-[10px] tracking-[0.15em] uppercase">
          © {new Date().getFullYear()} WeddingInvite — Undangan Pernikahan Digital
        </p>
      </div>
    </footer>
  );
}
