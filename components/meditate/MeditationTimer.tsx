"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { TIMER_DURATIONS } from "@/lib/constants/meditation";

export function MeditationTimer() {
  const [selected, setSelected] = useState(TIMER_DURATIONS[1].seconds); // default 10 min
  const [remaining, setRemaining] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = selected;
  const elapsed = remaining !== null ? total - remaining : 0;
  const progress = remaining !== null ? elapsed / total : 0;

  // SVG ring
  const size = 200;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - progress);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev === null || prev <= 1) {
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  function start() {
    setRemaining(selected);
    setFinished(false);
    setRunning(true);
  }

  function stop() {
    setRunning(false);
    setRemaining(null);
    setFinished(false);
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center space-y-6 py-8">
        <p className="text-5xl">🔔</p>
        <div className="text-center space-y-1">
          <p className="font-semibold text-lg">Session complete</p>
          <p className="text-sm text-muted-foreground">
            You meditated for {TIMER_DURATIONS.find(d => d.seconds === selected)?.label ?? `${selected / 60} min`}. Well done.
          </p>
        </div>
        <Button onClick={stop}>Done</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6 py-4">
      {!running && remaining === null && (
        <div className="flex flex-wrap justify-center gap-2">
          {TIMER_DURATIONS.map((d) => (
            <button
              key={d.seconds}
              onClick={() => setSelected(d.seconds)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                selected === d.seconds
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:bg-accent/50"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      )}

      {/* Progress ring */}
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-muted/30"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="text-primary transition-all duration-1000"
          />
        </svg>
        <div className="absolute text-center">
          <p className="text-3xl font-mono font-semibold">
            {remaining !== null ? formatTime(remaining) : formatTime(selected)}
          </p>
          {running && <p className="text-xs text-muted-foreground mt-1">Breathe…</p>}
        </div>
      </div>

      <div className="flex gap-3">
        {!running && remaining === null && (
          <Button onClick={start}>Begin session</Button>
        )}
        {running && (
          <Button variant="outline" onClick={stop}>End session</Button>
        )}
        {!running && remaining !== null && remaining > 0 && (
          <>
            <Button onClick={() => setRunning(true)}>Resume</Button>
            <Button variant="ghost" onClick={stop}>Cancel</Button>
          </>
        )}
      </div>

      {!running && remaining === null && (
        <p className="text-xs text-muted-foreground text-center max-w-xs">
          Find a comfortable position, close your eyes, and focus on your breath.
          The bell will sound when your session is complete.
        </p>
      )}
    </div>
  );
}
