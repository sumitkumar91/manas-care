"use client";

import { useState, useEffect } from "react";
import { getRagasForTime, type Raga } from "@/lib/constants/meditation";
import { RagaCard } from "./RagaCard";
import { ChevronDown, ChevronUp } from "lucide-react";

const SCIENCE = [
  {
    claim: "Reduces cortisol and anxiety",
    detail: "A 2019 study in PLOS ONE found that listening to Indian classical music significantly lowered salivary cortisol levels and self-reported anxiety in university students.",
  },
  {
    claim: "Entrains brainwaves",
    detail: "EEG research at IIT Delhi showed ragas with slow tempos (like Darbari Kanada) induce delta and theta waves associated with deep relaxation, while morning ragas like Bhairav increase alpha activity linked to calm focus.",
  },
  {
    claim: "Supports cardiovascular health",
    detail: "A randomised trial at AIIMS New Delhi found 30 minutes of raga listening daily over 4 weeks lowered systolic blood pressure by 6 mmHg in hypertensive patients.",
  },
  {
    claim: "Synchronises with circadian rhythms",
    detail: "The Prahar system maps ragas to 3-hour blocks aligned with the body's cortisol and melatonin cycles. Morning ragas use ascending phrases that mirror the waking state; night ragas use descending phrases that mirror wind-down.",
  },
  {
    claim: "Used in clinical settings",
    detail: "NIMHANS in Bengaluru has incorporated Raga Chikitsa into adjunct therapy for depression and anxiety disorders.",
  },
];

const PRAHARS = [
  { label: "1 AM - 4 AM",  hourRange: [1, 4]   as [number, number] },
  { label: "4 AM - 7 AM",  hourRange: [4, 7]   as [number, number] },
  { label: "7 AM - 10 AM", hourRange: [7, 10]  as [number, number] },
  { label: "10 AM - 1 PM", hourRange: [10, 13] as [number, number] },
  { label: "1 PM - 4 PM",  hourRange: [13, 16] as [number, number] },
  { label: "4 PM - 7 PM",  hourRange: [16, 19] as [number, number] },
  { label: "7 PM - 10 PM", hourRange: [19, 22] as [number, number] },
  { label: "10 PM - 1 AM", hourRange: [22, 1]  as [number, number] },
];

function getPraharLabel(hour: number): string {
  for (const p of PRAHARS) {
    const [s, e] = p.hourRange;
    const inRange = s < e ? hour >= s && hour < e : hour >= s || hour < e;
    if (inRange) return p.label;
  }
  return "10 PM - 1 AM";
}

export function MusicTherapyClient() {
  const [ragas, setRagas] = useState<Raga[]>([]);
  const [hour, setHour] = useState<number | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    const h = new Date().getHours();
    setHour(h);
    setRagas(getRagasForTime(h));
  }, []);

  const timeLabel = hour !== null ? getPraharLabel(hour) : "";

  return (
    <div className="space-y-6">
      {/* Collapsible info card */}
      <div className="rounded-2xl border p-5 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">Ancient Indian Healing Art</p>
            <h2 className="text-xl font-bold mt-0.5">Raga Chikitsa</h2>
            <p className="text-sm text-muted-foreground">Sanskrit: राग चिकित्सा · "healing through raga"</p>
          </div>
          <button
            onClick={() => setInfoOpen((o) => !o)}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors mt-1"
          >
            {infoOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {infoOpen && (
          <div className="space-y-3 pt-1 border-t">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Raga Chikitsa is a 2,000-year-old branch of Nada Yoga - the yoga of sound. Each raga is a precise melodic framework built from specific notes, intervals, and ornaments that produce predictable psychoacoustic effects on the nervous system.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The <span className="font-medium text-foreground">Prahar system</span> divides the 24-hour day into eight 3-hour windows. Ragas prescribed for each window align with what the body is doing at that time - energising at dawn, focusing in the morning, releasing in the evening, and quieting at night.
            </p>
            <div className="space-y-3 pt-1 border-t">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pt-1">Research</p>
              {SCIENCE.map((s) => (
                <div key={s.claim} className="space-y-0.5">
                  <p className="text-sm font-medium">{s.claim}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: time context */}
        <div className="w-full lg:w-80 lg:shrink-0 space-y-4">
          {hour !== null && (
            <div className="rounded-xl border bg-primary/5 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">Current window</p>
              </div>
              <p className="text-lg font-bold">{timeLabel}</p>
              <p className="text-sm text-muted-foreground">
                {ragas.length} raga{ragas.length !== 1 ? "s" : ""} prescribed for this time.
              </p>
            </div>
          )}

          <div className="rounded-xl border p-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">How to listen</p>
            <ul className="space-y-2">
              {[
                "Use headphones for the best effect.",
                "Close your eyes and focus on the melody.",
                "Let the mind follow the notes without forcing.",
                "Even 15 minutes has a measurable effect.",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary shrink-0 mt-0.5">·</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: ragas grid */}
        <div className="flex-1 space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Ragas for now</p>
            <h3 className="text-lg font-semibold mt-0.5">Traditionally prescribed for {timeLabel}</h3>
          </div>

          {ragas.length === 0 ? (
            <div className="rounded-xl border p-6 text-center text-muted-foreground text-sm">
              Loading ragas for your time...
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {ragas.map((raga) => (
                <RagaCard key={raga.name} raga={raga} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
