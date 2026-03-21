"use client";

import { type Raga } from "@/lib/constants/meditation";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface RagaCardProps {
  raga: Raga;
}

export function RagaCard({ raga }: RagaCardProps) {
  function openYouTube() {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(raga.searchQuery)}`;
    window.open(url, "_blank", "noopener");
  }

  return (
    <div className="rounded-2xl border bg-card p-5 space-y-3 flex flex-col">
      <div>
        <h2 className="text-lg font-bold">Raag {raga.name}</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{raga.mood}</p>
      </div>

      <Button onClick={openYouTube} variant="outline" className="gap-2 mt-auto">
        <ExternalLink className="h-4 w-4" />
        Listen on YouTube
      </Button>
    </div>
  );
}
