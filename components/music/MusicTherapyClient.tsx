"use client";

import { useState } from "react";
import { getRagaForTime, type Raga } from "@/lib/constants/meditation";
import { RagaCard } from "./RagaCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Sparkles, Loader2 } from "lucide-react";

const EMOTION_PRESETS = [
  "Anxious and overwhelmed",
  "Sad and low energy",
  "Restless and distracted",
  "Angry or irritated",
  "Happy but scattered",
  "Tired and want to sleep",
  "Need focus and clarity",
  "Feeling lonely",
  "Peaceful, want to go deeper",
];

type AIRaga = {
  name: string;
  time: string;
  mood: string;
  benefit: string;
  reason: string;
  searchQuery: string;
};

export function MusicTherapyClient() {
  const [tab, setTab] = useState<"time" | "feel">("time");
  const [feeling, setFeeling] = useState("");
  const [aiRaga, setAiRaga] = useState<AIRaga | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hour = new Date().getHours();
  const timeRaga: Raga = getRagaForTime(hour);

  async function getRecommendation(text: string) {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setAiRaga(null);
    try {
      const res = await fetch("/api/raga", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feeling: text }),
      });
      if (!res.ok) throw new Error("Failed to get recommendation");
      const data = await res.json();
      setAiRaga(data);
    } catch {
      setError("Couldn't get a recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Tab switcher */}
      <div className="flex rounded-xl border p-1 bg-muted/40 gap-1">
        <button
          onClick={() => setTab("time")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            tab === "time" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Clock className="h-4 w-4" />
          Right now
        </button>
        <button
          onClick={() => setTab("feel")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            tab === "feel" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          How I feel
        </button>
      </div>

      {tab === "time" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Based on the traditional <span className="font-medium text-foreground">Raag-Prahar</span> system — each raga is prescribed for a specific time of day to align with your natural energy.
          </p>
          <RagaCard raga={timeRaga} label={`Recommended for ${formatHour(hour)}`} />
        </div>
      )}

      {tab === "feel" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Describe how you feel or pick a state below — our AI will recommend a raga using <span className="font-medium text-foreground">Raga Chikitsa</span> (raga therapy).
          </p>

          {/* Preset emotions */}
          <div className="flex flex-wrap gap-2">
            {EMOTION_PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setFeeling(preset);
                  getRecommendation(preset);
                }}
                className="text-xs border rounded-full px-3 py-1.5 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Or describe how you're feeling in your own words…"
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <Button
              onClick={() => getRecommendation(feeling)}
              disabled={loading || !feeling.trim()}
              className="w-full gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Finding your raga…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Recommend a raga
                </>
              )}
            </Button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {aiRaga && (
            <RagaCard raga={aiRaga} label="Recommended for you" />
          )}
        </div>
      )}
    </div>
  );
}

function formatHour(hour: number): string {
  const period = hour < 12 ? "AM" : "PM";
  const h = hour % 12 || 12;
  return `${h} ${period}`;
}
