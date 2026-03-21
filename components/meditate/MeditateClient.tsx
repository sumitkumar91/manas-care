"use client";

import { useState } from "react";
import { BreathingExercisePanel } from "./BreathingExercise";
import { MeditationTimer } from "./MeditationTimer";
import { RagaGuide } from "./RagaGuide";

type Tab = "breathing" | "timer" | "music";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "breathing", label: "Breathing", icon: "🌬️" },
  { id: "timer", label: "Meditation", icon: "🧘" },
  { id: "music", label: "Ragas", icon: "🎵" },
];

export function MeditateClient() {
  const [tab, setTab] = useState<Tab>("breathing");

  return (
    <div className="space-y-6">
      {/* Tab switcher */}
      <div className="flex gap-2 rounded-xl border p-1 bg-muted/30">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
              tab === t.id
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "breathing" && <BreathingExercisePanel />}
      {tab === "timer" && <MeditationTimer />}
      {tab === "music" && <RagaGuide />}
    </div>
  );
}
