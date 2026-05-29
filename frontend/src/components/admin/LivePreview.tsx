"use client";

import { useState } from "react";
import { ExternalLink, RefreshCw, Smartphone, Monitor } from "lucide-react";

interface Props {
  slug: string;
  config: Record<string, unknown> | null;
}

export default function LivePreview({ slug, config }: Props) {
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="sticky top-14">
      <div className="bg-white border border-neutral-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] tracking-wider uppercase text-neutral-400">Preview</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setDevice("mobile")}
              className={`p-1.5 transition-colors ${device === "mobile" ? "text-neutral-800" : "text-neutral-300"}`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice("desktop")}
              className={`p-1.5 transition-colors ${device === "desktop" ? "text-neutral-800" : "text-neutral-300"}`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setRefreshKey((k) => k + 1)}
              className="p-1.5 text-neutral-300 hover:text-neutral-600 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <a
              href={`/invite/${slug}`}
              target="_blank"
              className="p-1.5 text-neutral-300 hover:text-neutral-600 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className={`mx-auto border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50 transition-all duration-300 ${
          device === "mobile" ? "w-[280px] h-[500px]" : "w-full h-[500px]"
        }`}>
          <iframe
            key={refreshKey}
            src={`/invite/${slug}`}
            className="w-full h-full border-0"
            title="Preview"
          />
        </div>

        {config && (
          <div className="mt-3 text-[10px] text-neutral-400 space-y-1">
            <p>Theme: <span className="text-neutral-600">{String(config.theme || "minimalist")}</span></p>
            <p>Font: <span className="text-neutral-600">{String(config.font_family || "serif")}</span></p>
          </div>
        )}
      </div>
    </div>
  );
}
