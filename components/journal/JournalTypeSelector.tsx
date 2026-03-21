"use client";

import { useState } from "react";
import { FreeJournalEditor } from "./FreeJournalEditor";
import { CBTPromptForm } from "./CBTPromptForm";
import { GratitudeForm } from "./GratitudeForm";

const TYPES = [
  {
    id: "free" as const,
    label: "Free write",
    description: "Write freely - no structure, no rules.",
    icon: "✍️",
  },
  {
    id: "cbt" as const,
    label: "CBT exercise",
    description: "Identify and reframe unhelpful thoughts.",
    icon: "🧠",
  },
  {
    id: "gratitude" as const,
    label: "Gratitude",
    description: "Note what you're thankful for today.",
    icon: "🌱",
  },
];

export function JournalTypeSelector({ userId }: { userId: string }) {
  const [selected, setSelected] = useState<"free" | "cbt" | "gratitude" | null>(null);

  if (selected === "free") return <FreeJournalEditor userId={userId} />;
  if (selected === "cbt") return <CBTPromptForm userId={userId} />;
  if (selected === "gratitude") return <GratitudeForm userId={userId} />;

  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-sm text-muted-foreground">Choose an entry type to get started:</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            className="rounded-xl border p-5 text-left hover:border-primary hover:bg-accent/40 transition-colors cursor-pointer"
          >
            <div className="text-2xl mb-2">{t.icon}</div>
            <p className="font-medium text-sm">{t.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{t.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
