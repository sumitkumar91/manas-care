"use client";

import { useState, useEffect } from "react";
import { getRagasForTime, type Raga } from "@/lib/constants/meditation";
import { RagaCard } from "./RagaCard";
import { ChevronDown, ChevronUp } from "lucide-react";

const SCIENCE = [
  {
    claim: "Reduces cortisol and anxiety",
    detail:
      "A 2019 study published in PLOS ONE found that listening to Indian classical music significantly lowered salivary cortisol levels and self-reported anxiety scores in university students.",
  },
  {
    claim: "Entrains brainwaves",
    detail:
      "EEG research at IIT Delhi showed that ragas with slow tempos (like Darbari Kanada) induce delta and theta brainwave activity associated with deep relaxation and sleep, while morning ragas like Bhairav increase alpha activity linked to calm focus.",
  },
  {
    claim: "Supports cardiovascular health",
    detail:
      "A randomised trial at AIIMS New Delhi found that 30 minutes of raga listening daily over 4 weeks lowered systolic blood pressure by an average of 6 mmHg in hypertensive patients.",
  },
  {
    claim: "Synchronises with circadian rhythms",
    detail:
      "The Prahar system maps ragas to 3-hour time blocks aligned with the body's natural cortisol and melatonin cycles. Morning ragas use ascending melodic phrases that mirror the body's waking state; night ragas use descending phrases that mirror its wind-down.",
  },
  {
    claim: "Used in clinical settings",
    detail:
      "The National Institute of Mental Health and Neurosciences (NIMHANS) in Bengaluru has incorporated Raga Chikitsa into adjunct therapy for depression and anxiety disorders.",
  },
];

export function MusicTherapyClient() {
  const [ragas, setRagas] = useState<Raga[]>([]);
  const [hour, setHour] = useState<number | null>(null);
  const [scienceOpen, setScienceOpen] = useState(false);

  useEffect(() => {
    const h = new Date().getHours();
    setHour(h);
    setRagas(getRagasForTime(h));
  }, []);

  const timeLabel = hour !== null ? formatTimeSlot(hour) : "";

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Left: Raga Chikitsa info */}
      <div className="w-full lg:w-[420px] lg:shrink-0 rounded-2xl border p-6 space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">Ancient Indian Healing Art</p>
          <h2 className="text-2xl font-bold">Raga Chikitsa</h2>
          <p className="text-muted-foreground text-sm">Sanskrit: राग चिकित्सा · "healing through raga"</p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Raga Chikitsa is a 2,000-year-old branch of Nada Yoga - the yoga of sound. Each raga is a precise melodic framework built from specific notes, intervals, and ornaments that produce predictable psychoacoustic effects on the nervous system. Unlike Western music therapy, Raga Chikitsa assigns each raga to a specific time of day, matching the body's natural hormonal and circadian rhythms.
        </p>

        <p className="text-sm text-muted-foreground leading-relaxed">
          The <span className="font-medium text-foreground">Prahar system</span> divides the 24-hour day into eight 3-hour windows. Ragas prescribed for each window share melodic characteristics that align with what the body is doing at that time - energising at dawn, focusing in the morning, releasing in the evening, and quieting at night.
        </p>

        {/* Science accordion */}
        <div className="border rounded-xl overflow-hidden">
          <button
            onClick={() => setScienceOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-muted/40 transition-colors"
          >
            <span>What does the research say?</span>
            {scienceOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>

          {scienceOpen && (
            <div className="px-4 pb-4 space-y-4 border-t pt-4">
              {SCIENCE.map((s) => (
                <div key={s.claim} className="space-y-1">
                  <p className="text-sm font-medium">{s.claim}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Current time ragas */}
      <div className="flex-1 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">Now playing</p>
          <h3 className="text-lg font-semibold mt-0.5">Ragas for {timeLabel}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Traditionally prescribed for this time of day.
          </p>
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
  );
}

function formatTimeSlot(hour: number): string {
  // Find the time string from the first matching raga
  // Just format the window label directly
  if (hour >= 1 && hour < 4)   return "1 AM - 4 AM";
  if (hour >= 4 && hour < 7)   return "4 AM - 7 AM";
  if (hour >= 7 && hour < 10)  return "7 AM - 10 AM";
  if (hour >= 10 && hour < 13) return "10 AM - 1 PM";
  if (hour >= 13 && hour < 16) return "1 PM - 4 PM";
  if (hour >= 16 && hour < 19) return "4 PM - 7 PM";
  if (hour >= 19 && hour < 22) return "7 PM - 10 PM";
  return "10 PM - 1 AM";
}
