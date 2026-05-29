"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function WeddingFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-sage-800 text-sage-200 py-12 mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-champagne-400 fill-champagne-400" />
          <span className="font-serif text-lg font-semibold text-white">
            Wedding<span className="text-champagne-400">Invite</span>
          </span>
        </div>
        <p className="text-sm text-sage-400 mb-2">
          Undangan pernikahan digital yang elegan & berkesan
        </p>
        <p className="text-xs text-sage-500">
          © {new Date().getFullYear()} WeddingInvite. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
