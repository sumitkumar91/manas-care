"use client";

import { GUNAS, type Guna } from "@/lib/constants/gunas";
import { cn } from "@/lib/utils";

interface Props {
  value: Guna | null;
  onChange: (guna: Guna | null) => void;
}

export function GunaSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">
        What is your current state?{" "}
        <span className="text-muted-foreground font-normal">(Guna)</span>
      </p>
      <div className="grid gap-2 sm:grid-cols-3">
        {GUNAS.map((g) => {
          const selected = value === g.id;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => onChange(selected ? null : g.id)}
              className={cn(
                "rounded-xl border-2 p-3 text-left transition-all cursor-pointer",
                selected
                  ? `${g.bgColor} ${g.borderColor}`
                  : "border-border hover:border-muted-foreground/30 hover:bg-accent/30"
              )}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl">{g.emoji}</span>
                {selected && (
                  <span className={`text-xs font-medium ${g.color}`}>✓</span>
                )}
              </div>
              <p className={cn("font-semibold text-sm", selected ? g.color : "")}>
                {g.name}
                <span className="ml-1.5 text-xs font-normal opacity-60">{g.sanskrit}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{g.tagline}</p>
              <ul className="mt-2 space-y-0.5">
                {g.signs.slice(0, 3).map((s) => (
                  <li key={s} className="text-xs text-muted-foreground">· {s}</li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        Based on Ayurvedic philosophy - select what resonates, or skip.
      </p>
    </div>
  );
}
