"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Users,
  Palette,
  Image,
  Quote,
  Settings,
  Eye,
  Save,
  Menu,
  X,
  Home,
  LayoutDashboard,
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: <Settings className="w-4 h-4" />, label: "Data Mempelai" },
  { href: "/admin/tema", icon: <Palette className="w-4 h-4" />, label: "Tema & Warna" },
  { href: "/admin/gambar", icon: <Image className="w-4 h-4" />, label: "Gambar" },
  { href: "/admin/quote", icon: <Quote className="w-4 h-4" />, label: "Quote" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-100 h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-1">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link href="/admin" className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-neutral-400" />
            <span className="text-sm font-medium text-neutral-800 tracking-wider uppercase">
              Admin<span className="text-neutral-400">Panel</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/invite/sarah-ahmad"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-wider uppercase text-neutral-500 border border-neutral-200 hover:bg-neutral-50 transition-colors"
          >
            <Eye className="w-3 h-3" />
            Preview
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-wider uppercase text-neutral-500 border border-neutral-200 hover:bg-neutral-50 transition-colors"
          >
            <LayoutDashboard className="w-3 h-3" />
            Dashboard
          </Link>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-40 w-56 bg-white border-r border-neutral-100 pt-14 md:pt-0 transform transition-transform duration-200 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 text-xs tracking-wider uppercase transition-colors ${
                    isActive
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="flex-1 md:ml-0 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
