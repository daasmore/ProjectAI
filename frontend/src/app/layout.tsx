import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wedding Invitation — Undangan Pernikahan Digital",
  description: "Buat undangan pernikahan digital yang elegan dan berkesan. Gratis, mudah, dan indah.",
  keywords: ["undangan", "pernikahan", "wedding", "invitation", "digital"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-cream-50 bg-wedding-pattern">
        {children}
      </body>
    </html>
  );
}
