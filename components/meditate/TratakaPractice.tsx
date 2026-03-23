"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const DURATIONS = [
  { label: "3 min", seconds: 180 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
  { label: "15 min", seconds: 900 },
];

const BENEFITS = [
  "Builds single-pointed concentration (dharana)",
  "Reduces anxiety by stopping the eyes from darting",
  "Strengthens eye muscles and improves eyesight",
  "Calms mental chatter and overactive thinking",
  "Improves memory and cognitive clarity",
  "Aids in falling asleep when practised before bed",
  "Awakens intuition and inner awareness",
];

const BEFORE_YOU_BEGIN = [
  "Sit comfortably with your spine straight, eyes level with the screen.",
  "Dim your surroundings if possible — reduce visual distractions.",
  "Fix your gaze on the point without letting it wander.",
  "Try not to blink — if you must, blink slowly and return.",
  "When thoughts arise, gently bring your gaze back to the point.",
  "After the session, close your eyes and hold the image internally.",
];

export function TratakaPractice() {
  const [active, setActive] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(DURATIONS[1]);
  const [remaining, setRemaining] = useState(DURATIONS[1].seconds);
  const [done, setDone] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setRemaining(selectedDuration.seconds);
    setDone(false);
  }, [selectedDuration]);

  useEffect(() => {
    if (!active) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setActive(false);
          setDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [active]);

  function handleStart() {
    trackEvent("trataka_started", { duration_seconds: selectedDuration.seconds });
    setDone(false);
    setRemaining(selectedDuration.seconds);
    setActive(true);
  }

  function handleStop() {
    setActive(false);
    setRemaining(selectedDuration.seconds);
    setDone(false);
  }

  const mins = String(Math.floor(remaining / 60)).padStart(2, "0");
  const secs = String(remaining % 60).padStart(2, "0");

  if (active) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-10">
        {/* Gazing point — a single glowing bindu */}
        <div className="relative flex items-center justify-center w-32 h-32">
          <div className="absolute w-32 h-32 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute w-16 h-16 rounded-full bg-white/10 blur-xl" />
          <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_24px_6px_rgba(255,255,255,0.4)]" />
        </div>

        <div className="text-center space-y-1">
          <p className="text-white/40 text-sm tracking-widest uppercase">Trataka</p>
          <p className="text-white/25 text-xs">Hold your gaze steady on the point</p>
        </div>

        <p className="text-white/70 text-4xl font-mono tracking-widest">{mins}:{secs}</p>

        <Button variant="ghost" size="sm" className="text-white/30 hover:text-white/60" onClick={handleStop}>
          End session
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {done && (
        <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 text-center">
          <p className="text-amber-800 dark:text-amber-200 font-medium">Session complete</p>
          <p className="text-amber-700/70 dark:text-amber-300/70 text-sm mt-0.5">Notice the stillness in your mind.</p>
        </div>
      )}

      {/* Collapsible info card */}
      <div className="rounded-2xl border p-5 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">Ancient Yogic Practice</p>
            <h2 className="text-xl font-bold mt-0.5">Trataka</h2>
            <p className="text-sm text-muted-foreground">Sanskrit: त्राटक · "to gaze steadily"</p>
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
              Trataka is the practice of fixing your eyes on a single point without blinking or letting the gaze wander. Traditionally practised on a candle flame, a dot, or a star — any still object that anchors the attention. When the eyes stop moving, the mind follows into stillness.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: controls */}
        <div className="w-full lg:w-80 lg:shrink-0 space-y-4">
          {/* Duration picker */}
          <div className="rounded-xl border p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Duration</p>
            <div className="grid grid-cols-2 gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d.label}
                  onClick={() => setSelectedDuration(d)}
                  className={`py-2.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                    selectedDuration.label === d.label
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:border-primary/50"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <Button onClick={handleStart} className="w-full gap-2 h-11 text-base">
              Begin Trataka
            </Button>
          </div>

          {/* Before you begin */}
          <div className="rounded-xl border p-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Before you begin</p>
            <ul className="space-y-2">
              {BEFORE_YOU_BEGIN.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary shrink-0 mt-0.5">·</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: benefits */}
        <div className="flex-1 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Benefits</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <div key={benefit} className="rounded-xl border p-4 flex items-start gap-3">
                <span className="text-primary shrink-0 mt-0.5 font-bold">·</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
