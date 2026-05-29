"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Ethnic ornaments per Indonesian tribe template
 * Each template gets unique decorative patterns + animations
 */

/* ═══════════════════════════════════════════════════════════════════════════ 
   MELAYU — Cloud/petal gold ornaments, gentle float
   ═══════════════════════════════════════════════════════════════════════════ */
function MelayuOrnaments() {
  const petals = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 16,
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 4,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -20, 0],
            x: [0, 8, -8, 0],
            opacity: [0.15, 0.35, 0.15],
            rotate: [0, 45, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 40 40" fill="none">
            <path d="M20 0C20 0 25 12 32 18C25 20 20 32 20 40C20 40 15 28 8 22C15 20 20 8 20 0Z" fill="#C9A96E" opacity="0.4" />
          </svg>
        </motion.div>
      ))}
      {/* Gold corner accents */}
      <svg className="absolute top-0 left-0 w-24 h-24 opacity-20" viewBox="0 0 100 100">
        <path d="M0 0 C30 0 50 10 60 40 C50 30 30 25 0 25 Z" fill="#C9A96E" />
        <path d="M0 0 C0 30 10 50 40 60 C30 50 25 30 25 0 Z" fill="#C9A96E" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-24 h-24 opacity-20 rotate-180" viewBox="0 0 100 100">
        <path d="M0 0 C30 0 50 10 60 40 C50 30 30 25 0 25 Z" fill="#C9A96E" />
        <path d="M0 0 C0 30 10 50 40 60 C30 50 25 30 25 0 Z" fill="#C9A96E" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ 
   JAWA — Parang diagonal wave pattern, reveal animation
   ═══════════════════════════════════════════════════════════════════════════ */
function JawaOrnaments() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Parang diagonal stripes */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute h-px"
          style={{
            top: `${10 + i * 12}%`,
            left: "-10%",
            width: "120%",
            background: `linear-gradient(90deg, transparent, rgba(92,61,46,${0.08 + i * 0.02}), transparent)`,
            transform: `rotate(${-5 + i * 0.5}deg)`,
          }}
          animate={{ x: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8 + i, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Keraton-inspired corner */}
      <svg className="absolute top-4 left-4 w-16 h-16 opacity-15" viewBox="0 0 60 60">
        <path d="M0 30 Q15 15 30 0 Q15 15 30 30 Q15 45 0 60 Q15 45 30 30 Z" fill="#5C3D2E" />
      </svg>
      <svg className="absolute bottom-4 right-4 w-16 h-16 opacity-15 rotate-180" viewBox="0 0 60 60">
        <path d="M0 30 Q15 15 30 0 Q15 15 30 30 Q15 45 0 60 Q15 45 30 30 Z" fill="#5C3D2E" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ 
   SUNDA — Blooming flower ornaments, bloom animation
   ═══════════════════════════════════════════════════════════════════════════ */
function SundaOrnaments() {
  const flowers = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 10 + Math.random() * 14,
      delay: Math.random() * 3,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {flowers.map((f) => (
        <motion.div
          key={f.id}
          className="absolute"
          style={{ left: `${f.x}%`, top: `${f.y}%` }}
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.1, 0.25, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 10, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width={f.size} height={f.size} viewBox="0 0 40 40" fill="none">
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx="20"
                cy="8"
                rx="4"
                ry="8"
                fill="#5B8FA8"
                opacity="0.3"
                transform={`rotate(${angle} 20 20)`}
              />
            ))}
            <circle cx="20" cy="20" r="4" fill="#5B8FA8" opacity="0.4" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ 
   BATCH — Gorga geometric patterns, bold slide animation
   ═══════════════════════════════════════════════════════════════════════════ */
function BatakOrnaments() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Gorga zigzag borders */}
      <svg className="absolute top-0 left-0 w-full h-8 opacity-20" viewBox="0 0 400 30" preserveAspectRatio="none">
        <path d="M0 0 L20 15 L40 0 L60 15 L80 0 L100 15 L120 0 L140 15 L160 0 L180 15 L200 0 L220 15 L240 0 L260 15 L280 0 L300 15 L320 0 L340 15 L360 0 L380 15 L400 0" stroke="#C23B22" strokeWidth="2" fill="none" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-full h-8 opacity-20 rotate-180" viewBox="0 0 400 30" preserveAspectRatio="none">
        <path d="M0 0 L20 15 L40 0 L60 15 L80 0 L100 15 L120 0 L140 15 L160 0 L180 15 L200 0 L220 15 L240 0 L260 15 L280 0 L300 15 L320 0 L340 15 L360 0 L380 15 L400 0" stroke="#C23B22" strokeWidth="2" fill="none" />
      </svg>
      {/* Geometric diamonds */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${15 + i * 15}%`, top: "50%", marginTop: -10 }}
          animate={{ y: [0, -15, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 4 + i, delay: i * 0.5, repeat: Infinity }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <rect x="2" y="2" width="16" height="16" transform="rotate(45 10 10)" stroke="#C23B22" strokeWidth="1" fill="none" opacity="0.3" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ 
   MINANG — Gonjong (curved roof) ornaments, upward sweep
   ═══════════════════════════════════════════════════════════════════════════ */
function MinangOrnaments() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Gonjong curved lines at top */}
      <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-16 opacity-20" viewBox="0 0 160 60">
        <motion.path
          d="M80 60 Q60 20 40 0 M80 60 Q100 20 120 0"
          stroke="#8B2500"
          strokeWidth="2"
          fill="none"
          animate={{ d: ["M80 60 Q60 20 40 0 M80 60 Q100 20 120 0", "M80 60 Q55 15 35 -5 M80 60 Q105 15 125 -5", "M80 60 Q60 20 40 0 M80 60 Q100 20 120 0"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      {/* Horn-shaped decorations */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${20 + i * 20}%`, bottom: "10%" }}
          animate={{ y: [0, -10, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, delay: i * 0.8, repeat: Infinity }}
        >
          <svg width="12" height="20" viewBox="0 0 12 20">
            <path d="M6 0 Q0 5 0 10 Q0 15 6 20 Q12 15 12 10 Q12 5 6 0Z" fill="#8B2500" opacity="0.2" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ 
   BALI — Ceplok (circle mandala), pulse/spin animation
   ═══════════════════════════════════════════════════════════════════════════ */
function BaliOrnaments() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Mandala circles */}
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 2) * 40}%`,
          }}
          animate={{
            scale: [0.9, 1.1, 0.9],
            opacity: [0.08, 0.15, 0.08],
            rotate: i % 2 === 0 ? [0, 360] : [360, 0],
          }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
        >
          <svg width={30 + i * 5} height={30 + i * 5} viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="25" stroke="#B8943E" strokeWidth="0.5" fill="none" />
            <circle cx="30" cy="30" r="18" stroke="#B8943E" strokeWidth="0.5" fill="none" />
            <circle cx="30" cy="30" r="10" stroke="#B8943E" strokeWidth="0.5" fill="none" />
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <circle
                key={angle}
                cx={30 + 25 * Math.cos((angle * Math.PI) / 180)}
                cy={30 + 25 * Math.sin((angle * Math.PI) / 180)}
                r="3"
                fill="#B8943E"
                opacity="0.15"
              />
            ))}
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ 
   DAYAK — Enggang bird wing pattern, soar animation
   ═══════════════════════════════════════════════════════════════════════════ */
function DayakOrnaments() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Wing shapes */}
      <motion.div
        className="absolute top-10 left-0 w-32 h-20 opacity-10"
        animate={{ x: [0, 20, 0], y: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 120 80" fill="#DAA520">
          <path d="M0 40 Q30 10 80 20 Q100 25 120 0 Q100 30 80 35 Q30 45 0 60 Z" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-10 right-0 w-32 h-20 opacity-10 scale-x-[-1]"
        animate={{ x: [0, -20, 0], y: [0, -5, 0] }}
        transition={{ duration: 8, delay: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 120 80" fill="#DAA520">
          <path d="M0 40 Q30 10 80 20 Q100 25 120 0 Q100 30 80 35 Q30 45 0 60 Z" />
        </svg>
      </motion.div>
      {/* Tribal dots */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 3 + Math.random() * 4,
            height: 3 + Math.random() * 4,
            backgroundColor: i % 3 === 0 ? "#DAA520" : i % 3 === 1 ? "#C23B22" : "#1A0A00",
          }}
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.5, 1] }}
          transition={{ duration: 3 + Math.random() * 3, delay: Math.random() * 2, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ 
   BUGIS — Phinisi sail wave pattern, drift animation
   ═══════════════════════════════════════════════════════════════════════════ */
function BugisOrnaments() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Wave lines */}
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-full"
          style={{ top: `${15 + i * 18}%` }}
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 6 + i * 2, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="100%" height="20" viewBox="0 0 400 20" preserveAspectRatio="none" className="opacity-10">
            <path
              d={`M0 10 Q${50 + i * 10} ${5 + i * 2} 100 10 Q${150 + i * 10} ${15 - i * 2} 200 10 Q${250 + i * 10} ${5 + i * 2} 300 10 Q${350 + i * 10} ${15 - i * 2} 400 10`}
              stroke="#8B1A1A"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </motion.div>
      ))}
      {/* Sail triangles */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-10"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="60" height="80" viewBox="0 0 60 80">
          <path d="M30 0 L50 70 L30 60 L10 70 Z" fill="#8B1A1A" />
          <line x1="30" y1="0" x2="30" y2="75" stroke="#8B1A1A" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ 
   ACEH — Krawang Islamic arabesque, intricate fade
   ═══════════════════════════════════════════════════════════════════════════ */
function AcehOrnaments() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Islamic geometric pattern */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 16}%`,
            top: "50%",
            marginTop: -20,
          }}
          animate={{
            opacity: [0.05, 0.12, 0.05],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 15 + i * 3, delay: i * 0.5, repeat: Infinity, ease: "linear" }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <rect x="5" y="5" width="30" height="30" stroke="#2E7D32" strokeWidth="0.5" fill="none" />
            <rect x="10" y="10" width="20" height="20" stroke="#2E7D32" strokeWidth="0.5" fill="none" transform="rotate(45 20 20)" />
            <circle cx="20" cy="20" r="8" stroke="#2E7D32" strokeWidth="0.5" fill="none" />
          </svg>
        </motion.div>
      ))}
      {/* Crescent moon */}
      <motion.div
        className="absolute top-8 right-8 opacity-10"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30">
          <path d="M15 2 A13 13 0 1 0 15 28 A10 10 0 1 1 15 2Z" fill="#2E7D32" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ 
   PAPUA — Asmat tribal mask pattern, earth pulse
   ═══════════════════════════════════════════════════════════════════════════ */
function PapuaOrnaments() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Tribal mask silhouettes */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-8"
          style={{
            left: `${10 + i * 22}%`,
            top: `${20 + (i % 2) * 30}%`,
          }}
          animate={{
            scale: [0.95, 1.05, 0.95],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{ duration: 4 + i, delay: i * 0.7, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="24" height="32" viewBox="0 0 24 32">
            <ellipse cx="12" cy="14" rx="10" ry="12" fill="#8B4513" />
            <circle cx="8" cy="12" r="2" fill="#1A0A00" />
            <circle cx="16" cy="12" r="2" fill="#1A0A00" />
            <path d="M8 18 Q12 22 16 18" stroke="#1A0A00" strokeWidth="1.5" fill="none" />
            <line x1="12" y1="2" x2="12" y2="6" stroke="#8B4513" strokeWidth="2" />
            <line x1="6" y1="4" x2="8" y2="7" stroke="#8B4513" strokeWidth="1.5" />
            <line x1="18" y1="4" x2="16" y2="7" stroke="#8B4513" strokeWidth="1.5" />
          </svg>
        </motion.div>
      ))}
      {/* Earth-tone particles */}
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            backgroundColor: ["#8B4513", "#C47A5A", "#DAA520", "#1A0A00"][i % 4],
          }}
          animate={{ opacity: [0.1, 0.25, 0.1], y: [0, -8, 0] }}
          transition={{ duration: 3 + Math.random() * 4, delay: Math.random() * 3, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ 
   UNIVERSAL — Minimal elegant (for non-ethnic templates)
   ═══════════════════════════════════════════════════════════════════════════ */
function UniversalOrnaments() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 3 + Math.random() * 5,
            height: 3 + Math.random() * 5,
            backgroundColor: `rgba(180,180,180,${0.1 + Math.random() * 0.15})`,
          }}
          animate={{ y: [0, -15, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5 + Math.random() * 5, delay: Math.random() * 3, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ 
   MAIN EXPORT — Picks ornament set by template ID
   ═══════════════════════════════════════════════════════════════════════════ */

const ornamentMap: Record<string, React.FC> = {
  tmpl_melayu: MelayuOrnaments,
  tmpl_jawa: JawaOrnaments,
  tmpl_sunda: SundaOrnaments,
  tmpl_batak: BatakOrnaments,
  tmpl_minang: MinangOrnaments,
  tmpl_bali: BaliOrnaments,
  tmpl_dayak: DayakOrnaments,
  tmpl_bugis: BugisOrnaments,
  tmpl_aceh: AcehOrnaments,
  tmpl_papua: PapuaOrnaments,
};

interface EthnicOrnamentProps {
  templateId: string;
}

export default function EthnicOrnament({ templateId }: EthnicOrnamentProps) {
  const OrnamentComponent = ornamentMap[templateId] || UniversalOrnaments;
  return <OrnamentComponent />;
}

/* Section divider ornaments — thin decorative lines between sections */
export function EthnicDivider({ templateId }: EthnicOrnamentProps) {
  const colorMap: Record<string, string> = {
    tmpl_melayu: "#C9A96E",
    tmpl_jawa: "#5C3D2E",
    tmpl_sunda: "#5B8FA8",
    tmpl_batak: "#C23B22",
    tmpl_minang: "#8B2500",
    tmpl_bali: "#B8943E",
    tmpl_dayak: "#DAA520",
    tmpl_bugis: "#8B1A1A",
    tmpl_aceh: "#2E7D32",
    tmpl_papua: "#8B4513",
  };
  const color = colorMap[templateId] || "#d4d4d4";

  return (
    <div className="flex items-center justify-center py-4">
      <div className="h-px flex-1 max-w-24" style={{ backgroundColor: color, opacity: 0.3 }} />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="mx-3"
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" fill={color} opacity="0.4" />
        </svg>
      </motion.div>
      <div className="h-px flex-1 max-w-24" style={{ backgroundColor: color, opacity: 0.3 }} />
    </div>
  );
}
