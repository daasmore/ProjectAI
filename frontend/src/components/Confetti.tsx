"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  shape: "circle" | "square" | "diamond";
}

export default function Confetti({ active = true }: { active?: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) return;

    const colors = [
      "#d4a95a", "#e8c98a", "#f5e3b8", "#b8923e",
      "#967533", "#facc15", "#fef08a", "#fdf3d8",
      "#96a381", "#b5bfa5",
    ];
    const shapes: ("circle" | "square" | "diamond")[] = ["circle", "square", "diamond"];

    const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));

    setPieces(newPieces);

    const timer = setTimeout(() => setPieces([]), 5000);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <AnimatePresence>
      {pieces.length > 0 && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{
                top: "-5%",
                left: `${piece.x}%`,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                top: "105%",
                rotate: piece.rotation + 720,
                opacity: [1, 1, 0.8, 0],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: "easeIn",
              }}
              className="absolute"
              style={{
                width: piece.size,
                height: piece.shape === "diamond" ? piece.size * 1.5 : piece.size,
                backgroundColor: piece.color,
                borderRadius: piece.shape === "circle" ? "50%" : piece.shape === "diamond" ? "2px" : "1px",
                transform: piece.shape === "diamond" ? "rotate(45deg)" : undefined,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
