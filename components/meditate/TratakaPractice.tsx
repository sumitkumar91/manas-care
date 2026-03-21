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
  "Sit with the candle at eye level, about 2 feet away.",
  "Dim the lights or do this in a dark room.",
  "Try not to blink - if you must, blink gently.",
  "When thoughts arise, return your gaze to the flame.",
  "After the session, close your eyes and visualise the flame internally.",
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
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-16 h-24 flex items-end justify-center">
            <div className="absolute bottom-0 w-14 h-14 rounded-full bg-amber-500/20 blur-xl animate-pulse" />
            <div
              className="absolute bottom-0 w-8 h-20 rounded-t-full rounded-b-sm bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-200"
              style={{ animation: "flicker 1.8s ease-in-out infinite alternate" }}
            />
            <div
              className="absolute bottom-0 w-4 h-14 rounded-t-full rounded-b-sm bg-gradient-to-t from-orange-500 via-yellow-300 to-white opacity-80"
              style={{ animation: "flicker 1.3s ease-in-out infinite alternate-reverse" }}
            />
            <div className="absolute bottom-0 w-2 h-6 rounded-t-full bg-white opacity-60" />
            <div className="absolute bottom-0 w-1 h-4 bg-gray-700 rounded-sm translate-y-3" />
          </div>
          <div className="w-10 h-16 bg-gradient-to-b from-amber-50 to-amber-100 rounded-sm border border-amber-200" />
        </div>

        <div className="text-center space-y-1">
          <p className="text-amber-200/60 text-sm tracking-widest uppercase">Trataka</p>
          <p className="text-white/40 text-xs">Keep your gaze soft and steady on the flame</p>
        </div>

        <p className="text-white/80 text-4xl font-mono tracking-widest">{mins}:{secs}</p>

        <Button variant="ghost" size="sm" className="text-white/30 hover:text-white/60" onClick={handleStop}>
          End session
        </Button>

        <style>{`
          @keyframes flicker {
            0% { transform: scaleX(1) scaleY(1) rotate(-1deg); }
            25% { transform: scaleX(0.95) scaleY(1.03) rotate(1deg); }
            50% { transform: scaleX(1.04) scaleY(0.97) rotate(-0.5deg); }
            75% { transform: scaleX(0.97) scaleY(1.02) rotate(1.5deg); }
            100% { transform: scaleX(1.02) scaleY(1) rotate(-1deg); }
          }
        `}</style>
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
              Trataka is the practice of fixing your eyes on a single point - traditionally a candle flame - without blinking or letting the gaze wander. When the eyes stop moving, the mind follows into stillness.
            </p>
            <div className="space-y-0.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">History</p>
              <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                One of the six Shatkarmas from the Hatha Yoga Pradipika, a 15th-century Sanskrit text. Practised for thousands of years in yogic, Tantric, and Sufi traditions to awaken the Ajna chakra and sharpen the mind.
              </p>
            </div>
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
