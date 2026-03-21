"use client";

import { type Raga } from "@/lib/constants/meditation";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface RagaCardProps {
  raga: Raga | { name: string; time: string; mood: string; benefit: string; reason: string; searchQuery: string };
  label?: string;
}

export function RagaCard({ raga, label }: RagaCardProps) {
  const benefits = "benefits" in raga ? raga.benefits : ["benefit" in raga ? raga.benefit : ""];
  const sub = "reason" in raga ? raga.reason : null;

  function openYouTube() {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(raga.searchQuery)}`;
    window.open(url, "_blank", "noopener");
  }

  return (
    <div className="rounded-2xl border bg-card p-5 space-y-4">
      {label && (
        <p className="text-xs font-medium text-primary uppercase tracking-wider">{label}</p>
      )}
      <div>
        <h2 className="text-2xl font-bold">{raga.name}</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{raga.time} · {raga.mood}</p>
      </div>

      {sub && (
        <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3">{sub}</p>
      )}

      <div className="flex flex-wrap gap-2">
        {benefits.map((b) => (
          <span key={b} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">
            {b}
          </span>
        ))}
      </div>

      <Button onClick={openYouTube} className="w-full gap-2">
        <ExternalLink className="h-4 w-4" />
        Listen on YouTube
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        Opens a curated search for {raga.name} on YouTube
      </p>
    </div>
  );
}
