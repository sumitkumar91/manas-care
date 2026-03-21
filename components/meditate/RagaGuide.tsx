"use client";

import { RAGAS } from "@/lib/constants/meditation";

const TIME_COLORS: Record<string, string> = {
  "Early morning": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "Late morning": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Afternoon (3–5 PM)": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Evening (6–9 PM)": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  "Night": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Late night": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  "Midnight": "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400",
  "Anytime": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
};

export function RagaGuide() {
  function openYouTube(query: string) {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Indian classical ragas are composed for specific times of day and emotional states.
        Each raga has centuries of tradition behind its healing properties.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {RAGAS.map((raga) => (
          <div key={raga.name} className="rounded-xl border p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-sm">{raga.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 italic">{raga.mood}</p>
              </div>
              <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${TIME_COLORS[raga.time] ?? "bg-muted text-muted-foreground"}`}>
                {raga.time}
              </span>
            </div>
            <ul className="space-y-0.5">
              {raga.benefits.map((b) => (
                <li key={b} className="text-xs text-muted-foreground flex gap-1.5">
                  <span className="text-primary mt-px">✦</span>{b}
                </li>
              ))}
            </ul>
            <button
              onClick={() => openYouTube(raga.searchQuery)}
              className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              ▶ Listen on YouTube
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground pt-1">
        Tip: Use headphones, dim the lights, and let the music guide your breath.
        You don&apos;t need to &quot;do&quot; anything — just listen.
      </p>
    </div>
  );
}
