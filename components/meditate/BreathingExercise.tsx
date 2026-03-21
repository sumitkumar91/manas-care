"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { BREATHING_EXERCISES, type BreathingExercise } from "@/lib/constants/meditation";

export function BreathingExercisePanel() {
  const [selected, setSelected] = useState<BreathingExercise | null>(null);

  if (selected) {
    return <ActiveBreathing exercise={selected} onExit={() => setSelected(null)} />;
  }

  return (
    <div className="space-y-3">
      {BREATHING_EXERCISES.map((ex) => (
        <button
          key={ex.id}
          onClick={() => setSelected(ex)}
          className="w-full rounded-xl border p-4 text-left hover:border-primary hover:bg-accent/40 transition-colors cursor-pointer"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-sm">{ex.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{ex.description}</p>
            </div>
            <span className="shrink-0 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full whitespace-nowrap">
              {ex.benefit}
            </span>
          </div>
          <div className="flex gap-1.5 mt-3">
            {ex.phases.map((p, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">{p.label} {p.duration}s</span>
                {i < ex.phases.length - 1 && <span className="text-muted-foreground/40">·</span>}
              </div>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}

function ActiveBreathing({ exercise, onExit }: { exercise: BreathingExercise; onExit: () => void }) {
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phase = exercise.phases[phaseIndex];
  const progress = elapsed / phase.duration;

  // Scale: inhale = grow, hold = stay, exhale = shrink
  const isInhale = phase.label === "Inhale";
  const isExhale = phase.label === "Exhale";
  const circleScale = isInhale
    ? 0.5 + 0.5 * progress
    : isExhale
    ? 1 - 0.5 * progress
    : 1;

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 0.05;
        if (next >= phase.duration) {
          const nextPhase = (phaseIndex + 1) % exercise.phases.length;
          setPhaseIndex(nextPhase);
          if (nextPhase === 0) setCycles((c) => c + 1);
          return 0;
        }
        return next;
      });
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, phaseIndex, phase.duration, exercise.phases.length]);

  function handleToggle() {
    if (running) {
      setRunning(false);
      setPhaseIndex(0);
      setElapsed(0);
    } else {
      setRunning(true);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-8 py-6">
      <div>
        <h3 className="text-lg font-semibold text-center">{exercise.name}</h3>
        <p className="text-sm text-muted-foreground text-center mt-0.5">{exercise.benefit}</p>
      </div>

      {/* Breathing circle */}
      <div className="relative flex items-center justify-center w-52 h-52">
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full opacity-20 bg-primary transition-none"
          style={{ transform: `scale(${circleScale + 0.15})`, transition: running ? "transform 0.05s linear" : "none" }}
        />
        {/* Main circle */}
        <div
          className={`w-40 h-40 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-lg`}
          style={{ transform: `scale(${circleScale})`, transition: running ? "transform 0.05s linear" : "none" }}
        >
          <div className="text-center text-white">
            <p className="text-xl font-bold">{phase.label}</p>
            <p className="text-3xl font-mono font-bold mt-1">
              {Math.ceil(phase.duration - elapsed)}
            </p>
          </div>
        </div>
      </div>

      {cycles > 0 && (
        <p className="text-sm text-muted-foreground">
          {cycles} cycle{cycles !== 1 ? "s" : ""} completed
        </p>
      )}

      <div className="flex gap-3">
        <Button onClick={handleToggle} size="sm">
          {running ? "Stop" : "Start"}
        </Button>
        <Button variant="ghost" size="sm" onClick={onExit}>
          Back
        </Button>
      </div>
    </div>
  );
}
