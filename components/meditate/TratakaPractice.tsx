"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const DURATIONS = [
  { label: "3 min", seconds: 180 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
  { label: "15 min", seconds: 900 },
];

export function TratakaPractice() {
  const [active, setActive] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(DURATIONS[1]);
  const [remaining, setRemaining] = useState(DURATIONS[1].seconds);
  const [done, setDone] = useState(false);
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
        {/* Flame */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-16 h-24 flex items-end justify-center">
            {/* Outer glow */}
            <div className="absolute bottom-0 w-14 h-14 rounded-full bg-amber-500/20 blur-xl animate-pulse" />
            {/* Flame layers */}
            <div
              className="absolute bottom-0 w-8 h-20 rounded-t-full rounded-b-sm bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-200"
              style={{ animation: "flicker 1.8s ease-in-out infinite alternate" }}
            />
            <div
              className="absolute bottom-0 w-4 h-14 rounded-t-full rounded-b-sm bg-gradient-to-t from-orange-500 via-yellow-300 to-white opacity-80"
              style={{ animation: "flicker 1.3s ease-in-out infinite alternate-reverse" }}
            />
            <div className="absolute bottom-0 w-2 h-6 rounded-t-full bg-white opacity-60" />
            {/* Wick */}
            <div className="absolute bottom-0 w-1 h-4 bg-gray-700 rounded-sm translate-y-3" />
          </div>
          {/* Candle body */}
          <div className="w-10 h-16 bg-gradient-to-b from-amber-50 to-amber-100 rounded-sm border border-amber-200" />
        </div>

        <div className="text-center space-y-1">
          <p className="text-amber-200/60 text-sm tracking-widest uppercase">Trataka</p>
          <p className="text-white/40 text-xs">Keep your gaze soft and steady on the flame</p>
        </div>

        <p className="text-white/80 text-4xl font-mono tracking-widest">{mins}:{secs}</p>

        <Button
          variant="ghost"
          size="sm"
          className="text-white/30 hover:text-white/60"
          onClick={handleStop}
        >
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
          <p className="text-amber-800 dark:text-amber-200 font-medium">Session complete 🕯️</p>
          <p className="text-amber-700/70 dark:text-amber-300/70 text-sm mt-0.5">Notice the stillness in your mind.</p>
        </div>
      )}

      <div className="rounded-2xl border p-5 space-y-4">
        <div>
          <h3 className="font-semibold">Trataka — Yogic Visual Focus</h3>
          <p className="text-sm text-muted-foreground mt-1">
            An ancient yogic practice: gaze softly at a candle flame without blinking. When the eyes stop darting, the mind follows. Builds concentration, reduces anxiety, improves sleep.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</p>
          <div className="flex gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d.label}
                onClick={() => setSelectedDuration(d)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                  selectedDuration.label === d.label
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:border-primary/50"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p className="font-medium text-foreground text-xs uppercase tracking-wider">Before you begin</p>
          <ul className="space-y-0.5 text-xs">
            <li>· Sit comfortably with the candle at eye level, ~2 feet away</li>
            <li>· Dim the lights or do this in a dark room</li>
            <li>· Try not to blink — if you must, blink gently</li>
            <li>· When thoughts arise, return your gaze to the flame</li>
          </ul>
        </div>

        <Button onClick={handleStart} className="w-full gap-2">
          🕯️ Begin Trataka
        </Button>
      </div>
    </div>
  );
}
